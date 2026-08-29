'use client';

import { ShieldAlert, Scale, Search, GraduationCap, Download, ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';
import ScrollReveal from '@/components/layout/ScrollReveal';
import Dribbble3DCard from '@/components/animations/Dribbble3DCard';
import GlassCard from '@/components/ui/GlassCard';
import SectionHeading from '@/components/ui/SectionHeading';
import Badge from '@/components/ui/Badge';
import { services } from '@/lib/site-data-enhanced';

export default function ServicesOverview() {
  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 md:px-[80px] max-w-[1440px] mx-auto border-t border-outline-variant/20">
      <SectionHeading
        center
        title="Applied Technical Solutions"
        subtitle="Precision engineering for every layer of your digital ecosystem, transitioning from routine maintenance to resilient architecture."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {/* Flagship SOC Card */}
        <ScrollReveal className="md:col-span-2">
          <Link href="/solutions#soc" className="h-full block">
            <Dribbble3DCard depth={30} className="p-8 sm:p-10 md:p-12 group flex flex-col justify-between min-h-[380px] h-full">
              <div>
                <div className="flex justify-between items-start mb-8">
                  <div className="w-10 h-10 text-primary group-hover:text-primary-container transition-colors">
                    🤖
                  </div>
                  <Badge variant="primary">Flagship Service</Badge>
                </div>
                <h3 className="font-[var(--font-heading)] text-2xl sm:text-3xl text-on-surface mb-4 font-bold">
                  Security Operations Center (SOC)
                </h3>
                <p className="font-[var(--font-body)] text-base sm:text-lg text-on-surface-variant max-w-xl font-light mb-6 leading-relaxed">
                  Continuous, luminous oversight of your digital assets. Anticipating anomalies before they manifest through advanced threat telemetry and heuristic behavioral analysis.
                </p>
              </div>
              <div className="flex items-center gap-4 border-t border-outline-variant/20 pt-6 mt-8">
                <span className="text-xs sm:text-sm font-[var(--font-heading)] uppercase tracking-wider text-primary flex items-center gap-2 group-hover:text-primary-container transition-colors font-semibold">
                  <Download className="w-4 h-4" /> Download Technical Brief
                </span>
              </div>
            </Dribbble3DCard>
          </Link>
        </ScrollReveal>

        {/* VAPT Card */}
        <ScrollReveal delay={0.1}>
          <Link href="/solutions#vapt" className="h-full block">
            <Dribbble3DCard depth={25} className="p-8 group flex flex-col justify-between h-full">
              <div>
                <div className="w-8 h-8 text-primary mb-6 block group-hover:text-primary-container transition-colors">
                  🐛
                </div>
                <h3 className="font-[var(--font-heading)] text-xl sm:text-2xl font-bold text-on-surface mb-3 tracking-tight">
                  VAPT Services
                </h3>
                <p className="font-[var(--font-body)] text-sm sm:text-base text-on-surface-variant font-light mb-6 leading-relaxed">
                  Vulnerability Assessment & Penetration Testing utilizing adversarial simulation techniques.
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-outline-variant/20 pt-5 mt-auto">
                <span className="text-xs font-[var(--font-heading)] uppercase tracking-wider text-primary font-semibold">
                  View Specs
                </span>
                <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
              </div>
            </Dribbble3DCard>
          </Link>
        </ScrollReveal>

        {/* GRC Card */}
        <ScrollReveal delay={0.15}>
          <Link href="/solutions#grc" className="h-full block">
            <Dribbble3DCard depth={25} className="p-8 group flex flex-col justify-between h-full">
              <div>
                <div className="w-8 h-8 text-primary mb-6 block group-hover:text-primary-container transition-colors">
                  ⚖️
                </div>
                <h3 className="font-[var(--font-heading)] text-xl sm:text-2xl font-bold text-on-surface mb-3 tracking-tight">
                  GRC Compliance
                </h3>
                <p className="font-[var(--font-body)] text-sm sm:text-base text-on-surface-variant font-light mb-6 leading-relaxed">
                  Governance, Risk, and Compliance alignment establishing unassailable policy architectures.
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-outline-variant/20 pt-5 mt-auto">
                <span className="text-xs font-[var(--font-heading)] uppercase tracking-wider text-primary font-semibold">
                  View Specs
                </span>
                <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
              </div>
            </Dribbble3DCard>
          </Link>
        </ScrollReveal>

        {/* DFIR Card */}
        <ScrollReveal delay={0.2}>
          <Link href="/solutions#dfir" className="h-full block">
            <Dribbble3DCard depth={25} className="p-8 group flex flex-col justify-between h-full">
              <div>
                <div className="w-8 h-8 text-primary mb-6 block group-hover:text-primary-container transition-colors">
                  🔍
                </div>
                <h3 className="font-[var(--font-heading)] text-xl sm:text-2xl font-bold text-on-surface mb-3 tracking-tight">
                  DFIR Response
                </h3>
                <p className="font-[var(--font-body)] text-sm sm:text-base text-on-surface-variant font-light mb-6 leading-relaxed">
                  Digital Forensics and Incident Response providing luminous clarity post-breach.
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-outline-variant/20 pt-5 mt-auto">
                <span className="text-xs font-[var(--font-heading)] uppercase tracking-wider text-primary font-semibold">
                  View Specs
                </span>
                <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
              </div>
            </Dribbble3DCard>
          </Link>
        </ScrollReveal>

        {/* Training Card */}
        <ScrollReveal delay={0.25}>
          <Link href="/solutions#training" className="h-full block">
            <Dribbble3DCard depth={25} className="p-8 group flex flex-col justify-between h-full">
              <div>
                <div className="w-8 h-8 text-primary mb-6 block group-hover:text-primary-container transition-colors">
                  🎓
                </div>
                <h3 className="font-[var(--font-heading)] text-xl sm:text-2xl font-bold text-on-surface mb-3 tracking-tight">
                  Cyber Training
                </h3>
                <p className="font-[var(--font-body)] text-sm sm:text-base text-on-surface-variant font-light mb-6 leading-relaxed">
                  Elevating human awareness to elite standards, creating a resilient biological firewall.
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-outline-variant/20 pt-5 mt-auto">
                <span className="text-xs font-[var(--font-heading)] uppercase tracking-wider text-primary font-semibold">
                  View Specs
                </span>
                <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
              </div>
            </Dribbble3DCard>
          </Link>
        </ScrollReveal>
      </div>

      {/* Operational Feedback Loop Banner */}
      <ScrollReveal className="mt-16 md:mt-24">
        <div className="glass-panel rounded-3xl p-8 md:p-12 relative overflow-hidden border border-white/80 shadow-[0_20px_60px_rgba(0,168,255,0.08)]">
          <div className="absolute inset-0 -z-10 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/90 to-surface/70" />
          </div>

          <div className="flex items-start gap-4 mb-4">
            <Zap className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <span className="font-[var(--font-heading)] text-primary tracking-[0.2em] uppercase text-xs font-bold">
              The VayuX Operational Feedback Loop
            </span>
          </div>

          <h3 className="font-[var(--font-heading)] text-2xl md:text-3xl font-bold text-on-surface mb-4">
            How Operations Drive Next-Generation Autonomous Architectures
          </h3>

          <p className="font-[var(--font-body)] text-base text-on-surface-variant leading-relaxed max-w-3xl">
            Unlike traditional vendors that treat engagements as routine maintenance, every VayuX operational engagement serves as a catalyst for deeper systemic inquiry. Real-world insights from SOC triage, VAPT findings, DFIR forensics, and GRC audits channel directly into our R&D Laboratory to engineer adaptive, self-defending security architectures.
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}
