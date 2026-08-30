'use client';

import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Compass, RotateCw, MapPin, ShieldCheck, Zap, ZoomIn, ZoomOut } from 'lucide-react';

// Dynamic import of Globe from react-globe.gl to prevent SSR evaluation errors
const Globe = dynamic(() => import('react-globe.gl'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[440px] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-sky-400 border-t-transparent animate-spin" />
        <span className="text-xs font-mono text-sky-400/80 uppercase tracking-widest">
          Initializing 3D Telemetry Grid...
        </span>
      </div>
    </div>
  ),
});

// Global Operating Nodes with VADODARA, GUJARAT, INDIA as Global Headquarters
const GLOBAL_NODES = [
  {
    lat: 22.3072,
    lng: 73.1812,
    name: 'VayuX Global HQ & Central R&D Lab',
    city: 'Vadodara, Gujarat',
    country: 'India',
    isHub: true,
    tier: 'CENTRAL DEFENSE COMMAND',
    size: 1.4,
    color: '#f59e0b', // Radiant Gold for Global Headquarters
    status: 'PRIMARY R&D NEXUS',
    latency: '0.4ms',
  },
  {
    lat: 64.1466,
    lng: -21.9426,
    name: 'Reykjavik Command',
    city: 'Reykjavik',
    country: 'Iceland',
    isHub: false,
    tier: 'Arctic Sovereign Node',
    size: 0.8,
    color: '#00e5ff',
    status: 'ACTIVE ENCLAVE',
    latency: '14.2ms',
  },
  {
    lat: 37.7749,
    lng: -122.4194,
    name: 'San Francisco Grid',
    city: 'San Francisco',
    country: 'USA',
    isHub: false,
    tier: 'Pacific Sentinel Array',
    size: 0.75,
    color: '#38bdf8',
    status: 'ACTIVE ENCLAVE',
    latency: '18.6ms',
  },
  {
    lat: 40.7128,
    lng: -74.006,
    name: 'New York Sentinel',
    city: 'New York',
    country: 'USA',
    isHub: false,
    tier: 'Atlantic Telemetry Relay',
    size: 0.8,
    color: '#38bdf8',
    status: 'ACTIVE ENCLAVE',
    latency: '16.1ms',
  },
  {
    lat: 51.5074,
    lng: -0.1278,
    name: 'London Bastion',
    city: 'London',
    country: 'UK',
    isHub: false,
    tier: 'European Bastion',
    size: 0.85,
    color: '#00e5ff',
    status: 'ACTIVE ENCLAVE',
    latency: '11.4ms',
  },
  {
    lat: 48.8566,
    lng: 2.3522,
    name: 'Paris Node',
    city: 'Paris',
    country: 'France',
    isHub: false,
    tier: 'Continental Gateway',
    size: 0.7,
    color: '#38bdf8',
    status: 'ACTIVE ENCLAVE',
    latency: '12.8ms',
  },
  {
    lat: 52.52,
    lng: 13.405,
    name: 'Berlin Vault',
    city: 'Berlin',
    country: 'Germany',
    isHub: false,
    tier: 'Central EU Enclave',
    size: 0.75,
    color: '#38bdf8',
    status: 'ACTIVE ENCLAVE',
    latency: '13.0ms',
  },
  {
    lat: 35.6762,
    lng: 139.6503,
    name: 'Tokyo Core',
    city: 'Tokyo',
    country: 'Japan',
    isHub: false,
    tier: 'East Asia Defense Array',
    size: 0.85,
    color: '#00e5ff',
    status: 'ACTIVE ENCLAVE',
    latency: '15.9ms',
  },
  {
    lat: 1.3521,
    lng: 103.8198,
    name: 'Singapore Relay',
    city: 'Singapore',
    country: 'Singapore',
    isHub: false,
    tier: 'ASEAN Ingestion Hub',
    size: 0.8,
    color: '#38bdf8',
    status: 'ACTIVE ENCLAVE',
    latency: '8.7ms',
  },
  {
    lat: -33.8688,
    lng: 151.2093,
    name: 'Sydney Outpost',
    city: 'Sydney',
    country: 'Australia',
    isHub: false,
    tier: 'Oceania Perimeter Relay',
    size: 0.7,
    color: '#38bdf8',
    status: 'ACTIVE ENCLAVE',
    latency: '21.3ms',
  },
  {
    lat: 25.2048,
    lng: 55.2708,
    name: 'Dubai Enclave',
    city: 'Dubai',
    country: 'UAE',
    isHub: false,
    tier: 'Middle East Defense Enclave',
    size: 0.75,
    color: '#00e5ff',
    status: 'ACTIVE ENCLAVE',
    latency: '9.2ms',
  },
  {
    lat: 19.076,
    lng: 72.8777,
    name: 'Mumbai Tactical Array',
    city: 'Mumbai',
    country: 'India',
    isHub: false,
    tier: 'Western India Edge Array',
    size: 0.85,
    color: '#38bdf8',
    status: 'ACTIVE ENCLAVE',
    latency: '2.1ms',
  },
  {
    lat: 59.3293,
    lng: 18.0686,
    name: 'Stockholm Nexus',
    city: 'Stockholm',
    country: 'Sweden',
    isHub: false,
    tier: 'Nordic Sovereign Vault',
    size: 0.7,
    color: '#38bdf8',
    status: 'ACTIVE ENCLAVE',
    latency: '14.8ms',
  },
  {
    lat: 45.4215,
    lng: -75.6972,
    name: 'Ottawa Shield',
    city: 'Ottawa',
    country: 'Canada',
    isHub: false,
    tier: 'North American Perimeter',
    size: 0.7,
    color: '#38bdf8',
    status: 'ACTIVE ENCLAVE',
    latency: '17.4ms',
  },
  {
    lat: -23.5505,
    lng: -46.6333,
    name: 'São Paulo Array',
    city: 'São Paulo',
    country: 'Brazil',
    isHub: false,
    tier: 'Latin America Relay',
    size: 0.7,
    color: '#38bdf8',
    status: 'ACTIVE ENCLAVE',
    latency: '24.1ms',
  },
];

// Telemetry Laser Connections Radiating to/from Vadodara HQ & Inter-Grid Network
const VADODARA_LAT = 22.3072;
const VADODARA_LNG = 73.1812;

const BASE_ARCS = [
  // Primary Central Beams from Vadodara HQ
  { startLat: VADODARA_LAT, startLng: VADODARA_LNG, endLat: 51.5074, endLng: -0.1278, isHQ: true }, // Vadodara -> London
  { startLat: VADODARA_LAT, startLng: VADODARA_LNG, endLat: 35.6762, endLng: 139.6503, isHQ: true }, // Vadodara -> Tokyo
  { startLat: VADODARA_LAT, startLng: VADODARA_LNG, endLat: 25.2048, endLng: 55.2708, isHQ: true }, // Vadodara -> Dubai
  { startLat: VADODARA_LAT, startLng: VADODARA_LNG, endLat: 1.3521, endLng: 103.8198, isHQ: true }, // Vadodara -> Singapore
  { startLat: VADODARA_LAT, startLng: VADODARA_LNG, endLat: 64.1466, endLng: -21.9426, isHQ: true }, // Vadodara -> Reykjavik
  { startLat: VADODARA_LAT, startLng: VADODARA_LNG, endLat: 40.7128, endLng: -74.006, isHQ: true }, // Vadodara -> New York
  { startLat: VADODARA_LAT, startLng: VADODARA_LNG, endLat: -33.8688, endLng: 151.2093, isHQ: true }, // Vadodara -> Sydney
  { startLat: VADODARA_LAT, startLng: VADODARA_LNG, endLat: 52.52, endLng: 13.405, isHQ: true }, // Vadodara -> Berlin
  // Global Grid Inter-Connects
  { startLat: 51.5074, startLng: -0.1278, endLat: 40.7128, endLng: -74.006, isHQ: false }, // London -> New York
  { startLat: 37.7749, startLng: -122.4194, endLat: 35.6762, endLng: 139.6503, isHQ: false }, // SF -> Tokyo
  { startLat: 1.3521, startLng: 103.8198, endLat: -33.8688, endLng: 151.2093, isHQ: false }, // Singapore -> Sydney
  { startLat: 40.7128, startLng: -74.006, endLat: 45.4215, endLng: -75.6972, isHQ: false }, // NY -> Ottawa
  { startLat: 40.7128, startLng: -74.006, endLat: -23.5505, endLng: -46.6333, isHQ: false }, // NY -> Sao Paulo
  { startLat: 59.3293, startLng: 18.0686, endLat: 64.1466, endLng: -21.9426, isHQ: false }, // Stockholm -> Reykjavik
];

export default function GlobeScene({ className = '' }: { className?: string }) {
  const globeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 480 });
  const [isDark, setIsDark] = useState(true);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [mounted, setMounted] = useState(false);

  // 1. Detect and listen to theme mode changes (Dark vs Light)
  useEffect(() => {
    setMounted(true);

    const checkTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setIsDark(isDarkMode);
    };

    checkTheme();

    // Observe class mutations on html element
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  // 2. Responsive dimensions handling
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setDimensions({
          width: clientWidth || 600,
          height: clientHeight > 350 ? clientHeight : 480,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [mounted]);

  // 3. Configure initial POV centered over India / Vadodara HQ
  useEffect(() => {
    if (globeRef.current) {
      // Focus directly onto Vadodara, India at the default frame size
      globeRef.current.pointOfView({ lat: 22.3, lng: 73.2, altitude: 2.1 }, 1200);
      const controls = globeRef.current.controls();
      if (controls) {
        controls.autoRotate = isAutoRotating;
        controls.autoRotateSpeed = 0.7;
        controls.enableZoom = true;
        controls.minDistance = 140; // Zoom in capability kept as it is
        controls.maxDistance = 315; // Lower cap: Prevents zooming out beyond the current screenshot size
        controls.zoomSpeed = 0.8;
        controls.enablePan = false;
      }
    }
  }, [mounted]);

  // Handle Focus on Vadodara HQ Button
  const focusVadodara = useCallback(() => {
    if (globeRef.current) {
      globeRef.current.pointOfView({ lat: 22.3072, lng: 73.1812, altitude: 1.75 }, 1400);
    }
  }, []);

  // Handle Zoom In (Kept as it is, allows deep zoom into nodes)
  const handleZoomIn = useCallback(() => {
    if (globeRef.current) {
      const currentPov = globeRef.current.pointOfView();
      const newAltitude = Math.max(1.0, (currentPov.altitude || 2.1) - 0.35);
      globeRef.current.pointOfView({ ...currentPov, altitude: newAltitude }, 400);
    }
  }, []);

  // Handle Zoom Out (Capped at 2.15 altitude so it stops at the desired size)
  const handleZoomOut = useCallback(() => {
    if (globeRef.current) {
      const currentPov = globeRef.current.pointOfView();
      const newAltitude = Math.min(2.15, (currentPov.altitude || 2.1) + 0.35);
      globeRef.current.pointOfView({ ...currentPov, altitude: newAltitude }, 400);
    }
  }, []);

  // Toggle Auto-Rotation
  const toggleRotation = useCallback(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      if (controls) {
        controls.autoRotate = !isAutoRotating;
        setIsAutoRotating(!isAutoRotating);
      }
    }
  }, [isAutoRotating]);

  // 4. Dynamic Theme Configuration
  const globeConfig = useMemo(() => {
    if (isDark) {
      return {
        globeImage: '//unpkg.com/three-globe/example/img/earth-night.jpg',
        bumpImage: '//unpkg.com/three-globe/example/img/earth-topology.png',
        atmosphereColor: '#00a8ff',
        atmosphereAltitude: 0.18,
        hubRingColor: (t: number) => `rgba(245, 158, 11, ${1 - t})`,
        nodeRingColor: (t: number) => `rgba(0, 229, 255, ${1 - t})`,
        hqArcColors: ['#f59e0b', '#38bdf8'],
        nodeArcColors: ['#38bdf8', '#00e5ff'],
        pointColor: (d: any) => (d.isHub ? '#f59e0b' : '#00e5ff'),
        cardBg: 'rgba(2, 6, 23, 0.94)',
        cardBorder: 'rgba(56, 189, 248, 0.4)',
        cardShadow: '0 8px 32px rgba(0, 168, 255, 0.35)',
      };
    } else {
      return {
        globeImage: '//unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
        bumpImage: '//unpkg.com/three-globe/example/img/earth-topology.png',
        atmosphereColor: '#0284c7',
        atmosphereAltitude: 0.14,
        hubRingColor: (t: number) => `rgba(217, 119, 6, ${1 - t})`,
        nodeRingColor: (t: number) => `rgba(2, 132, 199, ${1 - t})`,
        hqArcColors: ['#d97706', '#0284c7'],
        nodeArcColors: ['#0284c7', '#006399'],
        pointColor: (d: any) => (d.isHub ? '#d97706' : '#006399'),
        cardBg: 'rgba(255, 255, 255, 0.96)',
        cardBorder: 'rgba(2, 132, 199, 0.3)',
        cardShadow: '0 8px 32px rgba(2, 132, 199, 0.2)',
      };
    }
  }, [isDark]);

  // Arcs with theme-aware colors
  const arcsData = useMemo(() => {
    return BASE_ARCS.map((arc) => ({
      ...arc,
      color: arc.isHQ ? globeConfig.hqArcColors : globeConfig.nodeArcColors,
    }));
  }, [globeConfig]);

  // Expanding radar rings (larger radar for Vadodara HQ)
  const ringsData = useMemo(() => {
    return GLOBAL_NODES.map((node) => ({
      lat: node.lat,
      lng: node.lng,
      isHub: node.isHub,
      maxR: node.isHub ? 6.5 : 3.8,
      propagationSpeed: node.isHub ? 2.5 : 1.8,
      repeatPeriod: node.isHub ? 900 : 1400,
    }));
  }, []);

  if (!mounted) {
    return (
      <div className={`w-full h-full min-h-[440px] flex items-center justify-center ${className}`}>
        <div className="w-10 h-10 rounded-full border-2 border-sky-400 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`w-full h-full min-h-[440px] relative flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing select-none ${className}`}
    >
      {/* Globe Controls Toolbar */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 sm:gap-2">
        <button
          type="button"
          onClick={focusVadodara}
          className="px-3 py-1.5 rounded-full text-[11px] font-mono font-semibold flex items-center gap-1.5 backdrop-blur-md transition-all shadow-md bg-amber-500/15 border border-amber-500/40 text-amber-500 dark:text-amber-400 hover:bg-amber-500/25"
          title="Focus Central Command (Vadodara, India)"
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>Vadodara HQ</span>
        </button>

        {/* Zoom In Button */}
        <button
          type="button"
          onClick={handleZoomIn}
          className="p-1.5 rounded-full text-xs backdrop-blur-md transition-all shadow-md bg-surface/80 dark:bg-black/60 border border-outline-variant/30 text-on-surface hover:text-primary"
          title="Zoom In"
          aria-label="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        {/* Zoom Out Button */}
        <button
          type="button"
          onClick={handleZoomOut}
          className="p-1.5 rounded-full text-xs backdrop-blur-md transition-all shadow-md bg-surface/80 dark:bg-black/60 border border-outline-variant/30 text-on-surface hover:text-primary"
          title="Zoom Out"
          aria-label="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        {/* Auto-Rotation Toggle */}
        <button
          type="button"
          onClick={toggleRotation}
          className="p-1.5 rounded-full text-xs backdrop-blur-md transition-all shadow-md bg-surface/80 dark:bg-black/60 border border-outline-variant/30 text-on-surface hover:text-primary"
          title="Toggle Auto-Rotation"
          aria-label="Toggle Auto-Rotation"
        >
          <RotateCw className={`w-4 h-4 ${isAutoRotating ? 'animate-spin-slow' : ''}`} />
        </button>
      </div>

      <Globe
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl={globeConfig.globeImage}
        bumpImageUrl={globeConfig.bumpImage}
        atmosphereColor={globeConfig.atmosphereColor}
        atmosphereAltitude={globeConfig.atmosphereAltitude}

        // 1. Glowing 3D Node Points
        pointsData={GLOBAL_NODES}
        pointLat="lat"
        pointLng="lng"
        pointColor={globeConfig.pointColor}
        pointAltitude={(d: any) => (d.isHub ? 0.05 : 0.025)}
        pointRadius="size"
        pointResolution={28}
        pointsMerge={false}
        pointLabel={(d: any) => `
          <div style="background: ${globeConfig.cardBg}; border: 1px solid ${d.isHub ? '#f59e0b' : globeConfig.cardBorder}; padding: 10px 14px; border-radius: 10px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: ${isDark ? '#fff' : '#0f172a'}; box-shadow: ${globeConfig.cardShadow}; min-width: 200px; backdrop-filter: blur(12px);">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
              <span style="color: ${d.isHub ? '#f59e0b' : '#38bdf8'}; font-weight: bold; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em;">
                ${d.isHub ? '🏛️ GLOBAL HEADQUARTERS' : '⚡ REGIONAL NODE'}
              </span>
              <span style="font-size: 9px; font-family: monospace; color: #10b981; font-weight: bold;">
                ${d.latency}
              </span>
            </div>
            <div style="font-size: 13px; font-weight: bold; margin-bottom: 2px;">
              ${d.name}
            </div>
            <div style="font-size: 11px; opacity: 0.8; margin-bottom: 6px;">
              📍 ${d.city}, ${d.country}
            </div>
            <div style="display: flex; align-items: center; gap: 6px; font-size: 9px; font-family: monospace; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 6px; color: ${d.isHub ? '#fbbf24' : '#38bdf8'};">
              <span>● ${d.status}</span>
              <span>•</span>
              <span>${d.tier}</span>
            </div>
          </div>
        `}

        // 2. Pulse Radar Sonar Rings
        ringsData={ringsData}
        ringLat="lat"
        ringLng="lng"
        ringColor={(d: any) => (d.isHub ? globeConfig.hubRingColor : globeConfig.nodeRingColor)}
        ringMaxRadius="maxR"
        ringPropagationSpeed="propagationSpeed"
        ringRepeatPeriod="repeatPeriod"

        // 3. Cyber Laser Transmission Arcs
        arcsData={arcsData}
        arcStartLat="startLat"
        arcStartLng="startLng"
        arcEndLat="endLat"
        arcEndLng="endLng"
        arcColor="color"
        arcAltitude={(d: any) => (d.isHQ ? 0.32 : 0.22)}
        arcStroke={(d: any) => (d.isHQ ? 2.2 : 1.4)}
        arcDashLength={0.4}
        arcDashGap={1.8}
        arcDashInitialGap={() => Math.random() * 2}
        arcDashAnimateTime={2200}
      />
    </div>
  );
}
