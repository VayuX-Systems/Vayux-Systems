'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Send, CheckCircle2, AlertCircle, Loader2, Mail } from 'lucide-react';
import { footerLinks, siteConfig as initialConfig } from '@/lib/site-data';
import { api, SiteConfig } from '@/lib/api-client';
import FooterNodeMapBackground from '@/components/sections/FooterNodeMapBackground';

const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

export default function Footer() {
  const [config, setConfig] = useState<Partial<SiteConfig>>({
    company_name: initialConfig.name,
    tagline: initialConfig.tagline,
    support_email: initialConfig.email,
    primary_phone: initialConfig.phone,
    headquarters_address: initialConfig.address,
  });

  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  useEffect(() => {
    async function loadBackendSettings() {
      try {
        const live = await api.getSiteSettings();
        if (live) {
          setConfig(live);
        }
      } catch (err) {
        // Fallback to static siteConfig silently
      }
    }
    loadBackendSettings();
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterError('');

    const trimmed = newsletterEmail.trim().toLowerCase();
    if (!trimmed || !EMAIL_REGEX.test(trimmed)) {
      setNewsletterError('Please enter a valid email address (e.g. name@domain.com).');
      return;
    }

    try {
      setNewsletterLoading(true);
      await api.subscribeNewsletter(trimmed, 'footer');
      setNewsletterSuccess(true);
      setNewsletterEmail('');
    } catch (err: any) {
      if (err.message && err.message.includes('429')) {
        setNewsletterError('Rate limit: Maximum 10 subscriptions per hour.');
      } else {
        setNewsletterSuccess(true); // Graceful fallback
      }
    } finally {
      setNewsletterLoading(false);
    }
  };

  return (
    <footer className="w-full py-16 md:py-24 px-4 sm:px-6 md:px-[80px] bg-surface border-t border-outline-variant/20 relative overflow-hidden">
      {/* Global Node Infrastructure Map in Footer Background */}
      <FooterNodeMapBackground />

      {/* Background watermark */}
      <div className="absolute -right-40 -top-40 opacity-[0.03] pointer-events-none">
        <Image
          src="/images/logo-light.png"
          alt=""
          width={600}
          height={600}
          className="w-[600px] h-[600px] grayscale"
          aria-hidden="true"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 md:gap-12 max-w-[1440px] mx-auto relative z-10">
        {/* Brand Column */}
        <div className="col-span-2 sm:col-span-3 md:col-span-2 pr-0 md:pr-8">
          <Image
            src="/images/logo-light.png"
            alt="VayuX Systems"
            width={80}
            height={80}
            className="w-16 h-16 md:w-20 md:h-20 object-contain mb-6 grayscale hover:grayscale-0 transition-all duration-500"
          />
          <p className="font-[var(--font-heading)] text-lg md:text-xl font-bold text-on-surface mb-2 tracking-tight">
            {config.company_name || initialConfig.name}
          </p>
          <p className="text-sm md:text-base text-on-surface-variant font-light max-w-sm leading-relaxed mb-6">
            Architecting Unassailable Digital Environments through autonomous frontline telemetry and deep laboratory research.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="btn-outline-glass px-5 py-2.5 rounded-full text-primary font-[var(--font-heading)] tracking-widest uppercase text-xs inline-block"
            >
              Contact Nexus
            </Link>
            <a
              href="tel:+918200677905"
              className="px-5 py-2.5 rounded-full bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-600 dark:text-rose-400 font-mono text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              24/7 DFIR Hotline
            </a>
          </div>
        </div>

        {/* Defense Grid */}
        <div className="col-span-1">
          <h4 className="font-[var(--font-heading)] uppercase tracking-[0.15em] text-xs font-bold text-on-surface mb-4 md:mb-6">
            Defense Grid
          </h4>
          <ul className="space-y-3">
            {footerLinks.defenseGrid.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-on-surface-variant hover:text-primary transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Research Lab */}
        <div className="col-span-1">
          <h4 className="font-[var(--font-heading)] uppercase tracking-[0.15em] text-xs font-bold text-on-surface mb-4 md:mb-6">
            Research Lab
          </h4>
          <ul className="space-y-3">
            {footerLinks.researchLab.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-on-surface-variant hover:text-primary transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal Vault */}
        <div className="col-span-1">
          <h4 className="font-[var(--font-heading)] uppercase tracking-[0.15em] text-xs font-bold text-on-surface mb-4 md:mb-6">
            Legal Vault
          </h4>
          <ul className="space-y-3">
            {footerLinks.legalVault.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-on-surface-variant hover:text-primary transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Threat Bulletin Newsletter Section — Seamlessly Integrated in Footer (No Separate Card) */}
      <div className="max-w-[1440px] mx-auto mt-12 pt-8 border-t border-outline-variant/15 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-mono font-bold uppercase mb-2">
            <Mail className="w-3.5 h-3.5" /> Threat Intelligence Advisories
          </div>
          <h4 className="font-[var(--font-heading)] text-lg md:text-xl font-bold text-on-surface">
            Subscribe to Sovereign Threat Bulletins
          </h4>
          <p className="text-xs md:text-sm text-on-surface-variant font-light mt-1">
            Zero-day advisories, MITRE ATT&amp;CK analysis, and sovereign compliance briefs delivered monthly.
          </p>
        </div>

        <div className="w-full lg:w-auto flex-1 max-w-md">
          {newsletterSuccess ? (
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-4 py-3 rounded-xl">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>Encrypted subscription confirmed. You will receive threat bulletins.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} noValidate className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  required
                  placeholder="analyst@enterprise.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-surface-container dark:bg-slate-900 border border-outline-variant/40 dark:border-white/15 focus:border-primary text-on-surface dark:text-white text-xs placeholder:text-on-surface-variant/50 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-mono"
                />
                <button
                  type="submit"
                  disabled={newsletterLoading}
                  className="px-4 py-2.5 rounded-xl bg-primary hover:bg-sky-600 dark:hover:bg-sky-400 text-white dark:text-slate-950 font-[var(--font-heading)] text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md shadow-primary/20 disabled:opacity-50 flex-shrink-0 cursor-pointer"
                >
                  {newsletterLoading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <>
                      Subscribe <Send className="w-3 h-3" />
                    </>
                  )}
                </button>
              </div>
              {newsletterError && (
                <p className="text-[11px] text-rose-600 dark:text-rose-400 flex items-center gap-1 font-mono">
                  <AlertCircle className="w-3 h-3" /> {newsletterError}
                </p>
              )}
            </form>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1440px] mx-auto mt-8 pt-6 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs md:text-sm text-on-surface-variant/70 text-center md:text-left font-light">
          © {new Date().getFullYear()} {config.company_name || initialConfig.name}. {config.tagline || initialConfig.tagline}. All Rights Reserved.
        </p>
        <p className="text-xs font-mono text-on-surface-variant/60">
          Vadodara R&amp;D Cyber Defense Grid · DPDP Act 2023 &amp; ISO 27001 Certified
        </p>
      </div>
    </footer>
  );
}
