import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Lukhdatar & Sons | Turnkey Electrical Infrastructure & Contracting',
  description:
    'Lukhdatar & Sons delivers complete electrical infrastructure solutions: turnkey electrical SITC contracting, underground cable systems up to 66KV, substations up to 220KV, and overhead transmission lines up to 400KV across Government and Private sectors.',
  keywords: [
    'Lukhdatar & Sons',
    'electrical infrastructure contractor',
    'turnkey electrical contractor',
    'turnkey electrification',
    'electrical SITC',
    'complete electrical SITC',
    'electrical installation contractor',
    'HT/LT power distribution',
    'substation electrical work',
    'underground cable systems',
    'overhead transmission lines',
    'electrical testing and commissioning',
    'routine electrical maintenance',
    'lifecycle support',
    'industrial electrical infrastructure',
    'government electrical projects',
    'healthcare electrical infrastructure',
    'commercial electrical projects',
    'residential township electrification',
    'earthing and bonding',
    'lightning protection',
    'LV/MV/HV electrical systems',
    'Kolkata',
    'West Bengal',
    'India',
  ],
  openGraph: {
    title: 'Lukhdatar & Sons | Turnkey Electrical Infrastructure',
    description:
      'Turnkey electrical SITC, high-voltage substations up to 220KV, transmission lines up to 400KV, and underground cable networks up to 66KV.',
    siteName: 'Lukhdatar & Sons',
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const orgSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://ldsinfrastructure.com/#organization',
      'name': 'Lukhdatar & Sons',
      'legalName': 'Lukhdatar & Sons',
      'foundingDate': '1997',
      'founder': {
        '@type': 'Person',
        'name': 'Mr. Lalit Kumar Sureka',
      },
      'employee': [
        {
          '@type': 'Person',
          'name': 'Mr. Shree Mangalam Sureka',
          'jobTitle': 'Current Owner',
        },
      ],
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Kolkata',
        'addressRegion': 'West Bengal',
        'addressCountry': 'IN',
      },
      'email': 'info@ldsinfrastructure.com',
      'description':
        'Lukhdatar & Sons is a turnkey electrical infrastructure contractor established in 1997 in Kolkata. Delivering complete SITC projects across Government and Private sectors.',
      'knowsAbout': [
        'Turnkey Electrical Contracting',
        'Substations & Switchyards up to 220KV',
        'Transmission Lines up to 400KV',
        'Underground Cable Systems up to 66KV',
        'HT and LT Power Distribution',
        'Electrical Testing and Commissioning',
        'Routine Maintenance and Lifecycle Support',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://ldsinfrastructure.com/#website',
      'url': 'https://ldsinfrastructure.com',
      'name': 'Lukhdatar & Sons',
      'publisher': {
        '@id': 'https://ldsinfrastructure.com/#organization',
      },
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="preload" href="/media/posters/new-intro.jpg" as="image" type="image/jpeg" fetchPriority="high" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                window.addEventListener('unhandledrejection', function(event) {
                  var reason = event.reason;
                  if (reason && (reason.name === 'AbortError' || reason.name === 'NotAllowedError' || (typeof reason.message === 'string' && (reason.message.indexOf('play()') !== -1 || reason.message.indexOf('interrupted') !== -1)))) {
                    event.preventDefault();
                  }
                });
              }
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
