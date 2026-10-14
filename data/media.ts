// Centralized media manifest for LDS Infrastructure website
// Sourced strictly from verified project assets in /public/media/ and project root media files.

const switchgearVideo = new URL('../Switchgear_installation_in_indus…_20260917040924 (1).mp4', import.meta.url).toString()
const apfcVideo = new URL('../Industrial_control_panels_and_APFC_20260917040929.mp4', import.meta.url).toString()
const transformersVideo = new URL('../Transformers_inside_electrical_p…_20260917041122.mp4', import.meta.url).toString()

export const MEDIA = {
  // ── Intro + Hero ─────────────────────────────────────────
  introVideo: '/media/new-intro.mp4',
  introPoster: '/media/posters/new-intro.jpg',
  heroVideo: '/media/hero-bg.mp4',

  // ── Leadership ───────────────────────────────────────────
  leadership: {
    founder: '/media/founder-lalit.png',   // Mr. Lalit Kumar Sureka
    md: '/media/md-shree.png',             // Mr. Shree Mangalam Sureka
  },

  // ── Infrastructure / Cable Systems ───────────────────────
  cableSystems: '/media/underground-cabling-system.mp4',

  // ── Transmission ─────────────────────────────────────────
  transmission: '/media/substation.mp4',

  // ── Equipment Range & Cinematic Mapping ──────────────────
  equipment: {
    transformers:       transformersVideo,
    switchgear:         switchgearVideo,
    busduct:            '/media/busduct.mp4',
    capacitorBank:      '/media/capacitor-bank.mp4',
    powerControlCenter: '/media/power-control-center.mp4',
    apfcControlPanels:  apfcVideo,
  },

  // ── Turnkey / Workforce ──────────────────────────────────
  workers: '/media/workers.mp4',

  // ── Project Portfolio ────────────────────────────────────
  projects: {
    tajHotel:          '/media/taj-hotel.mp4',
    sonotel:           '/media/sonotel-project.mp4',
    assamHill:         '/media/aasam-hill-medical-college.mp4',
    sarojiniHospital:  '/media/sarojini-naidu-medical-hospital.mp4',
    skmcMedical:       '/media/shree-krishna-medical.mp4',
    biharVidhanSabha:  '/media/bihar-vidhan-sabha.mp4',
    warehouseProjects: '/media/warehouse-projects.mp4',
    kohoraSubstation:  '/media/kohora-substation.mp4',
    signature:         '/media/signature.mp4',
    shristinagar:      '/media/shristinagar.mp4',
  },

  // ── Industries Section (7 Dedicated Sectors) ─────────────
  // Dedicated videos mapped per specification.
  industries: {
    manufacturing:        '/media/industrial.mp4',      // 01 — Manufacturing
    commercial:           '/media/commercial.mp4',      // 02 — Commercial
    warehousing:          '/media/warehouse.mp4',       // 03 — Warehousing
    realEstate:           '/media/residential.mp4',     // 04 — Real Estate
    institutions:         '/media/campus.mp4',          // 05 — Institutions
    industrialFacilities: '/media/industrial.mp4',      // 06 — Industrial Facilities (Dedicated)
    infrastructure:       '/media/infrastructure.mp4',  // 07 — Infrastructure (Dedicated)
  },

  // ── Beyond Commissioning / Accountability ────────────────
  accountability:      '/media/accountability.mp4',
  beyondCommissioning: '/media/beyond-commissioning.mp4',

  // ── Company Catalog PDF ──────────────────────────────────
  catalogPdf: '/LDS-prospectus.pdf',
} as const

export type MediaKey = typeof MEDIA
