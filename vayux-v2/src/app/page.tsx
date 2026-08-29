import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  Lock,
  FileCheck,
  Scale,
  Radar,
  ShieldAlert,
  Search,
  GraduationCap,
  ArrowRight,
  Download,
  Shield,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import HeroScrollContainer from '@/components/animations/HeroScrollContainer';
import Dribbble3DCard from '@/components/animations/Dribbble3DCard';
import MagneticCard from '@/components/animations/MagneticCard';
import ScrollReveal from '@/components/layout/ScrollReveal';
import GlassCard from '@/components/ui/GlassCard';
import SectionHeading from '@/components/ui/SectionHeading';
import FAQ from '@/components/ui/FAQ';
import Badge from '@/components/ui/Badge';
import { services, coreCapabilities, homeFAQ } from '@/lib/site-data';

export const metadata = {
  title: 'VayuX Systems | Unassailable Protection',
  description:
    'Innovation-driven R&D firm leveraging an operational feedback loop to channel real-world insights into next-generation autonomous security architectures.',
};

export default function HomePage() {
  return (
    <div className="relative overflow-hidden w-full">
      {/* 1. Hero Section */}
      <HeroScrollContainer />

      {/* 2. Content Layer (Seamless, flat, square edge-to-edge transition) */}
      <div className="relative z-30 bg-transparent">
        {/* Institutional Trust Badges */}
        <section className="py-10 md:py-12 px-4 sm:px-6 md:px-[80px] border-y border-slate-200/70 dark:border-white/10 bg-slate-50/50 dark:bg-[#070b14]/60 backdrop-blur-sm">
          <div className="max-w-[1440px] mx-auto">
            <p className="text-center font-[var(--font-heading)] text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 mb-8 font-semibold">
              Architectural Standards &amp; Certifications
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-16 md:gap-24 transition-all duration-700">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-7 h-7 text-primary" />
                <span className="font-[var(--font-heading)] text-sm font-semibold tracking-wider text-slate-800 dark:text-slate-200">
                  ISO 27001
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Lock className="w-7 h-7 text-primary" />
                <span className="font-[var(--font-heading)] text-sm font-semibold tracking-wider text-slate-800 dark:text-slate-200">
                  SOC 2 TYPE II
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FileCheck className="w-7 h-7 text-primary" />
                <span className="font-[var(--font-heading)] text-sm font-semibold tracking-wider text-slate-800 dark:text-slate-200">
                  NIST CSF
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Scale className="w-7 h-7 text-primary" />
                <span className="font-[var(--font-heading)] text-sm font-semibold tracking-wider text-slate-800 dark:text-slate-200">
                  GDPR COMPLIANT
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision — High-Tech Holographic Grid */}
        <section className="py-20 md:py-32 px-4 sm:px-6 md:px-[80px] max-w-[1440px] mx-auto text-center">
          <ScrollReveal>
            <div className="max-w-5xl mx-auto glass-panel rounded-3xl p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-[0_20px_60px_rgba(0,168,255,0.08)] border border-white/80">
              {/* High-res holographic network background */}
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
          </ScrollReveal>
        </section>

        {/* Guardian Philosophy — Lab vs Vendor with SOC Command Background */}
        <section className="pb-20 md:pb-32 px-4 sm:px-6 md:px-[80px] max-w-[1440px] mx-auto relative">
          <ScrollReveal>
            <div className="glass-panel rounded-3xl p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-[0_20px_60px_rgba(0,168,255,0.08)] border border-white/80">
              {/* Atmospheric SOC command hub backdrop */}
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
                <Link
                  href="/about"
                  className="inline-flex items-center gap-3 text-primary hover:text-primary-container transition-colors font-[var(--font-heading)] uppercase tracking-[0.15em] border-b border-primary/20 pb-2 text-xs sm:text-sm font-semibold"
                >
                  Discover Our Methodology <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Services Bento Grid */}
        <section className="py-20 md:py-32 px-4 sm:px-6 md:px-[80px] max-w-[1440px] mx-auto border-t border-outline-variant/20">
          <SectionHeading
            center
            title="Applied Technical Solutions"
            subtitle="Precision engineering for every layer of your digital ecosystem, transitioning from routine maintenance to resilient architecture."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Flagship Large Card — SOC */}
            <ScrollReveal className="md:col-span-2">
              <Link href="/solutions" className="h-full block">
                <Dribbble3DCard depth={30} className="p-8 sm:p-10 md:p-12 group flex flex-col justify-between min-h-[380px] h-full">
                  <div>
                    <div className="flex justify-between items-start mb-8">
                      <Radar className="w-10 h-10 text-primary group-hover:text-primary-container transition-colors" />
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

            {/* VAPT */}
            <ScrollReveal delay={0.1}>
              <Link href="/solutions" className="h-full block">
                <Dribbble3DCard depth={25} className="p-8 group flex flex-col justify-between h-full">
                  <div>
                    <ShieldAlert className="w-8 h-8 text-primary mb-6 block group-hover:text-primary-container transition-colors" />
                    <h3 className="font-[var(--font-heading)] text-xl sm:text-2xl font-bold text-on-surface mb-3 tracking-tight">
                      VAPT
                    </h3>
                    <p className="font-[var(--font-body)] text-sm sm:text-base text-on-surface-variant font-light mb-6 leading-relaxed">
                      Vulnerability Assessment &amp; Penetration Testing utilizing adversarial simulation techniques.
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

            {/* GRC */}
            <ScrollReveal delay={0.15}>
              <Link href="/solutions" className="h-full block">
                <Dribbble3DCard depth={25} className="p-8 group flex flex-col justify-between h-full">
                  <div>
                    <Scale className="w-8 h-8 text-primary mb-6 block group-hover:text-primary-container transition-colors" />
                    <h3 className="font-[var(--font-heading)] text-xl sm:text-2xl font-bold text-on-surface mb-3 tracking-tight">
                      GRC
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

            {/* DFIR */}
            <ScrollReveal delay={0.2}>
              <Link href="/solutions" className="h-full block">
                <Dribbble3DCard depth={25} className="p-8 group flex flex-col justify-between h-full">
                  <div>
                    <Search className="w-8 h-8 text-primary mb-6 block group-hover:text-primary-container transition-colors" />
                    <h3 className="font-[var(--font-heading)] text-xl sm:text-2xl font-bold text-on-surface mb-3 tracking-tight">
                      DFIR
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

            {/* Cyber Training */}
            <ScrollReveal delay={0.25}>
              <Link href="/solutions" className="h-full block">
                <Dribbble3DCard depth={25} className="p-8 group flex flex-col justify-between h-full">
                  <div>
                    <GraduationCap className="w-8 h-8 text-primary mb-6 block group-hover:text-primary-container transition-colors" />
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
        </section>

        {/* Core Capabilities Deep-Dive with 3D Depth Elevation */}
        <section className="py-20 md:py-32 px-4 sm:px-6 md:px-[80px] max-w-[1440px] mx-auto">
          <SectionHeading
            title="Core Capabilities Deep-Dive"
            subtitle="Advanced architectural implementations and autonomous response systems designed for the modern threat landscape."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {coreCapabilities.map((capability, idx) => (
              <ScrollReveal key={capability.title} delay={idx * 0.1}>
                <Dribbble3DCard depth={20} className="p-8 md:p-10 h-full">
                  <h3 className="font-[var(--font-heading)] text-xl md:text-2xl font-bold text-on-surface mb-4">
                    {capability.title}
                  </h3>
                  <p className="font-[var(--font-body)] text-base text-on-surface-variant font-light leading-relaxed">
                    {capability.description}
                  </p>
                </Dribbble3DCard>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Strategic Partnership FAQ */}
        <section className="py-24 md:py-36 px-4 sm:px-6 md:px-[80px] bg-surface-container-low border-t border-outline-variant/20 rounded-b-3xl">
          <div className="max-w-4xl mx-auto">
            <SectionHeading
              center
              title="Strategic Partnership FAQ"
              subtitle="Clarifying our engagement model and operational parameters."
            />
            <ScrollReveal>
              <FAQ items={homeFAQ} />
            </ScrollReveal>
          </div>
        </section>
      </div>
    </div>
  );
}
