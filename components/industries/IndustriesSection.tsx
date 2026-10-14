'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { MEDIA } from '@/data/media'
import { INDUSTRIES } from '@/data/content'
import {
  attachSrcOnce,
  pauseAllVideos,
  prepareVideo,
  safePause,
  safePlay,
} from '@/lib/videoPlayback'

const OBJECT_POSITIONS: Record<string, string> = {
  manufacturing:        'center 22%',
  commercial:           'center 20%',
  warehousing:          'center 25%',
  realEstate:           'center 22%',
  institutions:         'center 25%',
  industrialFacilities: 'center 22%',
  infrastructure:       'center 25%',
}

const POSTER_MAP: Record<string, string> = {
  manufacturing:        '/media/posters/industrial.jpg',
  commercial:           '/media/posters/commercial.jpg',
  warehousing:          '/media/posters/warehouse.jpg',
  realEstate:           '/media/posters/residential.jpg',
  institutions:         '/media/posters/campus.jpg',
  industrialFacilities: '/media/posters/industrial.jpg',
  infrastructure:       '/media/posters/infrastructure.jpg',
}

function neighborsOf(index: number) {
  const set = new Set<number>([index])
  if (index > 0) set.add(index - 1)
  if (index < INDUSTRIES.length - 1) set.add(index + 1)
  return set
}

export default function IndustriesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const desktopVideoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const mobileVideoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const mobileCardRefs = useRef<(HTMLDivElement | null)[]>([])
  const activeIndexRef = useRef(0)
  const visualIndexRef = useRef(0)
  const mediaTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const inViewRef = useRef(true)

  const [isMobile, setIsMobile] = useState(false)
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0)
  const videoRequestIdRef = useRef(0)

  const refsForMode = useCallback(() => (
    isMobile ? mobileVideoRefs.current : desktopVideoRefs.current
  ), [isMobile])

  const ensureSources = useCallback((activeIdx: number, refs: Array<HTMLVideoElement | null>) => {
    const ready = neighborsOf(activeIdx)
    refs.forEach((vid, i) => {
      if (!vid) return
      prepareVideo(vid)
      if (ready.has(i)) {
        const key = INDUSTRIES[i].mediaKey
        attachSrcOnce(vid, MEDIA.industries[key])
      }
    })
  }, [])

  const playActive = useCallback((activeIdx: number, explicitReqId?: number) => {
    const reqId = explicitReqId ?? ++videoRequestIdRef.current
    const refs = refsForMode()
    ensureSources(activeIdx, refs)

    // Instantly hide and pause all inactive videos
    refs.forEach((vid, i) => {
      if (i !== activeIdx && vid) {
        vid.style.opacity = '0'
        safePause(vid)
      }
    })

    const active = refs[activeIdx]
    if (!active || !inViewRef.current) return

    prepareVideo(active)

    const reveal = () => {
      if (videoRequestIdRef.current === reqId && inViewRef.current) {
        active.style.opacity = '1'
      }
    }

    if (active.readyState >= 2) {
      void safePlay(active).then((started) => {
        if (started || !active.paused) {
          reveal()
        }
      })
    } else {
      const onReady = () => {
        active.removeEventListener('canplay', onReady)
        active.removeEventListener('loadeddata', onReady)
        if (videoRequestIdRef.current === reqId && inViewRef.current) {
          void safePlay(active).then((started) => {
            if (started || !active.paused) {
              reveal()
            }
          })
        }
      }
      active.addEventListener('canplay', onReady, { once: true })
      active.addEventListener('loadeddata', onReady, { once: true })
      void safePlay(active)
    }
  }, [ensureSources, refsForMode])

  const updateCardDOMStyles = useCallback((activeIdx: number) => {
    cardRefs.current.forEach((card, i) => {
      if (!card) return
      const isCurrent = i === activeIdx
      const topBar = card.querySelector('[data-active-bar]') as HTMLElement | null
      const label = card.querySelector('[data-card-label]') as HTMLElement | null
      const number = card.querySelector('[data-card-num]') as HTMLElement | null
      const line = card.querySelector('[data-card-line]') as HTMLElement | null

      if (topBar) topBar.style.opacity = isCurrent ? '1' : '0'
      if (label) {
        label.style.color = isCurrent ? '#FAF8F5' : 'rgba(250,248,245,0.70)'
        label.style.fontWeight = isCurrent ? '600' : '500'
      }
      if (number) number.style.opacity = isCurrent ? '1' : '0.6'
      if (line) {
        line.style.width = isCurrent ? '32px' : '16px'
        line.style.opacity = isCurrent ? '0.9' : '0.4'
      }
    })
  }, [])

  const commitIndustry = useCallback((index: number) => {
    const reqId = ++videoRequestIdRef.current
    activeIndexRef.current = index
    visualIndexRef.current = index
    updateCardDOMStyles(index)
    if (inViewRef.current) {
      playActive(index, reqId)
    }
  }, [playActive, updateCardDOMStyles])

  const selectIndustry = useCallback((index: number) => {
    if (index === visualIndexRef.current) return
    visualIndexRef.current = index
    updateCardDOMStyles(index)

    if (mediaTimerRef.current) {
      clearTimeout(mediaTimerRef.current)
      mediaTimerRef.current = null
    }

    if (index === activeIndexRef.current) return

    // Monotonic token check in debounced transition
    const reqId = ++videoRequestIdRef.current
    mediaTimerRef.current = setTimeout(() => {
      if (videoRequestIdRef.current !== reqId) return
      commitIndustry(index)
    }, 60)
  }, [commitIndustry, updateCardDOMStyles])

  useEffect(() => {
    const el = sectionRef.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      inViewRef.current = true
      playActive(activeIndexRef.current)
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      inViewRef.current = entry.isIntersecting
      if (entry.isIntersecting) {
        playActive(activeIndexRef.current)
      } else {
        videoRequestIdRef.current++
        pauseAllVideos(desktopVideoRefs.current)
        pauseAllVideos(mobileVideoRefs.current)
      }
    }, { rootMargin: '160px 0px', threshold: 0.05 })

    observer.observe(el)
    const kick = window.setTimeout(() => playActive(activeIndexRef.current), 60)
    return () => {
      observer.disconnect()
      clearTimeout(kick)
    }
  }, [playActive])

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768
      setIsMobile((prev) => (prev !== mobile ? mobile : prev))
    }
    checkMobile()
    let resizeTimer: ReturnType<typeof setTimeout>
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(checkMobile, 150)
    }
    window.addEventListener('resize', onResize, { passive: true })
    return () => {
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => {
    let isUnmounted = false
    let ctx: { revert: () => void } | undefined
    let resizeCleanup: (() => void) | undefined
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track || isMobile) return

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (isUnmounted) return

      ctx = gsap.context(() => {
        const getDistance = () => {
          const trackWidth = track.scrollWidth
          const containerWidth = section.clientWidth
          return Math.max(0, trackWidth - containerWidth + 48)
        }

        const distance = getDistance()
        if (distance <= 0) return

        updateCardDOMStyles(activeIndexRef.current)
        playActive(activeIndexRef.current)

        gsap.to(track, {
          x: -distance,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            pin: true,
            anticipatePin: 1,
            scrub: 0.8,
            start: 'top top',
            end: () => `+=${getDistance() * 1.5}`,
            invalidateOnRefresh: true,
          },
        })
      }, section)

      const onResize = () => ScrollTrigger.refresh()
      window.addEventListener('resize', onResize, { passive: true })
      resizeCleanup = () => window.removeEventListener('resize', onResize)
    }

    const timer = setTimeout(init, 100)
    return () => {
      isUnmounted = true
      clearTimeout(timer)
      resizeCleanup?.()
      if (ctx) ctx.revert()
    }
  }, [isMobile, playActive, updateCardDOMStyles])

  useEffect(() => {
    if (!isMobile) return
    const cards = mobileCardRefs.current.filter(Boolean) as HTMLDivElement[]
    if (!cards.length || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (!visible) return
      const index = cards.indexOf(visible.target as HTMLDivElement)
      if (index < 0 || index === activeIndexRef.current) return
      activeIndexRef.current = index
      visualIndexRef.current = index
      setMobileActiveIndex(index)
      playActive(index)
    }, { threshold: 0.55 })

    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [isMobile, playActive])

  useEffect(() => {
    return () => {
      if (mediaTimerRef.current) clearTimeout(mediaTimerRef.current)
      pauseAllVideos(desktopVideoRefs.current)
      pauseAllVideos(mobileVideoRefs.current)
    }
  }, [])

  const handleMobileCardTap = (index: number) => {
    if (index === activeIndexRef.current) return
    activeIndexRef.current = index
    visualIndexRef.current = index
    setMobileActiveIndex(index)
    playActive(index)
    mobileCardRefs.current[index]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }

  const handleDesktopPointerEnter = (index: number) => {
    selectIndustry(index)
  }

  return (
    <section
      ref={sectionRef}
      id="industries"
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--line-soft)',
        overflow: 'hidden',
        position: 'relative',
      }}
      aria-label="Industries served"
    >
      <div
        data-header
        className="site-container"
        style={{ paddingTop: 'var(--section-py)', paddingBottom: '36px' }}
      >
        <div className="section-label" style={{ marginBottom: '20px' }}>
          <span className="section-label-bullet" />
          <span className="t-label">11 — Industries</span>
        </div>
        <div id="industries-header" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(24px, 4vw, 64px)',
          alignItems: 'end',
        }}>
          <h2 className="t-headline" style={{ textWrap: 'balance' }}>
            POWERING EVERY{' '}
            <span style={{ color: 'var(--accent-gold)' }}>SECTOR.</span>
          </h2>
          <p className="t-body" style={{ maxWidth: '440px' }}>
            From manufacturing plants and warehouses to institutional campuses and commercial facilities, Lukhdatar &amp; Sons delivers the same engineering precision across every industrial sector.
          </p>
        </div>
      </div>

      {!isMobile && (
        <div style={{ overflow: 'hidden', paddingBottom: 'clamp(40px, 5vw, 64px)' }}>
          <div
            ref={trackRef}
            style={{
              display: 'flex',
              gap: '12px',
              paddingLeft: 'var(--container-px)',
              paddingRight: 'var(--container-px)',
              width: 'max-content',
              willChange: 'transform',
              alignItems: 'flex-end',
            }}
          >
            {INDUSTRIES.map((industry, index) => {
              const objPos = OBJECT_POSITIONS[industry.mediaKey] || 'center center'
              const isInitialActive = index === 0

              return (
                <div
                  key={industry.id}
                  ref={(el) => { cardRefs.current[index] = el }}
                  data-industry-card
                  aria-label={`Industry: ${industry.label}`}
                  onPointerEnter={() => handleDesktopPointerEnter(index)}
                  onClick={() => handleDesktopPointerEnter(index)}
                  style={{
                    flexShrink: 0,
                    width: 'clamp(280px, 26vw, 380px)',
                    height: 'clamp(380px, 48vh, 520px)',
                    position: 'relative',
                    overflow: 'hidden',
                    background: 'var(--surface)',
                    transformOrigin: 'bottom center',
                    cursor: 'pointer',
                    borderBottom: '2px solid transparent',
                    contain: 'layout paint',
                  }}
                >
                  <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                    {POSTER_MAP[industry.mediaKey] && (
                      <img
                        src={POSTER_MAP[industry.mediaKey]}
                        alt=""
                        aria-hidden="true"
                        loading="eager"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: objPos,
                          zIndex: 1,
                          pointerEvents: 'none',
                          display: 'block',
                        }}
                      />
                    )}
                    <video
                      ref={(el) => {
                        if (el) prepareVideo(el)
                        desktopVideoRefs.current[index] = el
                      }}
                      poster={POSTER_MAP[industry.mediaKey]}
                      muted
                      playsInline
                      loop
                      preload="none"
                      onError={() => {
                        const vid = desktopVideoRefs.current[index]
                        if (vid) vid.style.opacity = '0'
                      }}
                      style={{
                        position: 'relative',
                        zIndex: 2,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: objPos,
                        opacity: 0,
                        transition: 'opacity 400ms cubic-bezier(0.4, 0, 0.2, 1)',
                        backgroundColor: 'transparent',
                        display: 'block',
                        pointerEvents: 'none',
                      }}
                      aria-label={`Video showing ${industry.label} electrification`}
                    />
                  </div>

                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(10,14,18,0.85) 0%, rgba(10,14,18,0.20) 40%, transparent 70%)',
                      zIndex: 2,
                      pointerEvents: 'none',
                    }}
                  />

                  <div
                    data-active-bar
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'var(--accent-gold)',
                      opacity: isInitialActive ? 1 : 0,
                      transition: 'opacity 300ms ease',
                      zIndex: 3,
                    }}
                  />

                  <div
                    style={{
                      position: 'absolute',
                      bottom: '28px',
                      left: '24px',
                      right: '24px',
                      zIndex: 3,
                      pointerEvents: 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <span
                        data-card-num
                        style={{
                          fontSize: '10px',
                          fontWeight: 600,
                          color: 'var(--accent-gold)',
                          letterSpacing: '0.14em',
                          opacity: isInitialActive ? 1 : 0.6,
                          transition: 'opacity 300ms ease',
                        }}
                      >
                        0{index + 1}
                      </span>
                      <div
                        data-card-line
                        style={{
                          width: isInitialActive ? '32px' : '16px',
                          height: '1px',
                          background: 'var(--accent-gold)',
                          opacity: isInitialActive ? 0.9 : 0.4,
                          transition: 'width 300ms ease, opacity 300ms ease',
                        }}
                      />
                    </div>
                    <div
                      data-card-label
                      style={{
                        fontSize: 'clamp(17px, 1.4vw, 22px)',
                        fontWeight: isInitialActive ? 600 : 500,
                        color: isInitialActive ? '#FAF8F5' : 'rgba(250,248,245,0.70)',
                        letterSpacing: '-0.01em',
                        transition: 'color 300ms ease',
                        lineHeight: 1.2,
                      }}
                    >
                      {industry.label}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {isMobile && (
        <div style={{ paddingBottom: '48px' }}>
          <div
            className="industries-mobile-snap-track"
            style={{
              display: 'flex',
              gap: '12px',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              paddingLeft: 'var(--container-px)',
              paddingRight: 'var(--container-px)',
              paddingBottom: '16px',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {INDUSTRIES.map((industry, index) => {
              const objPos = OBJECT_POSITIONS[industry.mediaKey] || 'center center'
              const isActive = index === mobileActiveIndex

              return (
                <div
                  key={industry.id}
                  ref={(el) => { mobileCardRefs.current[index] = el }}
                  onClick={() => handleMobileCardTap(index)}
                  aria-label={`Industry: ${industry.label}`}
                  style={{
                    flexShrink: 0,
                    width: 'min(340px, calc(100vw - (var(--container-px) * 2)))',
                    maxWidth: 'min(340px, calc(100vw - (var(--container-px) * 2)))',
                    height: '420px',
                    scrollSnapAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    background: 'var(--surface)',
                    border: isActive ? '1px solid rgba(201,160,82,0.45)' : '1px solid var(--line-soft)',
                    transition: 'border-color 300ms ease',
                    contain: 'layout paint',
                  }}
                >
                  <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                    {POSTER_MAP[industry.mediaKey] && (
                      <img
                        src={POSTER_MAP[industry.mediaKey]}
                        alt=""
                        aria-hidden="true"
                        loading="eager"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: objPos,
                          zIndex: 1,
                          pointerEvents: 'none',
                          display: 'block',
                        }}
                      />
                    )}
                    <video
                      ref={(el) => {
                        if (el) prepareVideo(el)
                        mobileVideoRefs.current[index] = el
                      }}
                      poster={POSTER_MAP[industry.mediaKey]}
                      muted
                      playsInline
                      loop
                      preload="none"
                      onError={() => {
                        const vid = mobileVideoRefs.current[index]
                        if (vid) vid.style.opacity = '0'
                      }}
                      style={{
                        position: 'relative',
                        zIndex: 2,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: objPos,
                        opacity: 0,
                        transition: 'opacity 400ms cubic-bezier(0.4, 0, 0.2, 1)',
                        backgroundColor: 'transparent',
                        display: 'block',
                        pointerEvents: 'none',
                      }}
                      aria-label={`Video showing ${industry.label} electrification`}
                    />
                  </div>

                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(10,14,18,0.88) 0%, rgba(10,14,18,0.20) 40%, transparent 70%)',
                      zIndex: 2,
                      pointerEvents: 'none',
                    }}
                  />

                  {isActive && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '2px',
                        background: 'var(--accent-gold)',
                        zIndex: 3,
                      }}
                    />
                  )}

                  <div
                    style={{
                      position: 'absolute',
                      bottom: '24px',
                      left: '20px',
                      right: '20px',
                      zIndex: 3,
                      pointerEvents: 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 600,
                          color: 'var(--accent-gold)',
                          letterSpacing: '0.14em',
                        }}
                      >
                        0{index + 1}
                      </span>
                      <div
                        style={{
                          width: '24px',
                          height: '1px',
                          background: 'var(--accent-gold)',
                          opacity: 0.8,
                        }}
                      />
                    </div>
                    <div
                      style={{
                        fontSize: '18px',
                        fontWeight: 600,
                        color: '#FAF8F5',
                        letterSpacing: '-0.01em',
                        lineHeight: 1.2,
                      }}
                    >
                      {industry.label}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '6px',
              paddingTop: '8px',
            }}
          >
            {INDUSTRIES.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show ${INDUSTRIES[i].label}`}
                onClick={() => handleMobileCardTap(i)}
                style={{
                  width: i === mobileActiveIndex ? '20px' : '6px',
                  height: '3px',
                  borderRadius: '2px',
                  padding: 0,
                  border: 'none',
                  background: i === mobileActiveIndex ? 'var(--accent-gold)' : 'var(--line)',
                  transition: 'width 250ms ease, background-color 250ms ease',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>
        </div>
      )}

      <style>{`
        #industries-header {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(24px, 4vw, 64px);
          align-items: end;
        }

        .industries-mobile-snap-track::-webkit-scrollbar {
          display: none;
        }

        @media (max-width: 768px) {
          #industries-header {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </section>
  )
}
