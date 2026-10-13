'use client'

import { useEffect, useRef } from 'react'
import { MEDIA } from '@/data/media'
import LazyVideo from '@/components/LazyVideo'

const VOLTAGES = [
  { value: '11KV', label: 'Distribution' },
  { value: '33KV', label: 'Distribution' },
  { value: '132KV', label: 'Substation Capability' },
]

export default function TransmissionSection() {
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
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: i * 0.1,
              scrollTrigger: { trigger: el, start: 'top 90%', once: true } }
          )
        })
        const visual = section.querySelector('[data-visual]')
        if (visual) {
          gsap.fromTo(visual,
            { clipPath: 'inset(100% 0 0 0)' },
            { clipPath: 'inset(0% 0 0 0)', duration: 1.1, ease: 'expo.out',
              scrollTrigger: { trigger: visual, start: 'top 85%', once: true } }
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
      aria-label="Substations and switchyards"
    >
      <div className="site-container">

        <div style={{ marginBottom: 'clamp(32px, 4vw, 52px)', textAlign: 'center' }}>
          <div data-reveal className="section-label" style={{ justifyContent: 'center' }}>
            <span className="section-label-bullet" />
            <span className="t-label">08 — Substations</span>
          </div>
          <h2 data-reveal className="t-headline" style={{ marginBottom: '16px', textWrap: 'balance' }}>
            Substations &amp; Switchyards.{' '}
            <span style={{ color: 'var(--accent-gold)' }}>Up to 132KV.</span>
          </h2>
          <p data-reveal className="t-body" style={{ maxWidth: '520px', margin: '0 auto 32px' }}>
            Lukhdatar &amp; Sons delivers substation and switchyard services, including engineering, equipment installation, testing, and commissioning for utility, industrial, and infrastructure developments.
          </p>
        </div>

        {/* Primary video */}
        <div data-visual className="media-frame" style={{ aspectRatio: '16/9', clipPath: 'inset(0% 0 0 0)', marginBottom: 'clamp(32px, 4vw, 52px)' }}>
          <LazyVideo src={MEDIA.transmission} poster="/media/posters/substation.jpg"
            aria-label="Substation and switchyard infrastructure" />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
            background: 'linear-gradient(to top, rgba(10,14,18,0.60) 0%, transparent 100%)', zIndex: 2,
          }} />
          <div style={{ position: 'absolute', bottom: 'clamp(20px, 3vw, 36px)', right: 'clamp(20px, 3vw, 36px)', zIndex: 3 }}>
            <div className="t-label" style={{ color: 'rgba(250,248,245,0.50)', marginBottom: '4px' }}>Substation Capability</div>
            <div style={{ fontSize: 'clamp(28px, 3.5vw, 52px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--accent-gold)', lineHeight: 1 }}>
              132KV
            </div>
          </div>
        </div>

        {/* Major Project Substation Callout */}
        <div data-reveal style={{
          border: '1px solid var(--line-gold)',
          background: 'rgba(201, 160, 82, 0.02)',
          padding: 'clamp(24px, 3.5vw, 44px) clamp(24px, 4vw, 56px)',
          marginBottom: 'clamp(32px, 4vw, 52px)',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 'clamp(24px, 4vw, 56px)',
            width: '32px',
            height: '2px',
            background: 'var(--accent-gold)',
          }} />

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(24px, 4vw, 64px)',
            alignItems: 'center',
          }} id="project-callout-grid">
            <div>
              <div className="t-label" style={{ color: 'var(--accent-gold)', marginBottom: '12px' }}>
                Major Project
              </div>
              <h3 style={{
                fontSize: 'clamp(20px, 2.5vw, 32px)',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
                lineHeight: 1.15,
                marginBottom: '8px',
              }}>
                Kohora, Assam
              </h3>
              <p className="t-body" style={{ margin: 0, fontSize: 'clamp(14px, 1.1vw, 16px)' }}>
                Fast-track execution of complete utility infrastructure under challenging terrain conditions.
              </p>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              borderLeft: '1px solid var(--line-soft)',
              paddingLeft: 'clamp(20px, 3vw, 48px)',
            }} id="project-callout-details">
              <div>
                <div style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Scope
                </div>
                <div style={{ fontSize: 'clamp(15px, 1.3vw, 18px)', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                  2 × 3.15 MVA Complete Substation
                  <div style={{ fontSize: '12px', fontWeight: 400, color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Control Room + 9 VCB Panels
                  </div>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Timeline
                </div>
                <div style={{ fontSize: 'clamp(15px, 1.3vw, 18px)', fontWeight: 600, color: 'var(--accent-gold)', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                  Commissioned in only 100 Working Days
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Voltage row */}
        <div id="voltages-grid" data-reveal style={{
          display: 'grid', gridTemplateColumns: `repeat(${VOLTAGES.length}, 1fr)`,
          borderTop: '1px solid var(--line)', borderLeft: '1px solid var(--line)',
        }}>
          {VOLTAGES.map((v) => (
            <div key={v.value} style={{
              padding: 'clamp(14px, 2vw, 20px) clamp(12px, 1.5vw, 18px)',
              borderRight: '1px solid var(--line)', borderBottom: '1px solid var(--line)',
              textAlign: 'center',
            }}>
              <div style={{
                fontSize: 'clamp(16px, 1.8vw, 24px)', fontWeight: 700, letterSpacing: '-0.01em',
                color: v.value === '132KV' ? 'var(--accent-gold)' : 'var(--text-primary)', marginBottom: '4px',
              }}>
                {v.value}
              </div>
              <div style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                {v.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #voltages-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          #project-callout-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          #project-callout-details {
            border-left: none !important;
            padding-left: 0 !important;
            border-top: 1px solid var(--line-soft);
            padding-top: 20px;
          }
        }
        @media (max-width: 480px) {
          #voltages-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  )
}
