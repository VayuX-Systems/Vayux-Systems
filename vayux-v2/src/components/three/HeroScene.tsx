'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function Particles({ count = 800 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);
  const light = useRef<THREE.PointLight>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    const color1 = new THREE.Color('#95ccff');
    const color2 = new THREE.Color('#40c2fd');
    const color3 = new THREE.Color('#ffffff');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Distribute in a sphere
      const radius = 3 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      sizes[i] = Math.random() * 3 + 0.5;

      // Random color between our palette
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
    mesh.current.rotation.x = Math.sin(time * 0.01) * 0.1;

    // Gentle pulsing
    const positions = mesh.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = positions[i3];
      const y = positions[i3 + 1];
      const z = positions[i3 + 2];
      const dist = Math.sqrt(x * x + y * y + z * z);
      const offset = Math.sin(time * 0.5 + dist * 0.5) * 0.02;
      positions[i3] += offset * (x / dist);
      positions[i3 + 1] += offset * (y / dist);
      positions[i3 + 2] += offset * (z / dist);
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;

    if (light.current) {
      light.current.intensity = 0.5 + Math.sin(time * 0.3) * 0.2;
    }
  });

  return (
    <>
      <pointLight ref={light} position={[0, 0, 0]} color="#40c2fd" intensity={0.5} distance={15} />
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
          size={0.03}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  );
}

function EagleMesh() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    // Slow idle rotation
    groupRef.current.rotation.y = Math.sin(time * 0.15) * 0.15;
    groupRef.current.rotation.x = Math.sin(time * 0.1) * 0.05;

    // Mouse follow parallax
    const mx = (state.pointer.x * 0.1);
    const my = (state.pointer.y * 0.05);
    groupRef.current.rotation.y += mx;
    groupRef.current.rotation.x += my;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef}>
        {/* Central V-chevron */}
        <mesh position={[0, -0.3, 0]}>
          <coneGeometry args={[1.2, 2.4, 4]} />
          <meshStandardMaterial
            color="#c0c0c0"
            metalness={0.95}
            roughness={0.15}
            envMapIntensity={1.5}
          />
        </mesh>

        {/* Left wing */}
        <mesh position={[-1.3, 0.3, 0]} rotation={[0, 0, Math.PI / 6]}>
          <boxGeometry args={[1.8, 0.08, 0.5]} />
          <meshStandardMaterial
            color="#d0d0d8"
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>

        {/* Right wing */}
        <mesh position={[1.3, 0.3, 0]} rotation={[0, 0, -Math.PI / 6]}>
          <boxGeometry args={[1.8, 0.08, 0.5]} />
          <meshStandardMaterial
            color="#d0d0d8"
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>

        {/* Cyan energy core */}
        <mesh position={[0, 0, 0.1]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color="#00a8ff"
            emissive="#00a8ff"
            emissiveIntensity={2}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Left cyan trace */}
        <mesh position={[-0.8, 0, 0.3]} rotation={[0, 0, Math.PI / 6]}>
          <boxGeometry args={[1.4, 0.02, 0.02]} />
          <meshStandardMaterial
            color="#00a8ff"
            emissive="#00a8ff"
            emissiveIntensity={3}
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Right cyan trace */}
        <mesh position={[0.8, 0, 0.3]} rotation={[0, 0, -Math.PI / 6]}>
          <boxGeometry args={[1.4, 0.02, 0.02]} />
          <meshStandardMaterial
            color="#00a8ff"
            emissive="#00a8ff"
            emissiveIntensity={3}
            transparent
            opacity={0.8}
          />
        </mesh>
      </group>
    </Float>
  );
}

export default function HeroScene({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} color="#f0f3ff" />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
        <directionalLight position={[-3, 2, 4]} intensity={0.3} color="#95ccff" />
        <pointLight position={[0, 0, 3]} intensity={0.5} color="#40c2fd" />

        <EagleMesh />
        <Particles count={600} />
      </Canvas>
    </div>
  );
}
