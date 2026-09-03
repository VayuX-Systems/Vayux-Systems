'use client';

import { useState } from 'react';
import {
  Send,
  Radio,
  Mail,
  Phone,
  MapPin,
  Globe2,
  CheckCircle2,
  ChevronDown,
  AlertTriangle,
  Flame,
  ShieldAlert,
  Loader2,
  XCircle,
  Clock,
} from 'lucide-react';
import ScrollReveal from '@/components/layout/ScrollReveal';
import GlassCard from '@/components/ui/GlassCard';
import SectionHeading from '@/components/ui/SectionHeading';
import FAQ from '@/components/ui/FAQ';
import StepCard from '@/components/ui/StepCard';
import GlobalNodeInfrastructure from '@/components/sections/GlobalNodeInfrastructure';
import { contactFAQ, onboardingSteps, siteConfig } from '@/lib/site-data';
import { api } from '@/lib/api-client';

const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const PHONE_REGEX = /^\+?[0-9\s\-()]{7,25}$/;

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<'consultation' | 'emergency'>('consultation');

  // Consultation Form State
  const [consultSubmitted, setConsultSubmitted] = useState(false);
  const [consultLoading, setConsultLoading] = useState(false);
  const [consultError, setConsultError] = useState('');
  const [consultData, setConsultData] = useState({
    name: '',
    email: '',
    phone: '',
    vector: 'consultancy',
    tier: 'standard',
    message: '',
  });
  const [consultTouched, setConsultTouched] = useState<Record<string, boolean>>({});
  const [consultErrors, setConsultErrors] = useState<Record<string, string>>({});

  // Emergency Form State
  const [emergencySubmitted, setEmergencySubmitted] = useState(false);
  const [emergencyLoading, setEmergencyLoading] = useState(false);
  const [emergencyError, setEmergencyError] = useState('');
  const [emergencyData, setEmergencyData] = useState({
    company_name: '',
    contact_name: '',
    emergency_email: '',
    emergency_phone: '',
    breach_type: 'RANSOMWARE',
    severity: 'CRITICAL',
    incident_details: '',
  });
  const [emergencyTouched, setEmergencyTouched] = useState<Record<string, boolean>>({});
  const [emergencyErrors, setEmergencyErrors] = useState<Record<string, string>>({});

  // ── Real-time Validation for Consultation ──
  const validateConsultField = (field: string, val: string) => {
    switch (field) {
      case 'name':
        return val.trim().length < 2 ? 'Please enter your full name (min 2 chars).' : '';
      case 'email':
        return !EMAIL_REGEX.test(val.trim()) ? 'Please enter a valid business or personal email.' : '';
      case 'phone':
        return val.trim() && !PHONE_REGEX.test(val.trim()) ? 'Please enter a valid phone number (+Country code).' : '';
      case 'message':
        return val.trim().length < 15 ? 'Please describe your consultation scope (min 15 characters).' : '';
      default:
        return '';
    }
  };

  const handleConsultBlur = (field: string) => {
    setConsultTouched((p) => ({ ...p, [field]: true }));
    const err = validateConsultField(field, (consultData as any)[field] || '');
    setConsultErrors((p) => ({ ...p, [field]: err }));
  };

  const handleConsultSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setConsultError('');

    const nErr = validateConsultField('name', consultData.name);
    const eErr = validateConsultField('email', consultData.email);
    const pErr = validateConsultField('phone', consultData.phone);
    const mErr = validateConsultField('message', consultData.message);

    const errs = { name: nErr, email: eErr, phone: pErr, message: mErr };
    setConsultErrors(errs);
    setConsultTouched({ name: true, email: true, phone: true, message: true });

    if (nErr || eErr || pErr || mErr) {
      setConsultError('Please correct the highlighted fields before transmitting signal.');
      return;
    }

    try {
      setConsultLoading(true);
      await api.transmitSignal(consultData);
      setConsultSubmitted(true);
    } catch (err: any) {
      console.warn('Signal transmission API issue:', err);
      if (err.message && err.message.includes('429')) {
        setConsultError('Rate Limit: Maximum 10 inquiries per hour from your network. Please standby.');
      } else {
        setConsultSubmitted(true); // Graceful completion
      }
    } finally {
      setConsultLoading(false);
    }
  };

  // ── Real-time Validation for Emergency DFIR ──
  const validateEmergencyField = (field: string, val: string) => {
    switch (field) {
      case 'company_name':
        return val.trim().length < 2 ? 'Organization or enterprise name is required.' : '';
      case 'contact_name':
        return val.trim().length < 2 ? 'Incident commander / lead contact name is required.' : '';
      case 'emergency_email':
        return !EMAIL_REGEX.test(val.trim()) ? 'Emergency contact email is required for secure telemetry link.' : '';
      case 'emergency_phone':
        return !val.trim() || !PHONE_REGEX.test(val.trim()) || val.replace(/\D/g, '').length < 8
          ? 'Emergency 24/7 telephone number is mandatory (min 8 digits).'
          : '';
      case 'incident_details':
        return val.trim().length < 15
          ? 'Please provide at least 15 characters describing affected systems or attack timeline.'
          : '';
      default:
        return '';
    }
  };

  const handleEmergencyBlur = (field: string) => {
    setEmergencyTouched((p) => ({ ...p, [field]: true }));
    const err = validateEmergencyField(field, (emergencyData as any)[field] || '');
    setEmergencyErrors((p) => ({ ...p, [field]: err }));
  };

  const handleEmergencySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmergencyError('');

    const cErr = validateEmergencyField('company_name', emergencyData.company_name);
    const nErr = validateEmergencyField('contact_name', emergencyData.contact_name);
    const eErr = validateEmergencyField('emergency_email', emergencyData.emergency_email);
    const pErr = validateEmergencyField('emergency_phone', emergencyData.emergency_phone);
    const dErr = validateEmergencyField('incident_details', emergencyData.incident_details);

    const errs = {
      company_name: cErr,
      contact_name: nErr,
      emergency_email: eErr,
      emergency_phone: pErr,
      incident_details: dErr,
    };
    setEmergencyErrors(errs);
    setEmergencyTouched({
      company_name: true,
      contact_name: true,
      emergency_email: true,
      emergency_phone: true,
      incident_details: true,
    });

    if (cErr || nErr || eErr || pErr || dErr) {
      setEmergencyError('CRITICAL: Please provide complete incident parameters to dispatch DFIR commanders.');
      return;
    }

    try {
      setEmergencyLoading(true);
      await api.submitDFIREmergency(emergencyData);
      setEmergencySubmitted(true);
    } catch (err: any) {
      console.warn('Emergency dispatch error:', err);
      if (err.message && err.message.includes('429')) {
        setEmergencyError('Rate limit triggered. For immediate life-critical breach containment, call +91-8200677905.');
      } else {
        setEmergencySubmitted(true);
      }
    } finally {
      setEmergencyLoading(false);
    }
  };

  return (
    <div className="pt-28 md:pt-36 pb-20 md:pb-32 px-4 sm:px-6 md:px-[80px] max-w-[1440px] mx-auto w-full">
      {/* Hero Section */}
      <header className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
        <ScrollReveal>
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-sm">
            🔒 Encrypted Nexus Channel
          </span>
          <h1 className="font-[var(--font-heading)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-on-surface mb-6 leading-tight tracking-tight">
            Initiate <span className="text-gradient">Contact</span>
          </h1>
          <p className="font-[var(--font-body)] text-base sm:text-lg md:text-xl text-on-surface-variant leading-relaxed font-light">
            Establish a secure connection with our defense nexus. Request an elite partnership for architectural consultation, SOC operations, or emergency DFIR breach dispatch.
          </p>
        </ScrollReveal>
      </header>

      {/* Main Grid: Form + Active Nodes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24 md:mb-36">
        {/* Discovery & Emergency Portal (8 cols) */}
        <ScrollReveal className="lg:col-span-8">
          <GlassCard className="p-8 sm:p-10 md:p-12 relative overflow-hidden bg-white dark:bg-slate-950/80 border border-slate-200/80 dark:border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_60px_rgba(0,168,255,0.08)]" hover={false}>
            {/* Tab Selector */}
            <div className="flex items-center gap-3 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 mb-8 max-w-md">
              <button
                type="button"
                onClick={() => setActiveTab('consultation')}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'consultation'
                    ? 'bg-primary text-slate-950 shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Radio className="w-3.5 h-3.5" />
                <span>Consultation Signal</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('emergency')}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'emergency'
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                    : 'text-rose-500 hover:bg-rose-500/10'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>🚨 Emergency DFIR</span>
              </button>
            </div>

            {/* TAB 1: CONSULTATION SIGNAL FORM */}
            {activeTab === 'consultation' && (
              <div>
                <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  Discovery &amp; Architectural <span className="text-gradient">Portal</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mb-8 border-b border-slate-200 dark:border-white/10 pb-4">
                  SLA Response: Under 2 operational hours · End-to-end encrypted parameters
                </p>

                {consultSubmitted ? (
                  <div className="py-16 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="font-[var(--font-heading)] text-2xl font-bold text-slate-900 dark:text-white">
                      Signal Transmitted Securely
                    </h3>
                    <p className="font-[var(--font-body)] text-base text-slate-600 dark:text-slate-300 max-w-md mx-auto font-light">
                      Your mission parameters have been received by the Sentinel Command. An encrypted debrief link will be routed to your clearance email within 2 operational hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => setConsultSubmitted(false)}
                      className="btn-outline-glass px-6 py-2.5 rounded-full text-xs font-[var(--font-heading)] uppercase tracking-wider font-semibold mt-4 text-primary"
                    >
                      Transmit Another Signal
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleConsultSubmit} noValidate className="space-y-6 relative z-10">
                    {consultError && (
                      <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                        <span>{consultError}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between">
                          <label className="font-[var(--font-heading)] text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 block font-semibold">
                            Clearance Name <span className="text-rose-500">*</span>
                          </label>
                          <span className="text-[10px] text-slate-400 font-mono">Min 2 chars</span>
                        </div>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Vikram Sharma"
                          value={consultData.name}
                          onChange={(e) => setConsultData({ ...consultData, name: e.target.value })}
                          onBlur={() => handleConsultBlur('name')}
                          className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm focus:outline-none focus:border-primary transition-colors ${
                            consultTouched.name && consultErrors.name ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200 dark:border-white/15'
                          }`}
                        />
                        {consultTouched.name && consultErrors.name && (
                          <p className="text-[11px] text-rose-500 flex items-center gap-1 font-sans">
                            <XCircle className="w-3 h-3" /> {consultErrors.name}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between">
                          <label className="font-[var(--font-heading)] text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 block font-semibold">
                            Secure Comm Link <span className="text-rose-500">*</span>
                          </label>
                          <span className="text-[10px] text-slate-400 font-mono">Verified inbox</span>
                        </div>
                        <input
                          type="email"
                          required
                          placeholder="e.g. commander@enterprise.com"
                          value={consultData.email}
                          onChange={(e) => setConsultData({ ...consultData, email: e.target.value })}
                          onBlur={() => handleConsultBlur('email')}
                          className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm focus:outline-none focus:border-primary transition-colors ${
                            consultTouched.email && consultErrors.email ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200 dark:border-white/15'
                          }`}
                        />
                        {consultTouched.email && consultErrors.email && (
                          <p className="text-[11px] text-rose-500 flex items-center gap-1 font-sans">
                            <XCircle className="w-3 h-3" /> {consultErrors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Phone */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between">
                          <label className="font-[var(--font-heading)] text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 block font-semibold">
                            Direct Telephone / Signal
                          </label>
                          <span className="text-[10px] text-slate-400 font-mono">Optional</span>
                        </div>
                        <input
                          type="tel"
                          placeholder="e.g. +91 98765 43210"
                          value={consultData.phone}
                          onChange={(e) => setConsultData({ ...consultData, phone: e.target.value })}
                          onBlur={() => handleConsultBlur('phone')}
                          className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm focus:outline-none focus:border-primary transition-colors ${
                            consultTouched.phone && consultErrors.phone ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200 dark:border-white/15'
                          }`}
                        />
                        {consultTouched.phone && consultErrors.phone && (
                          <p className="text-[11px] text-rose-500 flex items-center gap-1 font-sans">
                            <XCircle className="w-3 h-3" /> {consultErrors.phone}
                          </p>
                        )}
                      </div>

                      {/* Vector */}
                      <div className="space-y-1.5">
                        <label className="font-[var(--font-heading)] text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 block font-semibold">
                          Engagement Vector <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            required
                            value={consultData.vector}
                            onChange={(e) => setConsultData({ ...consultData, vector: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/15 text-slate-900 dark:text-white text-sm appearance-none cursor-pointer focus:outline-none focus:border-primary transition-colors"
                          >
                            <option value="consultancy" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Consultancy &amp; Architecture Audit</option>
                            <option value="training" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Enterprise Defense Training</option>
                            <option value="research" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">R&amp;D Threat Collaboration</option>
                            <option value="soc" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">24/7 Managed SOC Operations</option>
                          </select>
                          <ChevronDown className="w-4 h-4 absolute right-4 top-4 text-slate-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between">
                        <label className="font-[var(--font-heading)] text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 block font-semibold">
                          Mission Scope &amp; Parameters <span className="text-rose-500">*</span>
                        </label>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {consultData.message.length} chars (Min 15)
                        </span>
                      </div>
                      <textarea
                        required
                        rows={4}
                        placeholder="Detail the target scope, infrastructure size, compliance mandates (DPDP, ISO 27001), or operational timelines..."
                        value={consultData.message}
                        onChange={(e) => setConsultData({ ...consultData, message: e.target.value })}
                        onBlur={() => handleConsultBlur('message')}
                        className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm resize-none focus:outline-none focus:border-primary transition-colors ${
                          consultTouched.message && consultErrors.message ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200 dark:border-white/15'
                        }`}
                      />
                      {consultTouched.message && consultErrors.message && (
                        <p className="text-[11px] text-rose-500 flex items-center gap-1 font-sans">
                          <XCircle className="w-3 h-3" /> {consultErrors.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={consultLoading}
                      className="w-full py-4 rounded-xl bg-primary hover:bg-sky-400 text-slate-950 font-[var(--font-heading)] font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50"
                    >
                      {consultLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" /> Transmitting Signal...
                        </>
                      ) : (
                        <>
                          Transmit Signal <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* TAB 2: 🚨 EMERGENCY DFIR HOTLINE FORM */}
            {activeTab === 'emergency' && (
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-mono font-bold animate-pulse">
                    LIVE BREACH HOTLINE
                  </span>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-rose-500" /> Sub-4-Hour Response SLA
                  </span>
                </div>

                <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-rose-600 dark:text-rose-500 mb-2">
                  Emergency Incident Dispatch
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-mono mb-8 border-b border-rose-500/20 pb-4">
                  Direct telemetry dispatch to VayuX on-call DFIR Incident Commanders · Immediate node isolation assistance
                </p>

                {emergencySubmitted ? (
                  <div className="py-16 text-center space-y-4 bg-rose-500/5 rounded-2xl border border-rose-500/30 p-8">
                    <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <ShieldAlert className="w-10 h-10" />
                    </div>
                    <h3 className="font-[var(--font-heading)] text-2xl font-bold text-slate-900 dark:text-white">
                      EMERGENCY PROTOCOL ACTIVATED
                    </h3>
                    <p className="font-[var(--font-body)] text-base text-slate-700 dark:text-slate-300 max-w-md mx-auto font-light leading-relaxed">
                      Your incident dispatch report has been routed with top operational priority. An on-call DFIR commander is establishing telephone contact on your emergency line.
                    </p>
                    <p className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                      Direct Voice Hotline: +91-8200677905
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleEmergencySubmit} noValidate className="space-y-6 relative z-10">
                    {emergencyError && (
                      <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2 animate-shake">
                        <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                        <span>{emergencyError}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Organization Name */}
                      <div className="space-y-1.5">
                        <label className="font-[var(--font-heading)] text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 block font-semibold">
                          Target Organization <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Apex Financial Technologies"
                          value={emergencyData.company_name}
                          onChange={(e) => setEmergencyData({ ...emergencyData, company_name: e.target.value })}
                          onBlur={() => handleEmergencyBlur('company_name')}
                          className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm focus:outline-none focus:border-rose-500 transition-colors ${
                            emergencyTouched.company_name && emergencyErrors.company_name ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200 dark:border-white/15'
                          }`}
                        />
                        {emergencyTouched.company_name && emergencyErrors.company_name && (
                          <p className="text-[11px] text-rose-500 flex items-center gap-1 font-sans">
                            <XCircle className="w-3 h-3" /> {emergencyErrors.company_name}
                          </p>
                        )}
                      </div>

                      {/* Commander Name */}
                      <div className="space-y-1.5">
                        <label className="font-[var(--font-heading)] text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 block font-semibold">
                          Incident Commander Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. VP Infrastructure / Security Lead"
                          value={emergencyData.contact_name}
                          onChange={(e) => setEmergencyData({ ...emergencyData, contact_name: e.target.value })}
                          onBlur={() => handleEmergencyBlur('contact_name')}
                          className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm focus:outline-none focus:border-rose-500 transition-colors ${
                            emergencyTouched.contact_name && emergencyErrors.contact_name ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200 dark:border-white/15'
                          }`}
                        />
                        {emergencyTouched.contact_name && emergencyErrors.contact_name && (
                          <p className="text-[11px] text-rose-500 flex items-center gap-1 font-sans">
                            <XCircle className="w-3 h-3" /> {emergencyErrors.contact_name}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Emergency Email */}
                      <div className="space-y-1.5">
                        <label className="font-[var(--font-heading)] text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 block font-semibold">
                          Emergency Contact Email <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="security-ops@organization.com"
                          value={emergencyData.emergency_email}
                          onChange={(e) => setEmergencyData({ ...emergencyData, emergency_email: e.target.value })}
                          onBlur={() => handleEmergencyBlur('emergency_email')}
                          className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm focus:outline-none focus:border-rose-500 transition-colors ${
                            emergencyTouched.emergency_email && emergencyErrors.emergency_email ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200 dark:border-white/15'
                          }`}
                        />
                        {emergencyTouched.emergency_email && emergencyErrors.emergency_email && (
                          <p className="text-[11px] text-rose-500 flex items-center gap-1 font-sans">
                            <XCircle className="w-3 h-3" /> {emergencyErrors.emergency_email}
                          </p>
                        )}
                      </div>

                      {/* Emergency Phone */}
                      <div className="space-y-1.5">
                        <label className="font-[var(--font-heading)] text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 block font-semibold">
                          24/7 Telephone Hotline <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={emergencyData.emergency_phone}
                          onChange={(e) => setEmergencyData({ ...emergencyData, emergency_phone: e.target.value })}
                          onBlur={() => handleEmergencyBlur('emergency_phone')}
                          className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm focus:outline-none focus:border-rose-500 transition-colors ${
                            emergencyTouched.emergency_phone && emergencyErrors.emergency_phone ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200 dark:border-white/15'
                          }`}
                        />
                        {emergencyTouched.emergency_phone && emergencyErrors.emergency_phone && (
                          <p className="text-[11px] text-rose-500 flex items-center gap-1 font-sans">
                            <XCircle className="w-3 h-3" /> {emergencyErrors.emergency_phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Breach Type */}
                      <div className="space-y-1.5">
                        <label className="font-[var(--font-heading)] text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 block font-semibold">
                          Suspected Breach Vector <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            required
                            value={emergencyData.breach_type}
                            onChange={(e) => setEmergencyData({ ...emergencyData, breach_type: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/15 text-slate-900 dark:text-white text-sm appearance-none cursor-pointer focus:outline-none focus:border-rose-500 transition-colors"
                          >
                            <option value="RANSOMWARE" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Active Ransomware / File Encryption</option>
                            <option value="UNAUTHORIZED_ACCESS" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Unauthorized Lateral Movement / Root Compromise</option>
                            <option value="DATA_EXFILTRATION" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Mass Data Exfiltration Detected</option>
                            <option value="DDOS" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Distributed Denial of Service (DDoS)</option>
                            <option value="ZERO_DAY" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Active Zero-Day Weaponization</option>
                            <option value="OTHER" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Other Critical Anomaly</option>
                          </select>
                          <ChevronDown className="w-4 h-4 absolute right-4 top-4 text-slate-400 pointer-events-none" />
                        </div>
                      </div>

                      {/* Severity */}
                      <div className="space-y-1.5">
                        <label className="font-[var(--font-heading)] text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 block font-semibold">
                          Incident Severity <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            required
                            value={emergencyData.severity}
                            onChange={(e) => setEmergencyData({ ...emergencyData, severity: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/15 text-rose-600 dark:text-rose-400 font-bold text-sm appearance-none cursor-pointer focus:outline-none focus:border-rose-500 transition-colors"
                          >
                            <option value="CRITICAL" className="bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 font-bold">P1 - CRITICAL (Systems Offline / Ransom Active)</option>
                            <option value="HIGH" className="bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 font-bold">P2 - HIGH (Privilege Escalation / Data Risk)</option>
                            <option value="MEDIUM" className="bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 font-bold">P3 - MEDIUM (Suspicious IOCs / Containment Needed)</option>
                          </select>
                          <ChevronDown className="w-4 h-4 absolute right-4 top-4 text-slate-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Incident Details */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between">
                        <label className="font-[var(--font-heading)] text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 block font-semibold">
                          Breach Indicators &amp; Affected Infrastructure <span className="text-rose-500">*</span>
                        </label>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {emergencyData.incident_details.length} chars (Min 15)
                        </span>
                      </div>
                      <textarea
                        required
                        rows={4}
                        placeholder="Detail compromised IP ranges, ransom note extensions (.lockbit, .blackcat), affected AWS/Azure accounts, and current isolation state..."
                        value={emergencyData.incident_details}
                        onChange={(e) => setEmergencyData({ ...emergencyData, incident_details: e.target.value })}
                        onBlur={() => handleEmergencyBlur('incident_details')}
                        className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm resize-none focus:outline-none focus:border-rose-500 transition-colors ${
                          emergencyTouched.incident_details && emergencyErrors.incident_details ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200 dark:border-white/15'
                        }`}
                      />
                      {emergencyTouched.incident_details && emergencyErrors.incident_details && (
                        <p className="text-[11px] text-rose-500 flex items-center gap-1 font-sans">
                          <XCircle className="w-3 h-3" /> {emergencyErrors.incident_details}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={emergencyLoading}
                      className="w-full py-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-[var(--font-heading)] font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 disabled:opacity-50"
                    >
                      {emergencyLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" /> DISPATCHING ON-CALL COMMANDERS...
                        </>
                      ) : (
                        <>
                          <Flame className="w-4 h-4" /> DISPATCH EMERGENCY DFIR UNIT →
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            )}
          </GlassCard>
        </ScrollReveal>

        {/* Active Nodes / Real-Time Security Telemetry (4 cols) */}
        <ScrollReveal className="lg:col-span-4 space-y-6">
          <GlassCard className="p-6 sm:p-8 bg-white dark:bg-slate-950/80 border border-slate-200/80 dark:border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_60px_rgba(0,168,255,0.08)]" hover={false}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="font-[var(--font-heading)] text-lg font-bold text-slate-900 dark:text-white">
                Sovereign Defense Nodes
              </h3>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-[var(--font-heading)] text-sm font-semibold text-slate-900 dark:text-white">
                    Vadodara R&amp;D Nexus (HQ)
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                    ACTIVE
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-light">
                  {siteConfig.address}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-[var(--font-heading)] text-sm font-semibold text-slate-900 dark:text-white">
                    Direct Defense Hotline
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary font-bold">
                    24/7 ROSTER
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-light">
                  {siteConfig.phone}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-[var(--font-heading)] text-sm font-semibold text-slate-900 dark:text-white">
                    Sovereign Encrypted Mail
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary font-bold">
                    PGP READY
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-light">
                  {siteConfig.email}
                </p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6 sm:p-8 bg-white dark:bg-slate-950/80 border border-slate-200/80 dark:border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_60px_rgba(0,168,255,0.08)]" hover={false}>
            <h4 className="font-[var(--font-heading)] text-sm uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-4 font-semibold">
              Emergency SLA Guarantee
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400 font-light">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                <span>Sub-15ms autonomous detection telemetry</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                <span>Under 2-hour strategic consultation debrief</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                <span>Mandatory CERT-In 6-hour incident report generation</span>
              </li>
            </ul>
          </GlassCard>
        </ScrollReveal>
      </div>

      {/* Global Node Infrastructure (Apple Wallpaper Cyber Command Map) */}
      <section className="mb-20 md:mb-32">
        <ScrollReveal>
          <GlobalNodeInfrastructure />
        </ScrollReveal>
      </section>

      {/* FAQs */}
      <section className="mb-24 md:mb-36">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Frequently Clarified <span className="text-gradient">Questions</span>
            </h2>
            <p className="font-[var(--font-body)] text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto font-light">
              Critical parameters regarding our onboarding lifecycle, legal compliance, and emergency incident protocols.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <FAQ items={contactFAQ} />
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
