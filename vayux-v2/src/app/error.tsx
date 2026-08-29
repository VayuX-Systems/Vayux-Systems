'use client';

import { Clock, AlertCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import ScrollReveal from '@/components/layout/ScrollReveal';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="relative overflow-hidden w-full min-h-screen flex items-center justify-center">
      <section className="py-32 px-4 sm:px-6 md:px-[80px] max-w-2xl mx-auto text-center">
        <ScrollReveal>
          <div className="space-y-8">
            {/* Error Icon */}
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                <AlertCircle className="w-10 h-10 text-red-500" />
              </div>
            </div>

            {/* Heading */}
            <div>
              <h1 className="font-[var(--font-heading)] text-4xl md:text-5xl font-bold text-on-surface mb-4">
                Something Went Wrong
              </h1>
              <p className="font-[var(--font-body)] text-lg text-on-surface-variant leading-relaxed">
                An unexpected error has occurred. Our team has been notified and is investigating the issue.
              </p>
            </div>

            {/* Error Details */}
            {error && (
              <div className="glass-card rounded-2xl p-8 border border-red-500/30 bg-red-500/5 text-left space-y-3">
                <p className="font-[var(--font-heading)] text-xs uppercase tracking-wider font-bold text-red-500">
                  Error Details
                </p>
                <p className="font-[var(--font-body)] text-sm text-on-surface-variant font-mono break-words">
                  {error.message || 'Unknown error'}
                </p>
                {error.digest && (
                  <p className="font-[var(--font-body)] text-xs text-on-surface-variant">
                    Error ID: <span className="font-mono">{error.digest}</span>
                  </p>
                )}
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-primary text-primary hover:bg-primary/10 transition-all font-[var(--font-heading)] font-semibold uppercase tracking-wide text-sm"
              >
                <Clock className="w-4 h-4" />
                Try Again
              </button>
              <Link
                href="/"
                className="btn-glow px-6 py-3 rounded-lg text-on-primary font-[var(--font-heading)] tracking-widest uppercase text-xs font-semibold inline-flex items-center justify-center gap-2"
              >
                Return Home
              </Link>
            </div>

            {/* Support */}
            <div className="pt-8 border-t border-outline-variant/20">
              <p className="font-[var(--font-body)] text-on-surface-variant mb-4">
                Experiencing persistent issues? Let us know.
              </p>
              <a
                href="mailto:admin@vayux.systems"
                className="inline-flex items-center gap-2 text-primary hover:text-primary-container transition-colors font-[var(--font-heading)] text-sm font-semibold"
              >
                Contact Support
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
