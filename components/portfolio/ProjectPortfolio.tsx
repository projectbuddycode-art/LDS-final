'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { MEDIA } from '@/data/media'
import { PROJECTS } from '@/data/content'
import LazyVideo from '@/components/LazyVideo'

export default function ProjectPortfolio() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let isUnmounted = false
    let ctx: { revert: () => void } | undefined
    const section = sectionRef.current
    if (!section) return

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (isUnmounted) return

      ctx = gsap.context(() => {
        section.querySelectorAll('[data-reveal]').forEach((el, i) => {
          gsap.fromTo(el,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: i * 0.08,
              scrollTrigger: { trigger: el, start: 'top 90%', once: true } }
          )
        })

        section.querySelectorAll('[data-proj-card]').forEach((card) => {
          gsap.fromTo(card,
            { scale: 0.97, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.85, ease: 'power2.out',
              scrollTrigger: { trigger: card, start: 'top 88%', once: true } }
          )
        })
      }, section)

    }
    init()
    return () => {
      isUnmounted = true
      if (ctx) ctx.revert()
    }
  }, [])

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

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="section-py"
      style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--line-soft)' }}
      aria-label="Project portfolio"
    >
      <div className="site-container">

        <div id="portfolio-header" style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(24px, 4vw, 64px)', alignItems: 'end',
          marginBottom: 'clamp(32px, 4vw, 48px)',
        }}>
          <div>
            <div data-reveal className="section-label">
              <span className="section-label-bullet" />
              <span className="t-label">09 — Project Portfolio</span>
            </div>
            <h2 data-reveal className="t-headline" style={{ textWrap: 'balance' }}>
              Delivered{' '}
              <span style={{ color: 'var(--accent-gold)' }}>across sectors.</span>
            </h2>
          </div>
          <p data-reveal className="t-body" style={{ maxWidth: '380px' }}>
            Lukhdatar &amp; Sons has delivered complete electrical infrastructure for hospitality, healthcare,
            residential, commercial and industrial clients across India.
          </p>
        </div>

        <div className="project-grid">
          {PROJECTS.map((project, i) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              data-proj-card
              className="project-card"
              aria-label={`Project: ${project.title}`}
              style={{ display: 'block', textDecoration: 'none' }}
            >
              <div className="project-card-media">
                <LazyVideo
                  src={projectMediaMap[project.mediaKey]}
                  poster={projectPosterMap[project.mediaKey]}
                  aria-hidden="true"
                />
              </div>
              <div className="project-card-overlay" />
              <div className="project-card-meta">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span className="t-label" style={{ color: 'var(--accent-gold)' }}>{project.tag}</span>
                  <span style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(250,248,245,0.40)', letterSpacing: '0.14em' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div style={{ fontSize: 'clamp(15px, 1.3vw, 19px)', fontWeight: 600, color: '#FAF8F5', letterSpacing: '-0.01em', marginBottom: '4px', lineHeight: 1.2 }}>
                  {project.title}
                </div>
                <div className="t-label" style={{ color: 'rgba(250,248,245,0.50)' }}>{project.scope}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #portfolio-header {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .project-card {
            aspect-ratio: 16/10 !important;
          }
        }
      `}</style>
    </section>
  )
}
