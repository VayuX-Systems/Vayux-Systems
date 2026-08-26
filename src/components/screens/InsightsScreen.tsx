import React, { useState } from 'react';
import { PageId, ResearchArticle } from '../../types';
import { RESEARCH_ARTICLES } from '../../data/mockData';
import {
  ChevronRight,
  Search,
  Bookmark,
  Calendar,
  Clock,
  ArrowRight,
  Shield,
  FileCode,
  SlidersHorizontal,
  Mail,
  CheckCircle2,
} from 'lucide-react';

interface InsightsScreenProps {
  onNavigate: (page: PageId) => void;
  onOpenArticle: (article: ResearchArticle) => void;
  bookmarkedIds: Set<string>;
  onToggleBookmark: (id: string) => void;
}

export const InsightsScreen: React.FC<InsightsScreenProps> = ({
  onNavigate,
  onOpenArticle,
  bookmarkedIds,
  onToggleBookmark,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const categories = [
    { id: 'ALL', label: 'All' },
    { id: 'THREAT ADVISORY', label: 'Threat Advisories' },
    { id: 'VULNERABILITY', label: 'Vulnerability Disclosures' },
    { id: 'REGULATORY', label: 'Regulatory' },
    { id: 'COMPANY NEWS', label: 'Company News' },
  ];

  const toggleBookmark = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    onToggleBookmark(id);
  };

  const filteredArticles = RESEARCH_ARTICLES.filter((article) => {
    const matchesCategory =
      selectedCategory === 'ALL' || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = RESEARCH_ARTICLES.find((a) => a.featured) || RESEARCH_ARTICLES[0];

  return (
    <div className="flex flex-col w-full px-6 sm:px-8 max-w-7xl mx-auto py-8 space-y-12 animate-in fade-in duration-300">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex text-xs font-mono text-[var(--color-text-secondary)]/70 pt-2">
        <ol className="flex items-center space-x-2">
          <li>
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-[var(--color-brand-light)] transition-colors cursor-pointer"
            >
              Home
            </button>
          </li>
          <li>
            <ChevronRight size={13} />
          </li>
          <li className="text-[var(--color-brand-light)]">Insights & Research</li>
        </ol>
      </nav>

      {/* Header & Search */}
      <header className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-brand-primary)]/20 border border-[var(--color-brand-light)]/30 text-[var(--color-brand-light)] text-xs font-mono">
          <span>VAYUX LAB RESEARCH</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
          Insights & Research
        </h1>
        <p className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed">
          Technical analysis, threat intelligence advisories, and security engineering perspectives directly from the VayuX R&D Lab.
        </p>
      </header>

      {/* Search & Category Filter Controls */}
      <div className="space-y-4">
        <div className="relative w-full max-w-2xl">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search research papers, CVEs, threat actors, or authors..."
            className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border)]/50 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-[var(--color-text-muted)] focus:border-[var(--color-brand-light)] focus:outline-none transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[var(--color-text-secondary)] hover:text-white"
            >
              CLEAR
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[var(--color-brand-light)] text-[#010203] font-bold shadow-md shadow-[var(--color-brand-light)]/20'
                  : 'bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] hover:text-white border border-[var(--color-border)]/40 hover:border-[var(--color-brand-light)]/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Research Card (if matching filter) */}
      {featuredArticle && (selectedCategory === 'ALL' || selectedCategory === featuredArticle.category) && !searchQuery && (
        <section
          onClick={() => onOpenArticle(featuredArticle)}
          className="v-card overflow-hidden border border-[var(--color-border)]/50 hover:border-[var(--color-brand-light)]/60 transition-all duration-300 cursor-pointer shadow-2xl group relative"
        >
          <div className="grid md:grid-cols-12 gap-0">
            {/* Image Col */}
            <div className="md:col-span-6 h-64 md:h-auto min-h-[320px] relative overflow-hidden bg-[var(--color-bg-primary)]">
              {featuredArticle.coverImage && (
                <img
                  src={featuredArticle.coverImage}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent to-[var(--color-bg-secondary)] opacity-80" />
              <div className="absolute top-4 left-4">
                <span className="bg-[var(--color-brand-danger)]/20 text-[var(--color-brand-danger)] border border-[var(--color-brand-danger)]/40 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-sm">
                  Featured Research
                </span>
              </div>
            </div>

            {/* Content Col */}
            <div className="md:col-span-6 p-8 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-[var(--color-text-secondary)] font-mono">
                  <span className="text-[var(--color-brand-danger)] font-bold">
                    {featuredArticle.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <Calendar size={13} />
                    <span>{featuredArticle.date}</span>
                    <span>•</span>
                    <Clock size={13} />
                    <span>{featuredArticle.readTime}</span>
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-[var(--color-brand-light)] transition-colors leading-tight">
                  {featuredArticle.title}
                </h2>

                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {featuredArticle.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--color-border)]/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {featuredArticle.author.avatarUrl && (
                    <img
                      src={featuredArticle.author.avatarUrl}
                      alt={featuredArticle.author.name}
                      className="w-10 h-10 rounded-full object-cover border border-[var(--color-brand-light)]/40"
                    />
                  )}
                  <div>
                    <div className="text-xs font-semibold text-white">
                      {featuredArticle.author.name}
                    </div>
                    <div className="text-[11px] font-mono text-[var(--color-brand-light)]">
                      {featuredArticle.author.role}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => toggleBookmark(e, featuredArticle.id)}
                    className="p-2 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-brand-light)] transition-colors"
                  >
                    <Bookmark
                      size={18}
                      fill={bookmarkedIds.has(featuredArticle.id) ? 'currentColor' : 'none'}
                    />
                  </button>
                  <span className="text-xs font-mono font-bold text-[var(--color-brand-light)] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-[var(--color-border)]/30 pb-3">
          <h3 className="text-xl font-bold text-white">
            {searchQuery ? `Search Results (${filteredArticles.length})` : 'Recent Technical Advisories'}
          </h3>
          <span className="text-xs font-mono text-[var(--color-text-secondary)]">
            Updated Daily via Threat Engine
          </span>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="p-12 text-center bg-[var(--color-bg-primary)] rounded-2xl border border-[var(--color-border)]/40 space-y-3">
            <div className="text-[var(--color-brand-light)] flex justify-center">
              <Search size={32} />
            </div>
            <h4 className="text-base font-bold text-white">No research matching your query</h4>
            <p className="text-xs text-[var(--color-text-secondary)]">Try adjusting filters or searching for terms like APT29, CVE, SOC2, or Engine.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => onOpenArticle(article)}
                className="v-card p-6 border border-[var(--color-border)]/40 hover:border-[var(--color-brand-light)]/60 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span
                      className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"
                      style={{
                        backgroundColor: `${article.categoryColor}15`,
                        color: article.categoryColor,
                        border: `1px solid ${article.categoryColor}30`,
                      }}
                    >
                      {article.category}
                    </span>

                    <button
                      onClick={(e) => toggleBookmark(e, article.id)}
                      className="text-[var(--color-text-muted)] hover:text-[var(--color-brand-light)] transition-colors p-1"
                    >
                      <Bookmark
                        size={15}
                        fill={bookmarkedIds.has(article.id) ? 'currentColor' : 'none'}
                      />
                    </button>
                  </div>

                  <h4 className="text-lg font-bold text-white group-hover:text-[var(--color-brand-light)] transition-colors leading-snug">
                    {article.title}
                  </h4>

                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-[var(--color-border)]/30 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {article.author.avatarUrl ? (
                      <img
                        src={article.author.avatarUrl}
                        alt={article.author.name}
                        className="w-8 h-8 rounded-full object-cover border border-[var(--color-brand-light)]/40"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[var(--color-brand-primary)] text-[var(--color-brand-accent)] flex items-center justify-center font-mono text-xs font-bold">
                        {article.author.initials || 'VX'}
                      </div>
                    )}
                    <div>
                      <div className="text-xs font-semibold text-white">
                        {article.author.name}
                      </div>
                      <div className="text-[10px] font-mono text-[var(--color-text-muted)]">
                        {article.date}
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-[var(--color-brand-light)] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    {article.readTime}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Advisory Dispatch Subscription */}
      <section className="bg-gradient-to-r from-[var(--color-bg-primary)] to-[var(--color-bg-tertiary)] border border-[var(--color-brand-light)]/30 rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
        <div className="space-y-2 max-w-xl text-center md:text-left">
          <h3 className="text-2xl font-bold text-white">
            Receive zero-day advisories in your inbox
          </h3>
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
            Curated, actionable threat intelligence with verified YARA and Sigma rules. No marketing spam.
          </p>
        </div>

        {newsletterSubscribed ? (
          <div className="flex items-center gap-2 bg-[var(--color-brand-accent)]/20 border border-[var(--color-brand-accent)]/40 text-[var(--color-brand-accent)] px-6 py-3 rounded-xl text-xs font-mono">
            <CheckCircle2 size={16} />
            <span>Advisory Dispatch Active</span>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (newsletterEmail) setNewsletterSubscribed(true);
            }}
            className="flex w-full md:w-auto gap-2"
          >
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="engineer@company.com"
              className="bg-[var(--color-bg-primary)] border border-[var(--color-border)]/60 rounded-lg px-4 py-2.5 text-xs text-white placeholder-[var(--color-text-muted)] focus:border-[var(--color-brand-light)] focus:outline-none w-full sm:w-64"
            />
            <button
              type="submit"
              className="bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-light)] hover:text-[#010203] text-white px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider shrink-0 transition-all cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        )}
      </section>
    </div>
  );
};
