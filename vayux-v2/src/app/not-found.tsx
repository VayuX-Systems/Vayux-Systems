'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ScrollReveal from '@/components/layout/ScrollReveal';

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <main className="relative overflow-hidden w-full min-h-screen flex items-center justify-center">
      <section className="py-32 px-4 sm:px-6 md:px-[80px] max-w-2xl mx-auto text-center">
        <ScrollReveal>
          <div className="space-y-8">
            {/* Large 404 */}
            <div className="font-[var(--font-heading)] text-9xl md:text-[140px] font-black text-gradient leading-none mb-4">
              404
            </div>

            {/* Heading */}
            <div>
              <h1 className="font-[var(--font-heading)] text-4xl md:text-5xl font-bold text-on-surface mb-4">
                Page Not Found
              </h1>
              <p className="font-[var(--font-body)] text-lg text-on-surface-variant leading-relaxed">
                The page you're looking for doesn't exist or has been moved. Don't worry, our defensive grid can help you get back on track.
              </p>
            </div>

            {/* Debug Info */}
            <div className="glass-card rounded-2xl p-8 border border-white/80 text-left space-y-3">
              <p className="font-[var(--font-heading)] text-xs uppercase tracking-wider font-bold text-on-surface-variant">
                Diagnostic Info
              </p>
              <p className="font-[var(--font-body)] text-sm text-on-surface-variant font-mono">
                Resource: {typeof window !== 'undefined' ? window.location.pathname : '/unknown'}
              </p>
              <p className="font-[var(--font-body)] text-sm text-on-surface-variant">
                Status: 404 Not Found
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.back()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-primary text-primary hover:bg-primary/10 transition-all font-[var(--font-heading)] font-semibold uppercase tracking-wide text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </button>
              <Link
                href="/"
                className="btn-glow px-6 py-3 rounded-lg text-on-primary font-[var(--font-heading)] tracking-widest uppercase text-xs font-semibold inline-flex items-center justify-center gap-2"
              >
                Return Home
              </Link>
            </div>

            {/* Helpful Links */}
            <div className="pt-8 border-t border-outline-variant/20 space-y-4">
              <p className="font-[var(--font-heading)] text-xs uppercase tracking-wider font-bold text-on-surface-variant">
                Suggested Navigation
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: 'Home', href: '/' },
                  { label: 'Services', href: '/solutions' },
                  { label: 'About', href: '/about' },
                  { label: 'Contact', href: '/contact' },
                  { label: 'Careers', href: '/careers' },
                  { label: 'Insights', href: '/insights' },
                ].map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-3 py-2 rounded-lg border border-outline-variant/30 text-on-surface hover:border-primary/50 transition-colors font-[var(--font-body)] text-sm"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Support */}
            <div className="pt-8 border-t border-outline-variant/20">
              <p className="font-[var(--font-body)] text-on-surface-variant mb-4">
                Still having trouble? Contact our team.
              </p>
              <a
                href="mailto:admin@vayux.systems"
                className="inline-flex items-center gap-2 text-primary hover:text-primary-container transition-colors font-[var(--font-heading)] text-sm font-semibold"
              >
                admin@vayux.systems
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
