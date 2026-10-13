'use client'

import { useRef, useState } from 'react'
import PageLayout from '@/components/layout/PageLayout'
import BackNav from '@/components/navigation/BackNav'
import { EQUIPMENT_CATEGORIES, EQUIPMENT_RANGE } from '@/data/content'
import { MEDIA } from '@/data/media'
import LazyVideo from '@/components/LazyVideo'
import { PROJECT_TYPES, isValidPhone, validateInquiry } from '@/lib/inquiry'

export default function ProductsEquipmentPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [inquiryResult, setInquiryResult] = useState<{ referenceId?: string; emailStatus?: string } | null>(null)
  const [honeypot, setHoneypot] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const idempotencyKey = useRef(crypto.randomUUID())
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    projectType: 'Electrical Equipment Supply',
    location: '',
    requirement: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return
    setErrorMessage('')

    if (!isValidPhone(formData.phone.trim())) {
      setErrorMessage('Please enter a valid phone number.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setErrorMessage('Please enter a valid email address.')
      return
    }
    const checked = validateInquiry({ ...formData, faxNumber: honeypot, source: 'Equipment inquiry form' })
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
          source: 'Equipment inquiry form',
          idempotencyKey: idempotencyKey.current,
          faxNumber: honeypot,
        }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setInquiryResult({ referenceId: data.referenceId, emailStatus: data.emailStatus })
        setFormSubmitted(true)
      } else {
        setErrorMessage(data.error || 'Failed to submit the inquiry.')
      }
    } catch {
      setErrorMessage('Network error. Please try again or reach LDS directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const mediaMap: Record<string, string> = {
    transformers:       MEDIA.equipment.transformers,
    switchgear:         MEDIA.equipment.switchgear,
    powerControlCenter: MEDIA.equipment.powerControlCenter,
    capacitorBank:      MEDIA.equipment.capacitorBank,
    busduct:            MEDIA.equipment.busduct,
    apfcControlPanels:  MEDIA.equipment.apfcControlPanels,
  }

  const posterMap: Record<string, string> = {
    transformers:       '/media/posters/hero-bg.jpg',
    switchgear:         '/media/posters/substation.jpg',
    powerControlCenter: '/media/posters/power-control-center.jpg',
    capacitorBank:      '/media/posters/capacitor-bank.jpg',
    busduct:            '/media/posters/busduct.jpg',
    apfcControlPanels:  '/media/posters/capacitor-bank.jpg',
  }

  const objectPositionMap: Record<string, string> = {
    transformers: 'center center',
    switchgear: 'center 42%',
    powerControlCenter: 'center center',
    capacitorBank: 'center center',
    busduct: 'center center',
    apfcControlPanels: 'center 32%',
  }

  return (
    <PageLayout>
      {/* ── Hero Section ──────────────────────────────────────────────────────── */}
      <section className="section-py" style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--line-soft)', marginTop: '72px' }}>
        <div className="site-container">
          <BackNav fallbackHref="/" label="Home" />
          <div className="section-label">
            <span className="section-label-bullet" />
            <span className="t-label">PRODUCTS &amp; EQUIPMENT</span>
          </div>
          <h1 className="t-headline" style={{ marginBottom: '24px', fontSize: 'clamp(32px, 5vw, 64px)', lineHeight: 1.05, textWrap: 'balance' }}>
            Electrical Equipment Built for{' '}
            <span style={{ color: 'var(--accent-gold)' }}>Reliable Performance.</span>
          </h1>
          <p className="t-body" style={{ maxWidth: '680px', fontSize: 'clamp(16px, 1.2vw, 20px)', lineHeight: 1.6 }}>
            Lukhdatar &amp; Sons supplies and installs spec-compliant power distribution equipment, transformers, switchgear, control panels, and bus duct trunking.
          </p>
        </div>
      </section>

      {/* ── Equipment Cinematics Section (Stable Frame Dimensions) ─────────────── */}
      <section className="section-py" style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--line-soft)' }}>
        <div className="site-container">
          <div className="section-label" style={{ marginBottom: '20px' }}>
            <span className="section-label-bullet" />
            <span className="t-label">PRIMARY EQUIPMENT CATEGORIES</span>
          </div>
          <h2 className="t-headline" style={{ fontSize: 'clamp(26px, 3.2vw, 40px)', marginBottom: '36px', textWrap: 'balance' }}>
            Power Distribution &amp;{' '}
            <span style={{ color: 'var(--accent-gold)' }}>Control Assemblies</span>
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '16px',
            marginBottom: '48px',
          }}>
            {EQUIPMENT_RANGE.map((item) => (
              <div
                key={item.id}
                style={{
                  position: 'relative',
                  aspectRatio: '4/5',
                  overflow: 'hidden',
                  background: 'var(--surface)',
                  border: '1px solid var(--line-soft)',
                }}
              >
                {/* Video adapts to frame with object-fit: cover, frame never resizes */}
                <div style={{ position: 'absolute', inset: 0 }}>
                  <LazyVideo
                    src={mediaMap[item.mediaKey] || MEDIA.equipment.busduct}
                    poster={posterMap[item.mediaKey] || '/media/posters/busduct.jpg'}
                    autoPlay
                    muted
                    playsInline
                    loop
                    style={{ objectPosition: objectPositionMap[item.mediaKey] || 'center center' }}
                  />
                </div>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(17,24,32,0.92) 0%, rgba(17,24,32,0.3) 50%, transparent 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '28px 24px',
                }}>
                  <div style={{ fontSize: '10px', fontWeight: 600, color: 'var(--accent-gold)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Equipment Category
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#FAF8F5', marginBottom: '8px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '12.5px', color: 'rgba(250,248,245,0.72)', lineHeight: 1.5, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Equipment Categories List & Quote Form (Section 24) ────────────────── */}
      <section className="section-py" id="quote" style={{ background: 'var(--bg-primary)' }}>
        <div className="site-container">
          <div className="two-col" style={{ alignItems: 'start' }}>
            {/* Left Column: Full 17 Prospectus Equipment Items */}
            <div>
              <div className="section-label" style={{ marginBottom: '16px' }}>
                <span className="section-label-bullet" />
                <span className="t-label">VERIFIED EQUIPMENT RANGE</span>
              </div>
              <h2 className="t-headline" style={{ fontSize: 'clamp(24px, 3vw, 38px)', marginBottom: '24px', textWrap: 'balance' }}>
                Complete Switchgear,{' '}
                <span style={{ color: 'var(--accent-gold)' }}>Panels &amp; Distribution</span>
              </h2>
              <p className="t-body" style={{ maxWidth: '480px', marginBottom: '32px' }}>
                Manufactured and supplied to strict technical specifications. Available in standard and custom engineering configurations with full compliance documentation.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '10px' }}>
                {EQUIPMENT_CATEGORIES.map((cat, idx) => (
                  <div
                    key={cat}
                    style={{
                      padding: '14px 18px',
                      background: 'var(--bg-light)',
                      border: '1px solid var(--line-soft)',
                      fontSize: '13px',
                      fontWeight: 500,
                      color: 'var(--text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent-gold)', flexShrink: 0 }} />
                    <span>{cat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Send Inquiry form */}
            <div className="vendor-quote-card" style={{ background: 'var(--bg-light)', border: '1px solid var(--line-gold)', padding: 'clamp(24px, 3.5vw, 40px)', position: 'sticky', top: '100px' }}>
              {!formSubmitted ? (
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
                  <div>
                    <div className="section-label" style={{ marginBottom: '6px' }}>
                      <span className="section-label-bullet" />
                      <span className="t-label">Direct Enquiry</span>
                    </div>
                    <h3 className="t-headline" style={{ fontSize: '22px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                      SEND INQUIRY
                    </h3>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
                      Tell us about your electrical project and our team will get in touch.
                    </p>
                  </div>

                  {errorMessage && (
                    <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#dc2626', padding: '10px 14px', fontSize: '12.5px' }}>
                      {errorMessage}
                    </div>
                  )}

                  <div className="vendor-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        style={{ padding: '10px 12px', background: 'var(--bg-primary)', border: '1px solid var(--line)', fontSize: '13px', color: 'var(--text-primary)', width: '100%', minHeight: '44px' }}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        Company Name
                      </label>
                      <input
                        type="text"
                        placeholder="Company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        style={{ padding: '10px 12px', background: 'var(--bg-primary)', border: '1px solid var(--line)', fontSize: '13px', color: 'var(--text-primary)', width: '100%', minHeight: '44px' }}
                      />
                    </div>
                  </div>

                  <div className="vendor-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 Phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={{ padding: '10px 12px', background: 'var(--bg-primary)', border: '1px solid var(--line)', fontSize: '13px', color: 'var(--text-primary)', width: '100%', minHeight: '44px' }}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={{ padding: '10px 12px', background: 'var(--bg-primary)', border: '1px solid var(--line)', fontSize: '13px', color: 'var(--text-primary)', width: '100%', minHeight: '44px' }}
                      />
                    </div>
                  </div>

                  <div className="vendor-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        Project Type *
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        style={{ padding: '10px 12px', background: 'var(--bg-primary)', border: '1px solid var(--line)', fontSize: '13px', color: 'var(--text-primary)', width: '100%', minHeight: '44px' }}
                      >
                        {PROJECT_TYPES.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        Project Location
                      </label>
                      <input
                        type="text"
                        placeholder="City, State"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        style={{ padding: '10px 12px', background: 'var(--bg-primary)', border: '1px solid var(--line)', fontSize: '13px', color: 'var(--text-primary)', width: '100%', minHeight: '44px' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      Requirement / Project Details *
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="e.g. 11KV Substation, PCC Panels, Cable Laying"
                      value={formData.requirement}
                      onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                      style={{ padding: '10px 12px', background: 'var(--bg-primary)', border: '1px solid var(--line)', fontSize: '13px', color: 'var(--text-primary)', resize: 'vertical' }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      Message (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Additional project details or timeline..."
                      style={{ padding: '10px 12px', background: 'var(--bg-primary)', border: '1px solid var(--line)', fontSize: '13px', color: 'var(--text-primary)', resize: 'vertical' }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="cta-btn cta-btn-primary"
                    style={{
                      justifyContent: 'center',
                      padding: '13px 20px',
                      fontSize: '12px',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      opacity: isSubmitting ? 0.7 : 1,
                      minHeight: '44px',
                    }}
                  >
                    {isSubmitting ? 'SENDING INQUIRY...' : 'SEND INQUIRY ↗'}
                  </button>
                </form>
              ) : (
                <div style={{ textAlign: 'center', padding: '32px 16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(201, 160, 82, 0.15)', border: '1px solid var(--accent-gold)', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', margin: '0 auto 16px' }}>
                    ✓
                  </div>
                  <div className="section-label" style={{ justifyContent: 'center', marginBottom: '8px' }}>
                    <span className="section-label-bullet" />
                    <span className="t-label">Submission Confirmed</span>
                  </div>
                  <h3 className="t-headline" style={{ fontSize: '22px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px' }}>
                    {inquiryResult?.emailStatus === 'sent' ? 'Thank you for contacting Lukhdatar & Sons.' : 'Your inquiry has been saved.'}
                  </h3>
                  <p className="t-body" style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '12px' }}>
                    {inquiryResult?.emailStatus === 'sent'
                      ? 'Your inquiry has been received. Our team will review your requirements and contact you using the details provided.'
                      : 'Your inquiry was saved, but email delivery to the LDS team is not confirmed. Please try again or contact LDS directly using the published email addresses.'}
                  </p>
                  {inquiryResult?.referenceId && (
                    <p className="t-label" style={{ marginBottom: '24px' }}>Inquiry reference {inquiryResult.referenceId}</p>
                  )}
                  <button
                    onClick={() => {
                      setFormSubmitted(false)
                      setFormData({
                        name: '',
                        company: '',
                        phone: '',
                        email: '',
                        projectType: 'Electrical Equipment Supply',
                        location: '',
                        requirement: '',
                        message: '',
                      })
                    }}
                    className="cta-btn"
                    style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.10em', margin: '0 auto' }}
                  >
                    Submit Another Requirement
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .vendor-quote-card {
            position: static !important;
            margin-top: 32px;
          }
        }
        @media (max-width: 640px) {
          .vendor-form-row {
            grid-template-columns: 1fr !important;
            gap: 10px !important;
          }
          .vendor-quote-card input,
          .vendor-quote-card select,
          .vendor-quote-card textarea {
            font-size: 16px !important; /* Prevents iOS auto-zoom */
          }
        }
      `}</style>
    </PageLayout>
  )
}
