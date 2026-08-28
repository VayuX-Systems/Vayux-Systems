// Centralized site data — all content, navigation, team, services, FAQs

export const siteConfig = {
  name: 'VayuX Systems',
  tagline: 'Celestial Security Research & Development',
  description: 'VayuX Systems is an innovation-driven R&D firm leveraging an operational feedback loop to channel real-world insights into next-generation autonomous security architectures.',
  url: 'https://vayux.systems',
  email: 'nexus@vayux.systems',
  phone: '+1 (800) 555-VAYU',
  address: 'Sector 7G, Cyber District\nNeo-Reykjavik',
};

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
] as const;

export const trustBadges = [
  { icon: 'ShieldCheck', label: 'ISO 27001' },
  { icon: 'Lock', label: 'SOC 2 TYPE II' },
  { icon: 'FileCheck', label: 'NIST CSF' },
  { icon: 'Scale', label: 'GDPR COMPLIANT' },
] as const;

export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  fullTitle?: string;
  shortDescription: string;
  flagship?: boolean;
  fullDescription?: string;
  appliedSolutions?: readonly string[];
  techSpecs?: readonly string[];
  feedbackLoop?: string;
  methodology?: {
    steps: readonly { title: string; description: string }[];
  };
}

export const services: readonly ServiceItem[] = [
  {
    id: 'soc',
    icon: 'Radar',
    title: 'Security Operations Center (SOC)',
    fullTitle: 'Security Operations Center (SOC)',
    shortDescription: 'Continuous, luminous oversight of your digital assets. Anticipating anomalies before they manifest through advanced threat telemetry and heuristic behavioral analysis.',
    flagship: true,
    fullDescription: 'Continuous vigilance powered by human expertise and machine precision. Our 24/7 SOC monitors, detects, and neutrally responds to anomalous activities across your digital ecosystem, ensuring unparalleled peace of mind and strategic defense against emerging vectors.',
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
    icon: 'ShieldAlert',
    title: 'VAPT',
    fullTitle: 'Structural Strengthening (VAPT)',
    shortDescription: 'Vulnerability Assessment & Penetration Testing utilizing adversarial simulation techniques.',
    flagship: false,
    fullDescription: 'Vulnerability Assessment & Penetration Testing refined. We conduct rigorous adversarial simulations to illuminate hidden fractures in your digital architecture, delivering actionable remediation strategies that reinforce your security posture.',
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
    id: 'grc',
    icon: 'Scale',
    title: 'GRC',
    fullTitle: 'Harmonious Alignment (GRC)',
    shortDescription: 'Governance, Risk, and Compliance alignment establishing unassailable policy architectures.',
    flagship: false,
    fullDescription: 'Governance, Risk, and Compliance synthesized into an operational advantage. We align your infrastructure with stringent global mandates, transforming regulatory friction into strategic oversight and unassailable data integrity.',
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
  {
    id: 'dfir',
    icon: 'Search',
    title: 'DFIR',
    fullTitle: 'Expert Investigation (DFIR)',
    shortDescription: 'Digital Forensics and Incident Response providing luminous clarity post-breach.',
    flagship: false,
    fullDescription: 'Digital Forensics & Incident Response executed with surgical precision. When crisis strikes, our elite responders isolate threats rapidly, extract deeply buried artifacts, and reconstruct events to restore secure operations swiftly.',
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
    id: 'training',
    icon: 'GraduationCap',
    title: 'Cyber Training',
    shortDescription: 'Elevating human awareness to elite standards, creating a resilient biological firewall.',
    flagship: false,
  },
] as const;

export const coreCapabilities = [
  {
    title: 'Autonomous Threat Neutralization',
    description: 'Leveraging algorithmic heuristics to identify and isolate anomalous behaviors before standard definitions are created, effectively nullifying zero-day vulnerabilities in real-time.',
  },
  {
    title: 'Cryptographic Resilience',
    description: 'Implementing quantum-resistant encryption protocols across all data transit and storage layers, ensuring long-term confidentiality against emerging computational capabilities.',
  },
  {
    title: 'Decentralized Trust Architecture',
    description: 'Moving beyond perimeter defense to a zero-trust model validated through distributed consensus, eliminating single points of failure within organizational networks.',
  },
  {
    title: 'Telemetry & Signal Analysis',
    description: 'Aggregating multi-vector environmental data into a singular pane of luminous clarity, providing operators with actionable intelligence rather than alert fatigue.',
  },
] as const;

export const corePrinciples = [
  {
    icon: 'Eye',
    title: 'Transparency',
    description: 'Clarity in operation. We believe that true security is built on a foundation of observable, verifiable processes rather than obscured complexity.',
  },
  {
    icon: 'Shield',
    title: 'Structural Resilience',
    description: 'Architecture designed to withstand and adapt. Our defense grids are dynamic, absorbing impact and emerging stronger through iterative learning algorithms.',
  },
  {
    icon: 'Heart',
    title: 'Proactive Care',
    description: 'Anticipation over reaction. We deploy predictive models to neutralize vulnerabilities before they manifest, acting as an unseen, benevolent guardian.',
  },
  {
    icon: 'FlaskConical',
    title: 'Scientific Rigor',
    description: 'Empirical validation at every layer. Our protocols are subjected to exhaustive, peer-reviewed testing within controlled adversarial environments.',
  },
] as const;

export const teamMembers = [
  {
    name: 'Dr. Elena Rostova',
    role: 'Chief Defense Architect',
    bio: 'Pioneer in predictive threat modeling and structural resilience algorithms.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfQ2TAtmOIoJqoMRiIBJKD6xcnM1gC8mX-TMwpm3hGJMEfkUB1oLIx1KmSWCBSta5WWNcT1OtrG9Nb7_KxdHJ8zpy4_QHv2r39BxKxMrzImP7Qr6_xRb7tffBJU4wunEx2x4c82bUK2prKaPXwoYEmB4y1dixRKoznycB0YxRj8W3BwBydLiTG5gwDj0AQrIArBd0whc8r3xHmcLB7D2Fb7561tHJp7xczWa9QKF5EFnhmz5nhbZ3h',
  },
  {
    name: 'Marcus Chen',
    role: 'Head of Nexus Analytics',
    bio: 'Lead developer of the transparent verification protocols ensuring operational clarity.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrin1MHds1faAY3qfmRTxNVdncJZETfXOT9Cu_svS6L9x0fiqV9HxQArtdDVC5bMWl81alefTg1CufWhziqMfxHOjcDWHmVZ2HNfoinDD-CazMQZNSmAkfAyvilRxNxcqUB_W49lOu2QLTMvx3BqSAF8aC8OOEfGUIHnU5fFJBYDnlVg7JQdXVleFg8P-V55WzyLLaSaCJz477f-2N5-6vBzIK-CovRyTgjkNxqJ1ZdmUI9OXpZI_e',
  },
  {
    name: 'Sarah Jenkins',
    role: 'Director of Proactive Care',
    bio: 'Specialist in behavioral anticipation and non-invasive guardian system deployment.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABwURX5ygSjYMsB7sxQrku2QzQeAPZdmompUukQAgHNttKOS610Pd6V1JguGVzyN3Ntc6Oy0ZJEeosb4xjItNOoa7v71C3d6Wl1EzwfnZvFQD2i1oN0n-CyISN6vTcfY8CYfHxem7IIgSs-sHSV6JC3p3KZG0AC15IPCq3sUdgPTjt-Omit9zMUfNeVn1BtApfBiQQZ47TQ7lFemQ2dl_JMW238jnWBuT3omoTNklzsMAaoczArr73',
  },
] as const;

export const consultingDeliverables = [
  {
    icon: 'Target',
    title: 'Zero Trust Design',
    description: 'Architecting environments where trust is never assumed, only verified continuously through strong cryptographic assertions. Ideal for safeguarding crown-jewel assets.',
  },
  {
    icon: 'Cloud',
    title: 'Cloud Sovereignty',
    description: 'Ensuring luminous visibility and absolute control across dispersed celestial infrastructures and multi-cloud domains, preventing data leakage.',
  },
  {
    icon: 'GitMerge',
    title: 'M&A Risk Synthesis',
    description: 'Pre-acquisition diligence providing crystal clear insight into structural security debts and software supply chain risks to protect investments.',
  },
  {
    icon: 'TrendingUp',
    title: 'Executive Strategy',
    description: 'Aligning board-level vision with ground-level defensive execution and continuous maturity monitoring, turning security into a business enabler.',
  },
] as const;

export const homeFAQ = [
  {
    question: 'How does the R&D feedback loop integrate with daily operations?',
    answer: 'Our operational SOC environment doubles as a live telemetry source for our research labs. Anomalies detected in client networks inform immediate architectural upgrades which are then deployed autonomously across all partnership nodes.',
  },
  {
    question: "What differentiates a 'Guardian Laboratory' from an MSSP?",
    answer: 'An MSSP typically manages third-party tools within a defined scope. VayuX acts as a bespoke engineering extension of your organization, developing proprietary countermeasures and architectural adaptations specific to your threat profile.',
  },
  {
    question: 'Are engagement models flexible?',
    answer: 'Yes. While our core offering encompasses complete architectural oversight, we offer specialized tactical engagements for DFIR, targeted VAPT, and critical infrastructure hardening.',
  },
] as const;

export const aboutFAQ = [
  {
    question: 'How do you ensure accountability in automated systems?',
    answer: "Every automated decision made by our Nexus framework is logged and subjected to a transparent audit trail. We employ 'explainable AI' protocols to ensure that all actions are fully comprehensible to human oversight.",
  },
  {
    question: 'What is your protocol for handling system vulnerabilities?',
    answer: 'We operate a proactive bug bounty program and engage in regular red-teaming exercises. Any identified vulnerabilities are addressed through our transparent patching cycle, with full disclosure provided to affected clients upon resolution.',
  },
  {
    question: 'How is client data protected from unauthorized access?',
    answer: 'Client data is secured using military-grade, post-quantum encryption protocols. Our zero-trust architecture ensures that access is strictly compartmentalized, requiring multi-factor, biometric authentication for any data interaction.',
  },
] as const;

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
] as const;

export const insightsFAQ = [
  {
    question: 'How frequently are advisories updated?',
    answer: 'Threat landscape reports are published quarterly, while critical advisories are released in real-time as zero-day vulnerabilities are identified by our Sentinel AI.',
  },
  {
    question: 'Can I use your research in academic papers?',
    answer: 'Yes, all whitepapers and lab notes are available under a Creative Commons Attribution-NonCommercial license. Please cite VayuX Systems accordingly.',
  },
  {
    question: 'How do I access restricted threat data?',
    answer: 'Access to raw, anonymized threat telemetry requires a verified Enterprise Secure Portal account and adherence to our strict data handling protocols.',
  },
] as const;

export const contactFAQ = [
  {
    question: 'How do collaborative research frameworks function?',
    answer: 'Our research frameworks operate on a principle of shared intelligence in a zero-trust environment. We establish secure, partitioned data enclaves where your analysts and our AI threat-hunting agents can co-examine anomalies without exposing core institutional data.',
  },
  {
    question: 'What is the onboarding process for Consultancy as a Service?',
    answer: 'After initial consultation, we conduct a comprehensive security posture assessment, design a bespoke engagement framework, and establish secure communication channels before deployment of our elite operatives.',
  },
  {
    question: 'Can Corporate Training be customized for our security teams?',
    answer: 'Absolutely. Our training programs are fully modular and can be tailored to address specific skill gaps, compliance requirements, and organizational threat landscapes.',
  },
] as const;

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
] as const;

export const knowledgeBase = [
  {
    icon: 'Terminal',
    title: 'API Documentation',
    description: 'Integration guides and endpoints for the VayuX Sentinel platform.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Encryption Standards',
    description: 'Details on our proprietary AES-256 and post-quantum protocols.',
  },
  {
    icon: 'Cpu',
    title: 'AI Modeling',
    description: 'Understanding the neural networks powering threat detection.',
  },
  {
    icon: 'FileCheck',
    title: 'Compliance Frameworks',
    description: 'Mapping our security posture to SOC2, ISO27001, and GDPR.',
  },
] as const;

export const footerLinks = {
  defenseGrid: [
    { label: 'SOC Architecture', href: '/solutions' },
    { label: 'VAPT Simulations', href: '/solutions' },
    { label: 'DFIR Protocols', href: '/solutions' },
    { label: 'GRC Alignment', href: '/solutions' },
  ],
  researchLab: [
    { label: 'Methodology', href: '/insights' },
    { label: 'Technical Briefs', href: '/insights' },
    { label: 'Global Sentinel Network', href: '/contact' },
  ],
  legalVault: [
    { label: 'Security Protocols', href: '/legal' },
    { label: 'Privacy Vault', href: '/legal' },
    { label: 'Terms of Engagement', href: '/legal' },
  ],
} as const;
