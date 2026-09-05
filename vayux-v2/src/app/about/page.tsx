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

const fallbackLeadership = [
  {
    id: 1,
    name: 'PragneshKumar S. Singh',
    role_designation: 'Founder & Chief Technology Officer',
    bio: 'Architecting autonomous, self-defending digital infrastructure through fundamental cybersecurity research and applied systems defense. Deep expertise in kernel architecture, vulnerability research, and low-level systems engineering.',
    avatar_image: '/images/pragnesh-singh.jpg',
    linkedin_url: 'https://www.linkedin.com/in/pragnesh-singh-rajput/',
    github_url: 'https://github.com/pragnesh-singh-rajput',
    email: 'pragnesh.s@vayux.systems',
    is_founder: true,
    display_order: 1,
  },
  {
    id: 2,
    name: 'Varun Patel',
    role_designation: 'Co-Founder & CEO',
    bio: "Leading VayuX's business vision and strategic growth, focused on translating technology and innovation into meaningful solutions for customers.",
    avatar_image: '/images/aarav-patel.jpg',
    linkedin_url: 'https://www.linkedin.com/company/vayux-systems',
    github_url: 'https://github.com/vayux-systems',
    email: 'contact@vayux.systems',
    is_founder: true,
    display_order: 2,
  },
  {
    id: 3,
    name: 'Ishan Manoj',
    role_designation: 'Head of IT',
    bio: "Leading VayuX's IT infrastructure and technical operations, ensuring reliable, secure, and efficient systems that support the organization's growth.",
    avatar_image: '/images/ishan-manoj.jpeg',
    linkedin_url: 'https://www.linkedin.com/in/ishanmanoj29',
    github_url: 'https://github.com/ishanmanoj29',
    email: 'ishan.m@vayux.systems',
    is_founder: false,
    display_order: 3,
  },
];

const getMemberAvatar = (name: string, backendAvatar?: string | null) => {
  const lower = (name || '').toLowerCase();

  // High-fidelity local imagery for founding team
  if (lower.includes('pragnesh')) return '/images/pragnesh-singh.jpg';
  if (lower.includes('ishan')) return '/images/ishan-manoj.jpeg';
  if (lower.includes('varun')) return '/images/aarav-patel.jpg';

  if (backendAvatar) {
    if (backendAvatar.startsWith('http')) return backendAvatar;
    if (backendAvatar.startsWith('/media')) return `https://vayux-backend.onrender.com${backendAvatar}`;
    return backendAvatar;
  }

  if (lower.includes('vikram')) return '/images/vikramaditya-sharma.jpg';
  if (lower.includes('nandini')) return '/images/nandini-joshi.jpg';

  return null;
};

const getMemberBadge = (member: any) => {
  const lowerName = (member.name || '').toLowerCase();
  const lowerRole = (member.role_designation || '').toLowerCase();

  if (lowerName.includes('pragnesh') || lowerRole.includes('cto')) {
    return {
      label: 'FOUNDER & CTO',
      icon: ShieldCheck,
      badgeClass: 'bg-primary/10 border-primary/30 text-primary',
    };
  }
  if (lowerName.includes('varun') || lowerRole.includes('ceo') || member.is_founder) {
    return {
      label: 'CO-FOUNDER & CEO',
      icon: ShieldCheck,
      badgeClass: 'bg-primary/10 border-primary/30 text-primary',
    };
  }
  if (lowerName.includes('ishan') || lowerRole.includes('head of it')) {
    return {
      label: 'HEAD OF IT',
      icon: Cpu,
      badgeClass: 'bg-sky-500/10 border-sky-500/30 text-sky-600 dark:text-sky-400',
    };
  }
  return {
    label: 'CORE ARCHITECT',
    icon: Shield,
    badgeClass: 'bg-primary/10 border-primary/30 text-primary',
  };
};

const getMemberSkills = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes('pragnesh')) {
    return ['Kernel Arch', 'Autonomous Security', 'Vulnerability Research'];
  }
  if (lower.includes('varun')) {
    return ['Strategic Growth', 'Executive Vision', 'VayuX Operations'];
  }
  if (lower.includes('ishan')) {
    return ['IT Infrastructure', 'Cloud Defense', 'SecOps Systems'];
  }
  return ['Cyber Defense', 'Security Systems', 'Engineering'];
};

const getMemberLinks = (member: any) => {
  const lower = (member.name || '').toLowerCase();
  const linkedin =
    member.linkedin_url && member.linkedin_url.trim() !== ''
      ? member.linkedin_url
      : 'https://www.linkedin.com/company/vayux-systems';

  const github =
    member.github_url && member.github_url.trim() !== ''
      ? member.github_url
      : 'https://github.com/vayux-systems';

  const email =
    member.email ||
    (lower.includes('pragnesh')
      ? 'mailto:pragnesh.s@vayux.systems'
      : lower.includes('ishan')
      ? 'mailto:ishan.m@vayux.systems'
      : 'mailto:contact@vayux.systems');

  return { linkedin, github, email };
};

export default function AboutPage() {
  const [aboutData, setAboutData] = useState<any>({
    hero_title: 'The Genesis of Sovereign Defense',
    hero_subtitle: 'Constructing unassailable defensive architectures through deep R&D and operational threat telemetry.',
    founding_story: 'Founded in 2024 in Vadodara, Gujarat, VayuX Systems was established as an innovation-driven laboratory designed to replace static security tools with autonomous, self-defending architectures. By channeling real-world incident response and SOC telemetry directly into low-level systems research, VayuX engineers defense that evolves faster than adversaries.',
    leadership_quote: 'True cyber sovereignty is not bought off the shelf; it is forged through rigorous offensive research.',
    leader_name: 'PragneshKumar S. Singh',
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
          const rawMembers =
            live.team_members && live.team_members.length > 0
              ? live.team_members
              : fallbackLeadership;

          // Symmetrical sorting by backend display_order
          const sortedMembers = [...rawMembers].sort(
            (a: any, b: any) => (a.display_order || 0) - (b.display_order || 0)
          );

          const mappedMembers = sortedMembers.map((m: any) => ({
            ...m,
            avatar_image: getMemberAvatar(m.name, m.avatar_image),
            email: m.name.toLowerCase().includes('pragnesh')
              ? 'pragnesh.s@vayux.systems'
              : m.name.toLowerCase().includes('ishan')
              ? 'ishan.m@vayux.systems'
              : 'contact@vayux.systems',
          }));

          const founder =
            mappedMembers.find((m: any) => m.name.toLowerCase().includes('pragnesh')) ||
            mappedMembers[0];

          setAboutData({
            hero_title: live.hero_title || 'The Genesis of Sovereign Defense',
            hero_subtitle:
              live.hero_subtitle ||
              'Constructing unassailable defensive architectures through deep R&D and operational threat telemetry.',
            founding_story: live.founding_story || aboutData.founding_story,
            leadership_quote: live.leadership_quote || aboutData.leadership_quote,
            leader_name: live.leader_name || founder?.name || 'PragneshKumar S. Singh',
            leader_title:
              live.leader_title ||
              founder?.role_designation ||
              'Founder & Chief Technology Officer',
            core_principles:
              live.core_principles?.length > 0
                ? live.core_principles.map((p: any) => ({
                    title: p.title,
                    description: p.desc || p.description,
                  }))
                : initialPrinciples,
            team_members: mappedMembers,
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
          <div className="glass-card rounded-3xl p-8 sm:p-12 md:p-14 border border-primary/25 bg-gradient-to-br from-primary/5 via-white/50 dark:via-slate-900/40 to-secondary-container/5 relative overflow-hidden shadow-[0_20px_60px_rgba(0,168,255,0.06)]">
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-200/80 dark:border-outline-variant/15 text-xs font-mono uppercase tracking-wider text-on-surface-variant">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span>HQ: Vadodara, Gujarat</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  <span>24/7/365 Operational Grid</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Self-Defending Architecture</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 3. Unified Leadership Section: All 3 Executive Cards in Same Line */}
      <section className="py-12 md:py-20 mb-20 md:mb-28">
        <SectionHeading
          center
          title="Executive Leadership &amp; Founding Architects"
          subtitle="Guiding fundamental security research, systems architecture, and sovereign cyber defense."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto items-stretch">
          {aboutData.team_members.map((member: any, idx: number) => {
            const badge = getMemberBadge(member);
            const BadgeIcon = badge.icon;
            const skills = getMemberSkills(member.name);
            const links = getMemberLinks(member);

            return (
              <ScrollReveal key={member.name + idx} delay={idx * 0.1} className="h-full">
                <Dribbble3DCard depth={15} className="h-full">
                  <div className="glass-card rounded-3xl p-7 sm:p-8 flex flex-col justify-between h-full border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-slate-900/75 backdrop-blur-xl hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 shadow-[0_10px_35px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_50px_rgba(0,168,255,0.08)] group relative overflow-hidden">
                    {/* Hover Glow */}
                    <div className="absolute -top-16 -right-16 w-36 h-36 bg-primary/10 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="flex flex-col items-center text-center flex-1">
                      {/* Avatar */}
                      <div className="relative mb-5 group/avatar">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-sky-400 rounded-full blur opacity-30 group-hover/avatar:opacity-80 transition duration-500" />
                        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-primary/30 bg-slate-100 dark:bg-slate-800 shadow-xl flex items-center justify-center">
                          {member.avatar_image ? (
                            <Image
                              src={member.avatar_image}
                              alt={member.name}
                              fill
                              sizes="128px"
                              className={`object-cover ${
                                member.name.toLowerCase().includes('ishan')
                                  ? 'object-[50%_25%] scale-[1.5]'
                                  : 'object-top'
                              } group-hover/avatar:scale-105 transition-transform duration-500`}
                              priority={idx === 0}
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-950 flex items-center justify-center text-primary font-[var(--font-heading)] text-2xl font-bold">
                              {member.name
                                .split(' ')
                                .map((p: string) => p[0])
                                .join('')
                                .slice(0, 2)
                                .toUpperCase()}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Badge */}
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10.5px] font-mono font-bold uppercase tracking-wider mb-3 ${badge.badgeClass}`}
                      >
                        <BadgeIcon className="w-3.5 h-3.5" /> {badge.label}
                      </span>

                      {/* Name */}
                      <h3 className="font-[var(--font-heading)] text-xl sm:text-2xl font-bold text-on-surface mb-1 leading-snug">
                        {member.name}
                      </h3>

                      {/* Designation */}
                      <p className="text-xs font-mono text-primary dark:text-secondary uppercase tracking-widest font-semibold mb-2">
                        {member.role_designation}
                      </p>

                      {/* Location */}
                      <div className="flex items-center justify-center gap-1 text-xs text-on-surface-variant/75 mb-4">
                        <MapPin className="w-3.5 h-3.5 text-primary" /> Vadodara, Gujarat, India
                      </div>

                      {/* Bio from Backend */}
                      <p className="font-[var(--font-body)] text-xs sm:text-sm text-on-surface-variant leading-relaxed font-light mb-6 flex-1 text-center">
                        {member.bio}
                      </p>

                      {/* Domain Badges */}
                      <div className="flex flex-wrap justify-center gap-1.5 mb-6">
                        {skills.map((skill: string) => (
                          <span
                            key={skill}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-200 text-[11px] font-mono"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Social Links Footer */}
                    <div className="pt-4 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-center gap-3 w-full">
                      <a
                        href={links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200/80 dark:border-white/10 hover:border-primary/50 text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary hover:bg-primary/10 transition-all flex items-center justify-center"
                        aria-label={`${member.name} LinkedIn`}
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.65 1.65 0 1 0 0 3.3 1.65 1.65 0 0 0 0-3.3Z" />
                        </svg>
                      </a>
                      <a
                        href={links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200/80 dark:border-white/10 hover:border-primary/50 text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary hover:bg-primary/10 transition-all flex items-center justify-center"
                        aria-label={`${member.name} GitHub`}
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
                        </svg>
                      </a>
                      <a
                        href={links.email}
                        className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200/80 dark:border-white/10 hover:border-primary/50 text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary hover:bg-primary/10 transition-all flex items-center justify-center"
                        aria-label={`Email ${member.name}`}
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </Dribbble3DCard>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Leadership Quote Banner */}
        <ScrollReveal delay={0.3}>
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-primary/25 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl relative overflow-hidden text-center shadow-[0_10px_35px_rgba(0,168,255,0.06)]">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
              <p className="font-[var(--font-heading)] text-base sm:text-lg md:text-xl text-on-surface italic leading-relaxed max-w-3xl mx-auto">
                &ldquo;{aboutData.leadership_quote}&rdquo;
              </p>
              <p className="text-xs font-mono font-bold text-primary uppercase tracking-widest mt-4">
                — {aboutData.leader_name}, {aboutData.leader_title}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 4. Core Principles Grid */}
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
                  <Dribbble3DCard depth={20} className="h-full">
                    <div className="glass-card p-8 flex flex-col items-center text-center h-full rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl hover:border-primary/40 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-6 text-primary shadow-lg shadow-primary/10">
                        <IconComponent className="w-7 h-7" />
                      </div>
                      <h3 className="font-[var(--font-heading)] text-lg md:text-xl font-bold mb-3 text-on-surface">
                        {principle.title}
                      </h3>
                      <p className="font-[var(--font-body)] text-xs sm:text-sm text-on-surface-variant font-light leading-relaxed flex-1">
                        {principle.description}
                      </p>
                    </div>
                  </Dribbble3DCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Verified Sovereign Credentials (Symmetrical 6-Grid) */}
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
                <div className="glass-card rounded-2xl p-5 text-center border border-slate-200/80 dark:border-white/10 hover:border-primary/40 bg-white/80 dark:bg-slate-900/70 hover:shadow-[0_10px_30px_rgba(0,168,255,0.12)] transition-all flex flex-col justify-between h-full min-h-[170px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-primary/15 border border-primary/30 text-primary text-[10px] font-mono font-bold uppercase mb-3">
                      {cred.badge_label || 'VERIFIED'}
                    </span>
                    <h4 className="font-[var(--font-heading)] text-sm font-bold text-on-surface line-clamp-2">
                      {cred.name}
                    </h4>
                  </div>
                  <p className="text-[11px] text-on-surface-variant/80 font-mono mt-3 pt-3 border-t border-slate-200/60 dark:border-white/5">
                    {cred.issuing_body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* 6. Operational Transparency FAQ */}
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
