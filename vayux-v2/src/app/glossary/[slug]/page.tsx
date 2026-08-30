import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BookOpen, ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { glossaryTerms } from '@/lib/glossary-data';
import { generatePageMetadata, getDefinedTermSchema } from '@/lib/seo-config';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return glossaryTerms.map((term) => ({
    slug: term.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const term = glossaryTerms.find((t) => t.slug === slug);

  if (!term) {
    return {
      title: 'Term Not Found | VayuX Systems',
    };
  }

  return generatePageMetadata({
    title: `What is ${term.term}${term.acronym ? ` (${term.acronym})` : ''}? | Cybersecurity Definition & Guide`,
    description: term.shortDefinition,
    keywords: [
      term.term,
      term.acronym || '',
      `What is ${term.term}`,
      `${term.term} in cybersecurity`,
      `${term.category} best practices`,
    ].filter(Boolean),
    path: `/glossary/${term.slug}`,
  });
}

export default async function GlossaryTermPage({ params }: PageProps) {
  const { slug } = await params;
  const term = glossaryTerms.find((t) => t.slug === slug);

  if (!term) {
    notFound();
  }

  const termSchema = getDefinedTermSchema({
    term: term.term,
    shortDefinition: term.shortDefinition,
    slug: term.slug,
    category: term.category,
  });

  const relatedTermObjects = glossaryTerms.filter((t) =>
    term.relatedTerms.includes(t.slug)
  );

  return (
    <article className="relative min-h-screen pt-28 sm:pt-36 pb-20 px-4 sm:px-6 md:px-[80px] max-w-[1000px] mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(termSchema) }}
      />

      <nav className="mb-8">
        <Link
          href="/glossary"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Knowledge Hub
        </Link>
      </nav>

      {/* 1. Header & Lead Definition (AI Citation Target) */}
      <header className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
          <BookOpen className="w-3.5 h-3.5" /> {term.category}
        </div>

        <h1 className="font-[var(--font-heading)] text-3xl sm:text-4xl md:text-5xl font-bold text-on-surface mb-6 leading-tight">
          What is {term.term}{term.acronym ? ` (${term.acronym})` : ''}?
        </h1>

        <div className="p-6 rounded-2xl glass-card border border-primary/30 bg-primary/5">
          <p className="font-[var(--font-body)] text-base sm:text-lg text-on-surface leading-relaxed font-normal">
            <strong>{term.term}</strong>: {term.shortDefinition}
          </p>
        </div>
      </header>

      {/* 2. Comprehensive Explanation */}
      <section className="mb-12">
        <h2 className="font-[var(--font-heading)] text-2xl font-bold text-on-surface mb-4">
          Detailed Explanation
        </h2>
        <p className="font-[var(--font-body)] text-base text-on-surface-variant leading-relaxed font-light">
          {term.fullDefinition}
        </p>
      </section>

      {/* 3. Why It Matters for Enterprises */}
      <section className="mb-12">
        <h2 className="font-[var(--font-heading)] text-2xl font-bold text-on-surface mb-4">
          Why {term.acronym || term.term} Matters for Enterprise Security
        </h2>
        <ul className="space-y-3">
          {term.whyItMatters.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="font-[var(--font-body)] text-sm text-on-surface-variant leading-relaxed">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* 4. Key Methodological Components */}
      <section className="mb-12">
        <h2 className="font-[var(--font-heading)] text-2xl font-bold text-on-surface mb-6">
          Core Components &amp; Architecture
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {term.keyComponents.map((comp, idx) => (
            <div key={idx} className="glass-card rounded-xl p-5 border border-outline-variant/20">
              <h3 className="font-[var(--font-heading)] text-base font-bold text-on-surface mb-2">
                {comp.title}
              </h3>
              <p className="font-[var(--font-body)] text-xs text-on-surface-variant leading-relaxed font-light">
                {comp.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. VayuX Systems Approach (E-E-A-T & Commercial Hook) */}
      <section className="mb-12 p-8 rounded-2xl glass-panel border border-white/80 dark:border-white/10">
        <h2 className="font-[var(--font-heading)] text-xl font-bold text-on-surface mb-3 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-primary" /> The VayuX Systems Approach
        </h2>
        <p className="font-[var(--font-body)] text-sm text-on-surface-variant leading-relaxed mb-6 font-light">
          {term.vayuxApproach}
        </p>
        <AnimatedButton href={term.serviceLink.href} variant="primary" size="md">
          {term.serviceLink.label} <ArrowRight className="w-4 h-4" />
        </AnimatedButton>
      </section>

      {/* 6. Related Terms for Topical Clustering */}
      {relatedTermObjects.length > 0 && (
        <footer className="pt-8 border-t border-outline-variant/20">
          <h2 className="text-xs uppercase tracking-wider text-on-surface-variant mb-4 font-semibold">
            Explore Related Concepts
          </h2>
          <div className="flex flex-wrap gap-3">
            {relatedTermObjects.map((rel) => (
              <Link
                key={rel.slug}
                href={`/glossary/${rel.slug}`}
                className="text-xs px-3.5 py-2 rounded-xl glass-card border border-outline-variant/20 hover:border-primary/50 transition-all font-medium text-on-surface hover:text-primary"
              >
                {rel.term} {rel.acronym ? `(${rel.acronym})` : ''} →
              </Link>
            ))}
          </div>
        </footer>
      )}
    </article>
  );
}
