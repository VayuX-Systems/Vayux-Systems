import Link from 'next/link';
import {
  Eye,
  ShieldAlert,
  Scale,
  Search,
  Compass,
  CheckCircle2,
  RefreshCw,
  ArrowRight,
  Download,
  Target,
  Cloud,
  GitMerge,
  TrendingUp,
} from 'lucide-react';
import ScrollReveal from '@/components/layout/ScrollReveal';
import SolutionsHeroScroll from '@/components/animations/SolutionsHeroScroll';
import Dribbble3DCard from '@/components/animations/Dribbble3DCard';
import SectionHeading from '@/components/ui/SectionHeading';
import FAQ from '@/components/ui/FAQ';
import { services, solutionsFAQ, consultingDeliverables } from '@/lib/site-data';

export const metadata = {
  title: 'Solutions & Services Hub | VayuX Systems',
  description:
    'Unassailable Protection. Elite SOC, VAPT, GRC, DFIR, and Bespoke Architecture services for advanced digital ecosystems.',
};

export default function SolutionsPage() {
  const iconMap: Record<string, typeof Eye> = {
    soc: Eye,
    vapt: ShieldAlert,
    grc: Scale,
    dfir: Search,
  };

  const deliverableIcons = {
    'Zero Trust Design': Target,
    'Cloud Sovereignty': Cloud,
    'M&A Risk Synthesis': GitMerge,
    'Executive Strategy': TrendingUp,
  };

  return (
    <div className="relative overflow-hidden w-full">
      {/* 1. Parallax Hero Section with Cyber Defense Background & Receding Physics */}
      <SolutionsHeroScroll />

      {/* 2. Elevated Content Layer */}
      <div className="relative z-30 bg-surface dark:bg-[#070b14] border-t border-slate-200/80 dark:border-white/10 pt-16 md:pt-24 pb-20 md:pb-32 px-5 md:px-[80px] max-w-[1440px] mx-auto w-full transition-colors duration-300">
        {/* Main Services 2x2 Grid */}
        <section className="mb-24 md:mb-36">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {services
              .filter((s) => s.id !== 'training')
              .map((service, idx) => {
                const IconComponent = iconMap[service.id] || Eye;
                return (
                  <ScrollReveal key={service.id} delay={idx * 0.1}>
                    <Dribbble3DCard depth={25} className="p-6 sm:p-8 md:p-10 flex flex-col h-full group bg-gradient-to-br from-surface to-surface/50">
                      {/* Icon */}
                      <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mb-6 sm:mb-8 group-hover:bg-primary/10 transition-colors shadow-[0_0_15px_rgba(64,194,253,0.15)] text-primary">
                        <IconComponent className="w-8 h-8" />
                      </div>

                      {/* Title & Desc */}
                      <h3 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-on-surface mb-4">
                        {service.fullTitle || service.title}
                      </h3>
                      <p className="font-[var(--font-body)] text-sm sm:text-base text-on-surface-variant mb-6 font-light leading-relaxed">
                        {service.fullDescription || service.shortDescription}
                      </p>

                      {/* Applied Solutions & Specs */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 border-t border-outline-variant/20 pt-6">
                        <div>
                          <h4 className="font-[var(--font-heading)] text-xs uppercase tracking-wider text-on-surface font-bold mb-3">
                            Applied Solutions
                          </h4>
                          <ul className="space-y-2 text-on-surface-variant text-xs sm:text-sm">
                            {service.appliedSolutions?.map((sol, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-secondary-container mt-0.5 flex-shrink-0" />
                                <span>{sol}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-[var(--font-heading)] text-xs uppercase tracking-wider text-on-surface font-bold mb-3">
                            Technical Specifications
                          </h4>
                          <ul className="space-y-2 text-on-surface-variant text-xs font-mono bg-surface-container-low p-3 rounded-lg border border-outline-variant/10">
                            {service.techSpecs?.map((spec, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-primary font-bold">&gt;</span>
                                <span>{spec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Feedback Loop */}
                      {service.feedbackLoop && (
                        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 sm:p-5 mb-8 flex-grow">
                          <h4 className="font-[var(--font-heading)] text-xs font-bold text-primary flex items-center gap-2 mb-2 uppercase tracking-wider">
                            <RefreshCw className="w-4 h-4" /> Operational Feedback Loop
                          </h4>
                          <p className="text-xs sm:text-sm text-on-surface-variant font-light leading-relaxed">
                            {service.feedbackLoop}
                          </p>
                        </div>
                      )}

                      {/* CTA Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-2">
                        <Link
                          href="/contact"
                          className="w-full sm:w-2/3 py-3.5 sm:py-4 rounded-lg btn-primary-gradient text-on-primary font-[var(--font-heading)] text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-lg shadow-secondary-container/20"
                        >
                          Request Consultation <ArrowRight className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          className="w-full sm:w-1/3 py-3.5 sm:py-4 rounded-lg border border-primary/40 text-primary font-[var(--font-heading)] text-xs uppercase tracking-wider font-semibold hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
                        >
                          Specs <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </Dribbble3DCard>
                  </ScrollReveal>
                );
              })}
          </div>

          {/* Bespoke Architecture (Full Width Card) */}
          <ScrollReveal className="mt-8">
            <Dribbble3DCard depth={20} className="p-6 sm:p-8 md:p-10 flex flex-col lg:flex-row items-stretch gap-8 lg:gap-10 group bg-gradient-to-r from-surface to-surface/50">
              {/* Left side */}
              <div className="lg:w-1/3 flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-surface-container-high flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors shadow-[0_0_20px_rgba(64,194,253,0.2)] text-primary">
                  <Compass className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>
                <h3 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-on-surface mb-3">
                  Bespoke Architecture
                </h3>
                <p className="font-[var(--font-body)] text-sm sm:text-base text-on-surface-variant mb-6 font-light leading-relaxed">
                  Strategic consulting designed for the vanguard. We design custom security frameworks that reflect your unique ecosystem, bridging the gap between executive vision and elite technical execution.
                </p>

                <div className="w-full space-y-4 mb-6 border-t border-outline-variant/20 pt-6">
                  <h4 className="font-[var(--font-heading)] text-xs font-bold text-on-surface uppercase tracking-wider">
                    Technical Specifications
                  </h4>
                  <ul className="space-y-2 text-on-surface-variant text-xs font-mono bg-surface-container-low p-4 rounded-lg border border-outline-variant/10 text-left">
                    <li className="flex items-center gap-2">
                      <span className="text-primary font-bold">&gt;</span> Multi-tenant Microsegmentation Strategy
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary font-bold">&gt;</span> Ephemeral Credential Integration
                    </li>
                  </ul>
                </div>

                <div className="w-full flex flex-col gap-3 mt-auto">
                  <Link
                    href="/contact"
                    className="w-full px-6 py-3.5 sm:py-4 rounded-lg btn-primary-gradient text-on-primary font-[var(--font-heading)] text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-lg shadow-secondary-container/20"
                  >
                    Request Consultation <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    type="button"
                    className="w-full py-3 rounded-lg border border-primary/40 text-primary font-[var(--font-heading)] text-xs uppercase tracking-wider font-semibold hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
                  >
                    Download Framework <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right side — Deliverables */}
              <div className="lg:w-2/3 w-full border-t lg:border-t-0 lg:border-l border-outline-variant/20 pt-8 lg:pt-0 lg:pl-10 h-full flex flex-col justify-center">
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 sm:p-5 mb-8">
                  <h4 className="font-[var(--font-heading)] text-xs font-bold text-primary flex items-center gap-2 mb-2 uppercase tracking-wider">
                    <RefreshCw className="w-4 h-4" /> Operational Feedback Loop
                  </h4>
                  <p className="text-xs sm:text-sm text-on-surface-variant font-light leading-relaxed">
                    The highly customized architectural challenges solved by our consulting arm reveal novel integration hurdles. These insights guide our R&amp;D team in expanding the compatibility and seamless deployment capabilities of our autonomous defense network.
                  </p>
                </div>

                <h4 className="font-[var(--font-heading)] text-xs font-bold text-on-surface uppercase tracking-wider mb-6">
                  Consulting Deliverables &amp; Applied Solutions
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {consultingDeliverables.map((item) => {
                    const DeliverableIcon =
                      deliverableIcons[item.title as keyof typeof deliverableIcons] || Target;
                    return (
                      <div
                        key={item.title}
                        className="p-5 rounded-xl bg-surface/50 border border-outline-variant/20 hover:border-primary/30 transition-colors shadow-sm"
                      >
                        <h5 className="font-[var(--font-heading)] text-sm font-bold text-primary mb-2 flex items-center gap-2">
                          <DeliverableIcon className="w-4 h-4 text-primary" /> {item.title}
                        </h5>
                        <p className="text-xs sm:text-sm text-on-surface-variant font-light leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Dribbble3DCard>
          </ScrollReveal>
        </section>

        {/* Service Methodologies Section */}
        <section className="mb-24 md:mb-36">
          <SectionHeading
            center
            title="Service Methodologies"
            subtitle="Deep dive into our structured approaches for executing elite security operations."
          />

          <div className="space-y-8">
            {/* VAPT Methodology */}
            <ScrollReveal>
              <div className="glass-card command-border rounded-2xl p-6 sm:p-8 bg-surface-container-lowest">
                <h3 className="font-[var(--font-heading)] text-xl md:text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                  <ShieldAlert className="w-6 h-6" /> VAPT Methodology
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="p-4 border-l-2 border-primary/40 bg-surface/40 rounded-r-lg">
                    <h4 className="font-[var(--font-heading)] text-sm font-bold text-on-surface mb-2">
                      1. Reconnaissance
                    </h4>
                    <p className="text-xs sm:text-sm text-on-surface-variant font-light">
                      Mapping the entire external and internal attack surface to identify all exposed assets.
                    </p>
                  </div>
                  <div className="p-4 border-l-2 border-primary/40 bg-surface/40 rounded-r-lg">
                    <h4 className="font-[var(--font-heading)] text-sm font-bold text-on-surface mb-2">
                      2. Vulnerability Scanning
                    </h4>
                    <p className="text-xs sm:text-sm text-on-surface-variant font-light">
                      Automated and manual probing for known weaknesses and misconfigurations.
                    </p>
                  </div>
                  <div className="p-4 border-l-2 border-primary/40 bg-surface/40 rounded-r-lg">
                    <h4 className="font-[var(--font-heading)] text-sm font-bold text-on-surface mb-2">
                      3. Exploitation
                    </h4>
                    <p className="text-xs sm:text-sm text-on-surface-variant font-light">
                      Safely simulating attacks to determine the impact of discovered vulnerabilities.
                    </p>
                  </div>
                  <div className="p-4 border-l-2 border-primary/40 bg-surface/40 rounded-r-lg">
                    <h4 className="font-[var(--font-heading)] text-sm font-bold text-on-surface mb-2">
                      4. Reporting &amp; Remediation
                    </h4>
                    <p className="text-xs sm:text-sm text-on-surface-variant font-light">
                      Delivering actionable insights with prioritized patching recommendations.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* SOC Operations */}
            <ScrollReveal delay={0.1}>
              <div className="glass-card command-border rounded-2xl p-6 sm:p-8 bg-surface-container-lowest">
                <h3 className="font-[var(--font-heading)] text-xl md:text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                  <Eye className="w-6 h-6" /> SOC Operations
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="p-4 border-l-2 border-secondary-container bg-surface/40 rounded-r-lg">
                    <h4 className="font-[var(--font-heading)] text-sm font-bold text-on-surface mb-2">
                      1. Ingestion
                    </h4>
                    <p className="text-xs sm:text-sm text-on-surface-variant font-light">
                      Centralizing logs and telemetry from all endpoints, networks, and cloud services.
                    </p>
                  </div>
                  <div className="p-4 border-l-2 border-secondary-container bg-surface/40 rounded-r-lg">
                    <h4 className="font-[var(--font-heading)] text-sm font-bold text-on-surface mb-2">
                      2. Detection
                    </h4>
                    <p className="text-xs sm:text-sm text-on-surface-variant font-light">
                      Applying AI heuristics and threat intelligence to identify anomalous behavior.
                    </p>
                  </div>
                  <div className="p-4 border-l-2 border-secondary-container bg-surface/40 rounded-r-lg">
                    <h4 className="font-[var(--font-heading)] text-sm font-bold text-on-surface mb-2">
                      3. Triage &amp; Analysis
                    </h4>
                    <p className="text-xs sm:text-sm text-on-surface-variant font-light">
                      Expert analysts investigate alerts to separate false positives from real threats.
                    </p>
                  </div>
                  <div className="p-4 border-l-2 border-secondary-container bg-surface/40 rounded-r-lg">
                    <h4 className="font-[var(--font-heading)] text-sm font-bold text-on-surface mb-2">
                      4. Containment
                    </h4>
                    <p className="text-xs sm:text-sm text-on-surface-variant font-light">
                      Automated and manual responses to isolate compromised systems immediately.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* GRC Framework */}
            <ScrollReveal delay={0.15}>
              <div className="glass-card command-border rounded-2xl p-6 sm:p-8 bg-surface-container-lowest">
                <h3 className="font-[var(--font-heading)] text-xl md:text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                  <Scale className="w-6 h-6" /> GRC Framework
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="p-4 border-l-2 border-tertiary bg-surface/40 rounded-r-lg">
                    <h4 className="font-[var(--font-heading)] text-sm font-bold text-on-surface mb-2">
                      1. Gap Analysis
                    </h4>
                    <p className="text-xs sm:text-sm text-on-surface-variant font-light">
                      Assessing current posture against target regulatory frameworks (ISO, SOC2).
                    </p>
                  </div>
                  <div className="p-4 border-l-2 border-tertiary bg-surface/40 rounded-r-lg">
                    <h4 className="font-[var(--font-heading)] text-sm font-bold text-on-surface mb-2">
                      2. Policy Design
                    </h4>
                    <p className="text-xs sm:text-sm text-on-surface-variant font-light">
                      Drafting robust security policies tailored to organizational structure.
                    </p>
                  </div>
                  <div className="p-4 border-l-2 border-tertiary bg-surface/40 rounded-r-lg">
                    <h4 className="font-[var(--font-heading)] text-sm font-bold text-on-surface mb-2">
                      3. Implementation
                    </h4>
                    <p className="text-xs sm:text-sm text-on-surface-variant font-light">
                      Deploying technical and administrative controls to meet compliance requirements.
                    </p>
                  </div>
                  <div className="p-4 border-l-2 border-tertiary bg-surface/40 rounded-r-lg">
                    <h4 className="font-[var(--font-heading)] text-sm font-bold text-on-surface mb-2">
                      4. Continuous Monitoring
                    </h4>
                    <p className="text-xs sm:text-sm text-on-surface-variant font-light">
                      Automated tracking to ensure ongoing adherence and prevent compliance drift.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* DFIR Process */}
            <ScrollReveal delay={0.2}>
              <div className="glass-card command-border rounded-2xl p-6 sm:p-8 bg-surface-container-lowest">
                <h3 className="font-[var(--font-heading)] text-xl md:text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                  <Search className="w-6 h-6" /> DFIR Process
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="p-4 border-l-2 border-error/50 bg-surface/40 rounded-r-lg">
                    <h4 className="font-[var(--font-heading)] text-sm font-bold text-on-surface mb-2">
                      1. Preparation
                    </h4>
                    <p className="text-xs sm:text-sm text-on-surface-variant font-light">
                      Establishing baseline readiness, runbooks, and communication channels pre-incident.
                    </p>
                  </div>
                  <div className="p-4 border-l-2 border-error/50 bg-surface/40 rounded-r-lg">
                    <h4 className="font-[var(--font-heading)] text-sm font-bold text-on-surface mb-2">
                      2. Identification
                    </h4>
                    <p className="text-xs sm:text-sm text-on-surface-variant font-light">
                      Confirming breach occurrence, defining scope, and gathering volatile data.
                    </p>
                  </div>
                  <div className="p-4 border-l-2 border-error/50 bg-surface/40 rounded-r-lg">
                    <h4 className="font-[var(--font-heading)] text-sm font-bold text-on-surface mb-2">
                      3. Eradication
                    </h4>
                    <p className="text-xs sm:text-sm text-on-surface-variant font-light">
                      Removing attacker presence, malware, and closing entry vectors securely.
                    </p>
                  </div>
                  <div className="p-4 border-l-2 border-error/50 bg-surface/40 rounded-r-lg">
                    <h4 className="font-[var(--font-heading)] text-sm font-bold text-on-surface mb-2">
                      4. Recovery
                    </h4>
                    <p className="text-xs sm:text-sm text-on-surface-variant font-light">
                      Restoring systems to normal operations with enhanced monitoring for reinfection.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Solution Specific Q&A */}
        <section className="mb-16">
          <div className="glass-card command-border rounded-2xl p-6 sm:p-10 md:p-12 bg-surface max-w-4xl mx-auto">
            <SectionHeading
              center
              title="Solution Specific Q&A"
            />
            <ScrollReveal>
              <FAQ items={solutionsFAQ} />
            </ScrollReveal>
          </div>
        </section>
      </div>
    </div>
  );
}
