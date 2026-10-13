'use client'

import { useState, useEffect } from 'react'
import { useLenis } from '@/lib/lenis'

// Layout
import Header from '@/components/navigation/Header'
import Footer from '@/components/footer/Footer'

// Sections — in approved page flow order
import IntroSequence from '@/components/intro/IntroSequence'
import Hero from '@/components/hero/Hero'
import LeadershipSection from '@/components/leadership/LeadershipSection'
import EcosystemSection from '@/components/ecosystem/EcosystemSection'
import UndergroundCableSection from '@/components/cable-systems/UndergroundCableSection'
import CapabilitySection from '@/components/capability/CapabilitySection'
import TurnkeySection from '@/components/turnkey/TurnkeySection'
import EquipmentSection from '@/components/equipment/EquipmentSection'
import TransmissionSection from '@/components/transmission/TransmissionSection'
import ProjectPortfolio from '@/components/portfolio/ProjectPortfolio'
import BeyondCommissioning from '@/components/commissioning/BeyondCommissioning'
import IndustriesSection from '@/components/industries/IndustriesSection'
import AccountabilitySection from '@/components/accountability/AccountabilitySection'
import FinalCTA from '@/components/cta/FinalCTA'

// LDS Engineering Assist chatbot & Quote Modal
import LDSChatbot from '@/components/chatbot/LDSChatbot'
import QuoteModal from '@/components/quote/QuoteModal'
import SectionErrorBoundary from '@/components/ErrorBoundary'

export default function LDSWebsite() {
  const [introComplete, setIntroComplete] = useState(false)

  // Initialize Lenis smooth scroll (only after intro)
  useLenis()

  // Lock scroll during intro, restore once complete
  useEffect(() => {
    if (introComplete) {
      document.body.style.overflow = ''
    } else {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [introComplete])

  return (
    <>
      {/* Intro overlay (fixed, above everything) */}
      {!introComplete && (
        <IntroSequence onComplete={() => setIntroComplete(true)} />
      )}

      {/* Main website — mounted immediately behind intro */}
      <div style={{
        opacity: 1,
        pointerEvents: introComplete ? 'all' : 'none',
      }}>
        <Header />

        <main>
          {/* ─ 01 Hero ──────────────────── */}
          <SectionErrorBoundary name="Hero">
            <Hero />
          </SectionErrorBoundary>

          {/* ─ 02 Founder / Leadership ─── */}
          <SectionErrorBoundary name="Leadership">
            <LeadershipSection />
          </SectionErrorBoundary>

          {/* ─ 03 Industry Ecosystem ────── */}
          <SectionErrorBoundary name="Ecosystem">
            <EcosystemSection />
          </SectionErrorBoundary>

          {/* ─ 04 Underground Cable ──────── */}
          <SectionErrorBoundary name="Underground Cable">
            <UndergroundCableSection />
          </SectionErrorBoundary>

          {/* ─ 05 Capability ─────────────── */}
          <SectionErrorBoundary name="Capabilities">
            <CapabilitySection />
          </SectionErrorBoundary>

          {/* ─ 06 Turnkey Electrification ── */}
          <SectionErrorBoundary name="Turnkey Electrification">
            <TurnkeySection />
          </SectionErrorBoundary>

          {/* ─ 07 Equipment Range ─────────── */}
          <SectionErrorBoundary name="Equipment">
            <EquipmentSection />
          </SectionErrorBoundary>

          {/* ─ 08 Substations ─────────────── */}
          <SectionErrorBoundary name="Transmission">
            <TransmissionSection />
          </SectionErrorBoundary>

          {/* ─ 09 Project Portfolio ──────── */}
          <SectionErrorBoundary name="Projects">
            <ProjectPortfolio />
          </SectionErrorBoundary>

          {/* ─ 10 Beyond Commissioning ────── */}
          <SectionErrorBoundary name="Beyond Commissioning">
            <BeyondCommissioning />
          </SectionErrorBoundary>

          {/* ─ 11 Industries ─────────────── */}
          <SectionErrorBoundary name="Industries">
            <IndustriesSection />
          </SectionErrorBoundary>

          {/* ─ 12 Built with Accountability ─ */}
          <SectionErrorBoundary name="Accountability">
            <AccountabilitySection />
          </SectionErrorBoundary>

          {/* ─ 13 Let's Build ─────────────── */}
          <SectionErrorBoundary name="Final CTA">
            <FinalCTA />
          </SectionErrorBoundary>
        </main>

        <Footer />

        {/* ─ LDS Engineering Assist ─────── */}
        {/* Rendered outside main so it floats above all sections */}
        <SectionErrorBoundary name="Chatbot">
          <LDSChatbot />
        </SectionErrorBoundary>

        {/* ─ LDS Unified Quote Modal ─────── */}
        <SectionErrorBoundary name="Quote Form">
          <QuoteModal />
        </SectionErrorBoundary>
      </div>
    </>
  )
}
