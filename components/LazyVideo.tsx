'use client'

import { useEffect, useRef, memo, useCallback, useState } from 'react'
import { prepareVideo, releaseVideo, safePause, safePlay } from '@/lib/videoPlayback'

export interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string
  poster: string
  aspectRatio?: string
  containerStyle?: React.CSSProperties
  preloadImmediate?: boolean
}

function LazyVideo({
  src,
  poster,
  aspectRatio,
  containerStyle,
  preloadImmediate = false,
  className,
  style,
  onError,
  onPlaying,
  onCanPlay,
  onLoadedData,
  ...props
}: LazyVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const intersectingRef = useRef(preloadImmediate)
  const hasErrorRef = useRef(false)
  const isRevealedRef = useRef(false)
  const isUnmountedRef = useRef(false)
  const [mediaAttached, setMediaAttached] = useState(preloadImmediate)

  const revealVideo = useCallback(() => {
    if (isUnmountedRef.current || isRevealedRef.current) return
    const video = videoRef.current
    if (!video || video.paused || hasErrorRef.current) return
    isRevealedRef.current = true
    video.style.opacity = '1'
  }, [])

  const tryPlay = useCallback(() => {
    if (isUnmountedRef.current || hasErrorRef.current) return
    const video = videoRef.current
    if (!video) return
    if (!intersectingRef.current && !preloadImmediate) return

    if (typeof window !== 'undefined') {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReducedMotion) {
        safePause(video)
        return
      }
    }

    prepareVideo(video)
    void safePlay(video).then((started) => {
      if (started && !isUnmountedRef.current) {
        revealVideo()
      }
    })
  }, [preloadImmediate, revealVideo])

  useEffect(() => {
    isUnmountedRef.current = false
    return () => {
      isUnmountedRef.current = true
    }
  }, [])

  useEffect(() => {
    hasErrorRef.current = false
    isRevealedRef.current = false
    const video = videoRef.current
    if (video) {
      video.style.opacity = '0'
      prepareVideo(video)
    }
  }, [src])

  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    if (!video || hasErrorRef.current) return

    prepareVideo(video)

    if (preloadImmediate) {
      intersectingRef.current = true
      tryPlay()
      return () => {
        releaseVideo(video)
      }
    }

    if (typeof IntersectionObserver === 'undefined' || !container) {
      intersectingRef.current = true
      tryPlay()
      return () => {
        releaseVideo(video)
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (isUnmountedRef.current) return
        intersectingRef.current = entry.isIntersecting
        if (entry.isIntersecting) {
          setMediaAttached(true)
          tryPlay()
        } else {
          safePause(video)
        }
      },
      { rootMargin: '180px 0px', threshold: 0.1 }
    )

    observer.observe(container)

    return () => {
      observer.disconnect()
      releaseVideo(video)
    }
  }, [src, preloadImmediate, tryPlay])

  useEffect(() => {
    if (mediaAttached) {
      tryPlay()
    }
  }, [mediaAttached, tryPlay, src])

  const handleVideoPlaying = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    revealVideo()
    if (onPlaying) onPlaying(e)
  }

  const handleCanPlay = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    if (intersectingRef.current || preloadImmediate) {
      tryPlay()
    }
    if (onCanPlay) onCanPlay(e)
  }

  const handleLoadedData = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    if (intersectingRef.current || preloadImmediate) {
      tryPlay()
    }
    if (onLoadedData) onLoadedData(e)
  }

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    hasErrorRef.current = true
    const video = videoRef.current
    if (video) {
      video.style.opacity = '0'
    }
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[LDS Video Error Safeguard] Retaining static poster:', {
        src,
        poster,
      })
    }
    if (onError) onError(e)
  }

  // Safe handler for non-fatal media lifecycle events
  const handleNoopMediaEvent = () => {
    // Keep playback and poster fallback stable
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        aspectRatio,
        overflow: 'hidden',
        background: '#0A0E12',
        contain: 'layout paint',
        ...containerStyle,
      }}
      className={className}
    >
      {/* ── Instant Static Poster Fallback (Rendered immediately, never blocks page) ── */}
      {poster && (
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          loading="eager"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: (style?.objectFit as React.CSSProperties['objectFit']) || 'cover',
            objectPosition: (style?.objectPosition as string) || 'center center',
            display: 'block',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* ── Hardened Cinematic Video Element ── */}
      <video
        ref={(el) => {
          if (el) prepareVideo(el)
          videoRef.current = el
        }}
        src={mediaAttached ? src : undefined}
        poster={poster}
        autoPlay
        muted
        playsInline
        loop
        preload={preloadImmediate ? 'auto' : 'metadata'}
        onPlaying={handleVideoPlaying}
        onCanPlay={handleCanPlay}
        onLoadedData={handleLoadedData}
        onError={handleVideoError}
        onWaiting={handleNoopMediaEvent}
        onStalled={handleNoopMediaEvent}
        onSuspend={handleNoopMediaEvent}
        onAbort={handleNoopMediaEvent}
        onEmptied={handleNoopMediaEvent}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: style?.objectFit || 'cover',
          objectPosition: style?.objectPosition || 'center center',
          display: 'block',
          backgroundColor: 'transparent',
          zIndex: 2,
          opacity: 0,
          transition: 'opacity 400ms cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: 'none',
          ...style,
        }}
        {...props}
      />
    </div>
  )
}

export default memo(LazyVideo)

