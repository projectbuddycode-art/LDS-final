import React from 'react'
import { AI_VIDEO_DISCLOSURE_TEXT } from '@/lib/videoPlayback'

export { AI_VIDEO_DISCLOSURE_TEXT }

export type DisclosurePosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'

export interface AIVideoDisclosureProps {
  position?: DisclosurePosition
  variant?: 'overlay' | 'caption'
  className?: string
  style?: React.CSSProperties
}

const POSITION_STYLES: Record<DisclosurePosition, React.CSSProperties> = {
  'top-right': {
    top: '10px',
    right: '10px',
  },
  'top-left': {
    top: '10px',
    left: '10px',
  },
  'bottom-right': {
    bottom: '10px',
    right: '10px',
  },
  'bottom-left': {
    bottom: '10px',
    left: '10px',
  },
}

export default function AIVideoDisclosure({
  position = 'top-right',
  variant = 'overlay',
  className,
  style,
}: AIVideoDisclosureProps) {
  if (variant === 'caption') {
    return (
      <div
        role="note"
        aria-label={AI_VIDEO_DISCLOSURE_TEXT}
        data-ai-video-disclosure="caption"
        className={className}
        style={{
          fontSize: '11px',
          lineHeight: 1.4,
          letterSpacing: '0.02em',
          color: 'var(--text-muted)',
          marginTop: '6px',
          ...style,
        }}
      >
        {AI_VIDEO_DISCLOSURE_TEXT}
      </div>
    )
  }

  return (
    <div
      role="note"
      aria-label={AI_VIDEO_DISCLOSURE_TEXT}
      data-ai-video-disclosure="overlay"
      className={`ai-video-disclosure ${className || ''}`.trim()}
      style={{
        position: 'absolute',
        zIndex: 6,
        pointerEvents: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        padding: '3.5px 8px',
        background: 'rgba(10, 14, 18, 0.68)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        border: '1px solid rgba(201, 160, 82, 0.24)',
        borderRadius: '2px',
        color: 'rgba(250, 248, 245, 0.86)',
        fontSize: '9.5px',
        fontWeight: 500,
        letterSpacing: '0.025em',
        lineHeight: 1.3,
        maxWidth: 'calc(100% - 20px)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.28)',
        ...POSITION_STYLES[position],
        ...style,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          background: 'var(--accent-gold, #C9A052)',
           opacity: 0.85,
          flexShrink: 0,
        }}
      />
      <span>{AI_VIDEO_DISCLOSURE_TEXT}</span>
    </div>
  )
}
