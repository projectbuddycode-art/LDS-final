'use client'

import { useEffect, useRef } from 'react'
import { MEDIA } from '@/data/media'
import LazyVideo from '@/components/LazyVideo'

const LIFECYCLE_STAGES = [
  { number: '01', label: 'Engineering', detail: 'Electrical design, load calculations, SLDs' },
  { number: '02', label: 'Supply', detail: 'Verified equipment from approved manufacturers' },
  { number: '03', label: 'Installation', detail: 'Site works, cable laying, equipment erection' },
  { number: '04', label: 'Testing', detail: 'HV testing, insulation resistance, relay settings' },
  { number: '05', label: 'Commissioning', detail: 'Energisation, load trials, documentation' },
  { number: '06', label: 'Maintenance', detail: 'Scheduled preventive maintenance programs' },
  { number: '07', label: 'Lifecycle Support', detail: 'Ongoing operational support post-handover' },
]

const CAPABILITY_GROUPS = [
  {
    title: 'Design & Engineering',
    items: ['Complete electrical design and backup', 'Project engineering'],
  },
  {
    title: 'Substations & Power Infrastructure',
    items: ['Compact and conventional substations', 'Switchyards', 'Transformers', 'VCBs', 'HT and LT distribution'],
  },
  {
    title: 'Electrification & Cabling',
    items: ['Internal electrification', 'External electrification', 'HT and LT cabling', 'Industrial electrification', 'Wiring and cabling'],
  },
  {
    title: 'Lighting',
    items: ['Street lighting', 'Aviation lighting', 'Yard lighting', 'General illumination', 'Supply and installation of lighting fixtures'],
  },
  {
    title: 'Protection & Safety',
    items: ['Earthing', 'Lightning protection', 'Fire detection systems'],
  },
  {
    title: 'Building & Communication Systems',
    items: ['Public address systems', 'EPABX systems', 'Voice and data cabling', 'MATV cabling', 'UPS systems'],
  },
  {
    title: 'Fabrication & Site Infrastructure',
    items: ['Cable trays', 'Cable ducts', 'Steel structures', 'Towers', 'Light poles', 'High masts'],
  },
  {
    title: 'Electrical Equipment',
    items: [
      'LT MCC / PCC',
      'Panels',
      'Power factor improvement capacitor panels',
      'AMF panels',
      'Instrumentation panels',
      'Control panels',
      'LT rising mains',
      'Junction boxes',
      'Tap-off boxes',
      'LT distribution boards',
      'Control desks',
      'LT bus ducts',
      'DG Synchronising Panels',
      'Switchboards',
      'LT feeder pillar boards'
    ],
  },
]

export default function TurnkeySection() {
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
        section.querySelectorAll('[data-reveal]').forEach((el, i) => {
          gsap.fromTo(el,
            { y: 18, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: i * 0.07,
              scrollTrigger: { trigger: el, start: 'top 90%', once: true },
            }
          )
        })

        // Animate the connecting line
        const line = section.querySelector('[data-connector-line]')
        if (line) {
          gsap.fromTo(line,
            { scaleX: 0 },
            {
              scaleX: 1, duration: 1.4, ease: 'power2.inOut',
              transformOrigin: 'left center',
              scrollTrigger: { trigger: line, start: 'top 88%', once: true },
            }
          )
        }

        // Stages reveal sequentially
        section.querySelectorAll('[data-stage]').forEach((el, i) => {
          gsap.fromTo(el,
            { y: 14, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: i * 0.08,
              scrollTrigger: { trigger: section.querySelector('[data-stages-row]'), start: 'top 85%', once: true },
            }
          )
        })

        // Video reveal
        const visual = section.querySelector('[data-visual]')
        if (visual) {
          gsap.fromTo(visual,
            { clipPath: 'inset(0 0 100% 0)' },
            {
              clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'expo.out',
              scrollTrigger: { trigger: visual, start: 'top 82%', once: true },
            }
          )
        }
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
      className="section-py"
      style={{ background: 'var(--bg-primary)', borderTop: '1px solid var(--line-soft)' }}
      aria-label="Turnkey electrification lifecycle"
    >
      <div className="site-container">

        {/* Header */}
        <div style={{ marginBottom: 'clamp(36px, 4.5vw, 56px)' }}>
          <div data-reveal className="section-label">
            <span className="section-label-bullet" />
            <span className="t-label">06 — Turnkey Electrification</span>
          </div>

          <div id="turnkey-header" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(24px, 4vw, 64px)',
            alignItems: 'end',
            marginTop: '20px',
          }}>
            <h2 data-reveal className="t-headline">
              One scope.
              <br />
              <span style={{ color: 'var(--accent-gold)' }}>One accountable</span>
              <br />
              delivery.
            </h2>
            <p data-reveal className="t-body" style={{ maxWidth: '400px' }}>
              Lukhdatar & Sons manages complete electrical SITC under single-point project accountability. We coordinate engineering layout reviews, spec-compliant procurement, field installation, pre-commissioning testing, and utility grid energisation across Government and Private sector projects.
            </p>
          </div>
        </div>

        {/* Lifecycle flow — 7 stages */}
        <div style={{ marginBottom: 'clamp(36px, 4.5vw, 56px)', position: 'relative' }}>

          {/* Connector line */}
          <div
            data-connector-line
            style={{
              position: 'absolute',
              top: '15px',
              left: '0',
              right: '0',
              height: '1px',
              background: 'var(--line)',
              zIndex: 0,
            }}
          />

          <div
            data-stages-row
            className="turnkey-stages-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              position: 'relative',
              gap: '0',
            }}
          >
            {LIFECYCLE_STAGES.map((stage, i) => (
              <div
                key={stage.number}
                data-stage
                className="turnkey-stage-item"
                style={{
                  padding: 'clamp(24px, 3vw, 40px) clamp(12px, 1.5vw, 20px) clamp(20px, 2.5vw, 32px)',
                  position: 'relative',
                  background: 'var(--bg-primary)',
                }}
              >
                {/* Stage node */}
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: i >= 5 ? 'var(--accent-gold)' : 'var(--node-inactive)',
                  marginBottom: '16px',
                  position: 'relative',
                  zIndex: 1,
                  border: i >= 5 ? '1px solid var(--accent-gold)' : '1px solid var(--line)',
                }} />

                {/* Number */}
                <div style={{
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  color: i >= 5 ? 'var(--accent-gold)' : 'var(--text-muted)',
                  marginBottom: '8px',
                }}>
                  {stage.number}
                </div>

                {/* Label */}
                <div style={{
                  fontSize: 'clamp(12px, 1vw, 14px)',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.01em',
                  marginBottom: '6px',
                  lineHeight: 1.3,
                }}>
                  {stage.label}
                </div>

                {/* Detail */}
                <div style={{
                  fontSize: '11px',
                  fontWeight: 400,
                  color: 'var(--text-muted)',
                  lineHeight: 1.5,
                }}>
                  {stage.detail}
                </div>

                {/* "Post-Commissioning" badge */}
                {i >= 5 && (
                  <div style={{
                    marginTop: '10px',
                    fontSize: '9px',
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--accent-gold)',
                    borderTop: '1px solid var(--line-gold)',
                    paddingTop: '8px',
                  }}>
                    Post-Commissioning
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Capability Groups Grid */}
        <div data-reveal style={{ marginTop: 'clamp(40px, 5vw, 64px)', marginBottom: 'clamp(40px, 5vw, 64px)' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '24px',
            paddingBottom: '16px',
            borderBottom: '1px solid var(--line)',
          }}>
            <span className="t-label" style={{ color: 'var(--text-muted)' }}>Turnkey Scope of Activities</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--line-soft)' }} />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
            border: '1px solid var(--line)',
          }}>
            {CAPABILITY_GROUPS.map((group) => (
              <div key={group.title} style={{
                padding: '24px 28px',
                borderRight: '1px solid var(--line-soft)',
                borderBottom: '1px solid var(--line-soft)',
              }}>
                <h3 style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-gold)',
                  marginBottom: '14px',
                }}>
                  {group.title}
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {group.items.map((item) => (
                    <li key={item} style={{
                      fontSize: '12px',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.4,
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                    }}>
                      <span style={{
                        display: 'inline-block',
                        width: '3px',
                        height: '3px',
                        borderRadius: '50%',
                        background: 'var(--accent-gold)',
                        marginTop: '6px',
                        flexShrink: 0,
                      }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Full-width site video */}
        <div
          data-visual
          className="media-frame"
          style={{
            aspectRatio: '21/9',
            clipPath: 'inset(0 0 0% 0)',
          }}
        >
          <LazyVideo
            src={MEDIA.workers}
            poster="/media/posters/workers.jpg"
            aria-label="Lukhdatar & Sons engineers at work on electrical infrastructure"
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(10,14,18,0.60) 0%, transparent 50%)',
            zIndex: 2,
            display: 'flex',
            alignItems: 'flex-end',
            padding: 'clamp(20px, 3vw, 36px)',
          }}>
            <div>
              <div className="t-label" style={{ color: 'rgba(250,248,245,0.50)', marginBottom: '8px' }}>
                Site Execution
              </div>
              <div style={{
                fontSize: 'clamp(16px, 1.8vw, 22px)',
                fontWeight: 600,
                color: '#FAF8F5',
                letterSpacing: '-0.01em',
                lineHeight: 1.3,
              }}>
                Engineering · Supply · Installation<br />Testing · Commissioning
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Responsive */}
      <style>{`
        .turnkey-stages-grid {
          border: 1px solid var(--line);
        }
        .turnkey-stage-item {
          border-right: 1px solid var(--line-soft);
          transition: background-color 300ms ease, transform 300ms ease;
        }
        .turnkey-stage-item:last-child {
          border-right: none;
        }
        .turnkey-stage-item:hover {
          background-color: rgba(201, 160, 82, 0.03);
        }
        @media (max-width: 768px) {
          #turnkey-header {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          [data-visual].media-frame {
            aspect-ratio: 16/9 !important;
          }
        }
        @media (max-width: 1024px) {
          [data-connector-line] {
            display: none !important;
          }
          .turnkey-stages-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
          .turnkey-stage-item {
            border-bottom: 1px solid var(--line-soft);
          }
          .turnkey-stage-item:nth-child(4n) {
            border-right: none !important;
          }
        }
        @media (max-width: 640px) {
          .turnkey-stages-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .turnkey-stage-item:nth-child(4n) {
            border-right: 1px solid var(--line-soft) !important;
          }
          .turnkey-stage-item:nth-child(2n) {
            border-right: none !important;
          }
          .turnkey-stage-item:last-child {
            grid-column: span 2;
          }
        }
        @media (max-width: 420px) {
          .turnkey-stages-grid {
            grid-template-columns: 1fr !important;
          }
          .turnkey-stage-item {
            border-right: none !important;
            grid-column: auto !important;
          }
        }
      `}</style>
    </section>
  )
}
