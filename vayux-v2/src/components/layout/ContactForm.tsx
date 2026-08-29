'use client';

import { useState } from 'react';
import { Mail, Phone, Building2, Briefcase, Send, AlertCircle, CheckCircle } from 'lucide-react';
import { contactFormData } from '@/lib/site-data-enhanced';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  message: string;
}

interface FormStatus {
  state: 'idle' | 'submitting' | 'success' | 'error';
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    industry: '',
    message: '',
  });

  const [status, setStatus] = useState<FormStatus>({ state: 'idle' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ state: 'submitting' });

    try {
      // Validate form
      if (!formData.fullName || !formData.email || !formData.industry || !formData.message) {
        setStatus({
          state: 'error',
          message: 'Please fill in all required fields.',
        });
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setStatus({
          state: 'error',
          message: 'Please enter a valid email address.',
        });
        return;
      }

      // TODO: Integrate with backend API (e.g., Vercel Functions, SendGrid, or custom endpoint)
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Success
      setStatus({
        state: 'success',
        message: 'Signal transmitted successfully. Our team will contact you within 24 hours.',
      });

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        industry: '',
        message: '',
      });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setStatus({ state: 'idle' });
      }, 5000);
    } catch (error) {
      setStatus({
        state: 'error',
        message: 'Network error. Please try again.',
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
      {/* Left Column: Information */}
      <div className="space-y-8">
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wide mb-6">
            🔒 Direct Connection Secure
          </span>
          <h2 className="font-[var(--font-heading)] text-4xl md:text-5xl font-bold text-on-surface mb-6 leading-tight">
            Initiate Your <br />
            <span className="text-gradient">Security Mapping</span>
          </h2>
          <p className="font-[var(--font-body)] text-lg text-on-surface-variant leading-relaxed mb-8">
            Request a comprehensive, zero-cost architecture diagnostic. We will review your perimeter exposures and map a modern, AI-driven protection scheme for your network.
          </p>
        </div>

        {/* Benefits */}
        <div className="space-y-4">
          {contactFormData.benefits.map((benefit, idx) => {
            const iconClass = `w-6 h-6 text-primary`;
            return (
              <div key={idx} className="flex gap-4 p-4 rounded-xl bg-surface-container/50 border border-outline-variant/20 hover:border-primary/30 transition-all">
                <div className="flex-shrink-0">
                  {benefit.icon === 'ShieldAlert' && <AlertCircle className={iconClass} />}
                  {benefit.icon === 'Server' && <Building2 className={iconClass} />}
                  {benefit.icon === 'Lock' && <Phone className={iconClass} />}
                </div>
                <div>
                  <h3 className="font-[var(--font-heading)] font-bold text-on-surface text-sm mb-1">
                    {benefit.title}
                  </h3>
                  <p className="font-[var(--font-body)] text-sm text-on-surface-variant">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Info */}
        <div className="pt-6 border-t border-outline-variant/20">
          <p className="font-[var(--font-heading)] text-xs uppercase tracking-wider text-on-surface-variant mb-4 font-semibold">
            Direct Contact
          </p>
          <div className="space-y-3">
            <a href="mailto:nexus@vayux.systems" className="flex items-center gap-3 text-on-surface hover:text-primary transition-colors">
              <Mail className="w-4 h-4 text-primary" />
              <span className="font-[var(--font-body)] text-sm">nexus@vayux.systems</span>
            </a>
            <a href="tel:+91-8200677905" className="flex items-center gap-3 text-on-surface hover:text-primary transition-colors">
              <Phone className="w-4 h-4 text-primary" />
              <span className="font-[var(--font-body)] text-sm">+91-8200677905 (Incident Response)</span>
            </a>
            <div className="flex items-center gap-3 text-on-surface">
              <Building2 className="w-4 h-4 text-primary" />
              <span className="font-[var(--font-body)] text-sm">Vadodara, Gujarat (HQ) + Pan-India</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Form */}
      <div className="glass-card rounded-3xl p-8 md:p-10 border border-white/80">
        {status.state === 'success' ? (
          <div className="text-center py-12 space-y-4">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <h3 className="font-[var(--font-heading)] text-2xl font-bold text-on-surface">
              Signal Transmitted
            </h3>
            <p className="font-[var(--font-body)] text-on-surface-variant">
              Thank you for reaching out. A VayuX systems engineer will contact you within 24 hours to schedule your domestic perimeter diagnostic.
            </p>
            <button
              onClick={() => setStatus({ state: 'idle' })}
              className="btn-glow px-6 py-2.5 rounded-full text-on-primary font-[var(--font-heading)] tracking-widest uppercase text-xs w-full mt-6"
            >
              Transmit Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block font-[var(--font-heading)] text-xs uppercase tracking-wide text-on-surface font-semibold mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                required
                disabled={status.state === 'submitting'}
                className="w-full px-4 py-3 bg-surface-container rounded-lg border border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-50"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block font-[var(--font-heading)] text-xs uppercase tracking-wide text-on-surface font-semibold mb-2">
                Business Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@company.in"
                required
                disabled={status.state === 'submitting'}
                className="w-full px-4 py-3 bg-surface-container rounded-lg border border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-50"
              />
            </div>

            {/* Phone & Company */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block font-[var(--font-heading)] text-xs uppercase tracking-wide text-on-surface font-semibold mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91"
                  disabled={status.state === 'submitting'}
                  className="w-full px-4 py-3 bg-surface-container rounded-lg border border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-50"
                />
              </div>
              <div>
                <label htmlFor="company" className="block font-[var(--font-heading)] text-xs uppercase tracking-wide text-on-surface font-semibold mb-2">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company name"
                  disabled={status.state === 'submitting'}
                  className="w-full px-4 py-3 bg-surface-container rounded-lg border border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-50"
                />
              </div>
            </div>

            {/* Industry */}
            <div>
              <label htmlFor="industry" className="block font-[var(--font-heading)] text-xs uppercase tracking-wide text-on-surface font-semibold mb-2">
                Industry Focus *
              </label>
              <select
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                required
                disabled={status.state === 'submitting'}
                className="w-full px-4 py-3 bg-surface-container rounded-lg border border-outline-variant/30 text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-50"
              >
                <option value="">Select Industry</option>
                {contactFormData.industries.map(industry => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block font-[var(--font-heading)] text-xs uppercase tracking-wide text-on-surface font-semibold mb-2">
                What perimeter threats are you trying to mitigate? *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your environment or compliance goals (e.g. DPDP Act, CERT-In)"
                required
                disabled={status.state === 'submitting'}
                rows={4}
                className="w-full px-4 py-3 bg-surface-container rounded-lg border border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-50 resize-none"
              />
            </div>

            {/* Error Alert */}
            {status.state === 'error' && (
              <div className="flex gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="font-[var(--font-body)] text-sm text-red-700">
                  {status.message}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status.state === 'submitting'}
              className="w-full btn-glow px-6 py-3 rounded-full text-on-primary font-[var(--font-heading)] tracking-widest uppercase text-xs flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Send className="w-4 h-4" />
              {status.state === 'submitting' ? 'Transmitting Signal...' : 'Request Free Diagnostic'}
            </button>

            {/* Privacy Notice */}
            <p className="font-[var(--font-body)] text-xs text-on-surface-variant text-center pt-2">
              Your information is secure and DPDP Act 2023 compliant. We never share your data.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
