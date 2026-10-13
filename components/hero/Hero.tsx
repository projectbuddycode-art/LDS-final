'use client'

import { useEffect, useRef } from 'react'
import { MEDIA } from '@/data/media'
import LazyVideo from '@/components/LazyVideo'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  // ── Premium cinematic text reveal ─────────────────────────────────────────
  useEffect(() => {
    let isUnmounted = false
    let ctx: any
    const section = sectionRef.current
    if (!section) return

    const init = async () => {
      const { gsap } = await import('gsap')
      if (isUnmounted) return

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ delay: 0.25 })

        // 1. Eyebrow / section label
        const label = section.querySelector('[data-hero-label]')
        if (label) {
          tl.fromTo(label,
            { y: 12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' }
          )
        }

        // 2. Headline lines — masked clip reveal (each line independently)
        const lines = section.querySelectorAll('[data-hero-line]')
        lines.forEach((line, i) => {
          tl.fromTo(line,
            { y: 32, opacity: 0, clipPath: 'inset(0 0 100% 0)' },
            {
              y: 0,
              opacity: 1,
              clipPath: 'inset(0 0 0% 0)',
              duration: 0.9,
              ease: 'expo.out',
            },
            // stagger each line by 100ms after the previous, overlap with label
            i === 0 ? '-=0.25' : '-=0.78'
          )
        })

        // 3. Supporting paragraph
        const para = section.querySelector('[data-hero-para]')
        if (para) {
          tl.fromTo(para,
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' },
            '-=0.50'
          )
        }

        // 4. CTA row
        const ctas = section.querySelector('[data-hero-cta]')
        if (ctas) {
          tl.fromTo(ctas,
            { y: 12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' },
            '-=0.38'
          )
        }

        // 5. Bottom detail (Est. 1997 + Scroll indicator)
        section.querySelectorAll('[data-hero-detail]').forEach((el, i) => {
          tl.fromTo(el,
            { opacity: 0 },
            { opacity: 1, duration: 0.5, ease: 'power2.out' },
            i === 0 ? '-=0.30' : '<'
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
      className="hero-root"
      id="hero"
      aria-label="Hero — Lukhdatar & Sons"
    >
      {/* ── Full-bleed video background ─────────────────── */}
      <div className="hero-video-wrapper" aria-hidden="true">
        <LazyVideo
          src={MEDIA.heroVideo}
          poster="/media/posters/hero-bg.jpg"
          preloadImmediate={true}
          autoPlay
          muted
          playsInline
          loop
          aria-hidden="true"
        />
      </div>

      {/* ── Cinematic gradient overlay ──────────────────── */}
      <div className="hero-overlay" aria-hidden="true" />

      {/* ── Content layer ──────────────────────────────── */}
      <div className="hero-content">
        <div className="site-container" style={{ position: 'relative', width: '100%' }}>

          {/* Two-column grid: text LEFT (40–44%), video takes right implicitly */}
          <div className="hero-text-col">

            {/* 1. Eyebrow label */}
            <div
              data-hero-label
              className="section-label"
              style={{ marginBottom: '20px' }}
            >
              <span className="section-label-bullet" />
              <span className="t-label" style={{ color: 'rgba(250,248,245,0.55)' }}>
                Lukhdatar & Sons
              </span>
            </div>

            {/* 2. Headline — each line wrapped for masked reveal */}
            <h1 className="hero-headline" aria-label="Powering the infrastructure behind what's next.">
              <span
                data-hero-line
                className="hero-headline-line"
              >
                Powering the
              </span>
              <span
                data-hero-line
                className="hero-headline-line"
              >
                infrastructure
              </span>
              <span
                data-hero-line
                className="hero-headline-line hero-headline-gold"
              >
                behind what&apos;s next.
              </span>
            </h1>

            {/* 3. Supporting paragraph */}
            <p
              data-hero-para
              className="hero-para"
            >
              Turnkey electrical contracting and high-voltage infrastructure across Government and Private sectors. We deliver complete engineering coordination, supply, installation, testing, and commissioning under single-point project accountability.
            </p>

            {/* 4. CTA row */}
            <div data-hero-cta className="hero-cta-row">
              <a
                href="#capabilities"
                className="hero-btn hero-btn-primary"
              >
                Explore Capabilities <span className="cta-arrow">↗</span>
              </a>
              <a
                href="#projects"
                className="hero-btn hero-btn-secondary"
              >
                View Projects <span className="cta-arrow">↗</span>
              </a>
            </div>

            {/* 5. Establishment Line — Premium Engineering Heritage Marker (38–48px separation below CTA row) */}
            <div
              data-hero-detail
              className="hero-est-badge"
            >
              <div className="hero-est-line hero-est-line-left" />
              <span className="hero-est-text">
                EST. 1997 · KOLKATA
              </span>
              <div className="hero-est-line hero-est-line-right" />
            </div>
          </div>

          {/* Scroll indicator — bottom right */}
          <div
            data-hero-detail
            className="hero-scroll-indicator"
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <div style={{ width: '1px', height: '44px', background: 'rgba(250,248,245,0.22)' }} />
            <span style={{
              fontSize: '9px',
              fontWeight: 500,
              letterSpacing: '0.20em',
              textTransform: 'uppercase',
              color: 'rgba(250,248,245,0.38)',
              writingMode: 'vertical-rl',
              paddingBottom: '8px',
            }}>
              Scroll
            </span>
          </div>
        </div>
      </div>

      {/* Scoped responsive styles */}
      <style>{`
        /* ── Hero text column ── */
        .hero-text-col {
          width: min(44%, 580px);
          max-width: 100%;
          min-width: 0;
        }

        /* ── Hero headline ── */
        .hero-headline {
          display: flex;
          flex-direction: column;
          gap: 0;
          width: min(100%, 620px);
          max-width: 100%;
          margin-bottom: 24px;
          font-size: clamp(38px, 4.8vw, 68px);
          font-weight: 600;
          letter-spacing: -0.023em;
          line-height: 1.04;
          color: #FAF8F5;
        }

        .hero-headline-line {
          display: block;
          width: 100%;
          max-width: 100%;
          overflow: hidden;
        }

        .hero-headline-gold {
          color: var(--accent-gold);
        }

        /* ── Supporting paragraph ── */
        .hero-para {
          font-size: clamp(14px, 1.05vw, 16px);
          color: rgba(250,248,245,0.68);
          line-height: 1.70;
          max-width: 480px;
          margin-bottom: 32px;
        }

        /* ── CTA row ── */
        .hero-cta-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        /* ── Hero CTA buttons (reusing approved footer interaction system) ── */
        .hero-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 16px 28px;
          cursor: pointer;
          transition: all 300ms ease;
          border-radius: 2px;
          min-height: 48px;
          box-sizing: border-box;
        }

        .hero-btn-primary {
          color: #FAF8F5;
          border: 1px solid rgba(250, 248, 245, 0.32);
          background: transparent;
        }

        .hero-btn-primary:hover {
          border-color: var(--accent-gold);
          color: #FFFFFF;
          background: rgba(201, 160, 82, 0.08);
          box-shadow: 0 0 20px rgba(201, 160, 82, 0.15);
        }

        .hero-btn-secondary {
          color: rgba(250, 248, 245, 0.65);
          border: 1px solid rgba(250, 248, 245, 0.18);
          background: transparent;
        }

        .hero-btn-secondary:hover {
          border-color: var(--accent-gold);
          color: #FAF8F5;
          background: rgba(201, 160, 82, 0.08);
          box-shadow: 0 0 16px rgba(201, 160, 82, 0.10);
        }

        .hero-btn .cta-arrow {
          display: inline-block;
          color: var(--accent-gold);
          transition: transform 250ms ease;
        }

        .hero-btn:hover .cta-arrow {
          transform: translate(2px, -2px);
        }

        /* ── Establishment Line (Heritage Marker) ── */
        .hero-est-badge {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          margin-top: clamp(32px, 4.5vw, 48px);
        }

        .hero-est-line {
          height: 1px;
          width: 32px;
          flex-shrink: 0;
        }

        .hero-est-line-left {
          background: linear-gradient(90deg, transparent 0%, rgba(226, 202, 158, 0.75) 100%);
        }

        .hero-est-line-right {
          background: linear-gradient(90deg, rgba(226, 202, 158, 0.75) 0%, transparent 100%);
        }

        .hero-est-text {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #E2CA9E;
          text-shadow: 0 0 16px rgba(226, 202, 158, 0.40);
          white-space: nowrap;
        }

        /* ── Tablet: widen text column slightly ── */
        @media (max-width: 1024px) {
          .hero-text-col {
            width: min(58%, 540px);
            max-width: 100%;
          }
          .hero-headline {
            font-size: clamp(34px, 5vw, 56px);
          }
        }

        @media (max-width: 768px) {
          .hero-root {
            min-height: 100svh;
            height: auto;
          }
          .hero-content {
            position: relative;
            padding-top: max(88px, calc(72px + 4vh));
            padding-bottom: 40px;
          }
          .hero-text-col {
            width: 100%;
            max-width: 100%;
          }
          .hero-headline {
            width: 100%;
            max-width: 100%;
            font-size: clamp(30px, 7.5vw, 44px);
            margin-bottom: 18px;
          }
          .hero-headline-line {
            white-space: normal;
          }
          .hero-para {
            max-width: 100%;
            font-size: 14px;
            margin-bottom: 24px;
          }
          .hero-btn {
            width: 100%;
            justify-content: space-between;
            padding: 14px 20px;
          }
          .hero-est-badge {
            margin-top: 24px;
            gap: 10px;
            width: 100%;
            justify-content: center;
          }
          .hero-est-line {
            width: 20px;
          }
          .hero-est-text {
            font-size: 10px;
            letter-spacing: 0.16em;
          }
          .hero-scroll-indicator {
            display: none !important;
          }
        }

        /* ── Landscape mobile protection ── */
        @media (max-height: 500px) {
          .hero-root {
            min-height: 520px;
            height: auto;
          }
          .hero-content {
            position: relative;
            padding-top: 80px;
            padding-bottom: 32px;
          }
        }
      `}</style>
    </section>
  )
}
