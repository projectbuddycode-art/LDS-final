import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Production-grade caching and security headers for high-traffic CDN distribution
  async headers() {
    return [
      {
        source: '/media/:path*.mp4',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          { key: 'Accept-Ranges', value: 'bytes' },
        ],
      },
      {
        source: '/_next/static/media/:path*.mp4',
        headers: [
          { key: 'Accept-Ranges', value: 'bytes' },
        ],
      },
      {
        source: '/media/:path*.(png|jpg|jpeg|webp|svg)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  // Required: silence Turbopack default + webpack conflict warning
  turbopack: {},
}

export default nextConfig

