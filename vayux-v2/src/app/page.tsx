import { Metadata } from 'next';
import HomePageContent from './page-content';

export const metadata: Metadata = {
  title: 'VayuX Systems | Unassailable Protection',
  description:
    'Innovation-driven R&D firm leveraging an operational feedback loop to channel real-world insights into next-generation autonomous security architectures.',
};

export default function HomePage() {
  return <HomePageContent />;
}
