'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  BookOpen,
  ArrowLeft,
  ArrowRight,
  Calendar,
  User,
  Clock,
  Share2,
  ShieldAlert,
  Cpu,
  CheckCircle2,
  Lock,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import ScrollReveal from '@/components/layout/ScrollReveal';
import GlassCard from '@/components/ui/GlassCard';
import SectionHeading from '@/components/ui/SectionHeading';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { api, Article } from '@/lib/api-client';

const fallbackArticles: Record<string, any> = {
  'autonomous-soc-evolution': {
    title: 'The Evolution of Autonomous SOC: From Alert Triage to Threat Prediction',
    slug: 'autonomous-soc-evolution',
    category_name: 'Research',
    author_name: 'Pragnesh Kumar S.',
    author_role: 'Founder & Chief Technology Officer',
    published_at: '2026-08-15',
    read_time_minutes: 7,
    excerpt: 'Exploring how artificial intelligence and machine learning are transforming security operations centers from reactive alert handlers to proactive threat prediction engines.',
    content: `
## The Alert Fatigue Crisis in Enterprise Defense
Traditional Security Operations Centers (SOCs) are overwhelmed by tens of thousands of alerts generated daily by SIEM and EDR platforms. Human analysts spend up to 70% of their operational hours triaging false positives, creating dangerous blind spots that adversaries exploit to maintain persistent access.

## Sub-15ms Event Correlation Architecture
VayuX Systems addresses this fundamental bottleneck through a proprietary autonomous correlation engine. By ingesting unstructured telemetry across endpoints, network perimeters, and cloud control planes, our neural models correlate related events within 15 milliseconds.

\`\`\`
[Telemetry Pipeline] ---> [Kernel Hooks] ---> [Autonomous Neural Engine (<15ms)] ---> [Playbook Dispatch]
\`\`\`

### Key Architectural Pillars:
1. **Zero-PII Memory Ingestion**: All telemetry is processed in isolated volatile memory enclaves, stripping personal identifiers while retaining behavioral indicators.
2. **Dynamic Heuristic Scoring**: Moving beyond static IOC hashes to evaluate execution chains, DLL side-loading, and parent-child process anomalies.
3. **Automated Playbook Containment**: Instant isolation of compromised cloud instances and host credentials before lateral movement occurs.

## The Operational Feedback Loop
Every threat signature and anomaly detected during active client defense is sanitized and channeled back into our R&D laboratory. This real-time feedback loop continuously retrains our predictive heuristics, ensuring that novel adversary techniques are preemptively neutralized across all partner nodes.
    `,
  },
  'dpdp-act-compliance': {
    title: 'DPDP Act 2023: Building Data Sovereignty Into Your Security Stack',
    slug: 'dpdp-act-compliance',
    category_name: 'Compliance',
    author_name: 'VayuX GRC Research Division',
    author_role: 'Sovereign Compliance Group',
    published_at: '2026-08-08',
    read_time_minutes: 6,
    excerpt: 'A comprehensive guide to implementing the Digital Personal Data Protection Act requirements within enterprise cybersecurity infrastructure without compromising operational efficiency.',
    content: `
## Statutory Obligations for Indian Enterprises
The Digital Personal Data Protection (DPDP) Act 2023 represents a paradigm shift for data fiduciaries operating in India. Organizations face statutory penalties up to INR 250 Crore for failing to maintain reasonable security safeguards to prevent personal data breaches.

## Technical Architecture Blueprint
- **Consent Governance**: Cryptographically signed consent trails embedded at the database row level.
- **Incident Reporting**: Fast-track integration with CERT-In 6-hour notification runbooks and court-admissible forensic preservation.
- **Zero-PII Storage**: Automated hashing, tokenization, and micro-segmentation of user data assets.

## Compliance by Design
VayuX embeds compliance parameters directly into the software architecture, enabling enterprises to maintain continuous audit readiness without manual spreadsheet friction.
    `,
  },
  'zero-trust-patterns': {
    title: 'Zero-Trust Architecture Patterns: Implementation Strategies for Indian Enterprises',
    slug: 'zero-trust-patterns',
    category_name: 'Architecture',
    author_name: 'Pragnesh Kumar S.',
    author_role: 'Founder & Chief Technology Officer',
    published_at: '2026-07-25',
    read_time_minutes: 8,
    excerpt: 'Practical patterns and real-world case studies for implementing zero-trust security models tailored to Indian regulatory requirements and operational constraints.',
    content: `
## Beyond the Perimeter Security Fallacy
Perimeter-based defense is obsolete. In modern multi-cloud and hybrid enterprise environments, the network boundary is fluid. Zero-Trust Network Architecture (ZTNA) is built on a single uncompromising doctrine: **"Never trust, always verify."**

## Core Implementation Patterns
1. **Micro-Segmentation**: Compartmentalizing cloud workloads and database tiers to prevent lateral movement.
2. **Context-Aware Authentication**: Dynamic identity evaluation evaluating device health, geographic origin, and biometric proof.
3. **Continuous Cryptographic Attestation**: Enforcing post-quantum cryptographic assertions on every inter-service API call.
    `,
  },
  'incident-response-playbooks': {
    title: 'DFIR Playbooks: Incident Response in the Age of Ransomware',
    slug: 'incident-response-playbooks',
    category_name: 'Incident Response',
    author_name: 'VayuX DFIR Strike Team',
    author_role: 'Digital Forensics Unit',
    published_at: '2026-07-12',
    read_time_minutes: 9,
    excerpt: 'Advanced forensic techniques and incident response frameworks for containing and eradicating modern ransomware attacks with minimal business disruption.',
    content: `
## The Speed Imperative in Ransomware Response
When double-extortion ransomware strikes, time is the sole determinant of survival. Modern threat actors exfiltrate sensitive IP before executing destructive encryption payloads.

## 4-Stage Emergency DFIR Protocol
1. **Immediate Volatile Memory Extraction**: Capturing live RAM to recover encryption keys and memory-resident injection vectors.
2. **Micro-Segmentation & AD Lock**: Severing lateral C2 channels and containing Domain Controller compromise.
3. **Forensic Timeline Reconstruction**: Mapping the full adversary attack path against the MITRE ATT&CK framework.
4. **Clean Restoration & Remediation**: Rebuilding production infrastructure from verified, immutable snapshots.
    `,
  },
  'threat-landscape-2026': {
    title: '2026 Threat Landscape Report: Emerging Vectors and Defensive Adaptations',
    slug: 'threat-landscape-2026',
    category_name: 'Threat Intelligence',
    author_name: 'VayuX Intelligence Division',
    author_role: 'Global Threat Research',
    published_at: '2026-06-30',
    read_time_minutes: 12,
    excerpt: 'Annual threat analysis based on real-world telemetry from our global SOC operations, highlighting emerging attack patterns and recommended defensive strategies.',
    content: `
## Executive Threat Summary
Synthesizing telemetry from over 500 million security events processed across VayuX managed partner nodes in 2026, revealing key evolutions in threat actor methodologies:

1. **Polymorphic AI Malware**: Adversaries dynamically mutating binary payloads to evade signature-based detection.
2. **Cloud IAM Privilege Escalation**: Exploitation of misconfigured Kubernetes and cloud IAM roles.
3. **Supply Chain Compromises**: Targeting third-party open-source libraries and CI/CD pipelines.

## Defensive Countermeasures
Deploying behavioral heuristic detection models and cryptographic zero-trust architectures to neutralize emerging attack vectors before weaponization.
    `,
  },
  'vapt-methodology': {
    title: 'Advanced VAPT Methodologies: Beyond OWASP Top 10',
    slug: 'vapt-methodology',
    category_name: 'Security Research',
    author_name: 'VayuX Offensive R&D',
    author_role: 'Red Team Operations',
    published_at: '2026-06-15',
    read_time_minutes: 7,
    excerpt: 'Deep dive into systemic vulnerability assessment techniques that go beyond standardized frameworks to uncover architectural weaknesses and supply chain risks.',
    content: `
## Why Standard Scanners Fail
Automated vulnerability scanners excel at finding known CVEs and surface-level misconfigurations. However, sophisticated attackers exploit chained business logic flaws, race conditions, and complex privilege escalations that automated tooling cannot comprehend.

## The VayuX Adversarial Simulation Methodology
1. **Full Attack Surface Reconnaissance**: Mapping all public and hidden endpoints, APIs, and shadow IT infrastructure.
2. **Manual Exploit Engineering**: Safely testing multi-step exploit chains to demonstrate realistic business impact.
3. **Code-Level Remediation Blueprints**: Delivering actionable, developer-ready patch recommendations.
4. **Verified Re-Testing**: Validating that all security holes are permanently closed without regressions.
    `,
  },
};

export default function InsightDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [article, setArticle] = useState<any>(fallbackArticles[slug] || null);
  const [loading, setLoading] = useState<boolean>(true);
  const [notFoundState, setNotFoundState] = useState<boolean>(false);

  useEffect(() => {
    if (!slug) return;

    async function fetchLiveArticle() {
      try {
        setLoading(true);
        const live = await api.getArticleBySlug(slug, true);
        if (live) {
          setArticle({
            title: live.title,
            slug: live.slug,
            category_name: live.category_name,
            author_name: live.author_name,
            author_role: live.author_role,
            published_at: live.published_at,
            read_time_minutes: live.read_time_minutes,
            excerpt: live.excerpt,
            content: live.content || fallbackArticles[slug]?.content || '',
            view_count: live.view_count,
          });
          setNotFoundState(false);
        } else if (fallbackArticles[slug]) {
          setArticle(fallbackArticles[slug]);
          setNotFoundState(false);
        } else {
          setNotFoundState(true);
        }
      } catch (err) {
        if (fallbackArticles[slug]) {
          setArticle(fallbackArticles[slug]);
          setNotFoundState(false);
        } else {
          setNotFoundState(true);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchLiveArticle();
  }, [slug]);

  if (loading && !article) {
    return (
      <main className="min-h-screen pt-36 pb-20 flex flex-col items-center justify-center px-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <p className="font-mono text-sm text-on-surface-variant uppercase tracking-widest">
          Querying Defense Vault...
        </p>
      </main>
    );
  }

  if (notFoundState || !article) {
    return (
      <main className="min-h-screen pt-36 pb-20 flex flex-col items-center justify-center px-4 text-center">
        <AlertCircle className="w-16 h-16 text-rose-500 mb-4" />
        <h1 className="font-[var(--font-heading)] text-3xl font-bold text-on-surface mb-2">
          Whitepaper Not Found
        </h1>
        <p className="text-on-surface-variant max-w-md mb-8">
          The requested technical brief does not exist or may have been reclassified.
        </p>
        <Link
          href="/insights"
          className="btn-glow px-6 py-3 rounded-full text-white text-xs font-mono uppercase tracking-widest inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Insights Hub
        </Link>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen pt-28 sm:pt-36 pb-20 px-4 sm:px-6 md:px-[80px] max-w-[1440px] mx-auto w-full">
      {/* Breadcrumb Navigation */}
      <div className="max-w-4xl mx-auto mb-8 flex items-center justify-between text-xs font-mono text-on-surface-variant">
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 hover:text-primary transition-colors py-1.5 px-3 rounded-lg bg-slate-900/60 border border-white/10"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Insights Hub
        </Link>
        <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold uppercase">
          {article.category_name}
        </span>
      </div>

      {/* Article Header */}
      <header className="max-w-4xl mx-auto mb-12">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
          <BookOpen className="w-4 h-4" /> VayuX Defense Whitepaper
        </span>

        <h1 className="font-[var(--font-heading)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface mb-6 leading-tight tracking-tight">
          {article.title}
        </h1>

        <p className="font-[var(--font-body)] text-base sm:text-lg md:text-xl text-on-surface-variant leading-relaxed mb-8 font-light">
          {article.excerpt}
        </p>

        {/* Metadata Strip */}
        <div className="flex flex-wrap items-center gap-6 py-4 px-6 rounded-2xl bg-slate-900/70 border border-white/10 text-xs font-mono text-on-surface-variant">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            <span className="text-on-surface font-semibold">{article.author_name}</span>
            {article.author_role && (
              <span className="text-slate-500">({article.author_role})</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{article.published_at}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <span>{article.read_time_minutes || 5} min read</span>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <article className="max-w-4xl mx-auto glass-card rounded-3xl p-8 sm:p-12 md:p-14 border border-white/10 shadow-[0_20px_60px_rgba(0,168,255,0.06)] mb-16">
        <div className="prose prose-invert max-w-none text-on-surface-variant font-[var(--font-body)] leading-relaxed space-y-6">
          {article.content?.split('\n\n').map((paragraph: string, idx: number) => {
            const trimmed = paragraph.trim();
            if (!trimmed) return null;

            if (trimmed.startsWith('# ')) {
              return null; // Top title already rendered
            }

            if (trimmed.startsWith('## ')) {
              return (
                <h2
                  key={idx}
                  className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-on-surface mt-10 mb-4 pt-6 border-t border-white/10 flex items-center gap-3"
                >
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  {trimmed.replace('## ', '')}
                </h2>
              );
            }

            if (trimmed.startsWith('### ')) {
              return (
                <h3
                  key={idx}
                  className="font-[var(--font-heading)] text-xl sm:text-2xl font-bold text-on-surface mt-6 mb-3"
                >
                  {trimmed.replace('### ', '')}
                </h3>
              );
            }

            if (trimmed.startsWith('```')) {
              const code = trimmed.replace(/```/g, '').trim();
              return (
                <pre
                  key={idx}
                  className="p-5 rounded-xl bg-slate-950/90 border border-primary/30 font-mono text-xs text-sky-400 overflow-x-auto my-6"
                >
                  <code>{code}</code>
                </pre>
              );
            }

            if (trimmed.startsWith('- ') || trimmed.startsWith('1. ') || trimmed.startsWith('2. ') || trimmed.startsWith('3. ')) {
              const items = trimmed.split('\n');
              return (
                <ul key={idx} className="space-y-2.5 my-4">
                  {items.map((it, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm sm:text-base">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                      <span>{it.replace(/^[-*]|\d+\.\s*/, '').trim()}</span>
                    </li>
                  ))}
                </ul>
              );
            }

            return (
              <p key={idx} className="text-base sm:text-lg font-light leading-relaxed text-slate-300">
                {trimmed}
              </p>
            );
          })}
        </div>
      </article>

      {/* Author Spotlight */}
      <section className="max-w-4xl mx-auto mb-16">
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-primary/30 bg-gradient-to-r from-slate-900/90 via-slate-950 to-primary/5 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center flex-shrink-0 text-primary shadow-lg shadow-primary/20">
            <Cpu className="w-10 h-10" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <span className="text-[10px] font-mono font-bold uppercase text-primary tracking-widest">
              AUTHOR &amp; RESEARCH LEAD
            </span>
            <h3 className="font-[var(--font-heading)] text-xl font-bold text-on-surface">
              {article.author_name}
            </h3>
            <p className="text-xs font-mono text-secondary uppercase mb-2">
              {article.author_role || 'Threat Research Lead'}
            </p>
            <p className="text-xs sm:text-sm text-on-surface-variant font-light">
              Specialist in autonomous threat detection architectures, kernel research, and offensive telemetry at VayuX Systems.
            </p>
          </div>
          <Link
            href="/about"
            className="btn-outline-glass px-5 py-2.5 rounded-full text-xs font-mono text-primary whitespace-nowrap"
          >
            View Lab Profile →
          </Link>
        </div>
      </section>

      {/* Action CTA Strip */}
      <section className="max-w-4xl mx-auto text-center">
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-white/10 bg-gradient-to-b from-primary/10 to-transparent">
          <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-on-surface mb-4">
            Protect Your Enterprise With VayuX Autonomous Defense
          </h2>
          <p className="font-[var(--font-body)] text-sm sm:text-base text-on-surface-variant max-w-xl mx-auto mb-8 font-light">
            Channel real-world threat telemetry into proactive security architectures with our 24/7 Managed SOC, VAPT, DFIR, and GRC solutions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <AnimatedButton href="/contact" variant="primary" size="lg">
              Initiate Consultation <ArrowRight className="w-4 h-4" />
            </AnimatedButton>
            <AnimatedButton href="/solutions" variant="outline" size="lg">
              Explore Defense Pillars
            </AnimatedButton>
          </div>
        </div>
      </section>
    </main>
  );
}
