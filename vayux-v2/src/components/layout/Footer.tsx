import Link from 'next/link';
import Image from 'next/image';
import { footerLinks, siteConfig } from '@/lib/site-data';

export default function Footer() {
  return (
    <footer className="w-full py-16 md:py-24 px-4 sm:px-6 md:px-[80px] bg-surface border-t border-outline-variant/20 relative overflow-hidden">
      {/* Background watermark */}
      <div className="absolute -right-40 -top-40 opacity-[0.03] pointer-events-none">
        <Image
          src="/images/logo-light.png"
          alt=""
          width={600}
          height={600}
          className="grayscale"
          aria-hidden="true"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 max-w-[1440px] mx-auto relative z-10">
        {/* Brand Column */}
        <div className="col-span-1 md:col-span-2 pr-8">
          <Image
            src="/images/logo-light.png"
            alt="VayuX Systems"
            width={80}
            height={80}
            className="h-16 w-16 md:h-20 md:w-20 object-contain mb-6 grayscale hover:grayscale-0 transition-all duration-500"
          />
          <p className="font-[var(--font-heading)] text-lg md:text-xl font-bold text-on-surface mb-2 tracking-tight">
            {siteConfig.name}
          </p>
          <p className="text-sm md:text-base text-on-surface-variant font-light max-w-sm leading-relaxed mb-6">
            Architecting Unassailable Digital Environments through luminous clarity and celestial technicality.
          </p>
          <Link
            href="/contact"
            className="btn-outline-glass px-5 py-2.5 rounded-full text-primary font-[var(--font-heading)] tracking-widest uppercase text-xs inline-block"
          >
            Contact Nexus
          </Link>
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

      {/* Bottom Bar */}
      <div className="max-w-[1440px] mx-auto mt-12 md:mt-20 pt-6 md:pt-8 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs md:text-sm text-on-surface-variant/70 text-center md:text-left font-light">
          © {new Date().getFullYear()} {siteConfig.name}. {siteConfig.tagline}. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
