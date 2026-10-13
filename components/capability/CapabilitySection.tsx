'use client'

import { useEffect, useRef } from 'react'

const CAPABILITY_STATS = [
  {
    value: '1997',
    label: 'Established',
    detail: 'Lukhdatar & Sons founded in Kolkata',
  },
  {
    value: '2007',
    label: 'Turnkey Contracting Since',
    detail: 'Full electrical contracting capability',
  },
  {
    value: '11KV',
    label: 'Distribution Networks',
    detail: 'HT distribution systems',
  },
  {
    value: '33KV',
    label: 'Distribution Substations',
    detail: '33/11KV substation distribution',
  },
  {
    value: '132KV',
    label: 'Substation and Switchyard',
    detail: 'Substation and switchyard works',
  },
]


export default function CapabilitySection() {
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
              y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: i * 0.06,
              scrollTrigger: { trigger: el, start: 'top 90%', once: true },
            }
          )
        })

        // Stat cells — sequential reveal
        section.querySelectorAll('[data-stat-cell]').forEach((el, i) => {
          gsap.fromTo(el,
            { y: 14, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: i * 0.09,
              scrollTrigger: { trigger: section.querySelector('[data-stats-grid]'), start: 'top 88%', once: true },
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
      id="capabilities"
      className="section-py"
      style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--line-soft)' }}
      aria-label="Engineering capability"
    >
      <div className="site-container">

        {/* Header */}
        <div style={{ marginBottom: 'clamp(36px, 4.5vw, 60px)' }}>
          <div data-reveal className="section-label">
            <span className="section-label-bullet" />
            <span className="t-label">05 — Engineering Capability</span>
          </div>

          <div id="capability-header" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(24px, 4vw, 64px)',
            alignItems: 'end',
            marginTop: '20px',
          }}>
            <h2 data-reveal className="t-headline">
              Engineering at
              <br />
              <span style={{ color: 'var(--accent-gold)' }}>every voltage.</span>
            </h2>
            <p data-reveal className="t-body" style={{ maxWidth: '400px' }}>
              Lukhdatar & Sons delivers complete electrical infrastructure across Government and Private sectors, managing low, medium, and high-voltage distribution, underground cable systems, and substation works.
            </p>
          </div>
        </div>

        {/* Stats grid — 5 columns desktop, 3 tablet, 2 mobile, 1 small mobile */}
        <div
          data-stats-grid
          className="capability-stats-grid"
        >
          {CAPABILITY_STATS.map((stat, i) => (
            <div
              key={stat.value}
              data-stat-cell
              className="capability-stat-item"
              style={{
                padding: 'clamp(20px, 2.5vw, 36px) clamp(16px, 2vw, 28px)',
                position: 'relative',
              }}
            >
              {/* Gold accent rule at top */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 'clamp(16px, 2vw, 28px)',
                width: '24px',
                height: '2px',
                background: 'var(--accent-gold)',
                opacity: i === 4 ? 1 : 0.4,
              }} />

              <div style={{
                fontSize: 'clamp(22px, 2.4vw, 34px)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
                lineHeight: 1,
                marginBottom: '8px',
                marginTop: '12px',
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--accent-gold)',
                marginBottom: '6px',
                lineHeight: 1.3,
              }}>
                {stat.label}
              </div>
              <div style={{
                fontSize: '11px',
                fontWeight: 400,
                color: 'var(--text-muted)',
                lineHeight: 1.5,
              }}>
                {stat.detail}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Responsive */}
      <style>{`
        .capability-stats-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          border: 1px solid var(--line);
          margin-bottom: clamp(40px, 5vw, 64px);
        }
        .capability-stat-item {
          border-right: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
        }
        .capability-stat-item:nth-child(5n) {
          border-right: none;
        }
        [data-stat-cell] {
          transition: background-color 300ms ease, transform 300ms ease;
        }
        [data-stat-cell]:hover {
          background-color: rgba(201, 160, 82, 0.04);
        }
        @media (max-width: 768px) {
          #capability-header {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
        @media (max-width: 1024px) {
          .capability-stats-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          .capability-stat-item:nth-child(5n) {
            border-right: 1px solid var(--line) !important;
          }
          .capability-stat-item:nth-child(3n) {
            border-right: none !important;
          }
        }
        @media (max-width: 640px) {
          .capability-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .capability-stat-item:nth-child(3n) {
            border-right: 1px solid var(--line) !important;
          }
          .capability-stat-item:nth-child(2n) {
            border-right: none !important;
          }
          .capability-stat-item:last-child {
            grid-column: span 2;
          }
        }
        @media (max-width: 420px) {
          .capability-stats-grid {
            grid-template-columns: 1fr !important;
          }
          .capability-stat-item {
            border-right: none !important;
            grid-column: auto !important;
          }
        }
      `}</style>
    </section>
  )
}
