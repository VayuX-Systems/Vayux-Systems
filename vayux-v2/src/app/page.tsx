import { Metadata } from 'next';
import HomePageContent from './page-content';

export const metadata: Metadata = {
  title: 'VayuX Systems | Autonomous Cybersecurity R&D & Incident Response',
  description:
    'Innovation-driven cybersecurity laboratory in Vadodara, Gujarat, providing Autonomous SOC services, VAPT security testing, Digital Forensics and Incident Response (DFIR), and GRC compliance architecture.',
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
  ],
};

export default function HomePage() {
  return <HomePageContent />;
}
