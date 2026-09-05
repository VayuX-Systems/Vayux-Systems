'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, ArrowRight, Calendar, User, RotateCw, Sparkles } from 'lucide-react';
import Link from 'next/link';
import ScrollReveal from '@/components/layout/ScrollReveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { api, Article } from '@/lib/api-client';

const defaultCategories = ['All', 'Research', 'Compliance', 'Architecture', 'Incident Response', 'Threat Intelligence', 'Security Research'];

export default function InsightsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState<string[]>(defaultCategories);
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function loadBackendArticles(isManualRefresh = false) {
    try {
      if (isManualRefresh) setRefreshing(true);
      else setLoading(true);

      const [articlesRes, categoriesRes] = await Promise.allSettled([
        api.getArticles(undefined, true),
        api.getCategories(true),
      ]);

      // Process Dynamic Categories from Backend
      if (
        categoriesRes.status === 'fulfilled' &&
        categoriesRes.value?.results &&
        Array.isArray(categoriesRes.value.results) &&
        categoriesRes.value.results.length > 0
      ) {
        const catNames = categoriesRes.value.results.map((c: any) => c.name);
        // Deduplicate and ensure 'All' is first
        setCategories(['All', ...Array.from(new Set(catNames))]);
      }

      // Process Live Articles from Backend
      if (
        articlesRes.status === 'fulfilled' &&
        articlesRes.value &&
        Array.isArray(articlesRes.value.results)
      ) {
        const mapped = articlesRes.value.results.map((art: Article) => ({
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
      if (process.env.NODE_ENV === 'development') {
        console.info('[VayuX CMS] Backend offline or unreachable.');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadBackendArticles();
  }, []);

  const filteredArticles = selectedCategory === 'All'
    ? articles
    : articles.filter(article => article.category?.toLowerCase() === selectedCategory.toLowerCase());

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
                    ? 'bg-primary text-on-primary border border-primary shadow-sm'
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
      <section className="py-12 md:py-24 px-4 sm:px-6 md:px-[80px] max-w-[1440px] mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <RotateCw className="w-8 h-8 text-primary animate-spin mb-4" />
            <p className="font-mono text-xs text-on-surface-variant uppercase tracking-widest">
              Connecting to Sentinel Intelligence Vault...
            </p>
          </div>
        ) : filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredArticles.map((article, idx) => (
              <ScrollReveal key={article.id} delay={idx * 0.05}>
                <Link href={`/insights/${article.id}`} className="h-full block group">
                  <article className="glass-card rounded-2xl overflow-hidden border border-white/80 dark:border-white/10 hover:shadow-[0_20px_60px_rgba(0,168,255,0.12)] transition-all duration-300 h-full flex flex-col p-6 md:p-8">
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
          <div className="text-center py-20 px-4 max-w-xl mx-auto glass-card rounded-3xl border border-outline-variant/20 p-8 md:p-12 shadow-xl">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6 text-primary">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="font-[var(--font-heading)] text-2xl md:text-3xl font-bold text-on-surface mb-3">
              {selectedCategory === 'All'
                ? 'No Research Publications Yet'
                : `No Articles in "${selectedCategory}"`}
            </h3>
            <p className="font-[var(--font-body)] text-sm md:text-base text-on-surface-variant leading-relaxed mb-8">
              {selectedCategory === 'All'
                ? 'The VayuX Threat Research & Intelligence Division is actively compiling sovereign whitepapers, threat advisories, and architecture blueprints. New publications from the Sentinel Command Center will appear here in real-time.'
                : `There are currently no active whitepapers or advisories published under the "${selectedCategory}" classification.`}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {selectedCategory !== 'All' && (
                <button
                  onClick={() => setSelectedCategory('All')}
                  className="px-5 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
                >
                  View All Classifications
                </button>
              )}
              <button
                onClick={() => loadBackendArticles(true)}
                disabled={refreshing}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-outline-variant/40 text-on-surface text-xs font-semibold uppercase tracking-wider hover:border-primary/50 transition-colors disabled:opacity-50"
              >
                <RotateCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
                <span>{refreshing ? 'Synchronizing...' : 'Refresh Feed'}</span>
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}