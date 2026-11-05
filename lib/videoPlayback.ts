const MAX_CONCURRENT_PLAYING = 4
const playing = new Set<HTMLVideoElement>()

export const AI_VIDEO_DISCLOSURE_TEXT =
  'AI-generated visuals. Used for illustrative and presentation purposes.'

/**
 * Configure video DOM element and attributes strictly for silent autoplay compliance across all browsers (Safari/Chrome/Firefox/Edge/iOS/Android).
 */
export function prepareVideo(video: HTMLVideoElement | null) {
  if (!video) return
  try {
    video.muted = true
    video.defaultMuted = true
    video.volume = 0
    video.playsInline = true
    video.setAttribute('playsinline', '')
    video.setAttribute('webkit-playsinline', '')
    video.setAttribute('muted', '')
    video.setAttribute('autoplay', '')
    video.setAttribute('disablepictureinpicture', '')
    video.setAttribute('disableremoteplayback', '')
  } catch {
    // Gracefully handle DOM errors in non-standard environments
  }
}

/**
 * Exception-safe video pause with decoder slot cleanup.
 */
export function safePause(video: HTMLVideoElement | null) {
  if (!video) return
  playing.delete(video)
  if (!video.paused) {
    try {
      video.pause()
    } catch {
      // Benign pause error
    }
  }
}

/**
 * Manage browser hardware decoder capacity by evicting oldest playing videos if limit is reached.
 */
function evictIfNeeded(keep: HTMLVideoElement) {
  if (playing.has(keep) || playing.size < MAX_CONCURRENT_PLAYING) return
  const extras = [...playing].filter((v) => v !== keep)
  while (playing.size >= MAX_CONCURRENT_PLAYING && extras.length) {
    const oldest = extras.shift()
    if (oldest) safePause(oldest)
  }
}

/**
 * Guaranteed zero-crash video play function.
 * Ensures DOM attributes, manages hardware decoders, and catches all promise rejections.
 */
export async function safePlay(video: HTMLVideoElement | null): Promise<boolean> {
  if (!video) return false
  prepareVideo(video)

  if (video.readyState === 0 && !video.src && !video.currentSrc) return false
  if (!video.paused && !video.ended) {
    playing.add(video)
    return true
  }

  evictIfNeeded(video)

  try {
    const promise = video.play()
    if (promise !== undefined) {
      await promise
    }
    playing.add(video)
    return true
  } catch (error) {
    const name = error instanceof Error ? error.name : ''
    // AbortError is normal when rapid hover/scroll interrupts a pending play request
    // NotAllowedError occurs if browser autoplay policy defers playback until user gesture
    if (name === 'AbortError' || name === 'NotAllowedError') {
      return false
    }
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[LDS Video Playback Safe Catch]:', error)
    }
    return false
  }
}

/**
 * Attach source URL once without triggering unnecessary media decoder restarts.
 */
export function attachSrcOnce(video: HTMLVideoElement | null, src: string) {
  if (!video || !src) return
  const current = video.getAttribute('src') || video.src
  if (current && (current === src || current.endsWith(src))) return
  if (video.dataset.ldsSrc === src) return
  video.dataset.ldsSrc = src
  video.src = src
}

/**
 * Pause all videos in an array except the specified active index.
 */
export function pauseAllExcept(videos: Array<HTMLVideoElement | null>, keepIndex: number) {
  videos.forEach((video, i) => {
    if (i !== keepIndex) safePause(video)
  })
}

/**
 * Pause all videos in an array.
 */
export function pauseAllVideos(videos: Array<HTMLVideoElement | null>) {
  videos.forEach((video) => safePause(video))
}

/**
 * Clean up a video element completely on unmount.
 */
export function releaseVideo(video: HTMLVideoElement | null) {
  if (!video) return
  safePause(video)
  playing.delete(video)
}

/**
 * Creates a monotonic request token generator to prevent race conditions during rapid state changes.
 */
export function createTokenTracker() {
  let currentToken = 0
  return {
    next: () => ++currentToken,
    isCurrent: (token: number) => token === currentToken,
    get: () => currentToken,
  }
}

