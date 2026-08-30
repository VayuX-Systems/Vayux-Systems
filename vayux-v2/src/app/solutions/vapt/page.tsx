import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Bug, Code, Target, ArrowRight, CheckCircle2, Terminal } from 'lucide-react';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { generatePageMetadata, getServiceSchema, getFaqSchema } from '@/lib/seo-config';

export const metadata: Metadata = generatePageMetadata({
  title: 'Vulnerability Assessment & Penetration Testing (VAPT) | Adversarial Security Audits',
  description:
    'VayuX Systems delivers comprehensive VAPT and adversarial simulations across cloud infrastructure, web apps, mobile applications, and enterprise networks.',
  keywords: [
    'VAPT services for enterprises',
    'Penetration testing company India',
    'OWASP Top 10 security audit',
    'Cloud penetration testing AWS Azure',
    'Red teaming adversarial simulation',
    'API penetration testing services',
  ],
  path: '/solutions/vapt',
});

const vaptFaqs = [
  {
    question: 'How does VayuX ensure penetration testing does not cause business disruption?',
    answer:
      'We establish clear Rules of Engagement (RoE), testing timeframes, and out-of-band communication channels. Our offensive security engineers validate exploit chains safely without executing destructive payloads on production systems.',
  },
  {
    question: 'What frameworks does VayuX follow during VAPT engagements?',
    answer:
      'Our methodologies align with the OWASP Testing Guide (OTG), PTES (Penetration Testing Execution Standard), NIST SP 800-115, and MITRE ATT&CK adversarial simulation matrices.',
  },
  {
    question: 'Do you provide re-testing after vulnerability remediation?',
    answer:
      'Yes. Every VayuX VAPT engagement includes complimentary re-testing within 30 days to verify that all discovered vulnerabilities have been eradicated without introducing regressions.',
  },
];

export default function VAPTServicePage() {
  const serviceSchema = getServiceSchema('vapt');
  const faqSchema = getFaqSchema(vaptFaqs);

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
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/10 border border-red-600/30 text-red-600 dark:text-red-400 text-xs font-semibold uppercase tracking-wider mb-6">
          <Bug className="w-4 h-4" /> Adversarial Simulation &amp; Vulnerability Eradication
        </div>

        <h1 className="font-[var(--font-heading)] text-3xl sm:text-5xl md:text-6xl font-bold text-on-surface mb-6 leading-tight tracking-tight">
          Vulnerability Assessment &amp; Penetration Testing (VAPT)
        </h1>

        <p className="font-[var(--font-body)] text-lg sm:text-xl text-on-surface-variant leading-relaxed max-w-3xl mx-auto mb-8 font-light">
          <strong>VayuX Systems delivers exhaustive Vulnerability Assessment &amp; Penetration Testing</strong> across cloud estates, enterprise networks, APIs, and web applications. By conducting multi-layered adversarial simulations, we illuminate hidden systemic fractures and provide engineering teams with prioritized, code-level remediation blueprints.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <AnimatedButton href="/contact?type=vapt-inquiry" variant="primary" size="lg">
            Schedule VAPT Engagement <ArrowRight className="w-4 h-4" />
          </AnimatedButton>
          <AnimatedButton href="/solutions" variant="outline" size="lg">
            Explore All Solutions
          </AnimatedButton>
        </div>
      </header>

      <section className="mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-on-surface mb-3">
            Offensive Security Audit Vectors
          </h2>
          <p className="text-on-surface-variant text-base">
            Systematic vulnerability discovery across every technical layer of your digital ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card rounded-2xl p-8 border border-white/80 dark:border-white/10">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center mb-6">
              <Code className="w-6 h-6" />
            </div>
            <h3 className="font-[var(--font-heading)] text-xl font-bold text-on-surface mb-3">
              Web &amp; API Security (OWASP)
            </h3>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-4">
              Deep manual probing of logic flaws, broken object-level authorization (BOLA), and injection vulnerabilities.
            </p>
            <span className="text-xs font-mono text-red-500">Benchmark: OWASP Top 10 2024</span>
          </div>

          <div className="glass-card rounded-2xl p-8 border border-white/80 dark:border-white/10">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-[var(--font-heading)] text-xl font-bold text-on-surface mb-3">
              Cloud Posture &amp; IAM Testing
            </h3>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-4">
              Exploitation of misconfigured S3 buckets, excessive IAM permissions, and serverless privilege escalation paths.
            </p>
            <span className="text-xs font-mono text-primary">Coverage: AWS, Azure, GCP</span>
          </div>

          <div className="glass-card rounded-2xl p-8 border border-white/80 dark:border-white/10">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-6">
              <Terminal className="w-6 h-6" />
            </div>
            <h3 className="font-[var(--font-heading)] text-xl font-bold text-on-surface mb-3">
              Red Team Adversarial Simulations
            </h3>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-4">
              Goal-oriented, stealth multi-vector simulations challenging your internal defensive controls and Blue Team MTTR.
            </p>
            <span className="text-xs font-mono text-emerald-500">Methodology: MITRE ATT&amp;CK</span>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-on-surface mb-8 text-center">
          VAPT Engagement FAQ
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {vaptFaqs.map((faq, idx) => (
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
          <Link href="/glossary/vapt" className="text-xs px-3 py-1.5 rounded-full bg-surface-container-high hover:text-primary transition-colors">
            What is VAPT?
          </Link>
          <Link href="/glossary/owasp-top-10" className="text-xs px-3 py-1.5 rounded-full bg-surface-container-high hover:text-primary transition-colors">
            OWASP Top 10 Guide
          </Link>
          <Link href="/glossary/red-teaming-vs-penetration-testing" className="text-xs px-3 py-1.5 rounded-full bg-surface-container-high hover:text-primary transition-colors">
            Red Teaming vs Pen Testing
          </Link>
        </div>
      </footer>
    </article>
  );
}
