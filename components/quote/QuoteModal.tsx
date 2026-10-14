'use client'

import { useState, useEffect, useRef } from 'react'

import { PROJECT_TYPES, isValidPhone, validateInquiry } from '@/lib/inquiry'

export { PROJECT_TYPES }

export default function QuoteModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    projectType: 'Industrial Electrification',
    location: '',
    requirement: '',
    message: '',
  })

  const [inquiryResult, setInquiryResult] = useState<{ referenceId?: string; emailStatus?: string } | null>(null)
  const idempotencyKey = useRef('')
  const [honeypot, setHoneypot] = useState('')
  const modalRef = useRef<HTMLDivElement>(null)

  // Listen for open-lds-quote custom event
  useEffect(() => {
    function handleOpen(e: Event) {
      const customEvent = e as CustomEvent<{ projectType?: string }>
      const requestedType = customEvent.detail?.projectType
      const allowedType = PROJECT_TYPES.find((type) => type === requestedType)
      if (allowedType) {
        setFormData((prev) => ({ ...prev, projectType: allowedType }))
      }
      idempotencyKey.current = crypto.randomUUID()
      setHoneypot('')
      setInquiryResult(null)
      setIsSubmitted(false)
      setErrorMessage('')
      setIsOpen(true)
    }

    // Check hash for #quote
    function handleHash() {
      if (window.location.hash === '#quote' || window.location.hash === '#contact') {
        setIsSubmitted(false)
        setErrorMessage('')
        setInquiryResult(null)
        idempotencyKey.current = crypto.randomUUID()
        setIsOpen(true)
      }
    }

    window.addEventListener('open-lds-quote', handleOpen)
    window.addEventListener('hashchange', handleHash)
    handleHash()

    return () => {
      window.removeEventListener('open-lds-quote', handleOpen)
      window.removeEventListener('hashchange', handleHash)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    if (window.location.hash === '#quote' || window.location.hash === '#contact') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search)
    }
  }

  // Lock body scroll and handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose()
      }
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return
    setErrorMessage('')

    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name.')
      return
    }
    if (!isValidPhone(formData.phone.trim())) {
      setErrorMessage('Please enter a valid phone number.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setErrorMessage('Please enter a valid email address.')
      return
    }
    if (!formData.projectType) {
      setErrorMessage('Please select a project type.')
      return
    }
    if (!formData.requirement.trim()) {
      setErrorMessage('Please describe your project requirement.')
      return
    }

    const checked = validateInquiry({ ...formData, faxNumber: honeypot })
    if (!checked.ok) {
      setErrorMessage(checked.error)
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'Website inquiry form',
          idempotencyKey: idempotencyKey.current || crypto.randomUUID(),
          faxNumber: honeypot,
        }),
      })

      const result = await res.json()
      if (res.ok && result.success && result.notified) {
        setInquiryResult({ referenceId: result.referenceId, emailStatus: result.emailStatus })
        setIsSubmitted(true)
        setFormData({
          name: '',
          company: '',
          phone: '',
          email: '',
          projectType: 'Industrial Electrification',
          location: '',
          requirement: '',
          message: '',
        })
      } else {
        setErrorMessage(result.error || 'The notification could not be sent. Please try again.')
      }
    } catch (err) {
      setErrorMessage('Network error. Please try again or reach LDS directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="quote-modal-overlay"
      data-lenis-prevent="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose()
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 150,
        background: 'rgba(10, 14, 18, 0.82)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(16px, 3vw, 32px)',
        overscrollBehavior: 'contain',
      }}
    >
      <div
        ref={modalRef}
        data-lenis-prevent="true"
        className="quote-modal-container"
        style={{
          background: 'var(--bg-light)',
          border: '1px solid var(--line-gold)',
          maxWidth: '680px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          overscrollBehavior: 'contain',
          position: 'relative',
          padding: 'clamp(28px, 4vw, 44px)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.35)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          aria-label="Close quote modal"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'transparent',
            border: 'none',
            fontSize: '22px',
            lineHeight: 1,
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            padding: '8px',
            transition: 'color 200ms ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-gold)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
        >
          ✕
        </button>

        {!isSubmitted ? (
          <>
            {/* Header */}
            <div style={{ marginBottom: '28px' }}>
              <div className="section-label" style={{ marginBottom: '8px' }}>
                <span className="section-label-bullet" />
                <span className="t-label">LDS Engineering & Contracting</span>
              </div>
              <h2
                className="t-headline"
                style={{ fontSize: 'clamp(24px, 3.2vw, 36px)', lineHeight: 1.15, marginBottom: '8px' }}
              >
                SEND INQUIRY
              </h2>
              <p className="t-body" style={{ fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
                Tell us about your electrical project and our team will get in touch.
              </p>
            </div>

            {/* Error banner */}
            {errorMessage && (
              <div
                style={{
                  background: 'rgba(239, 68, 68, 0.08)',
                  border: '1px solid rgba(239, 68, 68, 0.30)',
                  color: '#dc2626',
                  padding: '12px 16px',
                  fontSize: '13px',
                  marginBottom: '20px',
                }}
              >
                {errorMessage}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input
                type="text"
                name="faxNumber"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px', height: 0, width: 0, opacity: 0 }}
              />
              {/* Row 1: Name & Company */}
              <div className="quote-form-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '16px' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '11px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: 'var(--text-secondary)',
                      marginBottom: '6px',
                    }}
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="quote-input"
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '11px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: 'var(--text-secondary)',
                      marginBottom: '6px',
                    }}
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Tata Steel / ITC Limited"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="quote-input"
                  />
                </div>
              </div>

              {/* Row 2: Phone & Email */}
              <div className="quote-form-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '16px' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '11px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: 'var(--text-secondary)',
                      marginBottom: '6px',
                    }}
                  >
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98310 00000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="quote-input"
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '11px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: 'var(--text-secondary)',
                      marginBottom: '6px',
                    }}
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. contact@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="quote-input"
                  />
                </div>
              </div>

              {/* Row 3: Project Type & Location */}
              <div className="quote-form-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '16px' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '11px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: 'var(--text-secondary)',
                      marginBottom: '6px',
                    }}
                  >
                    Project Type *
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="quote-input"
                    style={{ cursor: 'pointer' }}
                  >
                    {PROJECT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '11px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: 'var(--text-secondary)',
                      marginBottom: '6px',
                    }}
                  >
                    Project Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Kolkata, West Bengal / Assam"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="quote-input"
                  />
                </div>
              </div>

              {/* Row 4: Requirement Details */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '11px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'var(--text-secondary)',
                    marginBottom: '6px',
                  }}
                >
                  Requirement / Project Details *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Please specify estimated scope, equipment requirements, voltage level, or timeline..."
                  value={formData.requirement}
                  onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                  className="quote-input"
                  style={{ resize: 'vertical' }}
                />
              </div>

              {/* Row 5: Additional Message */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '11px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'var(--text-secondary)',
                    marginBottom: '6px',
                  }}
                >
                  Additional Message (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Any other specific constraints or instructions..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="quote-input"
                  style={{ resize: 'vertical' }}
                />
              </div>

              {/* Submit CTA */}
              <div style={{ marginTop: '12px' }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cta-btn cta-btn-primary"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '16px 28px',
                    fontSize: '13px',
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    opacity: isSubmitting ? 0.7 : 1,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  }}
                >
                  {isSubmitting ? 'SENDING INQUIRY...' : 'SEND INQUIRY ↗'}
                </button>
              </div>

              {/* Verification & Privacy note */}
              <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', textAlign: 'center', marginTop: '4px' }}>
                Submissions are sent directly to the LDS technical estimation team. We respect your confidentiality.
              </div>
            </form>
          </>
        ) : (
          /* Confirmation State */
          <div style={{ textAlign: 'center', padding: '24px 8px' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'rgba(201, 160, 82, 0.12)',
                border: '1px solid var(--accent-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                color: 'var(--accent-gold)',
                fontSize: '24px',
              }}
            >
              ✓
            </div>

            <div className="section-label" style={{ justifyContent: 'center', marginBottom: '8px' }}>
              <span className="section-label-bullet" />
              <span className="t-label">Submission Confirmed</span>
            </div>

            <h2 className="t-headline" style={{ fontSize: '28px', marginBottom: '16px', color: 'var(--text-primary)' }}>
              {inquiryResult?.emailStatus === 'sent' ? 'Thank you for contacting Lukhdatar & Sons.' : 'Your inquiry has been saved.'}
            </h2>

            <p className="t-body" style={{ maxWidth: '480px', margin: '0 auto 16px', lineHeight: 1.7 }}>
              {inquiryResult?.emailStatus === 'sent'
                ? 'Your inquiry has been received. Our team will review your requirements and contact you using the details provided.'
                : 'Your inquiry was saved, but email delivery to the LDS team is not confirmed. Please try again or contact LDS directly using the published email addresses.'}
            </p>
            {inquiryResult?.referenceId && (
              <p className="t-label" style={{ marginBottom: '32px' }}>
                Inquiry reference {inquiryResult.referenceId}
              </p>
            )}

            <button
              onClick={handleClose}
              className="cta-btn cta-btn-primary"
              style={{ margin: '0 auto', padding: '14px 36px' }}
            >
              BACK TO WEBSITE
            </button>
          </div>
        )}
      </div>

      <style>{`
        .quote-input {
          width: 100%;
          background: var(--bg-primary);
          border: 1px solid var(--line);
          color: var(--text-primary);
          padding: 12px 14px;
          font-size: 13.5px;
          font-family: inherit;
          outline: none;
          min-height: 44px;
          transition: border-color 200ms ease, box-shadow 200ms ease;
        }
        .quote-input:focus {
          border-color: var(--accent-gold);
          box-shadow: 0 0 0 2px rgba(201, 160, 82, 0.15);
        }
        @media (max-width: 600px) {
          .quote-form-row {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .quote-modal-container {
            padding: 24px 18px !important;
          }
          .quote-input {
            font-size: 16px !important; /* Prevents iOS auto-zoom shift */
            padding: 11px 13px !important;
          }
        }
      `}</style>
    </div>
  )
}
