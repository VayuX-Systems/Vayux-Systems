import type { Metadata, Viewport } from 'next';
import { plusJakarta, inter } from '@/lib/fonts';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import FloatingCTA from '@/components/layout/FloatingCTA';
import PageTransition from '@/components/layout/PageTransition';
import { siteConfig } from '@/lib/site-data';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Unassailable Protection`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'Autonomous Security',
    'SOC Operations',
    'VAPT',
    'DFIR',
    'GRC Compliance',
    'Zero Trust Architecture',
    'Cyber Defense Research',
    'Post-Quantum Encryption',
  ],
  authors: [{ name: 'VayuX Systems R&D' }],
  creator: 'VayuX Systems',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: `${siteConfig.name} | Unassailable Protection`,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | Unassailable Protection`,
    description: siteConfig.description,
  },
  icons: {
    icon: '/images/logo-light.png',
    apple: '/images/logo-light.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${inter.variable} scroll-smooth antialiased overflow-x-hidden`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('vayux-theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (saved === 'dark' || (!saved && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-background text-on-surface font-[var(--font-body)] antialiased min-h-screen flex flex-col relative overflow-x-hidden ambient-bg">
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
