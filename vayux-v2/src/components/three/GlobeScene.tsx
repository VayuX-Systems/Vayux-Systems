'use client';

import React from 'react';
import GlobalNodeInfrastructure from '@/components/sections/GlobalNodeInfrastructure';

export default function GlobeScene({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full ${className}`}>
      <GlobalNodeInfrastructure />
    </div>
  );
}
