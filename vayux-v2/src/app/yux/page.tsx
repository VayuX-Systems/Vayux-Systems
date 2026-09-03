import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldAlert,
  Search,
  ArrowRight,
  PhoneCall,
  Activity,
  Terminal,
  HelpCircle,
  Volume2,
  CheckCircle2,
  Globe2,
  Sparkles,
  Layers,
  FileCheck2,
} from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import SectionHeading from '@/components/ui/SectionHeading';
import FAQ from '@/components/ui/FAQ';
import ScrollReveal from '@/components/layout/ScrollReveal';

export const metadata: Metadata = {
  title: "Looking for 'Yux', 'Why-UX', or 'VaayuX'? | VayuX Systems",
  description:
    "Searching for Yux, Why-UX, VaayuX, WayuX, or VUX? You've reached VayuX Systems — an enterprise cybersecurity R&D and emergency incident response firm.",
  keywords: [
    'Yux',
    'Yux cyber',
    'Yux systems',
    'Why-UX',
    'WhyUX',
    'VaayuX',
    'Vaayux Systems',
    'WayuX',
    'Wayux cyber',
    'VUX cyber',
    'Vayu-X',
    'VayuX Systems',
    'Vayux pronunciation',
    'Managed SOC India',
    'DFIR Incident Response',
  ],
  alternates: {
    canonical: 'https://vayux.systems/yux',
  },
  openGraph: {
    title: "Looking for 'Yux', 'Why-UX', or 'VaayuX'? | VayuX Systems",
    description:
      "Enterprise cybersecurity R&D and Incident Response firm. Disambiguation hub for all phonetic and voice search variations of VayuX Systems.",
    url: 'https://vayux.systems/yux',
    siteName: 'VayuX Systems',
  },
};

const phoneticVariations = [
  {
    variant: 'Yux / Why-UX',
    badge: 'Most Common Phone Mishearing',
    badgeColor: 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10',
    reason: 'Standard VoIP and cellular audio compression often attenuates the soft initial "Va-" syllable, making "VayuX" sound like "Why-UX" or "Yux".',
  },
  {
    variant: 'VaayuX / Vaayu',
    badge: 'Classical Sanskrit Phonetics',
    badgeColor: 'border-amber-500/40 text-amber-400 bg-amber-500/10',
    reason: 'Rooted in the Sanskrit word "Vāyu" (वायु), meaning the divine, swift elemental force of vital atmosphere, dynamic intelligence, and motion.',
  },
  {
    variant: 'WayuX / Wayu',
    badge: 'International / European Accent',
    badgeColor: 'border-blue-500/40 text-blue-400 bg-blue-500/10',
    reason: 'Non-native English speakers or regional accents frequently pronounce the labiodental "V" as a soft "W".',
  },
  {
    variant: 'V-UX / VUX Cyber',
    badge: 'Acronym & UI/UX Confusion',
    badgeColor: 'border-purple-500/40 text-purple-400 bg-purple-500/10',
    reason: 'Listeners occasionally interpret the name as an acronym for "Vulnerability UX" or "Verification UX" rather than a singular unified word.',
  },
  {
    variant: 'Vayuksh / Vayuks',
    badge: 'Regional Vernacular Suffix',
    badgeColor: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10',
    reason: 'Transliteration variants where the trailing "X" is articulated with a regional Indic conjunct closure.',
  },
];

const disambiguationFaqs = [
  {
    question: 'Is it VayuX, Yux, or Why-UX? What is the official name?',
    answer:
      'Our official, registered corporate name is VayuX Systems (pronounced "VAH-yoo-X"). During phone calls and verbal referrals, listeners commonly mishear or search for us as "Yux", "Why-UX", "VaayuX", or "WayuX".',
  },
  {
    question: 'How do you pronounce VayuX correctly?',
    answer:
      'The exact IPA pronunciation is [ ˈvɑː.juː.ɛks ]. Break it down into three simple beats: VAH (as in "Vast") + YOO (as in "Youth") + X (as in the letter "X").',
  },
  {
    question: 'Why did someone refer me to "Yux" during a cybersecurity emergency?',
    answer:
      'If a partner or technical contact told you to "call Yux for incident response", they were referring to VayuX Systems. Our emergency DFIR unit provides sub-15 minute triage for ransomware, active breach containment, and digital forensics.',
  },
  {
    question: 'What core services does VayuX Systems provide?',
    answer:
      'We are an enterprise cybersecurity R&D firm providing 24/7 Autonomous Managed SOC, Emergency Incident Response (DFIR), adversarial Penetration Testing (VAPT), and statutory GRC Compliance (DPDP Act & CERT-In).',
  },
] as const;

export default function YuxDisambiguationPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: disambiguationFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const entitySchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: "VayuX Systems Phonetic Disambiguation Hub",
    description: "Official clarification and redirection hub for searches related to Yux, Why-UX, VaayuX, WayuX, and V-UX.",
    url: 'https://vayux.systems/yux',
    isPartOf: {
      '@type': 'WebSite',
      name: 'VayuX Systems',
      url: 'https://vayux.systems',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(entitySchema) }}
      />

      <main className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden pt-32 pb-24 selection:bg-cyan-500/30">
        {/* Ambient Neon Cyber Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-2/3 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Phonetic Badge */}
          <ScrollReveal direction="down">
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-slate-900/80 backdrop-blur-md shadow-lg shadow-cyan-500/10 text-xs sm:text-sm font-mono text-cyan-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                <span>PHONETIC DISAMBIGUATION HUB: /yux/ &rarr; /vah-yoo-x/</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Hero Section */}
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                Looking for <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">&ldquo;Yux&rdquo;</span>,{' '}
                <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">&ldquo;Why-UX&rdquo;</span>, or{' '}
                <span className="bg-gradient-to-r from-cyan-300 to-emerald-400 bg-clip-text text-transparent">&ldquo;VaayuX&rdquo;</span>?
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-6">
                You&apos;ve reached the official portal of <strong className="text-white">VayuX Systems</strong> — an enterprise cybersecurity R&amp;D and autonomous incident defense firm.
              </p>
              <div className="inline-flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-slate-400 bg-slate-900/80 border border-slate-800 rounded-xl px-4 py-2">
                <span className="text-cyan-400">Alias Index:</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200">#Yux</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200">#WhyUX</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200">#VaayuX</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200">#WayuX</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200">#VUX</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200">#Vayu-X</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Pronunciation & Linguistics Breakdown */}
          <ScrollReveal direction="up" delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              <div className="p-6 rounded-2xl border border-cyan-500/20 bg-slate-900/60 backdrop-blur-xl">
                <div className="flex items-center gap-3 text-cyan-400 mb-3">
                  <Volume2 className="w-5 h-5" />
                  <span className="text-xs font-mono tracking-widest uppercase">Phonetic Guide</span>
                </div>
                <div className="text-2xl font-mono font-bold text-white mb-1">[ ˈvɑː.juː.ɛks ]</div>
                <p className="text-xs text-slate-400">Pronounced: <strong className="text-cyan-300">VAH-yoo-X</strong></p>
              </div>

              <div className="p-6 rounded-2xl border border-sky-500/20 bg-slate-900/60 backdrop-blur-xl">
                <div className="flex items-center gap-3 text-sky-400 mb-3">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-xs font-mono tracking-widest uppercase">Root Etymology</span>
                </div>
                <div className="text-xl font-bold text-white mb-1">Vāyu (वायु)</div>
                <p className="text-xs text-slate-400">Sanskrit elemental force of swift, omnipresent intelligence &amp; movement.</p>
              </div>

              <div className="p-6 rounded-2xl border border-indigo-500/20 bg-slate-900/60 backdrop-blur-xl">
                <div className="flex items-center gap-3 text-indigo-400 mb-3">
                  <Layers className="w-5 h-5" />
                  <span className="text-xs font-mono tracking-widest uppercase">The &ldquo;X&rdquo; Factor</span>
                </div>
                <div className="text-xl font-bold text-white mb-1">Autonomous R&amp;D</div>
                <p className="text-xs text-slate-400">Next-gen defense models evolving faster than adversary vectors.</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Mishearing & Misspelling Defense Matrix */}
          <ScrollReveal direction="up" delay={0.15}>
            <div className="mb-14">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white tracking-tight">The Phonetic Confusion Matrix</h2>
                <p className="text-slate-400 text-sm mt-1">Why audio compression, verbal referrals, and accents cause misspellings</p>
              </div>

              <div className="space-y-3">
                {phoneticVariations.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-md hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-mono font-bold text-cyan-400 text-sm shrink-0">
                        {idx + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-base font-bold text-white">{item.variant}</span>
                          <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
                            {item.badge}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                          {item.reason}
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0 flex items-center gap-1.5 text-xs font-semibold text-emerald-400 self-end sm:self-center">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Resolves to VayuX</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Core Defense Capabilities */}
          <ScrollReveal direction="up" delay={0.2}>
            <div className="mb-14">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white tracking-tight">Enterprise Defense Capabilities</h3>
                <p className="text-slate-400 text-sm mt-1">Direct access to our core cybersecurity practices</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* SOC Card */}
                <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 backdrop-blur-md hover:border-cyan-500/40 transition-all group">
                  <div className="p-2.5 w-fit rounded-lg bg-cyan-500/10 text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                    <Activity className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">24/7 Managed SOC</h4>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    Autonomous anomaly correlation with sub-15ms event processing and active threat intelligence telemetry.
                  </p>
                  <Link
                    href="/solutions/soc"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
                  >
                    <span>Explore Managed SOC</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* DFIR Card */}
                <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 backdrop-blur-md hover:border-red-500/40 transition-all group">
                  <div className="p-2.5 w-fit rounded-lg bg-red-500/10 text-red-400 mb-4 group-hover:scale-110 transition-transform">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Emergency DFIR</h4>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    Sub-minute ransomware triage, memory forensics, threat actor eviction, and CERT-In compliant forensic reporting.
                  </p>
                  <Link
                    href="/solutions/dfir"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-400 hover:text-red-300"
                  >
                    <span>Incident Response Hotline</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* VAPT Card */}
                <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 backdrop-blur-md hover:border-emerald-500/40 transition-all group">
                  <div className="p-2.5 w-fit rounded-lg bg-emerald-500/10 text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">VAPT &amp; Red Teaming</h4>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    Adversary emulation across cloud perimeters, web applications, API microservices, and internal infrastructure.
                  </p>
                  <Link
                    href="/solutions/vapt"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
                  >
                    <span>Explore VAPT Audits</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Quick FAQ Section */}
          <ScrollReveal direction="up" delay={0.25}>
            <div className="mb-14">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white">Frequently Asked Questions</h3>
                <p className="text-slate-400 text-sm mt-1">Clarifying naming variants, voice referrals, and emergency triage</p>
              </div>
              <FAQ items={disambiguationFaqs} />
            </div>
          </ScrollReveal>

          {/* Action CTAs */}
          <ScrollReveal direction="up" delay={0.3}>
            <div className="p-8 rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-slate-900/80 to-slate-950/80 backdrop-blur-xl text-center shadow-2xl">
              <h3 className="text-2xl font-extrabold text-white mb-3">Ready to Secure Your Critical Infrastructure?</h3>
              <p className="text-slate-300 text-sm max-w-xl mx-auto mb-6">
                Connect with our systems defense engineers for enterprise SOC onboarding or initiate immediate breach containment.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-sm hover:opacity-95 transition-all shadow-lg shadow-cyan-500/25 flex items-center gap-2"
                >
                  <span>Enter VayuX Systems</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 rounded-xl border border-slate-700 bg-slate-800/80 text-white font-semibold text-sm hover:bg-slate-700/80 transition-all flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-cyan-400" />
                  <span>Contact Engineering Team</span>
                </Link>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </main>
    </>
  );
}
