import React from 'react';
import { PageId } from '../../types';
import {
  ChevronRight,
  CheckCircle,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  Zap,
  FileText,
  Briefcase,
  BarChart3,
} from 'lucide-react';

interface GrcScreenProps {
  onNavigate: (page: PageId) => void;
  onOpenContact: (service?: string) => void;
}

export const GrcScreen: React.FC<GrcScreenProps> = ({
  onNavigate,
  onOpenContact,
}) => {
  const outcomes = [
    {
      title: 'Audit-Ready Posture',
      desc: 'SOC2 Type II, ISO 27001, DPDP Act 2023, and CERT-In compliance mappings completed before your audit cycle.',
      icon: <CheckCircle2 size={22} className="text-[var(--color-brand-accent)]" />,
    },
    {
      title: 'Regulatory Confidence',
      desc: 'Evidence-backed compliance frameworks reduce audit findings and accelerate certification sign-off.',
      icon: <ShieldCheck size={22} className="text-[#71dba2]" />,
    },
    {
      title: 'Risk Quantification',
      desc: 'Board-level risk matrices with financial impact modeling tied to control gaps and remediation roadmaps.',
      icon: <BarChart3 size={22} className="text-[var(--color-brand-light)]" />,
    },
    {
      title: 'Continuous Compliance',
      desc: 'Automated control monitoring and gap detection ensures you stay audit-ready year-round, not just during audits.',
      icon: <TrendingUp size={22} className="text-[#71dba2]" />,
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
          <li className="text-[var(--color-brand-light)]">GRC & Advisory</li>
        </ol>
      </nav>

      {/* Hero Section */}
      <section className="grid md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-brand-primary)]/20 border border-[var(--color-brand-light)]/40 flex items-center justify-center text-[var(--color-brand-light)]">
              <Briefcase size={26} />
            </div>
            <div>
              <div className="text-xs font-mono text-[var(--color-brand-light)] uppercase tracking-wider">
                Compliance & Strategy
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                GRC & Advisory
              </h1>
            </div>
          </div>

          <p className="text-lg text-[var(--color-brand-light)] font-medium leading-snug">
            Governance, Risk, and Compliance strategy that ties technical security to business outcomes.
          </p>

          <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
            Regulatory frameworks are complex and often misunderstood by technical teams. VayuX GRC translates compliance requirements (DPDP Act 2023, CERT-In, SOC2, ISO 27001) into actionable control frameworks. We map your security investments to regulatory obligations, quantify risk in business terms, and guide your organization toward audit readiness—before the auditors arrive.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onOpenContact('GRC Engagement')}
              className="bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-light)] hover:text-[#010203] text-white px-7 py-3.5 rounded font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-[var(--color-brand-primary)]/20"
            >
              Request GRC Assessment
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
              Industry Challenge
            </div>
            <div className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
              40-60%
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1">
              Of organizations fail SOC2 or ISO audits on first attempt due to control gaps.
            </p>
          </div>

          <div className="border-t border-[var(--color-border)]/40 pt-6">
            <div className="text-xs font-mono text-[var(--color-brand-accent)] uppercase tracking-wider mb-1">
              VayuX Result
            </div>
            <div className="text-4xl sm:text-5xl font-bold text-[var(--color-brand-light)] tracking-tight">
              100% Pass
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1">
              First-time audit success with mapped, evidence-backed controls.
            </p>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="space-y-8">
        <div className="border-b border-[var(--color-border)]/30 pb-4">
          <h2 className="text-3xl font-bold text-white">The Problem</h2>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            Compliance complexity overwhelms technical teams, creating audit risk and strategic misalignment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <CheckCircle size={24} className="text-[var(--color-brand-danger)] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-white mb-2">Control Mapping Chaos</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Multiple frameworks (DPDP, CERT-In, SOC2, ISO 27001) use different terminology. Mapping controls across them is manual, error-prone, and resource-intensive.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <CheckCircle size={24} className="text-[var(--color-brand-danger)] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-white mb-2">Audit Surprises</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Control gaps discovered during audits lead to failed certifications, delays, and expensive remediation projects.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <CheckCircle size={24} className="text-[var(--color-brand-danger)] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-white mb-2">Risk Blindness</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Technical teams don't speak the language of business risk. Security investments are disconnected from executive decision-making.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <CheckCircle size={24} className="text-[var(--color-brand-danger)] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-white mb-2">Continuous Compliance Drift</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Compliance is treated as an event (annual audit) rather than a continuous process, leading to control degradation over time.
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
            Engineering-first compliance mapping with continuous risk quantification.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="v-card p-6 border border-[var(--color-border)]/40 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-bold text-[var(--color-brand-light)]">01</span>
                <Briefcase size={20} className="text-[var(--color-brand-light)]" />
              </div>
              <h3 className="text-lg font-bold text-white">Framework Assessment</h3>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Evaluate your current state against DPDP Act 2023, CERT-In, SOC2 Type II, and ISO 27001 requirements.
              </p>
            </div>
          </div>

          <div className="v-card p-6 border border-[var(--color-border)]/40 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-bold text-[var(--color-brand-light)]">02</span>
                <BarChart3 size={20} className="text-[var(--color-brand-light)]" />
              </div>
              <h3 className="text-lg font-bold text-white">Control Mapping</h3>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Cross-reference your existing controls to regulatory requirements, identifying gaps and overlaps.
              </p>
            </div>
          </div>

          <div className="v-card p-6 border border-[var(--color-border)]/40 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-bold text-[var(--color-brand-light)]">03</span>
                <TrendingUp size={20} className="text-[var(--color-brand-light)]" />
              </div>
              <h3 className="text-lg font-bold text-white">Risk Quantification</h3>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Translate control gaps into business-level risk impact, prioritized for executive decision-making.
              </p>
            </div>
          </div>

          <div className="v-card p-6 border border-[var(--color-border)]/40 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-bold text-[var(--color-brand-light)]">04</span>
                <FileText size={20} className="text-[var(--color-brand-light)]" />
              </div>
              <h3 className="text-lg font-bold text-white">Roadmap & Monitoring</h3>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Remediation roadmap with continuous compliance monitoring to stay audit-ready year-round.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Loop Integration Callout */}
      <section className="bg-gradient-to-r from-[var(--color-brand-primary)]/10 to-[var(--color-brand-light)]/10 border border-[var(--color-brand-light)]/20 rounded-2xl p-8 space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-[var(--color-brand-primary)]/20 border border-[var(--color-brand-light)]/40 flex items-center justify-center flex-shrink-0">
            <Briefcase size={24} className="text-[var(--color-brand-light)]" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">How GRC Completes The Loop</h3>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              GRC is the final stage of The VayuX Loop. Insights from DFIR, VAPT, SOC monitoring, and our R&D Lab feed into your compliance framework. Regulatory changes are reflected in updated control assessments. New threat intelligence is mapped to audit requirements. Your compliance program becomes intelligence-driven rather than checkbox-driven.
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
      <section className="bg-gradient-to-r from-[var(--color-brand-primary)]/5 to-[var(--color-brand-light)]/5 border border-[var(--color-border)]/30 rounded-2xl p-8 space-y-6 text-center">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Is Your Organization Audit-Ready?</h3>
          <p className="text-sm text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Get a free GRC assessment to identify compliance gaps before your auditors do.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onOpenContact('GRC Assessment')}
            className="bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-light)] hover:text-[#010203] text-white px-7 py-3.5 rounded font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-[var(--color-brand-primary)]/20"
          >
            Request Assessment
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
