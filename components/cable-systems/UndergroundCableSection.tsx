'use client'

import { useEffect, useRef } from 'react'
import { MEDIA } from '@/data/media'
import LazyVideo from '@/components/LazyVideo'

const SERVICES = ['Supply', 'Laying', 'Repair', 'Maintenance', 'Replacement']

export default function UndergroundCableSection() {
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
        section.querySelectorAll('[data-reveal]').forEach((el, i) => {
          gsap.fromTo(el,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: i * 0.09,
              scrollTrigger: { trigger: el, start: 'top 90%', once: true } }
          )
        })
        const visual = section.querySelector('[data-visual]')
        if (visual) {
          gsap.fromTo(visual,
            { clipPath: 'inset(0 100% 0 0)' },
            { clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'expo.out',
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
      id="cable-systems"
      className="section-py"
      style={{ background: 'var(--bg-primary)', borderTop: '1px solid var(--line-soft)' }}
      aria-label="Underground cable systems"
    >
      <div className="site-container">
        <div className="two-col-45-55" style={{ alignItems: 'center' }}>

          {/* LEFT — Text */}
          <div>
            <div data-reveal className="section-label">
              <span className="section-label-bullet" />
              <span className="t-label">04 — Underground Cable Systems</span>
            </div>

            <h2 data-reveal className="t-headline" style={{ marginBottom: '24px' }}>
              Power beneath{' '}
              <span style={{ color: 'var(--accent-gold)' }}>the surface.</span>
            </h2>

            <p data-reveal className="t-body" style={{ maxWidth: '440px', marginBottom: '36px' }}>
              Lukhdatar &amp; Sons engineers, supplies, lays, tests, and maintains high-voltage underground cable networks up to 66KV. Our teams manage route surveying, trench excavation, bedding, duct installation, certified jointing, and routine maintenance across commercial, housing, industrial, and public sector developments.
            </p>

            <div data-reveal style={{
              display: 'inline-flex', alignItems: 'center', gap: '12px',
              padding: '14px 20px', border: '1px solid var(--line)',
              background: 'var(--surface)', marginBottom: '36px',
            }}>
              <span style={{ fontSize: 'clamp(20px, 2vw, 26px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
                66KV
              </span>
              <div>
                <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  Underground Cable Works
                </div>
                <div style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--accent-gold)' }}>
                  Up to 66KV
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--line)' }}>
              {SERVICES.map((svc, i) => (
                <div key={svc} data-reveal style={{
                  display: 'flex', alignItems: 'center', gap: '14px',
                  padding: '13px 0', borderBottom: '1px solid var(--line-soft)',
                }}>
                  <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.18em', color: 'var(--accent-gold)', width: '20px', flexShrink: 0 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)', letterSpacing: '0.04em' }}>
                    {svc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Visual */}
          <div data-visual className="media-frame" style={{ aspectRatio: '16/9', clipPath: 'inset(0 0% 0 0)' }}>
            <LazyVideo
              src={MEDIA.cableSystems}
              poster="/media/posters/underground-cabling-system.jpg"
              aria-label="Underground cable works and installations"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
