'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Eye,
  Shield,
  Heart,
  FlaskConical,
  Award,
  ShieldCheck,
  CheckCircle2,
  Mail,
  MapPin,
  Cpu,
  Lock,
  ArrowRight,
  ExternalLink,
  Code2,
  Terminal,
  Scale,
} from 'lucide-react';
import ScrollReveal from '@/components/layout/ScrollReveal';
import Dribbble3DCard from '@/components/animations/Dribbble3DCard';
import GlassCard from '@/components/ui/GlassCard';
import SectionHeading from '@/components/ui/SectionHeading';
import FAQ from '@/components/ui/FAQ';
import { aboutFAQ } from '@/lib/site-data';
import { api } from '@/lib/api-client';

const initialPrinciples = [
  {
    title: 'Autonomous Defense',
    description: 'Sub-second algorithmic mitigation without waiting for human intervention, neutralizing zero-day threats before execution.',
  },
  {
    title: 'Operational Feedback Loop',
    description: 'Frontline incident response and SOC telemetry continuously train and evolve our neural detection heuristics.',
  },
  {
    title: 'Zero-Trust Engineering',
    description: 'Continuous cryptographic verification at every boundary, protocol, and identity layer across distributed architectures.',
  },
  {
    title: 'Scientific Rigor',
    description: 'Empirical validation at every layer. Our protocols are subjected to exhaustive testing in controlled adversarial environments.',
  },
];

const getMemberAvatar = (name: string, backendAvatar?: string | null) => {
  if (backendAvatar) return backendAvatar;
  const lower = (name || '').toLowerCase();
  if (lower.includes('vikram')) return '/images/vikramaditya-sharma.jpg';
  if (lower.includes('aarav')) return '/images/aarav-patel.jpg';
  if (lower.includes('nandini')) return '/images/nandini-joshi.jpg';
  return null;
};

const fallbackLeadership = [
  {
    id: 7,
    name: 'Vikramaditya Sharma',
    role_designation: 'Co-Founder & VP of Systems Defense',
    bio: 'Leading low-level kernel security and real-time event telemetry pipelines. Specialist in memory resident exploit mitigation and distributed cyber defense architectures.',
    avatar_image: '/images/vikramaditya-sharma.jpg',
    linkedin_url: 'https://www.linkedin.com/company/vayux-systems',
    github_url: 'https://github.com/vayux-systems',
    is_founder: true,
  },
  {
    id: 8,
    name: 'Aarav Patel',
    role_designation: 'Head of Threat Intelligence & Neural Modeling',
    bio: 'Pioneer in predictive behavioral heuristics, autonomous anomaly scoring, and sub-15ms event correlation engines trained on live operational SOC telemetry.',
    avatar_image: '/images/aarav-patel.jpg',
    linkedin_url: 'https://www.linkedin.com/company/vayux-systems',
    github_url: 'https://github.com/vayux-systems',
    is_founder: false,
  },
  {
    id: 9,
    name: 'Nandini Joshi',
    role_designation: 'Director of Sovereign GRC & Compliance',
    bio: 'Specialist in DPDP Act 2023 statutory alignment, CERT-In mandatory disclosure runbooks, and continuous zero-trust governance architectures.',
    avatar_image: '/images/nandini-joshi.jpg',
    linkedin_url: 'https://www.linkedin.com/company/vayux-systems',
    github_url: 'https://github.com/vayux-systems',
    is_founder: false,
  },
];

export default function AboutPage() {
  const [aboutData, setAboutData] = useState<any>({
    hero_title: 'The Genesis of Sovereign Defense',
    hero_subtitle: 'Constructing unassailable defensive architectures through deep R&D and operational threat telemetry.',
    founding_story: 'Founded in 2024 in Vadodara, Gujarat, VayuX Systems was established as an innovation-driven laboratory designed to replace static security tools with autonomous, self-defending architectures. By channeling real-world incident response and SOC telemetry directly into low-level systems research, VayuX engineers defense that evolves faster than adversaries.',
    leadership_quote: 'True cyber sovereignty is not bought off the shelf; it is forged through rigorous offensive research.',
    leader_name: 'Pragnesh Kumar S.',
    leader_title: 'Founder & Chief Technology Officer',
    core_principles: initialPrinciples,
    team_members: fallbackLeadership,
    credentials: [],
  });

  useEffect(() => {
    async function loadBackendAbout() {
      try {
        const live = await api.getAboutUs(true);
        if (live) {
          const founder = live.team_members?.find((m: any) => m.name.includes('Pragnesh'));
          const subLeadership = live.team_members?.filter((m: any) => !m.name.includes('Pragnesh')) || fallbackLeadership;

          const mappedSubLeadership = (subLeadership.length > 0 ? subLeadership : fallbackLeadership).map((m: any) => ({
            ...m,
            avatar_image: getMemberAvatar(m.name, m.avatar_image),
          }));

          setAboutData({
            hero_title: live.hero_title || 'The Genesis of Sovereign Defense',
            hero_subtitle: live.hero_subtitle || 'Constructing unassailable defensive architectures through deep R&D and operational threat telemetry.',
            founding_story: live.founding_story || aboutData.founding_story,
            leadership_quote: live.leadership_quote || aboutData.leadership_quote,
            leader_name: live.leader_name || founder?.name || 'Pragnesh Kumar S.',
            leader_title: live.leader_title || founder?.role_designation || 'Founder & Chief Technology Officer',
            core_principles: live.core_principles?.length > 0 ? live.core_principles.map((p: any) => ({
              title: p.title,
              description: p.desc || p.description,
            })) : initialPrinciples,
            team_members: mappedSubLeadership,
            credentials: live.credentials || [],
          });
        }
      } catch {
        if (process.env.NODE_ENV === 'development') {
          console.info('[VayuX About] Backend offline or unreachable — utilizing static about fallback.');
        }
      }
    }
    loadBackendAbout();
  }, []);

  const iconMap: Record<string, any> = {
    'Autonomous Defense': Eye,
    'Operational Feedback Loop': Shield,
    'Zero-Trust Engineering': Heart,
    'Scientific Rigor': FlaskConical,
    Transparency: Eye,
    'Structural Resilience': Shield,
    'Proactive Care': Heart,
  };

  const expertiseList = [
    'Kernel Architecture',
    'Systems Defense',
    'Vulnerability Research',
    'Autonomous Security',
    'Post-Quantum Cryptography',
    'Offensive Telemetry',
  ];

  return (
    <div className="pt-28 md:pt-36 pb-20 md:pb-32 px-4 sm:px-6 md:px-[80px] max-w-[1440px] mx-auto w-full">
      {/* 1. Hero Section */}
      <section className="py-10 md:py-16 max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-sm">
            🛡️ Sovereign Defense Architecture
          </span>
          <h1 className="font-[var(--font-heading)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-on-surface mb-6 leading-tight tracking-tight">
            {aboutData.hero_title.includes('Sovereign') ? (
              <>
                {aboutData.hero_title.split('Sovereign')[0]}
                <span className="text-gradient">Sovereign{aboutData.hero_title.split('Sovereign')[1]}</span>
              </>
            ) : (
              aboutData.hero_title
            )}
          </h1>
          <p className="font-[var(--font-body)] text-base sm:text-lg md:text-xl text-on-surface-variant max-w-3xl mx-auto leading-relaxed font-light">
            {aboutData.hero_subtitle}
          </p>
        </ScrollReveal>
      </section>

      {/* 2. Founding Story & Mission Bento */}
      <section className="py-8 md:py-12 max-w-5xl mx-auto mb-20 md:mb-28">
        <ScrollReveal>
          <div className="glass-card rounded-3xl p-8 sm:p-12 md:p-14 border border-primary/25 bg-gradient-to-br from-primary/5 via-slate-900/40 to-secondary-container/5 relative overflow-hidden shadow-[0_20px_60px_rgba(0,168,255,0.06)]">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10">
              <span className="text-xs font-mono font-bold tracking-widest text-primary uppercase mb-3 inline-block">
                // THE GENESIS &amp; R&amp;D PARADIGM
              </span>
              <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl md:text-4xl font-bold text-on-surface mb-6">
                Bridging Frontline Incident Telemetry with Deep Lab Research
              </h2>
              <p className="font-[var(--font-body)] text-base sm:text-lg text-on-surface-variant leading-relaxed font-light mb-8">
                {aboutData.founding_story}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-outline-variant/15 text-xs font-mono uppercase tracking-wider text-on-surface-variant">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span>HQ: Vadodara, Gujarat</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  <span>24/7/365 Operational Grid</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Self-Defending Architecture</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 3. Founder & CTO Spotlight Bento Card */}
      <section className="py-12 md:py-20 mb-20">
        <SectionHeading
          center
          title="Founder &amp; Chief Technology Officer"
          subtitle="Guiding fundamental security research, kernel architecture, and autonomous defensive engineering."
        />

        <ScrollReveal>
          <div className="max-w-5xl mx-auto glass-card rounded-3xl p-8 sm:p-12 border border-primary/30 bg-gradient-to-br from-slate-900/80 via-slate-950/90 to-primary/5 shadow-[0_25px_80px_rgba(0,168,255,0.1)] relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/15 rounded-full blur-[120px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center relative z-10">
              {/* Left Column: Avatar & Quick Badges */}
              <div className="lg:col-span-4 flex flex-col items-center text-center">
                <div className="relative mb-6 group">
                  <div className="absolute -inset-1.5 bg-gradient-to-r from-primary to-sky-400 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-500" />
                  <div className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-slate-900 dark:border-slate-800 bg-slate-900 shadow-2xl flex items-center justify-center">
                    <Image
                      src="/images/pragnesh-singh.jpg"
                      alt={aboutData.leader_name || "Pragnesh Kumar Singh - Founder & CTO"}
                      fill
                      sizes="192px"
                      className="object-cover object-top hover:scale-105 transition-transform duration-500"
                      priority
                    />
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/15 border border-primary/40 text-primary text-xs font-bold uppercase tracking-wider mb-2">
                  <ShieldCheck className="w-3.5 h-3.5" /> FOUNDER &amp; CTO
                </span>

                <h3 className="font-[var(--font-heading)] text-2xl font-bold text-on-surface">
                  {aboutData.leader_name}
                </h3>
                <p className="text-xs font-mono text-secondary uppercase tracking-widest mt-1">
                  VayuX Systems
                </p>
                <p className="text-xs text-on-surface-variant/80 flex items-center gap-1 mt-2">
                  <MapPin className="w-3.5 h-3.5 text-primary" /> Vadodara, Gujarat, India
                </p>

                {/* Social Links */}
                <div className="flex items-center gap-3 mt-6">
                  <a
                    href="https://www.linkedin.com/in/pragnesh-singh-rajput/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-slate-800/80 border border-white/10 hover:border-primary/50 hover:bg-primary/20 text-on-surface hover:text-primary transition-all flex items-center justify-center"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.65 1.65 0 1 0 0 3.3 1.65 1.65 0 0 0 0-3.3Z" />
                    </svg>
                  </a>
                  <a
                    href="https://github.com/pragnesh-singh-rajput"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-slate-800/80 border border-white/10 hover:border-primary/50 hover:bg-primary/20 text-on-surface hover:text-primary transition-all flex items-center justify-center"
                    aria-label="GitHub"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
                    </svg>
                  </a>
                  <a
                    href="mailto:pragnesh.s@vayux.systems"
                    className="w-10 h-10 rounded-xl bg-slate-800/80 border border-white/10 hover:border-primary/50 hover:bg-primary/20 text-on-surface hover:text-primary transition-all flex items-center justify-center"
                    aria-label="Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Right Column: Bio, Expertise & Quote */}
              <div className="lg:col-span-8 flex flex-col justify-between">
                <div>
                  <h4 className="font-[var(--font-heading)] text-xl sm:text-2xl font-bold text-on-surface mb-3">
                    Architecting Autonomous, Self-Defending Digital Infrastructure
                  </h4>
                  <p className="font-[var(--font-body)] text-sm sm:text-base text-on-surface-variant font-light leading-relaxed mb-6">
                    Specialist in autonomous threat detection architectures, post-quantum cryptography research, and offensive security telemetry. Leading engineering research in Vadodara to transform reactive security operations into proactive, self-healing cyber defense grids.
                  </p>

                  {/* Expertise Badges */}
                  <div className="mb-8">
                    <p className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-3">
                      Core Research &amp; Technical Domain:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {expertiseList.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 rounded-lg bg-slate-800/90 border border-slate-700/60 text-slate-200 text-xs font-mono"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Integrated Quote Card */}
                <div className="p-6 rounded-2xl bg-primary/10 border border-primary/25 relative overflow-hidden">
                  <p className="font-[var(--font-heading)] text-sm sm:text-base text-on-surface italic leading-relaxed">
                    &ldquo;{aboutData.leadership_quote}&rdquo;
                  </p>
                  <p className="text-xs font-mono font-bold text-primary uppercase tracking-widest mt-3">
                    — {aboutData.leader_name}, {aboutData.leader_title}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 4. Co-Founders & Core Leadership Grid */}
      {aboutData.team_members?.length > 0 && (
        <section className="py-12 md:py-20 mb-24 md:mb-32">
          <SectionHeading
            center
            title="Co-Founders &amp; Core Defense Architects"
            subtitle="The executive specialists engineering systems defense, threat heuristics, and sovereign governance."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {aboutData.team_members.map((member: any, idx: number) => (
              <ScrollReveal key={member.name + idx} delay={idx * 0.1}>
                <Dribbble3DCard
                  depth={20}
                  className="p-8 flex flex-col justify-between h-full rounded-3xl border border-white/10 bg-slate-900/70 hover:border-primary/40 backdrop-blur-xl transition-all hover:shadow-[0_20px_50px_rgba(0,168,255,0.08)]"
                >
                  <div>
                    {/* Member Photo & Role Badge */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden border-2 border-primary/30 bg-slate-800 shrink-0 shadow-lg shadow-primary/5">
                        {member.avatar_image ? (
                          <Image
                            src={member.avatar_image}
                            alt={member.name}
                            fill
                            sizes="72px"
                            className="object-cover object-top hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center text-primary">
                            {member.role_designation.includes('Systems') && <Terminal className="w-7 h-7" />}
                            {member.role_designation.includes('Threat') && <Eye className="w-7 h-7" />}
                            {member.role_designation.includes('GRC') && <Scale className="w-7 h-7" />}
                            {!member.role_designation.includes('Systems') &&
                              !member.role_designation.includes('Threat') &&
                              !member.role_designation.includes('GRC') && <Shield className="w-7 h-7" />}
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          {member.is_founder ? (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/20 border border-primary/30 text-primary font-bold uppercase tracking-wider">
                              CO-FOUNDER
                            </span>
                          ) : (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-400 font-semibold uppercase tracking-wider">
                              LEAD ARCHITECT
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] font-mono text-secondary uppercase tracking-wider block truncate">
                          {member.role_designation.split('&')[0]}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-[var(--font-heading)] text-xl font-bold text-on-surface mb-1">
                      {member.name}
                    </h3>
                    <p className="text-xs font-mono text-secondary uppercase tracking-widest mb-4">
                      {member.role_designation}
                    </p>
                    <p className="font-[var(--font-body)] text-xs sm:text-sm text-on-surface-variant font-light leading-relaxed mb-6">
                      {member.bio}
                    </p>
                  </div>

                  {/* Social Channels */}
                  <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                    {member.linkedin_url && (
                      <a
                        href={member.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-slate-800 border border-white/10 hover:border-primary/50 text-slate-400 hover:text-primary transition-all flex items-center justify-center"
                        aria-label="LinkedIn"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.65 1.65 0 1 0 0 3.3 1.65 1.65 0 0 0 0-3.3Z" />
                        </svg>
                      </a>
                    )}
                    {member.github_url && (
                      <a
                        href={member.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-slate-800 border border-white/10 hover:border-primary/50 text-slate-400 hover:text-primary transition-all flex items-center justify-center"
                        aria-label="GitHub"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </Dribbble3DCard>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* 5. Core Principles Grid */}
      <section className="py-16 md:py-24 bg-surface-container-low rounded-3xl p-6 sm:p-10 md:p-16 relative overflow-hidden mb-24 md:mb-36">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-fixed-dim/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-container/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10">
          <SectionHeading
            center
            gradient
            title="Core Principles"
            subtitle="The fundamental tenets guiding our research and defensive grid."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {aboutData.core_principles.map((principle: any, idx: number) => {
              const IconComponent = iconMap[principle.title] || Shield;
              return (
                <ScrollReveal key={principle.title} delay={idx * 0.1}>
                  <Dribbble3DCard depth={20} className="p-8 flex flex-col items-center text-center h-full rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl hover:border-primary/40 transition-all">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-6 text-primary shadow-lg shadow-primary/10">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <h3 className="font-[var(--font-heading)] text-lg md:text-xl font-bold mb-3 text-on-surface">
                      {principle.title}
                    </h3>
                    <p className="font-[var(--font-body)] text-xs sm:text-sm text-on-surface-variant font-light leading-relaxed flex-1">
                      {principle.description}
                    </p>
                  </Dribbble3DCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Verified Sovereign Credentials (Symmetrical 6-Grid) */}
      {aboutData.credentials?.length > 0 && (
        <section className="py-12 md:py-20 mb-24">
          <SectionHeading
            center
            title="Verified Sovereign Accreditations"
            subtitle="Strict alignment with global frameworks and statutory Indian cybersecurity standards."
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 max-w-6xl mx-auto">
            {aboutData.credentials.slice(0, 6).map((cred: any, idx: number) => (
              <ScrollReveal key={cred.name + idx} delay={idx * 0.05}>
                <div className="glass-card rounded-2xl p-5 text-center border border-white/10 hover:border-primary/40 bg-slate-900/70 hover:shadow-[0_10px_30px_rgba(0,168,255,0.12)] transition-all flex flex-col justify-between h-full min-h-[170px]">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-primary/15 border border-primary/30 text-primary text-[10px] font-mono font-bold uppercase mb-3">
                      {cred.badge_label || 'VERIFIED'}
                    </span>
                    <h4 className="font-[var(--font-heading)] text-sm font-bold text-on-surface line-clamp-2">
                      {cred.name}
                    </h4>
                  </div>
                  <p className="text-[11px] text-on-surface-variant/80 font-mono mt-3 pt-3 border-t border-white/5">
                    {cred.issuing_body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* 7. Operational Transparency FAQ */}
      <section className="py-16 md:py-24 bg-surface-container-low rounded-3xl p-6 sm:p-10 md:p-16 mb-16">
        <div className="max-w-3xl mx-auto">
          <SectionHeading
            center
            gradient
            title="Operational Transparency FAQ"
            subtitle="Clear insights into our autonomous defense protocols and research ethics."
          />
          <ScrollReveal>
            <FAQ items={aboutFAQ} />
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
