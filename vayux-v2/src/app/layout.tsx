import type { Metadata, Viewport } from 'next';
import { plusJakarta, inter } from '@/lib/fonts';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import FloatingCTA from '@/components/layout/FloatingCTA';
import PageTransition from '@/components/layout/PageTransition';
import CyberBackgroundGrid from '@/components/animations/CyberBackgroundGrid';
import { siteConfig } from '@/lib/site-data';
import { getGlobalSchemaGraph } from '@/lib/seo-config';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://vayux.systems'),
  title: {
    default: `${siteConfig.name} | Autonomous Cybersecurity R&D & Incident Response`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
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
    'Autonomous Security',
    'Managed SOC Operations',
    'VAPT Services India',
    'DFIR Incident Response',
    'GRC Compliance',
    'ISO 27001 Aligned Controls',
    'SOC 2 Security Architecture',
    'NIST CSF Framework Principles',
    'GDPR-Ready Data Practices',
    'DPDP Act 2023 Compliance',
    'CERT-In Directives',
    'Zero Trust Architecture',
    'Cyber Defense Research',
  ],
  authors: [{ name: 'VayuX Systems R&D' }],
  creator: 'VayuX Systems',
  publisher: 'VayuX Systems',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: `${siteConfig.name} | Autonomous Cybersecurity R&D & Incident Response`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'VayuX Systems - Cybersecurity R&D Laboratory',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | Autonomous Cybersecurity R&D`,
    description: siteConfig.description,
    images: ['/images/twitter-image.jpg'],
    site: '@VayuXSystems',
  },
  icons: {
    icon: [
      { url: '/images/logo-light.png', sizes: 'any', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/images/logo-light.png',
    apple: [
      { url: '/images/logo-light.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  alternates: {
    canonical: 'https://vayux.systems',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const globalSchema = getGlobalSchemaGraph();

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${plusJakarta.variable} ${inter.variable} scroll-smooth antialiased overflow-x-hidden`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(globalSchema),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var mediaQuery = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
                  var prefersDark = mediaQuery ? mediaQuery.matches : false;
                  var userSelected = localStorage.getItem('vayux-theme-user-selected');
                  var saved = localStorage.getItem('vayux-theme');

                  // If user never manually clicked the toggle, ALWAYS strictly obey device/browser theme
                  var isDark = (userSelected && saved) ? (saved === 'dark') : prefersDark;

                  if (isDark) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.style.colorScheme = 'dark';
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.colorScheme = 'light';
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-background text-on-surface font-[var(--font-body)] antialiased min-h-screen min-h-dvh flex flex-col relative overflow-x-hidden ambient-bg">
        <CyberBackgroundGrid />
        <Navigation />
        <main className="flex-grow">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}
