'use client'

import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { COMPANY } from '@/data/content'
import { isNotificationAccepted } from '@/lib/inquiry'
import { openQuoteModal } from '@/lib/quoteEvents'

// ─────────────────────────────────────────────────────────────────────────────
// LDS FACTUAL KNOWLEDGE REPOSITORY (STRICTLY GROUNDED IN LDS PROSPECTUS)
// ─────────────────────────────────────────────────────────────────────────────
interface KnowledgeTopic {
  keywords: string[]
  response: string
  actions?: string[]
  scrollTo?: string
  navigateUrl?: string
  isExternalLink?: boolean
}

const KNOWLEDGE_TOPICS: KnowledgeTopic[] = [
  // 1. GREETINGS & INTRODUCTIONS
  {
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings', 'who are you', 'what is this'],
    response: `Hello! I am **Ask LDS Bot**, the official assistant for **Lukhdatar & Sons (LDS)**.

We provide complete electrical solutions from design and equipment supply to installation, testing, commissioning and maintenance. I can assist you with:

• **Our Electrical Services** (Turnkey SITC, Industrial & Warehouse Electrification)
• **Substations & Switchyards** (Engineering & SITC up to 220KV)
• **Overhead Transmission Lines** (11KV, 33KV, 66KV, 132KV, 220KV, 400KV)
• **Underground Cable Systems** (Laying, jointing & maintenance up to 66KV)
• **Products & Equipment** (Transformers, Switchgear, PCC, MCC, APFC & Bus Ducts)
• **Project Highlights** (Kohora Substation, Taj Hotels, Medical Colleges)
• **Company Catalog Download & Direct Quotes**

Would you like us to send your requirement to the LDS team?`,
    actions: ['SEND INQUIRY', 'OUR SERVICES', 'PRODUCTS & EQUIPMENT', 'PROJECTS', 'DOWNLOAD CATALOG'],
  },

  // 2. COMPANY BACKGROUND & HISTORY
  {
    keywords: ['about', 'company background', 'who is lds', 'what is lds', 'lukhdatar', 'overview', 'profile', 'history', 'founded', 'established', 'heritage', 'journey'],
    response: `**Lukhdatar & Sons (LDS)** has been serving the electrical industry since 1997.

• **1997**: Formed in Kolkata by **Mr. Lalit Kumar Sureka** as an electrical goods supplier.
• **2007**: Expanded into **Turnkey Electrical Contracting**.
• **2013**: **Mr. Shree Mangalam Sureka** joined Lukhdatar & Sons. As the current owner of the company, he oversees project delivery.
• **Present**: LDS undertakes turnkey electrical projects in both **Government and Private sectors**, delivering commercial, housing, industrial, public, and substation projects.

From supplying electrical equipment to executing complete turnkey electrical projects, LDS has grown through experience, customer relationships, technical capability and project execution.

Would you like us to send your requirement to the LDS team?`,
    scrollTo: '#company',
    actions: ['SEND INQUIRY', 'OUR SERVICES', 'PROJECTS', 'DOWNLOAD CATALOG'],
  },

  {
    keywords: ['leadership', 'director', 'managing director', 'md', 'founder', 'management', 'shree mangalam', 'lalit kumar', 'sureka'],
    response: `**Leadership at Lukhdatar & Sons:**

• **Mr. Lalit Kumar Sureka (Founder)**: Formed LDS in Kolkata in 1997 as an electrical goods supplier, establishing direct manufacturer distribution channels and high standards of electrical equipment supply.
• **Mr. Shree Mangalam Sureka (Current Owner)**: Joined Lukhdatar & Sons in 2013. As the current owner of the company, he oversees project delivery.

Would you like us to send your requirement to the LDS team?`,
    scrollTo: '#company',
    actions: ['SEND INQUIRY', 'OUR SERVICES', 'DOWNLOAD CATALOG'],
  },

  // 3. TURNKEY ELECTRICAL SERVICES
  {
    keywords: ['service', 'services', 'turnkey', 'sitc', 'what is sitc', 'electrical work', 'contracting', 'what do you do', 'in house'],
    response: `**Our Electrical Services**

LDS provides complete electrical solutions from design and equipment supply to installation, testing, commissioning and maintenance.

**Key In-House & Contracted Services:**
1. Turnkey Electrical Projects (Government & Private sectors)
2. Industrial Electrification & Warehouse Electrification
3. Substation & Switchyard Services (up to 220KV)
4. Transmission Line Services (up to 400KV)
5. Underground Cable Laying (up to 66KV)
6. HT & LT Electrical Distribution
7. Internal & External Electrification
8. Lighting Systems (Normal, Emergency, High Mast, Aviation)
9. Earthing & Lightning Protection
10. Electrical Panels & Control Systems (PCC, MCC, APFC, AMF)
11. Equipment Supply & Installation
12. Testing & Commissioning
13. Routine Electrical Maintenance
14. Fabrication & Erection of Cable Trays, Ducts & Towers
15. UPS / Power Systems, Public Address, Fire Detection & Cabling

Would you like us to send your requirement to the LDS team?`,
    actions: ['SEND INQUIRY', 'PRODUCTS & EQUIPMENT', 'PROJECTS', 'DOWNLOAD CATALOG'],
  },

  // 4. SUBSTATION & SWITCHYARD SERVICES
  {
    keywords: ['substation', 'switchyard', '220kv', '132kv', '66kv', '33kv', '11kv', 'vcb', 'gantry', 'scada', 'gis', 'transformer yard'],
    response: `**Substation & Switchyard Services (up to 220KV)**

LDS provides complete substation and switchyard services including engineering, procurement, construction, testing and commissioning:

• Site design & foundation design
• Substation design & earth mat design
• Protection & control systems
• SCADA system design & automation integration
• GIS and open-air design
• Capacitor bank design
• Testing & commissioning

**Verified Experience Highlight:**
LDS commissioned a complete 2 x 3.15 MVA substation with control room and 9 VCB panels at **Kohora, Assam** in just 100 working days.

Would you like us to send your requirement to the LDS team?`,
    scrollTo: '#turnkey',
    actions: ['SEND INQUIRY', 'PROJECTS', 'PRODUCTS & EQUIPMENT'],
  },

  // 5. TRANSMISSION LINES
  {
    keywords: ['transmission', 'transmission line', 'overhead line', 'tower', '400kv', 'conductor', 'tower erection', 'sagging', 'stringing'],
    response: `**Transmission Line Services**

LDS undertakes supply, installation, testing and commissioning of overhead transmission lines across verified voltage levels:

• **11KV** & **33KV** Distribution Lines
• **66KV** & **132KV** Regional Transmission Lines
• **220KV** & **400KV** Extra High Voltage (EHV) Transmission Corridors

Services include route surveying, foundation design, tower fabrication & erection, conductor stringing, sagging, insulator disc installation, and statutory utility clearance.

Would you like us to send your requirement to the LDS team?`,
    scrollTo: '#transmission',
    actions: ['SEND INQUIRY', 'OUR SERVICES', 'DOWNLOAD CATALOG'],
  },

  // 6. UNDERGROUND CABLE SYSTEMS
  {
    keywords: ['underground', 'cable', 'cabling', 'trench', 'xlpe', 'jointing', 'cable laying', 'cable repair', '66kv cable'],
    response: `**Underground Cable Systems (up to 66KV)**

LDS provides underground cable laying services up to 66KV:

• **Supply**: High-grade XLPE insulated cables with manufacturer test certifications
• **Laying**: Direct buried, concrete trenching, HDD (Horizontal Directional Drilling) and conduit routing
• **Repair & Splicing**: Certified straight-through jointing and end terminations
• **Maintenance**: Route inspection, sheath fault testing, and thermal hot-spot auditing
• **Replacement**: Seamless changeover of degraded underground feeders without industrial downtime

Would you like us to send your requirement to the LDS team?`,
    scrollTo: '#cable-systems',
    actions: ['SEND INQUIRY', 'OUR SERVICES', 'DOWNLOAD CATALOG'],
  },

  // 7. INDUSTRIAL & WAREHOUSE ELECTRIFICATION
  {
    keywords: ['industrial', 'factory', 'plant', 'manufacturing', 'warehouse', 'logistics', 'process plant'],
    response: `**Industrial & Warehouse Electrification**

LDS provides turnkey electrical solutions for industries, process plants and warehouses, including design and engineering:

• Complete electrical design & HT/LT distribution network
• Industrial power cabling & heavy-duty cable tray networks
• Power Control Centres (PCC) & Motor Control Centres (MCC)
• Plant lighting, high-bay warehouse luminaires, and emergency lighting
• DG synchronising panels installation
• Full pre-commissioning testing, energisation and maintenance

Would you like us to send your requirement to the LDS team?`,
    scrollTo: '#capability',
    actions: ['SEND INQUIRY', 'PROJECTS', 'DOWNLOAD CATALOG'],
  },

  // 8. PRODUCTS & EQUIPMENT
  {
    keywords: ['equipment', 'product', 'products', 'panel', 'switchgear', 'transformer', 'pcc', 'mcc', 'apfc', 'bus duct', 'feeder pillar', 'distribution board'],
    response: `**Products & Equipment Built for Reliable Performance**

LDS supplies and installs spec-compliant electrical equipment across major categories:

1. **Transformers**: Power & distribution transformers
2. **LV / MV Switchgear**: Vacuum circuit breakers (VCB) & load break switches
3. **Power Control Centres (PCC)**: High-capacity power distribution boards
4. **Motor Control Centres (MCC)**: Industrial motor control assemblies
5. **Capacitor Panels (APFC)**: Power factor correction & capacitor banks
6. **AMF Panels**: Auto mains failure & generator synchronisation
7. **Instrumentation & Control Panels**: Process automation panels
8. **LT Bus Ducts**: High-current copper/aluminium sandwich bus duct systems
9. **LT Distribution Boards & Feeder Pillars**: Weatherproof distribution boxes
10. **Draw-Out & Non-Draw-Out Switchboards**

Would you like us to send your requirement to the LDS team?`,
    scrollTo: '#equipment',
    actions: ['SEND INQUIRY', 'OUR SERVICES', 'DOWNLOAD CATALOG'],
  },

  // 9. PROJECTS & CASE STUDIES
  {
    keywords: ['project', 'projects', 'case study', 'portfolio', 'taj', 'hospital', 'medical college', 'assam hill', 'sarojini naidu', 'shri krishna', 'sonotel', 'hotel'],
    response: `**Verified Project Highlights**

LDS has delivered major turnkey electrical works across Government and Private sectors:

• **Kohora Substation (Assam)**: 2 x 3.15 MVA Substation with control room and 9 VCB panels completed in **100 working days**.
• **Assam Hill Medical College & Hospital**: Complete institutional HT/LT electrical SITC, distribution networks and hospital power systems.
• **Sarojini Naidu Medical College & Hospital**: High-reliability clinical power distribution and emergency backup infrastructure.
• **Shri Krishna Medical College & Hospital**: Complete healthcare campus electrification.
• **Taj Group of Hotels / Sonotel**: Premium hospitality electrical engineering, bespoke lighting, DG backup and control panels.
• **Warehouse Electrification**: Rapid-deployment electrification for large logistics hubs.

Would you like us to send your requirement to the LDS team?`,
    scrollTo: '#projects',
    actions: ['SEND INQUIRY', 'OUR SERVICES', 'DOWNLOAD CATALOG'],
  },

  // 10. CLIENTS, PARTNERSHIPS & BRAND RELATIONSHIPS
  {
    keywords: ['client', 'clients', 'partner', 'partnerships', 'relationship', 'brands', 'super stockist', 'l&t', 'channel partner', 'cg', 'areva', 'hpl', 'lucy electric', 'huphen'],
    response: `**Trusted Relationships Across the Electrical Industry**

LDS maintains verified authorizations and industry relationships:

• **Super Stockist / Channel Partner**: HPL Electric & Power Ltd, Lucy Electric, Huphen Electromech
• **System House**: Larsen & Toubro Limited (L&T)
• **Joint Ventures**:
  - JV with **Crompton Greaves** for 132KV Substation at Assam
  - JV with **Areva T&D Ltd** for 33/11KV Substation at Asansol

LDS also integrates equipment from leading brands including Schneider Electric, ABB, Legrand, Siemens, Havells, Polycab, Finolex, and Raychem RPG.

Would you like us to send your requirement to the LDS team?`,
    scrollTo: '#ecosystem',
    actions: ['SEND INQUIRY', 'OUR SERVICES', 'DOWNLOAD CATALOG'],
  },

  // 11. TESTING, COMMISSIONING & MAINTENANCE
  {
    keywords: ['testing', 'commissioning', 'maintenance', 'routine maintenance', 'support', 'hipot', 'megger', 'amc', 'repair', 'servicing'],
    response: `**Testing, Commissioning & Maintenance**

LDS delivers end-to-end electrical testing, energisation and lifecycle maintenance:

• **Testing**: Hipot testing, insulation resistance (Megger), relay calibration, contact resistance, earth pit resistance audits
• **Commissioning**: Utility sync, trial energisation, load balancing and handover certification
• **Maintenance**: Dedicated team for routine maintenance of ongoing and completed installations, transformer oil filtration, and switchgear overhaul

Would you like us to send your requirement to the LDS team?`,
    scrollTo: '#commissioning',
    actions: ['SEND INQUIRY', 'OUR SERVICES', 'DOWNLOAD CATALOG'],
  },

  // 12. CONTACT INFORMATION & OFFICES
  {
    keywords: ['contact', 'address', 'office', 'phone', 'email', 'location', 'kolkata', 'reach', 'quote', 'get in touch', 'enquiry'],
    response: `**Contact Lukhdatar & Sons (LDS)**

• **Registered Address**:
  Eight Mandir Street, 4th Floor, Kolkata – 700073, West Bengal, India.

• **Project Office**:
  46C Jawaharlal Nehru Road, Everest House, Office No. 6B, Kolkata – 700071.

• **Official Emails**:
  ${COMPANY.emails[0]}
  ${COMPANY.emails[1]}

• **Contact Persons**:
  Mr. Lalit Kumar Sureka (Founder)
  Mr. Shree Mangalam Sureka (Current Owner)

Would you like to submit your project requirements directly to the LDS team now?`,
    actions: ['SEND INQUIRY', 'DOWNLOAD CATALOG'],
  },
]

// Fallback topic for unverified/unsupported queries
const FALLBACK_TOPIC: KnowledgeTopic = {
  keywords: [],
  response: `I don't have that specific information in the official LDS documentation.

Lukhdatar & Sons is a turnkey electrical infrastructure contractor established in 1997, specializing in substations up to 220KV, transmission lines up to 400KV, underground cabling up to 66KV, industrial electrification, and equipment supply.

Would you like us to collect your project requirement and send it directly to the LDS team for technical confirmation?`,
  actions: ['SEND INQUIRY', 'OUR SERVICES', 'DOWNLOAD CATALOG'],
}

// Core Quick Action Definitions
const CORE_QUICK_ACTIONS = [
  { label: 'SEND INQUIRY',          type: 'quote' },
  { label: 'OUR SERVICES',         type: 'services' },
  { label: 'PRODUCTS & EQUIPMENT', type: 'equipment' },
  { label: 'PROJECTS',             type: 'projects' },
  { label: 'DOWNLOAD CATALOG',     type: 'catalog' },
]

type EnquiryStep = 'idle' | 'mode_select' | 'name' | 'company' | 'phone' | 'email' | 'type' | 'location' | 'requirement' | 'confirm' | 'done'

interface Message {
  role: 'bot' | 'user'
  text: string
  actions?: string[]
  scrollTo?: string
  isFormatted?: boolean
}

// Helper: Formatted text renderer
function FormattedMessage({ text }: { text: string }) {
  const formatted = useMemo(() => {
    const lines = text.split('\n')
    return lines.map((line, i) => {
      let content = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      content = content.replace(/\*(.*?)\*/g, '<em>$1</em>')
      return (
        <span
          key={i}
          style={{ display: 'block', minHeight: line.trim() === '' ? '8px' : 'auto' }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )
    })
  }, [text])

  return <div>{formatted}</div>
}

export default function LDSChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  // Conversational Lead Collection State
  const [enquiryStep, setEnquiryStep] = useState<EnquiryStep>('idle')
  const [enquiryData, setEnquiryData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    type: 'Industrial Electrification',
    location: '',
    requirement: '',
  })

  const scrollRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150)
    }
  }, [isOpen])

  // Strict scroll event isolation to prevent background page scroll chaining
  useEffect(() => {
    const scrollEl = scrollRef.current
    if (!scrollEl || !isOpen) return

    const handleWheel = (e: WheelEvent) => {
      e.stopPropagation()
      const { scrollTop, scrollHeight, clientHeight } = scrollEl
      const isAtTop = scrollTop <= 0
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1
      if ((e.deltaY < 0 && isAtTop) || (e.deltaY > 0 && isAtBottom)) {
        e.preventDefault()
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      e.stopPropagation()
    }

    scrollEl.addEventListener('wheel', handleWheel, { passive: false })
    scrollEl.addEventListener('touchmove', handleTouchMove, { passive: true })

    return () => {
      scrollEl.removeEventListener('wheel', handleWheel)
      scrollEl.removeEventListener('touchmove', handleTouchMove)
    }
  }, [isOpen])

  const downloadCatalog = useCallback(() => {
    const link = document.createElement('a')
    link.href = '/LDS-prospectus.pdf'
    link.download = 'LDS-Company-Catalog.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [])

  const addMessage = useCallback((msg: Message) => {
    setMessages((prev) => [...prev, msg])
  }, [])

  const sendResponse = useCallback((text: string, actions?: string[], scrollTo?: string) => {
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      addMessage({ role: 'bot', text, actions, scrollTo, isFormatted: true })
    }, 350)
  }, [addMessage])

  // Knowledge matching engine
  const matchKnowledgeQuery = (query: string): { text: string; actions?: string[]; scrollTo?: string } => {
    const q = query.toLowerCase().trim()

    for (const topic of KNOWLEDGE_TOPICS) {
      if (topic.keywords.some((k) => q.includes(k.toLowerCase()))) {
        return { text: topic.response, actions: topic.actions, scrollTo: topic.scrollTo }
      }
    }
    return { text: FALLBACK_TOPIC.response, actions: FALLBACK_TOPIC.actions }
  }

  // Submit collected lead to unified backend
  const submitLeadToBackend = async (data: typeof enquiryData) => {
    try {
      const summaryText = `Lead collected via Ask LDS Bot: ${data.name} (${data.company || 'N/A'}) - Project Type: ${data.type}, Location: ${data.location || 'N/A'}. Requirement: ${data.requirement}`
      const log = messages.map(m => `${m.role.toUpperCase()}: ${m.text}`).slice(-8)

      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          company: data.company,
          phone: data.phone,
          email: data.email,
          projectType: data.type,
          location: data.location,
          requirement: data.requirement,
          source: 'Ask LDS Bot',
          conversationSummary: summaryText,
          conversationLog: log,
          idempotencyKey: `bot-${data.email}-${data.phone}-${data.requirement}`.slice(0, 120),
        }),
      })
      const result = await res.json().catch(() => ({}))
      return { ok: res.ok, ...result }
    } catch (err) {
      console.error('[Ask LDS Bot inquiry submission error]')
      return { ok: false, error: 'Network error' }
    }
  }

  // Handle action click
  const handleAction = useCallback(async (action: string) => {
    const actUpper = action.toUpperCase().trim()

    if (actUpper === 'DOWNLOAD CATALOG' || actUpper.includes('CATALOG')) {
      addMessage({ role: 'user', text: 'Download Company Catalog' })
      downloadCatalog()
      sendResponse('Downloading official LDS Company Catalog (PDF)...', ['SEND INQUIRY', 'OUR SERVICES'])
      return
    }

    if (actUpper === 'FILL INQUIRY FORM' || actUpper === 'FILL QUOTE FORM') {
      addMessage({ role: 'user', text: 'Fill Inquiry Form' })
      openQuoteModal(enquiryData.type)
      sendResponse('Opening the LDS inquiry form. You can fill your requirement details directly.', ['CHAT WITH LDS BOT', 'OUR SERVICES'])
      setEnquiryStep('idle')
      return
    }

    if (actUpper === 'CHAT WITH LDS BOT') {
      addMessage({ role: 'user', text: 'Chat with LDS Bot' })
      setEnquiryStep('name')
      sendResponse('Please provide your project details conversationally and our team will get in touch with an itemized quote.\n\nTo begin, may I know your **Name**?')
      return
    }

    if (actUpper === 'SEND INQUIRY' || actUpper === 'START A PROJECT') {
      addMessage({ role: 'user', text: 'Send Inquiry' })
      setEnquiryStep('mode_select')
      sendResponse(
        'Would you prefer to fill our inquiry form or chat step-by-step with Ask LDS Bot to send your requirements to the LDS team?',
        ['FILL INQUIRY FORM', 'CHAT WITH LDS BOT']
      )
      return
    }

    if (actUpper === 'SEND TO LDS TEAM') {
      addMessage({ role: 'user', text: 'Send Inquiry' })
      const result = await submitLeadToBackend(enquiryData)
      setEnquiryStep('done')
      const reference = result.referenceId ? `\n\nInquiry reference: **${result.referenceId}**` : ''
      const confirmationMsg = isNotificationAccepted(result.emailStatus)
        ? `**Thank you for contacting Lukhdatar & Sons.**\n\nResend accepted the notification request. Inbox delivery is not confirmed. Our team will review your requirements and contact you using the details provided.${reference}`
        : `**Your inquiry has been saved.**\n\nWe could not confirm email delivery to the LDS team. Please try again, or contact LDS directly using the published email addresses.${reference}`
      sendResponse(confirmationMsg, ['OUR SERVICES', 'PRODUCTS & EQUIPMENT', 'DOWNLOAD CATALOG'])
      return
    }

    if (actUpper === 'EDIT DETAILS') {
      addMessage({ role: 'user', text: 'Edit Details' })
      setEnquiryStep('name')
      sendResponse('Let\'s update your project details. What is your **Name**?')
      return
    }

    // Quick selection of project types during lead flow
    if (enquiryStep === 'type') {
      setEnquiryData(prev => ({ ...prev, type: action }))
      addMessage({ role: 'user', text: action })
      setEnquiryStep('location')
      sendResponse(`Selected **${action}**.\n\nWhere is the **Project Location** (City / State)?`)
      return
    }

    if (actUpper === 'OUR SERVICES' || actUpper === 'VIEW SERVICES') {
      addMessage({ role: 'user', text: 'Our Services' })
      const res = matchKnowledgeQuery('services')
      sendResponse(res.text, res.actions)
      return
    }

    if (actUpper === 'PRODUCTS & EQUIPMENT' || actUpper === 'VIEW EQUIPMENT') {
      addMessage({ role: 'user', text: 'Products & Equipment' })
      const res = matchKnowledgeQuery('equipment')
      sendResponse(res.text, res.actions)
      return
    }

    if (actUpper === 'PROJECTS' || actUpper === 'VIEW PROJECTS') {
      addMessage({ role: 'user', text: 'Projects & Industries' })
      const res = matchKnowledgeQuery('projects')
      sendResponse(res.text, res.actions)
      return
    }

    addMessage({ role: 'user', text: action })
    const response = matchKnowledgeQuery(action)
    sendResponse(response.text, response.actions, response.scrollTo)
  }, [addMessage, downloadCatalog, sendResponse, enquiryData, enquiryStep])

  // Handle conversational lead input
  const handleEnquiryInput = useCallback((value: string) => {
    if (enquiryStep === 'name') {
      setEnquiryData(prev => ({ ...prev, name: value }))
      setEnquiryStep('company')
      sendResponse(`Thank you, ${value}. Which **Company / Organisation** are you from?`)
      return
    }

    if (enquiryStep === 'company') {
      setEnquiryData(prev => ({ ...prev, company: value }))
      setEnquiryStep('phone')
      sendResponse('What is your **Phone Number**?')
      return
    }

    if (enquiryStep === 'phone') {
      setEnquiryData(prev => ({ ...prev, phone: value }))
      setEnquiryStep('email')
      sendResponse('What is your **Email Address**?')
      return
    }

    if (enquiryStep === 'email') {
      setEnquiryData(prev => ({ ...prev, email: value }))
      setEnquiryStep('type')
      sendResponse(
        'What type of project do you need help with?',
        ['Industrial Electrification', 'Substation / Switchyard', 'Transmission Lines', 'Underground Cable Work', 'Warehouse Electrification', 'Electrical Equipment Supply', 'Other']
      )
      return
    }

    if (enquiryStep === 'type') {
      setEnquiryData(prev => ({ ...prev, type: value }))
      setEnquiryStep('location')
      sendResponse('Where is the **Project Location** (City / State)?')
      return
    }

    if (enquiryStep === 'location') {
      setEnquiryData(prev => ({ ...prev, location: value }))
      setEnquiryStep('requirement')
      sendResponse('Please briefly tell me what you need (estimated scope, equipment, voltage rating, or timeline).')
      return
    }

    if (enquiryStep === 'requirement') {
      const updated = { ...enquiryData, requirement: value }
      setEnquiryData(updated)
      setEnquiryStep('confirm')
      const preview = `Thanks. I have your requirement:\n\n• **Name**: ${updated.name}\n• **Company**: ${updated.company || 'N/A'}\n• **Phone**: ${updated.phone}\n• **Email**: ${updated.email}\n• **Project Type**: ${updated.type}\n• **Location**: ${updated.location || 'N/A'}\n• **Requirement**: ${value}\n\nShall I send these details to the LDS team?`
      sendResponse(preview, ['SEND TO LDS TEAM', 'EDIT DETAILS'])
      return
    }
  }, [enquiryStep, enquiryData, sendResponse])

  const handleSubmit = useCallback((e?: React.FormEvent) => {
    e?.preventDefault()
    const value = inputValue.trim()
    if (!value) return

    addMessage({ role: 'user', text: value })
    setInputValue('')

    if (enquiryStep !== 'idle' && enquiryStep !== 'done' && enquiryStep !== 'confirm') {
      handleEnquiryInput(value)
      return
    }

    const response = matchKnowledgeQuery(value)
    sendResponse(response.text, response.actions, response.scrollTo)
  }, [inputValue, enquiryStep, addMessage, handleEnquiryInput, sendResponse])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <>
      {/* Floating trigger button */}
      <div
        className="ask-lds-trigger-container"
        style={{
          position: 'fixed',
          bottom: 'calc(24px + env(safe-area-inset-bottom, 0px))',
          right: 'calc(24px + env(safe-area-inset-right, 0px))',
          zIndex: 9000,
        }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close Ask LDS Bot' : 'Open Ask LDS Bot'}
          aria-expanded={isOpen}
          className="ask-lds-trigger-btn"
        >
          <span className="ask-lds-dot" />
          <span>{isOpen ? '✕ Close' : 'Ask LDS Bot'}</span>
          {!isOpen && (
            <span className="cta-arrow">↗</span>
          )}
        </button>
      </div>

      {/* Chat modal container with complete Lenis scroll isolation */}
      {isOpen && (
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-label="Ask LDS Bot — Electrical Engineering Assistant"
          data-lenis-prevent="true"
          className="lds-chat-modal"
          style={{
            position: 'fixed',
            bottom: 'calc(84px + env(safe-area-inset-bottom, 0px))',
            right: 'calc(24px + env(safe-area-inset-right, 0px))',
            width: 'min(440px, calc(100vw - 36px))',
            height: 'min(590px, calc(100dvh - 120px))',
            background: '#121820',
            border: '1px solid rgba(201, 160, 82, 0.28)',
            borderTop: '2px solid var(--accent-gold)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 8999,
            boxShadow: '0 20px 48px rgba(0,0,0,0.55), 0 4px 16px rgba(201,160,82,0.08)',
            overscrollBehavior: 'contain',
            touchAction: 'pan-y',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '16px 20px',
              borderBottom: '1px solid rgba(250, 248, 245, 0.10)',
              background: '#0E131A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              userSelect: 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#22c55e',
                  boxShadow: '0 0 8px rgba(34,197,94,0.7)',
                }}
              />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#FAF8F5', letterSpacing: '0.02em' }}>
                  Ask LDS Bot
                </div>
                <div style={{ fontSize: '10px', color: 'var(--accent-gold)', letterSpacing: '0.10em', textTransform: 'uppercase', fontWeight: 500 }}>
                  Lukhdatar &amp; Sons Engineering Desk
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close Assistant"
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(250,248,245,0.6)',
                fontSize: '18px',
                cursor: 'pointer',
                padding: '4px',
                lineHeight: 1,
                transition: 'color 200ms ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FAF8F5')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(250,248,245,0.6)')}
            >
              ✕
            </button>
          </div>

          {/* Independent Messages Scroll Container */}
          <div
            ref={scrollRef}
            data-lenis-prevent="true"
            style={{
              flex: 1,
              overflowY: 'auto',
              overscrollBehavior: 'contain',
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              background: '#121820',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {/* Initial Welcome Greeting */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div
                style={{
                  padding: '14px 16px',
                  background: '#161F2B',
                  border: '1px solid rgba(201, 160, 82, 0.20)',
                  borderLeft: '3px solid var(--accent-gold)',
                  fontSize: '13px',
                  lineHeight: 1.6,
                  color: '#FAF8F5',
                }}
              >
                <FormattedMessage text="Welcome to **Lukhdatar & Sons (LDS)**. I can provide verified information on our turnkey electrical services, equipment supply, substations, transmission lines, download our company catalog, or connect you for a direct quote." />
              </div>

              {/* 6 Quick Action Pill Buttons */}
              {messages.length === 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
                  {CORE_QUICK_ACTIONS.map(a => (
                    <button
                      key={a.label}
                      onClick={() => handleAction(a.label)}
                      style={{
                        padding: '7px 14px',
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.06em',
                        color: a.type === 'quote' ? '#FAF8F5' : 'rgba(250, 248, 245, 0.90)',
                        background: a.type === 'quote' ? 'rgba(201, 160, 82, 0.22)' : '#182230',
                        border: a.type === 'quote' ? '1px solid var(--accent-gold)' : '1px solid rgba(250, 248, 245, 0.22)',
                        borderRadius: '2px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--accent-gold)'
                        e.currentTarget.style.color = '#111820'
                        e.currentTarget.style.background = 'var(--accent-gold)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = a.type === 'quote' ? 'var(--accent-gold)' : '1px solid rgba(250, 248, 245, 0.22)'
                        e.currentTarget.style.color = a.type === 'quote' ? '#FAF8F5' : 'rgba(250, 248, 245, 0.90)'
                        e.currentTarget.style.background = a.type === 'quote' ? 'rgba(201, 160, 82, 0.22)' : '#182230'
                      }}
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Render conversation messages */}
            {messages.map((m, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: m.role === 'user' ? 'flex-end' : 'flex-start',
                  gap: '8px',
                }}
              >
                <div
                  style={{
                    maxWidth: '88%',
                    padding: '12px 16px',
                    fontSize: '13px',
                    lineHeight: 1.6,
                    color: m.role === 'user' ? '#111820' : '#FAF8F5',
                    background: m.role === 'user' ? 'var(--accent-gold)' : '#161F2B',
                    border: m.role === 'user' ? 'none' : '1px solid rgba(250, 248, 245, 0.10)',
                    borderLeft: m.role === 'bot' ? '3px solid var(--accent-gold)' : 'none',
                    borderRadius: '2px',
                    wordBreak: 'break-word',
                  }}
                >
                  {m.isFormatted ? <FormattedMessage text={m.text} /> : m.text}
                </div>

                {/* Optional action buttons following a bot message */}
                {m.actions && m.actions.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '2px' }}>
                    {m.actions.map((act) => (
                      <button
                        key={act}
                        onClick={() => handleAction(act)}
                        style={{
                          padding: '6px 12px',
                          fontSize: '11px',
                          fontWeight: 600,
                          letterSpacing: '0.06em',
                          color: '#FAF8F5',
                          background: (act.includes('QUOTE') || act.includes('SEND')) ? 'rgba(201, 160, 82, 0.22)' : '#182230',
                          border: (act.includes('QUOTE') || act.includes('SEND')) ? '1px solid var(--accent-gold)' : '1px solid rgba(250, 248, 245, 0.22)',
                          borderRadius: '2px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'var(--accent-gold)'
                          e.currentTarget.style.color = '#111820'
                          e.currentTarget.style.background = 'var(--accent-gold)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = (act.includes('QUOTE') || act.includes('SEND')) ? 'var(--accent-gold)' : '1px solid rgba(250, 248, 245, 0.22)'
                          e.currentTarget.style.color = '#FAF8F5'
                          e.currentTarget.style.background = (act.includes('QUOTE') || act.includes('SEND')) ? 'rgba(201, 160, 82, 0.22)' : '#182230'
                        }}
                      >
                        {act}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div
                style={{
                  alignSelf: 'flex-start',
                  padding: '10px 14px',
                  background: '#161F2B',
                  border: '1px solid rgba(250, 248, 245, 0.10)',
                  borderLeft: '3px solid var(--accent-gold)',
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
              >
                <span className="typing-dot" style={{ animationDelay: '0ms' }} />
                <span className="typing-dot" style={{ animationDelay: '200ms' }} />
                <span className="typing-dot" style={{ animationDelay: '400ms' }} />
              </div>
            )}
          </div>

          {/* Chat Input Field */}
          <form
            onSubmit={handleSubmit}
            style={{
              padding: '12px 16px',
              borderTop: '1px solid rgba(250, 248, 245, 0.10)',
              background: '#0E131A',
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={enquiryStep !== 'idle' && enquiryStep !== 'done' ? "Type your answer..." : "Ask about services, equipment, substations, quotes..."}
              aria-label="Message to Ask LDS Bot"
              style={{
                flex: 1,
                padding: '10px 14px',
                background: '#161F2B',
                border: '1px solid rgba(250, 248, 245, 0.15)',
                color: '#FAF8F5',
                fontSize: '13px',
                outline: 'none',
                borderRadius: '2px',
                transition: 'border-color 200ms ease',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--accent-gold)')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(250, 248, 245, 0.15)')}
            />
            <button
              type="submit"
              aria-label="Send message"
              style={{
                padding: '10px 16px',
                background: 'var(--accent-gold)',
                border: 'none',
                color: '#111820',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                borderRadius: '2px',
                cursor: 'pointer',
                transition: 'opacity 200ms ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Send
            </button>
          </form>
        </div>
      )}

      {/* Scoped Bot CSS */}
      <style>{`
        .ask-lds-trigger-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 13px 22px;
          background: #121820;
          border: 1px solid var(--accent-gold);
          color: #FAF8F5;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
          transition: all 300ms ease;
          border-radius: 2px;
        }
        .ask-lds-trigger-btn:hover {
          background: #182230;
          box-shadow: 0 12px 32px rgba(201, 160, 82, 0.25);
          transform: translateY(-2px);
        }
        .ask-lds-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 8px rgba(34, 197, 94, 0.8);
          animation: pulse-green 2s infinite ease-in-out;
        }
        @keyframes pulse-green {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }
        @media (max-width: 480px) {
          .ask-lds-trigger-btn {
            padding: 10px 16px;
            font-size: 11px;
            gap: 8px;
          }
          .lds-chat-modal {
            right: 16px !important;
            left: 16px !important;
            width: auto !important;
            max-width: calc(100vw - 32px) !important;
            bottom: calc(72px + env(safe-area-inset-bottom, 0px)) !important;
            height: calc(100dvh - 96px) !important;
          }
        }
      `}</style>
    </>
  )
}
