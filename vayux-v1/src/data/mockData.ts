import { ServiceItem, ResearchArticle, TeamMember, JobOpening, LoopStage } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'managed-soc',
    title: 'Managed SOC',
    isFlagship: true,
    iconName: 'radar',
    description: 'Continuous monitoring and rapid response capability, acting as an extension of your internal engineering team to detect and neutralize threats in real-time.',
    features: [
      '24/7/365 active monitoring',
      'Automated threat triage',
      'Incident containment SLA'
    ],
    route: 'managed-soc'
  },
  {
    id: 'penetration-testing',
    title: 'Penetration Testing',
    iconName: 'my_location',
    description: 'Adversarial simulation targeting your infrastructure and applications to uncover exploitable vulnerabilities before malicious actors do.',
    features: [
      'Network & Application testing',
      'Code-level vulnerability analysis',
      'Actionable remediation planning'
    ],
    route: 'vapt'
  },
  {
    id: 'threat-intelligence',
    title: 'Threat Intelligence',
    iconName: 'search',
    description: 'Curated, contextualized data streams analyzing global threat actor behaviors, customized to your industry and specific technological footprint.',
    features: [
      'Dark web credential monitoring',
      'Industry-specific IOC feeds',
      'Executive risk briefings'
    ],
    route: 'dfir'
  },
  {
    id: 'compliance-auditing',
    title: 'Compliance Auditing',
    iconName: 'fact_check',
    description: 'Rigorous assessment against regulatory frameworks to ensure your technical controls meet mandatory legal and industry standards.',
    features: [
      'SOC2 / ISO 27001 readiness',
      'Control gap analysis',
      'Continuous compliance mapping'
    ],
    route: 'grc'
  },
  {
    id: 'security-training',
    title: 'Security Training',
    iconName: 'school',
    description: 'Technical training programs designed to harden the human element of your organization against social engineering and procedural errors.',
    features: [
      'Phishing simulation campaigns',
      'Secure coding for developers',
      'Executive threat awareness'
    ],
    route: 'training'
  },
  {
    id: 'vciso-consulting',
    title: 'vCISO Consulting',
    iconName: 'chat',
    description: 'Strategic, board-level security leadership provided on-demand to guide security program maturation and resource allocation.',
    features: [
      'Security roadmap development',
      'Board & investor reporting',
      'Vendor risk management'
    ],
    route: 'consultation'
  }
];

export const LOOP_STAGES: LoopStage[] = [
  {
    step: '01',
    label: 'Threat',
    title: 'Threat Detected',
    subtitle: 'Anomalous Activity Trigger',
    description: 'Anomalous activity breaches initial thresholds. Autonomous heuristics instantly isolate vectors, initiating rapid triage while maintaining critical business operations.',
    icon: 'alert-triangle',
    iconColor: '#ff6b6b',
    telemetryOutput: 'High-entropy egress payload detected across TLS session #88219 (ASN 4837). EDR heuristic alert severity 9.4.',
    actions: ['Automated IP quarantine', 'Process execution suspended', 'Memory state snapshot generated'],
    route: 'vapt'
  },
  {
    step: '02',
    label: 'DFIR',
    title: 'DFIR Contains',
    subtitle: 'Digital Forensics & Isolation',
    description: 'Digital Forensics and Incident Response teams engage. Immediate sandbox containment prevents lateral movement, extracting live memory and artifact logs.',
    icon: 'search',
    iconColor: '#5cb3fa',
    telemetryOutput: 'Endpoint isolated in zero-trust sandbox. Triage script extracted 12 active processes, registry run-keys, and unlinked DLL injection artifacts.',
    actions: ['Forensic image acquisition', 'C2 beacon disruption', 'Lateral pivot kill-chain severance'],
    route: 'dfir'
  },
  {
    step: '03',
    label: 'R&D Lab',
    title: 'R&D Lab Analyzes',
    subtitle: 'Sandboxed Reverse Engineering',
    description: 'Novel payloads are detonated in isolated laboratory sandboxes. Disassembly uncovers weaponized techniques, evasion routines, and global indicators of compromise.',
    icon: 'flask-conical',
    iconColor: '#328FDF',
    telemetryOutput: 'Dynamic detonation revealed novel evasion routine bypassing AMSI via memory patching (MITRE ATT&CK T1562.001). 4 C2 domains de-anonymized.',
    actions: ['Static disassembly & decompilation', 'Dynamic payload unpacking', 'Global threat intelligence enrichment'],
    route: 'insights'
  },
  {
    step: '04',
    label: 'SOC',
    title: 'SOC Receives Rules',
    subtitle: 'Global Rule Propagation',
    description: 'Extracted threat intelligence is compiled into Sigma, YARA, and Snort detection rules, instantly propagated across managed SOC nodes for proactive shielding.',
    icon: 'radar',
    iconColor: '#5cb3fa',
    telemetryOutput: 'Generated 3 Sigma rules, 2 YARA signatures, and 14 Suricata IDS signatures. Hot-deployed across SIEM fleet in 118ms.',
    actions: ['Continuous behavioral query execution', 'Zero-day baseline recalibration', 'Autonomous rule validation'],
    route: 'managed-soc'
  },
  {
    step: '05',
    label: 'Training',
    title: 'Security Training',
    subtitle: 'Adaptive Human Hardening',
    description: 'Incident vectors convert into immediate developer micro-trainings and contextual phishing simulations, strengthening the human defense perimeter against zero-day tactics.',
    icon: 'graduation-cap',
    iconColor: '#DCDCDF',
    telemetryOutput: 'Role-based remediation micro-module dispatched to 14 software engineering pods. Social engineering resilience score improved by 34%.',
    actions: ['Custom scenario simulation', 'Developer secure-coding brief', 'Phishing awareness recalibration'],
    route: 'training'
  },
  {
    step: '06',
    label: 'GRC',
    title: 'GRC Recalibrates',
    subtitle: 'Governance & Compliance Hardening',
    description: 'Audit logs, compliance policies, and governance controls are automatically aligned with DPDP Act, ISO 27001, and SOC2 requirements, closing the loop on risk exposure.',
    icon: 'shield-check',
    iconColor: '#328FDF',
    telemetryOutput: 'DPDP Act 2023 compliance audit trail generated. SOC2 Trust Services criteria updated with immutable audit log seal #90214.',
    actions: ['Policy & architecture updates', 'Continuous compliance audit log signed', 'Executive risk ledger sync'],
    route: 'grc'
  }
];

export const RESEARCH_ARTICLES: ResearchArticle[] = [
  {
    id: 'apt29-cloud-evasion',
    category: 'THREAT ADVISORY',
    categoryColor: '#ff6b6b',
    title: "Analysis of APT29's Novel Evasion Techniques in Cloud Environments",
    summary: 'A deep technical dive into recently observed tactics, techniques, and procedures (TTPs) utilized by state-sponsored actors to bypass conventional cloud security logging mechanisms.',
    date: 'Oct 24, 2024',
    readTime: '12 min read',
    featured: true,
    coverImage: undefined,
    author: {
      name: 'Dr. Elena Rostova',
      role: 'Principal Threat Researcher',
      initials: 'ER'
    },
    content: {
      executiveSummary: 'During recent telemetry sweeps across managed enterprise clusters, VayuX Threat Intelligence uncovered an active stealth campaign attributed to APT29 (Cozy Bear). The actor leveraged ephemeral OAuth token tampering combined with serverless telemetry blinding.',
      threatVectors: [
        'MITRE T1078.004: Cloud Accounts abuse via stale federated tokens',
        'MITRE T1562.008: Impair Defenses: Disable Cloud Logs via role assumption flaws',
        'MITRE T1530: Data from Cloud Storage Object replication to unmonitored buckets'
      ],
      technicalDetails: 'The threat actors weaponized compromised tenant configurations by deploying secondary Lambda/Cloud Functions with short execution timeouts designed to intercept and alter audit trails before event ingestion pipelines could commit write locks.',
      indicatorsOfCompromise: [
        { type: 'SHA-256', value: '4a1b63ef8091c5e937d2f01a3962de9837c768910fa89c0942e15bc84f33190a' },
        { type: 'C2 IP', value: '185.220.101.45 (Known Tor Exit Relay)' },
        { type: 'User Agent', value: 'Mozilla/5.0 (VayuX-Discovered APT Custom Engine)' }
      ],
      remediationSteps: [
        'Enforce hardware-bound FIDO2 keys on all cloud tenant IAM principals.',
        'Implement immutable write-once read-many (WORM) storage for cloud audit logs.',
        'Deploy VayuX synthetic anomaly monitors to detect asynchronous API throttling.'
      ]
    }
  },
  {
    id: 'cve-2024-8991',
    category: 'VULNERABILITY',
    categoryColor: '#328FDF',
    title: 'CVE-2024-8991: Privilege Escalation in Core Network Appliances',
    summary: 'Detailed analysis and proof-of-concept for a critical vulnerability affecting widespread network infrastructure devices. Remediation steps included.',
    date: 'Oct 21, 2024',
    readTime: '5 min read',
    author: {
      name: 'M. Reyes',
      role: 'SOC Analyst',
      initials: 'MR'
    },
    content: {
      executiveSummary: 'CVE-2024-8991 allows an unauthenticated attacker on the adjacent network to execute arbitrary code with root privileges through buffer overflow in the administrative RPC handler.',
      threatVectors: ['MITRE T1068: Exploitation for Privilege Escalation', 'MITRE T1190: Exploit Public-Facing Application'],
      technicalDetails: 'An unchecked `memcpy` operation in the packet handling daemon fails to validate the total size parameter received in proprietary heartbeat packets.',
      indicatorsOfCompromise: [
        { type: 'Port', value: 'TCP 8443 / RPC Daemon' },
        { type: 'Pattern', value: '\\x90\\x90\\x90\\xeb\\x1f\\x5e\\x89\\x76\\x08' }
      ],
      remediationSteps: [
        'Upgrade appliance firmware immediately to version 14.8.2-p1 or higher.',
        'Restrict web management interfaces strictly to isolated out-of-band management VLANs.'
      ]
    }
  },
  {
    id: 'sec-disclosure-rules',
    category: 'REGULATORY',
    categoryColor: '#DCDCDF',
    title: "Navigating the SEC's New Incident Disclosure Rules",
    summary: 'A breakdown of the recent changes to mandatory reporting timelines and what it means for enterprise security operations workflows.',
    date: 'Oct 18, 2024',
    readTime: '8 min read',
    author: {
      name: 'S. Chen',
      role: 'Compliance Lead',
      initials: 'SC'
    },
    content: {
      executiveSummary: 'The SEC 4-day material incident disclosure rule demands synchronization between technical SOC metrics and executive disclosure committees.',
      threatVectors: ['Regulatory Non-compliance', 'Delayed Materiality Determination'],
      technicalDetails: 'Enterprises must establish automated materiality triggers based on quantified business impact metrics rather than subjective post-incident appraisals.',
      remediationSteps: [
        'Align SOC triage Severity 1 alerts directly to the General Counsel escalation queue.',
        'Maintain cryptographically timestamped incident timelines using VayuX reporting engines.'
      ]
    }
  },
  {
    id: 'vayux-loop-v2',
    category: 'COMPANY NEWS',
    categoryColor: '#5cb3fa',
    title: 'VayuX Systems Announces Next-Gen Threat Detection Engine',
    summary: "Introducing 'The Loop v2.0', featuring enhanced machine learning models for identifying anomalous behavior in zero-trust architectures.",
    date: 'Oct 15, 2024',
    readTime: '3 min read',
    author: {
      name: 'VayuX Engineering',
      role: 'Systems Architecture',
      initials: 'VX'
    },
    content: {
      executiveSummary: 'The Loop v2.0 introduces real-time feedback loops between sandboxed detonations in our R&D labs and live SIEM agents across all customer environments.',
      threatVectors: ['Automated Rule Generation', 'Zero-latency Telemetry Sync'],
      technicalDetails: 'Through stream processing architectures, newly discovered IOCs propagate to edge detection nodes in under 150 milliseconds globally.',
      remediationSteps: [
        'All existing Managed SOC customers have been seamlessly upgraded without downtime.'
      ]
    }
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'pragnesh-singh',
    name: 'Pragnesh Singh',
    role: 'Founder & Lead Architect',
    bio: 'With over 15 years designing secure infrastructure for critical financial systems, Pragnesh founded VayuX to bring engineering rigor to enterprise security. His philosophy centers on mathematical verifiable security models over heuristic guesswork.',
    certifications: ['CISSP', 'OSCP', 'CISM'],
    isFounder: true
  },
  {
    id: 'sarah-jenkins',
    name: 'Sarah Jenkins',
    role: 'Head of Threat Intel',
    bio: 'Former national cyber defense specialist specializing in nation-state actor profiling, dark web intelligence collection, and predictive threat modeling.',
    certifications: ['OSCE', 'CEH']
  },
  {
    id: 'david-chen',
    name: 'David Chen',
    role: 'Red Team Lead',
    bio: 'Master penetration tester with numerous zero-day credits across enterprise hypervisors, cloud control planes, and embedded hardware security modules.',
    certifications: ['OSCP', 'OSWE']
  },
  {
    id: 'elena-rodriguez',
    name: 'Elena Rodriguez',
    role: 'Compliance Director',
    bio: 'Expert in cross-jurisdictional compliance architectures, guiding organizations through complex SOC2, ISO 27001, DPDP Act 2023, and HIPAA audits.',
    certifications: ['CISA', 'CRISC'],
  }
];

export const JOB_OPENINGS: JobOpening[] = [
  {
    id: 'sr-security-architect',
    title: 'Sr. Security Architect',
    location: 'Remote',
    type: 'Full-time',
    department: 'Engineering',
    description: 'Design and validate zero-trust architectures for Fortune 500 enterprise clients with strict mathematical security models.',
    requirements: [
      '8+ years in cloud infrastructure security (AWS/GCP/Azure)',
      'Deep knowledge of distributed systems cryptography',
      'Track record building verifiable security postures'
    ]
  },
  {
    id: 'penetration-tester',
    title: 'Penetration Tester',
    location: 'Remote',
    type: 'Full-time',
    department: 'Red Team',
    description: 'Execute adversarial simulations against complex multi-cloud and internal enterprise environments.',
    requirements: [
      'OSCP, OSCE, or equivalent hands-on certification',
      'Demonstrated experience in custom exploit development',
      'Solid command of kernel-level privilege escalation'
    ]
  },
  {
    id: 'security-data-engineer',
    title: 'Security Data Engineer',
    location: 'Remote',
    type: 'Full-time',
    department: 'Telemetry & Lab',
    description: 'Scale our petabyte-scale telemetry ingestion engine and real-time detection pipeline for The VayuX Loop.',
    requirements: [
      'Strong proficiency with Rust / Go / Python and stream processing',
      'Experience optimizing distributed SIEM queries and YARA / Sigma rule engines',
      'Understanding of modern endpoint telemetry formats (eBPF, Sysmon, Auditd)'
    ]
  }
];
