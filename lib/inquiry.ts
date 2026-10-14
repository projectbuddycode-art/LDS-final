export const PROJECT_TYPES = [
  'Industrial Electrification',
  'Warehouse Electrification',
  'Substation / Switchyard',
  'Underground Cable Work',
  'Transmission Lines',
  'Commercial Electrical Work',
  'Township Electrification',
  'Electrical Equipment Supply',
  'Maintenance / Support',
  'Other',
] as const

export type ProjectType = (typeof PROJECT_TYPES)[number]

export const DEFAULT_INQUIRY_RECIPIENTS = [
  'lukhdatar_sons@rediffmail.com',
  'lukhdatar6sons@gmail.com',
] as const

export interface InquiryInput {
  name?: string
  company?: string
  phone?: string
  email?: string
  projectType?: string
  location?: string
  requirement?: string
  message?: string
  source?: string
  conversationSummary?: string
  conversationLog?: string[]
  idempotencyKey?: string
  faxNumber?: string
}

export interface InquiryRecord {
  referenceId: string
  idempotencyKey?: string
  name: string
  company: string
  phone: string
  email: string
  projectType: string
  location: string
  requirement: string
  message: string
  source: string
  conversationSummary?: string
  submittedAt: string
  submittedAtDisplay: string
  status: 'accepted'
  emailStatus: 'sent' | 'partial' | 'failed' | 'pending_configuration'
  emailDeliveries: Array<{ recipient: string; status: 'sent' | 'failed' | 'skipped'; error?: string }>
}

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function sanitizeLine(value: string, maxLength: number) {
  return value.replace(/[\r\n\u0000]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, maxLength)
}

export function sanitizeBlock(value: string, maxLength: number) {
  return value.replace(/\u0000/g, '').trim().slice(0, maxLength)
}

export function isValidPhone(value: string) {
  if (!/^[+\d\s().-]+$/.test(value)) return false
  const digits = value.replace(/\D/g, '')
  return digits.length >= 7 && digits.length <= 15
}

export function validateInquiry(input: InquiryInput): { ok: true; value: Omit<InquiryRecord, 'referenceId' | 'submittedAt' | 'submittedAtDisplay' | 'status' | 'emailStatus' | 'emailDeliveries' | 'idempotencyKey'> & { idempotencyKey?: string } } | { ok: false; error: string } {
  if (input.faxNumber && input.faxNumber.trim()) {
    return { ok: false, error: 'Unable to accept this submission.' }
  }

  const name = sanitizeLine(input.name || '', 120)
  const company = sanitizeLine(input.company || '', 160)
  const phone = sanitizeLine(input.phone || '', 30)
  const email = sanitizeLine(input.email || '', 160).toLowerCase()
  const projectType = sanitizeLine(input.projectType || '', 80)
  const location = sanitizeLine(input.location || '', 160)
  const requirement = sanitizeBlock(input.requirement || '', 4000)
  const message = sanitizeBlock(input.message || '', 4000)
  const source = sanitizeLine(input.source || 'Website inquiry form', 80)
  const idempotencyKey = sanitizeLine(input.idempotencyKey || '', 120)

  if (!name) return { ok: false, error: 'Full name is required.' }
  if (!phone) return { ok: false, error: 'Phone number is required.' }
  if (!isValidPhone(phone)) return { ok: false, error: 'Enter a valid phone number.' }
  if (!email) return { ok: false, error: 'Email address is required.' }
  if (!EMAIL_PATTERN.test(email)) return { ok: false, error: 'Enter a valid email address.' }
  if (!projectType) return { ok: false, error: 'Project type is required.' }
  if (!PROJECT_TYPES.includes(projectType as ProjectType)) return { ok: false, error: 'Select a valid project type.' }
  if (!requirement) return { ok: false, error: 'Requirement / project details are required.' }

  return {
    ok: true,
    value: {
      name,
      company: company || 'Not provided',
      phone,
      email,
      projectType,
      location: location || 'Not provided',
      requirement,
      message: message || 'Not provided',
      source,
      conversationSummary: input.conversationSummary ? sanitizeBlock(input.conversationSummary, 4000) : undefined,
      idempotencyKey: idempotencyKey || undefined,
    },
  }
}
