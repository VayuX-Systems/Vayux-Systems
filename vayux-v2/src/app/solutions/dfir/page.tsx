import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldAlert, Clock, Search, FileCheck, ArrowRight, CheckCircle2, PhoneCall, Lock } from 'lucide-react';
import AnimatedButton from '@/components/ui/AnimatedButton';
import Badge from '@/components/ui/Badge';
import { generatePageMetadata, getServiceSchema, getFaqSchema } from '@/lib/seo-config';

export const metadata: Metadata = generatePageMetadata({
  title: 'Digital Forensics & Incident Response (DFIR) | 24/7 Emergency Breach Containment',
  description:
    'VayuX Systems provides 24/7 DFIR services with guaranteed sub-4-hour emergency deployment, RAM analysis, root-cause investigation, and court-admissible forensic preservation.',
  keywords: [
    'DFIR services India',
    'Emergency Incident Response retainer',
    'Ransomware incident response team',
    'Volatile memory forensics ISO 27037',
    'MITRE ATT&CK TTP mapping',
    'CERT-In 6 hour incident reporting',
    'Cyber breach investigation',
  ],
  path: '/solutions/dfir',
});

const dfirFaqs = [
  {
    question: 'What is VayuX’s guaranteed emergency response SLA?',
    answer:
      'VayuX provides an immediate triage contact within 15 minutes of an emergency signal, with our rapid DFIR specialists deploying remote forensic acquisition agents within 4 hours globally.',
  },
  {
    question: 'Are VayuX forensic artifacts admissible in court and for cyber insurance?',
    answer:
      'Yes. All evidence acquisition adheres strictly to ISO/IEC 27037 digital evidence standards. We deliver cryptographic hash verification, immutable chain-of-custody logs, and board-level root-cause reports suitable for insurers, legal counsel, and statutory bodies.',
  },
  {
    question: 'How does VayuX assist with CERT-In 6-hour mandatory reporting?',
    answer:
      'Our DFIR operatives immediately isolate initial vector indicators and generate structured technical incident briefs aligned with CERT-In reporting templates within the mandatory 6-hour regulatory window.',
  },
  {
    question: 'Can VayuX handle sophisticated ransomware and double-extortion campaigns?',
    answer:
      'Yes. Our team specializes in urgent network micro-segmentation to halt active encryption, extracting ransomware binaries for payload analysis, identifying data exfiltration volumes, and securely restoring operations.',
  },
];

export default function DFIRServicePage() {
  const serviceSchema = getServiceSchema('dfir');
  const faqSchema = getFaqSchema(dfirFaqs);

  return (
    <article className="relative min-h-screen pt-28 sm:pt-36 pb-20 px-4 sm:px-6 md:px-[80px] max-w-[1440px] mx-auto">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 1. Inverted Pyramid Hero: Atomic Definitive Statement */}
      <header className="max-w-4xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-semibold uppercase tracking-wider mb-6">
          <ShieldAlert className="w-4 h-4" /> 24/7 Emergency Incident Response & Forensics
        </div>

        <h1 className="font-[var(--font-heading)] text-3xl sm:text-5xl md:text-6xl font-bold text-on-surface mb-6 leading-tight tracking-tight">
          Digital Forensics &amp; Incident Response (DFIR)
        </h1>

        {/* Lead Quote Target for AI Extraction */}
        <p className="font-[var(--font-body)] text-lg sm:text-xl text-on-surface-variant leading-relaxed max-w-3xl mx-auto mb-8 font-light">
          <strong>VayuX Systems delivers enterprise-grade Digital Forensics and Incident Response</strong> with a guaranteed <strong>sub-4-hour emergency SLA</strong>. Our specialists perform live memory volatility extraction, adversary attribution via MITRE ATT&amp;CK, and court-admissible chain-of-custody preservation for organizations combating ransomware, advanced persistent threats (APTs), and data breaches.
        </p>

        {/* Emergency Hotline CTA Box */}
        <div className="p-6 rounded-2xl bg-surface-container-high border border-red-500/30 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="text-left">
            <span className="text-xs uppercase tracking-wider font-bold text-red-500 flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5" /> Emergency Hotline
            </span>
            <p className="text-lg font-bold text-on-surface">+91-8200677905 (24/7/365)</p>
          </div>
          <AnimatedButton href="/contact?type=emergency-dfir" variant="primary" size="lg">
            Declare Incident Now <ArrowRight className="w-4 h-4" />
          </AnimatedButton>
        </div>
      </header>

      {/* 2. Structured Capabilities & SLA Grid */}
      <section className="mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-on-surface mb-3">
            Core DFIR Incident Deliverables
          </h2>
          <p className="text-on-surface-variant text-base">
            Engineered for decisive crisis containment and rapid business continuity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-card rounded-2xl p-8 border border-white/80 dark:border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-[var(--font-heading)] text-xl font-bold text-on-surface mb-3">
                Sub-4-Hour Emergency SLA
              </h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Rapid containment protocol severing adversary command-and-control (C2) channels and isolating compromised hosts within 4 hours.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-outline-variant/20 text-xs text-on-surface-variant font-mono">
              SLA: &lt; 240 Minutes Guaranteed
            </div>
          </div>

          <div className="glass-card rounded-2xl p-8 border border-white/80 dark:border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-[var(--font-heading)] text-xl font-bold text-on-surface mb-3">
                Volatile Memory &amp; Disk Forensics
              </h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Extracting RAM state, unlinking stealth rootkits, and imaging disks in compliance with ISO/IEC 27037 digital evidence standards.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-outline-variant/20 text-xs text-on-surface-variant font-mono">
              Standard: ISO/IEC 27037 Compliant
            </div>
          </div>

          <div className="glass-card rounded-2xl p-8 border border-white/80 dark:border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-6">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="font-[var(--font-heading)] text-xl font-bold text-on-surface mb-3">
                Chain-of-Custody Documentation
              </h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Court-admissible forensic dossiers, cryptographic hashes, and executive impact summaries for board review and cyber insurance claims.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-outline-variant/20 text-xs text-on-surface-variant font-mono">
              Reporting: Board &amp; Legal Ready
            </div>
          </div>
        </div>
      </section>

      {/* 3. The 6-Stage VayuX DFIR Protocol */}
      <section className="mb-20 glass-panel rounded-3xl p-8 sm:p-12 md:p-16 border border-white/80 dark:border-white/10">
        <h2 className="font-[var(--font-heading)] text-2xl sm:text-4xl font-bold text-on-surface mb-8 text-center">
          The 6-Stage Incident Response Protocol
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex gap-4">
            <span className="font-mono text-2xl font-bold text-red-500">01</span>
            <div>
              <h3 className="text-lg font-bold text-on-surface mb-1">Triage &amp; Blast Radius Scoping</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Establishing out-of-band encrypted comms, scoping affected domain controllers, cloud tenants, and endpoints.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <span className="font-mono text-2xl font-bold text-red-500">02</span>
            <div>
              <h3 className="text-lg font-bold text-on-surface mb-1">Volatile Artifact Preservation</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Capturing RAM state, network sockets, running processes, and forensic disk images before system shutdown.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <span className="font-mono text-2xl font-bold text-red-500">03</span>
            <div>
              <h3 className="text-lg font-bold text-on-surface mb-1">Adversary Containment</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Micro-segmenting compromised subnets, invalidating hijacked tokens, and severing C2 beaconing.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <span className="font-mono text-2xl font-bold text-red-500">04</span>
            <div>
              <h3 className="text-lg font-bold text-on-surface mb-1">Root Cause Eradication</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Locating and neutralizing web shells, shadow accounts, backdoors, and malicious persistence scheduled tasks.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <span className="font-mono text-2xl font-bold text-red-500">05</span>
            <div>
              <h3 className="text-lg font-bold text-on-surface mb-1">Secure Infrastructure Restoration</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Phased restoration from verified clean backups under heightened real-time telemetry surveillance.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <span className="font-mono text-2xl font-bold text-red-500">06</span>
            <div>
              <h3 className="text-lg font-bold text-on-surface mb-1">R&amp;D Feedback Integration</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Channeling post-mortem signatures into the VayuX R&amp;D Laboratory to deploy proactive defense rules.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Strategic FAQ Section */}
      <section className="mb-16">
        <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-on-surface mb-8 text-center">
          Incident Response FAQ &amp; Regulatory Guidance
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {dfirFaqs.map((faq, idx) => (
            <details
              key={idx}
              className="group p-6 rounded-2xl glass-card border border-outline-variant/20 transition-all duration-300"
            >
              <summary className="font-[var(--font-heading)] font-semibold text-lg text-on-surface cursor-pointer list-none flex items-center justify-between">
                <span>{faq.question}</span>
                <span className="text-primary transition-transform group-open:rotate-180">↓</span>
              </summary>
              <p className="mt-4 font-[var(--font-body)] text-sm text-on-surface-variant leading-relaxed">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* 5. Related Technical Glossary Links */}
      <footer className="pt-8 border-t border-outline-variant/20 text-center">
        <p className="text-xs uppercase tracking-wider text-on-surface-variant mb-4 font-semibold">
          Related Knowledge Base Articles:
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/glossary/dfir" className="text-xs px-3 py-1.5 rounded-full bg-surface-container-high hover:text-primary transition-colors">
            What is DFIR?
          </Link>
          <Link href="/glossary/mitre-attack-framework" className="text-xs px-3 py-1.5 rounded-full bg-surface-container-high hover:text-primary transition-colors">
            MITRE ATT&amp;CK Framework
          </Link>
          <Link href="/glossary/cert-in-directives" className="text-xs px-3 py-1.5 rounded-full bg-surface-container-high hover:text-primary transition-colors">
            CERT-In 6-Hour Reporting
          </Link>
          <Link href="/glossary/ransomware-response" className="text-xs px-3 py-1.5 rounded-full bg-surface-container-high hover:text-primary transition-colors">
            Ransomware Incident Response
          </Link>
        </div>
      </footer>
    </article>
  );
}
