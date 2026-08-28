'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// 14 Global Operating Nodes
const GLOBAL_NODES = [
  { lat: 64.1466, lon: -21.9426, name: 'Reykjavik Command' }, // Reykjavik
  { lat: 37.7749, lon: -122.4194, name: 'San Francisco Grid' },
  { lat: 40.7128, lon: -74.006, name: 'New York Sentinel' },
  { lat: 51.5074, lon: -0.1278, name: 'London Bastion' },
  { lat: 48.8566, lon: 2.3522, name: 'Paris Node' },
  { lat: 52.52, lon: 13.405, name: 'Berlin Vault' },
  { lat: 35.6762, lon: 139.6503, name: 'Tokyo Core' },
  { lat: 1.3521, lon: 103.8198, name: 'Singapore Relay' },
  { lat: -33.8688, lon: 151.2093, name: 'Sydney Outpost' },
  { lat: 25.2048, lon: 55.2708, name: 'Dubai Enclave' },
  { lat: 19.076, lon: 72.8777, name: 'Mumbai Hub' },
  { lat: 59.3293, lon: 18.0686, name: 'Stockholm Nexus' },
  { lat: 45.4215, lon: -75.6972, name: 'Ottawa Shield' },
  { lat: -23.5505, lon: -46.6333, name: 'São Paulo Array' },
];

function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

function GlobeInner() {
  const globeRef = useRef<THREE.Group>(null);
  const radius = 2.2;

  const nodePositions = useMemo(() => {
    return GLOBAL_NODES.map((node) => ({
      ...node,
      pos: latLonToVector3(node.lat, node.lon, radius),
    }));
  }, [radius]);

  // Arcs between some key nodes
  const arcCurves = useMemo(() => {
    const curves: THREE.QuadraticBezierCurve3[] = [];
    for (let i = 0; i < nodePositions.length - 1; i += 2) {
      const v1 = nodePositions[i].pos;
      const v2 = nodePositions[i + 1].pos;
      const mid = new THREE.Vector3().addVectors(v1, v2).multiplyScalar(0.5);
      const dist = v1.distanceTo(v2);
      mid.normalize().multiplyScalar(radius + dist * 0.35);
      curves.push(new THREE.QuadraticBezierCurve3(v1, mid, v2));
    }
    return curves;
  }, [nodePositions, radius]);

  useFrame((state) => {
    if (!globeRef.current) return;
    const time = state.clock.getElapsedTime();
    globeRef.current.rotation.y = time * 0.08;
    globeRef.current.rotation.x = Math.sin(time * 0.05) * 0.1;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.25}>
      <group ref={globeRef}>
        {/* Core sphere with glowing glassmorphism material */}
        <mesh>
          <sphereGeometry args={[radius, 48, 48]} />
          <meshStandardMaterial
            color="#dee8ff"
            roughness={0.2}
            metalness={0.1}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Wireframe outer aura */}
        <mesh>
          <sphereGeometry args={[radius + 0.05, 32, 32]} />
          <meshStandardMaterial
            color="#40c2fd"
            wireframe
            transparent
            opacity={0.25}
          />
        </mesh>

        {/* Lat/Long rings */}
        {[ -0.8, -0.4, 0, 0.4, 0.8 ].map((yOffset, idx) => {
          const r = Math.sqrt(Math.max(0, radius * radius - yOffset * yOffset));
          return (
            <mesh key={`ring-${idx}`} position={[0, yOffset, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[r - 0.01, r + 0.01, 64]} />
              <meshBasicMaterial color="#00a8ff" transparent opacity={0.3} side={THREE.DoubleSide} />
            </mesh>
          );
        })}

        {/* Nodes and pulsing halos */}
        {nodePositions.map((node, i) => (
          <group key={i} position={node.pos}>
            <mesh>
              <sphereGeometry args={[0.06, 16, 16]} />
              <meshStandardMaterial
                color="#006399"
                emissive="#00a8ff"
                emissiveIntensity={2.5}
              />
            </mesh>
            <mesh>
              <ringGeometry args={[0.08, 0.12, 16]} />
              <meshBasicMaterial color="#40c2fd" transparent opacity={0.6} side={THREE.DoubleSide} />
            </mesh>
          </group>
        ))}

        {/* Dynamic Arc Beams */}
        {arcCurves.map((curve, idx) => {
          const points = curve.getPoints(50);
          const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
          return (
            <primitive
              key={`arc-${idx}`}
              object={new THREE.Line(
                lineGeometry,
                new THREE.LineBasicMaterial({
                  color: '#00a8ff',
                  transparent: true,
                  opacity: 0.75,
                })
              )}
            />
          );
        })}
      </group>
    </Float>
  );
}

export default function GlobeScene({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full h-full min-h-[380px] relative ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} color="#f0f3ff" />
        <directionalLight position={[6, 8, 6]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-4, -4, -4]} intensity={0.4} color="#95ccff" />
        <GlobeInner />
      </Canvas>
    </div>
  );
}
