import React from 'react';
import { PageId } from '../../types';
import { VayuXLoopAnimation } from '../VayuXLoopAnimation';
import {
  ChevronRight,
  Shield,
  Radar,
  Clock,
  CheckCircle2,
  Lock,
  FileText,
  AlertTriangle,
  ArrowRight,
  Zap,
  ShieldCheck,
  Server,
  Layers,
  Cpu,
} from 'lucide-react';

interface ManagedSOCScreenProps {
  onNavigate: (page: PageId) => void;
  onOpenContact: (service?: string) => void;
}

export const ManagedSOCScreen: React.FC<ManagedSOCScreenProps> = ({
  onNavigate,
  onOpenContact,
}) => {
  const outcomes = [
    {
      title: 'Compliance Ready',
      desc: 'DPDP Act 2023, SOC2 Type II, ISO 27001, and CERT-In 6-hour reporting aligned out-of-the-box.',
      icon: <ShieldCheck size={22} className="text-[#71dba2]" />,
    },
    {
      title: 'Reduced Downtime',
      desc: 'Automated containment isolates affected endpoints within seconds, preventing lateral ransomware spread.',
      icon: <Zap size={22} className="text-[#7cd5d3]" />,
    },
    {
      title: 'Clear Reporting',
      desc: 'Board-level executive summaries paired with reproducible engineering post-mortems and IoC manifests.',
      icon: <FileText size={22} className="text-[#7cd5d3]" />,
    },
    {
      title: 'Guaranteed SLA',
      desc: '15-minute active containment SLA for Critical (Sev-1) incidents backed by financial credits.',
      icon: <Clock size={22} className="text-[#ffb4ab]" />,
    },
  ];

  return (
    <div className="flex flex-col w-full px-6 sm:px-8 max-w-7xl mx-auto py-8 space-y-16 animate-in fade-in duration-300">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex text-xs font-mono text-[var(--color-text-secondary)]/70 pt-2">
        <ol className="flex items-center space-x-2">
          <li>
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-[var(--color-brand-light)] transition-colors cursor-pointer"
            >
              Home
            </button>
          </li>
          <li>
            <ChevronRight size={13} />
          </li>
          <li>
            <button
              onClick={() => onNavigate('services')}
              className="hover:text-[var(--color-brand-light)] transition-colors cursor-pointer"
            >
              Services
            </button>
          </li>
          <li>
            <ChevronRight size={13} />
          </li>
          <li className="text-[var(--color-brand-light)]">Managed SOC</li>
        </ol>
      </nav>

      {/* Hero Section */}
      <section className="grid md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-brand-primary)]/20 border border-[var(--color-brand-light)]/40 flex items-center justify-center text-[var(--color-brand-light)]">
              <Radar size={26} />
            </div>
            <div>
              <div className="text-xs font-mono text-[var(--color-brand-light)] uppercase tracking-wider">
                Flagship Offering
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                Managed SOC
              </h1>
            </div>
          </div>

          <p className="text-lg text-[var(--color-brand-light)] font-medium leading-snug">
            24/7 autonomous monitoring and continuous engineering-grade defense.
          </p>

          <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
            Traditional SOCs are alert factories that burn out internal teams with false positives. VayuX Managed SOC is an engineering-first detection and response capability that embeds directly with your team, continuously tuning detection rules to reduce noise and eliminate dwell time.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onOpenContact('Managed SOC Proposal')}
              className="bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-light)] hover:text-[#003736] text-white px-7 py-3.5 rounded font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-[var(--color-brand-primary)]/20"
            >
              Request SOC Proposal
            </button>
            <button
              onClick={() => onNavigate('loop')}
              className="border border-[var(--color-border)] hover:border-[var(--color-brand-light)] text-[var(--color-text-primary)] px-6 py-3.5 rounded font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              How it connects to The Loop
            </button>
          </div>
        </div>

        {/* Metric Card */}
        <div className="md:col-span-4 bg-gradient-to-b from-[var(--color-bg-secondary)] to-[var(--color-bg-tertiary)] border border-[var(--color-border)]/50 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-brand-primary)]/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="text-xs font-mono text-[var(--color-brand-danger)] uppercase tracking-wider mb-1">
              Industry Standard
            </div>
            <div className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
              277 Days
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1">
              Average adversary dwell time before detection in traditional environments (Ponemon / IBM).
            </p>
          </div>

          <div className="border-t border-[var(--color-border)]/40 pt-6">
            <div className="text-xs font-mono text-[var(--color-brand-accent)] uppercase tracking-wider mb-1">
              VayuX Active SLA
            </div>
            <div className="text-4xl sm:text-5xl font-bold text-[var(--color-brand-light)] tracking-tight">
              &lt; 15 Min
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1">
              Active forensic triage and autonomous threat containment across all protected endpoints.
            </p>
          </div>
        </div>
      </section>

      {/* The VayuX Solution 4-Step Pipeline */}
      <section className="space-y-8">
        <div className="border-b border-[var(--color-border)]/30 pb-4">
          <h2 className="text-3xl font-bold text-white">The Engineering Pipeline</h2>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            Zero fluff. Systematic, math-backed defense architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="v-card p-6 border border-[var(--color-border)]/40 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-bold text-[var(--color-brand-light)]">01</span>
                <Server size={20} className="text-[var(--color-brand-light)]" />
              </div>
              <h3 className="text-lg font-bold text-white">Baseline</h3>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Complete architecture mapping, cloud VPC topology discovery, and tailored adversarial threat modeling.
              </p>
            </div>
          </div>

          <div className="v-card p-6 border border-[var(--color-border)]/40 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-bold text-[var(--color-brand-light)]">02</span>
                <Layers size={20} className="text-[var(--color-brand-light)]" />
              </div>
              <h3 className="text-lg font-bold text-white">Continuous Telemetry</h3>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                eBPF kernel probes, endpoint Sysmon, cloud API trails, and network flow ingestion at wire speed.
              </p>
            </div>
          </div>

          <div className="v-card p-6 border border-[var(--color-border)]/40 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-bold text-[var(--color-brand-light)]">03</span>
                <Cpu size={20} className="text-[var(--color-brand-light)]" />
              </div>
              <h3 className="text-lg font-bold text-white">Expert Triage</h3>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Senior analysts review validated detections. No automated spam or false-alarm escalation fatigue.
              </p>
            </div>
          </div>

          <div className="v-card p-6 border border-[var(--color-border)]/40 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-bold text-[var(--color-brand-light)]">04</span>
                <Lock size={20} className="text-[var(--color-brand-light)]" />
              </div>
              <h3 className="text-lg font-bold text-white">Active Containment</h3>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Automated network isolation, memory dumps, and surgical process termination in under 15 minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Loop Integration Spotlight */}
      <section className="bg-[var(--color-bg-secondary)] border border-[var(--color-brand-light)]/30 rounded-2xl p-8 sm:p-10 relative overflow-hidden shadow-2xl">
        <div className="grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-brand-primary)]/20 border border-[var(--color-brand-light)]/30 text-[var(--color-brand-light)] text-xs font-mono">
              <span>CONTINUOUS IMMUNE ADAPTATION</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              How Managed SOC powers The Loop
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              When our SOC detects an attack against any customer node, the telemetry is immediately pushed to our R&D reverse engineering sandbox. Within minutes, custom YARA signatures and Sigma detection rules are compiled and hot-deployed across your entire infrastructure.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('loop')}
                className="text-xs font-mono font-bold text-[var(--color-brand-light)] uppercase tracking-wider flex items-center gap-2 hover:underline cursor-pointer"
              >
                <span>Explore the 5 stages of The Loop</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          <div className="md:col-span-5 flex justify-center">
            <div className="w-[220px] h-[220px]">
              <VayuXLoopAnimation className="w-full h-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Business Outcomes 4 Cards */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-3xl font-bold text-white">Business Outcomes</h2>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            Measurable impact on your enterprise risk profile.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {outcomes.map((out, idx) => (
            <div
              key={idx}
              className="v-card p-6 border border-[var(--color-border)]/40 flex items-start gap-4 hover:border-[var(--color-brand-light)]/50 transition-all"
            >
              <div className="p-3 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)]/30 shrink-0">
                {out.icon}
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">{out.title}</h3>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">{out.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final Deployment CTA */}
      <section className="bg-gradient-to-r from-[var(--color-brand-primary)] to-[#003736] rounded-2xl p-8 sm:p-12 text-center text-white space-y-6 shadow-2xl">
        <h2 className="text-3xl sm:text-4xl font-bold">
          Secure your perimeter today.
        </h2>
        <p className="text-sm sm:text-base text-[var(--color-brand-accent)] max-w-xl mx-auto">
          Deploy VayuX Managed SOC agents in minutes with native support for AWS, Azure, GCP, Kubernetes, and on-premises bare metal.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <button
            onClick={() => onOpenContact('Managed SOC Onboarding')}
            className="bg-white text-[#003736] hover:bg-[var(--color-brand-accent)] px-8 py-3.5 rounded font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg"
          >
            Schedule Technical Onboarding
          </button>
        </div>
      </section>
    </div>
  );
};
