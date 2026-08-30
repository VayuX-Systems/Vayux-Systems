import type { Metadata } from 'next';
import Link from 'next/link';
import { Radar, ShieldCheck, Zap, Activity, ArrowRight, CheckCircle2, Lock, Server } from 'lucide-react';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { generatePageMetadata, getServiceSchema, getFaqSchema } from '@/lib/seo-config';

export const metadata: Metadata = generatePageMetadata({
  title: 'Managed SOC Operations | 24/7 Threat Detection & Autonomous Response',
  description:
    'VayuX Systems provides 24/7 Managed Security Operations Center (SOC) services with sub-15ms event correlation latency, continuous telemetry ingestion, and automated threat containment.',
  keywords: [
    'Managed SOC services India',
    '24/7 SOC operations center',
    'Autonomous threat detection',
    'Sub-15ms event correlation',
    'SIEM MDR provider',
    'CERT-In log retention SOC',
    'Continuous telemetry monitoring',
  ],
  path: '/solutions/soc',
});

const socFaqs = [
  {
    question: 'How does VayuX SOC achieve sub-15ms event correlation?',
    answer:
      'Our proprietary Sentinel streaming pipeline utilizes in-memory heuristic pattern matching and automated graph-based alert correlation, eliminating the query latency bottlenecks common in traditional SIEM databases.',
  },
  {
    question: 'How does the VayuX SOC integrate with our existing infrastructure?',
    answer:
      'We support agentless and lightweight agent API-driven ingestion across AWS, Azure, GCP, on-premise Active Directory, firewalls, and major EDR platforms without disrupting existing workloads.',
  },
  {
    question: 'How does operational telemetry feed into the VayuX R&D feedback loop?',
    answer:
      'Live behavioral anomalies and stealth exploit indicators detected during active monitoring are anonymized and fed directly into the VayuX Research Lab to train our predictive threat neutralization models.',
  },
];

export default function SOCServicePage() {
  const serviceSchema = getServiceSchema('soc');
  const faqSchema = getFaqSchema(socFaqs);

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

      {/* 1. Inverted Pyramid Hero */}
      <header className="max-w-4xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-500 text-xs font-semibold uppercase tracking-wider mb-6">
          <Radar className="w-4 h-4" /> 24/7 Autonomous Threat Monitoring &amp; Containment
        </div>

        <h1 className="font-[var(--font-heading)] text-3xl sm:text-5xl md:text-6xl font-bold text-on-surface mb-6 leading-tight tracking-tight">
          Managed Security Operations Center (SOC)
        </h1>

        {/* Lead Quote Target for AI Extraction */}
        <p className="font-[var(--font-body)] text-lg sm:text-xl text-on-surface-variant leading-relaxed max-w-3xl mx-auto mb-8 font-light">
          <strong>VayuX Systems delivers 24/7 Managed SOC operations</strong> engineered with a <strong>sub-15ms event correlation latency</strong> pipeline. We ingest multi-cloud and on-premise telemetry to anticipate, detect, and autonomously neutralize cyber threats before lateral damage occurs, while continuously channeling real-world telemetry into our proprietary R&amp;D security models.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <AnimatedButton href="/contact?type=soc-inquiry" variant="primary" size="lg">
            Request SOC Assessment <ArrowRight className="w-4 h-4" />
          </AnimatedButton>
          <AnimatedButton href="/solutions" variant="outline" size="lg">
            Explore All Solutions
          </AnimatedButton>
        </div>
      </header>

      {/* 2. Structured Capabilities & Tech Specs */}
      <section className="mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-on-surface mb-3">
            Operational Capabilities &amp; Telemetry Architecture
          </h2>
          <p className="text-on-surface-variant text-base">
            Precision monitoring that transitions your enterprise from reactive alert fatigue to autonomous containment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card rounded-2xl p-8 border border-white/80 dark:border-white/10">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-[var(--font-heading)] text-xl font-bold text-on-surface mb-3">
              Sub-15ms Correlation Pipeline
            </h3>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-4">
              Real-time streaming ingestion capable of evaluating millions of log events per second with near-zero latency.
            </p>
            <span className="text-xs font-mono text-sky-500">Latency: &lt; 15ms Ingestion</span>
          </div>

          <div className="glass-card rounded-2xl p-8 border border-white/80 dark:border-white/10">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="font-[var(--font-heading)] text-xl font-bold text-on-surface mb-3">
              Heuristic &amp; Behavioral AI
            </h3>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-4">
              Machine-learning classifiers that identify abnormal lateral movement, token theft, and living-off-the-land attacks.
            </p>
            <span className="text-xs font-mono text-primary">Accuracy: 98%+ Detection Rate</span>
          </div>

          <div className="glass-card rounded-2xl p-8 border border-white/80 dark:border-white/10">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-6">
              <Server className="w-6 h-6" />
            </div>
            <h3 className="font-[var(--font-heading)] text-xl font-bold text-on-surface mb-3">
              CERT-In 180-Day Immutable Logs
            </h3>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-4">
              Cryptographically verified, tamper-proof log archival within sovereign jurisdiction conforming to CERT-In mandates.
            </p>
            <span className="text-xs font-mono text-emerald-500">Retention: 180+ Days Verified</span>
          </div>
        </div>
      </section>

      {/* 3. Strategic FAQ Section */}
      <section className="mb-16">
        <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-on-surface mb-8 text-center">
          Frequently Asked Questions About SOC Operations
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {socFaqs.map((faq, idx) => (
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

      {/* 4. Related Technical Glossary Links */}
      <footer className="pt-8 border-t border-outline-variant/20 text-center">
        <p className="text-xs uppercase tracking-wider text-on-surface-variant mb-4 font-semibold">
          Related Knowledge Base Articles:
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/glossary/soc" className="text-xs px-3 py-1.5 rounded-full bg-surface-container-high hover:text-primary transition-colors">
            What is a SOC?
          </Link>
          <Link href="/glossary/heuristic-threat-detection" className="text-xs px-3 py-1.5 rounded-full bg-surface-container-high hover:text-primary transition-colors">
            Heuristic Threat Detection
          </Link>
          <Link href="/glossary/threat-hunting-telemetry" className="text-xs px-3 py-1.5 rounded-full bg-surface-container-high hover:text-primary transition-colors">
            Threat Hunting Telemetry
          </Link>
          <Link href="/solutions/dfir" className="text-xs px-3 py-1.5 rounded-full bg-surface-container-high hover:text-primary transition-colors">
            DFIR Incident Response
          </Link>
        </div>
      </footer>
    </article>
  );
}
