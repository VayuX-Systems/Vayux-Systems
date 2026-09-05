'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { api, Solution } from '@/lib/api-client';
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
import ScrollFadeIn from '@/components/layout/ScrollFadeIn';
import SectionHeading from '@/components/ui/SectionHeading';
import FAQ from '@/components/ui/FAQ';
import Badge from '@/components/ui/Badge';
import AnimatedButton from '@/components/ui/AnimatedButton';
import EnhancedServiceCard from '@/components/ui/EnhancedServiceCard';
import StatCard from '@/components/sections/AnimatedStatCard';
import TiltCard from '@/components/ui/TiltCard';
import GlobalNodeInfrastructure from '@/components/sections/GlobalNodeInfrastructure';
import { services, coreCapabilities, homeFAQ } from '@/lib/site-data';

export default function HomePageContent() {
  const [activeServiceIdx, setActiveServiceIdx] = useState(0);
  const servicesRailRef = useRef<HTMLDivElement>(null);

  const handleServicesScroll = () => {
    if (!servicesRailRef.current) return;
    const { scrollLeft, offsetWidth } = servicesRailRef.current;
    const cardWidth = Math.max(280, offsetWidth * 0.85);
    const idx = Math.round(scrollLeft / cardWidth);
    setActiveServiceIdx(Math.max(0, Math.min(idx, servicesList.length - 1)));
  };

  const scrollToService = (idx: number) => {
    if (!servicesRailRef.current) return;
    const children = servicesRailRef.current.children;
    if (children[idx]) {
      (children[idx] as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
      setActiveServiceIdx(idx);
    }
  };

  // Service cards data with enhancements (Structured 2x2 Sovereign Defense Matrix)
  const enhancedServices = [
    {
      title: 'Security Operations Center (SOC)',
      subtitle: '24/7 Autonomous Threat Monitoring & Triage',
      description: 'Continuous, luminous oversight of enterprise perimeters. Ingesting distributed telemetry to correlate and neutralize attack vectors in under 15ms.',
      icon: '🛡️',
      color: '#38bdf8',
      badge: '24/7 ACTIVE DEFENSE',
      includes: [
        'Sub-15ms Event Correlation Engine',
        'Autonomous Threat Containment',
        '24/7/365 Continuous Human Analyst Triage',
      ],
      href: '/solutions/soc',
      isFlagship: true,
    },
    {
      title: 'Vulnerability Assessment & Penetration Testing (VAPT)',
      subtitle: 'Adversarial Exploitation & Red Team Simulation',
      description: 'Rigorous offensive security assessments targeting web, cloud, and OS kernel boundaries to uncover deep zero-day vulnerabilities before adversaries do.',
      icon: '⚡',
      color: '#f43f5e',
      badge: 'OFFENSIVE SIMULATION',
      includes: [
        'Comprehensive Architecture Audits',
        'Kernel & Cloud Exploitation Simulation',
        'Developer-Ready Patch Remediation Roadmaps',
      ],
      href: '/solutions/vapt',
    },
    {
      title: 'Digital Forensics & Incident Response (DFIR)',
      subtitle: 'Sub-4-Hour Emergency Breach Containment',
      description: 'Guaranteed emergency response deployment within 4 hours. Extracting volatile memory telemetry and securing court-admissible forensic evidence.',
      icon: '🔍',
      color: '#f59e0b',
      badge: 'EMERGENCY DFIR DISPATCH',
      includes: [
        'Volatile Memory & Attack Reconstruction',
        'Court-Admissible Chain-of-Custody Forensics',
        'Rapid Enterprise Eradication & Recovery',
      ],
      href: '/solutions/dfir',
    },
    {
      title: 'Governance, Risk & Compliance (GRC)',
      subtitle: 'Statutory DPDP Act 2023 & Zero-Trust Governance',
      description: 'Aligning enterprise security architectures with India DPDP Act 2023 mandates, CERT-In 6-hour disclosure runbooks, and ISO 27001 statutory standards.',
      icon: '⚖️',
      color: '#10b981',
      badge: 'SOVEREIGN COMPLIANCE',
      includes: [
        'DPDP Act 2023 Statutory Alignment',
        'CERT-In 6-Hour Disclosure Directives',
        'Continuous Zero-Trust Policy Auditing',
      ],
      href: '/solutions/grc',
    },
  ];

  const [servicesList, setServicesList] = useState(enhancedServices);

  useEffect(() => {
    async function loadLiveHomeSolutions() {
      try {
        const res = await api.getSolutions(true);
        if (res?.results && res.results.length > 0) {
          const updated = enhancedServices.map((srv) => {
            const slug = srv.href.replace('/solutions/', '');
            const liveMatch = res.results.find((s: Solution) => s.slug === slug);
            if (liveMatch) {
              return {
                ...srv,
                title: liveMatch.name || srv.title,
                subtitle: liveMatch.tagline || srv.subtitle,
                description: liveMatch.lead_definition || srv.description,
                includes: liveMatch.capabilities_list?.length > 0 ? liveMatch.capabilities_list.slice(0, 3) : srv.includes,
              };
            }
            return srv;
          });
          setServicesList(updated);
        }
      } catch {
        // Fallback silently
      }
    }
    loadLiveHomeSolutions();
  }, []);

  const statsData = [
    {
      icon: <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6" />,
      value: 10000,
      label: 'Threats Analyzed Daily',
      suffix: '+',
      color: '#0284c7',
      delay: 0,
    },
    {
      icon: <Target className="w-5 h-5 sm:w-6 sm:h-6" />,
      value: 99.9,
      label: 'Detection Accuracy',
      suffix: '%',
      color: '#0284c7',
      delay: 0.1,
    },
    {
      icon: <TrendingDown className="w-5 h-5 sm:w-6 sm:h-6" />,
      value: 42,
      label: 'Cost Reduction',
      suffix: '%',
      color: '#0284c7',
      delay: 0.2,
    },
    {
      icon: <Zap className="w-5 h-5 sm:w-6 sm:h-6" />,
      value: 15,
      label: 'Threat Mitigation SLA',
      prefix: '< ',
      suffix: 'ms',
      color: '#0284c7',
      delay: 0.3,
    },
    {
      icon: <Clock className="w-5 h-5 sm:w-6 sm:h-6" />,
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
        {/* Institutional Trust Badges - Responsive 2x2 on Mobile */}
        <ScrollFadeIn direction="up" delay={0}>
          <section className="py-6 sm:py-10 md:py-12 px-4 sm:px-6 md:px-[80px] border-y border-slate-200/70 dark:border-white/10 bg-slate-50/50 dark:bg-[#09090b]/60 backdrop-blur-sm">
            <div className="max-w-[1440px] mx-auto">
              <p className="text-center font-[var(--font-heading)] text-[11px] sm:text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 mb-4 sm:mb-8 font-semibold">
                Architectural Standards
              </p>
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center items-center gap-2.5 sm:gap-8 md:gap-16 transition-all duration-700">
                <TiltCard className="rounded-lg">
                  <div className="flex items-center justify-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-2">
                    <ShieldCheck className="w-5 h-5 sm:w-7 sm:h-7 text-primary shrink-0" />
                    <span className="font-[var(--font-heading)] text-xs sm:text-sm font-semibold tracking-wider text-slate-800 dark:text-slate-200">
                      ISO 27001 Aligned Controls
                    </span>
                  </div>
                </TiltCard>

                <TiltCard className="rounded-lg">
                  <div className="flex items-center justify-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-2">
                    <Lock className="w-5 h-5 sm:w-7 sm:h-7 text-primary shrink-0" />
                    <span className="font-[var(--font-heading)] text-xs sm:text-sm font-semibold tracking-wider text-slate-800 dark:text-slate-200">
                      SOC 2 Security Architecture
                    </span>
                  </div>
                </TiltCard>

                <TiltCard className="rounded-lg">
                  <div className="flex items-center justify-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-2">
                    <FileCheck className="w-5 h-5 sm:w-7 sm:h-7 text-primary shrink-0" />
                    <span className="font-[var(--font-heading)] text-xs sm:text-sm font-semibold tracking-wider text-slate-800 dark:text-slate-200">
                      NIST CSF Framework Principles
                    </span>
                  </div>
                </TiltCard>

                <TiltCard className="rounded-lg">
                  <div className="flex items-center justify-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-2">
                    <Scale className="w-5 h-5 sm:w-7 sm:h-7 text-primary shrink-0" />
                    <span className="font-[var(--font-heading)] text-xs sm:text-sm font-semibold tracking-wider text-slate-800 dark:text-slate-200">
                      GDPR-Ready Data Practices
                    </span>
                  </div>
                </TiltCard>
              </div>
            </div>
          </section>
        </ScrollFadeIn>

        {/* Mission & Vision - Scaled for Mobile */}
        <section className="py-12 sm:py-16 md:py-28 px-4 sm:px-6 md:px-[80px] max-w-[1440px] mx-auto text-center">
          <ScrollFadeIn direction="up" delay={0.1}>
            <div className="max-w-5xl mx-auto glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-10 md:p-16 relative overflow-hidden shadow-[0_20px_60px_rgba(0,168,255,0.08)] border border-white/80">
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

              <span className="font-[var(--font-heading)] text-primary tracking-[0.2em] uppercase mb-3 sm:mb-6 text-xs sm:text-sm font-bold inline-flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" /> VayuX Vision
              </span>
              <h2 className="font-[var(--font-heading)] text-xl sm:text-3xl md:text-5xl text-on-surface mb-4 sm:mb-8 font-bold tracking-tight leading-snug sm:leading-[1.2]">
                Engineering unassailable digital environments through luminous clarity and celestial technicality.
              </h2>
              <p className="font-[var(--font-body)] text-xs sm:text-base md:text-xl text-on-surface-variant leading-relaxed font-light max-w-3xl mx-auto">
                We are not just a vendor; we are an elite research and development guardian laboratory. Our mission is to transcend reactive measures, providing an operational feedback loop that channels real-world insights into autonomous architectural protection.
              </p>
            </div>
          </ScrollFadeIn>
        </section>

        {/* Guardian Philosophy - Scaled for Mobile */}
        <section className="pb-12 sm:pb-16 md:pb-28 px-4 sm:px-6 md:px-[80px] max-w-[1440px] mx-auto relative">
          <ScrollFadeIn direction="up" delay={0.2}>
            <div className="glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-10 md:p-16 relative overflow-hidden shadow-[0_20px_60px_rgba(0,168,255,0.08)] border border-white/80">
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
                <h2 className="font-[var(--font-heading)] text-2xl sm:text-4xl md:text-5xl text-on-surface mb-4 sm:mb-6 md:mb-8 font-bold tracking-tight">
                  The Lab vs. The Vendor
                </h2>
                <p className="font-[var(--font-body)] text-xs sm:text-base md:text-xl text-on-surface-variant mb-5 sm:mb-8 md:mb-10 leading-relaxed font-light">
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

        {/* Services Section — Mobile Horizontal Snap Rail & Desktop Bento Grid */}
        <section className="py-12 sm:py-16 md:py-28 px-4 sm:px-6 md:px-[80px] max-w-[1440px] mx-auto border-t border-outline-variant/20">
          <SectionHeading
            center
            title="Applied Technical Solutions"
            subtitle="Precision engineering for every layer of your digital ecosystem, transitioning from routine maintenance to resilient architecture."
          />

          <div className="relative">
            <div
              ref={servicesRailRef}
              onScroll={handleServicesScroll}
              className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-4 -mx-4 px-4 no-scrollbar md:grid md:grid-cols-2 md:gap-8 md:overflow-visible md:mx-0 md:px-0 max-w-6xl mx-auto"
            >
              {servicesList.map((service, idx) => (
                <div
                  key={service.title}
                  className="w-[86vw] sm:w-[360px] shrink-0 snap-center md:w-auto md:shrink md:snap-align-none h-full"
                >
                  <EnhancedServiceCard
                    {...service}
                    delay={idx * 0.1}
                  />
                </div>
              ))}
            </div>

            {/* Mobile Carousel Indicators & Swipe Hint */}
            <div className="flex md:hidden items-center justify-center gap-1.5 mt-3">
              {servicesList.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToService(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeServiceIdx === idx ? 'w-6 bg-primary' : 'w-1.5 bg-outline-variant/40'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <p className="text-center text-[11px] font-mono text-on-surface-variant/60 mt-1.5 md:hidden">
              ← Swipe to explore 4 applied solutions →
            </p>
          </div>

          {/* Operational Feedback Loop Banner */}
          <ScrollFadeIn delay={0.4} direction="up">
            <div className="mt-8 sm:mt-16 md:mt-24 glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 relative overflow-hidden border border-white/80 shadow-[0_20px_60px_rgba(0,168,255,0.08)]">
              <div className="absolute inset-0 -z-10 opacity-20">
                <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/90 to-surface/70" />
              </div>

              <div className="flex items-start gap-3 mb-2 sm:mb-4">
                <Zap className="w-4 h-4 sm:w-6 sm:h-6 text-primary flex-shrink-0 mt-0.5" />
                <span className="font-[var(--font-heading)] text-primary tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[10px] sm:text-xs font-bold">
                  The VayuX Operational Feedback Loop
                </span>
              </div>

              <h3 className="font-[var(--font-heading)] text-lg sm:text-2xl md:text-3xl font-bold text-on-surface mb-2 sm:mb-4">
                How Operations Drive Next-Generation Autonomous Architectures
              </h3>

              <p className="font-[var(--font-body)] text-xs sm:text-sm md:text-base text-on-surface-variant leading-relaxed max-w-3xl">
                Unlike traditional vendors that treat engagements as routine maintenance, every VayuX operational engagement serves as a catalyst for deeper systemic inquiry. Real-world insights from SOC triage, VAPT findings, DFIR forensics, and GRC audits channel directly into our R&D Laboratory to engineer adaptive, self-defending security architectures.
              </p>
            </div>
          </ScrollFadeIn>
        </section>

        {/* Core Capabilities Deep-Dive — Compact 2-Column Responsive Grid */}
        <section className="py-12 sm:py-16 md:py-28 px-4 sm:px-6 md:px-[80px] max-w-[1440px] mx-auto">
          <SectionHeading
            title="Core Capabilities Deep-Dive"
            subtitle="Advanced architectural implementations and autonomous response systems designed for the modern threat landscape."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-6 md:gap-8">
            {coreCapabilities.map((capability, idx) => (
              <ScrollFadeIn
                key={capability.title}
                delay={idx * 0.1}
                direction={idx % 2 === 0 ? 'left' : 'right'}
              >
                <TiltCard className="rounded-xl sm:rounded-2xl h-full">
                  <div className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 h-full">
                    <h3 className="font-[var(--font-heading)] text-base sm:text-xl md:text-2xl font-bold text-on-surface mb-2">
                      {capability.title}
                    </h3>
                    <p className="font-[var(--font-body)] text-xs sm:text-sm md:text-base text-on-surface-variant font-light leading-relaxed">
                      {capability.description}
                    </p>
                  </div>
                </TiltCard>
              </ScrollFadeIn>
            ))}
          </div>
        </section>

        {/* Global Node Infrastructure (Apple Wallpaper Cyber Command Map) */}
        <ScrollFadeIn direction="up" delay={0.1}>
          <GlobalNodeInfrastructure />
        </ScrollFadeIn>

        {/* Statistics Section — High-Density 2-Column Mobile Dashboard */}
        <ScrollFadeIn direction="up" delay={0.1}>
          <section className="py-12 sm:py-16 md:py-28 px-4 sm:px-6 md:px-[80px] max-w-[1440px] mx-auto">
            <SectionHeading
              center
              title="Performance Metrics"
              subtitle="Real-world impact measured across our operational engagements."
            />

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-4 md:gap-6">
              {statsData.map((stat, idx) => (
                <div
                  key={stat.label}
                  className={idx === statsData.length - 1 ? 'col-span-2 sm:col-span-1 lg:col-span-1' : 'col-span-1'}
                >
                  <StatCard {...stat} />
                </div>
              ))}
            </div>
          </section>
        </ScrollFadeIn>

        {/* CTA Section */}
        <ScrollFadeIn direction="up" delay={0.2}>
          <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-[80px] max-w-[1440px] mx-auto text-center">
            <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8">
              <div>
                <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl md:text-4xl font-bold text-on-surface mb-3 sm:mb-4">
                  Ready to Transform Your Security Architecture?
                </h2>
                <p className="font-[var(--font-body)] text-xs sm:text-base md:text-lg text-on-surface-variant">
                  Join leading organizations leveraging autonomous architectures for unassailable protection.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
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
        <section className="py-14 sm:py-20 md:py-32 px-4 sm:px-6 md:px-[80px] bg-surface-container-low border-t border-outline-variant/20 rounded-b-3xl">
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
