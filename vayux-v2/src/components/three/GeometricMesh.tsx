'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function ShieldCrystal() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current || !wireframeRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.y = time * 0.15;
    meshRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;

    wireframeRef.current.rotation.y = -time * 0.08;
    wireframeRef.current.rotation.z = Math.cos(time * 0.1) * 0.08;
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.4}>
      <group>
        {/* Core Octahedron Crystal */}
        <mesh ref={meshRef}>
          <octahedronGeometry args={[1.5, 0]} />
          <meshPhysicalMaterial
            color="#cfdaf2"
            emissive="#00a8ff"
            emissiveIntensity={0.3}
            roughness={0.1}
            metalness={0.2}
            transmission={0.8}
            thickness={1.2}
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Outer Wireframe Icosahedron */}
        <mesh ref={wireframeRef}>
          <icosahedronGeometry args={[2.1, 0]} />
          <meshStandardMaterial
            color="#40c2fd"
            wireframe
            transparent
            opacity={0.35}
          />
        </mesh>
      </group>
    </Float>
  );
}

export default function GeometricMesh({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full h-full min-h-[300px] relative pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 5, 4]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-3, -3, 2]} intensity={1} color="#00a8ff" />
        <ShieldCrystal />
      </Canvas>
    </div>
  );
}
