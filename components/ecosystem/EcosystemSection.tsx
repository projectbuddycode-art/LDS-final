'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { ECOSYSTEM_LOGOS } from '@/data/content'

/** Logos with extra whitespace in the asset — scale up inside the same cell frame */
const LOGO_FRAME_BOOST = new Set(['Polycab', 'Siemens', 'Precision', 'AKG'])

export default function EcosystemSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const isDraggingRef = useRef(false)
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null)

  // ── Viewport entry reveal ─────────────────────────────────────────────────
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
        // Header reveals
        section.querySelectorAll('[data-reveal]').forEach((el, i) => {
          gsap.fromTo(el,
            { y: 18, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.65,
              ease: 'power3.out',
              delay: i * 0.08,
              scrollTrigger: { trigger: el, start: 'top 90%', once: true },
            }
          )
        })

        // Carousel container reveal
        const carousel = section.querySelector('.eco-carousel-viewport')
        if (carousel) {
          gsap.fromTo(
            carousel,
            { y: 20 },
            {
              y: 0,
              duration: 0.75,
              ease: 'power2.out',
              scrollTrigger: { trigger: carousel, start: 'top 88%', once: true },
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

  // ── Arrow nav — pause/resume ──────────────────────────────────────────────
  const handleArrow = useCallback(() => {
    setIsPaused(true)
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
    resumeTimerRef.current = setTimeout(() => setIsPaused(false), 3500)
  }, [])

  // ── Drag support ─────────────────────────────────────────────────────────
  const handleMouseDown = () => {
    isDraggingRef.current = true
    setIsPaused(true)
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return
    e.preventDefault()
  }

  const handleMouseUp = () => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false
    resumeTimerRef.current = setTimeout(() => setIsPaused(false), 3000)
  }

  // Double list for seamless infinite loop
  const doubledLogos = [...ECOSYSTEM_LOGOS, ...ECOSYSTEM_LOGOS]

  return (
    <section
      ref={sectionRef}
      className="section-py-dense"
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--line-soft)',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-label="Our clients and trusted industry relationships"
    >
      <div className="site-container" style={{ marginBottom: '36px' }}>
        <div data-reveal className="section-label" style={{ marginBottom: '20px' }}>
          <span className="section-label-bullet" />
          <span className="t-label">03 — Our trusted vendors and collaborators</span>
        </div>

        <div
          id="ecosystem-header"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(24px, 4vw, 64px)',
            alignItems: 'end',
          }}
        >
          <h2 data-reveal className="t-headline" style={{ maxWidth: '540px' }}>
            Trusted Relationships{' '}
            <span style={{ color: 'var(--accent-gold)' }}>Across the Electrical Industry.</span>
          </h2>
          <div>
            <p
              data-reveal
              className="t-body"
              style={{ maxWidth: '440px', marginBottom: '24px' }}
            >
              Lukhdatar &amp; Sons maintains authorized stocking, system integration, and project joint ventures with India&apos;s leading electrical manufacturers and technology brands.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <a
                href="/partner-with-us"
                data-reveal
                className="cta-btn"
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  border: '1px solid var(--line)',
                  transition: 'all 300ms ease',
                  minHeight: '44px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-gold)'
                  e.currentTarget.style.color = 'var(--accent-gold)'
                  e.currentTarget.style.background = 'rgba(201,160,82,0.06)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--line)'
                  e.currentTarget.style.color = 'var(--text-secondary)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                Our trusted vendors and collaborators ↗
              </a>

              {/* ── Carousel Navigation Arrows ── */}
              <div className="eco-nav-controls" aria-label="Ecosystem carousel controls">
                <button
                  type="button"
                  onClick={handleArrow}
                  className="eco-arrow-btn"
                  aria-label="Previous ecosystem brands"
                  title="Previous"
                >
                  <span aria-hidden="true">←</span>
                </button>
                <button
                  type="button"
                  onClick={handleArrow}
                  className="eco-arrow-btn"
                  aria-label="Next ecosystem brands"
                  title="Next"
                >
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Full-Width Edge-to-Edge Logo Marquee Strip ── */}
      <div
        className="eco-carousel-viewport"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => { if (!isDraggingRef.current) setIsPaused(false) }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* Continuous marquee track */}
        <div className={`eco-carousel-track${isPaused ? ' is-paused' : ''}`}>
          {doubledLogos.map((brand, idx) => (
            <div
              key={`${brand.name}-${idx}`}
              className="eco-logo-cell"
              title={brand.name}
            >
              <div
                className={`eco-logo-frame${LOGO_FRAME_BOOST.has(brand.name) ? ' eco-logo-frame--boost' : ''}`}
              >
                <Image
                  src={brand.logo}
                  alt={brand.alt}
                  fill
                  sizes="(max-width: 640px) 120px, 160px"
                  className="eco-logo-img"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical footer caption */}
      <div className="site-container" style={{ paddingTop: '28px' }}>
        <div
          style={{
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            opacity: 0.70,
          }}
        >
          Brands and industry relationships — Authorized Super Stockist of HPL, Lucy Electric, Huphen · System House of L&amp;T · JVs with CG Power &amp; Areva T&amp;D
        </div>
      </div>

      {/* ── Scoped Styles ── */}
      <style>{`
        /* ─── Section header grid ─── */
        #ecosystem-header {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(32px, 5vw, 80px);
          align-items: end;
        }

        @media (max-width: 768px) {
          #ecosystem-header {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }

        /* ─── Arrow Buttons ─── */
        .eco-nav-controls {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .eco-arrow-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(201, 160, 82, 0.35);
          background: rgba(17, 24, 32, 0.85);
          backdrop-filter: blur(8px);
          color: var(--accent-gold);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          cursor: pointer;
          transition: all 280ms ease;
          user-select: none;
        }

        .eco-arrow-btn:hover {
          border-color: var(--accent-gold);
          background: rgba(201, 160, 82, 0.18);
          color: #FAF8F5;
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(201, 160, 82, 0.20);
        }

        .eco-arrow-btn:active {
          transform: scale(0.95);
        }

        /* ─── Full-Width Viewport — clips moving track ─── */
        .eco-carousel-viewport {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: var(--bg-light);
          /* Reserve fixed height to prevent layout shift */
          min-height: 96px;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          cursor: grab;
          user-select: none;
        }

        .eco-carousel-viewport:active {
          cursor: grabbing;
        }

        /* ─── Moving track ─── */
        .eco-carousel-track {
          display: flex;
          gap: 0;
          width: max-content;
          animation: eco-marquee 40s linear infinite;
          will-change: transform;
          backface-visibility: hidden;
        }

        .eco-carousel-track.is-paused {
          animation-play-state: paused;
        }

        @keyframes eco-marquee {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }

        /* ─── Individual logo cell — transparent, light, flat ─── */
        .eco-logo-cell {
          flex-shrink: 0;
          width: clamp(148px, 12vw, 192px);
          height: 96px;
          background: var(--bg-light);
          border: none;
          /* Subtle right divider between logos */
          border-right: 1px solid rgba(0, 0, 0, 0.07);
          border-radius: 0;
          box-shadow: none;
          display: flex;
          align-items: stretch;
          justify-content: center;
          padding: 14px 22px;
          position: relative;
          transition: background 260ms ease, transform 260ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* ─── Logo frame fills the padded cell; image uses contain ─── */
        .eco-logo-frame {
          position: relative;
          width: 100%;
          height: 100%;
          min-width: 0;
          min-height: 0;
          flex: 1 1 auto;
          max-width: 100%;
          max-height: 100%;
        }

        .eco-logo-frame--boost {
          transform: scale(1.22);
          transform-origin: center center;
        }

        .eco-logo-img {
          object-fit: contain !important;
          object-position: center !important;
          opacity: 1;
          filter: none;
          transition: opacity 260ms ease;
        }

        /* ─── Hover: very subtle scale, light gold tint ─── */
        @media (hover: hover) and (pointer: fine) {
          .eco-logo-cell:hover {
            background: rgba(201, 160, 82, 0.04);
            transform: scale(1.05);
            z-index: 3;
          }

          .eco-logo-cell:hover .eco-logo-img {
            opacity: 1;
          }
        }

        /* ─── Reduced Motion ─── */
        @media (prefers-reduced-motion: reduce) {
          .eco-carousel-track {
            animation: none;
          }
          .eco-logo-cell {
            transition: none;
          }
        }

        /* ─── Mobile ─── */
        @media (max-width: 640px) {
          .eco-logo-cell {
            width: clamp(112px, 34vw, 148px);
            height: 80px;
            padding: 10px 14px;
          }
          .eco-logo-frame--boost {
            transform: scale(1.18);
          }
          .eco-carousel-viewport {
            min-height: 80px;
          }
        }
      `}</style>
    </section>
  )
}
