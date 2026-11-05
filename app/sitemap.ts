import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.ldsinfo.in'

  const staticRoutes = [
    '',
    '/capabilities',
    '/company',
    '/insights',
    '/partner-with-us',
    '/quality-safety',
    '/vendor-capabilities',
  ]

  const capabilityRoutes = [
    '/capabilities/turnkey-electrification',
    '/capabilities/substations-switchyards',
    '/capabilities/transmission-lines',
    '/capabilities/underground-cable-laying',
    '/capabilities/industrial-electrification',
    '/capabilities/healthcare-electrical-infrastructure',
    '/capabilities/warehouse-electrification',
    '/capabilities/testing-commissioning',
    '/capabilities/electrical-maintenance',
  ]

  const projectRoutes = [
    '/projects/taj-hotel',
    '/projects/sonotel',
    '/projects/assam-medical-college',
    '/projects/sarojini-naidu-hospital',
    '/projects/skmc-medical-college',
    '/projects/bihar-vidhan-sabha',
    '/projects/warehouse-projects',
    '/projects/kohora-substation',
    '/projects/signature',
    '/projects/shristinagar',
  ]

  const allRoutes = [...staticRoutes, ...capabilityRoutes, ...projectRoutes]

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1.0 : route.startsWith('/capabilities') || route.startsWith('/projects') ? 0.8 : 0.6,
  }))
}
