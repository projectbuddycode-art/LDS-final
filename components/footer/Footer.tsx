'use client'

import Link from 'next/link'
import Image from 'next/image'
import { COMPANY, FOOTER_SECTIONS } from '@/data/content'
import { openQuoteModal } from '@/lib/quoteEvents'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer-root" aria-label="Site footer" id="footer">
      <div className="site-container">

        {/* Top grid */}
        <div className="footer-grid">

          {/* Brand column */}
          <div>
            {/* Actual LDS Logo — inverted/filtered for dark footer */}
            <Link href="/" aria-label="Lukhdatar & Sons — Home" style={{ display: 'inline-block', textDecoration: 'none', marginBottom: '28px' }}>
              <Image
                src="/media/lds-logo-v2.png"
                alt="Lukhdatar & Sons"
                width={160}
                height={68}
                style={{
                  height: '52px',
                  width: 'auto',
                  maxWidth: '160px',
                  objectFit: 'contain',
                  filter: 'brightness(0) invert(1) drop-shadow(0 2px 8px rgba(0,0,0,0.5))',
                }}
              />
            </Link>

            <p style={{
              fontSize: '14px',
              lineHeight: 1.7,
              color: 'rgba(250,248,245,0.50)',
              maxWidth: '280px',
              marginBottom: '28px',
            }}>
              Complete electrical solutions from design and equipment supply to installation, testing, commissioning and maintenance.
            </p>

            <div style={{ fontSize: '12.5px', color: 'rgba(250,248,245,0.45)', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div>
                <strong style={{ color: 'rgba(250,248,245,0.70)', fontWeight: 600 }}>Registered Office:</strong>
                <br />
                {COMPANY.registeredAddress}
              </div>
              <div>
                <strong style={{ color: 'rgba(250,248,245,0.70)', fontWeight: 600 }}>Project Office:</strong>
                <br />
                {COMPANY.projectOffice}
              </div>
              <div style={{ marginTop: '4px' }}>
                <a
                  href={`mailto:${COMPANY.emails[0]}`}
                  style={{
                    color: 'var(--accent-gold)',
                    textDecoration: 'none',
                    transition: 'opacity 250ms ease',
                    display: 'block',
                    wordBreak: 'break-all',
                    overflowWrap: 'anywhere',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  {COMPANY.emails[0]}
                </a>
                <a
                  href={`mailto:${COMPANY.emails[1]}`}
                  style={{
                    color: 'var(--accent-gold)',
                    textDecoration: 'none',
                    transition: 'opacity 250ms ease',
                    display: 'block',
                    marginTop: '2px',
                    wordBreak: 'break-all',
                    overflowWrap: 'anywhere',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  {COMPANY.emails[1]}
                </a>
              </div>
            </div>

            {/* Send Inquiry CTA */}
            <div style={{ marginTop: '32px' }}>
              <button
                onClick={() => openQuoteModal()}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#FAF8F5',
                  background: 'rgba(201,160,82,0.18)',
                  cursor: 'pointer',
                  padding: '12px 20px',
                  border: '1px solid var(--accent-gold)',
                  borderRadius: '2px',
                  transition: 'all 300ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-gold)'
                  e.currentTarget.style.background = 'var(--accent-gold)'
                  e.currentTarget.style.color = '#111820'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-gold)'
                  e.currentTarget.style.background = 'rgba(201,160,82,0.18)'
                  e.currentTarget.style.color = '#FAF8F5'
                }}
              >
                Send Inquiry
                <span style={{ display: 'inline-block', transition: 'transform 250ms ease' }}>↗</span>
              </button>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_SECTIONS.map((col) => (
            <div key={col.heading}>
              <div style={{
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(250,248,245,0.35)',
                marginBottom: '20px',
              }}>
                {col.heading}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {col.links.map((link) => (
                  <Link key={link.label} href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(250,248,245,0.10)', marginBottom: '32px' }} />

        {/* Bottom bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <p style={{ fontSize: '12px', color: 'rgba(250,248,245,0.28)', letterSpacing: '0.04em' }}>
            © {currentYear} {COMPANY.legalName} All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <span style={{
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(250,248,245,0.22)',
            }}>
              Est. {COMPANY.founded}
            </span>
            <span style={{
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(250,248,245,0.22)',
            }}>
              Kolkata, India
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
