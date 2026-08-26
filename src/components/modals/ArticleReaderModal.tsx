import React, { useState } from 'react';
import { ResearchArticle } from '../../types';
import { X, Calendar, Clock, Bookmark, Share2, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

interface ArticleReaderModalProps {
  article: ResearchArticle | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({
  article,
  onClose,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [copyFeedback, setCopyFeedback] = useState(false);

  if (!article) return null;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl relative">
        {/* Header Bar */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-[var(--color-border)]/30 bg-[var(--color-bg-primary)]">
          <div className="flex items-center gap-2">
            <span
              className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border"
              style={{
                borderColor: `${article.categoryColor}40`,
                backgroundColor: `${article.categoryColor}15`,
                color: article.categoryColor,
              }}
            >
              {article.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`p-2 rounded-lg transition-colors ${
                isBookmarked
                  ? 'bg-[var(--color-brand-light)]/20 text-[var(--color-brand-light)]'
                  : 'text-[var(--color-text-secondary)] hover:text-white hover:bg-[var(--color-bg-tertiary)]'
              }`}
              title="Bookmark article"
            >
              <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>
            <div className="relative">
              <button
                onClick={handleCopyLink}
                className="p-2 rounded-lg text-[var(--color-text-secondary)] hover:text-white hover:bg-[var(--color-bg-tertiary)] transition-colors"
                title="Share Advisory"
              >
                <Share2 size={18} />
              </button>
              {copyFeedback && (
                <div className="absolute -bottom-8 right-0 text-xs font-mono text-[var(--color-brand-accent)] whitespace-nowrap animate-pulse">
                  Copied to clipboard
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-[var(--color-text-secondary)] hover:text-white p-2 rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Scroll Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Cover Image if available */}
          {article.coverImage && (
            <div className="w-full h-56 sm:h-72 rounded-xl overflow-hidden relative border border-[var(--color-border)]/30">
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-secondary)] to-transparent opacity-80" />
            </div>
          )}

          {/* Title and Metadata */}
          <div>
            <div className="flex items-center gap-4 text-xs text-[var(--color-text-secondary)] font-mono mb-2">
              <span className="flex items-center gap-1">
                <Calendar size={13} /> {article.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock size={13} /> {article.readTime}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
              {article.title}
            </h2>
          </div>

          {/* Author Block */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)]/30">
            {article.author.avatarUrl ? (
              <img
                src={article.author.avatarUrl}
                alt={article.author.name}
                className="w-11 h-11 rounded-full object-cover border border-[var(--color-brand-light)]/40"
              />
            ) : (
              <div className="w-11 h-11 rounded-full bg-[var(--color-brand-primary)] text-[var(--color-brand-accent)] flex items-center justify-center font-bold text-sm">
                {article.author.initials || 'VX'}
              </div>
            )}
            <div>
              <div className="text-sm font-semibold text-white">{article.author.name}</div>
              <div className="text-xs font-mono text-[var(--color-brand-light)]">{article.author.role}</div>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="p-4 rounded-xl bg-[var(--color-bg-tertiary)]/60 border border-[var(--color-brand-light)]/20 space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--color-brand-light)] flex items-center gap-2">
              <Shield size={14} /> Executive Summary
            </h4>
            <p className="text-sm text-[var(--color-text-primary)] leading-relaxed">
              {article.content.executiveSummary}
            </p>
          </div>

          {/* Threat Vectors */}
          {article.content.threatVectors && article.content.threatVectors.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--color-brand-danger)] flex items-center gap-2">
                <AlertTriangle size={14} /> Observed TTPs & Vectors
              </h4>
              <div className="space-y-1.5">
                {article.content.threatVectors.map((vector, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-lg bg-[var(--color-bg-primary)] border border-[var(--color-border)]/30 text-xs font-mono text-[var(--color-text-secondary)]"
                  >
                    {vector}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technical Details */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--color-brand-light)]">
              Technical Analysis
            </h4>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              {article.content.technicalDetails}
            </p>
          </div>

          {/* IoCs (Indicators of Compromise) */}
          {article.content.indicatorsOfCompromise && (
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--color-brand-accent)]">
                Indicators of Compromise (IoCs)
              </h4>
              <div className="p-3 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)]/40 font-mono text-xs space-y-1.5">
                {article.content.indicatorsOfCompromise.map((ioc, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between text-[var(--color-text-secondary)]">
                    <span className="text-[var(--color-brand-light)] font-semibold">{ioc.type}:</span>
                    <span className="text-white select-all">{ioc.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actionable Remediation */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--color-brand-accent)] flex items-center gap-2">
              <CheckCircle size={14} /> Actionable Remediation Guidance
            </h4>
            <ul className="space-y-2">
              {article.content.remediationSteps.map((step, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs text-[var(--color-text-primary)] leading-relaxed bg-[var(--color-bg-primary)] p-3 rounded-lg border border-[var(--color-border)]/30"
                >
                  <span className="text-[var(--color-brand-accent)] font-mono font-bold mt-0.5">{idx + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
