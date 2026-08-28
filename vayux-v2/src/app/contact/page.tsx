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
} from 'lucide-react';
import ScrollReveal from '@/components/layout/ScrollReveal';
import GlassCard from '@/components/ui/GlassCard';
import SectionHeading from '@/components/ui/SectionHeading';
import FAQ from '@/components/ui/FAQ';
import StepCard from '@/components/ui/StepCard';
import { DynamicGlobeScene } from '@/components/three/SceneLoader';
import { contactFAQ, onboardingSteps, siteConfig } from '@/lib/site-data';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    vector: '',
    tier: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-28 md:pt-36 pb-20 md:pb-32 px-5 md:px-[80px] max-w-[1440px] mx-auto w-full">
      {/* Hero Section */}
      <header className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
        <ScrollReveal>
          <h1 className="font-[var(--font-heading)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-on-surface mb-6">
            Initiate Contact
          </h1>
          <p className="font-[var(--font-body)] text-base sm:text-lg md:text-xl text-on-surface-variant leading-relaxed font-light">
            Establish a secure connection with our defense nexus. Request an elite partnership for architectural consultation, training, or advanced research collaboration.
          </p>
        </ScrollReveal>
      </header>

      {/* Main Grid: Form + Active Nodes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24 md:mb-36">
        {/* Discovery Form (8 cols) */}
        <ScrollReveal className="lg:col-span-8">
          <GlassCard className="p-8 sm:p-10 md:p-12 relative overflow-hidden" hover={false}>
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary-container/10 rounded-full blur-3xl pointer-events-none" />

            <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-on-surface mb-8 border-b border-outline-variant/20 pb-4">
              Secure Discovery Portal
            </h2>

            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-[var(--font-heading)] text-2xl font-bold text-on-surface">
                  Signal Transmitted Securely
                </h3>
                <p className="font-[var(--font-body)] text-base text-on-surface-variant max-w-md mx-auto font-light">
                  Your mission parameters have been received by the Sentinel Command. An encrypted debrief link will be routed to your clearance email within 2 operational hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="btn-outline-glass px-6 py-2.5 rounded-full text-xs font-[var(--font-heading)] uppercase tracking-wider font-semibold mt-4"
                >
                  Transmit Another Signal
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-[var(--font-heading)] text-xs uppercase tracking-wider text-on-surface-variant block font-semibold">
                      Clearance Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Designation / Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full ghost-input rounded-lg px-4 py-3 text-on-surface text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-[var(--font-heading)] text-xs uppercase tracking-wider text-on-surface-variant block font-semibold">
                      Secure Comm Link
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="email@array.nexus"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full ghost-input rounded-lg px-4 py-3 text-on-surface text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-[var(--font-heading)] text-xs uppercase tracking-wider text-on-surface-variant block font-semibold">
                      Engagement Vector
                    </label>
                    <div className="relative">
                      <select
                        required
                        value={formData.vector}
                        onChange={(e) => setFormData({ ...formData, vector: e.target.value })}
                        className="w-full ghost-input rounded-lg px-4 py-3 text-on-surface text-sm appearance-none cursor-pointer bg-transparent"
                      >
                        <option value="" disabled className="bg-surface text-on-surface">
                          Select Operational Category
                        </option>
                        <option value="consultancy" className="bg-surface text-on-surface">
                          Consultancy as a Service
                        </option>
                        <option value="training" className="bg-surface text-on-surface">
                          Corporate Training
                        </option>
                        <option value="research" className="bg-surface text-on-surface">
                          R&amp;D Collaboration
                        </option>
                        <option value="soc" className="bg-surface text-on-surface">
                          SOC Operations Engagement
                        </option>
                      </select>
                      <ChevronDown className="w-4 h-4 absolute right-4 top-4 text-on-surface-variant pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="font-[var(--font-heading)] text-xs uppercase tracking-wider text-on-surface-variant block font-semibold">
                      Consultation Tier
                    </label>
                    <div className="relative">
                      <select
                        required
                        value={formData.tier}
                        onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                        className="w-full ghost-input rounded-lg px-4 py-3 text-on-surface text-sm appearance-none cursor-pointer bg-transparent"
                      >
                        <option value="" disabled className="bg-surface text-on-surface">
                          Select Tier
                        </option>
                        <option value="standard" className="bg-surface text-on-surface">
                          Standard Analysis
                        </option>
                        <option value="advanced" className="bg-surface text-on-surface">
                          Advanced Architecture
                        </option>
                        <option value="elite" className="bg-surface text-on-surface">
                          Elite Strategic Defense
                        </option>
                      </select>
                      <ChevronDown className="w-4 h-4 absolute right-4 top-4 text-on-surface-variant pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-[var(--font-heading)] text-xs uppercase tracking-wider text-on-surface-variant block font-semibold">
                    Mission Parameters
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Detail your security requirements, architecture constraints, or threat profile..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full ghost-input rounded-lg px-4 py-3 text-on-surface text-sm resize-none"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="btn-primary-gradient text-on-primary font-[var(--font-heading)] text-xs uppercase tracking-widest px-8 py-4 rounded-lg flex items-center gap-2 font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow"
                  >
                    Transmit Signal <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </GlassCard>
        </ScrollReveal>

        {/* Active Nodes Column (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Direct Channels */}
          <ScrollReveal delay={0.1}>
            <GlassCard className="p-8" hover={false}>
              <h3 className="font-[var(--font-heading)] text-xl font-bold text-on-surface mb-6 flex items-center gap-2">
                <Radio className="w-5 h-5 text-primary" /> Active Nodes
              </h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4 group cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-primary group-hover:bg-primary-container group-hover:text-on-primary transition-colors flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-[var(--font-heading)] text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold mb-1">
                      Encrypted Mail
                    </p>
                    <p className="text-sm text-on-surface font-medium">{siteConfig.email}</p>
                  </div>
                </li>

                <li className="flex items-start gap-4 group cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-primary group-hover:bg-primary-container group-hover:text-on-primary transition-colors flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-[var(--font-heading)] text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold mb-1">
                      Priority Line
                    </p>
                    <p className="text-sm text-on-surface font-medium">{siteConfig.phone}</p>
                  </div>
                </li>

                <li className="flex items-start gap-4 group cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-primary group-hover:bg-primary-container group-hover:text-on-primary transition-colors flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-[var(--font-heading)] text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold mb-1">
                      Global Command
                    </p>
                    <p className="text-sm text-on-surface font-medium leading-tight whitespace-pre-line">
                      {siteConfig.address}
                    </p>
                  </div>
                </li>
              </ul>
            </GlassCard>
          </ScrollReveal>

          {/* Target Coordinates Map Widget */}
          <ScrollReveal delay={0.2}>
            <GlassCard className="p-6 overflow-hidden relative" hover={true}>
              <div className="w-full h-36 bg-gradient-to-br from-surface-container-high to-surface-container-lowest rounded-xl flex items-center justify-center relative border border-outline-variant/30 overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#00a8ff_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="z-10 bg-surface/90 backdrop-blur-sm px-4 py-2 rounded-full border border-outline-variant/30 flex items-center gap-2 text-primary font-[var(--font-heading)] text-xs font-semibold shadow-sm">
                  <MapPin className="w-3.5 h-3.5" /> Target Coordinates Acquired
                </div>
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </div>

      {/* Secure Onboarding Process */}
      <section className="mb-24 md:mb-36">
        <SectionHeading
          center
          title="Secure Onboarding Process"
          subtitle="Four disciplined phases to operational deployment and unassailable protection."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          <div className="hidden lg:block absolute top-1/2 left-10 right-10 h-0.5 bg-outline-variant/30 -z-10 -translate-y-6" />
          {onboardingSteps.map((step, idx) => (
            <ScrollReveal key={step.number} delay={idx * 0.1}>
              <StepCard
                number={step.number}
                title={step.title}
                description={step.description}
              />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Global Node Infrastructure (3D Globe Scene) */}
      <section className="mb-24 md:mb-36">
        <SectionHeading
          center
          title="Global Node Infrastructure"
          subtitle="Real-time telemetry and defensive response nodes distributed across sovereign enclaves."
        />

        <ScrollReveal>
          <div className="glass-card rounded-2xl overflow-hidden relative p-4 sm:p-8 bg-surface/70">
            <DynamicGlobeScene className="h-[400px] sm:h-[480px]" />
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
              <div className="bg-surface/90 backdrop-blur-md px-6 py-3 rounded-full border border-outline-variant/30 flex items-center gap-2 text-primary font-[var(--font-heading)] text-xs uppercase tracking-wider font-semibold shadow-xl">
                <Globe2 className="w-4 h-4" /> Access 14 Global Operating Centers
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Service Engagement FAQ */}
      <section className="max-w-4xl mx-auto mb-16">
        <SectionHeading
          center
          title="Service Engagement FAQ"
          subtitle="Clarifying our tactical onboarding parameters."
        />
        <ScrollReveal>
          <FAQ items={contactFAQ} />
        </ScrollReveal>
      </section>
    </div>
  );
}
