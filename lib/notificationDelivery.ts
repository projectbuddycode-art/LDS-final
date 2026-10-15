export const REQUIRED_INQUIRY_RECIPIENTS = [
  'lukhdatar_sons@rediffmail.com',
  'ukhdatar6sons@gmail.com',
] as const
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export interface NotificationRecord {
  referenceId: string
  providerIdempotencyKey?: string
  name: string
  company: string
  phone: string
  email: string
  projectType: string
  location: string
  requirement: string
  message: string
  source: string
  submittedAtDisplay: string
  conversationSummary?: string
}

export interface NotificationPayload {
  from: string
  to: string[]
  subject: string
  text: string
  html: string
  replyTo?: string
}

export interface ProviderError {
  name: string
  statusCode: number | null
  message: string
}

export interface ProviderDiagnostic {
  stage: 'provider_response' | 'sdk_exception'
  code: string
  name: string
  message: string
  statusCode: number | null
  requestId?: string
  stack?: string
}

export interface NotificationResult {
  emailStatus: 'accepted' | 'failed' | 'pending_configuration'
  emailDeliveries: Array<{
    recipient: string
    status: 'accepted' | 'failed' | 'skipped'
    error?: string
  }>
  providerMessageId?: string
  failureCode?: string
  providerDiagnostic?: ProviderDiagnostic
  missingConfiguration?: string[]
}

export type SaveThenNotifyResult<T> =
  | { saved: false }
  | { saved: true; notification: T }

interface NotificationSettings {
  apiKey?: string
  from?: string
}

interface ProviderResponse {
  data: { id: string } | null
  error: ProviderError | null
  headers: Record<string, string> | null
}

type SendNotification = (
  payload: NotificationPayload,
  options: { idempotencyKey: string }
) => Promise<ProviderResponse>

export function inquiryRecipients() {
  return [...REQUIRED_INQUIRY_RECIPIENTS]
}

function safeProviderMessage(value: string) {
  return value
    .replace(/Bearer\s+\S+/gi, 'Bearer [redacted]')
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, '[redacted-email]')
    .replace(/\b(?:re|sk)[_-][a-zA-Z0-9_-]{12,}\b/gi, '[redacted-token]')
    .replace(/\+?\d[\d\s().-]{6,}\d/g, '[redacted-number]')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 240)
}

function safeExceptionMessage(value: string) {
  const message = safeProviderMessage(value)
  if (/fetch failed|network error|timed?\s*out|econn(?:refused|reset|timeout)|enotfound|eai_again|socket hang up|aborted/i.test(message)) {
    return message
  }
  return 'SDK exception message redacted'
}

function requestIdFromHeaders(headers: Record<string, string> | null) {
  if (!headers) return undefined
  const requestId = Object.entries(headers).find(([name]) =>
    ['x-resend-id', 'x-request-id', 'request-id', 'x-amzn-requestid'].includes(name.toLowerCase())
  )?.[1]
  return requestId && /^[a-zA-Z0-9_-]{1,128}$/.test(requestId) ? requestId : undefined
}

export async function saveInquiryBeforeNotification<T>(
  save: () => Promise<boolean>,
  notify: () => Promise<T>
): Promise<SaveThenNotifyResult<T>> {
  if (!(await save())) return { saved: false }
  return { saved: true, notification: await notify() }
}

export async function deliverInquiryNotification(
  record: NotificationRecord,
  settings: NotificationSettings,
  content: { subject: string; text: string; html: string },
  send: SendNotification
): Promise<NotificationResult> {
  const recipients = inquiryRecipients()
  const missingConfiguration = [
    !settings.apiKey ? 'RESEND_API_KEY' : null,
    !settings.from ? 'INQUIRY_FROM_EMAIL' : null,
  ].filter((name): name is string => name !== null)

  const apiKey = settings.apiKey
  const from = settings.from
  if (missingConfiguration.length > 0 || !apiKey || !from) {
    return {
      emailStatus: 'pending_configuration',
      emailDeliveries: recipients.map((recipient) => ({
        recipient,
        status: 'skipped',
        error: missingConfiguration.join(','),
      })),
      missingConfiguration,
    }
  }

  const payload: NotificationPayload = {
    from,
    to: recipients,
    ...content,
  }
  if (EMAIL_PATTERN.test(record.email)) {
    payload.replyTo = record.email
  }

  try {
    const { data, error, headers } = await send(payload, {
      idempotencyKey: record.providerIdempotencyKey || record.referenceId,
    })
    if (error || !data?.id) {
      const safeErrorName = error?.name.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 48) || 'ProviderError'
      const code = error
        ? `${safeErrorName}${error.statusCode ? `_${error.statusCode}` : ''}`
        : 'missing_provider_message_id'
      const statusCode = error?.statusCode ?? null
      const message = error ? safeProviderMessage(error.message) : 'Provider response did not include a message ID'
      return {
        emailStatus: 'failed',
        emailDeliveries: recipients.map((recipient) => ({
          recipient,
          status: 'failed',
          error: code,
        })),
        failureCode: code,
        providerDiagnostic: {
          stage: 'provider_response',
          code: safeErrorName,
          name: safeErrorName,
          message,
          statusCode,
          requestId: requestIdFromHeaders(headers),
        },
      }
    }

    return {
      emailStatus: 'accepted',
      emailDeliveries: recipients.map((recipient) => ({
        recipient,
        status: 'accepted',
      })),
      providerMessageId: data.id,
    }
  } catch (cause) {
    const name = cause instanceof Error ? cause.name : 'UnknownError'
    const code = `${name.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 48) || 'UnknownError'}_network_or_sdk_error`
    const safeName = name.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 48) || 'UnknownError'
    return {
      emailStatus: 'failed',
      emailDeliveries: recipients.map((recipient) => ({
        recipient,
        status: 'failed',
        error: code,
      })),
      failureCode: code,
      providerDiagnostic: {
        stage: 'sdk_exception',
        code: 'network_or_sdk_error',
        name: safeName,
        message: safeExceptionMessage(cause instanceof Error ? cause.message : 'Unknown SDK exception'),
        statusCode: null,
        stack: cause instanceof Error && cause.stack
          ? cause.stack.split('\n').slice(1, 4).map(safeProviderMessage).join('\n').slice(0, 800)
          : undefined,
      },
    }
  }
}
