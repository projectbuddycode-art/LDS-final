'use client'

import { useEffect, useRef } from 'react'
import { MEDIA } from '@/data/media'
import { ACCOUNTABILITY_PRINCIPLES } from '@/data/content'
import LazyVideo from '@/components/LazyVideo'

export default function AccountabilitySection() {
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
        const visual = section.querySelector('[data-visual]')
        if (visual) {
          gsap.fromTo(visual,
            { x: 32, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
              scrollTrigger: { trigger: section, start: 'top 80%', once: true } }
          )
        }
        const textSide = section.querySelector('[data-text-side]')
        if (textSide) {
          gsap.fromTo(textSide,
            { x: -32, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.15,
              scrollTrigger: { trigger: section, start: 'top 80%', once: true } }
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
      aria-label="Built with accountability"
    >
      <div className="site-container">
        <div id="accountability-grid" className="two-col" style={{ alignItems: 'center' }}>

          {/* LEFT — Text */}
          <div data-text-side>
            <div className="section-label">
              <span className="section-label-bullet" />
              <span className="t-label">12 — Built with Accountability</span>
            </div>

            <h2 className="t-headline" style={{ marginBottom: '20px', textWrap: 'balance' }}>
              Built with{' '}
              <span style={{ color: 'var(--accent-gold)' }}>accountability.</span>
            </h2>

            <p className="t-body" style={{ maxWidth: '440px', marginBottom: '40px' }}>
              Our engineering delivery is measured by single-point accountability, rigorous adherence to safety standards, clear documentation, and dependable lifecycle support across both Government and Private sector projects.
            </p>

            <div>
              {ACCOUNTABILITY_PRINCIPLES.map((principle) => (
                <div key={principle.number} className="principle-item">
                  <div className="principle-number">{principle.number}</div>
                  <div>
                    <div style={{ fontSize: 'clamp(15px, 1.2vw, 17px)', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '5px', letterSpacing: '-0.01em' }}>
                      {principle.title}
                    </div>
                    <p className="t-body" style={{ fontSize: '14px' }}>{principle.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Video */}
          <div data-visual className="media-frame" style={{ aspectRatio: '16/9' }}>
            <LazyVideo src={MEDIA.accountability} poster="/media/posters/accountability.jpg"
              aria-label="Lukhdatar & Sons infrastructure delivery" />
          </div>
        </div>
      </div>

      <style>{`
        .principle-item {
          transition: transform 300ms ease;
        }
        .principle-item:hover {
          transform: translateX(4px);
        }
        #accountability-grid {
          grid-template-columns: 40fr 60fr;
        }
        @media (max-width: 768px) {
          #accountability-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
          #accountability-grid [data-visual] {
            aspect-ratio: 16/9 !important;
          }
        }
      `}</style>
    </section>
  )
}
