import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  ArrowUpRight,
  Download,
  FileText,
  FlaskConical,
  ArrowRight,
  Terminal,
  ShieldCheck,
  Cpu,
  FileCheck,
} from 'lucide-react';
import Dribbble3DCard from '@/components/animations/Dribbble3DCard';
import ScrollReveal from '@/components/layout/ScrollReveal';
import SectionHeading from '@/components/ui/SectionHeading';
import FAQ from '@/components/ui/FAQ';
import Badge from '@/components/ui/Badge';
import { insightsFAQ, knowledgeBase } from '@/lib/site-data';

export const metadata = {
  title: 'Research & Insights | VayuX Systems',
  description:
    'Intelligence Forged in Data. Digital library of advanced whitepapers, real-time advisories, and lab notes for autonomous security.',
};

export default function InsightsPage() {
  const kbIconMap = {
    Terminal: Terminal,
    ShieldCheck: ShieldCheck,
    Cpu: Cpu,
    FileCheck: FileCheck,
  };

  return (
    <div className="pt-28 md:pt-36 pb-20 md:pb-32 px-5 md:px-[80px] max-w-[1440px] mx-auto w-full">
      {/* Hero Section */}
      <section className="mb-16 md:mb-24 pt-4 md:pt-8 relative">
        <div className="max-w-3xl">
          <ScrollReveal>
            <h1 className="font-[var(--font-heading)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-on-surface mb-6 leading-tight">
              Intelligence <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary-container to-primary glow-text">
                Forged in Data.
              </span>
            </h1>
            <p className="font-[var(--font-body)] text-base sm:text-lg md:text-xl text-on-surface-variant max-w-2xl mb-10 font-light leading-relaxed">
              Access the frontier of autonomous security. Our digital library houses advanced whitepapers, real-time advisories, and lab notes driving the next evolution of celestial protection.
            </p>
            <div className="flex gap-4">
              <Link
                href="#featured"
                className="btn-primary-gradient px-8 py-4 rounded-full font-[var(--font-heading)] text-xs uppercase tracking-widest text-on-primary font-semibold flex items-center gap-2 shadow-lg"
              >
                Explore Library
                <Search className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* Abstract orbital decoration */}
        <div className="absolute right-0 top-0 w-1/3 h-full hidden lg:flex items-center justify-center opacity-60 pointer-events-none">
          <div className="w-80 h-80 border border-primary/20 rounded-full flex items-center justify-center relative">
            <div className="w-[120%] h-[120%] rounded-full border border-secondary-container/30 animate-spin-slow" />
            <div
              className="absolute w-[80%] h-[80%] rounded-full border border-primary/40 animate-spin"
              style={{ animationDuration: '14s', animationDirection: 'reverse' }}
            />
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
          </div>
        </div>
      </section>

      {/* Featured Articles Grid */}
      <section id="featured" className="mb-24 md:mb-36">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
          <div>
            <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl md:text-4xl font-bold text-on-surface mb-2">
              Featured Articles
            </h2>
            <p className="font-[var(--font-body)] text-sm sm:text-base text-on-surface-variant font-light">
              Curated intelligence and technical documentation.
            </p>
          </div>
          <button
            type="button"
            className="btn-outline-glass px-6 py-3 rounded-full font-[var(--font-heading)] text-xs uppercase tracking-widest font-semibold flex items-center gap-2"
          >
            View All Resources
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Large Featured Card with Dribbble3DCard */}
          <ScrollReveal className="md:col-span-2">
            <Dribbble3DCard depth={30} className="p-8 sm:p-10 md:p-12 flex flex-col justify-end relative overflow-hidden group cursor-pointer min-h-[420px] h-full">
              {/* Background art */}
              <div className="absolute inset-0 z-0 opacity-40">
                <Image
                  src="/images/sentinel_grid.jpg"
                  alt="Autonomous Defense Grid"
                  fill
                  sizes="(max-width: 768px) 100vw, 66vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent z-0" />

              <div className="relative z-10">
                <Badge variant="primary" className="mb-4">
                  Featured Whitepaper
                </Badge>
                <h3 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-on-surface mb-3">
                  The Architecture of Autonomous Defense Grids
                </h3>
                <p className="font-[var(--font-body)] text-sm sm:text-base text-on-surface-variant max-w-xl mb-6 font-light leading-relaxed">
                  A comprehensive analysis of self-healing security perimeters and predictive threat mitigation strategies in cloud-native environments.
                </p>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center hover:bg-secondary transition-colors shadow-lg shadow-primary/30"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                  <span className="font-[var(--font-heading)] text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                    PDF • 4.2 MB
                  </span>
                </div>
              </div>
            </Dribbble3DCard>
          </ScrollReveal>

          {/* Right Column: 2 Cards */}
          <div className="flex flex-col gap-6">
            {/* Advisory Card */}
            <ScrollReveal delay={0.1}>
              <Dribbble3DCard depth={20} className="p-6 sm:p-8 flex flex-col justify-between group h-full">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="secondary">Advisory</Badge>
                    <FileText className="w-5 h-5 text-outline group-hover:text-primary transition-colors" />
                  </div>
                  <h4 className="font-[var(--font-heading)] text-lg sm:text-xl font-bold text-on-surface mb-2">
                    Q3 Threat Landscape Report
                  </h4>
                  <p className="font-[var(--font-body)] text-xs sm:text-sm text-on-surface-variant font-light leading-relaxed line-clamp-3">
                    Analysis of emerging vectors targeting decentralized finance protocols and proposed counter-measures.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-outline-variant/30 flex justify-between items-center text-xs font-[var(--font-heading)] text-tertiary">
                  <span>Oct 12, 2024</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-primary" />
                </div>
              </Dribbble3DCard>
            </ScrollReveal>

            {/* Lab Notes Card */}
            <ScrollReveal delay={0.2}>
              <Dribbble3DCard depth={20} className="p-6 sm:p-8 flex flex-col justify-between group h-full">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="subtle">Lab Notes</Badge>
                    <FlaskConical className="w-5 h-5 text-outline group-hover:text-primary transition-colors" />
                  </div>
                  <h4 className="font-[var(--font-heading)] text-lg sm:text-xl font-bold text-on-surface mb-2">
                    Quantum Resilience in Cryptography
                  </h4>
                  <p className="font-[var(--font-body)] text-xs sm:text-sm text-on-surface-variant font-light leading-relaxed line-clamp-3">
                    Initial findings from our Vanguard team on implementing post-quantum cryptographic standards.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-outline-variant/30 flex justify-between items-center text-xs font-[var(--font-heading)] text-tertiary">
                  <span>Sep 28, 2024</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-primary" />
                </div>
              </Dribbble3DCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Technical Knowledge Base */}
      <section className="mb-24 md:mb-36">
        <SectionHeading
          title="Technical Knowledge Base"
          subtitle="Deep dives into our core technologies and methodologies."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {knowledgeBase.map((item, idx) => {
            const Icon = kbIconMap[item.icon as keyof typeof kbIconMap] || Terminal;
            return (
              <ScrollReveal key={item.title} delay={idx * 0.1}>
                <Dribbble3DCard depth={20} className="p-6 sm:p-8 group h-full flex flex-col justify-between">
                  <div>
                    <Icon className="w-8 h-8 text-primary mb-4 block" />
                    <h4 className="font-[var(--font-heading)] text-lg sm:text-xl font-bold text-on-surface mb-2">
                      {item.title}
                    </h4>
                    <p className="font-[var(--font-body)] text-xs sm:text-sm text-on-surface-variant font-light mb-6 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-secondary font-[var(--font-heading)] text-xs uppercase tracking-wider font-semibold group-hover:text-primary transition-colors mt-auto">
                    Read Docs <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Dribbble3DCard>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* Research FAQ */}
      <section className="max-w-4xl mx-auto mb-16">
        <SectionHeading
          center
          title="Research FAQ"
          subtitle="Common inquiries regarding our publications and data."
        />
        <ScrollReveal>
          <FAQ items={insightsFAQ} />
        </ScrollReveal>
      </section>
    </div>
  );
}
