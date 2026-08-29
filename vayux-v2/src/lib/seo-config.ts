// ============================================================================
// VayuX Systems v2 — SEO & Metadata Framework
// Enterprise-Grade SEO Configuration
// ============================================================================

import type { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: 'light dark',
};

// Base metadata configuration
const baseMetadata = {
  metadataBase: new URL('https://vayux.systems'),
  title: {
    default: 'VayuX Systems | Architecting a Safer, Self-Defending Online World',
    template: '%s | VayuX Systems',
  },
  description: 'VayuX Systems is an innovation-driven cybersecurity R&D firm leveraging an operational feedback loop to channel real-world insights into next-generation autonomous security architectures.',
  keywords: [
    'VayuX Systems',
    'Cybersecurity R&D firm India',
    'Autonomous security architectures',
    'SOC Management Vadodara',
    'VAPT Services India',
    'DFIR Incident Response',
    'GRC Compliance',
    'DPDP Act 2023 compliance',
    'CERT-In directives',
    'ISO 27001 readiness',
    'Self-defending digital infrastructure',
    'Threat detection automation',
    'Security research laboratory',
    'Cybersecurity Vadodara Gujarat',
  ],
  authors: [{ name: 'VayuX Systems', url: 'https://vayux.systems' }],
  creator: 'VayuX Systems',
  publisher: 'VayuX Systems',
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://vayux.systems',
    siteName: 'VayuX Systems',
    title: 'VayuX Systems | Architecting a Safer, Self-Defending Online World',
    description: 'Innovation-driven cybersecurity R&D firm providing autonomous security architectures, SOC management, VAPT, DFIR, and GRC compliance services.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'VayuX Systems - Cybersecurity R&D Laboratory',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VayuX Systems | Unassailable Protection',
    description: 'Autonomous security architectures and R&D-driven threat detection.',
    images: ['/images/twitter-image.jpg'],
    site: '@VayuXSystems',
    creator: '@VayuXSystems',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: 'index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/images/apple-touch-icon.png',
    shortcut: '/images/favicon-32x32.png',
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://vayux.systems',
  },
};

export const metadata: Metadata = baseMetadata;

// Page-specific metadata generator
export function generatePageMetadata(pageData: {
  title: string;
  description: string;
  keywords?: string[];
  path: string;
  image?: string;
  type?: 'article' | 'website';
}): Metadata {
  return {
    ...baseMetadata,
    title: pageData.title,
    description: pageData.description,
    keywords: pageData.keywords ? [...baseMetadata.keywords as string[], ...pageData.keywords] : baseMetadata.keywords,
    openGraph: {
      ...baseMetadata.openGraph,
      url: `https://vayux.systems${pageData.path}`,
      title: pageData.title,
      description: pageData.description,
      type: pageData.type || 'website',
      images: pageData.image ? [{ url: pageData.image, width: 1200, height: 630 }] : (baseMetadata.openGraph?.images as any[]),
    },
    alternates: {
      canonical: `https://vayux.systems${pageData.path}`,
    },
  };
}

// ============================================================================
// Structured Data (JSON-LD Schema)
// ============================================================================

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'VayuX Systems',
  url: 'https://vayux.systems',
  logo: 'https://vayux.systems/images/logo-light.png',
  description: 'Innovation-driven cybersecurity R&D firm providing autonomous security architectures and managed security services.',
  sameAs: [
    'https://www.linkedin.com/company/vayux-systems',
    'https://twitter.com/VayuXSystems',
    'https://github.com/vayux-systems',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Technical Support',
    telephone: '+91-8200677905',
    email: 'admin@vayux.systems',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Sector 7G, Cyber District',
    addressLocality: 'Vadodara',
    addressRegion: 'Gujarat',
    postalCode: '',
    addressCountry: 'IN',
  },
  areaServed: ['IN'],
  foundingDate: '2024',
  foundingLocation: {
    '@type': 'Place',
    name: 'Vadodara, Gujarat, India',
  },
  employee: [
    {
      '@type': 'Person',
      name: 'Pragnesh Kumar S. Singh',
      jobTitle: 'Founder / CTO',
      email: 'pragnesh.s@vayux.systems',
    },
  ],
};

export const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'VayuX Systems',
  description: 'Cybersecurity R&D and managed security services provider',
  areaServed: {
    '@type': 'Country',
    name: 'IN',
  },
  priceRange: '$$$$',
  knowsAbout: [
    'Cybersecurity',
    'Security Operations Center (SOC)',
    'VAPT (Vulnerability Assessment & Penetration Testing)',
    'DFIR (Digital Forensics and Incident Response)',
    'GRC (Governance, Risk & Compliance)',
    'Autonomous Security Architectures',
    'Threat Detection',
    'Incident Response',
  ],
};

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does the R&D feedback loop integrate with daily operations?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our operational SOC environment doubles as a live telemetry source for our research labs. Anomalies detected in client networks inform immediate architectural upgrades which are then deployed autonomously across all partnership nodes.',
      },
    },
    {
      '@type': 'Question',
      name: 'What differentiates VayuX from traditional MSSPs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'VayuX operates as a dynamic R&D laboratory with continuous feedback loops, not as a routine maintenance vendor. We develop proprietary countermeasures and architectural adaptations specific to each client\'s threat profile.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are engagement models flexible?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. While our core offering encompasses complete architectural oversight, we offer specialized tactical engagements for DFIR, targeted VAPT, and critical infrastructure hardening.',
      },
    },
  ],
};

// ============================================================================
// Sitemap configuration (Next.js 14+)
// ============================================================================

export const sitemapConfig = {
  baseUrl: 'https://vayux.systems',
  routes: [
    { path: '/', priority: 1.0, changefreq: 'weekly' },
    { path: '/about', priority: 0.9, changefreq: 'monthly' },
    { path: '/solutions', priority: 0.95, changefreq: 'weekly' },
    { path: '/solutions#soc', priority: 0.9, changefreq: 'weekly' },
    { path: '/solutions#vapt', priority: 0.9, changefreq: 'weekly' },
    { path: '/solutions#dfir', priority: 0.9, changefreq: 'weekly' },
    { path: '/solutions#grc', priority: 0.9, changefreq: 'weekly' },
    { path: '/insights', priority: 0.85, changefreq: 'daily' },
    { path: '/careers', priority: 0.8, changefreq: 'weekly' },
    { path: '/contact', priority: 0.9, changefreq: 'monthly' },
    { path: '/legal/privacy', priority: 0.7, changefreq: 'yearly' },
    { path: '/legal/terms', priority: 0.7, changefreq: 'yearly' },
  ],
};

// ============================================================================
// Robots.txt configuration
// ============================================================================

export const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /.env
Disallow: /.git
Disallow: /private

# Specific rules for search engines
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: MJ12bot
Allow: /

User-agent: AhrefsBot
Disallow: /

Sitemap: https://vayux.systems/sitemap.xml
`;

// ============================================================================
// Performance headers (next.config.js)
// ============================================================================

export const securityHeaders = [
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'geolocation=(), microphone=(), camera=(), payment=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
];

export const cacheHeaders = [
  {
    key: 'Cache-Control',
    value: 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
  },
];
