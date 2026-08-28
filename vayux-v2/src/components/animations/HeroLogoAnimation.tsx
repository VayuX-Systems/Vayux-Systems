'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment, PerspectiveCamera } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

interface MousePos {
  x: number;
  y: number;
}

/**
 * Premium 3D Dribbble-style Logo Animation
 * Features: Real 3D depth, floating physics, metallic materials, particle aura
 */

function LogoMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const [mousePos, setMousePos] = useState<MousePos>({ x: 0, y: 0 });

  // Handle mouse movement for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();

    // Primary rotation with smooth animation
    groupRef.current.rotation.y += 0.003;
    groupRef.current.rotation.x = Math.sin(time * 0.3) * 0.15;

    // Mouse-based subtle tilt
    groupRef.current.rotation.y += mousePos.x * 0.08;
    groupRef.current.rotation.x += mousePos.y * 0.08;

    // Gentle floating bob
    groupRef.current.position.y = Math.sin(time * 0.5) * 0.3;
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.4}>
      <group ref={groupRef}>
        {/* Central Hexagonal Core - Premium Finish */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[1.2, 1.2, 0.15, 6]} />
          <meshStandardMaterial
            color="#00a8ff"
            metalness={0.95}
            roughness={0.1}
            emissive="#0088dd"
            emissiveIntensity={0.8}
          />
        </mesh>

        {/* Inner Rotating Ring */}
        <mesh rotation={[0, 0, 0]} position={[0, 0, 0.08]}>
          <torusGeometry args={[1.35, 0.08, 8, 100]} />
          <meshStandardMaterial
            color="#40c2fd"
            metalness={0.9}
            roughness={0.15}
            emissive="#00a8ff"
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Outer Counter-Rotating Ring */}
        <mesh rotation={[0, Math.PI / 6, 0]} position={[0, 0, -0.08]}>
          <torusGeometry args={[1.65, 0.06, 8, 100]} />
          <meshStandardMaterial
            color="#95ccff"
            metalness={0.85}
            roughness={0.2}
            emissive="#40c2fd"
            emissiveIntensity={0.4}
          />
        </mesh>

        {/* V-Chevron Left Wing */}
        <mesh position={[-0.6, 0.15, 0]} rotation={[0, 0, Math.PI / 8]}>
          <boxGeometry args={[0.5, 1.2, 0.12]} />
          <meshStandardMaterial
            color="#c0c0c0"
            metalness={0.92}
            roughness={0.12}
            emissive="#00a8ff"
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* V-Chevron Right Wing */}
        <mesh position={[0.6, 0.15, 0]} rotation={[0, 0, -Math.PI / 8]}>
          <boxGeometry args={[0.5, 1.2, 0.12]} />
          <meshStandardMaterial
            color="#c0c0c0"
            metalness={0.92}
            roughness={0.12}
            emissive="#00a8ff"
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Pulsing Core Sphere */}
        <mesh position={[0, 0, 0.15]}>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshStandardMaterial
            color="#00a8ff"
            emissive="#00a8ff"
            emissiveIntensity={1.5}
            transparent
            opacity={0.85}
            metalness={0.8}
            roughness={0.1}
          />
        </mesh>

        {/* Cyber Energy Lines - Left */}
        <mesh position={[-0.5, -0.3, 0.15]} rotation={[0, 0, Math.PI / 6]}>
          <boxGeometry args={[0.8, 0.03, 0.03]} />
          <meshStandardMaterial
            color="#00a8ff"
            emissive="#00a8ff"
            emissiveIntensity={2.5}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Cyber Energy Lines - Right */}
        <mesh position={[0.5, -0.3, 0.15]} rotation={[0, 0, -Math.PI / 6]}>
          <boxGeometry args={[0.8, 0.03, 0.03]} />
          <meshStandardMaterial
            color="#00a8ff"
            emissive="#00a8ff"
            emissiveIntensity={2.5}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Top Accent Sphere */}
        <mesh position={[0, 1.1, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color="#40c2fd"
            emissive="#40c2fd"
            emissiveIntensity={1.8}
          />
        </mesh>

        {/* Bottom Accent Sphere */}
        <mesh position={[0, -1.1, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial
            color="#95ccff"
            emissive="#40c2fd"
            emissiveIntensity={1}
          />
        </mesh>
      </group>
    </Float>
  );
}

/**
 * Particle Aura - Adds premium particle effects around the logo
 */
function ParticleAura({ count = 400 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    const color1 = new THREE.Color('#00a8ff');
    const color2 = new THREE.Color('#40c2fd');
    const color3 = new THREE.Color('#95ccff');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 2.5 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      sizes[i] = Math.random() * 2.5 + 0.3;

      const colorChoice = Math.random();
      const c = colorChoice < 0.33 ? color1 : colorChoice < 0.66 ? color2 : color3;
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }

    return { positions, sizes, colors };
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.getElapsedTime();

    mesh.current.rotation.y = time * 0.02;
    mesh.current.rotation.z = Math.sin(time * 0.01) * 0.05;

    // Subtle pulsing
    const positions = mesh.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = positions[i3];
      const y = positions[i3 + 1];
      const z = positions[i3 + 2];
      const dist = Math.sqrt(x * x + y * y + z * z);
      const offset = Math.sin(time * 0.8 + dist * 0.3) * 0.01;
      positions[i3] += offset * (x / dist);
      positions[i3 + 1] += offset * (y / dist);
      positions[i3 + 2] += offset * (z / dist);
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[particles.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/**
 * Lighting Setup
 */
function Lighting() {
  return (
    <>
      <ambientLight intensity={0.5} color="#f0f3ff" />
      <directionalLight position={[5, 5, 8]} intensity={1} color="#ffffff" />
      <directionalLight position={[-3, 2, 5]} intensity={0.6} color="#00a8ff" />
      <pointLight position={[0, 0, 3]} intensity={0.8} color="#40c2fd" distance={20} />
      <pointLight position={[4, 4, 0]} intensity={0.4} color="#95ccff" distance={15} />
    </>
  );
}

/**
 * Main Canvas Component
 */
function AnimationCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, precision: 'highp' }}
      style={{ background: 'transparent' }}
    >
      <Lighting />
      <LogoMesh />
      <ParticleAura count={300} />
    </Canvas>
  );
}

/**
 * Main Export Component
 */
export default function HeroLogoAnimation({ className = '' }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`relative w-full h-full ${className}`}
    >
      <div className="absolute inset-0">
        <AnimationCanvas />
      </div>

      {/* Ambient Glow Layer */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-80 h-80 rounded-full bg-gradient-radial from-primary/20 via-primary/5 to-transparent blur-3xl" />
      </div>
    </motion.div>
  );
}
