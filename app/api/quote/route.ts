import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'
import nodemailer from 'nodemailer'
import {
  DEFAULT_INQUIRY_RECIPIENTS,
  InquiryInput,
  InquiryRecord,
  validateInquiry,
} from '@/lib/inquiry'

const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT = 5
const recentRequests = new Map<string, number[]>()

function recipientsFromEnv() {
  const configured = process.env.LDS_INQUIRY_TO || process.env.LDS_NOTIFICATION_EMAIL || ''
  const parsed = configured
    .split(',')
    .map((item) => item.trim().toLowerCase())
    .filter((item) => item.includes('@'))
  const unique = Array.from(new Set(parsed.length > 0 ? parsed : [...DEFAULT_INQUIRY_RECIPIENTS]))
  return unique
}

function clientKey(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  return forwarded || request.headers.get('x-real-ip') || 'local'
}

function isRateLimited(key: string) {
  const now = Date.now()
  const stamps = (recentRequests.get(key) || []).filter((stamp) => now - stamp < RATE_WINDOW_MS)
  if (stamps.length >= RATE_LIMIT) {
    recentRequests.set(key, stamps)
    return true
  }
  stamps.push(now)
  recentRequests.set(key, stamps)
  return false
}

function leadsFilePath() {
  return path.join(process.cwd(), 'data', 'leads.json')
}

function readLeads(): InquiryRecord[] {
  const file = leadsFilePath()
  if (!fs.existsSync(file)) return []
  try {
    const parsed = JSON.parse(fs.readFileSync(file, 'utf-8'))
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeLeads(leads: InquiryRecord[]) {
  const file = leadsFilePath()
  const dir = path.dirname(file)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(file, JSON.stringify(leads, null, 2), 'utf-8')
}

function formatWhen(date: Date) {
  const display = new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'full',
    timeStyle: 'long',
    timeZone: 'Asia/Kolkata',
  }).format(date)
  return { iso: date.toISOString(), display: `${display} (Asia/Kolkata)` }
}

function emailBody(record: InquiryRecord) {
  return [
    'NEW WEBSITE INQUIRY — LUKHDATAR & SONS',
    '',
    `Full Name: ${record.name}`,
    `Company Name: ${record.company}`,
    `Phone Number: ${record.phone}`,
    `Email Address: ${record.email}`,
    `Project Type: ${record.projectType}`,
    `Project Location: ${record.location}`,
    `Requirement / Project Details: ${record.requirement}`,
    `Additional Message: ${record.message}`,
    `Submission Source: ${record.source}`,
    `Submission Date and Time: ${record.submittedAtDisplay}`,
    `Inquiry Reference ID: ${record.referenceId}`,
    record.conversationSummary ? `\nConversation Summary:\n${record.conversationSummary}` : '',
  ].filter(Boolean).join('\n')
}

async function deliverToRecipients(record: InquiryRecord): Promise<{
  emailStatus: InquiryRecord['emailStatus']
  emailDeliveries: InquiryRecord['emailDeliveries']
}> {
  const recipients = recipientsFromEnv()
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error(`[LDS Inquiry ${record.referenceId}] Email not sent. SMTP is not configured.`)
    return {
      emailStatus: 'pending_configuration' as const,
      emailDeliveries: recipients.map((recipient) => ({
        recipient,
        status: 'skipped' as const,
        error: 'SMTP is not configured',
      })),
    }
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  const deliveries = await Promise.all(recipients.map(async (recipient) => {
    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM || `"LDS Website" <${process.env.SMTP_USER}>`,
        to: recipient,
        replyTo: record.email,
        subject: `New LDS Website Inquiry — ${record.name}`,
        text: emailBody(record),
      })
      return { recipient, status: 'sent' as const }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Delivery failed'
      console.error(`[LDS Inquiry ${record.referenceId}] Delivery failed for one recipient: ${message}`)
      return { recipient, status: 'failed' as const, error: message }
    }
  }))

  const sent = deliveries.filter((item) => item.status === 'sent').length
  const emailStatus: InquiryRecord['emailStatus'] = sent === deliveries.length ? 'sent' : sent > 0 ? 'partial' : 'failed'
  return { emailStatus, emailDeliveries: deliveries }
}

function publicResult(record: InquiryRecord, duplicate = false) {
  const delivered = record.emailStatus === 'sent'
  return {
    success: true,
    accepted: true,
    duplicate,
    referenceId: record.referenceId,
    emailStatus: record.emailStatus,
    notified: delivered,
    message: delivered
      ? 'Inquiry accepted and notification sent to the LDS team.'
      : 'Inquiry saved. Email notification to the LDS team is not confirmed.',
  }
}

export async function POST(request: Request) {
  try {
    if (isRateLimited(clientKey(request))) {
      return NextResponse.json(
        { error: 'Too many inquiries were submitted. Please wait a few minutes and try again.' },
        { status: 429 }
      )
    }

    const body = await request.json() as InquiryInput
    const validated = validateInquiry(body)
    if (!validated.ok) {
      return NextResponse.json({ error: validated.error }, { status: 400 })
    }

    const leads = readLeads()
    if (validated.value.idempotencyKey) {
      const existing = leads.find((lead) => lead.idempotencyKey === validated.value.idempotencyKey)
      if (existing) {
        if (existing.emailStatus === 'sent') {
          return NextResponse.json(publicResult(existing, true))
        }
        const delivery = await deliverToRecipients(existing)
        existing.emailStatus = delivery.emailStatus
        existing.emailDeliveries = delivery.emailDeliveries
        writeLeads(leads)
        return NextResponse.json(publicResult(existing, true))
      }
    }

    const when = formatWhen(new Date())
    const record: InquiryRecord = {
      referenceId: `LDS-${when.iso.slice(0, 10).replace(/-/g, '')}-${randomUUID().slice(0, 8).toUpperCase()}`,
      ...validated.value,
      submittedAt: when.iso,
      submittedAtDisplay: when.display,
      status: 'accepted',
      emailStatus: 'pending_configuration',
      emailDeliveries: [],
    }

    const delivery = await deliverToRecipients(record)
    record.emailStatus = delivery.emailStatus
    record.emailDeliveries = delivery.emailDeliveries

    try {
      leads.unshift(record)
      writeLeads(leads)
    } catch (error) {
      console.error(`[LDS Inquiry ${record.referenceId}] Could not save inquiry record.`)
      return NextResponse.json(
        { error: 'The inquiry could not be saved. Please try again.' },
        { status: 500 }
      )
    }

    console.log(`[LDS Inquiry ${record.referenceId}] accepted; email status: ${record.emailStatus}`)
    return NextResponse.json(publicResult(record))
  } catch (error) {
    console.error('[LDS Inquiry] Request could not be processed.')
    return NextResponse.json(
      { error: 'Failed to process the inquiry. Please try again or contact LDS directly.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
