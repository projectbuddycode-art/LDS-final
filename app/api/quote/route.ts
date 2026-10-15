import { NextResponse } from 'next/server'
import fs from 'fs'
import os from 'os'
import path from 'path'
import { createHash, randomUUID } from 'crypto'
import { Resend } from 'resend'
import {
  InquiryInput,
  InquiryRecord,
  escapeHtml,
  validateInquiry,
} from '@/lib/inquiry'
import { deliverInquiryNotification, saveInquiryBeforeNotification } from '@/lib/notificationDelivery'

const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT = 5
const recentRequests = new Map<string, number[]>()

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
  const preferred = path.join(process.cwd(), 'data', 'leads.json')
  try {
    const dir = path.dirname(preferred)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    fs.accessSync(dir, fs.constants.W_OK)
    return preferred
  } catch {
    return path.join(os.tmpdir(), 'lds-leads.json')
  }
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

function emailText(record: InquiryRecord) {
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

function emailRow(label: string, value: string) {
  return `<tr>
    <td style="padding:8px 0;width:200px;font-weight:600;color:#111820;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:8px 0;color:#333;white-space:pre-wrap;">${escapeHtml(value)}</td>
  </tr>`
}

function emailHtml(record: InquiryRecord) {
  return `<!DOCTYPE html>
<html><body style="margin:0;padding:24px;font-family:Arial,sans-serif;background:#f7f5f1;color:#111820;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e6e1d6;padding:24px;">
    <tr><td>
      <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#c9a052;">Lukhdatar &amp; Sons</p>
      <h1 style="margin:0 0 20px;font-size:22px;">New Website Inquiry</h1>
      <table width="100%" cellpadding="0" cellspacing="0">
        ${emailRow('Full Name', record.name)}
        ${emailRow('Company Name', record.company)}
        ${emailRow('Phone Number', record.phone)}
        ${emailRow('Email Address', record.email)}
        ${emailRow('Project Type', record.projectType)}
        ${emailRow('Project Location', record.location)}
        ${emailRow('Requirement / Project Details', record.requirement)}
        ${emailRow('Additional Message', record.message)}
        ${emailRow('Submission Source', record.source)}
        ${emailRow('Submission Date and Time', record.submittedAtDisplay)}
        ${emailRow('Inquiry Reference ID', record.referenceId)}
        ${record.conversationSummary ? emailRow('Conversation Summary', record.conversationSummary) : ''}
      </table>
    </td></tr>
  </table>
</body></html>`
}

async function deliverToRecipients(record: InquiryRecord): Promise<{
  emailStatus: InquiryRecord['emailStatus']
  emailDeliveries: InquiryRecord['emailDeliveries']
}> {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.INQUIRY_FROM_EMAIL
  let sdkSendInvoked = false
  const notificationRecord = {
    ...record,
    providerIdempotencyKey: createHash('sha256')
      .update(record.idempotencyKey || record.referenceId)
      .digest('hex'),
  }
  const result = await deliverInquiryNotification(
    notificationRecord,
    {
      apiKey,
      from,
    },
    {
      subject: 'New Website Inquiry — LDS',
      text: emailText(record),
      html: emailHtml(record),
    },
    async (payload, options) => {
      if (!apiKey) {
        throw new Error('Resend API key was not configured')
      }
      const resend = new Resend(apiKey)
      sdkSendInvoked = true
      return resend.emails.send(payload, options)
    }
  )

  if (result.missingConfiguration?.length) {
    console.error(
      JSON.stringify({
        event: 'lds_inquiry_resend_skipped',
        referenceId: record.referenceId,
        missingConfiguration: result.missingConfiguration,
      })
    )
  } else if (result.providerDiagnostic) {
    console.error(
      JSON.stringify({
        event: result.providerDiagnostic.stage === 'provider_response'
          ? 'lds_inquiry_resend_rejected'
          : 'lds_inquiry_resend_sdk_exception',
        referenceId: record.referenceId,
        sdkSendInvoked,
        ...result.providerDiagnostic,
      })
    )
  } else if (result.providerMessageId) {
    console.info(
      JSON.stringify({
        event: 'lds_inquiry_resend_accepted',
        referenceId: record.referenceId,
        providerMessageId: result.providerMessageId,
        inboxDeliveryConfirmed: false,
      })
    )
  }
  return result
}

function successResult(record: InquiryRecord, duplicate = false) {
  return {
    success: true,
    accepted: true,
    duplicate,
    notified: true,
    providerAccepted: true,
    inboxDeliveryConfirmed: false,
    referenceId: record.referenceId,
    emailStatus: record.emailStatus,
    message: 'Resend accepted the notification request. Inbox delivery is not confirmed.',
  }
}

function pendingResult(record: InquiryRecord, duplicate = false) {
  const providerFailure = record.emailStatus === 'failed'
  const diagnostic = record.emailDeliveries[0]?.error
  const reason = record.emailStatus === 'pending_configuration'
    ? 'Email notifications are not configured.'
    : `The email provider did not accept the notification${diagnostic ? ` (${diagnostic})` : ''}.`
  return {
    success: false,
    accepted: true,
    duplicate,
    notified: false,
    providerAccepted: false,
    inboxDeliveryConfirmed: false,
    referenceId: record.referenceId,
    diagnosticReference: record.referenceId,
    emailStatus: record.emailStatus,
    notificationDiagnostic: record.emailDeliveries[0]?.error,
    providerStatus: providerFailure
      ? diagnostic?.match(/_(\d{3})$/)?.[1]
      : undefined,
    error: `Your inquiry was saved (reference ${record.referenceId}), but ${reason} Your form details remain available; please retry later or contact LDS directly.`,
  }
}

async function persist(leads: InquiryRecord[]) {
  try {
    writeLeads(leads)
    return true
  } catch {
    return false
  }
}

export async function POST(request: Request) {
  try {
    let body: InquiryInput
    try {
      body = await request.json() as InquiryInput
    } catch {
      return NextResponse.json({ error: 'The request could not be read. Please try again.' }, { status: 400 })
    }

    const validated = validateInquiry(body)
    if (!validated.ok) {
      return NextResponse.json({ error: validated.error }, { status: 400 })
    }

    if (isRateLimited(clientKey(request))) {
      return NextResponse.json(
        { error: 'Too many inquiries were submitted. Please wait a few minutes and try again.' },
        { status: 429 }
      )
    }

    const leads = readLeads()
    if (validated.value.idempotencyKey) {
      const existing = leads.find((lead) => lead.idempotencyKey === validated.value.idempotencyKey)
      if (existing) {
        if (existing.emailStatus === 'accepted' || existing.emailStatus === 'sent') {
          return NextResponse.json(successResult(existing, true))
        }
        const delivery = await deliverToRecipients(existing)
        existing.emailStatus = delivery.emailStatus
        existing.emailDeliveries = delivery.emailDeliveries
        if (!(await persist(leads))) {
          console.error(`[LDS Inquiry ${existing.referenceId}] Could not update saved inquiry after retry.`)
        }
        if (existing.emailStatus === 'accepted' || existing.emailStatus === 'sent') {
          return NextResponse.json(successResult(existing, true))
        }
        return NextResponse.json(pendingResult(existing, true), { status: 502 })
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

    leads.unshift(record)
    const savedAndNotified = await saveInquiryBeforeNotification(
      () => persist(leads),
      () => deliverToRecipients(record)
    )
    if (!savedAndNotified.saved) {
      console.error(`[LDS Inquiry ${record.referenceId}] Could not save inquiry record.`)
      return NextResponse.json(
        { error: 'The inquiry could not be saved. Please try again.' },
        { status: 500 }
      )
    }

    const delivery = savedAndNotified.notification
    record.emailStatus = delivery.emailStatus
    record.emailDeliveries = delivery.emailDeliveries
    if (!(await persist(leads))) {
      console.error(`[LDS Inquiry ${record.referenceId}] Inquiry was saved but delivery status could not be updated.`)
    }

    console.log(`[LDS Inquiry ${record.referenceId}] accepted; email status: ${record.emailStatus}`)
    if (record.emailStatus === 'accepted' || record.emailStatus === 'sent') {
      return NextResponse.json(successResult(record))
    }
    return NextResponse.json(pendingResult(record), { status: 502 })
  } catch (cause) {
    const errorName = cause instanceof Error
      ? cause.name.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 48)
      : 'UnknownError'
    console.error(`[LDS Inquiry] Request processing failed (${errorName || 'UnknownError'}).`)
    return NextResponse.json(
      { error: 'Failed to process the inquiry. Please try again or contact LDS directly.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
