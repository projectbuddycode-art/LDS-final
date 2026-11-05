'use client'

import { useEffect, useRef } from 'react'
import { MEDIA } from '@/data/media'
import { EQUIPMENT_RANGE, EQUIPMENT_CATEGORIES } from '@/data/content'
import LazyVideo from '@/components/LazyVideo'

export default function EquipmentSection() {
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
            { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: i * 0.08,
              scrollTrigger: { trigger: el, start: 'top 90%', once: true } }
          )
        })

        // Equipment cards scale reveal
        section.querySelectorAll('[data-eq-card]').forEach((card, i) => {
          gsap.fromTo(card,
            { scale: 0.96, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.75, ease: 'power2.out', delay: i * 0.1,
              scrollTrigger: { trigger: card, start: 'top 88%', once: true } }
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

  return (
    <section
      ref={sectionRef}
      className="section-py"
      style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--line-soft)' }}
      aria-label="Equipment range"
    >
      <div className="site-container">

        <div style={{ marginBottom: 'clamp(36px, 4vw, 56px)' }}>
          <div data-reveal className="section-label">
            <span className="section-label-bullet" />
            <span className="t-label">07 — Products &amp; Equipment</span>
          </div>
          <h2 data-reveal className="t-headline" style={{ marginBottom: '16px', textWrap: 'balance' }}>
            Electrical Equipment Built for{' '}
            <span style={{ color: 'var(--accent-gold)' }}>Reliable Performance.</span>
          </h2>
          <p data-reveal className="t-body" style={{ maxWidth: '440px' }}>
            Lukhdatar &amp; Sons supplies and installs a complete range of HT/LT electrical equipment —
            from transformers and MV/LV switchgear to bus ducts, capacitor banks, PCC/MCC panels and distribution boards.
          </p>
        </div>

        {/* Equipment video cards (6 categories mapped to cinematics) */}
        <div id="equipment-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '12px',
          marginBottom: 'clamp(40px, 5vw, 64px)'
        }}>
          {EQUIPMENT_RANGE.map((item) => (
            <div key={item.id} data-eq-card className="equipment-card" style={{
              position: 'relative', aspectRatio: '4/5',
              overflow: 'hidden', background: 'var(--surface)',
            }}>
              <div className="equipment-card-media" style={{ position: 'absolute', inset: 0, transition: 'transform 500ms cubic-bezier(0.16, 1, 0.3, 1)' }}>
                <LazyVideo
                  src={mediaMap[item.mediaKey] || MEDIA.equipment.busduct}
                  poster={posterMap[item.mediaKey] || '/media/posters/busduct.jpg'}
                  aria-label={item.title}
                />
              </div>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(10,14,18,0.85) 0%, rgba(10,14,18,0.2) 40%, transparent 70%)',
                zIndex: 2,
              }} />
              <div className="equipment-card-content" style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px', zIndex: 3 }}>
                <div className="t-label" style={{ color: 'var(--accent-gold)', marginBottom: '6px' }}>Equipment Category</div>
                <div style={{ fontSize: 'clamp(16px, 1.3vw, 19px)', fontWeight: 600, color: '#FAF8F5', letterSpacing: '-0.01em', marginBottom: '4px' }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(250,248,245,0.65)', lineHeight: 1.4 }}>
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Equipment categories */}
        <div data-reveal>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '16px',
            marginBottom: '24px', borderBottom: '1px solid var(--line)', paddingBottom: '16px',
            flexWrap: 'wrap',
          }}>
            <span className="t-label" style={{ color: 'var(--text-muted)' }}>Complete Equipment &amp; Panel Range</span>
            <div style={{ flex: 1, minWidth: '40px', height: '1px', background: 'var(--line-soft)' }} />
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 150px), 1fr))',
            border: '1px solid var(--line)',
          }}>
            {EQUIPMENT_CATEGORIES.map((cat) => (
              <div key={cat} style={{
                padding: '13px 16px', borderRight: '1px solid var(--line-soft)',
                borderBottom: '1px solid var(--line-soft)',
                fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)',
              }}>
                <span style={{
                  display: 'inline-block', width: '4px', height: '4px', borderRadius: '50%',
                  background: 'var(--accent-gold)', marginRight: '10px', verticalAlign: 'middle',
                }} />
                {cat}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .equipment-card {
          transition: transform 350ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .equipment-card:hover {
          transform: translateY(-3px);
        }
        .equipment-card:hover .equipment-card-media {
          transform: scale(1.03);
        }
        @media (max-width: 768px) {
          .equipment-card {
            aspect-ratio: 16/10 !important;
          }
        }
        @media (max-width: 540px) {
          #equipment-grid {
            grid-template-columns: 1fr !important;
          }
          .equipment-card-content {
            bottom: 16px !important;
            left: 16px !important;
            right: 16px !important;
          }
        }
      `}</style>
    </section>
  )
}
