import React from 'react';
import { PageId } from '../../types';
import { VayuXLoopAnimation } from '../VayuXLoopAnimation';
import {
  ShieldCheck,
  Briefcase,
  Terminal,
  ArrowRight,
  Shield,
  Bug,
  Search,
  Phone,
  Radio,
  ChevronRight,
} from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (page: PageId) => void;
  onOpenContact: (service?: string) => void;
  onOpenIncident: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onOpenContact,
  onOpenIncident,
}) => {
  return (
    <div className="flex flex-col w-full animate-in fade-in duration-300">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 pb-20 px-6 sm:px-8 max-w-7xl mx-auto min-h-[620px] flex items-center overflow-hidden w-full">
        {/* Animated Loop in background - perfectly centered on mobile, right-aligned on desktop */}
        <div className="absolute left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-0 top-1/2 -translate-y-1/2 w-[340px] sm:w-[380px] md:w-[480px] h-[340px] sm:h-[380px] md:h-[480px] pointer-events-none z-0 flex items-center justify-center opacity-30 md:opacity-85">
          <VayuXLoopAnimation className="w-full h-full" interactive={false} />
        </div>

        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center w-full">
          <div className="flex flex-col gap-6 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-brand-primary)]/20 border border-[var(--color-brand-light)]/30 text-[var(--color-brand-light)] text-xs font-mono w-fit">
              <span className="w-2 h-2 rounded-full bg-[var(--color-brand-light)] animate-pulse" />
              <span>THE VAYUX ENGINE ACTIVE</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              Security that learns faster than attackers.
            </h1>

            <p className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed">
              Engineering-grade protection that adapts in real-time. Continuous, adaptive defense mechanisms designed for high-stakes environments.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onOpenContact('Managed SOC')}
                className="bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-light)] hover:text-[#003736] text-white px-6 py-3.5 rounded font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-[var(--color-brand-primary)]/20 focus-visible:outline-2"
              >
                Get a quote
              </button>

              <button
                onClick={() => onNavigate('loop')}
                className="text-[var(--color-brand-light)] hover:text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-2 py-3 px-2 transition-colors cursor-pointer group focus-visible:outline-2"
              >
                <span>Explore The Loop</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Regulatory Alignment Strip */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-[var(--color-brand-light)] pt-6 border-t border-[var(--color-brand-primary)]/10">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={15} className="text-[var(--color-brand-accent)]" /> DPDP Act 2023 ready
              </span>
              <span className="text-[var(--color-text-muted)] hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={15} className="text-[var(--color-brand-accent)]" /> CERT-In aligned
              </span>
              <span className="text-[var(--color-text-muted)] hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <Radio size={15} className="text-[var(--color-brand-light)]" /> 24/7 SOC coverage
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audiences Cards */}
      <section className="px-6 sm:px-8 py-8 max-w-7xl mx-auto w-full relative z-20">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Card 1: For Business Leaders */}
          <div
            onClick={() => onNavigate('services')}
            className="tech-card card-hover p-8 cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="bg-[var(--color-brand-primary)]/20 p-3 rounded-lg text-[var(--color-brand-light)] border border-[var(--color-brand-light)]/30">
                <Briefcase size={22} />
              </div>
              <span className="text-[var(--color-text-muted)] group-hover:text-[var(--color-brand-light)] group-hover:translate-x-1 transition-all">
                <ArrowRight size={20} />
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[var(--color-brand-light)] transition-colors">
              For Business Leaders
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              Strategic GRC, board-level risk transparency, and consultative leadership to align enterprise security investments with core business goals.
            </p>
          </div>

          {/* Card 2: For Technical Leaders */}
          <div
            onClick={() => onNavigate('managed-soc')}
            className="tech-card card-hover p-8 cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="bg-[var(--color-brand-primary)]/20 p-3 rounded-lg text-[var(--color-brand-light)] border border-[var(--color-brand-light)]/30">
                <Terminal size={22} />
              </div>
              <span className="text-[var(--color-text-muted)] group-hover:text-[var(--color-brand-light)] group-hover:translate-x-1 transition-all">
                <ArrowRight size={20} />
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[var(--color-brand-light)] transition-colors">
              For Technical Leaders
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              Tactical VAPT, automated SIEM rule ingestion, and 24/7 SOC operations built for engineering-grade defense and low-friction integrations.
            </p>
          </div>
        </div>
      </section>

      {/* Engineering-Grade Capabilities Grid */}
      <section className="px-6 sm:px-8 py-16 max-w-7xl mx-auto w-full border-t border-[var(--color-brand-primary)]/10">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Engineering-Grade Capabilities
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Precision instruments for complete security posture management.
            </p>
          </div>

          <button
            onClick={() => onNavigate('services')}
            className="text-xs font-mono text-[var(--color-brand-light)] hover:underline flex items-center gap-1 cursor-pointer w-fit"
          >
            View full service matrix <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Managed SOC - Flagship */}
          <div
            onClick={() => onNavigate('managed-soc')}
            className="tech-card card-hover p-8 cursor-pointer flex flex-col justify-between group"
          >
            <div className="absolute top-4 right-4 bg-[var(--color-brand-primary)]/25 text-[var(--color-brand-light)] text-[10px] font-mono font-bold px-3 py-1 rounded-full border border-[var(--color-brand-light)]/40 tracking-widest uppercase">
              Flagship
            </div>
            <div>
              <div className="w-12 h-12 rounded-lg bg-[var(--color-bg-tertiary)] flex items-center justify-center text-[var(--color-brand-light)] mb-6 group-hover:bg-[var(--color-brand-primary)]/20 transition-colors">
                <Shield size={26} />
              </div>
              <h4 className="text-xl font-bold text-white mb-3 border-b border-[var(--color-brand-primary)]/10 pb-3 group-hover:text-[var(--color-brand-light)] transition-colors">
                Managed SOC
              </h4>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
                24/7 autonomous monitoring, high-fidelity alert validation, and rapid threat neutralization before headlines happen.
              </p>
            </div>
            <div className="text-xs font-mono font-bold text-[var(--color-brand-light)] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Explore SOC Architecture <ArrowRight size={14} />
            </div>
          </div>

          {/* VAPT */}
          <div
            onClick={() => onNavigate('services')}
            className="tech-card card-hover p-8 cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-lg bg-[var(--color-bg-tertiary)] flex items-center justify-center text-[var(--color-brand-light)] mb-6 group-hover:bg-[var(--color-brand-primary)]/20 transition-colors">
                <Bug size={26} />
              </div>
              <h4 className="text-xl font-bold text-white mb-3 border-b border-[var(--color-brand-primary)]/10 pb-3 group-hover:text-[var(--color-brand-light)] transition-colors">
                VAPT
              </h4>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
                Deep-dive vulnerability assessment and aggressive penetration testing mimicking advanced persistent threat (APT) techniques.
              </p>
            </div>
            <div className="text-xs font-mono font-bold text-[var(--color-brand-light)] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Learn more <ArrowRight size={14} />
            </div>
          </div>

          {/* DFIR */}
          <div
            onClick={() => onNavigate('services')}
            className="tech-card card-hover p-8 cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-lg bg-[var(--color-bg-tertiary)] flex items-center justify-center text-[var(--color-brand-light)] mb-6 group-hover:bg-[var(--color-brand-primary)]/20 transition-colors">
                <Search size={26} />
              </div>
              <h4 className="text-xl font-bold text-white mb-3 border-b border-[var(--color-brand-primary)]/10 pb-3 group-hover:text-[var(--color-brand-light)] transition-colors">
                DFIR
              </h4>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
                Digital forensics and incident response executed with forensic precision to preserve evidence chains and eliminate lateral pivots.
              </p>
            </div>
            <div className="text-xs font-mono font-bold text-[var(--color-brand-light)] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Learn more <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Helpline Band */}
      <section className="bg-gradient-to-r from-[var(--color-bg-secondary)] via-[var(--color-bg-tertiary)] to-[var(--color-bg-secondary)] border-y border-[var(--color-brand-primary)]/10 py-16 px-6 sm:px-8 text-center my-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Talk to a human, not a ticket queue
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)] max-w-lg mx-auto">
            Direct access to senior security architects and DFIR handlers whenever your team needs mission-critical clarity.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-2">
            <button
              onClick={() => onOpenContact('General Inquiry')}
              className="bg-[var(--color-brand-primary)] text-white hover:bg-[var(--color-brand-light)] hover:text-[#003736] px-8 py-3.5 rounded font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
            >
              Contact Us
            </button>
            <div className="flex items-center gap-2 text-[var(--color-brand-light)] font-mono text-sm">
              <Phone size={16} />
              <span>24/7 Hotline:</span>
              <a href="tel:18005550199" className="font-bold underline hover:text-white transition-colors">
                +1 (800) 555-0199
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
