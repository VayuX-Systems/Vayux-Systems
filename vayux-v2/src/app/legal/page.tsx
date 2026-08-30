import Link from 'next/link';
import ScrollReveal from '@/components/layout/ScrollReveal';
import GlassCard from '@/components/ui/GlassCard';

export const metadata = {
  title: 'Legal & Privacy Policy | VayuX Systems',
  description:
    'Comprehensive terms governing your interaction with VayuX Systems. Our commitment to absolute transparency and unassailable protection.',
};

export default function LegalPage() {
  return (
    <div className="pt-28 md:pt-36 pb-20 md:pb-32 px-5 md:px-[80px] max-w-[1440px] mx-auto w-full">
      {/* Hero Section */}
      <header className="mb-10 md:mb-12 text-center max-w-3xl mx-auto">
        <ScrollReveal>
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-sm">
            📜 Legal Vault
          </span>
          <h1 className="font-[var(--font-heading)] text-4xl sm:text-5xl md:text-6xl font-bold text-on-surface mb-4 leading-tight tracking-tight">
            Legal &amp; <span className="text-gradient">Privacy</span>
          </h1>
          <p className="font-[var(--font-body)] text-base sm:text-lg text-on-surface-variant leading-relaxed font-light">
            Comprehensive terms governing your interaction with VayuX Systems. Our commitment to absolute transparency and unassailable protection.
          </p>
        </ScrollReveal>
      </header>

      {/* Main Grid: Sticky Sidebar TOC + Legal Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
        {/* Table of Contents Sidebar */}
        <aside className="lg:col-span-3 hidden lg:block">
          <div className="sticky top-32 glass-panel p-8 rounded-2xl">
            <h3 className="font-[var(--font-heading)] text-xs uppercase tracking-widest text-primary font-bold mb-6">
              Contents
            </h3>
            <nav className="flex flex-col gap-3 font-[var(--font-heading)] text-xs">
              <Link
                href="#terms"
                className="text-on-surface hover:text-primary transition-colors font-bold uppercase tracking-wider"
              >
                1. Terms &amp; Conditions
              </Link>
              <Link
                href="#obligations"
                className="text-on-surface-variant hover:text-primary pl-3 transition-colors font-medium"
              >
                1.1 User Obligations
              </Link>
              <Link
                href="#ip"
                className="text-on-surface-variant hover:text-primary pl-3 transition-colors font-medium"
              >
                1.2 Intellectual Property
              </Link>
              <Link
                href="#privacy"
                className="text-on-surface hover:text-primary transition-colors mt-3 font-bold uppercase tracking-wider"
              >
                2. Privacy Policy
              </Link>
              <Link
                href="#data-security"
                className="text-on-surface-variant hover:text-primary pl-3 transition-colors font-medium"
              >
                2.1 Data Security &amp; Encryption
              </Link>
              <Link
                href="#telemetry"
                className="text-on-surface-variant hover:text-primary pl-3 transition-colors font-medium"
              >
                2.2 Information Collection
              </Link>
            </nav>
          </div>
        </aside>

        {/* Legal Document Body */}
        <div className="lg:col-span-9">
          <GlassCard className="p-8 sm:p-12 md:p-16 rounded-3xl" hover={false}>
            {/* Section 1: Terms & Conditions */}
            <section id="terms" className="mb-16">
              <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-on-surface mb-6 border-b border-outline-variant/30 pb-4">
                1. Terms &amp; Conditions
              </h2>
              <p className="text-base text-on-surface-variant leading-relaxed mb-6 font-light">
                Welcome to VayuX Systems. By accessing or using our advanced security infrastructure, research portals, and the Defense Grid, you agree to be bound by these Terms and Conditions. These terms formulate a binding legal agreement designed to ensure the integrity and unassailable protection of all parties involved.
              </p>

              <h3 id="obligations" className="font-[var(--font-heading)] text-xl font-bold text-on-surface mt-8 mb-4">
                1.1 User Obligations
              </h3>
              <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed mb-4 font-light">
                As a designated operative or authorized user within the VayuX network, you are subject to stringent operational protocols:
              </p>
              <ul className="space-y-3 pl-6 list-disc text-sm sm:text-base text-on-surface-variant font-light mb-6">
                <li>
                  <strong className="font-semibold text-on-surface">Access Credentials:</strong> You must maintain absolute confidentiality of your Nexus access tokens. Any breach must be reported immediately to the Global Sentinel Network.
                </li>
                <li>
                  <strong className="font-semibold text-on-surface">Prohibited Actions:</strong> Attempting to reverse-engineer, decompile, or otherwise probe the Defense Grid&apos;s architecture is strictly forbidden and constitutes a severe breach of protocol.
                </li>
                <li>
                  <strong className="font-semibold text-on-surface">Compliance:</strong> Users must operate within the parameters of international cybersecurity law and the specific directives issued by VayuX Systems command.
                </li>
              </ul>

              <h3 id="ip" className="font-[var(--font-heading)] text-xl font-bold text-on-surface mt-8 mb-4">
                1.2 Intellectual Property
              </h3>
              <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed font-light">
                All technology, algorithms, celestial security frameworks, and visual assets (including the metallic silver eagle insignia) are the exclusive property of VayuX Systems. No license is granted by implication or otherwise to use these assets outside authorized operational scopes.
              </p>
            </section>

            {/* Section 2: Privacy Policy */}
            <section id="privacy">
              <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-on-surface mb-6 border-b border-outline-variant/30 pb-4">
                2. Privacy Policy
              </h2>
              <p className="text-base text-on-surface-variant leading-relaxed mb-6 font-light">
                At VayuX Systems, privacy is not merely a policy; it is the foundational architecture of the Privacy Vault. We deploy celestial technicality to ensure your data remains impenetrable.
              </p>

              <h3 id="data-security" className="font-[var(--font-heading)] text-xl font-bold text-on-surface mt-8 mb-4">
                2.1 Data Security &amp; Encryption
              </h3>
              <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed mb-4 font-light">
                Our infrastructure utilizes state-of-the-art quantum-resistant encryption protocols. Data at rest and in transit is secured within our proprietary luminous data structures, guaranteeing unassailable protection against intrusion.
              </p>
              <ul className="space-y-3 pl-6 list-disc text-sm sm:text-base text-on-surface-variant font-light mb-6">
                <li>
                  <strong className="font-semibold text-on-surface">Zero-Knowledge Architecture:</strong> VayuX Systems cannot decrypt user data stored within designated ultra-secure partitions.
                </li>
                <li>
                  <strong className="font-semibold text-on-surface">Continuous Monitoring:</strong> The Defense Grid actively scans for anomalies, utilizing predictive modeling to neutralize threats before they materialize.
                </li>
              </ul>

              <h3 id="telemetry" className="font-[var(--font-heading)] text-xl font-bold text-on-surface mt-8 mb-4">
                2.2 Information Collection &amp; Telemetry
              </h3>
              <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed mb-4 font-light">
                To maintain operational superiority, we collect essential telemetry data. This collection is transparent and strictly limited to structural and performance metrics necessary for the optimization of the Defense Grid.
              </p>
              <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed font-light">
                We do not sell, broker, or otherwise transmit your operational data to external entities. Complete isolation is our standard.
              </p>
            </section>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
