import React, { useState } from 'react';
import { PageId } from '../types';
import { LOOP_STAGES } from '../data/mockData';
import {
  GraduationCap,
  ShieldCheck,
  AlertTriangle,
  Search,
  FlaskConical,
  Radar,
  ArrowRight,
} from 'lucide-react';

interface VayuXLoopAnimationProps {
  className?: string;
  activeStage?: number;
  onSelectStage?: (stageIndex: number) => void;
  onNavigate?: (page: PageId) => void;
  interactive?: boolean;
}

export const VayuXLoopAnimation: React.FC<VayuXLoopAnimationProps> = ({
  className = 'w-full h-full',
  activeStage = 0,
  onSelectStage,
  onNavigate,
  interactive = true,
}) => {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [hoveredCenter, setHoveredCenter] = useState<boolean>(false);

  const isPaused = hoveredNode !== null || hoveredCenter;

  // 6 Orbital Nodes matching the user diagram layout
  // Positions calculated on radius = 38% around center (50%, 50%)
  const nodes = [
    {
      id: 'training',
      label: 'Training',
      stageIndex: 4, // Maps to Stage 05 (Security Training)
      icon: GraduationCap,
      pos: { left: '38%', top: '10%' },
      tooltipPos: 'bottom',
    },
    {
      id: 'grc',
      label: 'GRC',
      stageIndex: 5, // Maps to Stage 06 (GRC Recalibration)
      icon: ShieldCheck,
      pos: { left: '80%', top: '22%' },
      tooltipPos: 'left',
    },
    {
      id: 'threat',
      label: 'Threat',
      stageIndex: 0, // Maps to Stage 01 (Threat Detection)
      icon: AlertTriangle,
      pos: { left: '88%', top: '56%' },
      tooltipPos: 'left',
    },
    {
      id: 'dfir',
      label: 'DFIR',
      stageIndex: 1, // Maps to Stage 02 (DFIR Containment)
      icon: Search,
      pos: { left: '68%', top: '86%' },
      tooltipPos: 'top',
    },
    {
      id: 'rd-lab',
      label: 'R&D Lab',
      stageIndex: 2, // Maps to Stage 03 (R&D Lab Analysis)
      icon: FlaskConical,
      pos: { left: '26%', top: '80%' },
      tooltipPos: 'top',
    },
    {
      id: 'soc',
      label: 'SOC',
      stageIndex: 3, // Maps to Stage 04 (SOC Receives Rules)
      icon: Radar,
      pos: { left: '12%', top: '44%' },
      tooltipPos: 'right',
    },
  ];

  const handleNodeClick = (stageIndex: number) => {
    if (onSelectStage) {
      onSelectStage(stageIndex);
    }
  };

  const handleNavigateClick = (e: React.MouseEvent, route?: PageId) => {
    e.stopPropagation();
    if (onNavigate && route) {
      onNavigate(route);
    }
  };

  return (
    <div className={`relative flex items-center justify-center select-none aspect-square w-full max-w-[480px] mx-auto ${className}`}>
      {/* Background SVG Orbital Track */}
      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="orbitGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#0ea5e9" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.8" />
          </linearGradient>

          <filter id="trackGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient Outer Halo */}
        <circle
          cx="200"
          cy="200"
          r="152"
          stroke="#38bdf8"
          strokeWidth="1.5"
          strokeOpacity="0.2"
          className="animate-pulse"
        />

        {/* Clean Light-Blue Dotted/Dashed Orbit Ring */}
        <circle
          cx="200"
          cy="200"
          r="152"
          stroke="#93c5fd"
          strokeWidth="2.5"
          strokeDasharray="6 8"
          strokeOpacity="0.6"
        />

        {/* Flowing animated glowing particle along the orbit */}
        <circle cx="200" cy="48" fill="#38bdf8" r="4.5" filter="url(#trackGlow)">
          <animateMotion
            dur="8s"
            repeatCount="indefinite"
            path="M 0 0 A 152 152 0 1 1 0.0001 0"
          />
        </circle>

        {/* Secondary trailing particle */}
        <circle cx="200" cy="48" fill="#ffffff" r="3" opacity="0.85">
          <animateMotion
            dur="8s"
            begin="-4s"
            repeatCount="indefinite"
            path="M 0 0 A 152 152 0 1 1 0.0001 0"
          />
        </circle>
      </svg>

      {/* Center Circle: Vibrant Blue Gradient VAYUX Hub */}
      <div
        className="relative z-20 w-32 h-32 sm:w-36 sm:h-36 rounded-full flex flex-col items-center justify-center p-3 text-center cursor-pointer transition-all duration-300 transform hover:scale-105 group bg-gradient-to-br from-[#0284c7] via-[#0369a1] to-[#0c4a6e] border-2 border-[#38bdf8]/40 shadow-[0_0_35px_rgba(2,132,199,0.5),0_0_70px_rgba(56,189,248,0.25),inset_0_0_20px_rgba(0,0,0,0.4)]"
        onMouseEnter={() => setHoveredCenter(true)}
        onMouseLeave={() => setHoveredCenter(false)}
        onClick={() => onNavigate && onNavigate('services')}
      >
        {/* Subtle Ambient Shimmer */}
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.25)_0%,transparent_60%)] pointer-events-none" />

        {/* Watermark Logo Icon */}
        <img
          src="/logo.png"
          alt="VayuX"
          className="w-9 h-9 object-contain mb-1 rounded-full drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] transition-transform duration-300 group-hover:scale-110"
        />

        <div className="text-white font-extrabold tracking-wider text-base sm:text-lg drop-shadow-md leading-tight">
          VAYUX
        </div>

        <div className="text-[9px] sm:text-[10px] text-sky-100 font-medium tracking-tight opacity-90 leading-tight mt-0.5 max-w-[90px]">
          Continuous Cybersecurity
        </div>

        {/* Center Hover Tooltip - Positioned safely above the center hub */}
        {hoveredCenter && (
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-50 bg-[#0c161d]/95 text-left border border-[#38bdf8]/50 rounded-xl px-3 py-2 shadow-2xl backdrop-blur-md w-52 text-xs animate-in fade-in zoom-in-95 duration-200 pointer-events-auto">
            <div className="text-[var(--color-brand-light)] font-bold text-xs">
              VAYUX Continuous Loop
            </div>
            <p className="text-[10px] text-[var(--color-text-secondary)] leading-tight mt-0.5">
              Click to view all cybersecurity services
            </p>
          </div>
        )}
      </div>

      {/* Rotating Orbit Container for the 6 Node Badges */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none z-30"
        style={{
          animation: 'vayuxOrbitSpin 45s linear infinite',
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        {nodes.map((node, index) => {
          const stageData = LOOP_STAGES[node.stageIndex] || LOOP_STAGES[0];
          const isSelected = activeStage === node.stageIndex;
          const isHovered = hoveredNode === index;
          const IconComponent = node.icon;

          return (
            <div
              key={node.id}
              className={`absolute pointer-events-auto ${isHovered ? 'z-50' : 'z-20'}`}
              style={{
                left: node.pos.left,
                top: node.pos.top,
                animation: 'vayuxOrbitCounterSpin 45s linear infinite',
                animationPlayState: isPaused ? 'paused' : 'running',
              }}
              onMouseEnter={() => setHoveredNode(index)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              {/* Circular Floating White Card */}
              <div
                onClick={() => handleNodeClick(node.stageIndex)}
                className={`flex flex-col items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full transition-all duration-300 cursor-pointer shadow-lg select-none ${
                  isSelected
                    ? 'bg-white text-[#003736] scale-110 ring-4 ring-[#38bdf8] shadow-[0_0_25px_rgba(56,189,248,0.6)]'
                    : isHovered
                    ? 'bg-white text-[#0f172a] scale-110 shadow-[0_0_25px_rgba(14,124,123,0.5)]'
                    : 'bg-white/95 hover:bg-white text-[#0f172a] shadow-md border border-slate-200/80 hover:scale-105'
                }`}
              >
                {/* Node Icon */}
                <div className="text-[#0284c7] mb-0.5">
                  <IconComponent size={20} className="sm:w-[22px] sm:h-[22px]" />
                </div>

                {/* Node Label Text */}
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-800 tracking-tight leading-none text-center px-1">
                  {node.label}
                </span>
              </div>

              {/* Hover Tooltip / Definition Card with Top Elevation (z-50) */}
              {isHovered && (
                <div
                  className="absolute z-50 w-64 p-3.5 rounded-xl bg-[#081218]/98 backdrop-blur-xl border border-[var(--color-brand-light)]/60 shadow-[0_15px_35px_rgba(0,0,0,0.85)] text-left animate-in fade-in zoom-in-95 duration-150 pointer-events-auto top-full mt-2 left-1/2 -translate-x-1/2"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="text-xs font-bold text-white">
                      {stageData.title}
                    </div>
                    <span className="text-[10px] font-mono text-[var(--color-brand-light)] bg-[var(--color-brand-primary)]/30 px-1.5 py-0.5 rounded">
                      Stage {stageData.step}
                    </span>
                  </div>

                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-3 line-clamp-3">
                    {stageData.description}
                  </p>

                  {stageData.route && onNavigate && (
                    <button
                      onClick={(e) => handleNavigateClick(e, stageData.route)}
                      className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-[var(--color-brand-primary)]/40 hover:bg-[var(--color-brand-light)] hover:text-[#003736] text-[var(--color-brand-light)] text-[11px] font-semibold transition-all cursor-pointer group"
                    >
                      <span>Detailed Definition</span>
                      <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
