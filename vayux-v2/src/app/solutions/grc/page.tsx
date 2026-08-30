import type { Metadata } from 'next';
import Link from 'next/link';
import { Scale, FileCheck, ShieldCheck, CheckCircle2, ArrowRight, ShieldAlert, BookOpen } from 'lucide-react';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { generatePageMetadata, getServiceSchema, getFaqSchema } from '@/lib/seo-config';

export const metadata: Metadata = generatePageMetadata({
  title: 'GRC Compliance Consulting | DPDP Act 2023, CERT-In, ISO 27001 & SOC 2',
  description:
    'VayuX Systems provides expert GRC cybersecurity consulting ensuring seamless alignment and audit readiness for DPDP Act 2023, CERT-In directions, ISO 27001, and SOC 2 Type II.',
  keywords: [
    'GRC compliance consulting India',
    'DPDP Act 2023 compliance audit',
    'CERT-In 6 hour compliance readiness',
    'ISO 27001 certification consulting',
    'SOC 2 Type II readiness assessment',
    'Compliance drift monitoring',
  ],
  path: '/solutions/grc',
});

const grcFaqs = [
  {
    question: 'How does VayuX help organizations comply with India’s DPDP Act 2023?',
    answer:
      'We conduct comprehensive data inventory and personal data flow mapping, evaluate technical consent managers, implement mandatory cryptographic safeguards, and establish structured breach notification workflows to mitigate penalties of up to ₹250 crore.',
  },
  {
    question: 'Can VayuX guarantee third-party audit success for ISO 27001 and SOC 2 Type II?',
    answer:
      'While official certification is granted by accredited registrars, VayuX engineers your technical controls, policies, and continuous audit trails to ensure complete, frictionless audit readiness with zero non-conformities.',
  },
  {
    question: 'What is automated compliance drift monitoring?',
    answer:
      'Our GRC frameworks integrate with cloud APIs to detect configuration drift (e.g., public S3 buckets, unencrypted databases, modified IAM policies) in real-time, alerting administrators before compliance violations manifest.',
  },
];

export default function GRCServicePage() {
  const serviceSchema = getServiceSchema('grc');
  const faqSchema = getFaqSchema(grcFaqs);

  return (
    <article className="relative min-h-screen pt-28 sm:pt-36 pb-20 px-4 sm:px-6 md:px-[80px] max-w-[1440px] mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <header className="max-w-4xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-semibold uppercase tracking-wider mb-6">
          <Scale className="w-4 h-4" /> Governance, Risk &amp; Regulatory Compliance
        </div>

        <h1 className="font-[var(--font-heading)] text-3xl sm:text-5xl md:text-6xl font-bold text-on-surface mb-6 leading-tight tracking-tight">
          Governance, Risk, &amp; Compliance (GRC)
        </h1>

        <p className="font-[var(--font-body)] text-lg sm:text-xl text-on-surface-variant leading-relaxed max-w-3xl mx-auto mb-8 font-light">
          <strong>VayuX Systems delivers strategic GRC compliance architectures</strong> that transform regulatory friction into institutional competitive advantage. We align your enterprise with global and national mandates—including the <strong>DPDP Act 2023, CERT-In directions, ISO 27001, and SOC 2 Type II</strong>—with automated compliance drift monitoring.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <AnimatedButton href="/contact?type=grc-inquiry" variant="primary" size="lg">
            Request GRC Compliance Audit <ArrowRight className="w-4 h-4" />
          </AnimatedButton>
          <AnimatedButton href="/solutions" variant="outline" size="lg">
            Explore All Solutions
          </AnimatedButton>
        </div>
      </header>

      <section className="mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-on-surface mb-3">
            Target Regulatory &amp; Compliance Frameworks
          </h2>
          <p className="text-on-surface-variant text-base">
            End-to-end technical policy architecture, controls mapping, and continuous audit readiness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card rounded-2xl p-8 border border-white/80 dark:border-white/10">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-6">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="font-[var(--font-heading)] text-xl font-bold text-on-surface mb-3">
              DPDP Act 2023 Compliance
            </h3>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-4">
              Comprehensive personal data flow mapping, purpose limitation controls, and automated user rights management.
            </p>
            <span className="text-xs font-mono text-emerald-500">Statutory: India DPDP 2023</span>
          </div>

          <div className="glass-card rounded-2xl p-8 border border-white/80 dark:border-white/10">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-[var(--font-heading)] text-xl font-bold text-on-surface mb-3">
              ISO 27001 &amp; SOC 2 Type II
            </h3>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-4">
              Designing ISMS policy matrices, administrative controls, and cryptographic evidence trails for certification bodies.
            </p>
            <span className="text-xs font-mono text-sky-500">Standard: ISO/IEC 27001:2022</span>
          </div>

          <div className="glass-card rounded-2xl p-8 border border-white/80 dark:border-white/10">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="font-[var(--font-heading)] text-xl font-bold text-on-surface mb-3">
              CERT-In 6-Hour Readiness
            </h3>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-4">
              Setting up fast-track incident triage runbooks and automated 180-day jurisdictional log storage pipelines.
            </p>
            <span className="text-xs font-mono text-primary">Mandate: CERT-In Cyber Directions</span>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-on-surface mb-8 text-center">
          GRC Compliance &amp; Audit FAQ
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {grcFaqs.map((faq, idx) => (
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

      <footer className="pt-8 border-t border-outline-variant/20 text-center">
        <p className="text-xs uppercase tracking-wider text-on-surface-variant mb-4 font-semibold">
          Related Knowledge Base Articles:
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/glossary/grc" className="text-xs px-3 py-1.5 rounded-full bg-surface-container-high hover:text-primary transition-colors">
            What is GRC?
          </Link>
          <Link href="/glossary/dpdp-act-2023" className="text-xs px-3 py-1.5 rounded-full bg-surface-container-high hover:text-primary transition-colors">
            DPDP Act 2023 Guide
          </Link>
          <Link href="/glossary/cert-in-directives" className="text-xs px-3 py-1.5 rounded-full bg-surface-container-high hover:text-primary transition-colors">
            CERT-In Directives
          </Link>
        </div>
      </footer>
    </article>
  );
}
