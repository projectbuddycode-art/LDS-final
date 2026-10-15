'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { MEDIA } from '@/data/media'
import { prepareVideo, safePlay } from '@/lib/videoPlayback'

interface IntroSequenceProps {
  onComplete: () => void
}

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDoneRef = useRef(false)
  const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const autoplayFailTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isPlayingRef = useRef(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const finishSequence = useCallback(() => {
    if (isDoneRef.current) return
    isDoneRef.current = true

    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current)
      fallbackTimerRef.current = null
    }
    if (autoplayFailTimerRef.current) {
      clearTimeout(autoplayFailTimerRef.current)
      autoplayFailTimerRef.current = null
    }

    const container = containerRef.current
    if (container) {
      // 450ms subtle cinematic crossfade into the homepage hero
      container.style.transition = 'opacity 450ms cubic-bezier(0.4, 0, 0.2, 1)'
      container.style.opacity = '0'
      container.style.pointerEvents = 'none'
    }

    setTimeout(() => {
      onComplete()
    }, 480)
  }, [onComplete])

  const handleEnded = useCallback(() => {
    finishSequence()
  }, [finishSequence])

  const handleError = useCallback(() => {
    if (isDoneRef.current) return
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[IntroSequence] Video playback deferred, proceeding smoothly to homepage')
    }
    finishSequence()
  }, [finishSequence])

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (typeof window !== 'undefined') {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReduced) {
        finishSequence()
        return
      }
    }

    const video = videoRef.current
    if (!video) return

    // Ensure muted & playsinline attributes are strictly applied on the DOM instance
    prepareVideo(video)
    video.playbackRate = 1.0

    // Explicit React/JS playback attempt
    const markPlaying = () => {
      if (isPlayingRef.current) return
      isPlayingRef.current = true
      setIsVideoPlaying(true)
    }

    const attemptPlay = async () => {
      if (isDoneRef.current || isPlayingRef.current) return
      const success = await safePlay(video)
      if (success) {
        markPlaying()
      } else {
        if (autoplayFailTimerRef.current) clearTimeout(autoplayFailTimerRef.current)
        autoplayFailTimerRef.current = setTimeout(() => {
          if (!isDoneRef.current && !isPlayingRef.current) {
            finishSequence()
          }
        }, 1200)
      }
    }

    void attemptPlay()

    const handleCanPlay = () => {
      if (!isDoneRef.current && !isPlayingRef.current) {
        void attemptPlay()
      }
    }

    video.addEventListener('loadeddata', handleCanPlay)
    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('playing', markPlaying)
    video.addEventListener('ended', handleEnded)
    video.addEventListener('error', handleError)

    const armFallback = (ms: number) => {
      if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current)
      fallbackTimerRef.current = setTimeout(() => {
        if (!isDoneRef.current) {
          finishSequence()
        }
      }, ms)
    }

    // Never leave the intro hanging; allow the actual clip to finish first
    armFallback(12000)
    const handleLoadedMetadata = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return
      armFallback(Math.min(20000, Math.max(9000, video.duration * 1000 + 1200)))
    }
    video.addEventListener('loadedmetadata', handleLoadedMetadata)

    // Escape, Space, or Enter skips intro
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        finishSequence()
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      if (fallbackTimerRef.current) {
        clearTimeout(fallbackTimerRef.current)
        fallbackTimerRef.current = null
      }
      if (autoplayFailTimerRef.current) {
        clearTimeout(autoplayFailTimerRef.current)
        autoplayFailTimerRef.current = null
      }
      window.removeEventListener('keydown', handleKeyDown)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('loadeddata', handleCanPlay)
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('playing', markPlaying)
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('error', handleError)
      try { video.pause() } catch { /* ignore */ }
    }
  }, [finishSequence, handleEnded, handleError])

  return (
    <div
      ref={containerRef}
      className="intro-fullscreen-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100vh',
        minHeight: '100svh',
        zIndex: 99999,
        background: '#0A0E12',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        opacity: 1,
        willChange: 'opacity',
      }}
      aria-label="Lukhdatar and Sons cinematic intro"
    >
      {/* ── Ambient Theater Glow Backdrop Layer (Active on Mobile/Portrait to eliminate harsh letterboxing) ── */}
      <div
        className="intro-ambient-backdrop"
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
        <img
          src={MEDIA.introPoster}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            filter: 'blur(40px) brightness(0.35) saturate(1.4)',
            transform: 'scale(1.12)',
            opacity: 0.65,
            display: 'block',
          }}
        />
      </div>

      {/* ── Main Crisp Video & Poster Frame (100% visible, zero cropping on all devices) ── */}
      <div
        className="intro-video-stage"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        {/* Instant Fallback Poster */}
        <img
          src={MEDIA.introPoster}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="intro-media intro-poster"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />

        {/* Crisp Foreground Video */}
        <video
          ref={videoRef}
          src={MEDIA.introVideo}
          poster={MEDIA.introPoster}
          key={MEDIA.introVideo}
          autoPlay
          muted
          playsInline
          disablePictureInPicture
          loop={false}
          preload="auto"
          controls={false}
          onPlaying={() => setIsVideoPlaying(true)}
          onTimeUpdate={(e) => {
            const target = e.currentTarget

            // Keep the opening and main cinematic motion unchanged, but gently slow the final branding sequence
            if (target.duration > 0) {
              const endWindow = Math.min(2.2, Math.max(0.8, target.duration * 0.08))
              const isFinalBrandingWindow = target.currentTime >= target.duration - endWindow
              target.playbackRate = isFinalBrandingWindow ? 0.82 : 1
            }

            // Trigger subtle crossfade ~0.35s before end to avoid any frame stutter
            if (target.duration > 0 && target.currentTime >= target.duration - 0.35) {
              const container = containerRef.current
              if (container && !isDoneRef.current) {
                container.style.transition = 'opacity 450ms cubic-bezier(0.4, 0, 0.2, 1)'
                container.style.opacity = '0'
                container.style.pointerEvents = 'none'
              }
            }
          }}
          onEnded={handleEnded}
          onError={handleError}
          aria-hidden="true"
          className="intro-media intro-video"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
            zIndex: 3,
            pointerEvents: 'none',
            opacity: isVideoPlaying ? 1 : 0,
            transition: 'opacity 350ms cubic-bezier(0.4, 0, 0.2, 1)',
            backgroundColor: 'transparent',
          }}
        />
      </div>

      {/* ── Premium Top-Right Skip Intro CTA ── */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          finishSequence()
        }}
        aria-label="Skip Intro"
        className="intro-skip-btn"
        style={{
          position: 'absolute',
          top: 'max(20px, env(safe-area-inset-top, 20px))',
          right: 'max(20px, env(safe-area-inset-right, 20px))',
          zIndex: 20,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 18px',
          background: 'rgba(10, 14, 18, 0.78)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(201, 160, 82, 0.50)',
          color: '#FAF8F5',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          borderRadius: '2px',
          cursor: 'pointer',
          transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 4px 18px rgba(0, 0, 0, 0.50)',
          minHeight: '44px',
          minWidth: '44px',
          touchAction: 'manipulation',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--accent-gold)'
          e.currentTarget.style.background = 'rgba(201, 160, 82, 0.20)'
          e.currentTarget.style.color = 'var(--accent-gold)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(201, 160, 82, 0.50)'
          e.currentTarget.style.background = 'rgba(10, 14, 18, 0.78)'
          e.currentTarget.style.color = '#FAF8F5'
        }}
      >
        <span>SKIP INTRO</span>
        <span style={{ fontSize: '13px', lineHeight: 1, color: 'var(--accent-gold)' }}>→</span>
      </button>

      <style>{`
        .intro-fullscreen-overlay {
          width: 100vw !important;
          max-width: none !important;
          height: 100vh !important;
          height: 100svh !important;
          height: 100dvh !important;
          inset: 0 !important;
          overflow: hidden !important;
        }

        .intro-ambient-backdrop {
          display: block !important;
        }

        .intro-media {
          width: 100% !important;
          height: 100% !important;
          max-width: none !important;
          object-fit: cover !important;
          object-position: center 50% !important;
        }

        @media (max-width: 768px) and (orientation: portrait) {
          .intro-media {
            object-fit: contain !important;
            object-position: center center !important;
          }
        }

        @media (max-width: 900px) and (orientation: landscape) {
          .intro-media {
            object-fit: cover !important;
            object-position: center 50% !important;
          }
        }

        @media (max-width: 768px) and (orientation: portrait) {
          .intro-skip-btn {
            top: max(16px, env(safe-area-inset-top, 16px)) !important;
            right: max(16px, env(safe-area-inset-right, 16px)) !important;
            padding: 8px 14px !important;
            font-size: 10.5px !important;
          }
        }

        @media (max-height: 500px) and (orientation: landscape) {
          .intro-skip-btn {
            top: max(10px, env(safe-area-inset-top, 10px)) !important;
            right: max(14px, env(safe-area-inset-right, 14px)) !important;
            padding: 6px 12px !important;
            font-size: 10px !important;
            min-height: 36px !important;
          }
        }

        .intro-skip-btn:focus-visible {
          outline: 2px solid var(--accent-gold);
          outline-offset: 3px;
        }

        .intro-skip-btn:active {
          transform: scale(0.96);
        }
      `}</style>
    </div>
  )
}
