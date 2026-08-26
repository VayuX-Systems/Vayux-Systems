import React from 'react';
import { PageId } from '../../types';
import {
  ChevronRight,
  AlertTriangle,
  ShieldAlert,
  CheckCircle2,
  Clock,
  ArrowRight,
  Zap,
  FileText,
  Search,
  Lock,
} from 'lucide-react';

interface DfirScreenProps {
  onNavigate: (page: PageId) => void;
  onOpenContact: (service?: string) => void;
}

export const DfirScreen: React.FC<DfirScreenProps> = ({
  onNavigate,
  onOpenContact,
}) => {
  const outcomes = [
    {
      title: 'Rapid Containment',
      desc: 'Active breach isolated and contained within 15 minutes, preventing lateral movement and data exfiltration escalation.',
      icon: <Zap size={22} className="text-[var(--color-brand-accent)]" />,
    },
    {
      title: 'Evidence Integrity',
      desc: 'Chain-of-custody preserved through cryptographic hashing and forensic imaging, meeting legal and regulatory requirements.',
      icon: <Lock size={22} className="text-[#71dba2]" />,
    },
    {
      title: 'Executive Timeline',
      desc: 'Clear, reproducible incident narrative with attack vector analysis, technical depth, and board-level risk quantification.',
      icon: <FileText size={22} className="text-[var(--color-brand-light)]" />,
    },
    {
      title: 'Zero-Day Analysis',
      desc: 'Novel malware reverse-engineered to extract IoCs, TTPs, and adversary intent—feeding The Loop for enterprise-wide defense.',
      icon: <Search size={22} className="text-[#71dba2]" />,
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
          <li className="text-[var(--color-brand-light)]">DFIR</li>
        </ol>
      </nav>

      {/* Hero Section */}
      <section className="grid md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-brand-danger)]/20 border border-[var(--color-brand-danger)]/40 flex items-center justify-center text-[var(--color-brand-danger)]">
              <AlertTriangle size={26} />
            </div>
            <div>
              <div className="text-xs font-mono text-[var(--color-brand-danger)] uppercase tracking-wider">
                Emergency Response
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                DFIR
              </h1>
            </div>
          </div>

          <p className="text-lg text-[var(--color-brand-light)] font-medium leading-snug">
            Tier-3 Digital Forensics & Incident Response for active breaches.
          </p>

          <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
            When a breach is active, every minute counts. VayuX DFIR is a team of forensic specialists and incident response engineers ready to deploy immediately. We isolate affected systems, preserve evidence chain-of-custody, extract adversarial artifacts, and deliver forensic-grade incident reports that satisfy regulators and support litigation.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onOpenContact('DFIR Engagement')}
              className="bg-[var(--color-brand-danger)] hover:bg-[#ffb4ab] hover:text-white text-white px-7 py-3.5 rounded font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-[var(--color-brand-danger)]/20"
            >
              Emergency Contact
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
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-brand-danger)]/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="text-xs font-mono text-[var(--color-brand-danger)] uppercase tracking-wider mb-1">
              Industry Standard
            </div>
            <div className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
              277 Days
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1">
              Average dwell time before breach detection (Ponemon 2024).
            </p>
          </div>

          <div className="border-t border-[var(--color-border)]/40 pt-6">
            <div className="text-xs font-mono text-[var(--color-brand-accent)] uppercase tracking-wider mb-1">
              VayuX Response
            </div>
            <div className="text-4xl sm:text-5xl font-bold text-[#ffb4ab] tracking-tight">
              &lt; 4 Hours
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1">
              Full forensic team mobilization + containment strategy delivery.
            </p>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="space-y-8">
        <div className="border-b border-[var(--color-border)]/30 pb-4">
          <h2 className="text-3xl font-bold text-white">The Problem</h2>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            During active breaches, every decision carries massive financial and reputational risk.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <ShieldAlert size={24} className="text-[var(--color-brand-danger)] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-white mb-2">Dwell Time Escalation</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Lack of forensic expertise means attackers remain undetected, spreading laterally and exfiltrating more data.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <ShieldAlert size={24} className="text-[var(--color-brand-danger)] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-white mb-2">Evidence Contamination</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Improperly collected forensic evidence becomes inadmissible in court or regulatory investigations.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <ShieldAlert size={24} className="text-[var(--color-brand-danger)] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-white mb-2">Regulatory Non-Compliance</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  CERT-In 6-hour disclosure, DPDP Act compliance, and board notifications require forensic-grade incident documentation.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <ShieldAlert size={24} className="text-[var(--color-brand-danger)] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-white mb-2">Attribution Gap</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Without proper malware analysis, attribution to state-sponsored or organized crime remains speculative.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The VayuX Solution 4-Step Pipeline */}
      <section className="space-y-8">
        <div className="border-b border-[var(--color-border)]/30 pb-4">
          <h2 className="text-3xl font-bold text-white">The VayuX Solution</h2>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            Forensic-grade incident response with real-time coordination and evidence preservation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="v-card p-6 border border-[var(--color-border)]/40 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-bold text-[var(--color-brand-light)]">01</span>
                <Clock size={20} className="text-[var(--color-brand-light)]" />
              </div>
              <h3 className="text-lg font-bold text-white">Rapid Deployment</h3>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Incident responders on-site or remote within 4 hours. Immediate containment assessment and isolation strategy.
              </p>
            </div>
          </div>

          <div className="v-card p-6 border border-[var(--color-border)]/40 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-bold text-[var(--color-brand-light)]">02</span>
                <Search size={20} className="text-[var(--color-brand-light)]" />
              </div>
              <h3 className="text-lg font-bold text-white">Forensic Analysis</h3>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Memory capture, disk imaging, registry analysis, and event log correlation with chain-of-custody documentation.
              </p>
            </div>
          </div>

          <div className="v-card p-6 border border-[var(--color-border)]/40 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-bold text-[var(--color-brand-light)]">03</span>
                <AlertTriangle size={20} className="text-[var(--color-brand-light)]" />
              </div>
              <h3 className="text-lg font-bold text-white">Malware Reverse Engineering</h3>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Detonation analysis, behavioral profiling, and IoC extraction for immediate threat intelligence.
              </p>
            </div>
          </div>

          <div className="v-card p-6 border border-[var(--color-border)]/40 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-bold text-[var(--color-brand-light)]">04</span>
                <FileText size={20} className="text-[var(--color-brand-light)]" />
              </div>
              <h3 className="text-lg font-bold text-white">Executive Report</h3>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Forensic-grade report with attack timeline, IoCs, TTPs, attribution assessment, and regulatory compliance summary.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Loop Integration Callout */}
      <section className="bg-gradient-to-r from-[var(--color-brand-danger)]/10 to-[var(--color-brand-accent)]/10 border border-[var(--color-brand-danger)]/20 rounded-2xl p-8 space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-[var(--color-brand-danger)]/20 border border-[var(--color-brand-danger)]/40 flex items-center justify-center flex-shrink-0">
            <AlertTriangle size={24} className="text-[var(--color-brand-danger)]" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">How DFIR Powers The Loop</h3>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              Every breach we contain fuels our R&D Lab. Novel malware, zero-days, and TTPs are extracted, analyzed, and transformed into detection rules (YARA, Sigma, Snort). These rules are immediately distributed to our SOC and all managed clients—turning your incident into enterprise-wide defensive capability.
            </p>
          </div>
        </div>
      </section>

      {/* Business Outcomes */}
      <section className="space-y-8">
        <div className="border-b border-[var(--color-border)]/30 pb-4">
          <h2 className="text-3xl font-bold text-white">Business Outcomes</h2>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            What you actually achieve.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {outcomes.map((outcome, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-[var(--color-bg-secondary)] to-[var(--color-bg-tertiary)] border border-[var(--color-border)]/40 rounded-2xl p-6 space-y-3"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">{outcome.icon}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-white">{outcome.title}</h3>
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mt-1">
                    {outcome.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[var(--color-brand-danger)]/5 to-[var(--color-brand-accent)]/5 border border-[var(--color-border)]/30 rounded-2xl p-8 space-y-6 text-center">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Experiencing a Security Incident?</h3>
          <p className="text-sm text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Our DFIR team is on standby 24/7/365. Contact us immediately for emergency response coordination.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onOpenContact('DFIR Emergency')}
            className="bg-[var(--color-brand-danger)] hover:bg-[#ffb4ab] hover:text-white text-white px-7 py-3.5 rounded font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-[var(--color-brand-danger)]/20"
          >
            Emergency Response
          </button>
          <button
            onClick={() => onNavigate('services')}
            className="border border-[var(--color-border)] hover:border-[var(--color-brand-light)] text-[var(--color-text-primary)] px-6 py-3.5 rounded font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2"
          >
            View All Services <ArrowRight size={14} />
          </button>
        </div>
      </section>
    </div>
  );
};
