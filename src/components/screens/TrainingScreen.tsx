import React from 'react';
import { PageId } from '../../types';
import {
  ChevronRight,
  BookOpen,
  Users,
  CheckCircle2,
  Zap,
  ArrowRight,
  TrendingDown,
  FileText,
  Shield,
  Award,
} from 'lucide-react';

interface TrainingScreenProps {
  onNavigate: (page: PageId) => void;
  onOpenContact: (service?: string) => void;
}

export const TrainingScreen: React.FC<TrainingScreenProps> = ({
  onNavigate,
  onOpenContact,
}) => {
  const outcomes = [
    {
      title: 'Reduced Incident Likelihood',
      desc: 'Phishing click rates drop by 60-80% after targeted training programs, dramatically reducing successful social engineering attacks.',
      icon: <TrendingDown size={22} className="text-[var(--color-brand-accent)]" />,
    },
    {
      title: 'Behavioral Hardening',
      desc: 'Employees develop security muscle memory through continuous simulations and micro-training, catching suspicious activity before it spreads.',
      icon: <Shield size={22} className="text-[#71dba2]" />,
    },
    {
      title: 'Compliance Training Credits',
      desc: 'Documented security awareness training meets SOC2, ISO 27001, and regulatory training requirements with audit-ready evidence trails.',
      icon: <Award size={22} className="text-[var(--color-brand-light)]" />,
    },
    {
      title: 'Security Culture Shift',
      desc: 'Engineers become security champions. Security stops being "IT\'s job" and becomes everyone\'s responsibility across your organization.',
      icon: <Users size={22} className="text-[#71dba2]" />,
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
          <li className="text-[var(--color-brand-light)]">Security Training</li>
        </ol>
      </nav>

      {/* Hero Section */}
      <section className="grid md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-brand-primary)]/20 border border-[var(--color-brand-light)]/40 flex items-center justify-center text-[var(--color-brand-light)]">
              <BookOpen size={26} />
            </div>
            <div>
              <div className="text-xs font-mono text-[var(--color-brand-light)] uppercase tracking-wider">
                Human-Centric Security
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                Security Training
              </h1>
            </div>
          </div>

          <p className="text-lg text-[var(--color-brand-light)] font-medium leading-snug">
            Technical & behavioral training programs that harden the human element of your organization.
          </p>

          <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
            Your strongest security control is an educated workforce. VayuX Security Training combines technical depth with behavioral psychology to create lasting security awareness. From phishing simulations to secure coding workshops, we deliver role-specific training that sticks—reducing human error, the #1 cause of breaches.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onOpenContact('Security Training')}
              className="bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-light)] hover:text-[#010203] text-white px-7 py-3.5 rounded font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-[var(--color-brand-primary)]/20"
            >
              Schedule Training Program
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
              82%
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1">
              Of breaches involve a human element: phishing, credential abuse, or social engineering.
            </p>
          </div>

          <div className="border-t border-[var(--color-border)]/40 pt-6">
            <div className="text-xs font-mono text-[var(--color-brand-accent)] uppercase tracking-wider mb-1">
              VayuX Reduction
            </div>
            <div className="text-4xl sm:text-5xl font-bold text-[var(--color-brand-light)] tracking-tight">
              60-80%
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1">
              Drop in phishing click rates after training + continuous simulations.
            </p>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="space-y-8">
        <div className="border-b border-[var(--color-border)]/30 pb-4">
          <h2 className="text-3xl font-bold text-white">The Problem</h2>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            Technical controls fail when people do. One phishing click undoes your entire security stack.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Zap size={24} className="text-[var(--color-brand-danger)] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-white mb-2">Phishing Vulnerability</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Average employee has a 1 in 220 chance of falling for phishing. One compromised account becomes your entry point.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Zap size={24} className="text-[var(--color-brand-danger)] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-white mb-2">Credential Abuse</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Employees reuse passwords, share credentials, and write them down. Your MFA means nothing if the password is compromised.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Zap size={24} className="text-[var(--color-brand-danger)] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-white mb-2">Social Engineering</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Attackers exploit human nature to bypass technical controls. A well-crafted pretext call defeats your firewall.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Zap size={24} className="text-[var(--color-brand-danger)] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-white mb-2">Generic Training Fatigue</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Mandatory annual compliance training is forgotten immediately. Security awareness requires continuous reinforcement.
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
            Role-specific training with continuous simulations and behavioral feedback loops.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="v-card p-6 border border-[var(--color-border)]/40 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-bold text-[var(--color-brand-light)]">01</span>
                <BookOpen size={20} className="text-[var(--color-brand-light)]" />
              </div>
              <h3 className="text-lg font-bold text-white">Role-Specific Curriculum</h3>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Different training for executives, engineers, support staff—each tailored to their specific risk profile.
              </p>
            </div>
          </div>

          <div className="v-card p-6 border border-[var(--color-border)]/40 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-bold text-[var(--color-brand-light)]">02</span>
                <Shield size={20} className="text-[var(--color-brand-light)]" />
              </div>
              <h3 className="text-lg font-bold text-white">Phishing Simulations</h3>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Real-world phishing scenarios delivered monthly. Employees who click receive immediate micro-training.
              </p>
            </div>
          </div>

          <div className="v-card p-6 border border-[var(--color-border)]/40 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-bold text-[var(--color-brand-light)]">03</span>
                <Award size={20} className="text-[var(--color-brand-light)]" />
              </div>
              <h3 className="text-lg font-bold text-white">Gamification & Feedback</h3>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Leaderboards, badges, and progress tracking make security engaging and reward good behavior.
              </p>
            </div>
          </div>

          <div className="v-card p-6 border border-[var(--color-border)]/40 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-bold text-[var(--color-brand-light)]">04</span>
                <FileText size={20} className="text-[var(--color-brand-light)]" />
              </div>
              <h3 className="text-lg font-bold text-white">Audit-Ready Reporting</h3>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Completion certificates, training logs, and compliance reports for SOC2, ISO 27001, and regulatory audits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Loop Integration Callout */}
      <section className="bg-gradient-to-r from-[var(--color-brand-primary)]/10 to-[var(--color-brand-light)]/10 border border-[var(--color-brand-light)]/20 rounded-2xl p-8 space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-[var(--color-brand-primary)]/20 border border-[var(--color-brand-light)]/40 flex items-center justify-center flex-shrink-0">
            <BookOpen size={24} className="text-[var(--color-brand-light)]" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">How Training Strengthens The Loop</h3>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              Every phishing simulation, every social engineering simulation, every incident scenario from your organization feeds back into our training curriculum. New attack vectors discovered by our DFIR and SOC teams are immediately incorporated into training modules. Your employees become real-time security sensors, reporting new threats that inform our R&D Lab.
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
          <h3 className="text-2xl font-bold text-white mb-2">Ready to Build a Security-Aware Culture?</h3>
          <p className="text-sm text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Start with a custom training assessment to understand your organization's security maturity and risk profile.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onOpenContact('Security Training')}
            className="bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-light)] hover:text-[#010203] text-white px-7 py-3.5 rounded font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-[var(--color-brand-primary)]/20"
          >
            Schedule Assessment
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
