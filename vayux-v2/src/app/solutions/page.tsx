'use client';

import { CheckCircle, ArrowRight, Cpu, Terminal, SearchCode, FileCheck2, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollFadeIn from '@/components/layout/ScrollFadeIn';
import ScrollReveal from '@/components/layout/ScrollReveal';
import SectionHeading from '@/components/ui/SectionHeading';
import Badge from '@/components/ui/Badge';
import AnimatedButton from '@/components/ui/AnimatedButton';
import TiltCard from '@/components/ui/TiltCard';
import { services } from '@/lib/site-data-enhanced';

const SERVICE_THEMES: Record<string, {
  Icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  badgeClass: string;
  borderClass: string;
  bgGlowClass: string;
  iconBoxClass: string;
  subtitleClass: string;
  checkClass: string;
  btnClass: string;
}> = {
  soc: {
    Icon: Cpu,
    accentColor: '#38bdf8',
    badgeClass: 'bg-sky-500/15 border-sky-500/40 text-sky-600 dark:text-sky-400',
    borderClass: 'border-sky-500/30 hover:border-sky-400 dark:border-sky-500/30 dark:hover:border-sky-400/80 shadow-[0_8px_30px_rgba(56,189,248,0.08)] dark:shadow-[0_10px_40px_rgba(56,189,248,0.12)]',
    bgGlowClass: 'from-sky-500/15 via-sky-500/[0.03] to-transparent',
    iconBoxClass: 'bg-sky-500/15 text-sky-600 dark:text-sky-400 border border-sky-500/30',
    subtitleClass: 'text-sky-600 dark:text-sky-400',
    checkClass: 'text-sky-500 dark:text-sky-400',
    btnClass: 'border-sky-500/40 text-sky-700 dark:text-sky-300 hover:bg-sky-500 hover:text-white dark:hover:bg-sky-400 dark:hover:text-black',
  },
  vapt: {
    Icon: Terminal,
    accentColor: '#f43f5e',
    badgeClass: 'bg-rose-500/15 border-rose-500/40 text-rose-600 dark:text-rose-400',
    borderClass: 'border-rose-500/30 hover:border-rose-400 dark:border-rose-500/30 dark:hover:border-rose-400/80 shadow-[0_8px_30px_rgba(244,63,94,0.08)] dark:shadow-[0_10px_40px_rgba(244,63,94,0.12)]',
    bgGlowClass: 'from-rose-500/15 via-rose-500/[0.03] to-transparent',
    iconBoxClass: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30',
    subtitleClass: 'text-rose-600 dark:text-rose-400',
    checkClass: 'text-rose-500 dark:text-rose-400',
    btnClass: 'border-rose-500/40 text-rose-700 dark:text-rose-300 hover:bg-rose-500 hover:text-white dark:hover:bg-rose-400 dark:hover:text-black',
  },
  dfir: {
    Icon: SearchCode,
    accentColor: '#f59e0b',
    badgeClass: 'bg-amber-500/15 border-amber-500/40 text-amber-600 dark:text-amber-400',
    borderClass: 'border-amber-500/30 hover:border-amber-400 dark:border-amber-500/30 dark:hover:border-amber-400/80 shadow-[0_8px_30px_rgba(245,158,11,0.08)] dark:shadow-[0_10px_40px_rgba(245,158,11,0.12)]',
    bgGlowClass: 'from-amber-500/15 via-amber-500/[0.03] to-transparent',
    iconBoxClass: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30',
    subtitleClass: 'text-amber-600 dark:text-amber-400',
    checkClass: 'text-amber-500 dark:text-amber-400',
    btnClass: 'border-amber-500/40 text-amber-700 dark:text-amber-300 hover:bg-amber-500 hover:text-white dark:hover:bg-amber-400 dark:hover:text-black',
  },
  grc: {
    Icon: FileCheck2,
    accentColor: '#10b981',
    badgeClass: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-600 dark:text-emerald-400',
    borderClass: 'border-emerald-500/30 hover:border-emerald-400 dark:border-emerald-500/30 dark:hover:border-emerald-400/80 shadow-[0_8px_30px_rgba(16,185,129,0.08)] dark:shadow-[0_10px_40px_rgba(16,185,129,0.12)]',
    bgGlowClass: 'from-emerald-500/15 via-emerald-500/[0.03] to-transparent',
    iconBoxClass: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30',
    subtitleClass: 'text-emerald-600 dark:text-emerald-400',
    checkClass: 'text-emerald-500 dark:text-emerald-400',
    btnClass: 'border-emerald-500/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-400 dark:hover:text-black',
  },
};

export default function SolutionsPage() {
  return (
    <main className="relative overflow-hidden w-full">
      {/* Clean Hero Section without background image or parallax scroll recession */}
      <section className="relative min-h-[70vh] md:min-h-[75vh] flex items-center justify-center pt-28 sm:pt-32 md:pt-40 pb-16 md:pb-20 px-4 sm:px-6 md:px-[80px]">
        {/* Soft Ambient Radiance in Background */}
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-primary-fixed-dim/15 dark:bg-primary/10 rounded-full blur-[130px] pointer-events-none -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-container/15 dark:bg-secondary/10 rounded-full blur-[150px] pointer-events-none -z-10" />

        {/* Content Container */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-sm"
          >
            🎯 Applied Technical Solutions
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-[var(--font-heading)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-on-surface mb-6 leading-tight tracking-tight"
          >
            Four Operational Pillars.<br />
            <span className="text-gradient">Real-World Telemetry</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-[var(--font-body)] text-base sm:text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-2xl mx-auto mb-8"
          >
            SOC Management, VAPT, DFIR, and GRC—specialized services that protect your enterprise while feeding real-world operational telemetry into VayuX's R&amp;D Laboratory.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <AnimatedButton
              href="#services"
              variant="primary"
              size="lg"
            >
              Explore Solutions <ArrowRight className="w-4 h-4" />
            </AnimatedButton>
          </motion.div>
        </div>
      </section>

      {/* Services Section Header (Cleanly separated, no negative margin overlap) */}
      <div className="mx-4 sm:mx-6 md:mx-[80px] mb-12 md:mb-16 z-20">
        <div className="glass-card rounded-3xl border border-outline-variant/20 dark:border-white/10 p-8 md:p-12 shadow-lg">
          <SectionHeading
            center
            title="Precision Engineering for Every Layer"
            subtitle="Advanced solutions designed for your digital defense architecture"
          />
        </div>
      </div>

      {/* Services Grid */}
      <section className="py-20 md:py-32 px-4 sm:px-6 md:px-[80px] max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, idx) => {
            const theme = SERVICE_THEMES[service.id] || SERVICE_THEMES.soc;
            const IconComponent = theme.Icon;

            return (
              <ScrollFadeIn
                key={service.id}
                delay={idx * 0.1}
                direction={idx % 2 === 0 ? 'left' : 'right'}
              >
                <TiltCard className="rounded-2xl h-full">
                  <div
                    className={`relative rounded-2xl p-8 md:p-10 border transition-all duration-300 flex flex-col h-full group bg-white/80 dark:bg-[#070b16]/90 backdrop-blur-xl ${theme.borderClass}`}
                  >
                    {/* Ambient Corner Cyber Glow */}
                    <div
                      className={`absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl ${theme.bgGlowClass} rounded-2xl pointer-events-none -z-10`}
                    />

                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className={`w-13 h-13 rounded-xl flex items-center justify-center p-3 flex-shrink-0 group-hover:scale-110 transition-all duration-300 shadow-md ${theme.iconBoxClass}`}
                      >
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border shadow-sm ${theme.badgeClass}`}
                      >
                        {service.badge}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="font-[var(--font-heading)] text-2xl md:text-3xl font-bold text-on-surface mb-2 tracking-tight">
                      {service.title}
                    </h3>
                    <p className={`font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4 ${theme.subtitleClass}`}>
                      {service.subtitle}
                    </p>

                    {/* Description */}
                    <p className="font-[var(--font-body)] text-sm sm:text-base text-on-surface-variant leading-relaxed mb-6 flex-1">
                      {service.fullDescription || service.shortDescription}
                    </p>

                    {/* Includes List */}
                    <div className="space-y-2.5 mb-8 pb-8 border-b border-outline-variant/15 dark:border-white/10">
                      {service.includes.slice(0, 3).map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${theme.checkClass}`} />
                          <span className="font-[var(--font-body)] text-xs sm:text-sm text-on-surface-variant/90">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div>
                      <Link
                        href={`/solutions/${service.id}`}
                        className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-[var(--font-heading)] text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 border backdrop-blur-md shadow-md ${theme.btnClass}`}
                      >
                        <span>Deep-Dive Details</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </TiltCard>
              </ScrollFadeIn>
            );
          })}
        </div>
      </section>

      {/* Service Detail Sections */}
      {services.map((service) => (
        <section
          key={service.id}
          id={service.id}
          className="py-20 md:py-32 px-4 sm:px-6 md:px-[80px] max-w-[1440px] mx-auto border-t border-outline-variant/20 scroll-mt-24"
        >
          <ScrollFadeIn direction="up" delay={0}>
            <div className="mb-12">
              <Badge className="mb-4">{service.badge}</Badge>
              <h2 className="font-[var(--font-heading)] text-4xl md:text-5xl font-bold text-on-surface mb-6">
                {service.title}
              </h2>
              <p className="font-[var(--font-body)] text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-3xl">
                {service.fullDescription || service.shortDescription}
              </p>
            </div>
          </ScrollFadeIn>

          {/* Includes Full List */}
          {service.includes && (
            <ScrollFadeIn direction="left" delay={0.1}>
              <div className="mb-12">
                <h3 className="font-[var(--font-heading)] text-2xl font-bold text-on-surface mb-6">
                  What's Included
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.includes.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: service.badgeColor }} />
                      <span className="font-[var(--font-body)] text-base text-on-surface-variant">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollFadeIn>
          )}

          {/* Key Benefits */}
          {service.appliedSolutions && (
            <ScrollFadeIn direction="right" delay={0.2}>
              <div className="mb-12 glass-card rounded-2xl p-8 md:p-12 border border-white/80">
                <h3 className="font-[var(--font-heading)] text-2xl font-bold text-on-surface mb-6">
                  Key Benefits & Outcomes
                </h3>
                <div className="space-y-4">
                  {service.appliedSolutions.map((solution, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white flex-shrink-0 mt-0.5"
                        style={{ background: service.badgeColor }}
                      >
                        {idx + 1}
                      </div>
                      <div>
                        <p className="font-[var(--font-body)] text-base text-on-surface-variant">
                          {solution}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollFadeIn>
          )}

          {/* CTA */}
          <ScrollFadeIn direction="up" delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <AnimatedButton
                href={`/solutions/${service.id}`}
                variant="primary"
                size="lg"
              >
                View Full {service.title} Architecture <ArrowRight className="w-4 h-4" />
              </AnimatedButton>
              <AnimatedButton
                href="/contact"
                variant="outline"
                size="lg"
              >
                Request Consultation
              </AnimatedButton>
            </div>
          </ScrollFadeIn>
        </section>
      ))}
    </main>
  );
}
