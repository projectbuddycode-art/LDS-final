'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { MEDIA } from '@/data/media'

const FOUNDER_STORY = [
  {
    year: '1997',
    label: 'Company Foundation',
    body: 'Lukhdatar & Sons was established by Mr. Lalit Kumar Sureka in Kolkata as an electrical goods and equipment supply enterprise. Operating directly in the field provided Mr. Sureka with practical insight into component specifications, installation requirements, and the coordination needed for reliable electrical execution.',
  },
  {
    year: '2007',
    label: 'Turnkey Contracting Expansion',
    body: 'Building on a decade of supplier relationships and technical knowledge, the company expanded into complete turnkey electrical contracting. This transition established single-point accountability for engineering coordination, equipment procurement, site installation, testing, commissioning, and post-handover maintenance across Government and Private sector projects.',
  },
  {
    year: 'Present',
    label: 'Multi-Sector Infrastructure',
    body: 'Today, Lukhdatar & Sons delivers comprehensive electrical infrastructure across commercial, healthcare, residential township, industrial, public, and substation developments, with high-voltage capabilities spanning underground cable systems up to 66KV, substations up to 220KV, and overhead transmission lines up to 400KV.',
  },
]

const SHREE_MILESTONE = {
  year: '2013',
  label: 'Shree Joined Lukhdatar & Sons',
  body: 'As the current owner of the company, he oversees project delivery.',
}

const MD_STORY = [
  {
    label: 'Delivery Standards & Lifecycle Support',
    body: 'Lukhdatar & Sons has maintained consistent engineering standards and timeline adherence across diverse contract sizes. The company prioritizes pre-commissioning testing rigour, clear technical documentation, and post-commissioning routine maintenance to support long-term client relationships and repeat engagements.',
  },
]

export default function LeadershipSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let isUnmounted = false
    let ctx: any
    const section = sectionRef.current
    if (!section) return

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (isUnmounted) return

      ctx = gsap.context(() => {
        // Portrait clip-path reveals — bottom to top
        section.querySelectorAll('[data-portrait-reveal]').forEach((el, i) => {
          gsap.fromTo(el,
            { clipPath: 'inset(0 0 100% 0)', opacity: 0.6 },
            {
              clipPath: 'inset(0 0 0% 0)',
              opacity: 1,
              duration: 1.1,
              ease: 'expo.out',
              delay: i * 0.18,
              scrollTrigger: { trigger: section.querySelector('[data-portraits]'), start: 'top 82%', once: true },
            }
          )
        })

        // Text reveals — staggered, subtle
        section.querySelectorAll('[data-reveal]').forEach((el, i) => {
          gsap.fromTo(el,
            { y: 18, opacity: 0 },
            {
              y: 0, opacity: 1,
              duration: 0.72,
              ease: 'power3.out',
              delay: i * 0.06,
              scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            }
          )
        })
      }, section)
    }

    init()
    return () => {
      isUnmounted = true
      if (ctx) ctx.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="company"
      className="section-py"
      style={{ background: 'var(--bg-primary)', borderTop: '1px solid var(--line-soft)' }}
      aria-label="Leadership and company story"
    >
      <div className="site-container">

        {/* Section label */}
        <div data-reveal className="section-label" style={{ marginBottom: '48px' }}>
          <span className="section-label-bullet" />
          <span className="t-label">02 — Founder / Leadership</span>
        </div>

        {/* Main grid: portraits LEFT, story RIGHT */}
        <div className="leadership-main-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'clamp(240px, 28%, 380px) 1fr',
          gap: 'clamp(40px, 6vw, 88px)',
          alignItems: 'start',
        }}>

          {/* ── LEFT: Portrait column ─────────────────── */}
          <div data-portraits className="leadership-portraits-col" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

            {/* Founder portrait */}
            <div>
              <div
                data-portrait-reveal
                className="leadership-portrait-card"
                style={{
                  position: 'relative',
                  aspectRatio: '3/4',
                  overflow: 'hidden',
                  background: 'var(--surface)',
                  marginBottom: '14px',
                }}
              >
                <Image
                  src={MEDIA.leadership.founder}
                  alt="Mr. Lalit Kumar Sureka, Founder of Lukhdatar & Sons"
                  fill
                  sizes="(max-width: 768px) 90vw, 28vw"
                  style={{ objectFit: 'cover', objectPosition: 'top center' }}
                  priority
                />
                {/* Subtle gold rule at bottom */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'var(--accent-gold)',
                  opacity: 0.5,
                  zIndex: 2,
                }} />
              </div>
              <div data-reveal>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                  Mr. Lalit Kumar Sureka
                </div>
                <div className="t-label" style={{ color: 'var(--accent-gold)', marginTop: '5px' }}>Founder · Est. 1997</div>
              </div>
            </div>

            {/* MD portrait */}
            <div>
              <div
                data-portrait-reveal
                className="leadership-portrait-card"
                style={{
                  position: 'relative',
                  aspectRatio: '3/4',
                  overflow: 'hidden',
                  background: 'var(--surface)',
                  marginBottom: '14px',
                }}
              >
                <Image
                  src={MEDIA.leadership.md}
                  alt="Mr. Shree Mangalam Sureka, current owner of Lukhdatar & Sons"
                  fill
                  sizes="(max-width: 768px) 90vw, 28vw"
                  style={{ objectFit: 'cover', objectPosition: 'top center' }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'var(--accent-gold)',
                  opacity: 0.5,
                  zIndex: 2,
                }} />
              </div>
              <div data-reveal>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                  Mr. Shree Mangalam Sureka
                </div>
                <div className="t-label" style={{ color: 'var(--accent-gold)', marginTop: '5px' }}>Current Owner</div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Story column ───────────────────── */}
          <div>
            <h2 data-reveal className="t-headline" style={{ marginBottom: '10px' }}>
              Built from
              {' '}<span style={{ color: 'var(--accent-gold)' }}>three decades</span>
              {' '}of craft.
            </h2>

            <p data-reveal className="t-body" style={{ maxWidth: '540px', marginBottom: '44px' }}>
              From a Kolkata electrical supply business to a full-service turnkey contractor — the
              evolution of Lukhdatar &amp; Sons reflects a deliberate accumulation of technical knowledge,
              field experience and delivery capability.
            </p>

            {/* Founder timeline */}
            <div style={{ marginBottom: '48px' }}>
              <div data-reveal style={{
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: '20px',
                paddingBottom: '12px',
                borderBottom: '1px solid var(--line)',
              }}>
                Founding Leadership — Mr. Lalit Kumar Sureka
              </div>

              {FOUNDER_STORY.map((item, i) => (
                <div
                  key={item.year}
                  data-reveal
                  className="founder-story-row"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '64px 1fr',
                    gap: '16px',
                    padding: '18px 0',
                    borderBottom: '1px solid var(--line-soft)',
                  }}
                >
                  <div>
                    <div style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                      color: 'var(--accent-gold)',
                      lineHeight: 1,
                      marginBottom: '6px',
                    }}>
                      {item.year}
                    </div>
                    <div style={{
                      width: '16px',
                      height: '1px',
                      background: 'var(--line-gold)',
                    }} />
                  </div>
                  <div>
                    <div style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--text-primary)',
                      marginBottom: '8px',
                    }}>
                      {item.label}
                    </div>
                    <p className="t-body" style={{ fontSize: '14px', lineHeight: 1.68 }}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* MD section */}
            <div style={{ marginBottom: '40px' }}>
              <div data-reveal style={{
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: '20px',
                paddingBottom: '12px',
                borderBottom: '1px solid var(--line)',
              }}>
                Current Leadership — Mr. Shree Mangalam Sureka
              </div>

              <div
                data-reveal
                className="founder-story-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '64px 1fr',
                  gap: '16px',
                  padding: '18px 0',
                  borderBottom: '1px solid var(--line-soft)',
                }}
              >
                <div>
                  <div style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    color: 'var(--accent-gold)',
                    lineHeight: 1,
                    marginBottom: '6px',
                  }}>
                    {SHREE_MILESTONE.year}
                  </div>
                  <div style={{
                    width: '16px',
                    height: '1px',
                    background: 'var(--line-gold)',
                  }} />
                </div>
                <div>
                  <div style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--text-primary)',
                    marginBottom: '8px',
                  }}>
                    {SHREE_MILESTONE.label}
                  </div>
                  <p className="t-body" style={{ fontSize: '14px', lineHeight: 1.68 }}>{SHREE_MILESTONE.body}</p>
                </div>
              </div>

              {MD_STORY.map((item) => (
                <div
                  key={item.label}
                  data-reveal
                  style={{
                    padding: '18px 0',
                    borderBottom: '1px solid var(--line-soft)',
                  }}
                >
                  <div style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--text-primary)',
                    marginBottom: '8px',
                  }}>
                    {item.label}
                  </div>
                  <p className="t-body" style={{ fontSize: '14px', lineHeight: 1.68 }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile responsive */}
      <style>{`
        .leadership-portrait-card {
          transition: transform 350ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .leadership-portrait-card:hover {
          transform: translateY(-3px);
        }
        @media (max-width: 900px) {
          .leadership-main-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
          .leadership-portraits-col {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 16px !important;
          }
        }
        @media (max-width: 540px) {
          .leadership-portraits-col {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </section>
  )
}
