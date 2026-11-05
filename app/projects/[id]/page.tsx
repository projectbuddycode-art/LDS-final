import Link from 'next/link'
import PageLayout from '@/components/layout/PageLayout'
import BackNav from '@/components/navigation/BackNav'
import LazyVideo from '@/components/LazyVideo'
import { PROJECT_CASE_STUDIES } from '@/data/content'
import { MEDIA } from '@/data/media'

const PROJECT_MEDIA_MAP: Record<string, string> = {
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

const PROJECT_POSTER_MAP: Record<string, string> = {
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

// static generation parameters for Next.js build optimization
export function generateStaticParams() {
  return Object.keys(PROJECT_CASE_STUDIES).map((id) => ({ id }))
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const resolvedParams = await params
  const id = resolvedParams.id
  const project = PROJECT_CASE_STUDIES[id]

  if (!project) {
    return (
      <PageLayout>
        <section className="section-py" style={{ background: 'var(--bg-primary)', textAlign: 'center', marginTop: '72px' }}>
          <div className="site-container">
            <h1 className="t-headline" style={{ color: 'var(--accent-gold)' }}>Project Not Found</h1>
            <p className="t-body" style={{ marginTop: '16px' }}>The requested case study could not be located.</p>
            <div style={{ marginTop: '32px' }}>
              <Link href="/#projects" className="cta-btn">Back to Home Portfolio</Link>
            </div>
          </div>
        </section>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      {/* Header section */}
      <section className="section-py" style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--line-soft)', marginTop: '72px' }}>
        <div className="site-container">
          <BackNav fallbackHref="/#projects" label="Project Portfolio" />
          <div className="section-label">
            <span className="section-label-bullet" />
            <span className="t-label">Project Case Study · {project.sector}</span>
          </div>
          <h1 className="t-headline" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', lineHeight: 1.1, marginBottom: '16px' }}>
            {project.title}
          </h1>
        </div>
      </section>

      {/* Main content */}
      <section className="section-py" style={{ background: 'var(--bg-secondary)' }}>
        <div className="site-container">
          {PROJECT_MEDIA_MAP[project.mediaKey] && (
            <div
              className="media-frame"
              style={{
                aspectRatio: '16/9',
                marginBottom: '40px',
                border: '1px solid var(--line-soft)',
              }}
            >
              <LazyVideo
                src={PROJECT_MEDIA_MAP[project.mediaKey]}
                poster={PROJECT_POSTER_MAP[project.mediaKey] || '/media/posters/hero-bg.jpg'}
                aria-label={project.title}
              />
            </div>
          )}
          
          {/* Metadata Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '32px', marginBottom: '48px', borderBottom: '1px solid var(--line)', paddingBottom: '32px' }}>
            <div>
              <div style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '6px' }}>
                Client / Project Name
              </div>
              <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>
                {project.client}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '6px' }}>
                Sector
              </div>
              <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--accent-gold)' }}>
                {project.sector}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '6px' }}>
                Scope
              </div>
              <div style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                {project.scope}
              </div>
            </div>
          </div>

          <div className="two-col" style={{ alignItems: 'start' }}>
            {/* Left column — Design & Engineering */}
            <div>
              <div className="section-label">
                <span className="section-label-bullet" />
                <span className="t-label">01 — Engineering &amp; Execution</span>
              </div>
              <h2 className="t-headline" style={{ fontSize: 'clamp(20px, 2.5vw, 32px)', marginBottom: '24px', textWrap: 'balance' }}>
                On-Ground{' '}
                <span style={{ color: 'var(--accent-gold)' }}>Technical Erection</span>
              </h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {project.engineering.map((item, idx) => (
                  <li key={idx} className="t-body" style={{ fontSize: '13.5px', lineHeight: 1.6, display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent-gold)', marginTop: '8px', flexShrink: 0 }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right column — Testing & Commissioning */}
            <div className="col-border-responsive" style={{ borderLeft: '1px solid var(--line-soft)', paddingLeft: 'clamp(20px, 3vw, 48px)' }}>
              <div className="section-label">
                <span className="section-label-bullet" />
                <span className="t-label">02 — Testing &amp; Commissioning</span>
              </div>
              <h2 className="t-headline" style={{ fontSize: 'clamp(20px, 2.5vw, 32px)', marginBottom: '24px', textWrap: 'balance' }}>
                Clearances &amp;{' '}
                <span style={{ color: 'var(--accent-gold)' }}>Energisation</span>
              </h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {project.testing.map((item, idx) => (
                  <li key={idx} className="t-body" style={{ fontSize: '13.5px', lineHeight: 1.6, display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent-gold)', marginTop: '8px', flexShrink: 0 }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Outcome block */}
          <div style={{ marginTop: '64px', borderTop: '1px solid var(--line)', paddingTop: '48px', maxWidth: '720px' }}>
            <div className="section-label">
              <span className="section-label-bullet" />
              <span className="t-label">Project Outcome</span>
            </div>
            <h2 className="t-headline" style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', marginBottom: '20px', textWrap: 'balance' }}>
              Execution{' '}
              <span style={{ color: 'var(--accent-gold)' }}>Results</span>
            </h2>
            <p className="t-body" style={{ fontSize: '15px', lineHeight: 1.75 }}>
              {project.outcome}
            </p>
          </div>

          {/* Bottom links */}
          <div style={{ marginTop: '64px', textAlign: 'center', borderTop: '1px solid var(--line)', paddingTop: '48px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '20px' }}>
              Need similar infrastructure solutions executed up to specifications?
            </h3>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/vendor-capabilities?type=CaseStudy" className="cta-btn cta-btn-primary">
                Discuss Your Project
              </Link>
              <Link href="/partner-with-us" className="cta-btn">
                Explore Partnerships
              </Link>
            </div>
          </div>

        </div>
      </section>
    </PageLayout>
  )
}
