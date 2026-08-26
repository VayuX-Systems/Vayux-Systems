import React from 'react';
import { PageId } from '../../types';
import {
  ChevronRight,
  Briefcase,
  TrendingUp,
  CheckCircle2,
  Users,
  ArrowRight,
  Zap,
  FileText,
  Target,
  Layers,
} from 'lucide-react';

interface ConsultationScreenProps {
  onNavigate: (page: PageId) => void;
  onOpenContact: (service?: string) => void;
}

export const ConsultationScreen: React.FC<ConsultationScreenProps> = ({
  onNavigate,
  onOpenContact,
}) => {
  const outcomes = [
    {
      title: 'Strategic Alignment',
      desc: 'Security strategy mapped to business objectives. Your CISO and CFO speak the same language about risk and investment.',
      icon: <Layers size={22} className="text-[var(--color-brand-accent)]" />,
    },
    {
      title: 'Leadership Clarity',
      desc: 'Board-level security reporting, investor readiness, and governance frameworks that satisfy external stakeholders.',
      icon: <Users size={22} className="text-[#71dba2]" />,
    },
    {
      title: 'Risk Prioritization',
      desc: 'Engineering-driven risk models that identify your top 5 vulnerabilities and the exact remediation path to close them.',
      icon: <Target size={22} className="text-[var(--color-brand-light)]" />,
    },
    {
      title: 'Vendor Risk Management',
      desc: 'Third-party security assessment frameworks, SLA enforcement, and supply chain risk quantification for procurement decisions.',
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
          <li className="text-[var(--color-brand-light)]">Consultation</li>
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
                Executive Advisory
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                Cyber Security Consultation
              </h1>
            </div>
          </div>

          <p className="text-lg text-[var(--color-brand-light)] font-medium leading-snug">
            On-demand vCISO and board-level security leadership for strategic decision-making.
          </p>

          <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
            Many organizations lack a mature CISO function or face periodic leadership gaps. VayuX Cyber Security Consultation provides fractional vCISO services—strategic security leadership on your timeline. We guide security program maturation, advise on vendor risk, and prepare your organization for board scrutiny and investor diligence.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onOpenContact('vCISO Consultation')}
              className="bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-light)] hover:text-[#003736] text-white px-7 py-3.5 rounded font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-[var(--color-brand-primary)]/20"
            >
              Request vCISO Engagement
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
              40%
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1">
              Of organizations have no permanent CISO. Leadership is fragmented or outsourced without strategic oversight.
            </p>
          </div>

          <div className="border-t border-[var(--color-border)]/40 pt-6">
            <div className="text-xs font-mono text-[var(--color-brand-accent)] uppercase tracking-wider mb-1">
              VayuX Advantage
            </div>
            <div className="text-4xl sm:text-5xl font-bold text-[var(--color-brand-light)] tracking-tight">
              Fractional
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1">
              vCISO services scaled to your needs: part-time, on-demand, or full strategic engagement.
            </p>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="space-y-8">
        <div className="border-b border-[var(--color-border)]/30 pb-4">
          <h2 className="text-3xl font-bold text-white">The Problem</h2>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            Security strategy is fragmented without a unified leadership voice and clear business alignment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Users size={24} className="text-[var(--color-brand-danger)] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-white mb-2">CISO Shortage</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Experienced CISOs are expensive and hard to recruit. Many organizations lack this critical leadership role entirely.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Users size={24} className="text-[var(--color-brand-danger)] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-white mb-2">Strategic Misalignment</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Security decisions are made in isolation from business strategy. Risk quantification doesn't reach the C-suite.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Users size={24} className="text-[var(--color-brand-danger)] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-white mb-2">Vendor Risk Blindness</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  No framework for evaluating third-party security posture. Procurement decisions are driven by price, not risk.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Users size={24} className="text-[var(--color-brand-danger)] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-white mb-2">Board Unpreparedness</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Boards lack security maturity. Investor diligence exposes gaps. No unified narrative on security posture.
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
            Fractional vCISO leadership with board-level strategy and vendor risk governance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="v-card p-6 border border-[var(--color-border)]/40 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-bold text-[var(--color-brand-light)]">01</span>
                <Target size={20} className="text-[var(--color-brand-light)]" />
              </div>
              <h3 className="text-lg font-bold text-white">Security Roadmap</h3>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Multi-year strategy aligned with business objectives. Prioritized initiatives mapped to budget and risk reduction.
              </p>
            </div>
          </div>

          <div className="v-card p-6 border border-[var(--color-border)]/40 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-bold text-[var(--color-brand-light)]">02</span>
                <FileText size={20} className="text-[var(--color-brand-light)]" />
              </div>
              <h3 className="text-lg font-bold text-white">Board & Investor Reporting</h3>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Executive briefings, incident summaries, and risk narratives tailored for board committees and due diligence.
              </p>
            </div>
          </div>

          <div className="v-card p-6 border border-[var(--color-border)]/40 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-bold text-[var(--color-brand-light)]">03</span>
                <Layers size={20} className="text-[var(--color-brand-light)]" />
              </div>
              <h3 className="text-lg font-bold text-white">Vendor Risk Management</h3>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Third-party assessment frameworks, SLA enforcement, and supply chain risk quantification for procurement.
              </p>
            </div>
          </div>

          <div className="v-card p-6 border border-[var(--color-border)]/40 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-bold text-[var(--color-brand-light)]">04</span>
                <TrendingUp size={20} className="text-[var(--color-brand-light)]" />
              </div>
              <h3 className="text-lg font-bold text-white">Program Maturity</h3>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Capability assessment and maturity roadmap. Coaching for internal security teams to reach organizational goals.
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
            <h3 className="text-xl font-bold text-white mb-2">How Consultation Orchestrates The Loop</h3>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              vCISO consultation is the orchestration layer of The VayuX Loop. We ensure insights from DFIR, VAPT, SOC monitoring, training, and GRC are synthesized into strategic decisions. New threat intelligence informs your roadmap. Vendor risk assessments protect your supply chain. Your security program becomes intelligence-driven and continuously evolving.
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
          <h3 className="text-2xl font-bold text-white mb-2">Looking for Strategic Security Leadership?</h3>
          <p className="text-sm text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Let's discuss your security strategy, maturity assessment, and how fractional vCISO services can accelerate your program.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onOpenContact('vCISO Consultation')}
            className="bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-light)] hover:text-[#003736] text-white px-7 py-3.5 rounded font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-[var(--color-brand-primary)]/20"
          >
            Schedule vCISO Engagement
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
