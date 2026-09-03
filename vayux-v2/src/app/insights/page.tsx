'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, ArrowRight, Calendar, User } from 'lucide-react';
import Link from 'next/link';
import ScrollReveal from '@/components/layout/ScrollReveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { api, Article } from '@/lib/api-client';

// Initial fallback articles
const initialArticles = [
  {
    id: 'autonomous-soc-evolution',
    title: 'The Evolution of Autonomous SOC: From Alert Triage to Threat Prediction',
    excerpt: 'Exploring how artificial intelligence and machine learning are transforming security operations centers from reactive alert handlers to proactive threat prediction engines.',
    author: 'Pragnesh Kumar S. Singh',
    date: '2026-08-15',
    category: 'Research',
    featured: true,
  },
  {
    id: 'dpdp-act-compliance',
    title: 'DPDP Act 2023: Building Data Sovereignty Into Your Security Stack',
    excerpt: 'A comprehensive guide to implementing the Digital Personal Data Protection Act requirements within enterprise cybersecurity infrastructure without compromising operational efficiency.',
    author: 'VayuX Research Team',
    date: '2026-08-08',
    category: 'Compliance',
    featured: false,
  },
  {
    id: 'zero-trust-patterns',
    title: 'Zero-Trust Architecture Patterns: Implementation Strategies for Indian Enterprises',
    excerpt: 'Practical patterns and real-world case studies for implementing zero-trust security models tailored to Indian regulatory requirements and operational constraints.',
    author: 'VayuX Systems',
    date: '2026-07-25',
    category: 'Architecture',
    featured: false,
  },
  {
    id: 'incident-response-playbooks',
    title: 'DFIR Playbooks: Incident Response in the Age of Ransomware',
    excerpt: 'Advanced forensic techniques and incident response frameworks for containing and eradicating modern ransomware attacks with minimal business disruption.',
    author: 'VayuX DFIR Team',
    date: '2026-07-12',
    category: 'Incident Response',
    featured: false,
  },
  {
    id: 'threat-landscape-2026',
    title: '2026 Threat Landscape Report: Emerging Vectors and Defensive Adaptations',
    excerpt: 'Annual threat analysis based on real-world telemetry from our global SOC operations, highlighting emerging attack patterns and recommended defensive strategies.',
    author: 'VayuX Intelligence Division',
    date: '2026-06-30',
    category: 'Threat Intelligence',
    featured: false,
  },
  {
    id: 'vapt-methodology',
    title: 'Advanced VAPT Methodologies: Beyond OWASP Top 10',
    excerpt: 'Deep dive into systemic vulnerability assessment techniques that go beyond standardized frameworks to uncover architectural weaknesses and supply chain risks.',
    author: 'VayuX Offensive R&D',
    date: '2026-06-15',
    category: 'Security Research',
    featured: false,
  },
];

const categories = ['All', 'Research', 'Compliance', 'Architecture', 'Incident Response', 'Threat Intelligence', 'Security Research'];

export default function InsightsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [articles, setArticles] = useState(initialArticles);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadBackendArticles() {
      try {
        setLoading(true);
        const res = await api.getArticles();
        if (res?.results && res.results.length > 0) {
          const mapped = res.results.map((art: Article) => ({
            id: art.slug,
            title: art.title,
            excerpt: art.excerpt,
            author: art.author_name,
            date: art.published_at,
            category: art.category_name,
            featured: art.is_featured,
          }));
          setArticles(mapped);
        }
      } catch {
        // Backend offline or unreachable — seamlessly preserve built-in static fallback
        if (process.env.NODE_ENV === 'development') {
          console.info('[VayuX CMS] Backend offline or unreachable — utilizing static fallback data.');
        }
      } finally {
        setLoading(false);
      }
    }
    loadBackendArticles();
  }, []);

  const filteredArticles = selectedCategory === 'All'
    ? articles
    : articles.filter(article => article.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <main className="relative overflow-hidden w-full">
      {/* Hero Section */}
      <section className="py-20 md:py-32 px-4 sm:px-6 md:px-[80px] max-w-[1440px] mx-auto text-center">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wide mb-6">
              📖 Research & Thought Leadership
            </span>

            <h1 className="font-[var(--font-heading)] text-4xl md:text-6xl font-bold text-on-surface mb-6 leading-tight tracking-tight">
              Reflections on <span className="text-gradient">Autonomy</span>
            </h1>

            <p className="font-[var(--font-body)] text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-2xl mx-auto">
              Technical insights, threat research, and deep dives into autonomous security architectures from the VayuX research laboratory.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 sm:px-6 md:px-[80px] max-w-[1440px] mx-auto">
        <ScrollReveal>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-[var(--font-heading)] font-semibold uppercase tracking-wide text-xs transition-all ${
                  selectedCategory === category
                    ? 'bg-primary text-on-primary border border-primary'
                    : 'border border-outline-variant/30 text-on-surface hover:border-primary/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Articles Grid */}
      <section className="py-20 md:py-32 px-4 sm:px-6 md:px-[80px] max-w-[1440px] mx-auto">
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredArticles.map((article, idx) => (
              <ScrollReveal key={article.id} delay={idx * 0.1}>
                <Link href={`/insights/${article.id}`} className="h-full block group">
                  <article className="glass-card rounded-2xl overflow-hidden border border-white/80 hover:shadow-[0_20px_60px_rgba(0,168,255,0.12)] transition-all duration-300 h-full flex flex-col p-6 md:p-8">
                    {/* Category Badge */}
                    <div className="flex items-start justify-between mb-4">
                      <span className="inline-flex px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wide">
                        {article.category}
                      </span>
                      {article.featured && (
                        <span className="text-lg">⭐</span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-[var(--font-heading)] text-xl md:text-2xl font-bold text-on-surface mb-3 group-hover:text-primary transition-colors line-clamp-3">
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="font-[var(--font-body)] text-base text-on-surface-variant mb-6 flex-1 line-clamp-3">
                      {article.excerpt}
                    </p>

                    {/* Metadata */}
                    <div className="flex items-center justify-between text-xs text-on-surface-variant/70 pt-4 border-t border-outline-variant/10">
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{article.date}</span>
                      </div>
                    </div>

                    {/* Read More Link */}
                    <div className="mt-4 flex items-center gap-2 text-primary font-[var(--font-heading)] text-xs uppercase tracking-wider group-hover:gap-3 transition-all">
                      <span>Read Whitepaper</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </article>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-on-surface-variant text-lg">No articles found in this category.</p>
          </div>
        )}
      </section>
    </main>
  );
}