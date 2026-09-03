'use client';

import { useEffect, useState } from 'react';

export default function CyberBackgroundGrid() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Global Subtle Cyber Matrix Grid */}
      <div
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06] bg-[linear-gradient(to_right,#00a8ff_1px,transparent_1px),linear-gradient(to_bottom,#00a8ff_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_70%,transparent_100%)]"
      />

      {/* 2. Soft Ambient Radiant Glow Orbs (Palo Alto Style Deep Cyber Light) */}
      <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] rounded-full bg-sky-500/10 dark:bg-sky-500/10 blur-[150px] animate-pulse" style={{ animationDuration: '9s' }} />
      <div className="absolute top-[45%] right-[10%] w-[600px] h-[600px] rounded-full bg-primary/10 dark:bg-primary/12 blur-[170px] animate-pulse" style={{ animationDuration: '13s' }} />
      <div className="absolute top-[75%] left-[20%] w-[550px] h-[550px] rounded-full bg-cyan-500/10 dark:bg-cyan-500/10 blur-[160px] animate-pulse" style={{ animationDuration: '11s' }} />

      {/* 3. Floating HUD Tactical Badges / Micro Cyber Badges */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden">
          {/* Top Right HUD Node */}
          <div className="absolute top-[18%] right-[5%] hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-md border border-sky-500/15 dark:border-sky-400/20 bg-sky-500/5 dark:bg-sky-950/20 backdrop-blur-xs text-[10px] font-mono text-sky-600/50 dark:text-sky-400/50 tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
            <span>NODE_ARRAY // EUR-WEST-1</span>
          </div>

          {/* Mid Left Telemetry Indicator */}
          <div className="absolute top-[42%] left-[4%] hidden 2xl:flex flex-col gap-1 p-2.5 rounded-lg border border-primary/15 dark:border-primary/20 bg-primary/5 dark:bg-primary/10 backdrop-blur-xs text-[9px] font-mono text-primary/60 dark:text-primary/60">
            <div className="flex items-center gap-1.5 font-bold tracking-widest text-sky-500/70">
              <span className="w-1 h-1 rounded-full bg-emerald-400" />
              <span>HEURISTIC_PIPELINE: ACTIVE</span>
            </div>
            <div className="text-[8px] opacity-70 tracking-tight">CORRELATION_LATENCY &lt; 14.8ms</div>
          </div>

          {/* Lower Right Grid Crosshair Cluster */}
          <div className="absolute top-[68%] right-[7%] hidden xl:flex items-center gap-2 p-2 rounded border border-cyan-500/15 dark:border-cyan-400/20 bg-cyan-500/5 dark:bg-cyan-950/20 text-[9px] font-mono text-cyan-600/50 dark:text-cyan-400/50">
            <span className="text-cyan-500 font-bold">+</span>
            <span>GRID_SEC_COORD: 64.14°N / 21.94°W</span>
          </div>

          {/* Bottom Left Stream Status */}
          <div className="absolute bottom-[12%] left-[6%] hidden xl:flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/15 dark:border-sky-400/20 bg-sky-500/5 dark:bg-sky-950/20 text-[9px] font-mono text-sky-600/50 dark:text-sky-400/50">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>SOVEREIGN_COMPUTE // 0_LEAKAGE_VERIFIED</span>
          </div>
        </div>
      )}

      {/* 4. Subtle Animated Cyber Circuit Beams */}
      <div className="absolute inset-0 opacity-[0.12] dark:opacity-[0.22] overflow-hidden pointer-events-none">
        {/* Horizontal Moving Scan Line */}
        <div
          className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-400 to-transparent animate-[scan_14s_ease-in-out_infinite]"
        />

        {/* Diagonal Subtle Hex/Vector Guides */}
        <svg className="absolute w-full h-full text-sky-500/10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cyber-hex" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 80 20 L 80 60 L 40 80 L 0 60 L 0 20 Z" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cyber-hex)" opacity="0.4" />
        </svg>
      </div>
    </div>
  );
}
