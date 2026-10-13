'use client'

import PageLayout from '@/components/layout/PageLayout'
import BackNav from '@/components/navigation/BackNav'
import { VERIFIED_RELATIONSHIPS, ECOSYSTEM_LOGOS } from '@/data/content'
import Image from 'next/image'
import { openQuoteModal } from '@/lib/quoteEvents'

export default function ClientsPartnershipsPage() {
  return (
    <PageLayout>
      {/* ── Hero Section ──────────────────────────────────────────────────────── */}
      <section className="section-py" style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--line-soft)', marginTop: '72px' }}>
        <div className="site-container">
          <BackNav fallbackHref="/" label="Home" />
          <div className="section-label">
            <span className="section-label-bullet" />
            <span className="t-label">Our trusted vendors and collaborators</span>
          </div>
          <h1 className="t-headline" style={{ marginBottom: '24px', fontSize: 'clamp(32px, 5vw, 64px)', lineHeight: 1.05, textWrap: 'balance' }}>
            Trusted Relationships{' '}
            <span style={{ color: 'var(--accent-gold)' }}>Across the Electrical Industry.</span>
          </h1>
          <p className="t-body" style={{ maxWidth: '680px', fontSize: 'clamp(16px, 1.2vw, 20px)', lineHeight: 1.6 }}>
            Lukhdatar &amp; Sons builds execution capability through authorized distributorships, OEM system integration, joint ventures, and trusted project relationships across the public and private sectors.
          </p>
        </div>
      </section>

      {/* ── Verified Strategic Relationships & Authorizations (Section 17, 27) ── */}
      <section className="section-py" style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--line-soft)' }}>
        <div className="site-container">
          <div className="section-label" style={{ marginBottom: '20px' }}>
            <span className="section-label-bullet" />
            <span className="t-label">PROSPECTUS-VERIFIED CREDENTIALS</span>
          </div>
          <h2 className="t-headline" style={{ fontSize: 'clamp(26px, 3.2vw, 40px)', marginBottom: '36px', textWrap: 'balance' }}>
            Authorizations, System House &amp;{' '}
            <span style={{ color: 'var(--accent-gold)' }}>Joint Venture Partnerships</span>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '20px' }}>
            {VERIFIED_RELATIONSHIPS.map((rel, idx) => (
              <div
                key={idx}
                style={{
                  padding: '32px 28px',
                  background: 'var(--bg-light)',
                  border: '1px solid var(--line-soft)',
                  borderTop: '2px solid var(--accent-gold)',
                }}
              >
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--accent-gold)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '10px' }}>
                  {rel.type}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px', lineHeight: 1.3 }}>
                  {rel.partners}
                </h3>
                <p className="t-body" style={{ fontSize: '13.5px', lineHeight: 1.65, margin: 0 }}>
                  {rel.details}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brand Ecosystem — Neutral Relationship Framing (Section 17, 18) ───── */}
      <section className="section-py" style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--line-soft)' }}>
        <div className="site-container">
          <div className="section-label" style={{ marginBottom: '16px' }}>
            <span className="section-label-bullet" />
            <span className="t-label">BRANDS &amp; INDUSTRY RELATIONSHIPS</span>
          </div>
          <h2 className="t-headline" style={{ fontSize: 'clamp(24px, 3vw, 38px)', marginBottom: '16px', textWrap: 'balance' }}>
            Integrated Brands{' '}
            <span style={{ color: 'var(--accent-gold)' }}>&amp; Components</span>
          </h2>
          <p className="t-body" style={{ maxWidth: '640px', marginBottom: '36px' }}>
            LDS procures, configures, and installs high-grade switchgear, cables, transformers, and distribution components from leading approved electrical manufacturers:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 130px), 1fr))', gap: '16px' }}>
            {ECOSYSTEM_LOGOS.map((brand) => (
              <div
                key={brand.name}
                style={{
                  padding: '24px 16px',
                  background: 'var(--bg-light)',
                  border: '1px solid var(--line-soft)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '110px',
                  textAlign: 'center',
                  gap: '12px',
                }}
              >
                <div style={{ width: '80px', height: '40px', position: 'relative' }}>
                  <Image
                    src={brand.logo}
                    alt={brand.alt}
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {brand.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ───────────────────────────────────────────────────────── */}
      <section className="section-py" style={{ background: 'var(--bg-secondary)', textAlign: 'center' }}>
        <div className="site-container">
          <h2 className="t-headline" style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', marginBottom: '20px' }}>
            Interested in partnering with LDS?
          </h2>
          <p className="t-body" style={{ maxWidth: '640px', margin: '0 auto 36px' }}>
            We welcome conversations with organizations looking to build long-term technical, supply, engineering, and project collaborations.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => openQuoteModal()}
              className="cta-btn cta-btn-primary"
              style={{ cursor: 'pointer', fontFamily: 'inherit' }}
            >
              Partner With Us ↗
            </button>
            <a href="/company" className="cta-btn">
              About Us ↗
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
