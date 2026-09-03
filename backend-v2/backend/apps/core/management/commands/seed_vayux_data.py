from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
import datetime

from apps.site_config.models import SiteConfiguration, LegalDocument
from apps.content_cms.models import (
    PageSectionContent, AboutUs, TeamMember, CompanyCredential,
    Solution, Category, Article, ResearchProject, GlossaryTerm
)
from apps.careers.models import JobRole
from apps.seo_engine.models import PageSEO, FAQItem
from apps.geo_engine.models import SocNode, RegionalComplianceRule

User = get_user_model()

class Command(BaseCommand):
    help = 'Seeds full production frontend data into VayuX Sentinel backend database'

    def handle(self, *args, **options):
        self.stdout.write(self.style.NOTICE("Initializing Full Frontend Data Seeding for VayuX Sentinel..."))

        # -----------------------------------------------------------------
        # 1. Superuser
        # -----------------------------------------------------------------
        admin_user, created = User.objects.get_or_create(
            username='admin',
            defaults={
                'email': 'admin@vayux.systems',
                'is_staff': True,
                'is_superuser': True,
                'role': 'ADMIN',
                'title': 'Sentinel Director',
            }
        )
        if created:
            admin_user.set_password('VayuxSentinel2026!')
            admin_user.save()
            self.stdout.write(self.style.SUCCESS("[OK] Created Superuser: admin / VayuxSentinel2026!"))
        else:
            self.stdout.write("[INFO] Superuser already exists.")

        # -----------------------------------------------------------------
        # 2. Site Configuration & Master Contacts
        # -----------------------------------------------------------------
        config = SiteConfiguration.load()
        config.company_name = "VayuX Systems"
        config.legal_name = "VayuX Systems Private Limited"
        config.tagline = "Architecting a Safer, Self-Defending Online World"
        config.support_email = "nexus@vayux.systems"
        config.emergency_dfir_email = "admin@vayux.systems"
        config.careers_email = "careers@vayux.systems"
        config.primary_phone = "+91-8200677905"
        config.emergency_phone = "+91-8200677905"
        config.headquarters_city = "Vadodara"
        config.headquarters_state = "Gujarat"
        config.headquarters_country = "India"
        config.headquarters_address = "Sector 7G, Cyber District, Vadodara, Gujarat - 390001"
        config.linkedin_url = "https://www.linkedin.com/company/vayux-systems"
        config.github_url = "https://github.com/vayux-systems"
        config.twitter_x_url = "https://twitter.com/VayuXSystems"
        config.soc_sla_response_time = "Sub-15ms Event Correlation Latency"
        config.dfir_emergency_sla = "Sub-4-Hour Emergency Deployment Guarantee"
        config.operating_hours = "24/7/365 Continuous SOC & Emergency DFIR Dispatch"
        config.copyright_text = "© 2026 VayuX Systems Private Limited. All rights reserved."
        config.save()
        self.stdout.write(self.style.SUCCESS("[OK] Seeded Master SiteConfiguration"))

        # -----------------------------------------------------------------
        # 3. Page Section Headings & Badges
        # -----------------------------------------------------------------
        sections = [
            {
                'section_key': 'home-hero',
                'badge_text': '🔒 Sovereign Cyber Defense Nexus',
                'heading': 'Architecting a Safer, Self-Defending',
                'highlight_text': 'Online World',
                'subheading': 'VayuX Systems is an innovation-driven cybersecurity R&D firm leveraging an operational feedback loop to channel real-world telemetry into autonomous security architectures.',
            },
            {
                'section_key': 'about-hero',
                'badge_text': '🛡️ The Genesis of Sovereign Defense',
                'heading': 'Architects of',
                'highlight_text': 'Protection',
                'subheading': 'Constructing unassailable digital environments through luminous clarity, scientific rigor, and an operational feedback loop.',
            },
            {
                'section_key': 'solutions-hero',
                'badge_text': '⚡ Defense Pillars & Research',
                'heading': 'Bespoke Defense',
                'highlight_text': 'Architectures',
                'subheading': 'Explore our specialized operational capabilities: 24/7 Managed SOC, Offensive VAPT, GRC Governance, and Surgical DFIR Incident Response.',
            },
            {
                'section_key': 'insights-hero',
                'badge_text': '📖 Research & Thought Leadership',
                'heading': 'Reflections on',
                'highlight_text': 'Autonomy',
                'subheading': 'Technical insights, threat research papers, and deep dives into autonomous security architectures from the VayuX research laboratory.',
            },
            {
                'section_key': 'careers-hero',
                'badge_text': '📡 Join the Grid',
                'heading': 'Build the',
                'highlight_text': 'Future of Defense',
                'subheading': 'We are recruiting the next generation of security researchers, system engineers, and code architects in Vadodara and remote.',
            },
            {
                'section_key': 'contact-hero',
                'badge_text': '🔒 Encrypted Nexus Channel',
                'heading': 'Initiate',
                'highlight_text': 'Contact',
                'subheading': 'Establish a secure connection with our defense nexus. Request an elite partnership for architectural consultation, training, or advanced research collaboration.',
            },
            {
                'section_key': 'lab-vs-vendor',
                'badge_text': '🔬 THE LAB VS. THE VENDOR',
                'heading': 'Why Sovereign Defense',
                'highlight_text': 'Demands a Lab',
                'subheading': 'Traditional MSSPs resell off-the-shelf software. VayuX operates as a living R&D laboratory engineering custom defensive countermeasures.',
                'extra_data': {
                    'vendor_points': ['Resells generic commercial tools', 'Passive reactive ticketing', 'Zero feedback into vulnerability research', 'Generic compliance checkmarks'],
                    'lab_points': ['Proprietary autonomous correlation engine', 'Proactive sub-15ms event triage', 'Every incident feeds R&D neural models', 'Continuous sovereign compliance (DPDP/CERT-In)']
                }
            }
        ]
        for sec in sections:
            PageSectionContent.objects.update_or_create(section_key=sec['section_key'], defaults=sec)
        self.stdout.write(self.style.SUCCESS("[OK] Seeded 7 Page Section Headings"))

        # -----------------------------------------------------------------
        # 4. Legal Documents
        # -----------------------------------------------------------------
        legal_docs = [
            {
                'doc_type': 'TERMS',
                'title': 'Terms of Engagement & Service',
                'slug': 'terms',
                'version': '2.1',
                'effective_date': datetime.date(2026, 1, 1),
                'summary': 'General terms governing client engagements, security assessments, and intellectual property.',
                'content': '''# Terms of Engagement & Service

## 1. Master Engagement Framework
All security audits, penetration testing, SOC oversight, and emergency incident response provided by VayuX Systems Private Limited are conducted under strict mutual Non-Disclosure Agreements (NDA) and authorized Rules of Engagement (ROE).

## 2. Authorization & Safe Harbor
Client expressly authorizes VayuX Systems to perform security testing and telemetry analysis across designated cloud and on-premise assets. VayuX operates strictly within agreed parameters to prevent operational disruption.

## 3. Intellectual Property & Research Synthesis
Client retains sole ownership of proprietary data and internal systems. VayuX retains ownership of general anonymized threat heuristics, vulnerability research patterns, and autonomous detection models developed during engagements.

## 4. Limitation of Liability
VayuX Systems provides defense architectures based on current threat landscape intelligence. Maximum liability under any engagement shall not exceed the fees paid for the specific service during the preceding 12 months.''',
            },
            {
                'doc_type': 'PRIVACY',
                'title': 'Privacy & Telemetry Protection Policy',
                'slug': 'privacy',
                'version': '2.0',
                'effective_date': datetime.date(2026, 1, 1),
                'summary': 'How VayuX handles client contact data and anonymizes threat telemetry.',
                'content': '''# Privacy & Telemetry Protection Policy

## 1. Zero-PII Threat Telemetry
VayuX Systems adheres to a strict "Privacy by Design" architecture. During 24/7 SOC monitoring or DFIR triage, operational telemetry (file hashes, process trees, network anomalies) is processed in isolated memory enclaves and stripped of Personally Identifiable Information (PII).

## 2. Inbound Signal Protection
Contact information submitted through our "Transmit Signal" portal is encrypted and routed exclusively to Sentinel Command on-call coordinators. We never sell, lease, or share client information with third parties.

## 3. Data Residency & Sovereignty
In accordance with the DPDP Act 2023 and Indian sovereign requirements, all primary client databases and forensic logs are maintained within Indian jurisdiction unless explicitly contracted otherwise.''',
            },
            {
                'doc_type': 'DPDP',
                'title': 'DPDP Act 2023 Compliance Framework',
                'slug': 'dpdp',
                'version': '1.0',
                'effective_date': datetime.date(2026, 1, 1),
                'summary': 'Compliance alignment with Indias Digital Personal Data Protection Act 2023.',
                'content': '''# DPDP Act 2023 Sovereign Alignment

## 1. Data Fiduciary Responsibilities
VayuX Systems ensures complete adherence to the obligations outlined in the Digital Personal Data Protection Act 2023, including verifiable consent, data minimization, and timely grievance redressal.

## 2. CERT-In Incident Notification
Our DFIR protocols are engineered to satisfy the mandatory CERT-In 6-hour incident disclosure timeframe with court-admissible forensic documentation.''',
            },
            {
                'doc_type': 'SECURITY',
                'title': 'Responsible Security Disclosure Policy',
                'slug': 'security-disclosure',
                'version': '1.0',
                'effective_date': datetime.date(2026, 1, 1),
                'summary': 'Guidelines for ethical researchers discovering vulnerabilities in VayuX infrastructure.',
                'content': '''# Responsible Security Disclosure Policy

VayuX Systems welcomes security researchers to test our public perimeters in good faith. Please report any potential vulnerabilities to security@vayux.systems with reproducible proof-of-concept steps. We guarantee safe harbor for researchers adhering to our disclosure guidelines.''',
            }
        ]
        for l_doc in legal_docs:
            LegalDocument.objects.update_or_create(doc_type=l_doc['doc_type'], defaults=l_doc)
        self.stdout.write(self.style.SUCCESS("[OK] Seeded 4 Legal Documents"))

        # -----------------------------------------------------------------
        # 5. About Us, Team & Credentials
        # -----------------------------------------------------------------
        about = AboutUs.load()
        about.hero_badge = "Sovereign Defense Architecture"
        about.hero_title = "The Genesis of Sovereign Defense"
        about.hero_subtitle = "Constructing unassailable defensive architectures through deep R&D and operational threat telemetry."
        about.founding_story = "Founded in 2024 in Vadodara, Gujarat, VayuX Systems was established as an innovation-driven laboratory designed to replace static security tools with autonomous, self-defending architectures. By channeling real-world incident response and SOC telemetry directly into low-level systems research, VayuX engineers defense that evolves faster than adversaries."
        about.leadership_quote = "True cyber sovereignty is not bought off the shelf; it is forged through rigorous offensive research."
        about.leader_name = "Pragnesh Kumar S. Singh"
        about.leader_title = "Founder & Chief Technology Officer"
        about.core_principles = [
            {"title": "Autonomous Defense", "desc": "Sub-second algorithmic mitigation without waiting for human intervention."},
            {"title": "Operational Feedback Loop", "desc": "Frontline incident telemetry continuously trains detection heuristics."},
            {"title": "Zero-Trust Engineering", "desc": "Continuous cryptographic verification at every boundary, protocol, and identity layer."},
            {"title": "Scientific Rigor", "desc": "Empirical validation within controlled adversarial simulation environments."}
        ]
        about.save()

        # Team Members (Founder & Core Leadership)
        TeamMember.objects.all().delete()
        team_members = [
            {
                'name': 'Pragnesh Kumar S. Singh',
                'role_designation': 'Founder & Chief Technology Officer',
                'bio': 'Architecting autonomous, self-defending digital infrastructure through fundamental cybersecurity research and applied systems defense. Deep expertise in kernel architecture, vulnerability research, and low-level systems engineering.',
                'linkedin_url': 'https://www.linkedin.com/in/pragnesh-singh-rajput/',
                'github_url': 'https://github.com/pragnesh-singh-rajput',
                'is_founder': True,
                'display_order': 1,
                'is_active': True,
            },
            {
                'name': 'Vikramaditya Sharma',
                'role_designation': 'Co-Founder & VP of Systems Defense',
                'bio': 'Leading low-level kernel security and real-time event telemetry pipelines. Specialist in memory resident exploit mitigation and distributed cyber defense architectures.',
                'linkedin_url': 'https://www.linkedin.com/company/vayux-systems',
                'github_url': 'https://github.com/vayux-systems',
                'is_founder': True,
                'display_order': 2,
                'is_active': True,
            },
            {
                'name': 'Aarav Patel',
                'role_designation': 'Head of Threat Intelligence & Neural Modeling',
                'bio': 'Pioneer in predictive behavioral heuristics, autonomous anomaly scoring, and sub-15ms event correlation engines trained on live operational SOC telemetry.',
                'linkedin_url': 'https://www.linkedin.com/company/vayux-systems',
                'github_url': 'https://github.com/vayux-systems',
                'is_founder': False,
                'display_order': 3,
                'is_active': True,
            },
            {
                'name': 'Nandini Joshi',
                'role_designation': 'Director of Sovereign GRC & Compliance',
                'bio': 'Specialist in DPDP Act 2023 statutory alignment, CERT-In mandatory disclosure runbooks, and continuous zero-trust governance architectures.',
                'linkedin_url': 'https://www.linkedin.com/company/vayux-systems',
                'github_url': 'https://github.com/vayux-systems',
                'is_founder': False,
                'display_order': 4,
                'is_active': True,
            },
        ]
        for tm in team_members:
            TeamMember.objects.create(**tm)

        # Credentials & Badges (Clean 6 unique items)
        CompanyCredential.objects.all().delete()
        creds = [
            {'name': 'ISO 27001', 'category': 'Certification', 'badge_label': 'VERIFIED', 'issuing_body': 'International Organization for Standardization', 'description': 'Information Security Management', 'display_order': 1},
            {'name': 'SOC 2 TYPE II', 'category': 'Certification', 'badge_label': 'COMPLIANT', 'issuing_body': 'AICPA', 'description': 'Security & Confidentiality Trust Services', 'display_order': 2},
            {'name': 'NIST CSF', 'category': 'Framework', 'badge_label': 'ALIGNED', 'issuing_body': 'NIST', 'description': 'Cybersecurity Framework Alignment', 'display_order': 3},
            {'name': 'DPDP Act 2023', 'category': 'Statutory', 'badge_label': 'SOVEREIGN READY', 'issuing_body': 'MeitY (India)', 'description': 'Data Sovereignty & Privacy Mandates', 'display_order': 4},
            {'name': 'CERT-In Directives', 'category': 'Compliance', 'badge_label': '6-HR REPORTING READY', 'issuing_body': 'CERT-In', 'description': 'Mandatory Incident Notification', 'display_order': 5},
            {'name': 'Startup Gujarat & MSME', 'category': 'Registration', 'badge_label': 'GOVT REGISTERED', 'issuing_body': 'Govt. of Gujarat / MSME', 'description': 'Recognized R&D Cyber Defense Entity', 'display_order': 6},
        ]
        for c in creds:
            CompanyCredential.objects.create(**c)
        self.stdout.write(self.style.SUCCESS("[OK] Seeded Real Leadership (Pragnesh Kumar S. Singh) & 6 Unique Credentials"))

        # -----------------------------------------------------------------
        # 6. Detailed Defense Pillars / Solutions
        # -----------------------------------------------------------------
        solutions_data = [
            {
                'name': 'Security Operations Center (SOC)',
                'slug': 'soc',
                'tagline': 'Continuous 24/7 Luminous Threat Detection & Autonomous Response',
                'lead_definition': 'VayuX Managed SOC provides 24/7 continuous detection and automated incident containment with sub-15ms event correlation and human-in-the-loop analyst triage.',
                'full_description': 'Continuous vigilance powered by human expertise and machine precision. Our 24/7 SOC monitors, detects, and neutrally responds to anomalous activities across your digital ecosystem, ensuring unparalleled peace of mind and strategic defense against emerging vectors.',
                'sla_commitment': 'Sub-15ms Event Correlation Latency',
                'key_metrics': [{'label': 'Correlation', 'val': '<15ms'}, {'label': 'Uptime', 'val': '99.99%'}, {'label': 'Coverage', 'val': '24/7/365'}],
                'methodology_steps': [
                    {'title': 'Ingestion', 'description': 'Centralizing logs and telemetry from all endpoints, networks, and cloud services.'},
                    {'title': 'Detection', 'description': 'Applying AI heuristics and threat intelligence to identify anomalous behavior.'},
                    {'title': 'Triage & Analysis', 'description': 'Expert analysts investigate alerts to separate false positives from real threats.'},
                    {'title': 'Containment', 'description': 'Automated and manual responses to isolate compromised systems immediately.'},
                ],
                'capabilities_list': [
                    'Executive Dashboard & Clarity Reports',
                    'Instant Threat Containment',
                    'Uninterrupted Business Continuity',
                    'Real-time Telemetry Pipeline',
                    'Heuristic & Signature AI Detection',
                    'Sub-15ms Event Correlation Latency',
                ],
                'rd_feedback_loop': 'Anomalies identified by our SOC analysts are fed directly into VayuX R&D. This active threat intelligence continuously trains our autonomous security models, evolving our defensive grid ahead of adversary tactics.',
                'display_order': 1,
            },
            {
                'name': 'Vulnerability Assessment & Penetration Testing (VAPT)',
                'slug': 'vapt',
                'tagline': 'Structural Strengthening Through Rigorous Adversarial Simulation',
                'lead_definition': 'VayuX VAPT services execute comprehensive adversarial simulation across web, cloud, API, and network perimeters with zero-day vulnerability discovery.',
                'full_description': 'Vulnerability Assessment & Penetration Testing refined. We conduct rigorous adversarial simulations to illuminate hidden fractures in your digital architecture, delivering actionable remediation strategies that reinforce your security posture.',
                'sla_commitment': 'Zero False-Positive Verification & Exploit Proof',
                'key_metrics': [{'label': 'Coverage', 'val': '100% OWASP'}, {'label': 'Verification', 'val': 'Manual Proof'}, {'label': 'Retesting', 'val': 'Included'}],
                'methodology_steps': [
                    {'title': 'Reconnaissance', 'description': 'Mapping the entire external and internal attack surface to identify all exposed assets.'},
                    {'title': 'Vulnerability Scanning', 'description': 'Automated and manual probing for known weaknesses and misconfigurations.'},
                    {'title': 'Exploitation', 'description': 'Safely simulating attacks to determine the impact of discovered vulnerabilities.'},
                    {'title': 'Reporting & Remediation', 'description': 'Delivering actionable insights with prioritized patching recommendations.'},
                ],
                'capabilities_list': [
                    'Board-Ready Risk Assessments',
                    'Pre-emptive Exploit Mitigation',
                    'Phased Remediation Blueprints',
                    'OWASP Top 10 Eradication',
                    'Attack Surface Mapping & Reduction',
                    'Automated CI/CD Security Hooks',
                ],
                'rd_feedback_loop': 'Exploit paths discovered during VAPT engagements are cataloged in our proprietary vulnerability matrix. This data drives the creation of new automated scanning heuristics and resilience patterns deployed across all client environments.',
                'display_order': 2,
            },
            {
                'name': 'Governance, Risk, and Compliance (GRC)',
                'slug': 'grc',
                'tagline': 'Harmonious Alignment Establishing Unassailable Policy Architectures',
                'lead_definition': 'VayuX GRC advisory aligns enterprise security infrastructure with the DPDP Act 2023, CERT-In mandatory directives, ISO 27001, and SOC 2 Type II frameworks.',
                'full_description': 'Governance, Risk, and Compliance synthesized into an operational advantage. We align your infrastructure with stringent global mandates, transforming regulatory friction into strategic oversight and unassailable data integrity.',
                'sla_commitment': 'Audit-Ready Sovereign Roadmap',
                'key_metrics': [{'label': 'Frameworks', 'val': 'DPDP / ISO / SOC2'}, {'label': 'Reporting', 'val': 'CERT-In Ready'}],
                'methodology_steps': [
                    {'title': 'Gap Analysis', 'description': 'Assessing current posture against target regulatory frameworks (ISO, SOC2, DPDP).'},
                    {'title': 'Policy Design', 'description': 'Drafting robust security policies tailored to organizational structure.'},
                    {'title': 'Implementation', 'description': 'Deploying technical and administrative controls to meet compliance requirements.'},
                    {'title': 'Continuous Monitoring', 'description': 'Automated tracking to ensure ongoing adherence and prevent compliance drift.'},
                ],
                'capabilities_list': [
                    'Streamlined Audit Readiness',
                    'Enterprise Risk Quantification',
                    'Robust Policy Frameworks',
                    'ISO 27001 & SOC2 Mapping Matrix',
                    'Automated Compliance Drift Alerts',
                    'Cryptographic Audit Trails',
                ],
                'rd_feedback_loop': 'Navigating complex regulatory shifts informs our engineering design principles. Our R&D lab ingests GRC constraint models to ensure all VayuX autonomous solutions inherently embody "compliance-by-design" architecture.',
                'display_order': 3,
            },
            {
                'name': 'Digital Forensics and Incident Response (DFIR)',
                'slug': 'dfir',
                'tagline': 'Surgical Emergency Breach Containment & Court-Admissible Forensics',
                'lead_definition': 'VayuX DFIR service provides guaranteed sub-4-hour emergency breach containment, memory volatility extraction, and court-admissible chain-of-custody evidence preservation.',
                'full_description': 'Digital Forensics & Incident Response executed with surgical precision. When crisis strikes, our elite responders isolate threats rapidly, extract deeply buried artifacts, and reconstruct events to restore secure operations swiftly.',
                'sla_commitment': 'Sub-4-Hour Emergency Deployment Guarantee',
                'key_metrics': [{'label': 'Emergency SLA', 'val': '<4 Hours'}, {'label': 'Hotline', 'val': '24/7/365'}],
                'methodology_steps': [
                    {'title': 'Preparation', 'description': 'Establishing baseline readiness, runbooks, and communication channels pre-incident.'},
                    {'title': 'Identification', 'description': 'Confirming breach occurrence, defining scope, and gathering volatile memory artifacts.'},
                    {'title': 'Containment & Eradication', 'description': 'Removing attacker presence, malware, and closing entry vectors securely.'},
                    {'title': 'Recovery & Lessons', 'description': 'Restoring systems to normal operations with enhanced monitoring for reinfection.'},
                ],
                'capabilities_list': [
                    'Immediate Crisis Containment',
                    'Decisive Root Cause Analysis',
                    'Strategic Recovery & Resilience',
                    'Memory Volatility Extraction',
                    'Deep TTP Mapping & Analysis',
                    'Immutable Artifact Preservation',
                ],
                'rd_feedback_loop': 'Post-incident forensic timelines and zero-day signatures are rigorously analyzed in our lab. This post-mortem intelligence fuels the development of our predictive defense mechanisms, ensuring novel attacks are neutralized globally.',
                'display_order': 4,
            },
        ]
        for s_data in solutions_data:
            Solution.objects.update_or_create(slug=s_data['slug'], defaults=s_data)
        self.stdout.write(self.style.SUCCESS("[OK] Seeded 4 Detailed Solutions (SOC, VAPT, GRC, DFIR)"))

        # -----------------------------------------------------------------
        # 7. Categories & Research Articles
        # -----------------------------------------------------------------
        categories = [
            {'name': 'Research', 'slug': 'research', 'description': 'Autonomous defense & neural modeling'},
            {'name': 'Compliance', 'slug': 'compliance', 'description': 'Regulatory roadmaps & sovereign frameworks'},
            {'name': 'Architecture', 'slug': 'architecture', 'description': 'Zero trust & quantum cryptography'},
            {'name': 'Incident Response', 'slug': 'incident-response', 'description': 'DFIR playbooks & field notes'},
            {'name': 'Threat Intelligence', 'slug': 'threat-intelligence', 'description': 'Adversary campaigns & telemetry'},
            {'name': 'Security Research', 'slug': 'security-research', 'description': 'Offensive vulnerability deep-dives'},
        ]
        for cat in categories:
            Category.objects.update_or_create(slug=cat['slug'], defaults=cat)

        articles = [
            {
                'id': 'autonomous-soc-evolution',
                'title': 'The Evolution of Autonomous SOC: From Alert Triage to Threat Prediction',
                'slug': 'autonomous-soc-evolution',
                'category_slug': 'research',
                'author_name': 'Pragnesh Kumar S. Singh',
                'author_role': 'Founder & CTO',
                'excerpt': 'Exploring how artificial intelligence and machine learning are transforming security operations centers from reactive alert handlers to proactive threat prediction engines.',
                'content': '''# The Evolution of Autonomous SOC: From Alert Triage to Threat Prediction

## 1. The Alert Fatigue Crisis
Traditional Security Operations Centers (SOCs) are overwhelmed by tens of thousands of alerts generated daily by SIEM and EDR platforms. Human analysts spend up to 70% of their operational hours triaging false positives, creating dangerous blind spots.

## 2. Sub-15ms Event Correlation
VayuX Systems addresses this fundamental bottleneck through an autonomous correlation engine. By ingesting unstructured telemetry across endpoints, network perimeters, and cloud control planes, our neural models correlate related events within 15 milliseconds.

## 3. The Operational Feedback Loop
Every threat signature and anomaly detected during active client defense is sanitized and channeled back into our R&D laboratory. This real-time feedback loop continuously retrains our predictive heuristics, ensuring that novel adversary techniques are preemptively neutralized across all partner nodes.''',
                'read_time_minutes': 7,
                'is_featured': True,
                'published_at': datetime.date(2026, 8, 15),
            },
            {
                'id': 'dpdp-act-compliance',
                'title': 'DPDP Act 2023: Building Data Sovereignty Into Your Security Stack',
                'slug': 'dpdp-act-compliance',
                'category_slug': 'compliance',
                'author_name': 'VayuX GRC Team',
                'author_role': 'Compliance Research Division',
                'excerpt': 'A comprehensive guide to implementing the Digital Personal Data Protection Act requirements within enterprise cybersecurity infrastructure without compromising operational efficiency.',
                'content': '''# DPDP Act 2023: Building Data Sovereignty Into Your Security Stack

## 1. Statutory Obligations for Indian Enterprises
The Digital Personal Data Protection (DPDP) Act 2023 represents a paradigm shift for data fiduciaries operating in India. Organizations face statutory penalties up to INR 250 Crore for failing to maintain reasonable security safeguards.

## 2. Technical Architecture Blueprint
- **Consent Governance**: Cryptographically signed consent trails embedded at the database row level.
- **Incident Reporting**: Fast-track integration with CERT-In 6-hour notification runbooks.
- **Zero-PII Storage**: Automated hashing and micro-segmentation of user data assets.''',
                'read_time_minutes': 6,
                'is_featured': False,
                'published_at': datetime.date(2026, 8, 8),
            },
            {
                'id': 'zero-trust-patterns',
                'title': 'Zero-Trust Architecture Patterns: Implementation Strategies for Indian Enterprises',
                'slug': 'zero-trust-patterns',
                'category_slug': 'architecture',
                'author_name': 'VayuX Systems Architecture Lab',
                'author_role': 'Systems Engineering',
                'excerpt': 'Practical patterns and real-world case studies for implementing zero-trust security models tailored to Indian regulatory requirements and operational constraints.',
                'content': '''# Zero-Trust Architecture Patterns for Indian Enterprises

Perimeter-based defense is obsolete. Modern zero-trust models enforce continuous authentication, hardware-backed key verification, and dynamic micro-segmentation across distributed multi-cloud workloads.''',
                'read_time_minutes': 8,
                'is_featured': False,
                'published_at': datetime.date(2026, 7, 25),
            },
            {
                'id': 'incident-response-playbooks',
                'title': 'DFIR Playbooks: Incident Response in the Age of Ransomware',
                'slug': 'incident-response-playbooks',
                'category_slug': 'incident-response',
                'author_name': 'VayuX DFIR Strike Team',
                'author_role': 'Incident Response',
                'excerpt': 'Advanced forensic techniques and incident response frameworks for containing and eradicating modern ransomware attacks with minimal business disruption.',
                'content': '''# DFIR Playbooks: Ransomware Containment & Recovery

When double-extortion ransomware strikes, speed is the sole determinant of survival. Our sub-4-hour emergency SLA playbooks detail volatile memory extraction, Active Directory containment, and clean-slate system restoration.''',
                'read_time_minutes': 9,
                'is_featured': False,
                'published_at': datetime.date(2026, 7, 12),
            },
            {
                'id': 'threat-landscape-2026',
                'title': '2026 Threat Landscape Report: Emerging Vectors and Defensive Adaptations',
                'slug': 'threat-landscape-2026',
                'category_slug': 'threat-intelligence',
                'author_name': 'VayuX Intelligence Division',
                'author_role': 'Threat Intelligence',
                'excerpt': 'Annual threat analysis based on real-world telemetry from our global SOC operations, highlighting emerging attack patterns and recommended defensive strategies.',
                'content': '''# 2026 Threat Landscape Report

Synthesizing threat telemetry from over 500 million events processed across enterprise partnerships, highlighting AI-driven polymorphic malware, cloud IAM privilege escalation, and supply-chain dependencies.''',
                'read_time_minutes': 12,
                'is_featured': False,
                'published_at': datetime.date(2026, 6, 30),
            },
            {
                'id': 'vapt-methodology',
                'title': 'Advanced VAPT Methodologies: Beyond OWASP Top 10',
                'slug': 'vapt-methodology',
                'category_slug': 'security-research',
                'author_name': 'VayuX Offensive R&D',
                'author_role': 'Red Team Operations',
                'excerpt': 'Deep dive into systemic vulnerability assessment techniques that go beyond standardized frameworks to uncover architectural weaknesses and supply chain risks.',
                'content': '''# Advanced VAPT Methodologies

Standard compliance scanners identify known CVEs. True offensive research models chained architectural logic flaws, race conditions, and deserialization vulnerabilities.''',
                'read_time_minutes': 7,
                'is_featured': False,
                'published_at': datetime.date(2026, 6, 15),
            }
        ]
        for art in articles:
            cat_obj = Category.objects.get(slug=art['category_slug'])
            Article.objects.update_or_create(
                slug=art['slug'],
                defaults={
                    'title': art['title'],
                    'category': cat_obj,
                    'author_name': art['author_name'],
                    'author_role': art['author_role'],
                    'excerpt': art['excerpt'],
                    'content': art['content'],
                    'read_time_minutes': art['read_time_minutes'],
                    'is_featured': art['is_featured'],
                    'is_published': True,
                    'published_at': art['published_at'],
                }
            )
        self.stdout.write(self.style.SUCCESS("[OK] Seeded 6 Research Articles & 6 Categories"))

        # -----------------------------------------------------------------
        # 8. Complete Cybersecurity Glossary (GEO Engine)
        # -----------------------------------------------------------------
        glossary_items = [
            {
                'slug': 'dfir',
                'term': 'Digital Forensics and Incident Response',
                'short_definition': 'DFIR is a specialized cybersecurity discipline focused on investigating, containing, and remediating security breaches while preserving digital evidence according to legal chain-of-custody standards.',
                'why_it_matters': 'Guarantees rapid containment of active ransomware, data exfiltration, and advanced persistent threats (APTs), while preserving court-admissible evidence.',
                'key_processes': ['Volatile Memory Forensics', 'Timeline Reconstruction', 'Adversary Attribution', 'Eradication Verification'],
                'vayux_approach': 'VayuX pairs 24/7 emergency DFIR response with our proprietary research feedback loop, guaranteeing a sub-4-hour deployment SLA.',
                'target_search_query': 'what is dfir in cybersecurity',
            },
            {
                'slug': 'soc',
                'term': 'Security Operations Center',
                'short_definition': 'A SOC is a centralized organizational unit responsible for continuously monitoring, detecting, analyzing, and responding to cybersecurity events across enterprise digital assets 24/7/365.',
                'why_it_matters': 'Reduces Mean Time to Detect (MTTD) and Mean Time to Respond (MTTR) from months to sub-15ms automated correlation.',
                'key_processes': ['Continuous Telemetry Ingestion', 'Behavioral Anomaly Detection', 'Automated Playbook Execution', 'Threat Intelligence Integration'],
                'vayux_approach': 'VayuX operates an Autonomous SOC model delivering sub-15ms event correlation latency directly backed by our R&D lab.',
                'target_search_query': 'what is a security operations center soc',
            },
            {
                'slug': 'vapt',
                'term': 'Vulnerability Assessment and Penetration Testing',
                'short_definition': 'VAPT combines automated scanning with manual exploitation simulations to identify and prove exploitable weaknesses in IT systems.',
                'why_it_matters': 'Uncovers critical architectural security gaps before malicious threat actors can discover and weaponize them.',
                'key_processes': ['Attack Surface Reconnaissance', 'Adversarial Simulation', 'Remediation Roadmap', 'Re-Testing Verification'],
                'vayux_approach': 'VayuX VAPT engineers conduct continuous adversarial simulations beyond surface-level scanning, delivering exploit proofs and code-level fixes.',
                'target_search_query': 'vapt vs penetration testing difference',
            },
            {
                'slug': 'grc',
                'term': 'Governance, Risk, and Compliance',
                'short_definition': 'GRC is an integrated strategy to manage an enterprise’s cybersecurity governance, address business risks, and ensure adherence to statutory and industry regulations.',
                'why_it_matters': 'Eliminates legal liabilities and regulatory penalties while transforming security into an institutional trust enabler.',
                'key_processes': ['Policy & Control Frameworks', 'Risk Quantification', 'Automated Drift Auditing', 'Regulatory Liaison'],
                'vayux_approach': 'VayuX embeds "Compliance-by-Design" directly into technical architectures, ensuring effortless ISO 27001, SOC 2, and DPDP Act readiness.',
                'target_search_query': 'grc in cybersecurity explained',
            },
            {
                'slug': 'mitre-attack-framework',
                'term': 'MITRE ATT&CK Framework',
                'short_definition': 'MITRE ATT&CK is a globally accessible, curated knowledge base of adversary tactics, techniques, and procedures (TTPs) based on real-world observations.',
                'why_it_matters': 'Provides an objective matrix to evaluate the coverage and efficacy of defensive security controls against known threat actors.',
                'key_processes': ['Tactics Matrix Mapping', 'Techniques & Sub-Techniques Classification', 'Mitigations & Detection Authoring'],
                'vayux_approach': 'All VayuX DFIR and SOC investigations map directly to MITRE ATT&CK matrices to train autonomous detection models.',
                'target_search_query': 'mitre attack framework explained',
            },
            {
                'slug': 'zero-trust-architecture',
                'term': 'Zero Trust Network Architecture',
                'short_definition': 'Zero Trust is a security paradigm rooted in the principle "never trust, always verify," requiring strict identity and device validation for every access request.',
                'why_it_matters': 'Prevents lateral attacker movement across enterprise networks and eliminates implicit trust zones.',
                'key_processes': ['Continuous Verification', 'Micro-Segmentation', 'Least Privilege Enforcement'],
                'vayux_approach': 'VayuX designs decentralized Zero-Trust frameworks using cryptographic consensus and post-quantum encryption protocols.',
                'target_search_query': 'zero trust architecture principles',
            },
            {
                'slug': 'dpdp-act-2023',
                'term': 'Digital Personal Data Protection Act 2023',
                'short_definition': 'The DPDP Act 2023 is India’s principal data privacy law regulating the processing of digital personal data and mandating stringent security safeguards.',
                'why_it_matters': 'Mandatory legal obligation for all enterprises in India, enforcing penalties up to INR 250 Crore for security failures.',
                'key_processes': ['Data Fiduciary Obligations', 'Mandatory Breach Reporting', 'Data Principal Rights Management'],
                'vayux_approach': 'VayuX provides comprehensive DPDP Act compliance audits, technical gap assessments, and automated data flow protection.',
                'target_search_query': 'dpdp act 2023 compliance requirements',
            },
            {
                'slug': 'cert-in-directives',
                'term': 'CERT-In Cyber Security Directions',
                'short_definition': 'Binding cybersecurity directives issued by CERT-In mandating strict logging and 6-hour breach reporting for Indian entities.',
                'why_it_matters': 'Strict 6-hour incident disclosure mandate requires rapid, battle-tested DFIR capabilities and 180-day secure log archives.',
                'key_processes': ['6-Hour Incident Notification', '180-Day Secure Log Archival', 'NTP Time Synchronization'],
                'vayux_approach': 'VayuX DFIR and Managed SOC services are pre-configured to satisfy CERT-In reporting protocols automatically.',
                'target_search_query': 'cert in mandatory cyber security directions',
            },
            {
                'slug': 'post-quantum-cryptography',
                'term': 'Post-Quantum Cryptography',
                'short_definition': 'Cryptographic algorithms engineered to remain secure against decryption attacks by future cryptanalytically relevant quantum computers.',
                'why_it_matters': 'Neutralizes the imminent obsolescence of RSA/ECC and protects sensitive data against "Harvest Now, Decrypt Later" campaigns.',
                'key_processes': ['Lattice-Based Algorithms', 'Quantum-Resistant Key Exchange', 'Crypto-Agility Architecture'],
                'vayux_approach': 'The VayuX R&D Lab pioneers quantum-resilient data encryption modules for high-security enterprise infrastructures.',
                'target_search_query': 'what is post quantum cryptography',
            },
            {
                'slug': 'indicators-of-compromise',
                'term': 'Indicators of Compromise (IOCs)',
                'short_definition': 'Forensic digital artifacts that serve as technical evidence that a computer network or system has been breached or infected.',
                'why_it_matters': 'Enables rapid, automated endpoint scanning during active DFIR containment and intelligence exchange.',
                'key_processes': ['Atomic IOC Extraction', 'Computed Cryptographic Hashes', 'Behavioral Process Trees'],
                'vayux_approach': 'VayuX automatically extracts high-fidelity IOCs during DFIR and converts them into autonomous detection heuristics.',
                'target_search_query': 'what are indicators of compromise iocs',
            },
            {
                'slug': 'heuristic-threat-detection',
                'term': 'Heuristic Threat Detection',
                'short_definition': 'An advanced detection methodology that identifies unknown malware and zero-day threats by analyzing behavioral characteristics rather than static signatures.',
                'why_it_matters': 'Catches polymorphic malware and zero-day exploits before public CVE signatures are published.',
                'key_processes': ['Dynamic Behavioral Sandboxing', 'Rule-Based System Call Analysis', 'Machine-Learning Classifiers'],
                'vayux_approach': 'Our proprietary Sentinel neural models utilize multi-vector heuristic analysis to isolate anomalies at sub-15ms latency.',
                'target_search_query': 'heuristic threat detection vs signature based',
            },
            {
                'slug': 'owasp-top-10',
                'term': 'OWASP Top 10 Security Risks',
                'short_definition': 'A globally recognized standard consensus document outlining the ten most critical security risks facing modern web applications and APIs.',
                'why_it_matters': 'Required compliance benchmark for web applications to prevent broken access control, injection, and cryptographic flaws.',
                'key_processes': ['Access Control Validation', 'Injection Defense', 'Cryptographic Key Management'],
                'vayux_approach': 'VayuX VAPT assessments map 100% of attack surface findings to the OWASP Top 10 matrix with patch-ready code snippets.',
                'target_search_query': 'owasp top 10 vulnerabilities explained',
            },
            {
                'slug': 'ransomware-response',
                'term': 'Ransomware Incident Response',
                'short_definition': 'A specialized DFIR protocol to contain active encryption, isolate compromised systems, decrypt affected data, and prevent extortion exfiltration.',
                'why_it_matters': 'Halts active encryption before it reaches critical backups and core operational databases.',
                'key_processes': ['Urgent Micro-Segmentation', 'Ransomware Strain Identification', 'Clean Environment Restoration'],
                'vayux_approach': 'VayuX provides emergency ransomware containment with guaranteed sub-4-hour SLA.',
                'target_search_query': 'emergency ransomware incident response steps',
            },
            {
                'slug': 'threat-hunting-telemetry',
                'term': 'Threat Hunting Telemetry',
                'short_definition': 'The proactive, hypothesis-driven examination of rich network, endpoint, and identity data to detect stealthy adversaries who have bypassed automated controls.',
                'why_it_matters': 'Uncovers advanced persistent threats (APTs) and reduces attacker dwell time within enterprise perimeters.',
                'key_processes': ['Hypothesis Generation', 'Granular Endpoint Telemetry', 'Iterative Threat Elimination'],
                'vayux_approach': 'VayuX utilizes continuous proactive threat hunting across all managed partner nodes.',
                'target_search_query': 'proactive threat hunting telemetry methodologies',
            },
        ]
        for g in glossary_items:
            GlossaryTerm.objects.update_or_create(slug=g['slug'], defaults=g)
        self.stdout.write(self.style.SUCCESS("[OK] Seeded 14 Detailed Cybersecurity Glossary Terms"))

        # -----------------------------------------------------------------
        # 9. Career Job Openings
        # -----------------------------------------------------------------
        careers_data = [
            {
                'title': 'Offensive Security Researcher',
                'slug': 'offensive-security-researcher',
                'department': 'OFFENSIVE',
                'location': 'Vadodara / Hybrid',
                'tag': 'OFFENSIVE · FULL-TIME',
                'icon': 'ShieldAlert',
                'description': 'Conduct red-team simulations, discover zero-day vulnerabilities, and engineer custom attack tooling for client infrastructure assessments.',
                'responsibilities': ['Perform manual penetration testing across web/cloud/APIs', 'Develop proof-of-concept exploits', 'Author board-level debrief reports'],
                'requirements': ['3+ years in offensive security & red teaming', 'OSCP, OSEP, or equivalent certifications', 'Proficiency in Python, Go, or C'],
                'subject': 'Application - Offensive Security Researcher',
                'display_order': 1,
            },
            {
                'title': '24/7 SOC Incident Analyst',
                'slug': 'soc-incident-analyst',
                'department': 'SOC',
                'location': 'Vadodara / 24/7 Roster',
                'tag': 'DEFENSE · 24/7 ROSTER',
                'icon': 'Search',
                'description': 'Monitor real-time threat telemetry, triage SIEM anomalies, and execute automated containment playbooks during live security incidents.',
                'responsibilities': ['Analyze event logs across cloud & endpoints', 'Investigate IOC anomalies', 'Coordinate with DFIR on-call commanders'],
                'requirements': ['2+ years in SOC operations', 'Experience with Splunk, Elastic, or Wazuh', 'Deep understanding of MITRE ATT&CK matrix'],
                'subject': 'Application - 24/7 SOC Incident Analyst',
                'display_order': 2,
            },
            {
                'title': 'GRC Compliance Auditor',
                'slug': 'grc-compliance-auditor',
                'department': 'GRC',
                'location': 'Vadodara / Hybrid',
                'tag': 'GOVERNANCE · FULL-TIME',
                'icon': 'CheckSquare',
                'description': 'Lead ISO 27001, SOC 2, and DPDP Act 2023 readiness assessments for enterprise clients and construct compliance-by-design frameworks.',
                'responsibilities': ['Execute gap analyses against global & Indian regulations', 'Draft security policies & runbooks', 'Liaison with external audit bodies'],
                'requirements': ['3+ years in cybersecurity GRC consulting', 'CISA, CRISC, or ISO 27001 Lead Auditor certification', 'Working knowledge of DPDP Act 2023'],
                'subject': 'Application - GRC Compliance Auditor',
                'display_order': 3,
            },
            {
                'title': 'Core Systems Architect (Rust/Go)',
                'slug': 'core-systems-architect',
                'department': 'ENGINEERING',
                'location': 'Vadodara / Hybrid',
                'tag': 'ENGINEERING · FULL-TIME',
                'icon': 'Code2',
                'description': 'Architect low-latency, high-throughput autonomous telemetry pipelines and neural threat detection engines handling millions of events/sec.',
                'responsibilities': ['Develop kernel-level event hooks & parsers', 'Optimize sub-15ms correlation engines', 'Design post-quantum crypto modules'],
                'requirements': ['5+ years in systems programming (Rust, Go, C++)', 'Experience with distributed queues (Kafka/Redis)', 'Deep knowledge of Linux internals'],
                'subject': 'Application - Core Systems Architect',
                'display_order': 4,
            },
            {
                'title': 'Technical Security Writer',
                'slug': 'technical-security-writer',
                'department': 'RESEARCH',
                'location': 'Remote / Hybrid',
                'tag': 'RESEARCH · FULL-TIME',
                'icon': 'PenTool',
                'description': 'Translate complex vulnerability research and DFIR discoveries into authoritative whitepapers, advisory briefs, and GEO-optimized knowledge bases.',
                'responsibilities': ['Author monthly threat landscape reports', 'Draft CVE disclosures & technical walkthroughs', 'Maintain cybersecurity glossary hub'],
                'requirements': ['2+ years writing for InfoSec publications', 'Demonstrated understanding of cyber threat mechanics', 'Exceptional communication skills'],
                'subject': 'Application - Technical Security Writer',
                'display_order': 5,
            },
        ]
        for job in careers_data:
            JobRole.objects.update_or_create(slug=job['slug'], defaults={**job, 'is_active': True})
        self.stdout.write(self.style.SUCCESS("[OK] Seeded 5 Active Job Roles"))

        # -----------------------------------------------------------------
        # 10. Complete FAQ Database (All Categories)
        # -----------------------------------------------------------------
        faqs = [
            # Home FAQs
            {'category': 'homepage', 'question': 'How does the R&D feedback loop integrate with daily operations?', 'answer': 'Our operational SOC environment doubles as a live telemetry source for our research labs. Anomalies detected in client networks inform immediate architectural upgrades which are then deployed autonomously across all partnership nodes.', 'display_order': 1},
            {'category': 'homepage', 'question': 'What differentiates a "Guardian Laboratory" from an MSSP?', 'answer': 'An MSSP typically manages third-party tools within a defined scope. VayuX acts as a bespoke engineering extension of your organization, developing proprietary countermeasures and architectural adaptations specific to your threat profile.', 'display_order': 2},
            {'category': 'homepage', 'question': 'Are engagement models flexible?', 'answer': 'Yes. While our core offering encompasses complete architectural oversight, we offer specialized tactical engagements for DFIR, targeted VAPT, and critical infrastructure hardening.', 'display_order': 3},

            # About FAQs
            {'category': 'about', 'question': 'How do you ensure accountability in automated systems?', 'answer': 'Every automated decision made by our Nexus framework is logged and subjected to a transparent audit trail. We employ explainable AI protocols to ensure that all actions are fully comprehensible to human oversight.', 'display_order': 1},
            {'category': 'about', 'question': 'What is your protocol for handling system vulnerabilities?', 'answer': 'We operate a proactive bug bounty program and engage in regular red-teaming exercises. Any identified vulnerabilities are addressed through our transparent patching cycle, with full disclosure provided to affected clients upon resolution.', 'display_order': 2},
            {'category': 'about', 'question': 'How is client data protected from unauthorized access?', 'answer': 'Client data is secured using military-grade, post-quantum encryption protocols. Our zero-trust architecture ensures that access is strictly compartmentalized, requiring multi-factor, biometric authentication for any data interaction.', 'display_order': 3},

            # Solutions FAQs
            {'category': 'solutions', 'question': 'How does your SOC integrate with our existing stack?', 'answer': 'Our SOC utilizes API-driven ingestion to seamlessly plug into major cloud providers (AWS, Azure, GCP), EDR solutions (CrowdStrike, SentinelOne, Defender), and on-premise appliances with zero operational friction.', 'display_order': 1},
            {'category': 'solutions', 'question': 'What is the typical timeframe for a full VAPT engagement?', 'answer': 'Depending on the scope, engagements range from 2 to 4 weeks, culminating in a detailed technical report, proof-of-concept exploit demonstrations, and a board-level executive summary.', 'display_order': 2},
            {'category': 'solutions', 'question': 'Do you guarantee compliance certification?', 'answer': 'While we do not issue certifications directly, our GRC frameworks are designed to guarantee audit readiness, ensuring smooth evaluations by third-party certifiers for ISO 27001, SOC 2, and DPDP Act requirements.', 'display_order': 3},

            # Contact FAQs
            {'category': 'contact', 'question': 'How do collaborative research frameworks function?', 'answer': 'Our research frameworks operate on a principle of shared intelligence in a zero-trust environment. We establish secure, partitioned data enclaves where your analysts and our AI threat-hunting agents can co-examine anomalies without exposing core institutional data.', 'display_order': 1},
            {'category': 'contact', 'question': 'What is the onboarding process for Consultancy as a Service?', 'answer': 'After initial consultation, we conduct a comprehensive security posture assessment, design a bespoke engagement framework, and establish secure communication channels before deployment of our elite operatives.', 'display_order': 2},
            {'category': 'contact', 'question': 'Can Corporate Training be customized for our security teams?', 'answer': 'Absolutely. Our training programs are fully modular and can be tailored to address specific skill gaps, compliance requirements, and organizational threat landscapes.', 'display_order': 3},
        ]
        for faq in faqs:
            FAQItem.objects.update_or_create(
                category=faq['category'],
                question=faq['question'],
                defaults={**faq, 'is_active': True}
            )
        self.stdout.write(self.style.SUCCESS("[OK] Seeded 12 FAQ Pairs across all categories"))

        # -----------------------------------------------------------------
        # 11. PageSEO Rules
        # -----------------------------------------------------------------
        seo_routes = [
            {
                'route_path': '/',
                'meta_title': 'VayuX Systems | Sovereign Cybersecurity R&D & Managed Defense',
                'meta_description': 'VayuX Systems is an innovation-driven cybersecurity R&D firm headquartered in Vadodara, India, providing 24/7 Managed SOC, VAPT, DFIR, and GRC services with an operational telemetry feedback loop.',
                'canonical_url': 'https://vayux.systems',
            },
            {
                'route_path': '/about',
                'meta_title': 'About VayuX Systems | Architects of Sovereign Defense',
                'meta_description': 'Learn about the genesis of VayuX Systems, our leadership, core principles, and our proprietary R&D laboratory based in Vadodara, Gujarat.',
                'canonical_url': 'https://vayux.systems/about',
            },
            {
                'route_path': '/solutions',
                'meta_title': 'Cybersecurity Solutions & Defense Pillars | VayuX Systems',
                'meta_description': 'Explore VayuX enterprise security pillars: 24/7 Managed SOC, VAPT penetration testing, DFIR incident response, and GRC compliance consulting.',
                'canonical_url': 'https://vayux.systems/solutions',
            },
            {
                'route_path': '/solutions/soc',
                'meta_title': '24/7 Managed SOC Operations & Autonomous Response | VayuX Systems',
                'meta_description': 'Sub-15ms threat event correlation and automated incident containment powered by continuous frontline R&D telemetry.',
                'canonical_url': 'https://vayux.systems/solutions/soc',
            },
            {
                'route_path': '/solutions/vapt',
                'meta_title': 'Enterprise VAPT Services & Penetration Testing | VayuX Systems',
                'meta_description': 'Adversarial simulation, attack surface reduction, and zero-day vulnerability discovery across web, API, and cloud infrastructure.',
                'canonical_url': 'https://vayux.systems/solutions/vapt',
            },
            {
                'route_path': '/solutions/dfir',
                'meta_title': 'DFIR Incident Response Services | Sub-4-Hour SLA | VayuX Systems',
                'meta_description': 'Guaranteed sub-4-hour emergency deployment for ransomware and active cyber breaches with memory forensics and court-admissible evidence preservation.',
                'canonical_url': 'https://vayux.systems/solutions/dfir',
            },
            {
                'route_path': '/solutions/grc',
                'meta_title': 'GRC Compliance Consulting | DPDP Act 2023 & ISO 27001 | VayuX Systems',
                'meta_description': 'Sovereign compliance roadmaps for DPDP Act 2023, CERT-In mandatory directives, ISO 27001, and SOC 2 Type II assurance.',
                'canonical_url': 'https://vayux.systems/solutions/grc',
            },
            {
                'route_path': '/insights',
                'meta_title': 'Research Insights & Whitepapers | VayuX Defense Lab',
                'meta_description': 'Deep dives into autonomous threat detection, post-quantum cryptography, DPDP Act 2023 compliance, and ransomware response playbooks.',
                'canonical_url': 'https://vayux.systems/insights',
            },
            {
                'route_path': '/careers',
                'meta_title': 'Careers at VayuX Systems | Build the Future of Defense',
                'meta_description': 'Join the sovereign cybersecurity grid in Vadodara or remote. Open roles for offensive researchers, SOC analysts, and systems engineers.',
                'canonical_url': 'https://vayux.systems/careers',
            },
            {
                'route_path': '/contact',
                'meta_title': 'Contact Sentinel Command | VayuX Systems',
                'meta_description': 'Initiate encrypted contact with VayuX Systems defense commanders for SOC onboarding, penetration testing, or emergency DFIR response.',
                'canonical_url': 'https://vayux.systems/contact',
            },
            {
                'route_path': '/glossary',
                'meta_title': 'Cybersecurity Knowledge Base & Technical Glossary | VayuX Systems',
                'meta_description': 'Authoritative technical definitions and frameworks for DFIR, MITRE ATT&CK, Zero Trust, and the DPDP Act 2023.',
                'canonical_url': 'https://vayux.systems/glossary',
            },
        ]
        for s_entry in seo_routes:
            PageSEO.objects.update_or_create(route_path=s_entry['route_path'], defaults={**s_entry, 'is_active': True})
        self.stdout.write(self.style.SUCCESS("[OK] Seeded 11 Dynamic PageSEO Routes"))

        # -----------------------------------------------------------------
        # 12. Global SOC Nodes & Regional Compliance
        # -----------------------------------------------------------------
        nodes = [
            {'name': 'Vadodara Primary Nexus', 'city': 'Vadodara', 'country_code': 'IN', 'lat': 22.3072, 'lng': 73.1812, 'node_type': 'PRIMARY_NEXUS', 'status': 'OPERATIONAL', 'latency_ms': 8, 'display_order': 1},
            {'name': 'Frankfurt Sovereign Node', 'city': 'Frankfurt', 'country_code': 'DE', 'lat': 50.1109, 'lng': 8.6821, 'node_type': 'SOVEREIGN_NODE', 'status': 'OPERATIONAL', 'latency_ms': 24, 'display_order': 2},
            {'name': 'Singapore Gateway', 'city': 'Singapore', 'country_code': 'SG', 'lat': 1.3521, 'lng': 103.8198, 'node_type': 'RELAY_GATEWAY', 'status': 'OPERATIONAL', 'latency_ms': 18, 'display_order': 3},
            {'name': 'Reykjavik Arctic Node', 'city': 'Reykjavik', 'country_code': 'IS', 'lat': 64.1466, 'lng': -21.9426, 'node_type': 'SOVEREIGN_NODE', 'status': 'OPERATIONAL', 'latency_ms': 32, 'display_order': 4},
        ]
        for n in nodes:
            SocNode.objects.update_or_create(name=n['name'], defaults={**n, 'is_active': True})

        RegionalComplianceRule.objects.update_or_create(
            country_code='IN',
            defaults={
                'region_name': 'India',
                'framework_name': 'DPDP Act 2023 & CERT-In Directives',
                'badge_label': 'SOVEREIGN COMPLIANCE',
                'banner_headline': 'Indian Data Sovereignty & DPDP Compliance',
                'banner_description': 'VayuX Systems complies with the Digital Personal Data Protection Act 2023 and CERT-In 6-hour cybersecurity reporting directives.',
                'emergency_hotline': '+91-8200677905',
                'is_active': True,
            }
        )
        self.stdout.write(self.style.SUCCESS("[OK] Seeded 4 Global SOC Nodes & Regional Compliance"))

        self.stdout.write(self.style.SUCCESS("\n[SUCCESS] ALL FRONTEND DATA SEEDED TO BACKEND DATABASE!"))
