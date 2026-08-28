'use client';

import dynamic from 'next/dynamic';
import { ReactNode, Suspense } from 'react';

interface SceneLoaderProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
}

// Default fallback — ambient gradient matching the design
export function DefaultFallback() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-fixed-dim/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary-fixed-dim/15 rounded-full blur-[120px]" />
    </div>
  );
}

export default function SceneLoader({ children, fallback, className = '' }: SceneLoaderProps) {
  return (
    <div className={className}>
      <Suspense fallback={fallback || <DefaultFallback />}>
        {children}
      </Suspense>
    </div>
  );
}

// Dynamic imports for each scene — tree-shaking friendly & SSR safe
export const DynamicHeroScene = dynamic(
  () => import('@/components/three/HeroScene'),
  { ssr: false, loading: () => <DefaultFallback /> }
);

export const DynamicEagleDefenseScene = dynamic(
  () => import('@/components/three/EagleDefenseScene'),
  { ssr: false, loading: () => <DefaultFallback /> }
);

export const DynamicParticleField = dynamic(
  () => import('@/components/three/ParticleField'),
  { ssr: false, loading: () => <DefaultFallback /> }
);

export const DynamicGlobeScene = dynamic(
  () => import('@/components/three/GlobeScene'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[380px] flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    ),
  }
);

export const DynamicGeometricMesh = dynamic(
  () => import('@/components/three/GeometricMesh'),
  { ssr: false, loading: () => <DefaultFallback /> }
);
