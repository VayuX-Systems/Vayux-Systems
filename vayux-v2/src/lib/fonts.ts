import { Plus_Jakarta_Sans, Inter } from 'next/font/google';

export const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-inter',
  display: 'swap',
});
