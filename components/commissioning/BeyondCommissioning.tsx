'use client'

import { useEffect, useRef } from 'react'
import { MEDIA } from '@/data/media'
import { LIFECYCLE_STAGES } from '@/data/content'
import LazyVideo from '@/components/LazyVideo'

export default function BeyondCommissioning() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let isUnmounted = false
    let ctx: { revert: () => void } | undefined
    const section = sectionRef.current
    if (!section) return

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (isUnmounted) return

      ctx = gsap.context(() => {
        // Left cinematic visual enters from left
        const visual = section.querySelector('[data-visual]')
        if (visual) {
          gsap.fromTo(visual,
            { x: -32, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: { trigger: section, start: 'top 80%', once: true },
            }
          )
        }

        // Right content enters from right
        const textSide = section.querySelector('[data-text-side]')
        if (textSide) {
          gsap.fromTo(textSide,
            { x: 32, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.9,
              ease: 'power3.out',
              delay: 0.15,
              scrollTrigger: { trigger: section, start: 'top 80%', once: true },
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
      style={{
        background: 'var(--bg-primary)',
        borderTop: '1px solid var(--line-soft)',
        position: 'relative',
      }}
      aria-label="Beyond commissioning — lifecycle support"
    >
      <div className="site-container" style={{ position: 'relative', zIndex: 2 }}>
        <div id="commissioning-grid" className="two-col" style={{ alignItems: 'center' }}>

          {/* LEFT — Cinematic Video Media Frame */}
          <div
            data-visual
            className="media-frame"
            style={{
              aspectRatio: '16/9',
              width: '100%',
              borderRadius: '2px',
              border: '1px solid var(--line-soft)',
              overflow: 'hidden',
            }}
          >
            <LazyVideo
              src={MEDIA.beyondCommissioning}
              poster="/media/posters/beyond-commissioning.jpg"
              aria-label="Electrical infrastructure maintenance, diagnostics, and lifecycle support"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center center',
              }}
            />
          </div>

          {/* RIGHT — Section Header & 5-Stage Lifecycle Flow */}
          <div data-text-side>
            <div className="section-label">
              <span className="section-label-bullet" />
              <span className="t-label">10 — Beyond Commissioning</span>
            </div>

            <h2 className="t-headline" style={{ marginBottom: '20px', textWrap: 'balance' }}>
              Beyond{' '}
              <span style={{ color: 'var(--accent-gold)' }}>commissioning.</span>
            </h2>

            <p className="t-body" style={{ maxWidth: '440px', marginBottom: '32px' }}>
              Electrical assets require continuous operational oversight after energisation. Lukhdatar &amp; Sons provides routine maintenance, transformer oil filtration, breaker servicing, and lifecycle repair support for completed projects and existing client installations.
            </p>

            <div className="lifecycle-flow">
              {LIFECYCLE_STAGES.map((stage) => (
                <div key={stage.number} className="lifecycle-item">
                  <span className="lifecycle-number">{stage.number}</span>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className="lifecycle-label">{stage.label}</span>
                    {stage.detail && (
                      <span
                        style={{
                          fontSize: '12px',
                          color: 'var(--text-secondary)',
                          marginTop: '2px',
                          lineHeight: 1.45,
                        }}
                      >
                        {stage.detail}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        #commissioning-grid {
          display: grid;
          grid-template-columns: 58fr 42fr;
          gap: clamp(32px, 4.5vw, 64px);
        }

        .lifecycle-item {
          transition: transform 300ms ease;
        }

        .lifecycle-item:hover {
          transform: translateX(4px);
        }

        @media (max-width: 900px) {
          #commissioning-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
          #commissioning-grid [data-visual] {
            aspect-ratio: 16/9 !important;
          }
        }
      `}</style>
    </section>
  )
}
