import React from 'react';
import { PageId } from '../../types';
import {
  ChevronRight,
  Target,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Zap,
  FileText,
  Server,
  Lock,
  Code,
} from 'lucide-react';

interface VaptScreenProps {
  onNavigate: (page: PageId) => void;
  onOpenContact: (service?: string) => void;
}

export const VaptScreen: React.FC<VaptScreenProps> = ({
  onNavigate,
  onOpenContact,
}) => {
  const outcomes = [
    {
      title: 'Eliminated Risk Window',
      desc: 'Discover exploitable vulnerabilities before malicious actors do, reducing your CVE exposure window to near-zero.',
      icon: <Zap size={22} className="text-[var(--color-brand-accent)]" />,
    },
    {
      title: 'Proactive Exploitation Prevention',
      desc: 'Real-world proof-of-concept demonstrations show exactly how attackers would exploit each vulnerability.',
      icon: <Target size={22} className="text-[#71dba2]" />,
    },
    {
      title: 'Board-Ready Remediation',
      desc: 'Executive-friendly remediation roadmaps prioritized by business impact and technical feasibility.',
      icon: <FileText size={22} className="text-[var(--color-brand-light)]" />,
    },
    {
      title: 'Compliance Validation',
      desc: 'Penetration testing reports meet SOC2 Type II, ISO 27001, and regulatory audit requirements.',
      icon: <CheckCircle2 size={22} className="text-[#71dba2]" />,
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
          <li className="text-[var(--color-brand-light)]">VAPT</li>
        </ol>
      </nav>

      {/* Hero Section */}
      <section className="grid md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-brand-primary)]/20 border border-[var(--color-brand-light)]/40 flex items-center justify-center text-[var(--color-brand-light)]">
              <Target size={26} />
            </div>
            <div>
              <div className="text-xs font-mono text-[var(--color-brand-light)] uppercase tracking-wider">
                Adversarial Simulation
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                VAPT
              </h1>
            </div>
          </div>

          <p className="text-lg text-[var(--color-brand-light)] font-medium leading-snug">
            Penetration Testing & Vulnerability Assessment from an adversary's perspective.
          </p>

          <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
            Most vulnerability scanners produce thousands of noise alerts. VayuX VAPT cuts through the static with targeted, manual adversarial simulation. We don't just find vulnerabilities—we prove real-world exploitability and provide engineering-grade remediation guidance that your team can act on immediately.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onOpenContact('VAPT Engagement')}
              className="bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-light)] hover:text-[#010203] text-white px-7 py-3.5 rounded font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-[var(--color-brand-primary)]/20"
            >
              Request VAPT Proposal
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
              Industry Average
            </div>
            <div className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
              14 Days
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1">
              Average time to patch critical vulnerabilities after discovery.
            </p>
          </div>

          <div className="border-t border-[var(--color-border)]/40 pt-6">
            <div className="text-xs font-mono text-[var(--color-brand-accent)] uppercase tracking-wider mb-1">
              VayuX Advantage
            </div>
            <div className="text-4xl sm:text-5xl font-bold text-[var(--color-brand-light)] tracking-tight">
              Proof of Concept
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1">
              Executable exploits + remediation guidance + patch validation.
            </p>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="space-y-8">
        <div className="border-b border-[var(--color-border)]/30 pb-4">
          <h2 className="text-3xl font-bold text-white">The Problem</h2>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            Vulnerability discovery without exploitation proof is expensive guesswork.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <AlertTriangle size={24} className="text-[var(--color-brand-danger)] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-white mb-2">Alert Fatigue</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Automated scanners produce thousands of low-signal alerts, making it impossible to prioritize actual risk.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <AlertTriangle size={24} className="text-[var(--color-brand-danger)] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-white mb-2">Patch Uncertainty</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Security teams don't know which vulnerabilities are truly exploitable without proof, leading to wasted remediation effort.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <AlertTriangle size={24} className="text-[var(--color-brand-danger)] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-white mb-2">Compliance Gaps</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Regulators require proof of adversarial testing, not just vulnerability scanner output.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <AlertTriangle size={24} className="text-[var(--color-brand-danger)] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-white mb-2">Exploitation Time</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Attackers find and exploit your vulnerabilities before your teams even know they exist.
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
            Manual adversarial simulation with engineering-grade exploitation proof.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="v-card p-6 border border-[var(--color-border)]/40 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-bold text-[var(--color-brand-light)]">01</span>
                <Server size={20} className="text-[var(--color-brand-light)]" />
              </div>
              <h3 className="text-lg font-bold text-white">Reconnaissance</h3>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Map your attack surface: cloud storage, APIs, internal services, and supply chain dependencies.
              </p>
            </div>
          </div>

          <div className="v-card p-6 border border-[var(--color-border)]/40 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-bold text-[var(--color-brand-light)]">02</span>
                <Code size={20} className="text-[var(--color-brand-light)]" />
              </div>
              <h3 className="text-lg font-bold text-white">Exploitation</h3>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Manually exploit vulnerabilities to prove real-world risk and demonstrate attack chains.
              </p>
            </div>
          </div>

          <div className="v-card p-6 border border-[var(--color-border)]/40 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-bold text-[var(--color-brand-light)]">03</span>
                <Lock size={20} className="text-[var(--color-brand-light)]" />
              </div>
              <h3 className="text-lg font-bold text-white">Remediation Roadmap</h3>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Prioritized fix guidance: which vulnerabilities to patch first based on business impact.
              </p>
            </div>
          </div>

          <div className="v-card p-6 border border-[var(--color-border)]/40 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-bold text-[var(--color-brand-light)]">04</span>
                <CheckCircle2 size={20} className="text-[var(--color-brand-light)]" />
              </div>
              <h3 className="text-lg font-bold text-white">Validation & Re-test</h3>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Post-remediation testing confirms fixes are effective and complete.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Loop Integration Callout */}
      <section className="bg-gradient-to-r from-[var(--color-brand-primary)]/10 to-[var(--color-brand-light)]/10 border border-[var(--color-brand-light)]/20 rounded-2xl p-8 space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-[var(--color-brand-primary)]/20 border border-[var(--color-brand-light)]/40 flex items-center justify-center flex-shrink-0">
            <Target size={24} className="text-[var(--color-brand-light)]" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">How VAPT Fuels The Loop</h3>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              Every vulnerability discovered through VayuX VAPT feeds into our R&D Lab. Novel exploitation techniques are analyzed, defensive rules are generated (YARA, Sigma, Snort), and immediately propagated to our SOC and all managed clients. Your penetration test doesn't just harden your organization—it strengthens the entire VayuX ecosystem.
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
          <h3 className="text-2xl font-bold text-white mb-2">Ready to Find and Eliminate Your Vulnerabilities?</h3>
          <p className="text-sm text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Start with a scoped VAPT engagement or a full red team assessment. We'll guide you through the process.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onOpenContact('VAPT Engagement')}
            className="bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-light)] hover:text-[#010203] text-white px-7 py-3.5 rounded font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-[var(--color-brand-primary)]/20"
          >
            Request VAPT Proposal
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
