'use client'

import PageLayout from '@/components/layout/PageLayout'
import BackNav from '@/components/navigation/BackNav'
import { COMPANY, TIMELINE, LEADERSHIP } from '@/data/content'
import Image from 'next/image'

export default function CompanyPage() {
  return (
    <PageLayout>
      {/* ── Hero Section with Top-Right Catalog CTA ──────────────────────────── */}
      <section className="section-py" style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--line-soft)', marginTop: '72px' }}>
        <div className="site-container">
          <BackNav fallbackHref="/#about" label="Home" />
          
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: 'clamp(32px, 5vw, 64px)',
              alignItems: 'end',
              justifyContent: 'space-between',
            }}
          >
            {/* Left: Heading & Intro */}
            <div style={{ maxWidth: '680px' }}>
              <div className="section-label">
                <span className="section-label-bullet" />
                <span className="t-label">ABOUT US</span>
              </div>
              <h1 className="t-headline" style={{ marginBottom: '24px', fontSize: 'clamp(36px, 5vw, 72px)', lineHeight: 1.05, textWrap: 'balance' }}>
                Electrical Solutions{' '}
                <span style={{ color: 'var(--accent-gold)' }}>Built on Experience.</span>
              </h1>
              <p className="t-body" style={{ fontSize: 'clamp(16px, 1.2vw, 20px)', lineHeight: 1.6, margin: 0 }}>
                Lukhdatar &amp; Sons has been serving the electrical industry since 1997, starting as an electrical goods supplier and expanding into turnkey electrical contracting in 2007.
              </p>
            </div>

            {/* Right: Premium Compact Company Catalog CTA */}
            <div
              style={{
                width: '100%',
                maxWidth: '420px',
                justifySelf: 'end',
                background: 'var(--bg-light)',
                border: '1px solid var(--line-gold)',
                padding: 'clamp(20px, 2.5vw, 28px)',
                borderRadius: '2px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
              }}
              aria-label="Download company catalog"
            >
              <div className="section-label" style={{ marginBottom: 0 }}>
                <span className="section-label-bullet" />
                <span className="t-label" style={{ fontSize: '10px', letterSpacing: '0.14em' }}>OFFICIAL PROSPECTUS</span>
              </div>
              <div
                style={{
                  fontSize: 'clamp(18px, 1.6vw, 22px)',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.2,
                }}
              >
                COMPANY CATALOG
              </div>
              <p
                className="t-body"
                style={{
                  fontSize: '13px',
                  lineHeight: 1.55,
                  color: 'var(--text-secondary)',
                  margin: 0,
                }}
              >
                Explore our services, equipment and project experience.
              </p>
              <div style={{ marginTop: '6px' }}>
                <a
                  href="/LDS-prospectus.pdf"
                  download="LDS-Company-Prospectus.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-btn cta-btn-primary"
                  style={{
                    padding: '12px 24px',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    width: '100%',
                    justifyContent: 'center',
                  }}
                >
                  DOWNLOAD CATALOG ↓
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 01 — WHO WE ARE & EDITORIAL TIMELINE ───────────────────────────────── */}
      <section className="section-py" style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--line-soft)' }}>
        <div className="site-container">
          <div className="two-col" style={{ alignItems: 'start' }}>
            <div>
              <div className="section-label">
                <span className="section-label-bullet" />
                <span className="t-label">01 — WHO WE ARE</span>
              </div>
              <h2 className="t-headline" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', marginBottom: '24px', textWrap: 'balance' }}>
                Our Journey{' '}
                <span style={{ color: 'var(--accent-gold)' }}>&amp; Milestones</span>
              </h2>
              <p className="t-body" style={{ maxWidth: '480px', marginBottom: '24px', lineHeight: 1.7 }}>
                Lukhdatar &amp; Sons was formed in 1997 as an electrical goods supplier, establishing direct procurement channels and deep manufacturer relationships. In 2007, the company expanded into turnkey electrical contracting.
              </p>
              <p className="t-body" style={{ maxWidth: '480px', marginBottom: '32px', lineHeight: 1.7, fontStyle: 'italic', color: 'var(--text-primary)' }}>
                &ldquo;From supplying electrical equipment to executing complete turnkey electrical projects, LDS has grown through experience, customer relationships, technical capability and project execution.&rdquo;
              </p>
            </div>

            <div className="col-border-responsive" style={{ display: 'flex', flexDirection: 'column', gap: '36px', borderLeft: '1px solid var(--line-soft)', paddingLeft: 'clamp(20px, 3vw, 48px)' }}>
              {TIMELINE.map((item) => (
                <div key={item.year} style={{ position: 'relative' }}>
                  <div style={{ fontSize: 'clamp(22px, 2vw, 32px)', fontWeight: 700, color: 'var(--accent-gold)', marginBottom: '6px' }}>
                    {item.year}
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                    {item.label}
                  </h3>
                  <p className="t-body" style={{ fontSize: '14px', margin: 0, lineHeight: 1.65 }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 02 — WHAT WE DO ───────────────────────────────────────────────────── */}
      <section className="section-py" style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--line-soft)' }}>
        <div className="site-container">
          <div className="section-label">
            <span className="section-label-bullet" />
            <span className="t-label">02 — WHAT WE DO</span>
          </div>
          <h2 className="t-headline" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', marginBottom: '36px', textWrap: 'balance' }}>
            Complete Electrical{' '}
            <span style={{ color: 'var(--accent-gold)' }}>Scope of Work</span>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))', gap: '2px', background: 'var(--line)', border: '1px solid var(--line)' }}>
            {[
              {
                title: 'Turnkey Project Execution',
                desc: 'Complete Supply, Installation, Testing and Commissioning (SITC) of high-voltage and low-voltage electrical works under single-point accountability.'
              },
              {
                title: 'Electrical Equipment Supply',
                desc: 'Supply of transformers, MV/LV switchgear, PCC, MCC, APFC capacitor banks, bus ducts, cables, and distribution boards from verified manufacturers.'
              },
              {
                title: 'Substation Projects (up to 220KV)',
                desc: 'Site design, foundation casting, transformer yard erection, control room construction, VCB integration, and grid energisation.'
              },
              {
                title: 'Transmission Lines (up to 400KV)',
                desc: 'Tower foundation casting, lattice tower structural erection, hardware fitting, and precision conductor stringing across 11KV to 400KV.'
              },
              {
                title: 'Underground Cable Systems (up to 66KV)',
                desc: 'Route surveying, trenching, bedding, HDPE ducting, laying, certified jointing, and routine maintenance of underground cables up to 66KV.'
              },
              {
                title: 'Industrial & Warehouse Electrification',
                desc: 'Complete plant electrification, motor control centres, high-bay lighting, external yard high-masts, and earthing protection.'
              },
              {
                title: 'Testing & Pre-Commissioning',
                desc: 'High-voltage insulation resistance testing, secondary injection relay calibration, VCB timing validation, and statutory utility clearances.'
              },
              {
                title: 'Routine Electrical Maintenance',
                desc: 'Dedicated maintenance teams for routine upkeep, scheduled preventative shutdowns, transformer oil filtration, and breaker overhauls.'
              },
            ].map((item, idx) => (
              <div key={item.title} style={{ padding: '32px 28px', background: 'var(--bg-light)' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--accent-gold)', marginBottom: '12px', letterSpacing: '0.14em' }}>
                  0{idx + 1} — {item.title}
                </div>
                <p className="t-body" style={{ fontSize: '13.5px', margin: 0, lineHeight: 1.65 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03 — WHERE WE WORK ─────────────────────────────────────────────────── */}
      <section className="section-py" style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--line-soft)' }}>
        <div className="site-container">
          <div className="two-col" style={{ alignItems: 'start' }}>
            <div>
              <div className="section-label">
                <span className="section-label-bullet" />
                <span className="t-label">03 — WHERE WE WORK</span>
              </div>
              <h2 className="t-headline" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', marginBottom: '24px', textWrap: 'balance' }}>
                Government &amp; Private{' '}
                <span style={{ color: 'var(--accent-gold)' }}>Sector Projects</span>
              </h2>
              <p className="t-body" style={{ maxWidth: '480px', marginBottom: '24px', lineHeight: 1.7 }}>
                LDS undertakes turnkey projects in both Government and Private sectors across India. We deliver code-compliant infrastructure tailored to critical operational environments.
              </p>
            </div>

            <div>
              <div className="section-label">
                <span className="section-label-bullet" />
                <span className="t-label">Sector Specializations</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '16px' }}>
                {[
                  { sector: 'Government & Public Projects', examples: 'State legislative complexes, public infrastructure, and administrative campuses.' },
                  { sector: 'Healthcare & Medical Colleges', examples: 'Medical colleges, hospital wards, research laboratories, and emergency AMF synchronization.' },
                  { sector: 'Commercial Electrical Work', examples: 'Hotels, commercial complexes, retail hubs, and corporate infrastructure.' },
                  { sector: 'Industrial & Warehouses', examples: 'Manufacturing facilities, process plants, logistics parks, and distribution depots.' },
                  { sector: 'Housing & Townships', examples: 'Residential developments, township electrification, and underground distribution loops.' },
                ].map((s) => (
                  <div key={s.sector} style={{ padding: '20px 22px', border: '1px solid var(--line-soft)', background: 'var(--bg-light)' }}>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
                      {s.sector}
                    </div>
                    <p className="t-body" style={{ fontSize: '12.5px', margin: 0, lineHeight: 1.5 }}>
                      {s.examples}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 04 — HOW WE WORK ──────────────────────────────────────────────────── */}
      <section className="section-py" style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--line-soft)' }}>
        <div className="site-container">
          <div className="section-label">
            <span className="section-label-bullet" />
            <span className="t-label">04 — HOW WE WORK</span>
          </div>
          <h2 className="t-headline" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', marginBottom: '36px', textWrap: 'balance' }}>
            Structured Execution from{' '}
            <span style={{ color: 'var(--accent-gold)' }}>Design to Handover</span>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '20px' }}>
            {[
              { step: '01', title: 'Design & Engineering', desc: 'Single-line diagrams, load calculation reviews, and technical layout planning.' },
              { step: '02', title: 'Equipment Procurement', desc: 'Spec-compliant transformers, switchgear, panels, and cables from verified supply chains.' },
              { step: '03', title: 'On-Site Installation', desc: 'Structural works, cable laying in concrete trenches, panel erection, and earthing grids.' },
              { step: '04', title: 'Testing & Verification', desc: 'Insulation resistance audits, relay calibration, VCB timing, and safety interlocking checks.' },
              { step: '05', title: 'Commissioning & Handover', desc: 'Grid energisation, load trials, statutory authority clearances, and complete documentation.' },
            ].map((st) => (
              <div key={st.step} style={{ padding: '24px 20px', border: '1px solid var(--line-soft)', background: 'var(--bg-light)' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--accent-gold)', marginBottom: '10px', letterSpacing: '0.12em' }}>
                  STEP {st.step}
                </div>
                <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                  {st.title}
                </h3>
                <p className="t-body" style={{ fontSize: '13px', margin: 0, lineHeight: 1.6 }}>
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 05 — WHY CLIENTS CHOOSE LDS ───────────────────────────────────────── */}
      <section className="section-py" style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--line-soft)' }}>
        <div className="site-container">
          <div className="section-label">
            <span className="section-label-bullet" />
            <span className="t-label">05 — WHY CLIENTS CHOOSE LDS</span>
          </div>
          <h2 className="t-headline" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', marginBottom: '36px', textWrap: 'balance' }}>
            Experience, Capability &amp;{' '}
            <span style={{ color: 'var(--accent-gold)' }}>Single-Point Accountability</span>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '20px' }}>
            {[
              {
                title: 'Established Industry Experience',
                desc: 'Serving the electrical industry since 1997, with dedicated turnkey contracting experience since 2007.'
              },
              {
                title: 'High-Voltage Execution Capability',
                desc: 'Proven technical capacity across 66KV underground cabling, 220KV substations, and 400KV transmission lines.'
              },
              {
                title: 'Verified Manufacturer Relationships',
                desc: 'Authorized Super Stockist of HPL, Lucy Electric, Huphen; System House of L&T; and JVs with CG Power & Areva T&D.'
              },
              {
                title: 'Fast-Track Project Delivery',
                desc: 'Demonstrated rapid execution, including the 2 × 3.15 MVA complete substation at Kohora, Assam in 100 working days.'
              },
              {
                title: 'Routine Maintenance & Support',
                desc: 'Dedicated in-house teams providing routine maintenance, transformer oil filtration, and lifecycle support after commissioning.'
              },
              {
                title: 'Government & Private Track Record',
                desc: 'Trusted by major private developers and public institutions for critical, high-reliability electrical infrastructure.'
              }
            ].map((w, idx) => (
              <div key={idx} style={{ padding: '28px 24px', border: '1px solid var(--line-soft)', background: 'var(--bg-light)' }}>
                <div style={{ width: '24px', height: '2px', background: 'var(--accent-gold)', marginBottom: '14px' }} />
                <h3 style={{ fontSize: '15.5px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                  {w.title}
                </h3>
                <p className="t-body" style={{ fontSize: '13px', margin: 0, lineHeight: 1.65 }}>
                  {w.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 06 — LEADERSHIP (WITH REAL PHOTOGRAPHY) ───────────────────────────── */}
      <section id="leadership" className="section-py" style={{ background: 'var(--bg-secondary)' }}>
        <div className="site-container">
          <div className="section-label">
            <span className="section-label-bullet" />
            <span className="t-label">06 — LEADERSHIP</span>
          </div>
          <h2 className="t-headline" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', marginBottom: '40px', textWrap: 'balance' }}>
            Leadership Behind{' '}
            <span style={{ color: 'var(--accent-gold)' }}>Lukhdatar &amp; Sons</span>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '32px' }}>
            {LEADERSHIP.map((leader) => (
              <div key={leader.id} style={{ display: 'flex', flexDirection: 'column', gap: '20px', border: '1px solid var(--line-soft)', padding: '24px', background: 'var(--bg-light)' }}>
                <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden', background: 'var(--surface)' }}>
                  <Image
                    src={leader.imageKey === 'founder' ? '/media/founder-lalit.png' : '/media/md-shree.png'}
                    alt={leader.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    style={{ objectFit: 'cover', objectPosition: 'top center' }}
                  />
                </div>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>{leader.name}</div>
                  <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--accent-gold)', letterSpacing: '0.10em', textTransform: 'uppercase', marginTop: '4px', marginBottom: '12px' }}>
                    {leader.id === 'md' ? leader.title : `${leader.title} · Since ${leader.since}`}
                  </div>
                  <p className="t-body" style={{ fontSize: '13.5px', lineHeight: 1.65, margin: 0 }}>
                    {leader.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
