'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Shield, Zap, Crosshair } from 'lucide-react';

interface Threat {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  tail: { x: number; y: number }[];
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  alpha: number;
}

interface LaserArc {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  alpha: number;
  color: string;
}

interface ImpactRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

export default function EagleDefenseScene({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shieldPulse, setShieldPulse] = useState(false);
  const [neutralizedCount, setNeutralizedCount] = useState(382);
  const [systemStatus, setSystemStatus] = useState('INTERCEPTING');

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = container.clientWidth || 500);
    let height = (canvas.height = container.clientHeight || 500);

    const handleResize = () => {
      if (!canvas || !container) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const threats: Threat[] = [];
    const particles: Particle[] = [];
    const lasers: LaserArc[] = [];
    const ripples: ImpactRipple[] = [];

    let lastThreatSpawn = 0;

    const spawnThreat = () => {
      const centerX = width / 2;
      const centerY = height / 2;

      // Spawn from random angle around outer edge
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.max(width, height) * 0.52 + 30;
      const spawnX = centerX + Math.cos(angle) * distance;
      const spawnY = centerY + Math.sin(angle) * distance;

      const speed = 2.2 + Math.random() * 2.2;
      const dx = centerX - spawnX;
      const dy = centerY - spawnY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Malicious attack colors: bright crimson, neon red, fiery orange
      const colors = ['#ff0055', '#ff2a5f', '#ff3b30', '#ff5500', '#ff0033'];
      const color = colors[Math.floor(Math.random() * colors.length)];

      threats.push({
        id: Math.random(),
        x: spawnX,
        y: spawnY,
        vx: (dx / dist) * speed,
        vy: (dy / dist) * speed,
        size: 3.5 + Math.random() * 2,
        color,
        tail: [],
      });
    };

    const triggerShieldImpact = (x: number, y: number, color = '#00a8ff') => {
      ripples.push({
        x,
        y,
        radius: 4,
        maxRadius: 30 + Math.random() * 20,
        alpha: 1,
        color,
      });

      // Spawn explosion sparks
      for (let i = 0; i < 14; i++) {
        const pAngle = Math.random() * Math.PI * 2;
        const pSpeed = 2 + Math.random() * 4;
        particles.push({
          x,
          y,
          vx: Math.cos(pAngle) * pSpeed,
          vy: Math.sin(pAngle) * pSpeed,
          life: 0,
          maxLife: 20 + Math.random() * 15,
          size: 1.5 + Math.random() * 2,
          color: Math.random() > 0.5 ? '#40c2fd' : '#00a8ff',
          alpha: 1,
        });
      }

      setNeutralizedCount((c) => c + 1);
      setShieldPulse(true);
      setTimeout(() => setShieldPulse(false), 180);
    };

    const triggerWingLaser = (targetX: number, targetY: number) => {
      const centerX = width / 2;
      const centerY = height / 2;

      // Wing origins
      const isLeft = targetX < centerX;
      const startX = centerX + (isLeft ? -45 : 45);
      const startY = centerY - 15;

      lasers.push({
        startX,
        startY,
        endX: targetX,
        endY: targetY,
        alpha: 1,
        color: '#00a8ff',
      });
    };

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const shieldRadius = Math.min(width, height) * 0.3 + 10;

      // Spawn threat periodically
      if (time - lastThreatSpawn > 420) {
        spawnThreat();
        lastThreatSpawn = time;
      }

      // Draw Sentinel Radar Rings
      ctx.save();
      ctx.strokeStyle = 'rgba(0, 168, 255, 0.12)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, shieldRadius * 1.2, 0, Math.PI * 2);
      ctx.arc(centerX, centerY, shieldRadius * 1.5, 0, Math.PI * 2);
      ctx.stroke();

      // Radar scanning beam
      const scanAngle = (time * 0.0012) % (Math.PI * 2);
      const scanX = centerX + Math.cos(scanAngle) * shieldRadius * 1.5;
      const scanY = centerY + Math.sin(scanAngle) * shieldRadius * 1.5;
      const scanGrad = ctx.createLinearGradient(centerX, centerY, scanX, scanY);
      scanGrad.addColorStop(0, 'rgba(64, 194, 253, 0.25)');
      scanGrad.addColorStop(1, 'rgba(64, 194, 253, 0)');
      ctx.fillStyle = scanGrad;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, shieldRadius * 1.5, scanAngle - 0.3, scanAngle);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Update & Draw Incoming Threats
      for (let i = threats.length - 1; i >= 0; i--) {
        const t = threats[i];
        t.x += t.vx;
        t.y += t.vy;

        t.tail.push({ x: t.x, y: t.y });
        if (t.tail.length > 7) t.tail.shift();

        // Threat tail trail
        ctx.beginPath();
        for (let j = 0; j < t.tail.length; j++) {
          const pt = t.tail[j];
          if (j === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.strokeStyle = t.color;
        ctx.lineWidth = t.size * 0.8;
        ctx.globalAlpha = 0.6;
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Threat projectile head
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.size, 0, Math.PI * 2);
        ctx.fillStyle = t.color;
        ctx.shadowColor = t.color;
        ctx.shadowBlur = 14;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Check proximity to Sentinel Shield
        const dist = Math.hypot(t.x - centerX, t.y - centerY);

        // Pre-emptive Counter-Laser Interception
        if (dist < shieldRadius * 1.3 && dist > shieldRadius && Math.random() < 0.12) {
          triggerWingLaser(t.x, t.y);
          triggerShieldImpact(t.x, t.y, '#00a8ff');
          threats.splice(i, 1);
          continue;
        }

        // Shield Collision Impact
        if (dist <= shieldRadius) {
          triggerWingLaser(t.x, t.y);
          triggerShieldImpact(t.x, t.y, t.color);
          threats.splice(i, 1);
        }
      }

      // Draw Glowing Sentinel Shield Barrier
      ctx.save();
      const pulsingShield = shieldRadius + Math.sin(time * 0.005) * 3;

      // Shield Aura
      const shieldGlow = ctx.createRadialGradient(
        centerX,
        centerY,
        pulsingShield - 20,
        centerX,
        centerY,
        pulsingShield + 25
      );
      shieldGlow.addColorStop(0, 'rgba(64, 194, 253, 0)');
      shieldGlow.addColorStop(0.7, 'rgba(0, 168, 255, 0.2)');
      shieldGlow.addColorStop(1, 'rgba(64, 194, 253, 0)');
      ctx.fillStyle = shieldGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, pulsingShield + 25, 0, Math.PI * 2);
      ctx.fill();

      // Crystalline Hexagonal Ring
      ctx.strokeStyle = 'rgba(0, 168, 255, 0.6)';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#00a8ff';
      ctx.shadowBlur = 16;
      ctx.beginPath();
      const sides = 12;
      for (let s = 0; s <= sides; s++) {
        const sAngle = (s * Math.PI * 2) / sides + time * 0.0004;
        const hx = centerX + Math.cos(sAngle) * pulsingShield;
        const hy = centerY + Math.sin(sAngle) * pulsingShield;
        if (s === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.restore();

      // Draw Counter-Lasers
      for (let i = lasers.length - 1; i >= 0; i--) {
        const l = lasers[i];
        l.alpha -= 0.1;
        if (l.alpha <= 0) {
          lasers.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.strokeStyle = `rgba(0, 168, 255, ${l.alpha})`;
        ctx.lineWidth = 3.5;
        ctx.shadowColor = '#00a8ff';
        ctx.shadowBlur = 18;
        ctx.beginPath();
        ctx.moveTo(l.startX, l.startY);
        ctx.lineTo(l.endX, l.endY);
        ctx.stroke();

        ctx.strokeStyle = `rgba(255, 255, 255, ${l.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(l.startX, l.startY);
        ctx.lineTo(l.endX, l.endY);
        ctx.stroke();
        ctx.restore();
      }

      // Draw Impact Shockwave Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 2.5;
        r.alpha -= 0.045;
        if (r.alpha <= 0 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.strokeStyle = `rgba(64, 194, 253, ${r.alpha})`;
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#40c2fd';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // Draw Sparks
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        p.alpha = 1 - p.life / p.maxLife;

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Click to trigger EMP burst
  const handleEmpClick = (e: React.MouseEvent) => {
    setShieldPulse(true);
    setTimeout(() => setShieldPulse(false), 300);
    setNeutralizedCount((c) => c + 4);
    setSystemStatus('EMP DEFENSE BURST');
    setTimeout(() => setSystemStatus('INTERCEPTING'), 1200);
  };

  return (
    <div
      ref={containerRef}
      onClick={handleEmpClick}
      className={`relative w-full aspect-square max-w-[540px] mx-auto rounded-3xl p-6 glass-panel flex items-center justify-center overflow-hidden cursor-crosshair group shadow-[0_20px_60px_rgba(0,168,255,0.12)] border border-primary/20 ${className}`}
      title="Click anywhere to trigger Sentinel EMP Defense Burst"
    >
      {/* Real-time Defense Simulation Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto z-0"
      />

      {/* Center Eagle Guardian Emblem (Exact Company Logo) */}
      <div className="relative z-10 flex flex-col items-center justify-center pointer-events-none">
        {/* Core Halo Glow */}
        <div
          className={`absolute w-48 h-48 sm:w-64 sm:h-64 rounded-full transition-all duration-300 pointer-events-none ${
            shieldPulse
              ? 'bg-primary-container/40 blur-[60px] scale-125'
              : 'bg-primary/20 blur-[70px] scale-100'
          }`}
        />

        {/* High-Resolution Metallic Eagle Logo */}
        <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 flex items-center justify-center">
          <div
            className={`relative w-full h-full transition-transform duration-300 ease-out transform ${
              shieldPulse
                ? 'scale-110 drop-shadow-[0_0_40px_rgba(0,168,255,0.9)]'
                : 'group-hover:scale-105 drop-shadow-[0_0_25px_rgba(64,194,253,0.5)]'
            }`}
          >
            <Image
              src="/images/logo-light.png"
              alt="VayuX Eagle Sentinel"
              fill
              className="object-contain"
              priority
            />

            {/* Glowing Cyber Eye */}
            <div className="absolute top-[35%] left-[51%] w-2.5 h-2.5 rounded-full bg-[#00a8ff] blur-[1px] animate-pulse shadow-[0_0_10px_#00a8ff]" />
            <div className="absolute top-[35%] left-[51%] w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#ffffff]" />
          </div>
        </div>

        {/* Live HUD Defense Telemetry Banner */}
        <div className="mt-3 bg-surface/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-primary/30 flex items-center gap-3 shadow-md">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="font-[var(--font-heading)] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-primary">
              {systemStatus}
            </span>
          </div>
          <span className="text-outline-variant">|</span>
          <span className="font-[var(--font-heading)] text-[10px] sm:text-[11px] font-mono text-on-surface">
            Neutralized: <strong className="text-primary font-bold">{neutralizedCount}</strong>
          </span>
        </div>

        {/* Interactive Hint */}
        <div className="mt-2 text-[10px] font-[var(--font-heading)] uppercase tracking-wider text-on-surface-variant/70 flex items-center gap-1">
          <Zap className="w-3 h-3 text-primary" /> Click to fire EMP Defense Shockwave
        </div>
      </div>
    </div>
  );
}
