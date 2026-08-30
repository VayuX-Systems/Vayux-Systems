import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, ArrowRight, ShieldCheck, Search } from 'lucide-react';
import { glossaryTerms } from '@/lib/glossary-data';
import { generatePageMetadata, getDefinedTermSetSchema } from '@/lib/seo-config';

export const metadata: Metadata = generatePageMetadata({
  title: 'Cybersecurity & R&D Technical Glossary | Enterprise Knowledge Hub',
  description:
    'Comprehensive technical cybersecurity glossary defining critical incident response, offensive security, GRC compliance, and autonomous defense concepts.',
  keywords: [
    'Cybersecurity glossary',
    'DFIR definition',
    'SOC meaning',
    'VAPT explained',
    'DPDP Act 2023 guide',
    'MITRE ATT&CK concepts',
    'Post-quantum cryptography glossary',
  ],
  path: '/glossary',
});

export default function GlossaryHubPage() {
  const glossarySetSchema = getDefinedTermSetSchema(glossaryTerms);

  const categories = [
    'Incident Response',
    'Offensive Security',
    'Operations',
    'Compliance & Governance',
    'Architecture & R&D',
  ] as const;

  return (
    <main className="relative min-h-screen pt-28 sm:pt-36 pb-20 px-4 sm:px-6 md:px-[80px] max-w-[1440px] mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(glossarySetSchema) }}
      />

      <header className="max-w-4xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
          <BookOpen className="w-4 h-4" /> VayuX Knowledge &amp; Research Index
        </div>

        <h1 className="font-[var(--font-heading)] text-3xl sm:text-5xl md:text-6xl font-bold text-on-surface mb-6 leading-tight tracking-tight">
          Cybersecurity &amp; R&amp;D Technical Glossary
        </h1>

        <p className="font-[var(--font-body)] text-lg sm:text-xl text-on-surface-variant leading-relaxed max-w-3xl mx-auto font-light">
          An authoritative reference guide to critical concepts in digital forensics, offensive security, regulatory compliance, and autonomous defense architectures engineered by VayuX Systems.
        </p>
      </header>

      {/* Categorized Terms Grid */}
      <div className="space-y-16">
        {categories.map((category) => {
          const termsInCategory = glossaryTerms.filter((t) => t.category === category);
          if (termsInCategory.length === 0) return null;

          return (
            <section key={category} className="border-t border-outline-variant/20 pt-10">
              <h2 className="font-[var(--font-heading)] text-2xl font-bold text-on-surface mb-6 flex items-center gap-2">
                <span className="w-2 h-6 bg-primary rounded-full inline-block"></span>
                {category}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {termsInCategory.map((term) => (
                  <Link
                    key={term.slug}
                    href={`/glossary/${term.slug}`}
                    className="group glass-card rounded-2xl p-6 border border-white/80 dark:border-white/10 hover:border-primary/50 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono font-semibold text-primary uppercase">
                          {term.acronym || term.category}
                        </span>
                        <ArrowRight className="w-4 h-4 text-on-surface-variant group-hover:translate-x-1 group-hover:text-primary transition-all" />
                      </div>
                      <h3 className="font-[var(--font-heading)] text-lg font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">
                        {term.term}
                      </h3>
                      <p className="font-[var(--font-body)] text-xs text-on-surface-variant line-clamp-3 leading-relaxed">
                        {term.shortDefinition}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-outline-variant/20 flex items-center justify-between text-xs text-primary font-medium">
                      <span>Read Technical Guide →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
