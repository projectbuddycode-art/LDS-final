'use client'

import PageLayout from '@/components/layout/PageLayout'
import Link from 'next/link'
import BackNav from '@/components/navigation/BackNav'
import { SERVICES_20 } from '@/data/content'
import { openQuoteModal } from '@/lib/quoteEvents'

export default function CapabilitiesPage() {
  return (
    <PageLayout>
      {/* ── Hero Section ──────────────────────────────────────────────────────── */}
      <section className="section-py" style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--line-soft)', marginTop: '72px' }}>
        <div className="site-container">
          <BackNav fallbackHref="/" label="Home" />
          <div className="section-label">
            <span className="section-label-bullet" />
            <span className="t-label">OUR SERVICES</span>
          </div>
          <h1 className="t-headline" style={{ marginBottom: '24px', fontSize: 'clamp(36px, 5vw, 72px)', lineHeight: 1.05, textWrap: 'balance' }}>
            OUR ELECTRICAL{' '}
            <span style={{ color: 'var(--accent-gold)' }}>SERVICES</span>
          </h1>
          <p className="t-body" style={{ maxWidth: '680px', fontSize: 'clamp(16px, 1.2vw, 20px)', lineHeight: 1.6 }}>
            Complete electrical solutions from design and equipment supply to installation, testing, commissioning and maintenance.
          </p>
        </div>
      </section>

      {/* ── Key Service Focus Sections (Sections 9, 10, 11, 12) ────────────────── */}
      
      {/* 01 — Turnkey & Industrial Electrification */}
      <section className="section-py" style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--line-soft)' }}>
        <div className="site-container">
          <div className="two-col" style={{ alignItems: 'start' }}>
            <div>
              <div className="section-label">
                <span className="section-label-bullet" />
                <span className="t-label">01 — INDUSTRIAL ELECTRIFICATION</span>
              </div>
              <h2 className="t-headline" style={{ fontSize: 'clamp(26px, 3.2vw, 40px)', marginBottom: '20px', textWrap: 'balance' }}>
                INDUSTRIAL{' '}
                <span style={{ color: 'var(--accent-gold)' }}>ELECTRIFICATION</span>
              </h2>
              <p className="t-body" style={{ maxWidth: '480px', marginBottom: '24px', lineHeight: 1.65 }}>
                We provide turnkey electrical solutions for industries, process plants and warehouses, including design and engineering.
              </p>
              <div style={{ marginTop: '24px' }}>
                <button
                  onClick={() => openQuoteModal('Industrial Electrification')}
                  className="cta-btn cta-btn-primary"
                  style={{ cursor: 'pointer', fontFamily: 'inherit' }}
                >
                  Send Inquiry for Industrial Scope ↗
                </button>
              </div>
            </div>

            <div className="col-border-responsive" style={{ borderLeft: '1px solid var(--line-soft)', paddingLeft: 'clamp(20px, 3vw, 48px)' }}>
              <div className="section-label" style={{ marginBottom: '16px' }}>
                <span className="t-label">Scope Deliverables</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '14px' }}>
                {[
                  'Electrical Design & Engineering',
                  'HT/LT Distribution Networks',
                  'Power Cabling & Cable Trays',
                  'MCC & PCC Panel Boards',
                  'High-Bay & Plant Lighting',
                  'Equipment Supply & Installation',
                  'Testing & Pre-Commissioning',
                  'Commissioning & Handover'
                ].map((item, idx) => (
                  <div key={idx} style={{ padding: '14px 16px', background: 'var(--bg-primary)', border: '1px solid var(--line-soft)', fontSize: '13px', fontWeight: 500 }}>
                    <span style={{ color: 'var(--accent-gold)', marginRight: '8px' }}>•</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — Underground Cable Systems */}
      <section className="section-py" style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--line-soft)' }}>
        <div className="site-container">
          <div className="two-col" style={{ alignItems: 'start' }}>
            <div>
              <div className="section-label">
                <span className="section-label-bullet" />
                <span className="t-label">02 — UNDERGROUND CABLE SYSTEMS</span>
              </div>
              <h2 className="t-headline" style={{ fontSize: 'clamp(26px, 3.2vw, 40px)', marginBottom: '20px', textWrap: 'balance' }}>
                UNDERGROUND{' '}
                <span style={{ color: 'var(--accent-gold)' }}>CABLE SYSTEMS</span>
              </h2>
              <p className="t-body" style={{ maxWidth: '480px', marginBottom: '24px', lineHeight: 1.65 }}>
                Underground cable laying services up to 66KV.
              </p>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '12px',
                padding: '12px 20px', border: '1px solid var(--line-gold)',
                background: 'var(--bg-secondary)', marginBottom: '24px',
              }}>
                <span style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)' }}>66KV</span>
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.10em' }}>
                  Underground Cabling Capacity
                </span>
              </div>
            </div>

            <div className="col-border-responsive" style={{ borderLeft: '1px solid var(--line-soft)', paddingLeft: 'clamp(20px, 3vw, 48px)' }}>
              <div className="section-label" style={{ marginBottom: '16px' }}>
                <span className="t-label">Cabling Services</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { name: 'Supply', detail: 'Spec-compliant HT/LT XLPE armored copper & aluminum power cables.' },
                  { name: 'Laying', detail: 'Route surveying, trench excavation, bedding, and HDPE duct insertion.' },
                  { name: 'Repair', detail: 'Precision fault localization, core splicing, and joint box replacements.' },
                  { name: 'Maintenance', detail: 'Periodic sheath integrity testing, thermography, and insulation audits.' },
                  { name: 'Replacement', detail: 'Upgrades and retrofits of legacy underground power circuits.' }
                ].map((s, idx) => (
                  <div key={s.name} style={{ padding: '14px 18px', background: 'var(--bg-secondary)', border: '1px solid var(--line-soft)' }}>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                      <span style={{ color: 'var(--accent-gold)', marginRight: '8px' }}>0{idx + 1}.</span>
                      {s.name}
                    </div>
                    <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                      {s.detail}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — Substation & Switchyard Services */}
      <section className="section-py" style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--line-soft)' }}>
        <div className="site-container">
          <div className="two-col" style={{ alignItems: 'start' }}>
            <div>
              <div className="section-label">
                <span className="section-label-bullet" />
                <span className="t-label">03 — SUBSTATION &amp; SWITCHYARD SERVICES</span>
              </div>
              <h2 className="t-headline" style={{ fontSize: 'clamp(26px, 3.2vw, 40px)', marginBottom: '20px', textWrap: 'balance' }}>
                SUBSTATION &amp;{' '}
                <span style={{ color: 'var(--accent-gold)' }}>SWITCHYARD SERVICES</span>
              </h2>
              <p className="t-body" style={{ maxWidth: '480px', marginBottom: '24px', lineHeight: 1.65 }}>
                Substation and switchyard services up to 220KV, including engineering, procurement, construction, testing and commissioning.
              </p>
              <div style={{ padding: '16px 20px', border: '1px solid var(--line-gold)', background: 'var(--bg-light)', marginBottom: '24px', maxWidth: '480px' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '4px' }}>
                  Milestone Execution
                </div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Kohora, Assam 2 × 3.15 MVA Substation
                </div>
                <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Control room and 9 VCB panels completed in 100 working days.
                </div>
              </div>
            </div>

            <div className="col-border-responsive" style={{ borderLeft: '1px solid var(--line-soft)', paddingLeft: 'clamp(20px, 3vw, 48px)' }}>
              <div className="section-label" style={{ marginBottom: '16px' }}>
                <span className="t-label">Technical Disciplines</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '12px' }}>
                {[
                  'Site Design & Surveying',
                  'Foundation Design & Civil Works',
                  'Substation Layout Design',
                  'Earth Mat Design & Grounding',
                  'Protection & Control Engineering',
                  'SCADA System Design',
                  'GIS & Open-Air (AIS) Design',
                  'Capacitor Bank Design',
                  'Automation & Integration',
                  'Testing & Grid Commissioning',
                ].map((disc, idx) => (
                  <div key={idx} style={{ padding: '14px 16px', background: 'var(--bg-primary)', border: '1px solid var(--line-soft)', fontSize: '13px', fontWeight: 500 }}>
                    <span style={{ color: 'var(--accent-gold)', marginRight: '8px' }}>•</span>
                    {disc}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — Transmission Line Services */}
      <section className="section-py" style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--line-soft)' }}>
        <div className="site-container">
          <div className="two-col" style={{ alignItems: 'start' }}>
            <div>
              <div className="section-label">
                <span className="section-label-bullet" />
                <span className="t-label">04 — TRANSMISSION LINES</span>
              </div>
              <h2 className="t-headline" style={{ fontSize: 'clamp(26px, 3.2vw, 40px)', marginBottom: '20px', textWrap: 'balance' }}>
                TRANSMISSION{' '}
                <span style={{ color: 'var(--accent-gold)' }}>LINES</span>
              </h2>
              <p className="t-body" style={{ maxWidth: '480px', marginBottom: '24px', lineHeight: 1.65 }}>
                Supply, installation, testing and commissioning of overhead transmission lines.
              </p>
            </div>

            <div className="col-border-responsive" style={{ borderLeft: '1px solid var(--line-soft)', paddingLeft: 'clamp(20px, 3vw, 48px)' }}>
              <div className="section-label" style={{ marginBottom: '16px' }}>
                <span className="t-label">Verified Voltage Levels</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 110px), 1fr))', gap: '14px' }}>
                {['11KV', '33KV', '66KV', '132KV', '220KV', '400KV'].map((v) => (
                  <div key={v} style={{ padding: '20px 16px', background: 'var(--bg-secondary)', border: '1px solid var(--line-soft)', textAlign: 'center' }}>
                    <div style={{ fontSize: 'clamp(20px, 2vw, 28px)', fontWeight: 700, color: 'var(--accent-gold)' }}>
                      {v}
                    </div>
                    <div style={{ fontSize: '10.5px', fontWeight: 500, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.10em', marginTop: '4px' }}>
                      Transmission Line
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Complete 20 Electrical Services Matrix ─────────────────────────────── */}
      <section className="section-py" style={{ background: 'var(--bg-secondary)' }}>
        <div className="site-container">
          <div className="section-label">
            <span className="section-label-bullet" />
            <span className="t-label">COMPLETE SERVICE DIRECTORY</span>
          </div>
          <h2 className="t-headline" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', marginBottom: '40px', textWrap: 'balance' }}>
            All 20 In-House &amp; Turnkey{' '}
            <span style={{ color: 'var(--accent-gold)' }}>Electrical Services</span>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: '2px', background: 'var(--line)', border: '1px solid var(--line)' }}>
            {SERVICES_20.map((service) => (
              <div key={service.number} style={{ padding: '36px 30px', background: 'var(--bg-light)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '220px' }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--accent-gold)', letterSpacing: '0.14em', marginBottom: '12px' }}>
                    SERVICE {service.number}
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '10px', letterSpacing: '-0.01em' }}>
                    {service.title}
                  </h3>
                  <p className="t-body" style={{ fontSize: '13px', lineHeight: 1.6, margin: 0 }}>
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <button
              onClick={() => openQuoteModal('General Electrical Services')}
              className="cta-btn cta-btn-primary"
              style={{ padding: '14px 32px', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              Send Inquiry for Electrical Services ↗
            </button>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
