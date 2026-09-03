// ============================================================================
// VayuX Systems v2 — Complete Content & Configuration Database
// Enterprise-Grade Data Structure for Million-Dollar Company Website
// ============================================================================

export const siteConfig = {
  name: 'VayuX Systems',
  tagline: 'Architecting a Safer, Self-Defending Online World',
  description: 'VayuX Systems is an innovation-driven cybersecurity R&D firm that channels operational insights into autonomous, adaptive security architectures. Operating as a dynamic laboratory where every engagement—SOC, VAPT, DFIR, GRC—fuels next-generation defense mechanisms.',
  url: 'https://vayux.systems',
  email: 'nexus@vayux.systems',
  emergencyEmail: 'admin@vayux.systems',
  careersEmail: 'careers@vayux.systems',
  dpoEmail: 'dpo@vayux.systems',
  incidentPhone: '+91-8200677905',
  phone: '+1 (800) 555-VAYU',
  // Real locations from v1
  locations: {
    hq: {
      name: 'Vadodara, Gujarat',
      address: 'Sector 7G, Cyber District, Vadodara, Gujarat',
      region: 'HQ',
    },
    branches: [
      { name: 'Ahmedabad', region: 'Gujarat' },
      { name: 'Surat', region: 'Gujarat' },
      { name: 'Pan-India Presence', region: 'India' },
    ],
  },
  registrations: {
    certIn: 'CERT-In Directives Incident Compliant',
    dpdpAct: 'DPDP Act 2023 Ready',
    startupGujarat: 'Registered with Startup Gujarat',
    msme: 'MSME Registered',
    iso27001: 'ISO 27001 Ready',
  },
};

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Services', href: '/solutions' },
  { label: 'Why VayuX', href: '#why-vayux' },
  { label: 'Industries', href: '#industries' },
  { label: 'About', href: '/about' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
] as const;

// ============================================================================
// CORE TEAM — Real Founder & Leadership
// ============================================================================

export const teamMembers = [
  {
    slug: 'pragnesh',
    firstName: 'Pragnesh Kumar',
    lastName: 'S.',
    fullName: 'Pragnesh Kumar S.',
    title: 'Founder / CTO',
    org: 'VayuX Systems',
    phone: '+91-6355736986',
    email: 'pragnesh.s@vayux.systems',
    website: 'https://vayux.systems',
    linkedin: 'https://www.linkedin.com/in/pragnesh-singh-rajput/',
    twitter: 'https://x.com/PragneshSingh5',
    github: 'https://github.com/pragnesh-singh-rajput',
    bio: 'Founder & CTO. Architecting autonomous, self-defending digital infrastructure through fundamental cybersecurity research and applied systems defense. Deep expertise in kernel architecture, vulnerability research, and low-level systems engineering.',
    expertise: ['Kernel Architecture', 'Systems Defense', 'Vulnerability Research', 'Autonomous Security'],
    image: '/images/pragnesh-singh.jpg', // Real image from v1
  },
];

// ============================================================================
// CORE VALUES & PILLARS
// ============================================================================

export const corePillars = [
  {
    icon: 'FlaskConical',
    title: 'Fundamental Research & Applied R&D',
    description: 'We reject standard routine maintenance. VayuX operates as a dynamic laboratory where low-level engineering research is continuously applied to real-world infrastructure defense.',
    glow: 'rgba(37, 99, 235, 0.15)',
  },
  {
    icon: 'RefreshCw',
    title: 'Operational Feedback Loop',
    description: 'Real-world telemetry from our specialized services (SOC Management, VAPT, DFIR, and GRC) channels directly into developing next-generation autonomous architectures.',
    glow: 'rgba(56, 189, 248, 0.15)',
  },
  {
    icon: 'ShieldAlert',
    title: 'Self-Defending Architecture',
    description: 'Moving beyond conventional reactive monitoring to engineer adaptive, high-impact defense mechanisms that proactively secure global digital infrastructure against emerging threats.',
    glow: 'rgba(16, 185, 129, 0.15)',
  },
];

// ============================================================================
// 7-STAGE DEFENSE PIPELINE (How It Works)
// ============================================================================

export const defenseStages = [
  {
    step: '01',
    icon: 'Database',
    title: 'Log Ingestion & Normalization',
    badge: 'DATA INGESTION',
    color: '#8DA0BC',
    description: 'Collects raw logs and security events from endpoints, cloud infrastructure, network devices, and applications in real time. Events are parsed, normalized, and enriched with contextual metadata.',
  },
  {
    step: '02',
    icon: 'Search',
    title: 'Threat Indicator Correlation',
    badge: 'INTELLIGENCE MATCH',
    color: '#00AAFF',
    description: 'Cross-references threat indicators in parallel against known malicious hashes, domains, IPs, and registries globally. Matches are validated against multiple curated threat intelligence sources.',
  },
  {
    step: '03',
    icon: 'Globe',
    title: 'Network Source Reputation',
    badge: 'IP CORRELATION',
    color: '#00D5FF',
    description: 'Scores source IPs against global real-time threat intelligence feeds, Tor exit nodes, and active botnet lists. High-risk network sources are flagged for downstream correlation.',
  },
  {
    step: '04',
    icon: 'FileCode',
    title: 'Binary & Artifact Analysis',
    badge: 'BINARY ANALYSIS',
    color: '#39FF14',
    description: 'Verifies file signatures against global malware repositories and runs static analysis on untrusted executables using proprietary detection rule sets.',
  },
  {
    step: '05',
    icon: 'Filter',
    title: 'Contextual Noise Elimination',
    badge: 'NOISE REDUCTION',
    color: '#FFB830',
    description: 'Eliminates noise by applying localized contextual rules and analyzing historical behavioral baselines of user activity. Reduces analyst fatigue while maintaining high-fidelity signal.',
  },
  {
    step: '06',
    icon: 'BarChart3',
    title: 'Dynamic Risk Scoring',
    badge: 'DANGER ASSESSMENT',
    color: '#FF3B30',
    description: 'Assigns a dynamic, confidence-weighted risk score to surviving alerts, mapping directly to MITRE ATT&CK tactics for analyst prioritization and rapid response decisions.',
  },
  {
    step: '07',
    icon: 'UserShield',
    title: 'Human L2 Analyst Review',
    badge: 'HUMAN-IN-THE-LOOP',
    color: '#E040FB',
    description: 'Elite analysts review only high-severity, triaged alerts with full forensic context and recommend active containment. Human-in-the-loop oversight ensures precision and accountability.',
  },
];

// ============================================================================
// SERVICES — Four Operational Pillars (Real from v1)
// ============================================================================

export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  fullDescription?: string;
  badge: string;
  badgeColor: string;
  includes: string[];
  flagship?: boolean;
  methodology?: {
    steps: { title: string; description: string }[];
  };
  appliedSolutions?: string[];
  techSpecs?: string[];
  feedbackLoop?: string;
}

export const services: readonly ServiceItem[] = [
  {
    id: 'soc',
    icon: 'Robot',
    title: 'SOC Management',
    subtitle: '24/7 Autonomous Threat Monitoring & Triage',
    badge: 'FLAGSHIP',
    badgeColor: '#2563EB',
    shortDescription: 'Autonomous AI agents handle 100% of L1 telemetry monitoring, filtering over 99.9% of alert noise. High-severity threats are escalated to human analysts with full attack chain context.',
    fullDescription: 'Continuous vigilance powered by human expertise and machine precision. Our 24/7 SOC monitors, detects, and neutrally responds to anomalous activities across your digital ecosystem, ensuring unparalleled peace of mind and strategic defense against emerging vectors.',
    includes: [
      '24/7 autonomous threat monitoring across enterprise telemetry',
      'Automated IoC, IP reputation, and file hash verification',
      'False positive elimination before human escalation',
      'Context-rich alert queues for L2/L3 security analysts',
      'Automated response playbook execution',
    ],
    appliedSolutions: [
      'Executive Dashboard & Clarity Reports',
      'Instant Threat Containment',
      'Uninterrupted Business Continuity',
    ],
    techSpecs: [
      'Real-time Telemetry Pipeline',
      'Heuristic & Signature AI Detection',
      'Sub-15ms Event Correlation Latency',
    ],
    feedbackLoop: 'Anomalies identified by our SOC analysts are fed directly into VayuX R&D. This active threat intelligence continuously trains our autonomous security models, evolving our defensive grid ahead of adversary tactics.',
    flagship: true,
    methodology: {
      steps: [
        { title: 'Ingestion', description: 'Centralizing logs and telemetry from all endpoints, networks, and cloud services.' },
        { title: 'Detection', description: 'Applying AI heuristics and threat intelligence to identify anomalous behavior.' },
        { title: 'Triage & Analysis', description: 'Expert analysts investigate alerts to separate false positives from real threats.' },
        { title: 'Containment', description: 'Automated and manual responses to isolate compromised systems immediately.' },
      ],
    },
  },
  {
    id: 'vapt',
    icon: 'Bug',
    title: 'VAPT Services',
    subtitle: 'Systemic Vulnerability & Penetration Testing',
    badge: 'OFFENSIVE R&D',
    badgeColor: '#EF4444',
    shortDescription: 'Deep technical inquiry into infrastructure weaknesses. Our offensive engineers simulate real-world attack vectors against networks, web applications, and cloud environments.',
    fullDescription: 'Vulnerability Assessment & Penetration Testing refined. We conduct rigorous adversarial simulations to illuminate hidden fractures in your digital architecture, delivering actionable remediation strategies that reinforce your security posture.',
    includes: [
      'Systemic vulnerability scanning & manual penetration testing',
      'Web app, API, and cloud security architecture audits',
      'Red teaming and adversary attack emulation',
      'Prioritized risk-scoring & actionable remediation roadmaps',
      'Post-remediation verification and re-testing',
    ],
    appliedSolutions: [
      'Board-Ready Risk Assessments',
      'Pre-emptive Exploit Mitigation',
      'Phased Remediation Blueprints',
    ],
    techSpecs: [
      'OWASP Top 10 Eradication',
      'Attack Surface Mapping & Reduction',
      'Automated CI/CD Security Hooks',
    ],
    feedbackLoop: 'Exploit paths discovered during VAPT engagements are cataloged in our proprietary vulnerability matrix. This data drives the creation of new automated scanning heuristics and resilience patterns deployed across all client environments.',
    methodology: {
      steps: [
        { title: 'Reconnaissance', description: 'Mapping the entire external and internal attack surface to identify all exposed assets.' },
        { title: 'Vulnerability Scanning', description: 'Automated and manual probing for known weaknesses and misconfigurations.' },
        { title: 'Exploitation', description: 'Safely simulating attacks to determine the impact of discovered vulnerabilities.' },
        { title: 'Reporting & Remediation', description: 'Delivering actionable insights with prioritized patching recommendations.' },
      ],
    },
  },
  {
    id: 'dfir',
    icon: 'Search',
    title: 'DFIR Response',
    subtitle: 'Digital Forensics & Incident Response',
    badge: 'ON-DEMAND',
    badgeColor: '#F59E0B',
    shortDescription: 'Rapid incident containment, breach isolation, and deep forensics. Our DFIR team reconstructs attack vectors and extracts root-cause telemetry to feed directly back into our R&D lab.',
    fullDescription: 'Digital Forensics & Incident Response executed with surgical precision. When crisis strikes, our elite responders isolate threats rapidly, extract deeply buried artifacts, and reconstruct events to restore secure operations swiftly.',
    includes: [
      'Incident containment & threat actor eradication',
      'AI-accelerated log analysis and attack timeline reconstruction',
      'Memory and disk artifact forensic extraction',
      'Court-admissible forensic evidence preservation',
      'Post-incident root-cause telemetry feedback into R&D',
    ],
    appliedSolutions: [
      'Immediate Crisis Containment',
      'Decisive Root Cause Analysis',
      'Strategic Recovery & Resilience',
    ],
    techSpecs: [
      'Memory Volatility Extraction',
      'Deep TTP Mapping & Analysis',
      'Immutable Artifact Preservation',
    ],
    feedbackLoop: 'Post-incident forensic timelines and zero-day signatures are rigorously analyzed in our lab. This post-mortem intelligence fuels the development of our predictive defense mechanisms, ensuring novel attacks are neutralized globally.',
    methodology: {
      steps: [
        { title: 'Preparation', description: 'Establishing baseline readiness, runbooks, and communication channels pre-incident.' },
        { title: 'Identification', description: 'Confirming breach occurrence, defining scope, and gathering volatile data.' },
        { title: 'Eradication', description: 'Removing attacker presence, malware, and closing entry vectors securely.' },
        { title: 'Recovery', description: 'Restoring systems to normal operations with enhanced monitoring for reinfection.' },
      ],
    },
  },
  {
    id: 'grc',
    icon: 'CheckSquare',
    title: 'GRC Compliance',
    subtitle: 'Governance, Risk, and Compliance Engine',
    badge: 'CONTINUOUS',
    badgeColor: '#10B981',
    shortDescription: 'Continuous monitoring against regulatory frameworks. Automatically capture audit-ready evidence for DPDP Act 2023, CERT-In 6-hour mandates, and ISO 27001 standards.',
    fullDescription: 'Governance, Risk, and Compliance synthesized into an operational advantage. We align your infrastructure with stringent global mandates, transforming regulatory friction into strategic oversight and unassailable data integrity.',
    includes: [
      'DPDP Act 2023 — Data protection compliance for Indian enterprise',
      'CERT-In Directives — Mandatory 6-hour incident reporting support',
      'ISO 27001 — Information security management readiness',
      'Continuous evidence gathering & audit dashboard reporting',
    ],
    appliedSolutions: [
      'Streamlined Audit Readiness',
      'Enterprise Risk Quantification',
      'Robust Policy Frameworks',
    ],
    techSpecs: [
      'ISO 27001 & SOC2 Mapping Matrix',
      'Automated Compliance Drift Alerts',
      'Cryptographic Audit Trails',
    ],
    feedbackLoop: 'Navigating complex regulatory shifts informs our engineering design principles. Our R&D lab ingests GRC constraint models to ensure all VayuX autonomous solutions inherently embody "compliance-by-design" architecture.',
    methodology: {
      steps: [
        { title: 'Gap Analysis', description: 'Assessing current posture against target regulatory frameworks (ISO, SOC2).' },
        { title: 'Policy Design', description: 'Drafting robust security policies tailored to organizational structure.' },
        { title: 'Implementation', description: 'Deploying technical and administrative controls to meet compliance requirements.' },
        { title: 'Continuous Monitoring', description: 'Automated tracking to ensure ongoing adherence and prevent compliance drift.' },
      ],
    },
  },
];

// ============================================================================
// WHY VAYUX — Six Core Differentiators
// ============================================================================

export const differentiators = [
  {
    icon: 'FlaskConical',
    title: 'Dynamic R&D Laboratory',
    color: '#2563EB',
    description: 'Unlike traditional service vendors focused on routine maintenance, VayuX functions as a dynamic laboratory where every operational engagement acts as a catalyst for deeper systemic inquiry.',
    status: 'R&D: DYNAMIC',
  },
  {
    icon: 'RefreshCw',
    title: 'Operational Feedback Loop',
    color: '#38BDF8',
    description: 'Real-world telemetry from our specialized services (SOC, VAPT, DFIR, GRC) channels directly into developing next-generation, autonomous security architectures.',
    status: 'FEEDBACK: ACTIVE',
  },
  {
    icon: 'ShieldAlert',
    title: 'Beyond Reactive Monitoring',
    color: '#10B981',
    description: 'We move beyond conventional alert triage by engineering adaptive, high-impact defense mechanisms that proactively secure digital infrastructure against emerging threats.',
    status: 'DEFENSE: ADAPTIVE',
  },
  {
    icon: 'Code2',
    title: 'Applied Technical Engineering',
    color: '#F59E0B',
    description: 'We bridge the gap between fundamental research and applied technical solutions, bringing low-level kernel insights and systems engineering directly to enterprise defense.',
    status: 'ENGINEERING: RIGOROUS',
  },
  {
    icon: 'Server',
    title: 'Strategic Infrastructure Defense',
    color: '#8B5CF6',
    description: 'Engineered for critical domestic and global digital infrastructure. Fully sovereign on-premises deployment ensures customer telemetry stays 100% private.',
    status: 'INFRASTRUCTURE: SOVEREIGN',
  },
  {
    icon: 'CheckCircle2',
    title: 'Architect of a Self-Defending World',
    color: '#059669',
    description: 'Through intellectual rigor and technical agility, VayuX Systems positions itself not merely as a security vendor, but as an architect of a safer, self-defending online world.',
    status: 'VISION: SELF-DEFENDING',
  },
];

// ============================================================================
// VayuX vs Traditional MSSP Comparison
// ============================================================================

export const comparisonDimensions = [
  {
    name: 'Core Operational Focus',
    mssp: { text: 'Routine Maintenance & Static Rules', sub: 'Passive alert forwarding with zero inquiry' },
    vayux: { text: 'Dynamic R&D Laboratory', sub: 'Every engagement fuels systemic research' },
  },
  {
    name: 'Operational Feedback Loop',
    mssp: { text: 'Disconnected Silos', sub: 'Logs are analyzed in isolation without architectural feedback' },
    vayux: { text: 'Continuous R&D Loop', sub: 'Real telemetry from SOC, VAPT, DFIR & GRC improves defense engines' },
  },
  {
    name: 'Defense Methodology',
    mssp: { text: 'Conventional Reactive Monitoring', sub: 'Acts only after a breach alert is triggered' },
    vayux: { text: 'Adaptive Autonomous Architectures', sub: 'Proactively secures infrastructure with self-defending mechanisms' },
  },
  {
    name: 'Specialized Portfolio',
    mssp: { text: 'Basic Alert Reselling', sub: 'Generic MSSP alert dashboards' },
    vayux: { text: 'SOC, VAPT, DFIR & GRC', sub: 'Comprehensive 4-pillar applied technical solutions' },
  },
  {
    name: 'Data Sovereignty',
    mssp: { text: 'Public Cloud Lock-In', sub: 'Telemetry sent to offshore cloud nodes' },
    vayux: { text: '100% Private On-Premises Compute', sub: 'Strict compliance with India\'s DPDP Act 2023' },
  },
  {
    name: 'Compliance & Evidence',
    mssp: { text: 'Manual Ad-Hoc Checklists', sub: 'Slow, error-prone regulatory reporting' },
    vayux: { text: 'Automated Evidence Engine', sub: 'CERT-In 6-hour mandates met automatically' },
  },
];

// ============================================================================
// KEY STATISTICS & METRICS
// ============================================================================

export const performanceMetrics = [
  {
    id: 'alerts',
    display: '10,000+',
    label: 'Alerts Analyzed Per Day',
    icon: 'BarChart3',
  },
  {
    id: 'threats',
    display: '~8',
    label: 'Critical Threats Surfaced (from 10K+)',
    icon: 'Target',
  },
  {
    id: 'cost',
    display: '20–30%',
    label: 'Cost Reduction vs. Traditional MSSPs',
    icon: 'TrendingDown',
  },
  {
    id: 'data',
    display: '0',
    label: 'Data Points Leave Your Premises',
    icon: 'Lock',
  },
  {
    id: 'monitoring',
    display: '24/7',
    label: 'Autonomous Threat Monitoring',
    icon: 'Eye',
  },
];

// ============================================================================
// INDUSTRY VERTICALS — Sector-Specific Threat Focus
// ============================================================================

export const industryVerticals = [
  {
    id: 'manufacturing',
    label: 'Manufacturing',
    icon: 'Factory',
    color: '#F97316',
    threats: [
      'OT/IT convergence attacks',
      'Ransomware on production systems',
      'Supply chain compromise',
    ],
    responses: [
      'IT+OT unified monitoring',
      'Automated asset discovery',
      'Real-time anomaly detection on production networks',
    ],
    stat: '78% of manufacturing firms reported a cyber incident in 2024',
  },
  {
    id: 'pharma',
    label: 'Pharma & Life Sciences',
    icon: 'FlaskConical',
    color: '#8B5CF6',
    threats: [
      'IP theft',
      'Clinical data tampering',
      'Regulatory non-compliance breaches',
    ],
    responses: [
      'R&D data protection',
      'Integrity monitoring',
      'DPDP-aligned patient data security',
    ],
    stat: 'Pharma IP theft costs India ₹2,000+ Cr annually',
  },
  {
    id: 'education',
    label: 'Education & EdTech',
    icon: 'GraduationCap',
    color: '#00AAFF',
    threats: [
      'Student PII exposure',
      'Ransomware on learning platforms',
      'Phishing campaigns targeting staff',
    ],
    responses: [
      'DPDP Act compliance for student data',
      'Endpoint protection',
      'Phishing simulation and response',
    ],
    stat: '87% of education institutions lack a formal incident response plan',
  },
  {
    id: 'financial',
    label: 'Financial Services',
    icon: 'Building2',
    color: '#00FF9C',
    threats: [
      'Transaction fraud',
      'Credential theft',
      'Regulatory audit failures',
    ],
    responses: [
      'RBI compliance monitoring',
      'Fraud detection',
      'Real-time account anomaly alerts',
    ],
    stat: 'Financial fraud incidents up 42% YoY in Indian FinTechs',
  },
  {
    id: 'government',
    label: 'Government & PSUs',
    icon: 'Building',
    color: '#FFB830',
    threats: [
      'Nation-state APT attacks',
      'Data exfiltration',
      'Critical infrastructure disruption',
    ],
    responses: [
      'CERT-In 6-hour mandate compliance',
      'Classified data monitoring',
      'Incident response coordination',
    ],
    stat: 'Government sector tops CERT-In incident reports for the 3rd year running',
  },
];

// ============================================================================
// CAREERS — Fellowship & Employment Opportunities
// ============================================================================

export const careerRoles = [
  {
    icon: 'ShieldAlert',
    title: 'SOC Analyst Fellow',
    tag: 'REMOTE · FELLOWSHIP COHORT (ACADEMIC CREDITS + PERFORMANCE STIPEND)',
    description: 'Analyze live threat intel streams, audit network perimeter logs, and learn Level-1 automated Security Operations Center threat monitoring.',
    subject: 'Application for SOC Analyst Fellow',
  },
  {
    icon: 'Search',
    title: 'DFIR Fellow',
    tag: 'REMOTE · FELLOWSHIP COHORT (ACADEMIC CREDITS + PERFORMANCE STIPEND)',
    description: 'Digital Forensics & Incident Response. Investigate breach simulations, analyze malware artifacts, and reconstruct threat timelines.',
    subject: 'Application for DFIR Fellow',
  },
  {
    icon: 'CheckSquare',
    title: 'GRC Fellow',
    tag: 'REMOTE · FELLOWSHIP COHORT (ACADEMIC CREDITS + PERFORMANCE STIPEND)',
    description: 'Governance, Risk, and Compliance. Research frameworks (ISO 27001, NIST), audit network compliance, and map DPDP Act parameters.',
    subject: 'Application for GRC Fellow',
  },
  {
    icon: 'Code2',
    title: 'Web Developer Fellow',
    tag: 'REMOTE · FELLOWSHIP COHORT (ACADEMIC CREDITS + PERFORMANCE STIPEND)',
    description: 'Create highly performant front-end dashboard panels. Help refine procedural 3D elements and dynamic WebGL frameworks.',
    subject: 'Application for Web Developer Fellow',
  },
  {
    icon: 'PenTool',
    title: 'Technical Writer Fellow',
    tag: 'REMOTE · FELLOWSHIP COHORT (ACADEMIC CREDITS + PERFORMANCE STIPEND)',
    description: 'Deconstruct complex sovereign network architectures, kernel designs, and incident logs into accessible documentation.',
    subject: 'Application for Technical Writer Fellow',
  },
];

// ============================================================================
// CONTACT FORM — Industry Options & Engagement Model
// ============================================================================

export const contactFormData = {
  industries: [
    'Manufacturing',
    'Pharmaceuticals',
    'Education',
    'IT / SaaS',
    'Financial Services',
    'Government & PSUs',
    'Professional Services',
    'Other',
  ],
  benefits: [
    {
      icon: 'ShieldAlert',
      title: 'Private Domestic Compute',
      description: 'Your infrastructure diagnostics run entirely within custom India-hosted infrastructure. No security logs or telemetry ever cross international lines.',
    },
    {
      icon: 'Server',
      title: 'Zero-Cost Threat Mapping',
      description: 'We will map out your current attack surface, verify active vectors, and deliver a comprehensive diagnostic report aligned with CERT-In standards.',
    },
    {
      icon: 'Lock',
      title: 'Regulator Readiness Checks',
      description: 'Understand where your systems stand regarding DPDP Act 2023 requirements, CERT-In six-hour report directives, and ISO 27001 gaps.',
    },
  ],
};

// ============================================================================
// FAQ — By Page
// ============================================================================

export const homeFAQ = [
  {
    question: 'Is it VayuX or Yux? How is your name pronounced?',
    answer: 'Our official name is VayuX Systems (pronounced "VAH-yoo-X"). Because spoken conversations move quickly over the phone, partners and clients often search for us as Yux, Why-UX, or Vayu-X. "Vayu" represents the elemental force of swift intelligence and adaptive movement, while "X" marks our autonomous R&D defense laboratory.',
  },
  {
    question: 'How does the R&D feedback loop integrate with daily operations?',
    answer: 'Our operational SOC environment doubles as a live telemetry source for our research labs. Anomalies detected in client networks inform immediate architectural upgrades which are then deployed autonomously across all partnership nodes.',
  },
  {
    question: "What differentiates a 'Dynamic Laboratory' from an MSSP?",
    answer: 'An MSSP typically manages third-party tools within a defined scope. VayuX acts as a bespoke engineering extension of your organization, developing proprietary countermeasures and architectural adaptations specific to your threat profile.',
  },
  {
    question: 'Are engagement models flexible?',
    answer: 'Yes. While our core offering encompasses complete architectural oversight, we offer specialized tactical engagements for DFIR, targeted VAPT, and critical infrastructure hardening.',
  },
];

export const aboutFAQ = [
  {
    question: 'Why the name VayuX (and why is it sometimes misheard as Yux)?',
    answer: 'VayuX is derived from the Sanskrit word "Vayu" (swift, invisible, yet vital atmosphere and intelligence) merged with "X" (autonomous defense research). In fast phone discussions, listeners occasionally hear "Yux" — so we ensure both paths lead directly to our cybersecurity engineering team.',
  },
  {
    question: 'How do you ensure accountability in automated systems?',
    answer: "Every automated decision made by our defense pipeline is logged and subjected to a transparent audit trail. We employ 'explainable AI' protocols to ensure that all actions are fully comprehensible to human oversight.",
  },
  {
    question: 'What is your protocol for handling system vulnerabilities?',
    answer: 'We operate a proactive security research program and engage in regular red-teaming exercises. Any identified vulnerabilities are addressed through our transparent patching cycle, with full disclosure provided to affected clients upon resolution.',
  },
  {
    question: 'How is client data protected from unauthorized access?',
    answer: 'Client data is secured using military-grade, post-quantum encryption protocols. Our zero-trust architecture ensures that access is strictly compartmentalized, requiring multi-factor authentication for any data interaction.',
  },
];

export const solutionsFAQ = [
  {
    question: 'How does your SOC integrate with our existing stack?',
    answer: 'Our SOC utilizes API-driven ingestion to seamlessly plug into major cloud providers, EDR solutions, and network appliances, requiring minimal configuration on your end.',
  },
  {
    question: 'What is the typical timeframe for a full VAPT engagement?',
    answer: 'Depending on the scope, engagements range from 2 to 4 weeks, culminating in a detailed technical report and a board-level executive summary.',
  },
  {
    question: 'Do you guarantee compliance certification?',
    answer: 'While we do not issue certifications directly, our GRC frameworks are designed to guarantee audit readiness, ensuring smooth evaluations by third-party certifiers.',
  },
];

// ============================================================================
// FOOTER LINKS
// ============================================================================

export const footerLinks = {
  defenseGrid: [
    { label: 'SOC Architecture & Management', href: '/solutions/soc' },
    { label: 'VAPT Simulations', href: '/solutions/vapt' },
    { label: 'DFIR Protocols', href: '/solutions/dfir' },
    { label: 'GRC Alignment', href: '/solutions/grc' },
  ],
  researchLab: [
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Why VayuX', href: '/#why-vayux' },
    { label: 'Technical Insights', href: '/insights' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/legal/privacy' },
    { label: 'Terms of Service', href: '/legal/terms' },
    { label: 'Cookie Policy', href: '/legal/cookies' },
  ],
} as const;

// ============================================================================
// ONBOARDING / ENGAGEMENT PROCESS
// ============================================================================

export const onboardingSteps = [
  {
    number: '01',
    title: 'Initial Signal',
    description: 'Submit your discovery request via the secure portal to establish preliminary contact.',
  },
  {
    number: '02',
    title: 'Threat Assessment',
    description: 'Our operatives conduct an initial passive scan to determine mission scope and risk level.',
  },
  {
    number: '03',
    title: 'Strategic Consultation',
    description: 'Engage in an encrypted video debriefing to architect your custom defense framework.',
  },
  {
    number: '04',
    title: 'Grid Deployment',
    description: 'Active monitoring and countermeasures are initiated across your designated infrastructure.',
  },
];
