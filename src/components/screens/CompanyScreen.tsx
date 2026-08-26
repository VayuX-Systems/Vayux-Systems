import React from 'react';
import { PageId, TeamMember, JobOpening } from '../../types';
import { TEAM_MEMBERS, JOB_OPENINGS } from '../../data/mockData';
import {
  ChevronRight,
  Code2,
  MessageSquare,
  RefreshCw,
  Award,
  Briefcase,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface CompanyScreenProps {
  onNavigate: (page: PageId) => void;
  onOpenJobApplication: (job: JobOpening) => void;
  onOpenContact: (service?: string) => void;
}

export const CompanyScreen: React.FC<CompanyScreenProps> = ({
  onNavigate,
  onOpenJobApplication,
  onOpenContact,
}) => {
  const founder = TEAM_MEMBERS.find((m) => m.isFounder) || TEAM_MEMBERS[0];
  const leadershipTeam = TEAM_MEMBERS.filter((m) => !m.isFounder);

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
          <li className="text-[var(--color-brand-light)]">Company</li>
        </ol>
      </nav>

      {/* Header */}
      <header className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-brand-primary)]/20 border border-[var(--color-brand-light)]/30 text-[var(--color-brand-light)] text-xs font-mono">
          <span>ABOUT VAYUX SYSTEMS</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
          Cybersecurity, engineered like it should be.
        </h1>
        <p className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed">
          We are not a reseller. We are not a checkbox compliance factory. We are engineers, researchers, and operators building verifiable, mathematical security systems.
        </p>
      </header>

      {/* 3 Core Principles */}
      <section className="space-y-6">
        <div className="border-b border-[var(--color-border)]/30 pb-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Our Core Principles</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="v-card p-8 border border-[var(--color-border)]/40 hover:border-[var(--color-brand-light)]/50 transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-brand-primary)]/20 border border-[var(--color-brand-light)]/30 text-[var(--color-brand-light)] flex items-center justify-center">
              <Code2 size={24} />
            </div>
            <h3 className="text-xl font-bold text-white">Engineering-First</h3>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              We solve security problems in code, infrastructure topology, and algorithmic threat modeling — not with more bloated vendor licenses or useless alerts.
            </p>
          </div>

          <div className="v-card p-8 border border-[var(--color-border)]/40 hover:border-[var(--color-brand-light)]/50 transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-brand-primary)]/20 border border-[var(--color-brand-light)]/30 text-[var(--color-brand-light)] flex items-center justify-center">
              <MessageSquare size={24} />
            </div>
            <h3 className="text-xl font-bold text-white">Plain Language</h3>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              No fear-mongering or obfuscated acronyms. We communicate attack severity, blast radiuses, and remediation trade-offs clearly to both engineers and boards.
            </p>
          </div>

          <div className="v-card p-8 border border-[var(--color-border)]/40 hover:border-[var(--color-brand-light)]/50 transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-brand-primary)]/20 border border-[var(--color-brand-light)]/30 text-[var(--color-brand-light)] flex items-center justify-center">
              <RefreshCw size={24} />
            </div>
            <h3 className="text-xl font-bold text-white">Continuous Adaptation</h3>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              Security is not an annual PDF audit. Our proprietary loop methodology ensures your defenses continuously ingest live zero-day threat intelligence.
            </p>
          </div>
        </div>
      </section>

      {/* The Team / Leadership Section */}
      <section className="space-y-8">
        <div className="border-b border-[var(--color-border)]/30 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">The Team</h2>
            <p className="text-xs font-mono text-[var(--color-brand-light)] mt-0.5">0xENGINEERS & THREAT RESEARCHERS</p>
          </div>
        </div>

        {/* Founder Spotlight Card */}
        {founder && (
          <div className="v-card p-8 sm:p-10 border border-[var(--color-brand-light)]/40 bg-gradient-to-br from-[var(--color-bg-secondary)] to-[var(--color-bg-tertiary)] rounded-2xl shadow-2xl">
            <div className="grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-4 flex justify-center">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-2 border-[var(--color-brand-light)]/40 shadow-xl">
                  {founder.image ? (
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-light)] flex items-center justify-center text-4xl font-bold text-white">
                      {founder.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-[var(--color-brand-primary)] text-white text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase">
                    Founder
                  </div>
                </div>
              </div>

              <div className="md:col-span-8 space-y-4 text-center md:text-left">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">{founder.name}</h3>
                  <div className="text-sm font-mono text-[var(--color-brand-light)] mt-1">{founder.role}</div>
                </div>

                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {founder.bio}
                </p>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2">
                  {founder.certifications.map((cert) => (
                    <span
                      key={cert}
                      className="px-3 py-1 rounded-md bg-[var(--color-bg-primary)] border border-[var(--color-border)]/60 text-xs font-mono text-[var(--color-brand-accent)] flex items-center gap-1"
                    >
                      <Award size={13} /> {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Leadership Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {leadershipTeam.map((member) => (
            <div
              key={member.id}
              className="v-card p-6 border border-[var(--color-border)]/40 hover:border-[var(--color-brand-light)]/50 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-24 h-24 rounded-2xl overflow-hidden border border-[var(--color-brand-light)]/30 shadow-md">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-light)] flex items-center justify-center font-bold text-white text-lg">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="text-xl font-bold text-white">{member.name}</h4>
                  <div className="text-xs font-mono text-[var(--color-brand-light)] mt-0.5">{member.role}</div>
                </div>

                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                  {member.bio}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[var(--color-border)]/30 mt-4">
                {member.certifications.map((c) => (
                  <span
                    key={c}
                    className="px-2 py-0.5 rounded bg-[var(--color-bg-primary)] border border-[var(--color-border)]/50 text-[10px] font-mono text-[var(--color-brand-accent)]"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Careers Section */}
      <section className="space-y-8">
        <div className="border-b border-[var(--color-border)]/30 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Join the Defense Engineering Corps</h2>
            <p className="text-sm text-[var(--color-text-secondary)] mt-1">
              Work with world-class cryptographers, kernel developers, and reverse engineers.
            </p>
          </div>
          <div className="text-xs font-mono text-[var(--color-brand-light)] flex items-center gap-1.5">
            <Sparkles size={14} className="text-[var(--color-brand-accent)]" />
            <span>Remote-First • Open Positions</span>
          </div>
        </div>

        <div className="space-y-4">
          {JOB_OPENINGS.map((job) => (
            <div
              key={job.id}
              className="v-card p-6 border border-[var(--color-border)]/40 hover:border-[var(--color-brand-light)]/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex flex-wrap items-center gap-3">
                  <h4 className="text-lg font-bold text-white">{job.title}</h4>
                  <span className="px-2.5 py-0.5 rounded-full bg-[var(--color-brand-primary)]/20 border border-[var(--color-brand-light)]/30 text-[var(--color-brand-light)] text-[10px] font-mono font-semibold">
                    {job.department}
                  </span>
                </div>

                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                  {job.description}
                </p>

                <div className="flex items-center gap-4 text-xs font-mono text-[var(--color-text-muted)] pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} className="text-[var(--color-brand-light)]" /> {job.location}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Briefcase size={12} className="text-[var(--color-brand-light)]" /> {job.type}
                  </span>
                </div>
              </div>

              <div className="shrink-0">
                <button
                  onClick={() => onOpenJobApplication(job)}
                  className="bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-light)] hover:text-[#010203] text-white px-6 py-2.5 rounded font-semibold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Apply Now</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Direct Contact Banner */}
      <section className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)]/40 rounded-2xl p-8 text-center space-y-4">
        <h3 className="text-2xl font-bold text-white">Have a confidential inquiry?</h3>
        <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] max-w-lg mx-auto">
          Contact our leadership team directly via encrypted channels or request a formal RFP assessment.
        </p>
        <div className="pt-2">
          <button
            onClick={() => onOpenContact('Confidential Leadership Inquiry')}
            className="bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-light)] hover:text-[#010203] text-white px-8 py-3 rounded font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer"
          >
            Direct Contact
          </button>
        </div>
      </section>
    </div>
  );
};
