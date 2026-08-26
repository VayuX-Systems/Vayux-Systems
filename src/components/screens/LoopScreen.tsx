import React, { useState } from 'react';
import { PageId } from '../../types';
import { LOOP_STAGES } from '../../data/mockData';
import { VayuXLoopAnimation } from '../VayuXLoopAnimation';
import {
  ChevronRight,
  ArrowRight,
  RefreshCw,
  X,
  Check,
  Radio,
  Gavel,
  FlaskConical,
  ShieldCheck,
  GraduationCap,
  Terminal,
  Activity,
  Search,
  Radar,
  AlertTriangle,
} from 'lucide-react';

interface LoopScreenProps {
  onNavigate: (page: PageId) => void;
  onOpenContact: (service?: string) => void;
}

export const LoopScreen: React.FC<LoopScreenProps> = ({
  onNavigate,
  onOpenContact,
}) => {
  const [selectedStage, setSelectedStage] = useState<number>(0);

  const getStageIcon = (step: string) => {
    switch (step) {
      case '01':
        return <Radio size={18} className="text-[var(--color-brand-danger)]" />;
      case '02':
        return <Search size={18} className="text-[var(--color-brand-light)]" />;
      case '03':
        return <FlaskConical size={18} className="text-[#38bdf8]" />;
      case '04':
        return <Radar size={18} className="text-[var(--color-brand-light)]" />;
      case '05':
        return <GraduationCap size={18} className="text-[var(--color-brand-accent)]" />;
      case '06':
        return <ShieldCheck size={18} className="text-[var(--color-brand-accent)]" />;
      default:
        return <Activity size={18} className="text-[var(--color-brand-light)]" />;
    }
  };

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
          <li className="text-[var(--color-brand-light)]">The VayuX Loop</li>
        </ol>
      </nav>

      {/* Hero Section */}
      <section className="text-center md:text-left flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 md:pr-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-brand-primary)]/20 border border-[var(--color-brand-light)]/30 text-[var(--color-brand-light)] text-xs font-mono">
            <RefreshCw size={13} className="animate-spin" style={{ animationDuration: '6s' }} />
            <span>CONTINUOUS CYCLE OF INTELLIGENCE</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Static defenses fail. <br />
            <span className="text-[var(--color-brand-light)]">The Loop adapts.</span>
          </h1>

          <p className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed">
            Security is not a final state; it is a continuous cycle of intelligence. The VayuX Loop methodology ensures that every threat detected feeds into a perpetual system of refinement, hardening your infrastructure against tomorrow's zero-days.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 items-center justify-center md:justify-start">
            <button
              onClick={() => onOpenContact('The VayuX Loop Integration')}
              className="bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-light)] hover:text-[#003736] text-white px-7 py-3.5 rounded font-semibold text-xs uppercase tracking-wider inline-flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-[var(--color-brand-primary)]/20 focus-visible:outline-2"
            >
              <span>Put your security in a loop</span>
              <ArrowRight size={15} />
            </button>

            {LOOP_STAGES[selectedStage]?.route && (
              <button
                onClick={() => onNavigate(LOOP_STAGES[selectedStage].route!)}
                className="text-[var(--color-brand-light)] hover:text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-2 py-3 px-2 transition-colors cursor-pointer group focus-visible:outline-2"
              >
                <span>Explore {LOOP_STAGES[selectedStage].label || LOOP_STAGES[selectedStage].title} Screen</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>
        </div>

        {/* Central Diagram: Interactive VayuX Loop */}
        <div className="flex-1 w-full min-h-[460px] sm:min-h-[500px] relative rounded-3xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-secondary)] flex flex-col items-center justify-center p-4 sm:p-8 pb-10 sm:pb-12 shadow-2xl transition-colors duration-300">
          <VayuXLoopAnimation
            activeStage={selectedStage}
            onSelectStage={(idx) => setSelectedStage(idx)}
            onNavigate={onNavigate}
            interactive={true}
            className="w-full h-full"
          />

          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between pointer-events-none text-xs font-mono text-[var(--color-brand-light)]">
            <span className="flex items-center gap-1.5 bg-[var(--color-bg-primary)]/80 px-2.5 py-1 rounded border border-[var(--color-brand-primary)]/20">
              <span className="w-2 h-2 rounded-full bg-[var(--color-brand-light)] animate-ping" />
              Active: {LOOP_STAGES[selectedStage].title}
            </span>
            <span className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-widest hidden sm:inline">
              Hover nodes for definitions
            </span>
          </div>
        </div>
      </section>

      {/* Live Interactive Telemetry Inspection Strip */}
      <section className="bg-[var(--color-bg-secondary)] border border-[var(--color-brand-primary)]/20 rounded-2xl p-6 relative overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[var(--color-brand-primary)]/10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[var(--color-bg-primary)] border border-[var(--color-brand-light)]/40 text-[var(--color-brand-light)]">
              <Terminal size={20} />
            </div>
            <div>
              <div className="text-xs font-mono text-[var(--color-brand-light)]">LOOP TELEMETRY CONSOLE</div>
              <h3 className="text-lg font-bold text-white">
                Stage {LOOP_STAGES[selectedStage].step}: {LOOP_STAGES[selectedStage].title}
              </h3>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0 hide-scrollbar">
            {LOOP_STAGES.map((s, idx) => (
              <button
                key={s.step}
                onClick={() => setSelectedStage(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer focus-visible:outline-2 ${
                  selectedStage === idx
                    ? 'bg-[var(--color-brand-primary)] text-white font-bold shadow-md shadow-[var(--color-brand-primary)]/25'
                    : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-brand-primary)]/10'
                }`}
              >
                {s.step} {s.label && `• ${s.label}`}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono text-[var(--color-brand-light)] font-semibold uppercase tracking-wider">
                {LOOP_STAGES[selectedStage].subtitle}
              </div>

              {LOOP_STAGES[selectedStage]?.route && (
                <button
                  onClick={() => onNavigate(LOOP_STAGES[selectedStage].route!)}
                  className="text-xs font-semibold text-[var(--color-brand-light)] hover:text-[var(--color-text-primary)] flex items-center gap-1.5 bg-[var(--color-brand-primary)]/10 hover:bg-[var(--color-brand-primary)]/20 border border-[var(--color-brand-light)]/30 px-3 py-1.5 rounded-lg transition-all cursor-pointer"
                >
                  <span>Go to {LOOP_STAGES[selectedStage].title} page</span>
                  <ArrowRight size={13} />
                </button>
              )}
            </div>

            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              {LOOP_STAGES[selectedStage].description}
            </p>
            <div className="bg-[var(--color-bg-primary)] p-4 rounded-xl border border-[var(--color-border)] font-mono text-xs space-y-1.5">
              <span className="text-[var(--color-text-muted)] block font-semibold text-[11px]">// Live Telemetry Buffer</span>
              <p className="text-[var(--color-brand-light)] select-all font-mono font-medium leading-relaxed break-all">{LOOP_STAGES[selectedStage].telemetryOutput}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider">
              Automated Containment Actions:
            </div>
            <ul className="space-y-2">
              {LOOP_STAGES[selectedStage].actions.map((act, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-xs font-mono text-[var(--color-brand-accent)] bg-[var(--color-bg-primary)] p-2.5 rounded-lg border border-[var(--color-brand-primary)]/10"
                >
                  <Check size={14} className="text-[var(--color-brand-accent)] shrink-0" />
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* The 6 Stages of Adaptation Vertical Stepped Timeline */}
      <section className="space-y-8">
        <div className="border-b border-[var(--color-brand-primary)]/10 pb-4 text-center md:text-left">
          <h2 className="text-3xl font-bold text-white">The 6 Stages of Autonomous Adaptation</h2>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            How incident telemetry converts into autonomous immune memory.
          </p>
        </div>

        <div className="relative overflow-hidden p-2 md:p-6">
          {/* Vertical central dividing line on desktop, left on mobile */}
          <div className="absolute border border-dashed border-[var(--color-brand-light)]/20 h-full left-6 md:left-1/2 -ml-[1px]" />

          {LOOP_STAGES.map((stage, index) => {
            const isEven = index % 2 === 1;
            const isCurrent = selectedStage === index;

            return (
              <div
                key={stage.step}
                onClick={() => setSelectedStage(index)}
                className={`mb-10 flex justify-between items-center w-full cursor-pointer group ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Desktop Spacer */}
                <div className="hidden md:block md:w-5/12" />

                {/* Numbered Center Badge */}
                <div
                  className={`z-25 flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all shadow-xl ${
                    isCurrent
                      ? 'bg-[var(--color-brand-light)] border-white text-[#003736] scale-110'
                      : 'bg-[var(--color-bg-secondary)] border-[var(--color-brand-primary)]/50 text-[var(--color-brand-light)] group-hover:scale-105'
                  }`}
                >
                  <span className="font-mono text-xs font-bold">{stage.step}</span>
                </div>

                {/* Content Card */}
                <div
                  className={`p-6 md:w-5/12 ml-6 md:ml-0 transition-all duration-300 rounded-2xl border ${
                    isCurrent
                      ? 'border-[var(--color-brand-light)] bg-[var(--color-bg-tertiary)] shadow-lg shadow-[var(--color-brand-primary)]/15'
                      : 'border-[var(--color-brand-primary)]/10 bg-[var(--color-bg-secondary)] group-hover:border-[var(--color-brand-light)]/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded bg-[var(--color-bg-primary)] border border-[var(--color-brand-primary)]/15">
                        {getStageIcon(stage.step)}
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-[var(--color-brand-light)] transition-colors">
                        {stage.title}
                      </h3>
                    </div>

                    {stage.route && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate(stage.route!);
                        }}
                        className="text-xs text-[var(--color-brand-light)] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 hover:underline"
                      >
                        <span>View screen</span>
                        <ArrowRight size={12} />
                      </button>
                    )}
                  </div>

                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {stage.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Traditional Security vs The VayuX Loop Comparison */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-bold text-white">Architectural Contrast</h2>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Why reactive ticketing queues fail against modern polymorphic threats.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Traditional Security */}
          <div className="tech-card p-8 border-t-4 border-t-[var(--color-text-muted)] relative overflow-hidden bg-[var(--color-bg-secondary)]">
            <div className="absolute top-4 right-4 text-[var(--color-text-muted)]/10">
              <X size={100} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-6 opacity-75">
              Traditional Security
            </h3>
            <ul className="space-y-4 relative z-10">
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-brand-danger)] mt-1 shrink-0">
                  <X size={18} />
                </span>
                <span className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  <strong className="text-white">Reactive:</strong> Responds only after a breach has successfully exfiltrated data or encrypted disks.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-brand-danger)] mt-1 shrink-0">
                  <X size={18} />
                </span>
                <span className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  <strong className="text-white">Siloed:</strong> Tier 1, Red Teams, and GRC operate on separate spreadsheets, creating friction and blind spots.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-brand-danger)] mt-1 shrink-0">
                  <X size={18} />
                </span>
                <span className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  <strong className="text-white">Static Defenses:</strong> Rulesets grow stale and unmaintained, while attackers continuously rotate infrastructure.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-brand-danger)] mt-1 shrink-0">
                  <X size={18} />
                </span>
                <span className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  <strong className="text-white">Isolated Incidents:</strong> Post-mortem lessons learned are rarely institutionalized into automated defenses.
                </span>
              </li>
            </ul>
          </div>

          {/* The VayuX Loop */}
          <div className="tech-card p-8 border-t-4 border-t-[var(--color-brand-light)] relative overflow-hidden bg-gradient-to-br from-[var(--color-bg-secondary)] to-[var(--color-bg-tertiary)] shadow-xl">
            <div className="absolute top-4 right-4 text-[var(--color-brand-light)]/10">
              <RefreshCw size={100} />
            </div>
            <h3 className="text-2xl font-bold text-[var(--color-brand-light)] mb-6">
              The VayuX Loop
            </h3>
            <ul className="space-y-4 relative z-10">
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-brand-accent)] mt-1 shrink-0">
                  <Check size={18} />
                </span>
                <span className="text-sm text-white leading-relaxed">
                  <strong className="text-white">Proactive:</strong> Synthetically hunts for behavioural anomalies before they escalate into breaches.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-brand-accent)] mt-1 shrink-0">
                  <Check size={18} />
                </span>
                <span className="text-sm text-white leading-relaxed">
                  <strong className="text-white">Integrated:</strong> Real-time threat intelligence flows instantaneously across DFIR, Lab, SOC, and Training.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-brand-accent)] mt-1 shrink-0">
                  <Check size={18} />
                </span>
                <span className="text-sm text-white leading-relaxed">
                  <strong className="text-white">Dynamic Defenses:</strong> Sigma, YARA, and IDS rule definitions are updated automatically across all customer clusters globally.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-brand-accent)] mt-1 shrink-0">
                  <Check size={18} />
                </span>
                <span className="text-sm text-white leading-relaxed">
                  <strong className="text-white">Institutional Knowledge:</strong> Every single neutralized attack permanently hardens every node on the network.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
