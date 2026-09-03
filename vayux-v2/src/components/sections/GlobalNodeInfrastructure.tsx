'use client';

import { useMemo, useState, useRef } from 'react';
import {
  Activity,
  Lock,
  Shield,
  Zap,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from 'lucide-react';
import { geoEqualEarth, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import type { FeatureCollection } from 'geojson';
import type { Topology } from 'topojson-specification';
import worldMap from 'world-atlas/countries-110m.json';

type Node = {
  id: string;
  name: string;
  coordinates: [number, number];
  hub?: boolean;
};

const nodes: Node[] = [
  {
    id: 'vadodara',
    name: 'Vadodara HQ',
    coordinates: [73.18, 22.31],
    hub: true,
  },
  {
    id: 'london',
    name: 'London',
    coordinates: [-0.12, 51.5],
  },
  {
    id: 'reykjavik',
    name: 'Reykjavik',
    coordinates: [-21.94, 64.15],
  },
  {
    id: 'newyork',
    name: 'New York',
    coordinates: [-74, 40.71],
  },
  {
    id: 'ottawa',
    name: 'Ottawa',
    coordinates: [-75.7, 45.42],
  },
  {
    id: 'sanfrancisco',
    name: 'San Francisco',
    coordinates: [-122.42, 37.77],
  },
  {
    id: 'saopaulo',
    name: 'São Paulo',
    coordinates: [-46.63, -23.55],
  },
  {
    id: 'berlin',
    name: 'Berlin',
    coordinates: [13.4, 52.52],
  },
  {
    id: 'stockholm',
    name: 'Stockholm',
    coordinates: [18.07, 59.33],
  },
  {
    id: 'dubai',
    name: 'Dubai',
    coordinates: [55.27, 25.2],
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    coordinates: [139.69, 35.68],
  },
  {
    id: 'singapore',
    name: 'Singapore',
    coordinates: [103.82, 1.35],
  },
  {
    id: 'sydney',
    name: 'Sydney',
    coordinates: [151.21, -33.87],
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    coordinates: [72.88, 19.07],
  },
];

const links = [
  ['vadodara', 'london'],
  ['vadodara', 'tokyo'],
  ['vadodara', 'dubai'],
  ['vadodara', 'singapore'],
  ['vadodara', 'reykjavik'],
  ['vadodara', 'newyork'],
  ['vadodara', 'sydney'],
  ['vadodara', 'berlin'],
  ['london', 'newyork'],
  ['sanfrancisco', 'tokyo'],
  ['singapore', 'sydney'],
  ['newyork', 'ottawa'],
  ['newyork', 'saopaulo'],
  ['stockholm', 'reykjavik'],
];

const stats = [
  {
    label: 'THREAT SIGNALS',
    value: '2.4K',
    detail: '/ MIN',
    icon: Zap,
  },
  {
    label: 'TELEMETRY STREAMS',
    value: '98.7%',
    detail: 'HEALTH SCORE',
    icon: Activity,
  },
  {
    label: 'UPTIME',
    value: '99.99%',
    detail: 'GLOBAL SLA',
    icon: Shield,
  },
];

const footerItems = [
  { icon: Shield, label: 'Sovereign Infrastructure' },
  { icon: Zap, label: 'Low-Latency Links' },
  { icon: Lock, label: 'Encrypted Telemetry' },
  { icon: Activity, label: 'Autonomous Response' },
];

export default function GlobalNodeInfrastructure() {
  const width = 1000;
  const height = 500;

  const {
    countries,
    projection,
    pathGenerator,
  } = useMemo(() => {
    const topology =
      worldMap as unknown as Topology<{
        countries: {
          type: 'GeometryCollection';
          geometries: any[];
        };
      }>;

    const world = feature(
      topology,
      topology.objects.countries
    ) as unknown as FeatureCollection;

    const projection = geoEqualEarth().fitExtent(
      [
        [20, 20],
        [width - 20, height - 20],
      ],
      world
    );

    const pathGenerator = geoPath(projection);

    return {
      countries: world.features,
      projection,
      pathGenerator,
    };
  }, []);

  const projectedNodes = useMemo(() => {
    return nodes.map((node) => {
      const point = projection(node.coordinates);

      return {
        ...node,
        point: point ?? [0, 0],
      };
    });
  }, [projection]);

  const nodeMap = useMemo(
    () =>
      Object.fromEntries(
        projectedNodes.map((node) => [
          node.id,
          node,
        ])
      ),
    [projectedNodes]
  );

  // Zoom & Pan Interactive State
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(3.5, Number((prev + 0.4).toFixed(2))));
  };

  const handleZoomOut = () => {
    setZoom((prev) => {
      const next = Math.max(1, Number((prev - 0.4).toFixed(2)));
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  };

  const handleResetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoom <= 1) return;
    const maxPanX = (zoom - 1) * 350;
    const maxPanY = (zoom - 1) * 180;
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    setPan({
      x: Math.max(-maxPanX, Math.min(maxPanX, newX)),
      y: Math.max(-maxPanY, Math.min(maxPanY, newY)),
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleDoubleClick = () => {
    if (zoom > 1.4) {
      handleResetZoom();
    } else {
      setZoom(2.2);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey || zoom > 1) {
      e.preventDefault();
      const zoomDelta = -e.deltaY * 0.002;
      setZoom((prev) => {
        const next = Math.min(3.5, Math.max(1, Number((prev + zoomDelta).toFixed(2))));
        if (next === 1) setPan({ x: 0, y: 0 });
        return next;
      });
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 max-w-[1360px] mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-mono font-medium mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          SOVEREIGN ENCLAVES // 14 NODES ACTIVE
        </div>
        <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3 text-on-surface">
          Global Node Infrastructure
        </h2>
        <p className="font-[var(--font-body)] text-xs sm:text-sm md:text-base text-on-surface-variant font-normal leading-relaxed">
          Real-time telemetry and autonomous defense orchestrated from VayuX Global HQ (Vadodara, India) across 14 sovereign enclaves.
        </p>
      </div>

      {/* Executive Telemetry Metrics (Clean 3-Column Responsive Layout on Mobile & Desktop) */}
      <div className="grid grid-cols-3 gap-2 sm:gap-8 md:gap-12 mb-8 sm:mb-14 max-w-3xl mx-auto px-1 sm:px-4">
        {/* Metric 1: Threat Signals */}
        <div className="flex flex-col gap-0.5 sm:gap-1 text-center sm:text-left">
          <span className="font-mono text-[9px] sm:text-[11px] uppercase tracking-wider sm:tracking-widest text-slate-500 dark:text-slate-400 font-medium truncate">
            Threat Signals
          </span>
          <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-0.5 sm:gap-2 justify-center sm:justify-start whitespace-nowrap">
            <span className="font-[var(--font-heading)] text-lg sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight tabular-nums">
              2.4K
            </span>
            <span className="font-mono text-[9px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">
              / min
            </span>
          </div>
        </div>

        {/* Metric 2: Telemetry Streams */}
        <div className="flex flex-col gap-0.5 sm:gap-1 text-center sm:text-left border-l border-slate-200 dark:border-slate-800 pl-2 sm:pl-8 md:pl-12">
          <span className="font-mono text-[9px] sm:text-[11px] uppercase tracking-wider sm:tracking-widest text-slate-500 dark:text-slate-400 font-medium truncate">
            Telemetry
          </span>
          <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-0.5 sm:gap-2 justify-center sm:justify-start whitespace-nowrap">
            <span className="font-[var(--font-heading)] text-lg sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight tabular-nums">
              98.7%
            </span>
            <span className="font-mono text-[9px] sm:text-xs text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider">
              Health
            </span>
          </div>
        </div>

        {/* Metric 3: Uptime SLA */}
        <div className="flex flex-col gap-0.5 sm:gap-1 text-center sm:text-left border-l border-slate-200 dark:border-slate-800 pl-2 sm:pl-8 md:pl-12">
          <span className="font-mono text-[9px] sm:text-[11px] uppercase tracking-wider sm:tracking-widest text-slate-500 dark:text-slate-400 font-medium truncate">
            Uptime SLA
          </span>
          <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-0.5 sm:gap-2 justify-center sm:justify-start whitespace-nowrap">
            <span className="font-[var(--font-heading)] text-lg sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight tabular-nums">
              99.99%
            </span>
            <span className="font-mono text-[9px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">
              Global
            </span>
          </div>
        </div>
      </div>

      {/* Seamless World Map (Directly on Page Canvas — Zero Heavy Dark Box) */}
      <div
        ref={mapContainerRef}
        className={`relative w-full overflow-hidden select-none py-2 rounded-2xl ${
          zoom > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onDoubleClick={handleDoubleClick}
        onWheel={handleWheel}
      >
        {/* Floating Zoom & Pan Controls */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 p-1 rounded-xl bg-surface-container-lowest/80 dark:bg-slate-900/80 border border-outline-variant/30 backdrop-blur-md shadow-sm">
          <button
            onClick={handleZoomIn}
            disabled={zoom >= 3.5}
            className="p-1.5 rounded-lg hover:bg-surface-container-high dark:hover:bg-slate-800 text-on-surface-variant hover:text-on-surface transition-colors disabled:opacity-30 cursor-pointer"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            disabled={zoom <= 1}
            className="p-1.5 rounded-lg hover:bg-surface-container-high dark:hover:bg-slate-800 text-on-surface-variant hover:text-on-surface transition-colors disabled:opacity-30 cursor-pointer"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          {zoom > 1 && (
            <button
              onClick={handleResetZoom}
              className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-surface-container-high dark:hover:bg-slate-800 text-on-surface-variant hover:text-on-surface transition-colors text-[10px] font-mono font-medium cursor-pointer"
              title="Reset Zoom"
              aria-label="Reset Zoom"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          )}
          <span className="text-[10px] font-mono text-on-surface-variant px-1.5 font-medium select-none">
            {Math.round(zoom * 100)}%
          </span>
        </div>

        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto"
          role="img"
          aria-label="VayuX Global Network Telemetry Map"
        >
          <g
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: `${width / 2}px ${height / 2}px`,
              transition: isDragging ? 'none' : 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Subtle Coordinate Lines */}
          <g fill="none" stroke="currentColor" className="text-slate-400/45 dark:text-slate-500/25" strokeWidth="0.75">
            <ellipse cx={width / 2} cy={height / 2} rx={width * 0.44} ry={height * 0.38} />
            <ellipse cx={width / 2} cy={height / 2} rx={width * 0.28} ry={height * 0.38} />
            <line x1={width * 0.08} y1={height * 0.30} x2={width * 0.92} y2={height * 0.30} strokeDasharray="3 6" />
            <line x1={width * 0.06} y1={height * 0.50} x2={width * 0.94} y2={height * 0.50} strokeDasharray="3 6" />
            <line x1={width * 0.08} y1={height * 0.70} x2={width * 0.92} y2={height * 0.70} strokeDasharray="3 6" />
          </g>

          {/* D3 Geographic TopoJSON Continents (High Contrast in Both Light and Dark Mode) */}
          <g>
            {countries.map((country, index) => {
              const d = pathGenerator(country);
              if (!d) return null;

              return (
                <path
                  key={`country-${index}`}
                  d={d}
                  className="fill-slate-300/95 dark:fill-slate-800/80 stroke-slate-400 dark:stroke-slate-700/70 transition-colors duration-300 hover:fill-slate-400/90 dark:hover:fill-slate-700"
                  strokeWidth="1.1"
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}
          </g>

          {/* Telemetry Links (Bezier Arcs with Animated Traveling Packets) */}
          <g fill="none" strokeLinecap="round">
            {links.map(([from, to], index) => {
              const start = nodeMap[from];
              const end = nodeMap[to];
              if (!start || !end) return null;

              const x1 = Number(start.point[0].toFixed(2));
              const y1 = Number(start.point[1].toFixed(2));
              const x2 = Number(end.point[0].toFixed(2));
              const y2 = Number(end.point[1].toFixed(2));
              const distance = Math.abs(x2 - x1);
              const curveHeight = Math.min(80, Math.max(24, distance * 0.12));
              const cx = Number(((x1 + x2) / 2).toFixed(2));
              const cy = Number((Math.min(y1, y2) - curveHeight).toFixed(2));

              const path = `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
              const pathId = `link-path-${index}`;
              const isHub = Boolean(start.hub || end.hub);

              return (
                <g key={`${from}-${to}`}>
                  <path id={pathId} d={path} fill="none" stroke="none" />

                  {/* Base arc line */}
                  <path
                    d={path}
                    stroke={isHub ? '#d97706' : '#0284c7'}
                    strokeWidth={isHub ? 1.8 : 1.2}
                    strokeOpacity={isHub ? 0.85 : 0.65}
                  />

                  {/* Traveling light particle */}
                  <circle
                    r={isHub ? 3.2 : 2.4}
                    fill={isHub ? '#d97706' : '#0284c7'}
                  >
                    <animateMotion
                      dur={`${3.0 + (index % 4) * 0.4}s`}
                      begin={`${(index % 5) * 0.5}s`}
                      repeatCount="indefinite"
                      rotate="auto"
                    >
                      <mpath href={`#${pathId}`} />
                    </animateMotion>
                  </circle>
                </g>
              );
            })}
          </g>

          {/* Network Nodes */}
          {projectedNodes.map((node) => {
            const x = Number(node.point[0].toFixed(2));
            const y = Number(node.point[1].toFixed(2));

            return (
              <g key={node.id}>
                {/* Concentric Pulse Ring */}
                <circle
                  cx={x}
                  cy={y}
                  r={node.hub ? 13 : 7}
                  fill="none"
                  stroke={node.hub ? '#d97706' : '#0284c7'}
                  strokeWidth="1.2"
                  strokeOpacity="0.7"
                  className="animate-ping"
                  style={{
                    transformOrigin: `${x}px ${y}px`,
                    animationDuration: node.hub ? '2.5s' : '3.5s',
                  }}
                />

                {/* Node Center Dot */}
                <circle
                  cx={x}
                  cy={y}
                  r={node.hub ? 5 : 3}
                  fill={node.hub ? '#d97706' : '#0284c7'}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />

                {/* Vadodara HQ Badge */}
                {node.hub && (
                  <g>
                    <rect
                      x={x - 58}
                      y={y + 12}
                      width="116"
                      height="24"
                      rx="12"
                      className="fill-white dark:fill-slate-900 shadow-md"
                      stroke="#d97706"
                      strokeWidth="1.5"
                    />
                    <circle cx={x - 46} cy={y + 24} r="3" fill="#d97706" />
                    <text
                      x={x + 3}
                      y={y + 27.5}
                      textAnchor="middle"
                      fill="#b45309"
                      fontSize="9.5"
                      fontFamily="monospace"
                      fontWeight="700"
                      letterSpacing="0.08em"
                    >
                      VADODARA HQ
                    </text>
                  </g>
                )}
              </g>
            );
          })}
          </g>
        </svg>
      </div>

      {/* Clean Bottom Feature Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-outline-variant/20 max-w-4xl mx-auto">
        {footerItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="flex items-center justify-start sm:justify-center gap-2 p-2 sm:p-2.5 rounded-lg text-on-surface-variant font-medium text-[11px] sm:text-xs"
            >
              <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0" />
              <span className="truncate">{item.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
