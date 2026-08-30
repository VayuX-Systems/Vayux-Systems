export interface GlossaryTerm {
  slug: string;
  term: string;
  acronym?: string;
  category: 'Incident Response' | 'Offensive Security' | 'Operations' | 'Compliance & Governance' | 'Architecture & R&D';
  shortDefinition: string;
  fullDefinition: string;
  whyItMatters: string[];
  keyComponents: { title: string; description: string }[];
  vayuxApproach: string;
  relatedTerms: string[];
  serviceLink: {
    label: string;
    href: string;
  };
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    slug: 'dfir',
    term: 'Digital Forensics and Incident Response',
    acronym: 'DFIR',
    category: 'Incident Response',
    shortDefinition: 'DFIR is a specialized cybersecurity discipline focused on investigating, containing, and remediating security breaches while preserving digital evidence according to legal chain-of-custody standards.',
    fullDefinition: 'Digital Forensics and Incident Response (DFIR) integrates two critical functions: digital forensics (recovering, analyzing, and preserving digital artifacts from volatile memory, storage, and network traffic) and incident response (the organized methodology to detect, contain, eradicate, and recover from cyberattacks). It allows enterprises to rapidly halt adversary progression, understand the full scope of a breach, and establish root-cause attribution.',
    whyItMatters: [
      'Guarantees rapid containment of active ransomware, data exfiltration, and advanced persistent threats (APTs).',
      'Preserves forensically sound evidence conforming to ISO/IEC 27037 standards for legal actions and insurance claims.',
      'Prevents re-infection by identifying deeply buried root causes, persistence mechanisms, and compromised credentials.',
    ],
    keyComponents: [
      { title: 'Volatile Memory Forensics', description: 'Extracting and analyzing active RAM to uncover stealthy code injection and live processes.' },
      { title: 'Timeline Reconstruction', description: 'Correlating event logs, filesystem metadata, and network packets to map the attack sequence.' },
      { title: 'Adversary Attribution', description: 'Mapping observed tactics against the MITRE ATT&CK framework to identify threat actors.' },
      { title: 'Eradication Verification', description: 'Ensuring all backdoors, web shells, and shadow accounts are thoroughly expelled.' },
    ],
    vayuxApproach: 'VayuX Systems pairs 24/7 emergency DFIR response with our proprietary research feedback loop. Threat signatures and zero-day vulnerabilities discovered during forensics are immediately synthesized into adaptive countermeasures across all client networks.',
    relatedTerms: ['mitre-attack-framework', 'indicators-of-compromise', 'volatile-memory-analysis', 'ransomware-response'],
    serviceLink: {
      label: 'Explore VayuX DFIR Services',
      href: '/solutions/dfir',
    },
  },
  {
    slug: 'soc',
    term: 'Security Operations Center',
    acronym: 'SOC',
    category: 'Operations',
    shortDefinition: 'A SOC is a centralized organizational unit responsible for continuously monitoring, detecting, analyzing, and responding to cybersecurity events across enterprise digital assets 24/7/365.',
    fullDefinition: 'A Security Operations Center (SOC) serves as the operational nerve center of enterprise cyber defense. By synthesizing telemetry across endpoints, cloud workloads, network switches, and identity providers, modern SOCs use AI-driven correlation and expert threat hunters to distinguish genuine attacks from background noise and trigger immediate containment protocols.',
    whyItMatters: [
      'Reduces Mean Time to Detect (MTTD) and Mean Time to Respond (MTTR) from months to minutes.',
      'Maintains uninterrupted 24/7 vigilance across distributed global infrastructures.',
      'Prevents alert fatigue through intelligent telemetry correlation and false-positive reduction.',
    ],
    keyComponents: [
      { title: 'Continuous Telemetry Ingestion', description: 'Aggregating structured and unstructured logs from endpoints, cloud infrastructure, and network firewalls.' },
      { title: 'Behavioral Anomaly Detection', description: 'Applying machine-learning models to flag abnormal user behavior and suspicious lateral movement.' },
      { title: 'Automated Playbook Execution', description: 'Instantly executing containment commands (such as host isolation or token revocation) upon high-fidelity alerts.' },
      { title: 'Threat Intelligence Integration', description: 'Continuously enriching incoming telemetry with global IOC feeds and adversary tracking data.' },
    ],
    vayuxApproach: 'VayuX operates an Autonomous SOC model that delivers sub-15ms event correlation latency. Our telemetry streams directly enrich our R&D Laboratory, ensuring your defenses dynamically evolve ahead of emerging threat vectors.',
    relatedTerms: ['dfir', 'siem-vs-soc', 'heuristic-threat-detection', 'threat-hunting-telemetry'],
    serviceLink: {
      label: 'Explore VayuX Managed SOC Operations',
      href: '/solutions/soc',
    },
  },
  {
    slug: 'vapt',
    term: 'Vulnerability Assessment and Penetration Testing',
    acronym: 'VAPT',
    category: 'Offensive Security',
    shortDefinition: 'VAPT combines automated scanning (vulnerability assessment) with manual exploitation simulations (penetration testing) to identify and prove exploitable weaknesses in IT systems.',
    fullDefinition: 'Vulnerability Assessment and Penetration Testing (VAPT) provides an exhaustive offensive security audit. While Vulnerability Assessment identifies and catalogs known flaws across network devices, web applications, and APIs, Penetration Testing safely simulates real-world adversary behavior to exploit those vulnerabilities, demonstrating realistic business impact and providing actionable remediation blueprints.',
    whyItMatters: [
      'Uncovers hidden security gaps before malicious threat actors can discover and weaponize them.',
      'Fulfills strict compliance requirements for ISO 27001, SOC 2, PCI-DSS, and regulatory audits.',
      'Prioritizes remediation efforts by distinguishing theoretical flaws from critically exploitable vulnerabilities.',
    ],
    keyComponents: [
      { title: 'Attack Surface Reconnaissance', description: 'Mapping external and internal asset footprints to expose shadow IT and unpatched interfaces.' },
      { title: 'Adversarial Simulation', description: 'Safely simulating real-world adversary tactics, bypasses, and privilege escalation vectors.' },
      { title: 'Remediation Roadmap', description: 'Delivering prioritized, code-level recommendations to guide engineering teams.' },
      { title: 'Re-Testing Verification', description: 'Validating that applied patches successfully eliminate the exploit vectors without regressions.' },
    ],
    vayuxApproach: 'VayuX VAPT engineers conduct continuous adversarial simulations beyond surface-level scanning. Discoveries feed our vulnerability matrix, automating future detection rules across our client ecosystem.',
    relatedTerms: ['owasp-top-10', 'red-teaming-vs-penetration-testing', 'zero-trust-architecture'],
    serviceLink: {
      label: 'Explore VayuX VAPT Engagements',
      href: '/solutions/vapt',
    },
  },
  {
    slug: 'grc',
    term: 'Governance, Risk, and Compliance',
    acronym: 'GRC',
    category: 'Compliance & Governance',
    shortDefinition: 'GRC is an integrated strategy to manage an enterprise’s cybersecurity governance, address business risks, and ensure adherence to statutory and industry regulations.',
    fullDefinition: 'Governance, Risk, and Compliance (GRC) creates an institutional foundation for security. Governance defines executive oversight, policy architectures, and security mandates. Risk management identifies, quantifies, and mitigates systemic technical vulnerabilities. Compliance ensures continuous alignment with legal, contractual, and regulatory standards like ISO 27001, SOC 2, DPDP Act 2023, and CERT-In directions.',
    whyItMatters: [
      'Eliminates legal liabilities, statutory penalties, and regulatory audits failure risks.',
      'Transforms security from a reactive cost center into an institutional trust enabler for clients and investors.',
      'Prevents compliance drift through continuous telemetry and cryptographic audit verification.',
    ],
    keyComponents: [
      { title: 'Policy & Control Frameworks', description: 'Architecting defensible security policies mapped to ISO 27001, NIST CSF, and CIS Controls.' },
      { title: 'Risk Quantification', description: 'Measuring technical risks in financial and operational business terms to guide capital allocation.' },
      { title: 'Automated Drift Auditing', description: 'Continuously verifying that cloud and infrastructure configurations comply with target benchmarks.' },
      { title: 'Regulatory Liaison', description: 'Ensuring timely, structured incident disclosures conforming to statutory deadlines (e.g., CERT-In 6-hour window).' },
    ],
    vayuxApproach: 'VayuX embeds "Compliance-by-Design" directly into our technical architectures. We translate dense regulatory frameworks into automated technical controls that maintain effortless audit readiness.',
    relatedTerms: ['dpdp-act-2023', 'cert-in-directives', 'iso-27001', 'zero-trust-architecture'],
    serviceLink: {
      label: 'Explore VayuX GRC Compliance Solutions',
      href: '/solutions/grc',
    },
  },
  {
    slug: 'mitre-attack-framework',
    term: 'MITRE ATT&CK Framework',
    acronym: 'ATT&CK',
    category: 'Architecture & R&D',
    shortDefinition: 'MITRE ATT&CK is a globally accessible, curated knowledge base of adversary tactics, techniques, and procedures (TTPs) based on real-world observations.',
    fullDefinition: 'The MITRE Adversarial Tactics, Techniques, and Common Knowledge (ATT&CK) framework categorizes the entire cyberattack lifecycle into specific tactics (the adversary\'s tactical goal, such as Initial Access or Lateral Movement) and techniques (the exact actions used to achieve the goal). It serves as the universal lingua franca for threat hunters, red teams, and incident responders.',
    whyItMatters: [
      'Provides an objective matrix to evaluate the coverage and efficacy of defensive security controls.',
      'Enables standard threat actor profiling and cross-organizational intelligence sharing.',
      'Guides proactive threat hunting by mapping high-probability adversary techniques against internal telemetry.',
    ],
    keyComponents: [
      { title: 'Tactics Matrix', description: 'The 14 enterprise tactical categories spanning Initial Access to Impact.' },
      { title: 'Techniques & Sub-Techniques', description: 'Granular documentation of exact attacker methodologies and execution commands.' },
      { title: 'Mitigations & Detections', description: 'Recommended defensive controls and log data sources required to detect each technique.' },
    ],
    vayuxApproach: 'All VayuX DFIR and SOC investigations map directly to MITRE ATT&CK matrices. This standardized tagging accelerates telemetry ingestion in our R&D lab, driving automated behavioral detection models.',
    relatedTerms: ['dfir', 'soc', 'indicators-of-compromise', 'threat-hunting-telemetry'],
    serviceLink: {
      label: 'View VayuX R&D Capabilities',
      href: '/about',
    },
  },
  {
    slug: 'zero-trust-architecture',
    term: 'Zero Trust Network Architecture',
    acronym: 'ZTNA',
    category: 'Architecture & R&D',
    shortDefinition: 'Zero Trust is a security paradigm rooted in the principle "never trust, always verify," requiring strict identity and device validation for every access request.',
    fullDefinition: 'Zero Trust Network Architecture (ZTNA) eliminates the traditional concept of an implicit trusted network perimeter. Instead, access to every data asset, API endpoint, and workload is dynamically evaluated and cryptographically authenticated based on user context, device posture, location, and data sensitivity, enforcing least-privilege access at all times.',
    whyItMatters: [
      'Prevents lateral attacker movement across internal enterprise networks.',
      'Secures modern decentralized workforces and multi-cloud environments seamlessly.',
      'Reduces the blast radius of compromised credentials through micro-segmentation.',
    ],
    keyComponents: [
      { title: 'Continuous Verification', description: 'Asserting identity and device health on every single connection attempt.' },
      { title: 'Micro-Segmentation', description: 'Isolating workloads and network zones to contain potential intrusions.' },
      { title: 'Least Privilege Enforcement', description: 'Restricting user permissions strictly to the exact resources needed for immediate tasks.' },
    ],
    vayuxApproach: 'VayuX designs decentralized Zero-Trust frameworks using cryptographic consensus and post-quantum encryption protocols to eliminate single points of failure.',
    relatedTerms: ['post-quantum-cryptography', 'grc', 'vapt'],
    serviceLink: {
      label: 'Explore VayuX Architecture Consulting',
      href: '/solutions',
    },
  },
  {
    slug: 'dpdp-act-2023',
    term: 'Digital Personal Data Protection Act 2023',
    acronym: 'DPDP Act',
    category: 'Compliance & Governance',
    shortDefinition: 'The DPDP Act 2023 is India’s principal data privacy law regulating the processing of digital personal data and mandating stringent security safeguards.',
    fullDefinition: 'The Digital Personal Data Protection (DPDP) Act, 2023 establishes a statutory framework for safeguarding personal data of Indian citizens. It mandates explicit consent mechanisms, data fiduciary accountability, purpose limitation, robust data breach reporting, and substantial financial penalties (up to ₹250 crore) for non-compliance and security failures.',
    whyItMatters: [
      'Mandatory legal obligation for all enterprises operating in or serving customers within India.',
      'Requires implementation of reasonable security safeguards to prevent data breaches.',
      'Imposes severe financial penalties and reputational risk for non-compliance.',
    ],
    keyComponents: [
      { title: 'Data Fiduciary Obligations', description: 'Ensuring verifiable consent, data minimization, and accurate processing records.' },
      { title: 'Mandatory Breach Reporting', description: 'Obligation to promptly report personal data breaches to the Data Protection Board of India and affected individuals.' },
      { title: 'Data Principal Rights', description: 'Fulfilling user requests for data access, correction, erasure, and grievance redressal.' },
    ],
    vayuxApproach: 'VayuX provides comprehensive DPDP Act 2023 compliance audits, technical gap assessments, data flow mapping, and automated cryptographic safeguards for enterprise databases.',
    relatedTerms: ['cert-in-directives', 'grc', 'iso-27001'],
    serviceLink: {
      label: 'Explore VayuX GRC Compliance',
      href: '/solutions/grc',
    },
  },
  {
    slug: 'cert-in-directives',
    term: 'CERT-In Cyber Security Directions',
    acronym: 'CERT-In',
    category: 'Compliance & Governance',
    shortDefinition: 'Binding cybersecurity directives issued by the Indian Computer Emergency Response Team (CERT-In) mandating strict logging and 6-hour breach reporting.',
    fullDefinition: 'Issued under Section 70B of the IT Act, CERT-In’s cybersecurity directions require all service providers, intermediaries, data centers, and corporate entities in India to report cybersecurity incidents within 6 hours of discovery, synchronize system clocks with NTP servers, and maintain immutable system logs within Indian jurisdiction for a minimum of 180 days.',
    whyItMatters: [
      'Strict 6-hour incident disclosure mandate requires rapid, battle-tested DFIR capabilities.',
      'Mandatory 180-day log retention demands secure, tamper-proof logging architectures.',
      'Non-compliance can result in statutory sanctions and operational suspension.',
    ],
    keyComponents: [
      { title: '6-Hour Incident Notification', description: 'Fast-track triage and technical notification to CERT-In upon cyber incident confirmation.' },
      { title: '180-Day Secure Log Archival', description: 'Maintaining tamper-evident system and access logs within Indian jurisdiction.' },
      { title: 'NTP Time Synchronization', description: 'Synchronizing all infrastructure clocks to official Indian standard time servers.' },
    ],
    vayuxApproach: 'VayuX DFIR and Managed SOC services are pre-configured to satisfy CERT-In reporting and retention protocols automatically, ensuring instant 6-hour readiness during security crises.',
    relatedTerms: ['dpdp-act-2023', 'dfir', 'soc', 'grc'],
    serviceLink: {
      label: 'Explore VayuX Emergency DFIR & Compliance',
      href: '/solutions/dfir',
    },
  },
  {
    slug: 'post-quantum-cryptography',
    term: 'Post-Quantum Cryptography',
    acronym: 'PQC',
    category: 'Architecture & R&D',
    shortDefinition: 'Cryptographic algorithms engineered to remain secure against decryption attacks by future cryptanalytically relevant quantum computers.',
    fullDefinition: 'Post-Quantum Cryptography (PQC) focuses on developing and deploying mathematical algorithms (such as lattice-based, code-based, and multivariate cryptography) that cannot be solved by quantum computers running Shor’s or Grover’s algorithms. PQC protects long-term sensitive data against "Harvest Now, Decrypt Later" adversary campaigns.',
    whyItMatters: [
      'Neutralizes the imminent obsolescence of RSA and Elliptic Curve Cryptography (ECC).',
      'Protects critical enterprise secrets, IP, and financial assets from future quantum decryption.',
      'Aligns with emerging NIST post-quantum standardization mandates.',
    ],
    keyComponents: [
      { title: 'Lattice-Based Algorithms', description: 'Algorithms (like ML-KEM/Kyber) based on hard geometric lattice problems.' },
      { title: 'Quantum-Resistant Key Exchange', description: 'Securing TLS sessions and communication channels against quantum interception.' },
      { title: 'Crypto-Agility Architecture', description: 'Designing software layers that allow modular algorithm replacement without redesigning applications.' },
    ],
    vayuxApproach: 'The VayuX R&D Lab pioneers quantum-resilient data-in-transit and data-at-rest encryption modules for high-security enterprise and sovereign infrastructures.',
    relatedTerms: ['zero-trust-architecture', 'heuristic-threat-detection'],
    serviceLink: {
      label: 'Read VayuX Research & Capabilities',
      href: '/about',
    },
  },
  {
    slug: 'indicators-of-compromise',
    term: 'Indicators of Compromise',
    acronym: 'IOC',
    category: 'Incident Response',
    shortDefinition: 'Forensic digital artifacts that serve as technical evidence that a computer network or system has been breached or infected.',
    fullDefinition: 'Indicators of Compromise (IOCs) are measurable forensic clues left behind by cyber attackers. These include malicious file hashes (SHA-256), suspicious IP addresses, C2 domain names, registry keys, mutexes, and URI strings. Security teams ingest IOCs into detection systems to quickly identify active infections across fleets.',
    whyItMatters: [
      'Enables rapid, automated endpoint scanning during active DFIR containment.',
      'Facilitates threat intelligence exchange across the global cybersecurity community.',
      'Serves as baseline criteria for configuring firewalls, EDRs, and SIEM correlation rules.',
    ],
    keyComponents: [
      { title: 'Atomic IOCs', description: 'Static indicators like IP addresses and domain names that cannot be broken down further.' },
      { title: 'Computed IOCs', description: 'Cryptographic file hashes and certificate fingerprints derived from forensic artifacts.' },
      { title: 'Behavioral IOCs', description: 'Dynamic execution patterns and unusual process spawn chains.' },
    ],
    vayuxApproach: 'VayuX automatically extracts high-fidelity IOCs during DFIR investigations and immediately converts them into autonomous detection heuristics across our Managed SOC clients.',
    relatedTerms: ['dfir', 'soc', 'mitre-attack-framework', 'threat-hunting-telemetry'],
    serviceLink: {
      label: 'Explore VayuX DFIR Services',
      href: '/solutions/dfir',
    },
  },
  {
    slug: 'heuristic-threat-detection',
    term: 'Heuristic Threat Detection',
    acronym: 'HTD',
    category: 'Architecture & R&D',
    shortDefinition: 'An advanced detection methodology that identifies unknown malware and zero-day threats by analyzing behavioral characteristics rather than static signatures.',
    fullDefinition: 'Unlike traditional signature-based antivirus solutions that rely on known hashes, Heuristic Threat Detection assesses code behavior, execution patterns, memory anomalies, and API call sequences. By identifying suspicious patterns common to malicious activity, heuristic engines catch previously unseen zero-day exploits and polymorphic malware.',
    whyItMatters: [
      'Neutralizes zero-day exploits before public CVE signatures are authored.',
      'Detects polymorphic malware that dynamically mutates its code to evade signature filters.',
      'Powers autonomous, real-time threat containment in modern SOC operations.',
    ],
    keyComponents: [
      { title: 'Dynamic Behavioral Sandbox', description: 'Executing untrusted binaries in isolated memory sandboxes to observe runtime behavior.' },
      { title: 'Rule-Based Heuristics', description: 'Evaluating system calls against known exploit patterns (e.g., process hollowing).' },
      { title: 'Machine-Learning Classifiers', description: 'Statistical models trained on millions of benign and malicious execution profiles.' },
    ],
    vayuxApproach: 'Our proprietary Sentinel neural models utilize multi-vector heuristic analysis to isolate suspicious anomalies at sub-15ms latency, stopping exploits before execution.',
    relatedTerms: ['soc', 'post-quantum-cryptography', 'threat-hunting-telemetry'],
    serviceLink: {
      label: 'Explore VayuX Managed SOC Operations',
      href: '/solutions/soc',
    },
  },
  {
    slug: 'owasp-top-10',
    term: 'OWASP Top 10 Security Risks',
    acronym: 'OWASP',
    category: 'Offensive Security',
    shortDefinition: 'A globally recognized standard consensus document outlining the ten most critical security risks facing modern web applications and APIs.',
    fullDefinition: 'Published by the Open Web Application Security Project (OWASP), the Top 10 represents a prioritized vulnerability framework. It educates developers and security auditors on major weaknesses such as Broken Access Control, Cryptographic Failures, Injection flaws, Insecure Design, and Security Misconfigurations, providing a benchmark for secure software development and penetration testing.',
    whyItMatters: [
      'Serves as the foundation for modern web application security audits and DevSecOps pipelines.',
      'Required compliance benchmark for ISO 27001, PCI-DSS, and regulatory application testing.',
      'Helps development teams focus remediation resources on the most frequently exploited application flaws.',
    ],
    keyComponents: [
      { title: 'Broken Access Control', description: 'Enforcing permissions so that users cannot act outside their intended permissions.' },
      { title: 'Cryptographic Failures', description: 'Protecting data in transit and at rest with robust encryption and key management.' },
      { title: 'Injection Vulnerabilities', description: 'Sanitizing and validating user input to prevent SQL, NoSQL, and OS command injections.' },
    ],
    vayuxApproach: 'VayuX VAPT engineers conduct exhaustive manual and automated assessments mapped directly to the OWASP Top 10, delivering patch-ready code recommendations to engineering teams.',
    relatedTerms: ['vapt', 'red-teaming-vs-penetration-testing'],
    serviceLink: {
      label: 'Explore VayuX VAPT Engagements',
      href: '/solutions/vapt',
    },
  },
  {
    slug: 'red-teaming-vs-penetration-testing',
    term: 'Red Teaming vs Penetration Testing',
    category: 'Offensive Security',
    shortDefinition: 'Penetration testing finds as many technical vulnerabilities as possible; Red Teaming simulates a multi-layered, goal-oriented adversary testing the organization’s overall defensive posture.',
    fullDefinition: 'While Penetration Testing is a scoped exercise aimed at discovering and cataloging technical vulnerabilities across specific systems (applications, networks, APIs), Red Teaming is an unannounced, holistic adversarial simulation. Red teams leverage social engineering, physical intrusion, custom exploit chains, and stealth tactics to achieve a specific mission (e.g., stealing customer databases), testing both technology and human defenders.',
    whyItMatters: [
      'Validates the real-world detection and response effectiveness of the Blue Team / SOC.',
      'Exposes multi-stage attack chains that combine physical, social, and technical vulnerabilities.',
      'Prepares enterprise leadership for actual APT and targeted state-sponsored campaigns.',
    ],
    keyComponents: [
      { title: 'Goal-Oriented Objective', description: 'Testing whether an adversary can breach the company\'s crown-jewel assets.' },
      { title: 'Stealth Execution', description: 'Operating without notifying internal defenders to measure real MTTR and alerting efficiency.' },
      { title: 'Multi-Vector Incursions', description: 'Combining phishing, network exploitation, physical badge cloning, and cloud privilege escalation.' },
    ],
    vayuxApproach: 'VayuX conducts full-spectrum Red Team simulations mimicking advanced adversary TTPs, stress-testing your enterprise defenses before real-world threats strike.',
    relatedTerms: ['vapt', 'mitre-attack-framework', 'soc'],
    serviceLink: {
      label: 'Explore VayuX Offensive Testing',
      href: '/solutions/vapt',
    },
  },
  {
    slug: 'ransomware-response',
    term: 'Ransomware Incident Response',
    category: 'Incident Response',
    shortDefinition: 'A specialized DFIR protocol to contain active encryption, isolate compromised systems, decrypt affected data, and prevent extortion exfiltration.',
    fullDefinition: 'Ransomware Incident Response addresses high-consequence attacks where adversaries encrypt operational systems and threaten to leak stolen data (double extortion). Response protocols encompass urgent network segmentation, volatile artifact recovery, encryption vector identification, root-cause eradication, secure backup recovery, and communication support for compliance authorities and cyber insurers.',
    whyItMatters: [
      'Halts active encryption before it reaches critical backups and core operational databases.',
      'Identifies whether data was exfiltrated to determine statutory DPDP / CERT-In disclosure requirements.',
      'Restores business operations rapidly while preventing subsequent reinfection cycles.',
    ],
    keyComponents: [
      { title: 'Urgent Micro-Segmentation', description: 'Severing lateral movement channels and locking down domain controllers immediately.' },
      { title: 'Ransomware Strain Identification', description: 'Extracting malware binaries to evaluate known decryptors and extortion group TTPs.' },
      { title: 'Clean Environment Restoration', description: 'Rebuilding and restoring systems from isolated, uncorrupted backup snapshots.' },
    ],
    vayuxApproach: 'VayuX provides emergency ransomware containment with guaranteed sub-4-hour SLA, assisting enterprises in stopping active encryption, analyzing extortion payloads, and safely restoring operations.',
    relatedTerms: ['dfir', 'cert-in-directives', 'indicators-of-compromise'],
    serviceLink: {
      label: 'Contact VayuX Emergency DFIR Hotline',
      href: '/solutions/dfir',
    },
  },
  {
    slug: 'threat-hunting-telemetry',
    term: 'Threat Hunting Telemetry',
    category: 'Operations',
    shortDefinition: 'The proactive, hypothesis-driven examination of rich network, endpoint, and identity data to detect stealthy adversaries who have bypassed automated controls.',
    fullDefinition: 'Threat Hunting Telemetry refers to the granular, high-context telemetry data (process spawn trees, DNS queries, authentication logs, file modifications) collected and interrogated by human security analysts. Unlike passive alerting, threat hunting proactively assumes that a breach has already occurred and searches for subtle anomalous behaviors and living-off-the-land techniques.',
    whyItMatters: [
      'Uncovers sophisticated APTs and insider threats that evade automated SIEM rules.',
      'Reduces dwell time of silent attackers within enterprise environments.',
      'Generates unique organization-specific threat intelligence to harden future defenses.',
    ],
    keyComponents: [
      { title: 'Hypothesis Generation', description: 'Formulating search queries based on emerging threat reports and adversary TTPs.' },
      { title: 'Granular Endpoint Telemetry', description: 'Recording child process relationships, DLL injections, and PowerShell command arguments.' },
      { title: 'Iterative Threat Elimination', description: 'Systematically hunting anomalies until the adversary footprint is completely mapped.' },
    ],
    vayuxApproach: 'VayuX utilizes continuous proactive threat hunting across all managed partner nodes. Telemetry insights feed our R&D lab to author proprietary automated detection rules.',
    relatedTerms: ['soc', 'dfir', 'mitre-attack-framework', 'heuristic-threat-detection'],
    serviceLink: {
      label: 'Explore VayuX Threat Research & SOC',
      href: '/solutions/soc',
    },
  },
];
