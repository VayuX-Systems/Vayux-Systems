'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  Lock,
  FileCheck,
  Scale,
  AlertCircle,
  Target,
  TrendingDown,
  Zap,
  Clock,
  ArrowRight,
} from 'lucide-react';
import HeroScrollContainer from '@/components/animations/HeroScrollContainer';
import ScrollReveal from '@/components/layout/ScrollReveal';
import ScrollFadeIn from '@/components/layout/ScrollFadeIn';
import SectionHeading from '@/components/ui/SectionHeading';
import FAQ from '@/components/ui/FAQ';
import Badge from '@/components/ui/Badge';
import AnimatedButton from '@/components/ui/AnimatedButton';
import EnhancedServiceCard from '@/components/ui/EnhancedServiceCard';
import StatCard from '@/components/sections/AnimatedStatCard';
import TiltCard from '@/components/ui/TiltCard';
import { services, coreCapabilities, homeFAQ } from '@/lib/site-data';

export default function HomePageContent() {
  // Service cards data with enhancements
  const enhancedServices = [
    {
      title: 'Security Operations Center (SOC)',
      subtitle: '24/7 Autonomous Threat Monitoring & Triage',
      description: 'Continuous, luminous oversight of your digital assets. Anticipating anomalies before they manifest through advanced threat telemetry and heuristic behavioral analysis.',
      icon: '🛡️',
      color: '#38bdf8',
      includes: [
        '24/7 Real-time Monitoring',
        'Advanced Threat Detection',
        'Incident Response',
      ],
      href: '/solutions/soc',
      isFlagship: true,
    },
    {
      title: 'VAPT Services',
      subtitle: 'Systemic Vulnerability & Penetration Testing',
      description: 'Vulnerability Assessment & Penetration Testing utilizing adversarial simulation techniques.',
      icon: '⚡',
      color: '#f43f5e',
      includes: [
        'Comprehensive Scans',
        'Exploitation Simulation',
        'Remediation Roadmap',
      ],
      href: '/solutions/vapt',
    },
    {
      title: 'GRC Alignment',
      subtitle: 'Governance, Risk & Compliance Architecture',
      description: 'Governance, Risk, and Compliance alignment establishing unassailable policy architectures.',
      icon: '⚖️',
      color: '#10b981',
      includes: [
        'Policy Framework',
        'Audit Support',
        'Compliance Mapping',
      ],
      href: '/solutions/grc',
    },
    {
      title: 'DFIR Protocols',
      subtitle: 'Digital Forensics & Incident Response',
      description: 'Digital Forensics and Incident Response providing luminous clarity post-breach.',
      icon: '🔍',
      color: '#f59e0b',
      includes: [
        'Forensic Analysis',
        'Timeline Reconstruction',
        'Incident Reports',
      ],
      href: '/solutions/dfir',
    },
  ];

  const statsData = [
    {
      icon: <AlertCircle className="w-6 h-6" />,
      value: 10000,
      label: 'Threats Analyzed Daily',
      suffix: '+',
      color: '#0284c7',
      delay: 0,
    },
    {
      icon: <Target className="w-6 h-6" />,
      value: 98,
      label: 'Detection Accuracy',
      suffix: '%',
      color: '#0284c7',
      delay: 0.1,
    },
    {
      icon: <TrendingDown className="w-6 h-6" />,
      value: 42,
      label: 'Cost Reduction',
      suffix: '%',
      color: '#0284c7',
      delay: 0.2,
    },
    {
      icon: <Lock className="w-6 h-6" />,
      value: 0,
      label: 'Data Breaches',
      suffix: null,
      color: '#0284c7',
      delay: 0.3,
    },
    {
      icon: <Clock className="w-6 h-6" />,
      value: 24,
      label: 'Hour Monitoring',
      suffix: '/7',
      color: '#0284c7',
      delay: 0.4,
    },
  ];

  return (
    <div className="relative overflow-hidden w-full">
      {/* 1. Hero Section */}
      <HeroScrollContainer />

      {/* 2. Content Layer */}
      <div className="relative z-30 bg-transparent">
        {/* Institutional Trust Badges - Enhanced */}
        <ScrollFadeIn direction="up" delay={0}>
          <section className="py-10 md:py-12 px-4 sm:px-6 md:px-[80px] border-y border-slate-200/70 dark:border-white/10 bg-slate-50/50 dark:bg-[#09090b]/60 backdrop-blur-sm">
            <div className="max-w-[1440px] mx-auto">
              <p className="text-center font-[var(--font-heading)] text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 mb-8 font-semibold">
                Architectural Standards &amp; Certifications
              </p>
              <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-16 md:gap-24 transition-all duration-700">
                <TiltCard className="rounded-lg">
                  <div className="flex items-center gap-3 px-4 py-2">
                    <ShieldCheck className="w-7 h-7 text-primary" />
                    <span className="font-[var(--font-heading)] text-sm font-semibold tracking-wider text-slate-800 dark:text-slate-200">
                      ISO 27001
                    </span>
                  </div>
                </TiltCard>

                <TiltCard className="rounded-lg">
                  <div className="flex items-center gap-3 px-4 py-2">
                    <Lock className="w-7 h-7 text-primary" />
                    <span className="font-[var(--font-heading)] text-sm font-semibold tracking-wider text-slate-800 dark:text-slate-200">
                      SOC 2 TYPE II
                    </span>
                  </div>
                </TiltCard>

                <TiltCard className="rounded-lg">
                  <div className="flex items-center gap-3 px-4 py-2">
                    <FileCheck className="w-7 h-7 text-primary" />
                    <span className="font-[var(--font-heading)] text-sm font-semibold tracking-wider text-slate-800 dark:text-slate-200">
                      NIST CSF
                    </span>
                  </div>
                </TiltCard>

                <TiltCard className="rounded-lg">
                  <div className="flex items-center gap-3 px-4 py-2">
                    <Scale className="w-7 h-7 text-primary" />
                    <span className="font-[var(--font-heading)] text-sm font-semibold tracking-wider text-slate-800 dark:text-slate-200">
                      GDPR COMPLIANT
                    </span>
                  </div>
                </TiltCard>
              </div>
            </div>
          </section>
        </ScrollFadeIn>

        {/* Mission & Vision */}
        <section className="py-20 md:py-32 px-4 sm:px-6 md:px-[80px] max-w-[1440px] mx-auto text-center">
          <ScrollFadeIn direction="up" delay={0.1}>
            <div className="max-w-5xl mx-auto glass-panel rounded-3xl p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-[0_20px_60px_rgba(0,168,255,0.08)] border border-white/80">
              {/* Background Image */}
              <div className="absolute inset-0 -z-10 opacity-25">
                <Image
                  src="/images/sentinel_grid.jpg"
                  alt="Sentinel Defense Grid"
                  fill
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-transparent -z-10" />

              <span className="font-[var(--font-heading)] text-primary tracking-[0.2em] uppercase mb-6 text-xs sm:text-sm font-bold inline-flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" /> VayuX Vision
              </span>
              <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl md:text-5xl text-on-surface mb-8 font-bold tracking-tight leading-[1.2]">
                Engineering unassailable digital environments through luminous clarity and celestial technicality.
              </h2>
              <p className="font-[var(--font-body)] text-base sm:text-lg md:text-xl text-on-surface-variant leading-relaxed font-light max-w-3xl mx-auto">
                We are not just a vendor; we are an elite research and development guardian laboratory. Our mission is to transcend reactive measures, providing an operational feedback loop that channels real-world insights into autonomous architectural protection.
              </p>
            </div>
          </ScrollFadeIn>
        </section>

        {/* Guardian Philosophy */}
        <section className="pb-20 md:pb-32 px-4 sm:px-6 md:px-[80px] max-w-[1440px] mx-auto relative">
          <ScrollFadeIn direction="up" delay={0.2}>
            <div className="glass-panel rounded-3xl p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-[0_20px_60px_rgba(0,168,255,0.08)] border border-white/80">
              {/* Background Image */}
              <div className="absolute inset-0 -z-10 opacity-20">
                <Image
                  src="/images/soc_command.jpg"
                  alt="Autonomous SOC Command Hub"
                  fill
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/90 to-surface/70 -z-10" />

              <div className="max-w-3xl relative z-10">
                <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl md:text-5xl text-on-surface mb-6 md:mb-8 font-bold tracking-tight">
                  The Lab vs. The Vendor
                </h2>
                <p className="font-[var(--font-body)] text-base sm:text-lg md:text-xl text-on-surface-variant mb-8 md:mb-10 leading-relaxed font-light">
                  Traditional cybersecurity vendors operate on fear and opacity. VayuX operates as a transparent R&amp;D laboratory. We build autonomous architectural protection infused with light, clarity, and absolute precision. You are not buying a product; you are engaging elite digital guardians focused on applied technical solutions rather than routine maintenance.
                </p>
                <AnimatedButton
                  href="/about"
                  variant="outline"
                  size="md"
                >
                  Discover Our Methodology <ArrowRight className="w-4 h-4" />
                </AnimatedButton>
              </div>
            </div>
          </ScrollFadeIn>
        </section>

        {/* Services Bento Grid - ENHANCED */}
        <section className="py-20 md:py-32 px-4 sm:px-6 md:px-[80px] max-w-[1440px] mx-auto border-t border-outline-variant/20">
          <SectionHeading
            center
            title="Applied Technical Solutions"
            subtitle="Precision engineering for every layer of your digital ecosystem, transitioning from routine maintenance to resilient architecture."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {enhancedServices.map((service, idx) => (
              <EnhancedServiceCard
                key={service.title}
                {...service}
                delay={idx * 0.1}
              />
            ))}
          </div>

          {/* Operational Feedback Loop Banner */}
          <ScrollFadeIn delay={0.4} direction="up">
            <div className="mt-16 md:mt-24 glass-panel rounded-3xl p-8 md:p-12 relative overflow-hidden border border-white/80 shadow-[0_20px_60px_rgba(0,168,255,0.08)]">
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
          </ScrollFadeIn>
        </section>

        {/* Core Capabilities */}
        <section className="py-20 md:py-32 px-4 sm:px-6 md:px-[80px] max-w-[1440px] mx-auto">
          <SectionHeading
            title="Core Capabilities Deep-Dive"
            subtitle="Advanced architectural implementations and autonomous response systems designed for the modern threat landscape."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {coreCapabilities.map((capability, idx) => (
              <ScrollFadeIn
                key={capability.title}
                delay={idx * 0.1}
                direction={idx % 2 === 0 ? 'left' : 'right'}
              >
                <TiltCard className="rounded-2xl h-full">
                  <div className="glass-card rounded-2xl p-8 md:p-10 h-full">
                    <h3 className="font-[var(--font-heading)] text-xl md:text-2xl font-bold text-on-surface mb-4">
                      {capability.title}
                    </h3>
                    <p className="font-[var(--font-body)] text-base text-on-surface-variant font-light leading-relaxed">
                      {capability.description}
                    </p>
                  </div>
                </TiltCard>
              </ScrollFadeIn>
            ))}
          </div>
        </section>

        {/* Statistics Section - ENHANCED with Animated Counters */}
        <ScrollFadeIn direction="up" delay={0.1}>
          <section className="py-20 md:py-32 px-4 sm:px-6 md:px-[80px] max-w-[1440px] mx-auto">
            <SectionHeading
              center
              title="Performance Metrics"
              subtitle="Real-world impact measured across our operational engagements."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {statsData.map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </div>
          </section>
        </ScrollFadeIn>

        {/* CTA Section */}
        <ScrollFadeIn direction="up" delay={0.2}>
          <section className="py-20 md:py-32 px-4 sm:px-6 md:px-[80px] max-w-[1440px] mx-auto text-center">
            <div className="max-w-2xl mx-auto space-y-8">
              <div>
                <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-bold text-on-surface mb-4">
                  Ready to Transform Your Security Architecture?
                </h2>
                <p className="font-[var(--font-body)] text-lg text-on-surface-variant">
                  Join leading organizations leveraging autonomous architectures for unassailable protection.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <AnimatedButton
                  href="/contact"
                  variant="primary"
                  size="lg"
                >
                  Initiate Consultation
                </AnimatedButton>
                <AnimatedButton
                  href="/solutions"
                  variant="outline"
                  size="lg"
                >
                  Explore Solutions
                </AnimatedButton>
              </div>
            </div>
          </section>
        </ScrollFadeIn>

        {/* Strategic Partnership FAQ */}
        <section className="py-24 md:py-36 px-4 sm:px-6 md:px-[80px] bg-surface-container-low border-t border-outline-variant/20 rounded-b-3xl">
          <div className="max-w-4xl mx-auto">
            <SectionHeading
              center
              title="Strategic Partnership FAQ"
              subtitle="Clarifying our engagement model and operational parameters."
            />
            <ScrollFadeIn delay={0.1}>
              <FAQ items={homeFAQ} />
            </ScrollFadeIn>
          </div>
        </section>
      </div>
    </div>
  );
}
