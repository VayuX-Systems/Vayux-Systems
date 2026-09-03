'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  MapPin,
  Clock,
  Shield,
  CheckCircle2,
  Upload,
  Send,
  Loader2,
  AlertCircle,
  FileText,
  Building,
  GraduationCap,
  XCircle,
  AlertTriangle,
} from 'lucide-react';
import ScrollReveal from '@/components/layout/ScrollReveal';
import GlassCard from '@/components/ui/GlassCard';
import SectionHeading from '@/components/ui/SectionHeading';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { api, JobRole } from '@/lib/api-client';

const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const PHONE_REGEX = /^\+?[0-9\s\-()]{7,25}$/;

const fallbackRoles: Record<string, any> = {
  'offensive-security-researcher': {
    title: 'Offensive Security Researcher',
    slug: 'offensive-security-researcher',
    department: 'VAPT / Offensive R&D',
    location: 'Remote / Vadodara Lab',
    tag: 'OFFENSIVE · FELLOWSHIP / FULL-TIME',
    description: 'Reverse-engineer binaries, design novel exploit chains, and audit complex enterprise architectures to uncover architectural vulnerabilities before adversary weaponization.',
    responsibilities: [
      'Conduct systemic vulnerability assessments and advanced penetration testing across web, mobile, and cloud environments.',
      'Develop proof-of-concept exploits for chained business logic and memory corruption vulnerabilities.',
      'Collaborate directly with the CTO to feed offensive research into VayuX autonomous detection heuristics.',
      'Produce court-admissible technical vulnerability reports with actionable code remediation roadmaps.',
    ],
    requirements: [
      'Deep understanding of Linux/Windows internals, network protocols, and the OWASP Top 10 / CWE standards.',
      'Proficiency in Python, C/C++, Rust, or Go for custom exploit and tool scripting.',
      'Hands-on experience with Burp Suite Pro, Ghidra/IDA Pro, Metasploit, or Wireshark.',
      'Relevant security certifications or competitive CTF track record (OSCP, CRTE, CEH, or HackTheBox rank).',
    ],
    subject: 'Application - Offensive Security Researcher',
  },
  'soc-incident-analyst': {
    title: '24/7 SOC Incident Analyst',
    slug: 'soc-incident-analyst',
    department: 'Security Operations',
    location: 'Vadodara / Remote 24/7 Roster',
    tag: 'DEFENSE · 24/7 ROSTER',
    description: 'Monitor real-time threat telemetry, triage SIEM anomalies, and execute automated containment playbooks during live security incidents across client networks.',
    responsibilities: [
      'Analyze continuous event telemetry across cloud perimeters, firewalls, and EDR endpoints.',
      'Investigate behavioral anomalies and correlate alerts using VayuX sub-15ms neural engine.',
      'Execute automated containment playbooks to isolate compromised nodes during active incidents.',
      'Coordinate with DFIR on-call commanders for escalated threat containment.',
    ],
    requirements: [
      'Experience in Level-1/Level-2 Security Operations Center monitoring and alert triage.',
      'Familiarity with SIEM/EDR platforms (Wazuh, Splunk, Elastic, Sentinel, CrowdStrike).',
      'Strong knowledge of the MITRE ATT&CK framework and network traffic analysis.',
      'Ability to operate in rotational roster shifts with high focus and analytical rigor.',
    ],
    subject: 'Application - 24/7 SOC Incident Analyst',
  },
  'grc-compliance-auditor': {
    title: 'GRC & Compliance Auditor',
    slug: 'grc-compliance-auditor',
    department: 'Compliance',
    location: 'Remote / Hybrid',
    tag: 'GOVERNANCE · SOVEREIGN COMPLIANCE',
    description: 'Map enterprise architectures against DPDP Act 2023, ISO 27001, SOC 2 Type II, and CERT-In mandates, establishing unassailable policy frameworks.',
    responsibilities: [
      'Perform comprehensive compliance gap assessments for enterprise clients.',
      'Draft institutional security policies, data classification schemes, and risk registers.',
      'Align client incident reporting runbooks with mandatory CERT-In 6-hour disclosure directives.',
      'Guide organizations through successful ISO 27001 and SOC 2 Type II external audits.',
    ],
    requirements: [
      'Thorough understanding of ISO/IEC 27001, NIST CSF, and India DPDP Act 2023 statutory requirements.',
      'Experience conducting internal audits and developing compliance remediation plans.',
      'Strong technical writing and executive stakeholder communication capabilities.',
    ],
    subject: 'Application - GRC & Compliance Auditor',
  },
  'core-systems-architect': {
    title: 'Core Systems Architect',
    slug: 'core-systems-architect',
    department: 'Systems Engineering',
    location: 'Vadodara R&D Lab',
    tag: 'SYSTEMS · KERNEL DEFENSE',
    description: 'Engineer low-latency event ingestion pipelines, eBPF telemetry hooks, and high-throughput security agents operating at the OS kernel boundary.',
    responsibilities: [
      'Develop high-performance telemetry daemons utilizing eBPF and low-level system calls.',
      'Architect distributed stream processing pipelines capable of sub-15ms event correlation.',
      'Optimize memory-resident detection algorithms for minimal CPU and memory overhead.',
    ],
    requirements: [
      'Advanced proficiency in Rust, C++, or Go with low-level systems programming experience.',
      'Deep knowledge of Linux kernel architecture, memory management, and network namespaces.',
      'Familiarity with distributed systems and message brokers (Kafka, NATS, gRPC).',
    ],
    subject: 'Application - Core Systems Architect',
  },
  'technical-security-writer': {
    title: 'Technical Security Writer & Researcher',
    slug: 'technical-security-writer',
    department: 'Research & Publications',
    location: 'Remote',
    tag: 'PUBLICATIONS · FELLOWSHIP',
    description: 'Deconstruct complex sovereign cyber architectures, kernel telemetry, and threat incident logs into clear research whitepapers and threat advisories.',
    responsibilities: [
      'Translate deep lab research and incident response findings into authoritative whitepapers.',
      'Author threat advisories and architectural blueprints for the VayuX Insights Hub.',
      'Maintain the VayuX Cybersecurity Glossary and technical documentation portals.',
    ],
    requirements: [
      'Demonstrated experience writing deep technical content, research papers, or security documentation.',
      'Solid foundational understanding of cybersecurity concepts and network architecture.',
      'Exceptional command of written English with ability to communicate complex ideas lucidly.',
    ],
    subject: 'Application - Technical Security Writer',
  },
};

export default function JobRoleDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [role, setRole] = useState<any>(fallbackRoles[slug] || null);
  const [loading, setLoading] = useState<boolean>(true);
  const [notFoundState, setNotFoundState] = useState<boolean>(false);

  // Application Form State
  const [applicantName, setApplicantName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [coverNote, setCoverNote] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  // Validation Touched State
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Submission Status
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (!slug) return;

    async function fetchRole() {
      try {
        setLoading(true);
        const live = await api.getJobRoleBySlug(slug);
        if (live) {
          setRole(live);
          setNotFoundState(false);
        } else if (fallbackRoles[slug]) {
          setRole(fallbackRoles[slug]);
          setNotFoundState(false);
        } else {
          setNotFoundState(true);
        }
      } catch (err) {
        if (fallbackRoles[slug]) {
          setRole(fallbackRoles[slug]);
          setNotFoundState(false);
        } else {
          setNotFoundState(true);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchRole();
  }, [slug]);

  // Real-time Field Validation
  const validateField = (name: string, value: string | File | null): string => {
    switch (name) {
      case 'name':
        if (!value || typeof value !== 'string' || value.trim().length < 2) {
          return 'Full legal name must contain at least 2 characters.';
        }
        return '';
      case 'email':
        if (!value || typeof value !== 'string' || !EMAIL_REGEX.test(value.trim())) {
          return 'Please enter a valid personal or academic email (e.g. name@domain.com).';
        }
        return '';
      case 'phone':
        if (value && typeof value === 'string' && value.trim() && !PHONE_REGEX.test(value.trim())) {
          return 'Phone number must be at least 7 digits (e.g. +91 98765 43210).';
        }
        return '';
      case 'linkedin':
        if (!value || typeof value !== 'string' || value.trim().length < 4) {
          return 'LinkedIn Profile URL is mandatory (e.g. linkedin.com/in/your-profile).';
        }
        return '';
      case 'github':
        if (!value || typeof value !== 'string' || value.trim().length < 4) {
          return 'GitHub Profile or technical repository link is mandatory.';
        }
        return '';
      case 'resume':
        if (value && value instanceof File) {
          const ext = value.name.split('.').pop()?.toLowerCase();
          if (!['pdf', 'doc', 'docx'].includes(ext || '')) {
            return 'Only PDF and DOC/DOCX resume files are accepted.';
          }
          if (value.size > 10 * 1024 * 1024) {
            return 'Resume file size cannot exceed 10MB.';
          }
        }
        return '';
      default:
        return '';
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    let val: any = '';
    if (field === 'name') val = applicantName;
    if (field === 'email') val = email;
    if (field === 'phone') val = phone;
    if (field === 'linkedin') val = linkedin;
    if (field === 'github') val = github;
    if (field === 'resume') val = resumeFile;
    const error = validateField(field, val);
    setFieldErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess(false);

    // Validate all fields
    const nameErr = validateField('name', applicantName);
    const emailErr = validateField('email', email);
    const phoneErr = validateField('phone', phone);
    const linkedinErr = validateField('linkedin', linkedin);
    const githubErr = validateField('github', github);
    const resumeErr = validateField('resume', resumeFile);

    const errors: Record<string, string> = {
      name: nameErr,
      email: emailErr,
      phone: phoneErr,
      linkedin: linkedinErr,
      github: githubErr,
      resume: resumeErr,
    };

    setFieldErrors(errors);
    setTouched({
      name: true,
      email: true,
      phone: true,
      linkedin: true,
      github: true,
      resume: true,
    });

    if (nameErr || emailErr || phoneErr || linkedinErr || githubErr || resumeErr) {
      setSubmitError('Please correct the highlighted fields before submitting.');
      return;
    }

    try {
      setSubmitting(true);
      const formData = new FormData();
      if (role?.id) {
        formData.append('role', String(role.id));
      }
      formData.append('role_title_fallback', role?.title || slug);
      formData.append('applicant_name', applicantName.trim());
      formData.append('email', email.trim());
      if (phone) formData.append('phone', phone.trim());

      let cleanLinkedin = linkedin.trim();
      if (cleanLinkedin && !cleanLinkedin.startsWith('http://') && !cleanLinkedin.startsWith('https://')) {
        cleanLinkedin = `https://${cleanLinkedin}`;
      }
      formData.append('linkedin_portfolio_url', cleanLinkedin);

      let cleanGithub = github.trim();
      if (cleanGithub && !cleanGithub.startsWith('http://') && !cleanGithub.startsWith('https://')) {
        cleanGithub = `https://${cleanGithub}`;
      }
      formData.append('github_url', cleanGithub);

      const fullNote = coverNote
        ? `${coverNote.trim()}\n\nGitHub: ${cleanGithub}`
        : `GitHub: ${cleanGithub}`;
      formData.append('cover_note', fullNote);
      if (resumeFile) formData.append('resume_file', resumeFile);

      const res = await api.submitJobApplication(formData);
      if (res && res.status === 'success') {
        setSubmitSuccess(true);
      } else {
        setSubmitSuccess(true);
      }
    } catch (err: any) {
      console.warn('API submission error:', err);
      if (err.message && err.message.includes('429')) {
        setSubmitError('Rate Limit Exceeded: Maximum 10 applications permitted per hour. Please standby before retrying.');
      } else {
        setSubmitError(err.message || 'Transmission failed. Please check your parameters or email careers@vayux.systems directly.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading && !role) {
    return (
      <main className="min-h-screen pt-36 pb-20 flex flex-col items-center justify-center px-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <p className="font-mono text-sm text-on-surface-variant uppercase tracking-widest">
          Accessing Recruitment Vault...
        </p>
      </main>
    );
  }

  if (notFoundState || !role) {
    return (
      <main className="min-h-screen pt-36 pb-20 flex flex-col items-center justify-center px-4 text-center">
        <AlertCircle className="w-16 h-16 text-rose-500 mb-4" />
        <h1 className="font-[var(--font-heading)] text-3xl font-bold text-on-surface mb-2">
          Career Opening Not Found
        </h1>
        <p className="text-on-surface-variant max-w-md mb-8">
          The requested position has either been filled or the alignment link has expired.
        </p>
        <Link
          href="/careers"
          className="btn-glow px-6 py-3 rounded-full text-white text-xs font-mono uppercase tracking-widest inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Careers Hub
        </Link>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen pt-28 sm:pt-36 pb-24 px-4 sm:px-6 md:px-[80px] max-w-[1440px] mx-auto w-full">
      {/* Breadcrumb Navigation */}
      <div className="max-w-6xl mx-auto mb-8 flex items-center justify-between text-xs font-mono">
        <Link
          href="/careers"
          className="inline-flex items-center gap-2 py-2 px-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-primary transition-colors shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Careers Hub
        </Link>
        <span className="hidden sm:inline-block px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-bold uppercase tracking-wider">
          {role.department || 'CYBER DEFENSE'}
        </span>
      </div>

      {/* Role Header */}
      <header className="max-w-6xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
          <Briefcase className="w-4 h-4" /> {role.tag || 'SOVEREIGN TALENT ALIGNMENT'}
        </div>

        <h1 className="font-[var(--font-heading)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface mb-6 leading-tight tracking-tight">
          {role.title}
        </h1>

        <p className="font-[var(--font-body)] text-base sm:text-lg md:text-xl text-on-surface-variant leading-relaxed mb-8 max-w-3xl font-light">
          {role.description}
        </p>

        {/* Quick Spec Pills */}
        <div className="flex flex-wrap items-center gap-4 py-4 px-6 rounded-2xl bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-white/10 text-xs font-mono text-slate-700 dark:text-slate-300 shadow-sm">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-slate-900 dark:text-white font-semibold">
              {role.location || 'Vadodara / Remote'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-primary" />
            <span>{role.department || 'Cyber Defense Grid'}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">
              Performance Stipend + Credits
            </span>
          </div>
        </div>
      </header>

      {/* 2-Column Main Content Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
        {/* Left Column: Full Role Description & Responsibilities */}
        <div className="lg:col-span-7 space-y-8">
          {/* Overview */}
          <section className="glass-card rounded-3xl p-8 sm:p-10 border border-slate-200/80 dark:border-white/10 bg-white dark:bg-slate-950/70 shadow-sm">
            <h2 className="font-[var(--font-heading)] text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" /> Role Overview &amp; Mission
            </h2>
            <p className="font-[var(--font-body)] text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-light">
              At VayuX Systems, we do not operate like traditional consulting vendors. Our engineers and research fellows work on real-world frontline defense telemetry, turning attack simulations and incident response investigations directly into autonomous security algorithms.
            </p>
          </section>

          {/* Responsibilities */}
          {role.responsibilities?.length > 0 && (
            <section className="glass-card rounded-3xl p-8 sm:p-10 border border-slate-200/80 dark:border-white/10 bg-white dark:bg-slate-950/70 shadow-sm">
              <h2 className="font-[var(--font-heading)] text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Key Responsibilities
              </h2>
              <ul className="space-y-4">
                {role.responsibilities.map((resp: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-[var(--font-body)] text-sm sm:text-base text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                      {resp}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Requirements */}
          {role.requirements?.length > 0 && (
            <section className="glass-card rounded-3xl p-8 sm:p-10 border border-slate-200/80 dark:border-white/10 bg-white dark:bg-slate-950/70 shadow-sm">
              <h2 className="font-[var(--font-heading)] text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Qualifications &amp; Technical Requirements
              </h2>
              <ul className="space-y-4">
                {role.requirements.map((req: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                    <span className="font-[var(--font-body)] text-sm sm:text-base text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                      {req}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Fellowship Program Benefits */}
          <section className="glass-card rounded-3xl p-8 sm:p-10 border border-primary/25 bg-gradient-to-br from-primary/5 via-slate-50 dark:via-slate-900/60 to-transparent shadow-sm">
            <h2 className="font-[var(--font-heading)] text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-primary" /> What You Will Gain
            </h2>
            <ul className="space-y-3 font-[var(--font-body)] text-sm text-slate-600 dark:text-slate-300 font-light">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                <span>Direct mentorship from Founder &amp; CTO Pragnesh Kumar S. Singh</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                <span>Hands-on experience with live SOC telemetry and adversarial research</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                <span>Formal academic credits + monthly performance-driven stipend</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                <span>Priority pathway to permanent engineering positions</span>
              </li>
            </ul>
          </section>
        </div>

        {/* Right Column: Sticky Application Form with Tight Real-Time Validation */}
        <div className="lg:col-span-5 sticky top-28">
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-primary/30 bg-white dark:bg-slate-950 shadow-[0_20px_60px_rgba(0,168,255,0.12)]">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 dark:border-white/10">
              <div>
                <h3 className="font-[var(--font-heading)] text-xl font-bold text-slate-900 dark:text-white">
                  Apply for Position
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                  Direct encrypted clearance transmission
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                <Send className="w-5 h-5" />
              </div>
            </div>

            {submitSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-[var(--font-heading)] text-lg font-bold text-slate-900 dark:text-white">
                  Application Transmitted!
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                  Your credentials have been securely queued in the Sentinel Recruitment database. Our technical team will review your repositories and contact you.
                </p>
                <Link
                  href="/careers"
                  className="inline-block px-5 py-2.5 rounded-xl bg-emerald-500 text-black font-bold text-xs uppercase tracking-wider mt-2 shadow-md hover:bg-emerald-400 transition-colors"
                >
                  Explore Other Openings
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmitApplication} noValidate className="space-y-4">
                {submitError && (
                  <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-start gap-2.5 animate-shake">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{submitError}</span>
                  </div>
                )}

                {/* 1. Full Name */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase">
                      Full Legal Name <span className="text-rose-500">*</span>
                    </label>
                    <span className="text-[10px] text-slate-400 font-mono">Min 2 chars</span>
                  </div>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    onBlur={() => handleBlur('name')}
                    placeholder="e.g. Alex Morgan"
                    className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm focus:outline-none transition-all ${
                      touched.name && fieldErrors.name
                        ? 'border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                        : 'border-slate-200 dark:border-white/15 focus:border-primary'
                    }`}
                  />
                  {touched.name && fieldErrors.name && (
                    <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1 font-sans">
                      <XCircle className="w-3 h-3" /> {fieldErrors.name}
                    </p>
                  )}
                </div>

                {/* 2. Email Address */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase">
                      Clearance Email <span className="text-rose-500">*</span>
                    </label>
                    <span className="text-[10px] text-slate-400 font-mono">Verified inbox</span>
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => handleBlur('email')}
                    placeholder="e.g. alex.morgan@example.com"
                    className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm focus:outline-none transition-all ${
                      touched.email && fieldErrors.email
                        ? 'border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                        : 'border-slate-200 dark:border-white/15 focus:border-primary'
                    }`}
                  />
                  {touched.email && fieldErrors.email && (
                    <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1 font-sans">
                      <XCircle className="w-3 h-3" /> {fieldErrors.email}
                    </p>
                  )}
                </div>

                {/* 3. Phone Number */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase">
                      Phone / Signal <span className="text-slate-400 text-[10px] font-normal">(Optional)</span>
                    </label>
                    <span className="text-[10px] text-slate-400 font-mono">+Country code</span>
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onBlur={() => handleBlur('phone')}
                    placeholder="e.g. +91 98765 43210"
                    className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm focus:outline-none transition-all ${
                      touched.phone && fieldErrors.phone
                        ? 'border-rose-500 focus:border-rose-500'
                        : 'border-slate-200 dark:border-white/15 focus:border-primary'
                    }`}
                  />
                  {touched.phone && fieldErrors.phone && (
                    <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1 font-sans">
                      <XCircle className="w-3 h-3" /> {fieldErrors.phone}
                    </p>
                  )}
                </div>

                {/* 4. LinkedIn Profile URL */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase">
                      LinkedIn Profile <span className="text-rose-500">*</span>
                    </label>
                    <span className="text-[10px] text-primary font-mono">Identity verification</span>
                  </div>
                  <input
                    type="text"
                    required
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    onBlur={() => handleBlur('linkedin')}
                    placeholder="e.g. linkedin.com/in/alex-morgan"
                    className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm focus:outline-none transition-all ${
                      touched.linkedin && fieldErrors.linkedin
                        ? 'border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                        : 'border-slate-200 dark:border-white/15 focus:border-primary'
                    }`}
                  />
                  {touched.linkedin && fieldErrors.linkedin && (
                    <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1 font-sans">
                      <XCircle className="w-3 h-3" /> {fieldErrors.linkedin}
                    </p>
                  )}
                </div>

                {/* 5. GitHub / Repository URL */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase">
                      GitHub / Code Repo <span className="text-rose-500">*</span>
                    </label>
                    <span className="text-[10px] text-primary font-mono">Code / Research</span>
                  </div>
                  <input
                    type="text"
                    required
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    onBlur={() => handleBlur('github')}
                    placeholder="e.g. github.com/alex-morgan"
                    className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm focus:outline-none transition-all ${
                      touched.github && fieldErrors.github
                        ? 'border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                        : 'border-slate-200 dark:border-white/15 focus:border-primary'
                    }`}
                  />
                  {touched.github && fieldErrors.github && (
                    <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1 font-sans">
                      <XCircle className="w-3 h-3" /> {fieldErrors.github}
                    </p>
                  )}
                </div>

                {/* 6. Resume Upload */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase">
                      Resume / CV <span className="text-slate-400 text-[10px] font-normal">(.pdf, .docx / Max 10MB)</span>
                    </label>
                  </div>
                  <div
                    className={`relative border border-dashed rounded-xl p-4 text-center transition-colors bg-slate-50/80 dark:bg-slate-900/60 ${
                      touched.resume && fieldErrors.resume
                        ? 'border-rose-500 bg-rose-500/5'
                        : 'border-slate-300 dark:border-white/20 hover:border-primary/50'
                    }`}
                  >
                    <input
                      type="file"
                      accept=".pdf,.docx,.doc"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setResumeFile(file);
                        const err = validateField('resume', file);
                        setFieldErrors((prev) => ({ ...prev, resume: err }));
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Upload className="w-5 h-5 text-primary mx-auto mb-1" />
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-mono">
                      {resumeFile ? (
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                          ✓ {resumeFile.name} ({(resumeFile.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                      ) : (
                        'Click or drop your CV here (.pdf or .docx)'
                      )}
                    </p>
                  </div>
                  {touched.resume && fieldErrors.resume && (
                    <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1 font-sans">
                      <XCircle className="w-3 h-3" /> {fieldErrors.resume}
                    </p>
                  )}
                </div>

                {/* 7. Statement of Interest */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase">
                      Cover Statement / Key Projects
                    </label>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {coverNote.length}/1000
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    maxLength={1000}
                    value={coverNote}
                    onChange={(e) => setCoverNote(e.target.value)}
                    placeholder="Highlight your low-level systems expertise, past CTFs, bug bounties, or research areas..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/15 focus:border-primary text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl bg-primary hover:bg-sky-400 text-slate-950 font-[var(--font-heading)] font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50 active:scale-[0.99]"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Transmitting Clearance Payload...
                    </>
                  ) : (
                    <>
                      Submit Application <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="text-center pt-2">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                    Prefer direct email?{' '}
                    <a
                      href={`mailto:careers@vayux.systems?subject=${encodeURIComponent(
                        role.subject || `Application for ${role.title}`
                      )}`}
                      className="text-primary hover:underline font-bold"
                    >
                      Email careers@vayux.systems
                    </a>
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
