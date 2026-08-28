'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function DribbbleSentinelHero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Smooth spring physics for mouse parallax on desktop
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 22, stiffness: 160, mass: 0.8 };
  const lampSwing = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), springConfig);
  const transX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), springConfig);
  const transY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[480px] sm:max-w-[540px] h-[520px] sm:h-[560px] mx-auto flex flex-col items-center justify-between select-none pt-0 pb-4"
      style={{ perspective: '1200px' }}
    >
      {/* 1. Hanging Pendant Studio Lamp Fixture with continuous ambient sway */}
      <motion.div
        animate={{
          rotate: [-3, 3, -3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ transformOrigin: 'top center' }}
        className="relative z-30 flex flex-col items-center pointer-events-none"
      >
        {/* Hanging Cord */}
        <div className="w-[2px] h-16 sm:h-20 bg-gradient-to-b from-slate-900 via-slate-700 to-slate-500 dark:from-slate-800 dark:via-slate-600 dark:to-slate-400 shadow-sm" />

        {/* Lamp Cone Shade */}
        <div className="relative flex flex-col items-center -mt-0.5">
          {/* Socket Mount */}
          <div className="w-3.5 h-2 bg-slate-800 dark:bg-slate-700 rounded-t-sm" />

          {/* Cone Shade Body */}
          <div
            className="w-14 h-7 bg-gradient-to-b from-slate-800 via-slate-700 to-slate-900 dark:from-slate-700 dark:via-slate-800 dark:to-black rounded-b-lg border border-slate-600/40 shadow-xl flex items-end justify-center overflow-hidden"
            style={{
              clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
            }}
          />

          {/* Emissive Light Bulb Source */}
          <div className="w-8 h-2.5 bg-white dark:bg-cyan-100 rounded-full shadow-[0_0_20px_#00a8ff,0_0_35px_#38bdf8] -mt-1 z-20" />
        </div>

        {/* Soft Ambient Downward Illumination Halo */}
        <div
          className="absolute top-16 sm:top-20 w-[360px] sm:w-[440px] h-[360px] rounded-full pointer-events-none -z-10"
          style={{
            background: 'radial-gradient(circle at 50% 20%, rgba(0, 168, 255, 0.18) 0%, rgba(0, 168, 255, 0.05) 50%, transparent 70%)',
            filter: 'blur(30px)',
            opacity: 0.85,
          }}
        />
      </motion.div>

      {/* 2. Suspended Metallic Eagle Emblem (Smooth continuous float on mobile + mouse parallax on desktop) */}
      <motion.div
        animate={{
          y: [0, -12, 0],
          rotateZ: [-1, 1, -1],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative z-20 w-64 h-64 sm:w-76 sm:h-76 md:w-84 md:h-84 flex items-center justify-center cursor-pointer group my-auto -mt-6"
      >
        <div className="relative w-[85%] h-[85%]">
          {/* Top Metallic Specular Gleam */}
          <div className="absolute -top-3 inset-x-8 h-10 bg-gradient-to-b from-white/40 to-transparent blur-md rounded-full pointer-events-none z-10" />

          {/* High-Resolution Metallic Eagle Logo */}
          <Image
            src="/images/logo-light.png"
            alt="VayuX Systems Sentinel Eagle Logo"
            fill
            priority
            sizes="(max-width: 768px) 320px, 360px"
            className="object-contain filter drop-shadow-[0_12px_24px_rgba(0,99,153,0.25)] dark:drop-shadow-[0_16px_35px_rgba(0,229,255,0.45)] group-hover:scale-105 transition-transform duration-500"
          />

          {/* Cyber Eye Laser Core */}
          <div className="absolute top-[35%] left-[51.5%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 dark:bg-cyan-300 shadow-[0_0_12px_#00e5ff] animate-ping" />
            <span className="absolute w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
          </div>
        </div>
      </motion.div>

      {/* 3. Natural Soft Ground Contact Shadow (Synchronized breathing animation) */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center pointer-events-none mt-auto pb-2">
        <motion.div
          animate={{
            scale: [1, 0.84, 1],
            opacity: [0.65, 0.35, 0.65],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-48 sm:w-56 md:w-64 h-5 bg-slate-900/20 dark:bg-black/90 blur-lg rounded-[100%]"
        />
      </div>
    </div>
  );
}
