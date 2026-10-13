// Content data for LDS Infrastructure website (Lukhdatar & Sons)
// Sourced strictly from verified company prospectus and approved company records.

export const COMPANY = {
  name: 'Lukhdatar & Sons',
  legalName: 'Lukhdatar & Sons',
  shortName: 'LDS',
  location: 'Kolkata, West Bengal, India',
  registeredAddress: 'Eight Mandir Street, 4th Floor, Kolkata – 700073',
  projectOffice: '46C Jawaharlal Nehru Road, Everest House, Office No. 6B, Kolkata – 700071',
  emails: ['lukhdatar_sons@rediffmail.com', 'lukhdatar6sons@gmail.com'],
  contactPersons: ['Mr. Lalit Kumar Sureka', 'Mr. Shree Mangalam Sureka'],
  whatsappNumber: '+919831000000', // Configurable LDS WhatsApp number
  whatsappPrefill: 'Hello LDS, I would like to know more about your electrical services and projects.',
  founded: '1997',
  turnkeySince: '2007',
  tagline: 'Turnkey Electrical Infrastructure & Contracting',
  summary:
    'Lukhdatar & Sons has been serving the electrical industry since 1997, starting as an electrical goods supplier and expanding into turnkey electrical contracting in 2007. The company undertakes turnkey projects in both Government and Private sectors.',
}

export const LEADERSHIP = [
  {
    id: 'founder',
    name: 'Mr. Lalit Kumar Sureka',
    title: 'Founder',
    imageKey: 'founder' as const,
    since: '1997',
    bio: 'Mr. Lalit Kumar Sureka founded Lukhdatar & Sons in Kolkata in 1997 as an electrical equipment and goods supplier. His decade of on-ground commercial experience and deep supplier relationships established the technical standards that enabled the company to transition into turnkey electrical contracting.',
  },
  {
    id: 'md',
    name: 'Mr. Shree Mangalam Sureka',
    title: 'Current Owner',
    imageKey: 'md' as const,
    since: '2013',
    bio: 'Mr. Shree Mangalam Sureka joined Lukhdatar & Sons in 2013. As the current owner of the company, he oversees project delivery.',
  },
]

export const TIMELINE = [
  {
    year: '1997',
    label: 'Electrical Goods Supplier',
    description:
      'Established in Kolkata by Mr. Lalit Kumar Sureka as an electrical goods and equipment supplier, building foundational distribution networks and manufacturer relationships.',
  },
  {
    year: '2007',
    label: 'Expanded into Turnkey Electrical Contracting',
    description:
      'The company expanded into full-scale turnkey electrical contracting, undertaking complete SITC projects for Government and Private sector clients.',
  },
  {
    year: '2013',
    label: 'Shree Joined Lukhdatar & Sons',
    description:
      'As the current owner of the company, he oversees project delivery.',
  },
  {
    year: 'Present',
    label: 'Complete Multi-Sector Execution',
    description:
      'Delivering complete electrical infrastructure across commercial, healthcare, industrial, warehouse, residential township, public, and high-voltage substation developments across India.',
  },
]

export const CAPABILITY_STATS = [
  { value: '1997', label: 'Established in Kolkata' },
  { value: '2007', label: 'Turnkey Contracting Since' },
  { value: '11KV', label: 'Distribution Networks' },
  { value: '33KV', label: 'Distribution Substations' },
  { value: '132KV', label: 'Substation and Switchyard' },
]

export const TURNKEY_STAGES = [
  { number: '01', label: 'Engineering & Design', detail: 'Detailed load calculations, single-line diagrams (SLD), and technical layout planning.' },
  { number: '02', label: 'Procurement & Supply', detail: 'Verified electrical equipment sourced from approved manufacturers and tested to specification.' },
  { number: '03', label: 'Installation & Erection', detail: 'On-site structural works, cable laying, panel erection, and power distribution cabling.' },
  { number: '04', label: 'Testing & Pre-Commissioning', detail: 'High-voltage insulation testing, relay calibrations, and safety system validation checks.' },
  { number: '05', label: 'Commissioning & Handover', detail: 'Grid energisation, load trials, statutory clearances, and complete documentation handover.' },
]

export const LIFECYCLE_STAGES = [
  { number: '01', label: 'Commissioning', detail: 'Supervised grid energisation, load balancing trials, and statutory utility clearances.' },
  { number: '02', label: 'Support', detail: 'Dedicated technical coordination and responsive engineering assistance for active installations.' },
  { number: '03', label: 'Maintenance', detail: 'Scheduled preventative shutdowns, transformer oil filtration, and circuit breaker servicing.' },
  { number: '04', label: 'Reliability', detail: 'Thermographic hotspot audits, earth resistance testing, and contact resistance verification.' },
  { number: '05', label: 'Long-Term Performance', detail: 'Lifecycle component replacements, switchboard modernizations, and capacity extensions.' },
]

export const SERVICES_20 = [
  { number: '01', title: 'Turnkey Electrical Projects', desc: 'Complete end-to-end design, supply, installation, testing, and commissioning (SITC) under single-point accountability.' },
  { number: '02', title: 'Industrial Electrification', desc: 'Turnkey electrical solutions for industrial plants, process facilities, and workshops including HT/LT distribution and motor control.' },
  { number: '03', title: 'Warehouse Electrification', desc: 'Large-format logistics illumination, high-bay lighting, external yard high-masts, motor distribution boards, and lightning protection.' },
  { number: '04', title: 'Substation & Switchyard Services', desc: 'Engineering, procurement, construction, civil foundations, testing, and commissioning for substations up to 220KV.' },
  { number: '05', title: 'Transmission Line Services', desc: 'Supply, tower erection, conductor tension stringing, and commissioning of overhead transmission lines from 11KV up to 400KV.' },
  { number: '06', title: 'Underground Cable Laying', desc: 'Route surveying, precision trenching, HDPE ducting, laying, certified jointing, and testing of underground cable networks up to 66KV.' },
  { number: '07', title: 'HT & LT Electrical Distribution', desc: 'Primary and secondary power distribution networks, rising mains, and feeder pillar loops for commercial and public developments.' },
  { number: '08', title: 'Internal & External Electrification', desc: 'Comprehensive indoor building power wiring, architectural lighting circuits, external campus illumination, and yard networks.' },
  { number: '09', title: 'Lighting Systems', desc: 'Normal lighting, emergency lighting distribution, industrial LED high-bays, high masts, aviation warning lights, and street lighting.' },
  { number: '10', title: 'Earthing & Lightning Protection', desc: 'Complete earth pit grids, chemical earthing, structural grounding loops, and lightning protection network installations.' },
  { number: '11', title: 'Electrical Panels & Control Systems', desc: 'SITC of Power Control Centres (PCC), Motor Control Centres (MCC), APFC panels, AMF panels, and control desks.' },
  { number: '12', title: 'Equipment Supply & Installation', desc: 'Supply, handling, positioning, and erection of transformers, switchgear, bus ducts, and distribution boards.' },
  { number: '13', title: 'Testing & Commissioning', desc: 'Pre-energisation insulation tests, protection relay secondary injection calibration, VCB timing checks, and grid clearances.' },
  { number: '14', title: 'Electrical Maintenance', desc: 'Routine preventive maintenance, planned shutdown servicing, transformer oil filtration, and emergency repairs for completed projects.' },
  { number: '15', title: 'Fabrication & Erection', desc: 'Custom cable trays, cable ducts, steel support structures, gantry frames, towers, and light poles fabrication and erection.' },
  { number: '16', title: 'UPS / Power Systems', desc: 'Uninterruptible power supply system integration, battery bank assembly, and clean power distribution for critical facilities.' },
  { number: '17', title: 'Public Address Systems', desc: 'Integrated public address and acoustic announcement systems for healthcare, institutional, and commercial campuses.' },
  { number: '18', title: 'Fire Detection Systems', desc: 'Code-compliant addressable and conventional fire alarm networks, smoke detection, and emergency trip interlocks.' },
  { number: '19', title: 'Voice & Data Cabling', desc: 'Structured network cabling, fiber optic trunking, and EPABX communication infrastructure.' },
  { number: '20', title: 'MATV Systems', desc: 'Master antenna television cabling, signal amplifier networks, and distribution points for hospitality and housing complexes.' },
]

export const EQUIPMENT_RANGE = [
  { id: 'transformers', title: 'Transformers', mediaKey: 'transformers' as const, desc: 'Distribution and power transformers with auxiliary protections and on-site oil filtration support.' },
  { id: 'switchgear',   title: 'LV / MV Switchgear', mediaKey: 'switchgear' as const, desc: 'Vacuum Circuit Breaker (VCB) panels and medium voltage switchgear engineered for reliable fault isolation.' },
  { id: 'pcc',          title: 'Power Control Centres (PCC)', mediaKey: 'powerControlCenter' as const, desc: 'Heavy-duty industrial and commercial PCC switchboards built for centralized power distribution and circuit protection.' },
  { id: 'capacitor',    title: 'Capacitor Banks', mediaKey: 'capacitorBank' as const, desc: 'Automatic Power Factor Improvement capacitor banks designed to maintain power efficiency and reduce line losses.' },
  { id: 'busduct',      title: 'Bus Duct Systems', mediaKey: 'busduct' as const, desc: 'High-amperage sandwich and air-insulated LT bus ducts for efficient main power distribution.' },
  { id: 'apfc',         title: 'APFC & Control Panels', mediaKey: 'apfcControlPanels' as const, desc: 'Intelligent Automatic Power Factor Correction panels and process control desks.' },
]

export const EQUIPMENT_CATEGORIES = [
  'Transformers',
  'LT / MV Switchgear',
  'LT Panels',
  'Power Control Centres (PCC)',
  'Motor Control Centres (MCC)',
  'Power Factor Improvement / Capacitor Panels',
  'AMF Panels & DG Synchronizing Boards',
  'Instrumentation Panels',
  'Control Panels & Desks',
  'LT Bus Ducts & Rising Mains',
  'LT Distribution Boards',
  'Feeder Pillar Boards',
  'Junction Boxes',
  'Tap-Off Boxes',
  'DG Synchronising Panels',
  'Switchboards',
  'Draw-Out & Non-Draw-Out Equipment',
]

export const PROJECTS = [
  {
    id: 'taj-hotel',
    title: 'Taj Group of Hotels',
    scope: 'Electrical Infrastructure',
    mediaKey: 'tajHotel' as const,
    tag: 'Hospitality',
    desc: 'Electrical infrastructure installations supporting luxury hospitality operations with dependable primary distribution and backup power coordination.',
  },
  {
    id: 'sonotel',
    title: 'Sonotel',
    scope: 'Complete SITC & Electrical Infrastructure',
    mediaKey: 'sonotel' as const,
    tag: 'Hospitality',
    desc: 'Turnkey Supply, Installation, Testing & Commissioning of main distribution panels, bus ducts, standby generator synchronization, and illumination systems.',
  },
  {
    id: 'assam-medical-college',
    title: 'Assam Hill Medical College & Research Institute',
    scope: 'Complete Electrical SITC',
    mediaKey: 'assamHill' as const,
    tag: 'Healthcare / Medical',
    desc: 'Turnkey electrical SITC across college blocks, hospital wards, and research laboratories, incorporating transformer yards, rising mains, and isolated earthing networks.',
  },
  {
    id: 'sarojini-naidu-hospital',
    title: 'Sarojini Naidu Medical Hospital, Agra',
    scope: 'SITC of Electrical Installations',
    mediaKey: 'sarojiniHospital' as const,
    tag: 'Healthcare / Medical',
    desc: 'Modernization and SITC of primary electrical installations, capacitor banks, main power switchboards, and grounding networks across active medical facilities.',
  },
  {
    id: 'skmc-medical-college',
    title: 'Shri Krishna Medical College, Muzaffarpur',
    scope: 'Complete Electrical SITC',
    mediaKey: 'skmcMedical' as const,
    tag: 'Healthcare / Medical',
    desc: 'Complete campus electrical infrastructure execution including HT VCB switchgear, transformer installation, distribution cable trays, and emergency lighting networks.',
  },
  {
    id: 'bihar-vidhan-sabha',
    title: 'Bihar Vidhan Sabha',
    scope: 'Turnkey Infrastructure Electrification',
    mediaKey: 'biharVidhanSabha' as const,
    tag: 'Government / Institutional',
    desc: 'Turnkey electrical infrastructure for the state legislative complex, incorporating high-security power routing, primary distribution panels, and backup power synchronization.',
  },
  {
    id: 'warehouse-projects',
    title: 'Warehouse Electrification Projects',
    scope: 'Industrial Power Distribution',
    mediaKey: 'warehouseProjects' as const,
    tag: 'Industrial / Infrastructure',
    desc: 'Overhead cable tray installations, high-bay lighting, external yard high-masts, motor distribution boards, and lightning protection systems for major logistics facilities.',
  },
  {
    id: 'kohora-substation',
    title: 'Kohora, Assam',
    scope: '2 × 3.15 MVA Substation, Control Room & 9 VCB Panels',
    mediaKey: 'kohoraSubstation' as const,
    tag: 'Substation',
    desc: 'Turnkey engineering, supply, erection, testing, and commissioning of a 2 × 3.15 MVA substation with a dedicated Control Room and 9 VCB Panels in 100 working days.',
  },
  {
    id: 'signature',
    title: 'Prabhatam Heights',
    scope: 'HT/LT Power Distribution',
    mediaKey: 'signature' as const,
    tag: 'Residential / Township',
    desc: 'Multi-point HT/LT power distribution, transformer yards, LT control panels, and sub-metering grids for multi-storey residential living.',
  },
  {
    id: 'shristinagar',
    title: 'Shristinagar',
    scope: 'HT/LT Power Distribution',
    mediaKey: 'shristinagar' as const,
    tag: 'Residential / Township',
    desc: 'Outdoor township electrification including weather-proof LT feeder pillar boards, underground distribution loops, and street lighting networks.',
  },
]

export const INDUSTRIES = [
  { id: 'manufacturing',        label: 'Manufacturing',          mediaKey: 'manufacturing'        as const },
  { id: 'commercial',           label: 'Commercial',             mediaKey: 'commercial'           as const },
  { id: 'warehousing',          label: 'Warehousing',            mediaKey: 'warehousing'          as const },
  { id: 'real-estate',          label: 'Real Estate',            mediaKey: 'realEstate'           as const },
  { id: 'institutions',         label: 'Institutions',           mediaKey: 'institutions'         as const },
  { id: 'industrial-facilities', label: 'Industrial Facilities',  mediaKey: 'industrialFacilities' as const },
  { id: 'infrastructure',       label: 'Infrastructure',         mediaKey: 'infrastructure'       as const },
]

export const ACCOUNTABILITY_PRINCIPLES = [
  {
    number: '01',
    title: 'Single-Point Project Responsibility',
    description: 'We manage engineering coordination, equipment supply, on-site installation, and commissioning as one accountable scope, eliminating multi-vendor interface friction.',
  },
  {
    number: '02',
    title: 'Engineering Rigour & Safety',
    description: 'Every installation adheres strictly to approved single-line diagrams, statutory clearance codes, and thorough pre-energisation testing protocols.',
  },
  {
    number: '03',
    title: 'Coordinated Execution Teams',
    description: 'Our in-house workforce coordinates cabling, panel erection, and specialist subcontracting under a synchronized on-site project management plan.',
  },
  {
    number: '04',
    title: 'Post-Commissioning Continuity',
    description: 'We support clients beyond energisation with scheduled preventative maintenance, transformer oil filtration, and operational lifecycle assistance.',
  },
]

export interface EcosystemBrandItem {
  name: string
  logo: string
  alt: string
}

export const ECOSYSTEM_LOGOS: EcosystemBrandItem[] = [
  { name: 'Larsen & Toubro', logo: '/media/ecosystem/lt.jpg', alt: 'Larsen & Toubro electrical engineering' },
  { name: 'ABB', logo: '/media/ecosystem/abb.svg', alt: 'ABB electrical technology' },
  { name: 'Schneider Electric', logo: '/media/ecosystem/schneider-electric.png', alt: 'Schneider Electric power management' },
  { name: 'Legrand', logo: '/media/ecosystem/legrand.png', alt: 'Legrand electrical solutions' },
  { name: 'L&T EBG', logo: '/media/ecosystem/lt-ebg.png', alt: 'L&T Electronic Products & Systems' },
  { name: 'Lucy Electric', logo: '/media/ecosystem/lucy-electric.png', alt: 'Lucy Electric secondary distribution' },
  { name: 'HPL Electric & Power Ltd', logo: '/media/ecosystem/hpl-electric-power.webp', alt: 'HPL Electric & Power Ltd' },
  { name: 'Huphen Electromech Pvt', logo: '/media/ecosystem/huphen-electromech.png', alt: 'Huphen Electromech Pvt Ltd' },
  { name: 'Crompton Greaves', logo: '/media/ecosystem/cg-crompton-greaves.jpg', alt: 'Crompton Greaves CG Power and Industrial Solutions' },
  { name: 'Crompton', logo: '/media/ecosystem/crompton.png', alt: 'Crompton electrical products' },
  { name: 'Havells', logo: '/media/ecosystem/havells.png', alt: 'Havells India electrical equipment' },
  { name: 'KEI Wires and Cables', logo: '/media/ecosystem/kei-wires-cables.png', alt: 'KEI Wires and Cables' },
  { name: 'Finolex', logo: '/media/ecosystem/finolex.jpg', alt: 'Finolex Cables Limited' },
  { name: 'Raychem RPG', logo: '/media/ecosystem/raychem-rpg.png', alt: 'Raychem RPG energy products' },
  { name: 'Anchor by Panasonic', logo: '/media/ecosystem/anchor-by-panasonic.png', alt: 'Anchor by Panasonic electrical devices' },
  { name: 'Bajaj Electricals', logo: '/media/ecosystem/bajaj-electricals.jpg', alt: 'Bajaj Electricals illumination & power' },
  { name: 'Philips', logo: '/media/ecosystem/philips.jpg', alt: 'Philips Lighting and electrical systems' },
  { name: 'Wipro', logo: '/media/ecosystem/wipro.jpg', alt: 'Wipro lighting and power solutions' },
  { name: '3M', logo: '/media/ecosystem/3m.png', alt: '3M electrical insulation and termination' },
  { name: 'Volamp', logo: '/media/ecosystem/volamp.jpg', alt: 'Volamp transformers and power solutions' },
  { name: 'Polycab', logo: '/media/ecosystem/polycab.png', alt: 'Polycab wires and cables' },
  { name: 'Siemens', logo: '/media/ecosystem/simens.png', alt: 'Siemens electrical technology' },
  { name: 'Precision', logo: '/media/ecosystem/precision.png', alt: 'Precision pipes and fittings' },
  { name: 'AKG', logo: '/media/ecosystem/akg.jpg', alt: 'AKG pipes and electrical conduits' },
]

export const ECOSYSTEM_BRANDS = ECOSYSTEM_LOGOS.map(b => b.name)

export const VERIFIED_RELATIONSHIPS = [
  {
    type: 'Authorized Super Stockist / Channel Partner',
    partners: 'HPL Electric & Power Ltd, Lucy Electric, and Huphen Electromech Pvt Ltd',
    details: 'Authorized distribution and stocking relationships providing direct manufacturer supply chains for critical electrical equipment.',
  },
  {
    type: 'System House',
    partners: 'Larsen & Toubro Limited (L&T)',
    details: 'Recognized System House of Larsen & Toubro Limited for electrical systems and assemblies.',
  },
  {
    type: 'Substation Joint Venture',
    partners: 'Crompton Greaves (CG Power)',
    details: 'Executed a Joint Venture with Crompton Greaves for a 132KV Substation project at Assam.',
  },
  {
    type: 'Substation Joint Venture',
    partners: 'Areva T&D Ltd',
    details: 'Executed a Joint Venture with Areva T&D Ltd for a 33/11KV Substation project at Asansol.',
  },
]

export const NAV_LINKS = [
  { label: 'About Us', href: '/company' },
  { label: 'Our Services', href: '/capabilities' },
  { label: 'Our trusted vendors and collaborators', href: '/partner-with-us' },
  { label: 'Products & Equipment', href: '/vendor-capabilities' },
  { label: 'Projects & Industries', href: '/insights' },
]

export const FOOTER_SECTIONS = [
  {
    heading: 'Our Services',
    links: [
      { label: 'Turnkey Electrical Projects', href: '/capabilities/turnkey-electrification' },
      { label: 'Substations & Switchyards', href: '/capabilities/substations-switchyards' },
      { label: 'Transmission Lines', href: '/capabilities/transmission-lines' },
      { label: 'Underground Cable Laying', href: '/capabilities/underground-cable-laying' },
      { label: 'Industrial Electrification', href: '/capabilities/industrial-electrification' },
      { label: 'Testing & Commissioning', href: '/capabilities/testing-commissioning' },
      { label: 'Electrical Maintenance', href: '/capabilities/electrical-maintenance' },
    ],
  },
  {
    heading: 'Products & Clients',
    links: [
      { label: 'Products & Equipment', href: '/vendor-capabilities' },
      { label: 'Our trusted vendors and collaborators', href: '/partner-with-us' },
      { label: 'Quality & Safety Approach', href: '/quality-safety' },
      { label: 'Projects & Industries', href: '/insights' },
    ],
  },
  {
    heading: 'About Us',
    links: [
      { label: 'Company Overview', href: '/company' },
      { label: 'Leadership Team', href: '/company#leadership' },
      { label: 'Project Portfolio', href: '/#projects' },
      { label: 'Download Catalog', href: '/LDS-prospectus.pdf' },
    ],
  },
]

export interface CapabilityDetail {
  title: string
  deliverables: string[]
  scopes: string[]
  specs: string[]
  environments: string[]
  lifecycle: string[]
  ctaText: string
  ctaHref: string
}

export const CAPABILITIES_DATA: Record<string, CapabilityDetail> = {
  'turnkey-electrification': {
    title: 'Turnkey Electrical Projects',
    deliverables: [
      'Complete Supply, Installation, Testing & Commissioning (SITC) under single-point accountability.',
      'Comprehensive engineering coordination, procurement from approved manufacturers, and on-site erection.',
      'Streamlined project delivery across Government and Private sector developments.'
    ],
    scopes: [
      'HT and LT distribution systems, transformer yards, and main switchgear installations.',
      'Indoor and outdoor electrical distribution networks for Government and Private developments.',
      'Comprehensive on-site project management, progress reporting, and statutory authority liaison.'
    ],
    specs: [
      'LT Rising Mains and high-amperage bus duct systems.',
      'Automatic Power Factor Improvement (APFC) capacitor banks.',
      'Power Control Centres (PCC), Motor Control Centres (MCC), AMF panels, and instrumentation boards.'
    ],
    environments: [
      'Healthcare and educational campuses (such as Assam Hill Medical College and SKMC Muzaffarpur).',
      'Government and institutional complexes (such as Bihar Vidhan Sabha).',
      'Commercial hospitality hubs, warehouses, and industrial manufacturing facilities.'
    ],
    lifecycle: [
      'Engineering Coordination: Single-line diagram validation and load schedule engineering.',
      'Site Execution: Cable tray routing, panel erection, and termination work.',
      'Handover & Support: Statutory testing reports, as-built documentation, and routine maintenance.'
    ],
    ctaText: 'Send Inquiry',
    ctaHref: '/vendor-capabilities?type=Turnkey'
  },
  'substations-switchyards': {
    title: 'Substation & Switchyard Services',
    deliverables: [
      'Substation and switchyard services up to 220KV, including engineering, procurement, construction, testing and commissioning.',
      'Switchyard structural assembly, power transformer erection, VCB panel integration, and control cabling.',
      'Protection coordination, utility liaison clearances, and grid energisation.'
    ],
    scopes: [
      'Site design, foundation design, substation design, and earth mat design.',
      'Protection & control, SCADA system design, GIS and open-air design, and capacitor bank design.',
      'Fast-track execution schedules, demonstrated by energising the 2 × 3.15 MVA Kohora Substation in 100 working days.'
    ],
    specs: [
      'Voltage Levels: Complete substation engineering up to 220KV capacity.',
      'VCB Panels: Spec-compliant indoor and outdoor vacuum circuit breakers.',
      'Transformers: Step-down and step-up power transformers with auxiliary protections.'
    ],
    environments: [
      'State electricity board distribution grids and utility substations.',
      'Heavy industrial manufacturing plants and processing facilities.',
      'Large residential township hubs and commercial developments.'
    ],
    lifecycle: [
      'Pre-Commissioning: High-voltage insulation testing, CT/PT calibration, and relay timing checks.',
      'Commissioning: Grid synchronisation and load trial runs.',
      'Post-Commissioning: Transformer oil filtration, contact resistance testing, and preventative maintenance.'
    ],
    ctaText: 'Send Inquiry',
    ctaHref: '/vendor-capabilities?type=Substation'
  },
  'transmission-lines': {
    title: 'Transmission Line Services',
    deliverables: [
      'Supply, installation, testing and commissioning of overhead transmission lines across voltage levels up to 400KV.',
      'Tower foundation casting, structural steel tower erection, hardware fitting, and conductor stringing.',
      'Right-of-Way (RoW) coordination, challenging terrain execution, and grid connection clearances.'
    ],
    scopes: [
      'High-voltage transmission line works across verified voltage levels: 11KV, 33KV, 66KV, 132KV, 220KV, and 400KV.',
      'Lattice steel tower erection, high-mast illumination, and structural light poles.',
      'Substation interconnection lines and dedicated industrial power corridors.'
    ],
    specs: [
      'Voltage Ratings: 11KV, 33KV, 66KV, 132KV, 220KV, and 400KV transmission structures.',
      'Fabrication: Galvanized steel lattice towers, structural hardware, and light poles.',
      'Conductor Stringing: ACSR and AAAC conductor tension stringing with sag matching.'
    ],
    environments: [
      'Inter-district utility power corridors and grid feeder lines.',
      'Dedicated transmission links connecting substations to industrial zones.',
      'Challenging terrain routes requiring specialized erection logistics.'
    ],
    lifecycle: [
      'Pre-Energisation: Tower structural verticality verification and line insulation testing.',
      'Commissioning: Phasing checks, clearance verification, and statutory energisation.',
      'Maintenance: Route inspection patrols, insulator washing, and structural maintenance.'
    ],
    ctaText: 'Send Inquiry',
    ctaHref: '/partner-with-us?type=Transmission'
  },
  'underground-cable-laying': {
    title: 'Underground Cable Systems',
    deliverables: [
      'Underground cable laying services up to 66KV across supply, laying, repair, maintenance, and replacement.',
      'High-voltage and low-voltage underground power distribution loops with mechanical protection.',
      'Route surveying, buried utility mapping, and concrete cable trench construction.'
    ],
    scopes: [
      'High-voltage underground cabling projects up to 66KV system ratings.',
      'Trenching, bedding, HDPE duct insertion, thermal backfilling, and route marking.',
      'High-voltage cable jointing bays, heat-shrink terminations, and end-box fittings.'
    ],
    specs: [
      'Cable Specifications: XLPE insulated armored copper and aluminum cables up to 66KV.',
      'Installation Methods: Open trench direct burial, concrete duct banks, and road crossing ducts.',
      'Terminations: Certified heat-shrinkable and cold-shrinkable joints and terminations.'
    ],
    environments: [
      'Dense urban commercial districts and municipal infrastructure routes.',
      'Industrial manufacturing campuses and heavy logistics parks.',
      'Modern residential developments, housing complexes, and townships.'
    ],
    lifecycle: [
      'Testing: Insulation resistance, sheath integrity checks, and High Voltage (Hipot) testing.',
      'Operation: Cable marker upkeep and thermal imaging of termination boxes.',
      'Support: Rapid fault location, core splicing, and joint box replacements.'
    ],
    ctaText: 'Send Inquiry',
    ctaHref: '/vendor-capabilities?type=Cabling'
  },
  'industrial-electrification': {
    title: 'Industrial Electrification',
    deliverables: [
      'Turnkey electrical solutions for industries, process plants and warehouses, including design and engineering.',
      'Plant internal and external cabling, motor control centres (MCC), and power control centres (PCC).',
      'Standby generator synchronization panels, bus duct distribution, and automated power factor correction.'
    ],
    scopes: [
      'Electrical design, HT/LT distribution, cabling, panels, lighting, equipment installation, testing, and commissioning.',
      'Industrial plant cable tray networks, heavy power cabling, and motor terminations.',
      'Process instrumentation wiring, control desks, and emergency isolation circuits.'
    ],
    specs: [
      'Bus Ducts: High-capacity sandwich and air-insulated LT bus ducts.',
      'Capacitor Banks: Automatic Power Factor Correction (APFC) panels with detuned reactors.',
      'Switchboards: Form 4 draw-out and fixed-type Power Control Centres.'
    ],
    environments: [
      'Manufacturing plants, fabrication workshops, and processing facilities.',
      'Warehousing, logistics hubs, and material handling depots.',
      'Heavy industrial infrastructure facilities and captive power plants.'
    ],
    lifecycle: [
      'Pre-Commissioning: Earth loop impedance validation, relay calibration, and load trial testing.',
      'Preventative Maintenance: Thermography surveys, breaker contact inspection, and busbar torque checks.',
      'Upgrades: Panel retrofitting, capacity expansion, and switchgear modernization.'
    ],
    ctaText: 'Send Inquiry',
    ctaHref: '/vendor-capabilities?type=Industrial'
  },
  'warehouse-electrification': {
    title: 'Warehouse Electrification',
    deliverables: [
      'Large-format warehouse illumination, high-bay lighting, and primary power distribution networks.',
      'External yard illumination, high masts, feeder pillars, and lightning protection systems.',
      'Fire detection integration, emergency lighting distribution, and auxiliary power supplies.'
    ],
    scopes: [
      'High-bay lighting design and installation for extensive storage and racking layouts.',
      'Heavy-duty LT cable tray routing, main distribution switchboards, and sub-panels.',
      'Yard perimeter lighting, high-mast towers, and perimeter grounding grids.'
    ],
    specs: [
      'Illumination: High-efficiency industrial LED high bays, floodlights, and motorized high masts.',
      'Fabrication: Heavy-gauge perforated and ladder cable trays, steel supports, and light poles.',
      'Safety: Comprehensive earthing grids, lightning protection masts, and fire detection cabling.'
    ],
    environments: [
      'Logistics parks, fulfillment centers, and distribution warehouses.',
      'Industrial storage depots and multi-tenant freight facilities.',
      'Cold chain storage warehouses and material handling facilities.'
    ],
    lifecycle: [
      'Testing: Lux level verification surveys, earth resistance audits, and fire alarm integration testing.',
      'Maintenance: High-mast winch motor inspections, panel cleaning, and lighting maintenance.',
      'Expansion: Electrical infrastructure scaling for warehouse expansion phases.'
    ],
    ctaText: 'Send Inquiry',
    ctaHref: '/vendor-capabilities?type=Warehouse'
  },
  'testing-commissioning': {
    title: 'Testing & Commissioning',
    deliverables: [
      'Thorough pre-energisation testing, relay calibrations, and high-voltage insulation audits.',
      'Protection coordination checks, circuit breaker timing tests, and earth resistance validation.',
      'Grid energisation supervision, statutory documentation preparation, and compliance sign-offs.'
    ],
    scopes: [
      'EHV, HV, MV, and LV electrical installations testing and reporting.',
      'Numerical protection relay programming, primary injection testing, and secondary injection checks.',
      'Transformer dielectric oil testing, ratio checks, and winding resistance verification.'
    ],
    specs: [
      'High-Voltage Tests: Insulation resistance (Megger), cable sheath checks, and Hipot testing.',
      'Switchgear Tests: VCB contact resistance (micro-ohm), breaker timing, and interlocking checks.',
      'Earthing Tests: Earth pit resistance measurements and structural grid continuity mapping.'
    ],
    environments: [
      'Utility substations and high-voltage grid switchyards.',
      'Industrial manufacturing complexes, commercial buildings, and institutional campuses.',
      'Pre-handover audits for completed turnkey electrical installations.'
    ],
    lifecycle: [
      'Pre-Commissioning: Step-by-step checklist execution and fault isolation before energisation.',
      'Commissioning: Phasing alignment, load trials, and utility handover.',
      'Periodic Testing: Annual relay recalibration and insulation resistance re-certification.'
    ],
    ctaText: 'Send Inquiry',
    ctaHref: '/vendor-capabilities?type=Testing'
  },
  'electrical-maintenance': {
    title: 'Electrical Maintenance',
    deliverables: [
      'Scheduled preventative maintenance programs, planned shutdowns, and emergency repair response.',
      'Circuit breaker servicing, transformer oil filtration, contact testing, and earthing audits.',
      'Electrical refurbishment, legacy switchboard modernization, and component replacement.'
    ],
    scopes: [
      'Routine maintenance of existing electrical works and completed turnkey projects.',
      'Upkeep of substations, industrial MCC/PCC panels, and commercial HT/LT networks.',
      'Equipment replacements, breaker retrofitting, and busbar structural maintenance.'
    ],
    specs: [
      'Servicing: VCB mechanism overhaul, transformer silica gel replacement, and contactor maintenance.',
      'Diagnostic Auditing: Thermographic imaging inspections and ground resistance testing.',
      'Modernization: Legacy relay retrofits and distribution board upgrades.'
    ],
    environments: [
      'Healthcare facilities, medical colleges, and institutional properties.',
      'Industrial manufacturing plants, warehouses, and commercial developments.',
      'Completed turnkey electrical projects requiring continuous operational oversight.'
    ],
    lifecycle: [
      'Routine Upkeep: Scheduled visual audits, cleaning, tightening, and lubrication of switchgear.',
      'Diagnostic Checks: Infrared thermography to identify loose connections before faults occur.',
      'Lifecycle Support: Modernizing obsolete components to prolong installation life.'
    ],
    ctaText: 'Send Inquiry',
    ctaHref: '/vendor-capabilities?type=Maintenance'
  }
}

export interface CaseStudyDetail {
  title: string
  client: string
  sector: string
  scope: string
  engineering: string[]
  testing: string[]
  outcome: string
  mediaKey: string
}

export const PROJECT_CASE_STUDIES: Record<string, CaseStudyDetail> = {
  'kohora-assam-substation': {
    title: 'Kohora, Assam Substation',
    client: 'Utility Infrastructure Project',
    sector: 'Substation',
    scope: 'Turnkey delivery of a 2 × 3.15 MVA Substation incorporating a dedicated Control Room and 9 VCB Panels.',
    engineering: [
      'Completed layout engineering tailored to challenging site terrain conditions in Assam.',
      'Procured and erected utility-grade transformers, custom VCB panels, and auxiliary systems.',
      'Constructed complete civil foundations, gantry structural members, and underground cable ducts.'
    ],
    testing: [
      'Conducted comprehensive insulation resistance testing and high-voltage cable sheath checks.',
      'Calibrated protection relay settings and verified electrical interlocking controls.',
      'Executed vacuum circuit breaker contact resistance and timing validation tests.'
    ],
    outcome: 'Successfully commissioned the 2 × 3.15 MVA complete substation with control room and 9 VCB panels at Kohora, Assam in 100 working days.',
    mediaKey: 'kohoraSubstation'
  },
  'assam-hill-medical-college': {
    title: 'Assam Hill Medical College',
    client: 'Assam Hill Medical College & Research Institute',
    sector: 'Healthcare / Medical',
    scope: 'Complete electrical SITC (Supply, Installation, Testing & Commissioning) for the medical college and research campus.',
    engineering: [
      'Executed detailed electrical design and load planning for academic blocks, hospital wards, and research laboratories.',
      'Installed main HT distribution systems, transformer yards, and LT rising mains.',
      'Laid campus-wide power distribution cables, cable tray networks, and lighting sub-distribution boards.'
    ],
    testing: [
      'Conducted earth loop impedance testing across critical clinical spaces and hospital rooms.',
      'Verified standby generator synchronisation controls and AMF panel operation.',
      'Tested low-voltage auxiliary networks including fire detection and public address systems.'
    ],
    outcome: 'Delivered an integrated, code-compliant electrical distribution network providing dependable power for critical medical operations.',
    mediaKey: 'assamHill'
  },
  'sarojini-naidu-medical-hospital': {
    title: 'Sarojini Naidu Medical Hospital, Agra',
    client: 'Sarojini Naidu Medical Hospital',
    sector: 'Healthcare / Medical',
    scope: 'Turnkey SITC of electrical installations and primary power distribution switchboards.',
    engineering: [
      'Engineered localized power distribution boards to support medical equipment electrical loads.',
      'Installed capacitor banks, power distribution panels, bus ducts, and high-conductivity grounding grids.',
      'Routed cabling through active healthcare facility areas with structured execution protocols.'
    ],
    testing: [
      'Performed transformer winding resistance testing and dielectric strength checks.',
      'Verified automated transfer switch timings and emergency power changeovers.',
      'Tested lightning protection networks and earth pit ground resistance levels.'
    ],
    outcome: 'Successfully modernized the healthcare facility infrastructure, improving power factor efficiency and operational safety standards.',
    mediaKey: 'sarojiniHospital'
  },
  'shri-krishna-medical-college': {
    title: 'Shri Krishna Medical College, Muzaffarpur',
    client: 'Shri Krishna Medical College',
    sector: 'Healthcare / Medical',
    scope: 'Complete electrical SITC encompassing campus power distribution and illumination installations.',
    engineering: [
      'Structured overhead and underground cable tray layouts and HT/LT power distribution networks.',
      'Erected transformers, HT VCB panels, and sub-distribution boards across campus blocks.',
      'Installed general illumination fixtures, external yard lighting, and emergency lighting circuits.'
    ],
    testing: [
      'Tested cable insulation values and conducted high-potential (hipot) cable testing.',
      'Calibrated overcurrent, short circuit, and earth fault protection relay controls.',
      'Validated earth grid connectivity and grounding continuity across all buildings.'
    ],
    outcome: 'Completed the campus electrical infrastructure within project deadlines, satisfying all statutory safety clearance standards.',
    mediaKey: 'skmcMedical'
  },
  'sonotel': {
    title: 'Sonotel',
    client: 'Sonotel Hotels',
    sector: 'Hospitality',
    scope: 'Complete electrical SITC and infrastructure installation for hospitality property.',
    engineering: [
      'Designed architectural lighting layouts and customized interior power distribution paths.',
      'Installed main power switchboards, bus ducts, and structured cable tray routing.',
      'Integrated standby generator synchronization and automated mains failure controls.'
    ],
    testing: [
      'Tested phase alignment, circuit breaker operations, and safety interlocks.',
      'Conducted thermographic inspection checks on main panel termination points.',
      'Verified fire alarm integration and public address system controls.'
    ],
    outcome: 'Delivered a code-compliant, reliable hospitality electrical installation supporting continuous guest operations.',
    mediaKey: 'sonotel'
  }
}
