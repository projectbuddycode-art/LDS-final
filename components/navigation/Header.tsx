'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { NAV_LINKS } from '@/data/content'
import { openQuoteModal } from '@/lib/quoteEvents'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let rafId: number = 0
    let lastScrolled = false
    function onScroll() {
      if (!rafId) {
        rafId = window.requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 40
          if (isScrolled !== lastScrolled) {
            lastScrolled = isScrolled
            setScrolled(isScrolled)
          }
          rafId = 0
        })
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
      }
    }
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [menuOpen])

  return (
    <header
      ref={headerRef}
      className={`nav-root${scrolled ? ' scrolled' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled
          ? 'var(--nav-bg-scrolled)'
          : 'linear-gradient(to bottom, rgba(10, 14, 18, 0.45) 0%, transparent 100%)',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'background 400ms ease, backdrop-filter 400ms ease',
      }}
    >
      <div className="site-container">
        <nav className="nav-inner" aria-label="Main navigation" style={{ height: scrolled ? '62px' : '72px' }}>

          {/* ── Logo ── clearly positioned, responsive, no distortion or overlap ── */}
          <Link
            href="/"
            aria-label="Lukhdatar & Sons — Home"
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              flexShrink: 0,
              position: 'relative',
              zIndex: 10,
            }}
          >
            <Image
              src="/media/lds-logo-v2.png"
              alt="Lukhdatar & Sons"
              width={140}
              height={50}
              priority
              style={{
                height: scrolled ? '36px' : '40px',
                width: 'auto',
                maxWidth: '140px',
                objectFit: 'contain',
                transition: 'all 350ms ease',
                filter: scrolled
                  ? 'none'
                  : 'brightness(0) invert(1) drop-shadow(0 2px 6px rgba(0,0,0,0.45))',
              }}
            />
          </Link>

          {/* Desktop nav links */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: 'clamp(14px, 1.8vw, 28px)' }}
            className="hidden-mobile"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="header-nav-link"
                style={{
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  color: scrolled ? 'var(--text-secondary)' : 'rgba(250,248,245,0.85)',
                  textDecoration: 'none',
                  transition: 'color 250ms ease',
                  position: 'relative',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-gold)')}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = scrolled ? 'var(--text-secondary)' : 'rgba(250,248,245,0.85)')
                }
              >
                {link.label}
              </Link>
            ))}

            {/* SEND INQUIRY CTA — High contrast, fully accessible */}
            <button
              onClick={() => openQuoteModal()}
              className="header-cta-btn"
              style={{
                background: scrolled ? 'var(--text-primary)' : 'rgba(201, 160, 82, 0.20)',
                border: scrolled ? '1px solid var(--text-primary)' : '1px solid var(--accent-gold)',
                borderRadius: '2px',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#FAF8F5',
                padding: '8px 16px',
                cursor: 'pointer',
                transition: 'all 250ms ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                textShadow: scrolled ? 'none' : '0 1px 2px rgba(0,0,0,0.4)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--accent-gold)'
                e.currentTarget.style.borderColor = 'var(--accent-gold)'
                e.currentTarget.style.color = '#111820'
                const arrow = e.currentTarget.querySelector('.hdr-arrow') as HTMLSpanElement
                if (arrow) {
                  arrow.style.transform = 'translateX(3px)'
                  arrow.style.color = '#111820'
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = scrolled ? 'var(--text-primary)' : 'rgba(201, 160, 82, 0.20)'
                e.currentTarget.style.borderColor = scrolled ? 'var(--text-primary)' : 'var(--accent-gold)'
                e.currentTarget.style.color = '#FAF8F5'
                const arrow = e.currentTarget.querySelector('.hdr-arrow') as HTMLSpanElement
                if (arrow) {
                  arrow.style.transform = 'translateX(0)'
                  arrow.style.color = 'var(--accent-gold)'
                }
              }}
            >
              Send Inquiry
              <span className="hdr-arrow" style={{ color: 'var(--accent-gold)', display: 'inline-block', transition: 'transform 300ms ease, color 250ms ease' }}>
                ↗
              </span>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="show-mobile"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '5px',
              width: '44px',
              height: '44px',
              padding: '8px',
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: '22px',
                  height: '1.5px',
                  background: scrolled ? 'var(--text-primary)' : '#FAF8F5',
                  transition: 'all 300ms ease',
                  transformOrigin: 'center',
                  ...(menuOpen && i === 0 ? { transform: 'translateY(6.5px) rotate(45deg)' } : {}),
                  ...(menuOpen && i === 1 ? { opacity: 0 } : {}),
                  ...(menuOpen && i === 2 ? { transform: 'translateY(-6.5px) rotate(-45deg)' } : {}),
                }}
              />
            ))}
          </button>
        </nav>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          style={{
            background: 'var(--bg-light)',
            borderTop: '1px solid var(--line)',
            padding: '24px var(--container-px) 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            maxHeight: 'calc(100dvh - 72px)',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
          }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: '15px',
                fontWeight: 500,
                color: 'var(--text-primary)',
                textDecoration: 'none',
                borderBottom: '1px solid var(--line-soft)',
                paddingBottom: '16px',
              }}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => {
              setMenuOpen(false)
              openQuoteModal()
            }}
            style={{
              background: 'var(--text-primary)',
              color: '#FAF8F5',
              border: '1px solid var(--text-primary)',
              borderRadius: '2px',
              padding: '14px 20px',
              textAlign: 'center',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 250ms ease',
              marginTop: '8px',
              minHeight: '44px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--accent-gold)'
              e.currentTarget.style.color = '#111820'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--text-primary)'
              e.currentTarget.style.color = '#FAF8F5'
            }}
          >
            Send Inquiry <span style={{ color: 'inherit' }}>↗</span>
          </button>
        </div>
      )}

      <style>{`
        @media (min-width: 769px) { .show-mobile { display: none !important; } }
        @media (max-width: 768px) { .hidden-mobile { display: none !important; } }
        .header-nav-link::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--accent-gold);
          transition: width 300ms ease;
        }
        .header-nav-link:hover::after { width: 100%; }
      `}</style>
    </header>
  )
}
