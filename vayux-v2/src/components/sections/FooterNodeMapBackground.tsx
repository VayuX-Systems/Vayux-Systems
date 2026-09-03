'use client';

import React, { useMemo } from 'react';
import { geoEqualEarth, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import type { FeatureCollection } from 'geojson';
import type { Topology } from 'topojson-specification';
import worldMap from 'world-atlas/countries-110m.json';

const nodes = [
  { id: 'vadodara', name: 'Vadodara HQ', coordinates: [73.18, 22.31] as [number, number], hub: true },
  { id: 'london', name: 'London', coordinates: [-0.12, 51.5] as [number, number] },
  { id: 'reykjavik', name: 'Reykjavik', coordinates: [-21.94, 64.15] as [number, number] },
  { id: 'newyork', name: 'New York', coordinates: [-74, 40.71] as [number, number] },
  { id: 'ottawa', name: 'Ottawa', coordinates: [-75.7, 45.42] as [number, number] },
  { id: 'sanfrancisco', name: 'San Francisco', coordinates: [-122.42, 37.77] as [number, number] },
  { id: 'saopaulo', name: 'São Paulo', coordinates: [-46.63, -23.55] as [number, number] },
  { id: 'berlin', name: 'Berlin', coordinates: [13.4, 52.52] as [number, number] },
  { id: 'stockholm', name: 'Stockholm', coordinates: [18.07, 59.33] as [number, number] },
  { id: 'dubai', name: 'Dubai', coordinates: [55.27, 25.2] as [number, number] },
  { id: 'tokyo', name: 'Tokyo', coordinates: [139.69, 35.68] as [number, number] },
  { id: 'singapore', name: 'Singapore', coordinates: [103.82, 1.35] as [number, number] },
  { id: 'sydney', name: 'Sydney', coordinates: [151.21, -33.87] as [number, number] },
  { id: 'mumbai', name: 'Mumbai', coordinates: [72.88, 19.07] as [number, number] },
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

export default function FooterNodeMapBackground() {
  const width = 1200;
  const height = 580;

  const { countries, projection, pathGenerator } = useMemo(() => {
    const topology = worldMap as unknown as Topology<{
      countries: {
        type: 'GeometryCollection';
        geometries: any[];
      };
    }>;

    const world = feature(topology, topology.objects.countries) as unknown as FeatureCollection;

    const projection = geoEqualEarth().fitExtent(
      [
        [20, 20],
        [width - 20, height - 20],
      ],
      world
    );

    const pathGenerator = geoPath(projection);

    return { countries: world.features, projection, pathGenerator };
  }, [width, height]);

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
    () => Object.fromEntries(projectedNodes.map((node) => [node.id, node])),
    [projectedNodes]
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none flex items-center justify-center opacity-30 sm:opacity-[0.56] dark:opacity-20 dark:sm:opacity-35 [mask-image:radial-gradient(ellipse_85%_75%_at_50%_45%,#000_30%,transparent_92%)]">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full max-w-[1600px] object-contain"
        aria-hidden="true"
      >
        {/* Subtle Coordinate Graticule */}
        <g fill="none" stroke="currentColor" className="text-slate-400/25 dark:text-slate-500/20" strokeWidth="0.5">
          <ellipse cx={width / 2} cy={height / 2} rx={width * 0.44} ry={height * 0.38} />
          <ellipse cx={width / 2} cy={height / 2} rx={width * 0.28} ry={height * 0.38} />
          <line x1={width * 0.08} y1={height * 0.3} x2={width * 0.92} y2={height * 0.3} strokeDasharray="3 6" />
          <line x1={width * 0.06} y1={height * 0.5} x2={width * 0.94} y2={height * 0.5} strokeDasharray="3 6" />
          <line x1={width * 0.08} y1={height * 0.7} x2={width * 0.92} y2={height * 0.7} strokeDasharray="3 6" />
        </g>

        {/* Continents (D3 Geo TopoJSON - Subtle Watermark Accent) */}
        <g>
          {countries.map((country, index) => {
            const d = pathGenerator(country);
            if (!d) return null;
            return (
              <path
                key={`footer-country-${index}`}
                d={d}
                className="fill-slate-200/80 dark:fill-slate-700/40 stroke-slate-300/70 dark:stroke-slate-600/30"
                strokeWidth="0.75"
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </g>

        {/* Telemetry Links */}
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
            const curveHeight = Math.min(90, Math.max(26, distance * 0.13));
            const cx = Number(((x1 + x2) / 2).toFixed(2));
            const cy = Number((Math.min(y1, y2) - curveHeight).toFixed(2));

            const path = `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
            const pathId = `footer-link-${index}`;
            const isHub = Boolean(start.hub || end.hub);

            return (
              <g key={`footer-link-${from}-${to}`}>
                <path id={pathId} d={path} fill="none" stroke="none" />
                <path
                  d={path}
                  stroke={isHub ? '#d97706' : '#0284c7'}
                  strokeWidth={isHub ? 1.2 : 0.8}
                  strokeOpacity={isHub ? 0.55 : 0.35}
                />
                <circle r={isHub ? 2.2 : 1.6} fill={isHub ? '#d97706' : '#0284c7'}>
                  <animateMotion
                    dur={`${3.5 + (index % 4) * 0.4}s`}
                    begin={`${(index % 5) * 0.6}s`}
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

        {/* Nodes */}
        {projectedNodes.map((node) => {
          const x = Number(node.point[0].toFixed(2));
          const y = Number(node.point[1].toFixed(2));
          return (
            <g key={`footer-node-${node.id}`}>
              {/* Ripple Ring */}
              <circle
                cx={x}
                cy={y}
                r={node.hub ? 12 : 6}
                fill="none"
                stroke={node.hub ? '#d97706' : '#0284c7'}
                strokeWidth="1"
                strokeOpacity="0.4"
                className="animate-ping"
                style={{
                  transformOrigin: `${x}px ${y}px`,
                  animationDuration: node.hub ? '2.5s' : '4s',
                }}
              />
              {/* Dot */}
              <circle
                cx={x}
                cy={y}
                r={node.hub ? 4 : 2}
                fill={node.hub ? '#f59e0b' : '#0284c7'}
                stroke="#ffffff"
                strokeWidth="1"
              />
              {/* Vadodara Anchor Label */}
              {node.hub && (
                <g>
                  <circle cx={x} cy={y} r="7" fill="#f59e0b" fillOpacity="0.2" />
                  <text
                    x={x}
                    y={y + 15}
                    textAnchor="middle"
                    fill="#f59e0b"
                    fontSize="8.5"
                    fontFamily="monospace"
                    fontWeight="700"
                    letterSpacing="0.08em"
                    opacity="0.9"
                  >
                    VADODARA HQ
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
