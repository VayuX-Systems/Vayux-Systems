'use client';

import { CheckCircle, ArrowRight, Download, Clock, Users, Shield } from 'lucide-react';
import Link from 'next/link';
import ScrollReveal from '@/components/layout/ScrollReveal';
import SectionHeading from '@/components/ui/SectionHeading';
import Badge from '@/components/ui/Badge';
import { services } from '@/lib/site-data-enhanced';

export default function SolutionsPage() {
  return (
    <main className="relative overflow-hidden w-full">
      {/* Hero Section */}
      <section className="py-20 md:py-32 px-4 sm:px-6 md:px-[80px] max-w-[1440px] mx-auto text-center">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wide mb-6">
              🎯 Applied Technical Solutions
            </span>

            <h1 className="font-[var(--font-heading)] text-4xl md:text-6xl font-bold text-on-surface mb-6 leading-tight tracking-tight">
              Four Operational Pillars.<br />
              <span className="text-gradient">Real-World Telemetry</span>
            </h1>

            <p className="font-[var(--font-body)] text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-2xl mx-auto">
              SOC Management, VAPT, DFIR, and GRC—specialized services that protect your enterprise while feeding real-world operational telemetry into VayuX's R&D Laboratory.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-32 px-4 sm:px-6 md:px-[80px] max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <ScrollReveal key={service.id} delay={idx * 0.1}>
              <div
                className="glass-card rounded-2xl p-8 md:p-10 border border-white/80 hover:shadow-[0_20px_60px_rgba(0,168,255,0.12)] transition-all duration-300 flex flex-col h-full group"
                style={{
                  borderColor: service.badgeColor,
                  background: `linear-gradient(135deg, rgba(255,255,255,0.65) 0%, ${service.badgeColor}08 100%)`,
                }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0"
                    style={{
                      background: `${service.badgeColor}20`,
                    }}
                  >
                    {service.icon === 'Robot' && '🤖'}
                    {service.icon === 'Bug' && '🐛'}
                    {service.icon === 'Search' && '🔍'}
                    {service.icon === 'CheckSquare' && '✓'}
                  </div>
                  <Badge variant={service.flagship ? 'primary' : 'secondary'}>
                    {service.badge}
                  </Badge>
                </div>

                {/* Title & Subtitle */}
                <h3 className="font-[var(--font-heading)] text-2xl md:text-3xl font-bold text-on-surface mb-2">
                  {service.title}
                </h3>
                <p className="font-[var(--font-heading)] text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: service.badgeColor }}>
                  {service.subtitle}
                </p>

                {/* Description */}
                <p className="font-[var(--font-body)] text-base text-on-surface-variant leading-relaxed mb-6 flex-1">
                  {service.fullDescription || service.shortDescription}
                </p>

                {/* Includes List */}
                <div className="space-y-2 mb-8 pb-8 border-b border-outline-variant/20">
                  {service.includes.slice(0, 3).map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="font-[var(--font-body)] text-sm text-on-surface-variant">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Applied Solutions */}
                {service.appliedSolutions && (
                  <div className="mb-8">
                    <p className="font-[var(--font-heading)] text-xs uppercase tracking-wider font-bold text-on-surface mb-3">
                      Applied Solutions
                    </p>
                    <div className="space-y-2">
                      {service.appliedSolutions.map((solution, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: service.badgeColor }} />
                          <span className="font-[var(--font-body)] text-sm text-on-surface-variant">
                            {solution}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <Link
                  href={`#${service.id}`}
                  className="inline-flex items-center gap-2 text-primary hover:text-primary-container transition-colors font-[var(--font-heading)] font-semibold uppercase tracking-wide text-sm group-hover:translate-x-1 transition-transform"
                >
                  View Full Details <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Service Detail Cards */}
      {services.map((service) => (
        <section
          key={service.id}
          id={service.id}
          className="py-20 md:py-32 px-4 sm:px-6 md:px-[80px] max-w-[1440px] mx-auto border-t border-outline-variant/20 scroll-mt-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left: Details */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <div className="mb-8">
                  <Badge variant="secondary" className="mb-4">
                    {service.badge}
                  </Badge>
                  <h2 className="font-[var(--font-heading)] text-4xl md:text-5xl font-bold text-on-surface mb-6">
                    {service.title}
                  </h2>
                  <p className="font-[var(--font-body)] text-xl text-on-surface-variant leading-relaxed">
                    {service.fullDescription || service.shortDescription}
                  </p>
                </div>
              </ScrollReveal>

              {/* Methodology */}
              {service.methodology && (
                <ScrollReveal className="mb-12">
                  <h3 className="font-[var(--font-heading)] text-2xl font-bold text-on-surface mb-6">
                    Methodology
                  </h3>
                  <div className="space-y-4">
                    {service.methodology.steps.map((step, idx) => (
                      <div
                        key={idx}
                        className="glass-card rounded-xl p-6 border border-white/80"
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-on-primary flex-shrink-0"
                            style={{ background: service.badgeColor }}
                          >
                            {idx + 1}
                          </div>
                          <div>
                            <h4 className="font-[var(--font-heading)] font-bold text-on-surface mb-2">
                              {step.title}
                            </h4>
                            <p className="font-[var(--font-body)] text-on-surface-variant">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              )}

              {/* Feedback Loop */}
              {service.feedbackLoop && (
                <ScrollReveal>
                  <div
                    className="glass-card rounded-2xl p-8 border-2 border-white/80"
                    style={{ borderColor: service.badgeColor }}
                  >
                    <h3 className="font-[var(--font-heading)] text-xl font-bold text-on-surface mb-4">
                      R&D Feedback Loop
                    </h3>
                    <p className="font-[var(--font-body)] text-on-surface-variant leading-relaxed">
                      {service.feedbackLoop}
                    </p>
                  </div>
                </ScrollReveal>
              )}
            </div>

            {/* Right: Sidebar */}
            <div className="lg:sticky lg:top-20 lg:h-fit">
              <ScrollReveal>
                {/* Tech Specs */}
                {service.techSpecs && (
                  <div className="glass-card rounded-2xl p-8 border border-white/80 mb-6">
                    <h4 className="font-[var(--font-heading)] text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-primary" />
                      Technical Specs
                    </h4>
                    <ul className="space-y-3">
                      {service.techSpecs.map((spec, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span className="font-[var(--font-body)] text-sm text-on-surface-variant">
                            {spec}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA Card */}
                <div className="glass-card rounded-2xl p-8 border border-white/80 bg-gradient-to-br from-primary/5 to-transparent">
                  <h4 className="font-[var(--font-heading)] text-lg font-bold text-on-surface mb-4">
                    Interested?
                  </h4>
                  <p className="font-[var(--font-body)] text-sm text-on-surface-variant mb-6">
                    Request a consultation or technical brief for {service.title}.
                  </p>
                  <div className="space-y-3">
                    <Link
                      href="/contact"
                      className="btn-glow px-4 py-2.5 rounded-lg text-on-primary font-[var(--font-heading)] tracking-widest uppercase text-xs w-full flex items-center justify-center gap-2"
                    >
                      Get Started
                    </Link>
                    {service.flagship && (
                      <button className="w-full px-4 py-2.5 rounded-lg border border-primary text-primary hover:bg-primary/10 transition-colors font-[var(--font-heading)] tracking-widest uppercase text-xs flex items-center justify-center gap-2">
                        <Download className="w-4 h-4" />
                        Download Brief
                      </button>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}
