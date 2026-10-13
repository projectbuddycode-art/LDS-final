'use client'

import { useState } from 'react'
import PageLayout from '@/components/layout/PageLayout'
import BackNav from '@/components/navigation/BackNav'
import { PROJECTS, INDUSTRIES } from '@/data/content'
import { MEDIA } from '@/data/media'
import LazyVideo from '@/components/LazyVideo'
import { openQuoteModal } from '@/lib/quoteEvents'

export default function ProjectsIndustriesPage() {
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null)

  const projectSnapshots: Record<string, Record<string, string>> = {
    'taj-hotel': {
      industry: 'Hospitality',
      projectType: 'Luxury hospitality electrical infrastructure',
      scope: 'Electrical infrastructure for a premium hotel environment',
      systems: 'Power distribution • switchboards • lighting • backup coordination',
      ldsRole: 'Turnkey electrical infrastructure execution',
      projectContext: 'Project reference within a premium hospitality setting.',
    },
    sonotel: {
      industry: 'Hospitality',
      projectType: 'Hospitality electrical SITC',
      scope: 'Main distribution panels, bus ducts, generator synchronization, and illumination systems',
      systems: 'Main distribution panels • bus ducts • generator synchronization • lighting',
      ldsRole: 'Supply, installation, testing & commissioning',
      projectContext: 'Executed for a hospitality property with coordinated power and lighting infrastructure.',
    },
    'assam-medical-college': {
      industry: 'Healthcare / Medical',
      projectType: 'Medical college and research campus electrical infrastructure',
      scope: 'Complete electrical SITC across academic blocks, hospital wards, and research laboratories',
      systems: 'Transformer yards • rising mains • cable tray networks • earthing systems',
      ldsRole: 'Complete electrical SITC delivery',
      projectContext: 'Campus-wide project covering clinical, academic, and research areas.',
    },
    'sarojini-naidu-hospital': {
      industry: 'Healthcare / Medical',
      projectType: 'Healthcare facility modernization',
      scope: 'Primary power distribution switchboards and electrical installation modernization',
      systems: 'Capacitor banks • main switchboards • grounding networks • power distribution',
      ldsRole: 'Turnkey SITC of electrical installations',
      projectContext: 'Delivered for an active medical facility with focused modernization of electrical infrastructure.',
    },
    'skmc-medical-college': {
      industry: 'Healthcare / Medical',
      projectType: 'Medical college campus electrification',
      scope: 'Campus power distribution and illumination infrastructure',
      systems: 'HT VCB switchgear • transformers • cable trays • emergency lighting',
      ldsRole: 'Complete electrical SITC',
      projectContext: 'Project scope covered campus-wide distribution and safety lighting systems.',
    },
    'bihar-vidhan-sabha': {
      industry: 'Government / Institutional',
      projectType: 'Institutional infrastructure electrification',
      scope: 'Turnkey infrastructure electrification for a state legislative complex',
      systems: 'Primary distribution • secure power routing • backup synchronization • panels',
      ldsRole: 'Turnkey electrical infrastructure execution',
      projectContext: 'Institutional project delivered with a focus on dependable public-sector power infrastructure.',
    },
    'warehouse-projects': {
      industry: 'Industrial / Infrastructure',
      projectType: 'Warehouse and logistics electrification',
      scope: 'Industrial power distribution and external logistics infrastructure',
      systems: 'High-bay lighting • high-masts • motor distribution boards • lightning protection',
      ldsRole: 'Electrical infrastructure and distribution execution',
      projectContext: 'Large-format logistics facility electrification with yard and internal distribution works.',
    },
    'kohora-substation': {
      industry: 'Substation',
      projectType: 'Utility substation infrastructure',
      scope: '2 × 3.15 MVA substation with control room and 9 VCB panels',
      systems: 'Transformers • control room • VCB panels • cable ducts',
      ldsRole: 'Turnkey design, supply, erection, testing & commissioning',
      projectContext: 'Completed in 100 working days with comprehensive testing and commissioning.',
    },
    signature: {
      industry: 'Residential / Township',
      projectType: 'Residential township power distribution',
      scope: 'HT/LT power distribution and transformer yard infrastructure',
      systems: 'HT/LT distribution • transformer yards • LT control panels • sub-metering',
      ldsRole: 'Power distribution and control system execution',
      projectContext: 'Delivered for a residential township with structured HT/LT distribution networks.',
    },
    shristinagar: {
      industry: 'Residential / Township',
      projectType: 'Township electrification',
      scope: 'Outdoor township electrification and distribution loop infrastructure',
      systems: 'LT feeder pillar boards • underground distribution loops • street lighting',
      ldsRole: 'Electrical distribution and external electrification execution',
      projectContext: 'Project included weather-proof feeder boards and external distribution infrastructure.',
    },
  }

  const projectMediaMap: Record<string, string> = {
    tajHotel:          MEDIA.projects.tajHotel,
    sonotel:           MEDIA.projects.sonotel,
    assamHill:         MEDIA.projects.assamHill,
    sarojiniHospital:  MEDIA.projects.sarojiniHospital,
    skmcMedical:       MEDIA.projects.skmcMedical,
    biharVidhanSabha:  MEDIA.projects.biharVidhanSabha,
    warehouseProjects: MEDIA.projects.warehouseProjects,
    kohoraSubstation:  MEDIA.projects.kohoraSubstation,
    signature:         MEDIA.projects.signature,
    shristinagar:      MEDIA.projects.shristinagar,
  }

  const projectPosterMap: Record<string, string> = {
    tajHotel:          '/media/posters/taj-hotel.jpg',
    sonotel:           '/media/posters/sonotel-project.jpg',
    assamHill:         '/media/posters/aasam-hill-medical-college.jpg',
    sarojiniHospital:  '/media/posters/sarojini-naidu-medical-hospital.jpg',
    skmcMedical:       '/media/posters/shree-krishna-medical.jpg',
    biharVidhanSabha:  '/media/posters/bihar-vidhan-sabha.jpg',
    warehouseProjects: '/media/posters/warehouse-projects.jpg',
    kohoraSubstation:  '/media/posters/kohora-substation.jpg',
    signature:         '/media/posters/signature.jpg',
    shristinagar:      '/media/posters/shristinagar.jpg',
  }

  const industryPosterMap: Record<string, string> = {
    manufacturing:        '/media/posters/industrial.jpg',
    commercial:           '/media/posters/commercial.jpg',
    warehousing:          '/media/posters/warehouse.jpg',
    realEstate:           '/media/posters/residential.jpg',
    institutions:         '/media/posters/campus.jpg',
    industrialFacilities: '/media/posters/industrial.jpg',
    infrastructure:       '/media/posters/infrastructure.jpg',
  }

  return (
    <PageLayout>
      {/* ── Hero Section ──────────────────────────────────────────────────────── */}
      <section className="section-py" style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--line-soft)', marginTop: '72px' }}>
        <div className="site-container">
          <BackNav fallbackHref="/" label="Home" />
          <div className="section-label">
            <span className="section-label-bullet" />
            <span className="t-label">PROJECTS &amp; INDUSTRIES</span>
          </div>
          <h1 className="t-headline" style={{ marginBottom: '24px', fontSize: 'clamp(36px, 5vw, 72px)', lineHeight: 1.05, textWrap: 'balance' }}>
            Projects &amp;{' '}
            <span style={{ color: 'var(--accent-gold)' }}>Industries Served</span>
          </h1>
          <p className="t-body" style={{ maxWidth: '680px', fontSize: 'clamp(16px, 1.2vw, 20px)', lineHeight: 1.6 }}>
            From hospitality and healthcare to industrial, commercial, and infrastructure applications, LDS supports electrical projects across diverse environments.
          </p>
        </div>
      </section>

      {/* ── Section 1: Verified Project Portfolio ─────────────────────────────── */}
      <section className="section-py" style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--line-soft)' }}>
        <div className="site-container">
          <div className="section-label" style={{ marginBottom: '16px' }}>
            <span className="section-label-bullet" />
            <span className="t-label">DELIVERED PROJECTS</span>
          </div>
          <h2 className="t-headline" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', marginBottom: '36px', textWrap: 'balance' }}>
            Featured Project{' '}
            <span style={{ color: 'var(--accent-gold)' }}>Execution Experience</span>
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '20px',
            marginBottom: '40px',
          }}>
            {PROJECTS.map((proj, idx) => (
              <article
                key={proj.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0',
                  overflow: 'hidden',
                  background: 'var(--bg-light)',
                  border: '1px solid var(--line-soft)',
                  minWidth: 0,
                }}
              >
                <div style={{ width: '100%', aspectRatio: '16 / 10', overflow: 'hidden', background: 'var(--surface)', borderBottom: '1px solid var(--line-soft)' }}>
                  <LazyVideo
                    src={projectMediaMap[proj.mediaKey]}
                    poster={projectPosterMap[proj.mediaKey]}
                    aria-label={proj.title}
                    style={{ objectPosition: 'center center' }}
                  />
                </div>

                <div style={{ padding: '20px 20px 22px', display: 'flex', flexDirection: 'column', gap: '12px', minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                    <span className="t-label" style={{ color: 'var(--accent-gold)' }}>{proj.tag}</span>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.12em' }}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 style={{ fontSize: 'clamp(18px, 1.5vw, 22px)', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.25, margin: 0, wordBreak: 'break-word' }}>
                    {proj.title}
                  </h3>

                  <p className="t-body" style={{ margin: 0, fontSize: '14px', lineHeight: 1.7, color: 'var(--text-secondary)', wordBreak: 'break-word' }}>
                    {proj.desc}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
                    <span className="t-label" style={{ color: 'var(--text-muted)' }}>Industry</span>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '0.02em' }}>
                      {proj.tag}
                    </span>
                  </div>

                  <button
                    type="button"
                    aria-expanded={expandedProjectId === proj.id}
                    onClick={() => setExpandedProjectId((current) => current === proj.id ? null : proj.id)}
                    style={{
                      alignSelf: 'flex-start',
                      border: 'none',
                      background: 'transparent',
                      color: 'var(--accent-gold)',
                      fontSize: '12px',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  >
                    {expandedProjectId === proj.id ? 'Show Less' : 'Know More'} ↗
                  </button>

                  {expandedProjectId === proj.id && (() => {
                    const snapshot = projectSnapshots[proj.id]
                    const fields = [
                      { label: 'Industry', value: snapshot?.industry },
                      { label: 'Project Type', value: snapshot?.projectType },
                      { label: 'Scope', value: snapshot?.scope },
                      { label: 'Systems', value: snapshot?.systems },
                      { label: 'LDS Role', value: snapshot?.ldsRole },
                      { label: 'Project Context', value: snapshot?.projectContext },
                    ].filter((field) => !!field.value)

                    return (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '12px', borderTop: '1px solid var(--line-soft)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                          <span className="t-label" style={{ color: 'var(--accent-gold)' }}>Project Snapshot</span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
                          {fields.map((field) => (
                            <div key={field.label} style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '10px 10px 9px', border: '1px solid var(--line-soft)', background: 'var(--bg-primary)' }}>
                              <span style={{ color: 'var(--text-muted)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                                {field.label}
                              </span>
                              <span style={{ color: 'var(--text-primary)', fontSize: '13px', lineHeight: 1.5, wordBreak: 'break-word' }}>
                                {field.value}
                              </span>
                            </div>
                          ))}
                        </div>

                        <button
                          type="button"
                          onClick={() => openQuoteModal(`${proj.title} project details`)}
                          style={{
                            alignSelf: 'flex-start',
                            marginTop: '2px',
                            border: '1px solid var(--line-gold)',
                            background: 'var(--bg-light)',
                            color: 'var(--text-primary)',
                            fontSize: '12px',
                            fontWeight: 600,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                            padding: '10px 12px',
                          }}
                        >
                          Request Project Details ↗
                        </button>
                      </div>
                    )
                  })()}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 2: Verified Industries Served ─────────────────────────────── */}
      <section className="section-py" style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--line-soft)' }}>
        <div className="site-container">
          <div className="section-label" style={{ marginBottom: '16px' }}>
            <span className="section-label-bullet" />
            <span className="t-label">INDUSTRIES SERVED</span>
          </div>
          <h2 className="t-headline" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', marginBottom: '16px', textWrap: 'balance' }}>
            Electrical Infrastructure Supporting{' '}
            <span style={{ color: 'var(--accent-gold)' }}>Diverse Sectors</span>
          </h2>
          <p className="t-body" style={{ maxWidth: '620px', marginBottom: '28px' }}>
            LDS has delivered electrical infrastructure and system works across multiple industries documented throughout the company portfolio and project history.
          </p>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
          }}>
            {INDUSTRIES.map((ind) => (
              <span
                key={ind.id}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '10px 14px',
                  border: '1px solid var(--line-soft)',
                  background: 'var(--bg-light)',
                  color: 'var(--text-primary)',
                  fontSize: '13px',
                  fontWeight: 500,
                }}
              >
                {ind.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: Selected Projects + Additional Project Inquiry ───────── */}
      <section className="section-py" style={{ background: 'var(--bg-secondary)', textAlign: 'center' }}>
        <div className="site-container">
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: '18px' }}>
            <span className="section-label-bullet" />
            <span className="t-label">SELECTED PROJECTS</span>
          </div>
          <h2 className="t-headline" style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', marginBottom: '20px' }}>
            Selected project examples from across our portfolio.
          </h2>
          <p className="t-body" style={{ maxWidth: '720px', margin: '0 auto 16px' }}>
            The projects showcased here represent a selection of LDS&apos;s work across different industries and applications.
          </p>
          <p className="t-body" style={{ maxWidth: '720px', margin: '0 auto 36px' }}>
            Looking for more project references or information about our experience in your industry? Reach out to our team to discuss additional projects, capabilities, and relevant project experience.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => openQuoteModal('Project Details Request')}
              className="cta-btn cta-btn-primary"
              style={{ cursor: 'pointer', fontFamily: 'inherit' }}
            >
              Request Project Details ↗
            </button>
            <button
              onClick={() => openQuoteModal()}
              className="cta-btn"
              style={{ cursor: 'pointer', fontFamily: 'inherit' }}
            >
              Send Inquiry ↗
            </button>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
