// ============================================================================
// VayuX Systems v2 — Enterprise SEO & Generative Engine Optimization (GEO) Framework
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
const baseMetadata: Metadata = {
  metadataBase: new URL('https://vayux.systems'),
  title: {
    default: 'VayuX Systems | Autonomous Cybersecurity R&D & Incident Response',
    template: '%s | VayuX Systems',
  },
  description:
    'VayuX Systems is an enterprise cybersecurity R&D and Incident Response firm providing 24/7 Managed SOC, VAPT, DFIR, and GRC solutions powered by an active operational telemetry feedback loop.',
  keywords: [
    'VayuX Systems',
    'VayuX security lab',
    'VayuX',
    'Autonomous SOC services',
    'VAPT security testing',
    'Digital Forensics and Incident Response',
    'GRC compliance architecture',
    'Sub-15ms threat detection',
    'automated vulnerability and penetration testing',
    'zero-day threat neutralization architecture',
    'quantum-resistant encryption implementation',
    'ISO 27001 Aligned Controls',
    'SOC 2 Security Architecture',
    'NIST CSF Framework Principles',
    'GDPR-Ready Data Practices',
    'DPDP Act 2023 Compliance Audit',
    'CERT-In 6-Hour Reporting Compliance',
    'Autonomous Security Architecture',
    'Cybersecurity Vadodara Gujarat',
    'Yux cyber',
    'Why-UX',
    'VaayuX',
    'WayuX',
  ],
  authors: [{ name: 'VayuX Systems R&D Team', url: 'https://vayux.systems' }],
  creator: 'VayuX Systems',
  publisher: 'VayuX Systems',
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vayux.systems',
    siteName: 'VayuX Systems',
    title: 'VayuX Systems | Autonomous Cybersecurity R&D & Incident Response',
    description:
      'Enterprise cybersecurity R&D firm delivering Managed SOC, VAPT, DFIR emergency response, and GRC compliance through an autonomous operational telemetry feedback loop.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'VayuX Systems - Autonomous Cybersecurity R&D Laboratory',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VayuX Systems | Autonomous Cybersecurity R&D',
    description:
      '24/7 Managed SOC, Emergency DFIR, VAPT, and GRC compliance backed by proprietary threat intelligence research.',
    images: ['/images/twitter-image.jpg'],
    site: '@VayuXSystems',
    creator: '@VayuXSystems',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/images/logo-light.png',
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://vayux.systems',
  },
};

export const metadata: Metadata = baseMetadata;

// Dynamic Page Metadata Generator
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
    keywords: pageData.keywords
      ? [...(baseMetadata.keywords as string[]), ...pageData.keywords]
      : baseMetadata.keywords,
    openGraph: {
      ...baseMetadata.openGraph,
      url: `https://vayux.systems${pageData.path}`,
      title: pageData.title,
      description: pageData.description,
      type: pageData.type || 'website',
      images: pageData.image
        ? [{ url: pageData.image, width: 1200, height: 630 }]
        : baseMetadata.openGraph?.images,
    },
    twitter: {
      ...baseMetadata.twitter,
      title: pageData.title,
      description: pageData.description,
    },
    alternates: {
      canonical: `https://vayux.systems${pageData.path}`,
    },
  };
}

// ============================================================================
// Enhanced JSON-LD Structured Data Schema Framework
// ============================================================================

export function getGlobalSchemaGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://vayux.systems/#organization',
        name: 'VayuX Systems',
        legalName: 'VayuX Systems',
        alternateName: [
          'VayuX security lab',
          'VayuX',
          'Yux',
          'Yux Cyber',
          'Yux Systems',
          'Why-UX',
          'WhyUX',
          'VaayuX',
          'VaayuX Systems',
          'WayuX',
          'WayuX Systems',
          'V-UX',
          'VUX Cyber',
          'Vayu-X',
        ],
        url: 'https://vayux.systems',
        logo: {
          '@type': 'ImageObject',
          '@id': 'https://vayux.systems/#logo',
          url: 'https://vayux.systems/images/logo-light.png',
          caption: 'VayuX Systems Cybersecurity R&D Laboratory',
        },
        image: 'https://vayux.systems/images/og-image.jpg',
        description:
          'VayuX Systems is an enterprise cybersecurity R&D and Incident Response laboratory in Vadodara, Gujarat, providing Autonomous SOC services, VAPT security testing, Digital Forensics & Incident Response (DFIR), and GRC compliance architecture.',
        foundingDate: '2024',
        founder: {
          '@type': 'Person',
          name: 'PragneshKumar S. Singh',
          jobTitle: 'Founder & Chief Technology Officer',
          url: 'https://vayux.systems/about',
          sameAs: [
            'https://www.linkedin.com/in/pragnesh-singh-rajput/',
            'https://github.com/pragnesh-singh-rajput',
          ],
        },
        foundingLocation: {
          '@type': 'Place',
          name: 'Vadodara, Gujarat, India',
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'VayuX Cyber Defense R&D Lab',
          addressLocality: 'Vadodara',
          addressRegion: 'Gujarat',
          postalCode: '390001',
          addressCountry: 'IN',
        },
        sameAs: [
          'https://www.linkedin.com/company/vayux-systems',
          'https://twitter.com/VayuXSystems',
          'https://github.com/vayux-systems',
        ],
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+91-8200677905',
            contactType: 'emergency incident response',
            email: 'admin@vayux.systems',
            availableLanguage: ['English', 'Hindi', 'Gujarati'],
            hoursAvailable: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday',
              ],
              opens: '00:00',
              closes: '23:59',
            },
          },
          {
            '@type': 'ContactPoint',
            telephone: '+91-8200677905',
            contactType: 'sales and consulting',
            email: 'contact@vayux.systems',
            availableLanguage: ['English', 'Hindi', 'Gujarati'],
          },
        ],
        knowsAbout: [
          'VayuX Systems',
          'VayuX security lab',
          'Autonomous SOC services',
          'VAPT security testing',
          'Digital Forensics and Incident Response',
          'GRC compliance architecture',
          'Sub-15ms threat detection',
          'automated vulnerability and penetration testing',
          'zero-day threat neutralization architecture',
          'quantum-resistant encryption implementation',
          'ISO 27001 Aligned Controls',
          'SOC 2 Security Architecture',
          'NIST CSF Framework Principles',
          'GDPR-Ready Data Practices',
          'DPDP Act 2023 Compliance',
          'CERT-In Mandates',
          'Kernel Architecture & eBPF Telemetry',
          'Zero Trust Architecture',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'VayuX Autonomous Cybersecurity Solutions Catalog',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Autonomous SOC Services',
                description:
                  '24/7 continuous threat telemetry ingestion, behavioral anomaly detection, sub-15ms event correlation, and automated incident containment.',
                url: 'https://vayux.systems/solutions/soc',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'VAPT Security Testing',
                description:
                  'Automated vulnerability and penetration testing, offensive adversary simulation, cloud infrastructure audits, and zero-day neutralization.',
                url: 'https://vayux.systems/solutions/vapt',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Digital Forensics and Incident Response (DFIR)',
                description:
                  '24/7 emergency breach containment, volatile memory forensics, root-cause investigation, and court-admissible chain-of-custody reports.',
                url: 'https://vayux.systems/solutions/dfir',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'GRC Compliance Architecture',
                description:
                  'Enterprise governance aligned with DPDP Act 2023, ISO 27001 Aligned Controls, SOC 2 Security Architecture, and NIST CSF Framework Principles.',
                url: 'https://vayux.systems/solutions/grc',
              },
            },
          ],
        },
      },
      {
        '@type': ['ProfessionalService', 'LocalBusiness'],
        '@id': 'https://vayux.systems/#localbusiness',
        name: 'VayuX Systems - Cybersecurity R&D Laboratory',
        url: 'https://vayux.systems',
        image: 'https://vayux.systems/images/og-image.jpg',
        logo: 'https://vayux.systems/images/logo-light.png',
        telephone: '+91-8200677905',
        email: 'contact@vayux.systems',
        priceRange: '$$$$',
        currenciesAccepted: 'INR, USD, EUR, GBP',
        paymentAccepted: 'Bank Transfer, Corporate Invoice',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'VayuX Cyber Defense R&D Lab',
          addressLocality: 'Vadodara',
          addressRegion: 'Gujarat',
          postalCode: '390001',
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 22.3072,
          longitude: 73.1812,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ],
            opens: '00:00',
            closes: '23:59',
          },
        ],
        parentOrganization: {
          '@id': 'https://vayux.systems/#organization',
        },
      },
      {
        '@type': 'Service',
        '@id': 'https://vayux.systems/#service-soc',
        name: 'Autonomous SOC Services',
        serviceType: 'Managed Detection and Response (MDR)',
        provider: {
          '@id': 'https://vayux.systems/#organization',
        },
        url: 'https://vayux.systems/solutions/soc',
        description:
          '24/7 continuous threat telemetry ingestion, behavioral anomaly detection, sub-15ms event correlation, and automated incident containment.',
        areaServed: {
          '@type': 'Country',
          name: 'Global',
        },
      },
      {
        '@type': 'Service',
        '@id': 'https://vayux.systems/#service-vapt',
        name: 'VAPT Security Testing',
        serviceType: 'Offensive Cybersecurity Testing & Penetration Testing',
        provider: {
          '@id': 'https://vayux.systems/#organization',
        },
        url: 'https://vayux.systems/solutions/vapt',
        description:
          'Automated vulnerability and penetration testing, offensive adversary emulation, API security audits, and zero-day threat neutralization architecture.',
        areaServed: {
          '@type': 'Country',
          name: 'Global',
        },
      },
      {
        '@type': 'Service',
        '@id': 'https://vayux.systems/#service-dfir',
        name: 'Digital Forensics and Incident Response (DFIR)',
        serviceType: 'Emergency Cybersecurity Incident Response & Forensics',
        provider: {
          '@id': 'https://vayux.systems/#organization',
        },
        url: 'https://vayux.systems/solutions/dfir',
        description:
          '24/7 emergency breach response with guaranteed SLA, volatile memory analysis, root-cause investigation, and court-admissible chain-of-custody documentation.',
        areaServed: {
          '@type': 'Country',
          name: 'Global',
        },
      },
      {
        '@type': 'Service',
        '@id': 'https://vayux.systems/#service-grc',
        name: 'GRC Compliance Architecture',
        serviceType: 'Cybersecurity Governance, Risk, and Compliance Consulting',
        provider: {
          '@id': 'https://vayux.systems/#organization',
        },
        url: 'https://vayux.systems/solutions/grc',
        description:
          'Continuous compliance engineering aligned with DPDP Act 2023, ISO 27001 Aligned Controls, SOC 2 Security Architecture, and NIST CSF Framework Principles.',
        areaServed: {
          '@type': 'Country',
          name: 'Global',
        },
      },
      {
        '@type': 'WebSite',
        '@id': 'https://vayux.systems/#website',
        url: 'https://vayux.systems',
        name: 'VayuX Systems',
        publisher: {
          '@id': 'https://vayux.systems/#organization',
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://vayux.systems/glossary?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };
}

export function getServiceSchema(serviceId: 'soc' | 'vapt' | 'dfir' | 'grc') {
  const serviceMap = {
    soc: {
      name: 'Managed Security Operations Center (SOC) Operations',
      serviceType: 'Managed Detection and Response',
      path: '/solutions/soc',
      description:
        '24/7 continuous threat telemetry ingestion, behavioral anomaly detection, sub-15ms event correlation, and automated incident containment for enterprise infrastructures.',
      offers: [
        '24/7 Real-Time Telemetry Monitoring',
        'Autonomous Threat Containment',
        'Sub-15ms Correlation Engine',
        'CERT-In Compliant Log Archival',
      ],
    },
    vapt: {
      name: 'Vulnerability Assessment & Penetration Testing (VAPT)',
      serviceType: 'Offensive Cybersecurity Testing',
      path: '/solutions/vapt',
      description:
        'Adversarial simulation, OWASP Top 10 eradication, cloud infrastructure penetration testing, and CI/CD automated security hooks with actionable remediation roadmaps.',
      offers: [
        'External & Internal Attack Surface Penetration Testing',
        'Web Application & API Security Audits (OWASP Top 10)',
        'Cloud Security Posture Assessment (AWS/Azure/GCP)',
        'Adversarial Red Team Simulations',
      ],
    },
    dfir: {
      name: 'Digital Forensics & Incident Response (DFIR) Services',
      serviceType: 'Cybersecurity Incident Response & Forensics',
      path: '/solutions/dfir',
      description:
        '24/7 emergency breach response with guaranteed sub-4-hour SLA, volatile memory analysis, root-cause investigation, and court-admissible chain-of-custody documentation.',
      offers: [
        'Emergency Ransomware & Breach Containment',
        'Volatile Memory & Disk Forensics (ISO/IEC 27037)',
        'MITRE ATT&CK TTP Attribution & Mapping',
        'Post-Incident Architecture Hardening',
      ],
    },
    grc: {
      name: 'Governance, Risk, and Compliance (GRC) Consulting',
      serviceType: 'Cybersecurity Compliance & Risk Management',
      path: '/solutions/grc',
      description:
        'Strategic compliance alignment and audit readiness for DPDP Act 2023, CERT-In directions, ISO 27001, and SOC 2 Type II with automated compliance drift monitoring.',
      offers: [
        'DPDP Act 2023 Technical Gap Assessment',
        'CERT-In 6-Hour Incident Readiness Protocol',
        'ISO 27001 & SOC 2 Type II Audit Readiness',
        'Cryptographic Compliance Drift Monitoring',
      ],
    },
  };

  const item = serviceMap[serviceId];

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `https://vayux.systems${item.path}/#service`,
    name: item.name,
    serviceType: item.serviceType,
    description: item.description,
    provider: {
      '@id': 'https://vayux.systems/#organization',
    },
    areaServed: [
      { '@type': 'Country', name: 'India' },
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'United Arab Emirates' },
      { '@type': 'Country', name: 'Singapore' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: item.name,
      itemListElement: item.offers.map((offerName) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: offerName,
        },
      })),
    },
    termsOfService: 'https://vayux.systems/legal/terms',
  };
}

export function getFaqSchema(faqs: readonly { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function getDefinedTermSchema(term: {
  term: string;
  shortDefinition: string;
  slug: string;
  category: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    '@id': `https://vayux.systems/glossary/${term.slug}/#defined-term`,
    name: term.term,
    description: term.shortDefinition,
    inDefinedTermSet: 'https://vayux.systems/glossary/#glossary-set',
    url: `https://vayux.systems/glossary/${term.slug}`,
  };
}

export function getDefinedTermSetSchema(terms: { term: string; slug: string; shortDefinition: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    '@id': 'https://vayux.systems/glossary/#glossary-set',
    name: 'VayuX Systems Cybersecurity & R&D Knowledge Hub',
    description:
      'Authoritative technical glossary defining critical cybersecurity terminology, incident response standards, offensive security, and regulatory frameworks.',
    hasDefinedTerm: terms.map((t) => ({
      '@type': 'DefinedTerm',
      name: t.term,
      url: `https://vayux.systems/glossary/${t.slug}`,
      description: t.shortDefinition,
    })),
  };
}
