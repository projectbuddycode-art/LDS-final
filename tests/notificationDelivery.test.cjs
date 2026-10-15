/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require('node:assert/strict')
const test = require('node:test')
const {
  deliverInquiryNotification,
  inquiryRecipients,
  REQUIRED_INQUIRY_RECIPIENTS,
  saveInquiryBeforeNotification,
} = require('../lib/notificationDelivery.ts')
const { validateInquiry } = require('../lib/inquiry.ts')

const record = {
  referenceId: 'LDS-TEST-REFERENCE',
  providerIdempotencyKey: 'opaque-provider-idempotency-key',
  name: 'Test Contact',
  company: 'Test Company',
  phone: '+91 9876543210',
  email: 'visitor@example.com',
  projectType: 'Industrial Electrification',
  location: 'Kolkata',
  requirement: 'Test project details',
  message: 'Test message',
  source: 'Test',
  submittedAtDisplay: 'Test timestamp',
}

const settings = {
  apiKey: 'test-only-key',
  from: 'LDS Test <sender@example.test>',
}

const content = {
  subject: 'New Website Inquiry — LDS',
  text: 'Test inquiry body',
  html: '<p>Test inquiry body</p>',
}

test('validation accepts a well-formed inquiry and rejects an invalid reply-to address', () => {
  assert.equal(validateInquiry(record).ok, true)
  assert.equal(validateInquiry({ ...record, email: 'invalid-address' }).ok, false)
})

test('only the two required LDS inboxes receive inquiry notifications', () => {
  assert.deepEqual(inquiryRecipients(), [...REQUIRED_INQUIRY_RECIPIENTS])
})

test('provider acceptance includes both required recipients and a stable idempotency key', async () => {
  let sentPayload
  let sentOptions
  const result = await deliverInquiryNotification(
    record,
    settings,
    content,
    async (payload, options) => {
      sentPayload = payload
      sentOptions = options
      return {
        data: { id: 'provider-message-id' },
        error: null,
        headers: { 'x-resend-id': 'request_123' },
      }
    }
  )

  assert.equal(result.emailStatus, 'accepted')
  assert.equal(result.providerMessageId, 'provider-message-id')
  assert.deepEqual(sentPayload.to, [...REQUIRED_INQUIRY_RECIPIENTS])
  assert.equal(sentPayload.replyTo, record.email)
  assert.deepEqual(sentOptions, { idempotencyKey: record.providerIdempotencyKey })
  assert.equal(result.emailStatus, 'accepted')
})

test('missing configuration skips provider calls and identifies only missing variable names', async () => {
  let called = false
  const result = await deliverInquiryNotification(
    record,
    { from: settings.from },
    content,
    async () => {
      called = true
      return { data: null, error: null }
    }
  )

  assert.equal(called, false)
  assert.equal(result.emailStatus, 'pending_configuration')
  assert.deepEqual(result.missingConfiguration, ['RESEND_API_KEY'])
  assert.equal(result.emailDeliveries[0].error, 'RESEND_API_KEY')
})

test('a failed notification does not roll back the saved inquiry', async () => {
  const savedRecords = []
  const result = await saveInquiryBeforeNotification(
    async () => {
      savedRecords.push(record)
      return true
    },
    async () => ({ emailStatus: 'failed', failureCode: 'invalid_from_address_403' })
  )

  assert.equal(result.saved, true)
  assert.equal(result.notification.emailStatus, 'failed')
  assert.deepEqual(savedRecords, [record])
})

test('provider rejection returns a safe code and leaves delivery unaccepted', async () => {
  const result = await deliverInquiryNotification(
    record,
    settings,
    content,
    async () => ({
      data: null,
      error: {
        name: 'invalid_from_address',
        statusCode: 403,
        message: 'Sender contact@example.com is not authorized; token Bearer secret',
      },
      headers: { 'x-resend-id': 'req_456' },
    })
  )

  assert.equal(result.emailStatus, 'failed')
  assert.equal(result.failureCode, 'invalid_from_address_403')
  assert.deepEqual(result.providerDiagnostic, {
    stage: 'provider_response',
    code: 'invalid_from_address',
    name: 'invalid_from_address',
    message: 'Sender [redacted-email] is not authorized; token Bearer [redacted]',
    statusCode: 403,
    requestId: 'req_456',
  })
  assert.equal(JSON.stringify(result).includes('contact@example.com'), false)
  assert.equal(JSON.stringify(result).includes('secret'), false)
})

test('provider API tokens are redacted from provider messages', async () => {
  const result = await deliverInquiryNotification(
    record,
    settings,
    content,
    async () => ({
      data: null,
      error: {
        name: 'invalid_api_key',
        statusCode: 401,
        message: 'Rejected token re_testtoken1234567890',
      },
      headers: null,
    })
  )

  assert.equal(result.providerDiagnostic.message, 'Rejected token [redacted-token]')
  assert.equal(JSON.stringify(result).includes('re_testtoken1234567890'), false)
})

test('network failures are handled without exposing exception details', async () => {
  const result = await deliverInquiryNotification(
    record,
    settings,
    content,
    async () => {
      throw new Error('secret or payload-bearing failure detail')
    }
  )

  assert.equal(result.emailStatus, 'failed')
  assert.equal(result.failureCode, 'Error_network_or_sdk_error')
  assert.equal(JSON.stringify(result).includes('payload-bearing'), false)
  assert.equal(result.providerDiagnostic.message, 'SDK exception message redacted')
  assert.equal(result.providerDiagnostic.stage, 'sdk_exception')
})

test('invalid reply-to is never sent to the provider', async () => {
  let sentPayload
  await deliverInquiryNotification(
    { ...record, email: 'invalid-address' },
    settings,
    content,
    async (payload) => {
      sentPayload = payload
      return { data: { id: 'provider-message-id' }, error: null, headers: null }
    }
  )

  assert.equal('replyTo' in sentPayload, false)
})
