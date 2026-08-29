'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// 14 Global Operating Nodes
const GLOBAL_NODES = [
  { lat: 64.1466, lon: -21.9426, name: 'Reykjavik Command' },
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

// Simplified continent polygon outlines [lon, lat] for drawing on equirectangular canvas
const CONTINENTS: number[][][] = [
  // North America
  [[-130,55],[-125,60],[-125,68],[-140,70],[-155,72],[-165,68],[-168,65],[-165,60],[-155,58],[-140,52],[-125,48],[-124,42],[-118,34],[-110,32],[-105,30],[-100,28],[-97,26],[-95,28],[-90,30],[-85,30],[-82,25],[-80,25],[-75,35],[-70,42],[-67,45],[-65,47],[-62,47],[-55,50],[-60,53],[-65,58],[-70,60],[-80,62],[-90,60],[-100,62],[-110,60],[-120,58],[-130,55]],
  // South America
  [[-80,10],[-75,12],[-70,12],[-62,10],[-60,8],[-52,4],[-50,0],[-50,-5],[-45,-10],[-40,-15],[-38,-20],[-40,-23],[-45,-25],[-48,-28],[-50,-30],[-52,-33],[-55,-35],[-58,-38],[-65,-40],[-68,-43],[-70,-45],[-75,-48],[-75,-45],[-72,-40],[-72,-35],[-70,-30],[-70,-25],[-70,-18],[-75,-15],[-76,-10],[-78,-5],[-80,0],[-78,5],[-77,8],[-80,10]],
  // Europe
  [[-10,36],[0,36],[3,38],[5,43],[0,44],[-5,44],[-10,44],[-8,48],[-5,48],[0,48],[2,51],[5,52],[8,54],[10,55],[12,56],[15,55],[18,55],[20,54],[22,55],[24,56],[28,56],[30,60],[28,63],[25,65],[22,68],[18,70],[15,70],[10,65],[5,62],[0,58],[-5,56],[-8,52],[-10,50],[-10,36]],
  // Africa
  [[-18,15],[-17,20],[-16,25],[-15,28],[-10,32],[-5,34],[0,36],[5,37],[10,37],[12,34],[15,32],[20,32],[25,30],[30,30],[33,28],[35,30],[38,28],[40,25],[42,20],[45,12],[42,8],[45,5],[42,2],[40,0],[38,-5],[35,-10],[33,-15],[35,-20],[35,-25],[33,-28],[30,-30],[28,-33],[26,-34],[20,-35],[18,-34],[15,-30],[12,-25],[12,-18],[10,-10],[8,-5],[5,0],[5,5],[3,5],[0,5],[-5,5],[-8,5],[-10,8],[-15,10],[-18,15]],
  // Asia (mainland)
  [[28,56],[30,60],[35,62],[40,65],[50,68],[60,70],[70,72],[80,72],[90,70],[100,72],[110,70],[120,68],[130,65],[135,60],[140,55],[142,50],[140,45],[135,40],[130,35],[125,32],[120,30],[115,25],[110,22],[108,18],[105,15],[100,15],[100,10],[105,5],[110,2],[115,-5],[120,-8],[125,-5],[130,0],[135,2],[140,5],[142,8],[145,10],[142,12],[140,15],[130,12],[125,10],[120,8],[115,5],[110,0],[105,-5],[100,0],[98,5],[95,10],[90,22],[85,25],[80,28],[75,25],[72,22],[68,25],[65,28],[60,28],[55,25],[50,28],[48,30],[42,35],[40,40],[30,42],[28,42],[25,40],[28,56]],
  // India (subcontinent)
  [[68,30],[72,32],[75,30],[78,32],[80,30],[85,28],[90,25],[90,22],[88,18],[85,15],[82,12],[80,8],[78,10],[76,12],[74,15],[72,18],[70,22],[68,25],[68,30]],
  // Australia
  [[115,-14],[120,-14],[125,-14],[130,-12],[135,-12],[140,-15],[145,-15],[148,-18],[150,-22],[152,-25],[153,-28],[150,-30],[148,-33],[145,-35],[140,-38],[136,-36],[132,-34],[128,-32],[124,-34],[120,-34],[116,-32],[114,-28],[114,-24],[115,-20],[116,-18],[115,-14]],
  // Japan
  [[130,31],[132,33],[134,34],[135,36],[137,38],[140,40],[141,42],[142,44],[142,45],[140,44],[138,42],[136,38],[134,36],[132,34],[130,31]],
  // UK
  [[-6,50],[-5,52],[-4,54],[-5,56],[-3,57],[-4,58],[-2,58],[0,55],[1,53],[0,51],[-2,50],[-6,50]],
  // Indonesia
  [[95,-6],[100,-5],[105,-6],[108,-7],[110,-7],[112,-8],[115,-8],[118,-8],[120,-9],[122,-8],[125,-6],[128,-4],[130,-3],[135,-5],[138,-6],[140,-7],[138,-8],[135,-8],[130,-8],[125,-10],[120,-10],[115,-9],[110,-8],[105,-7],[100,-6],[95,-6]],
  // New Zealand
  [[166,-35],[168,-37],[170,-38],[172,-40],[174,-42],[175,-44],[174,-46],[172,-45],[170,-43],[168,-40],[166,-38],[166,-35]],
  // Greenland
  [[-55,60],[-50,62],[-45,65],[-42,68],[-38,72],[-30,76],[-22,78],[-18,76],[-20,72],[-25,68],[-30,65],[-35,62],[-40,60],[-45,60],[-55,60]],
  // Madagascar
  [[44,-12],[46,-14],[48,-18],[48,-22],[47,-25],[44,-24],[43,-20],[43,-16],[44,-12]],
];

function createEarthTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  const width = 1024;
  const height = 512;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Ocean background — transparent/very dark blue
  ctx.fillStyle = 'rgba(0, 20, 60, 0.05)';
  ctx.fillRect(0, 0, width, height);

  // Draw grid lines
  ctx.strokeStyle = 'rgba(0, 120, 200, 0.08)';
  ctx.lineWidth = 0.5;
  for (let lat = -80; lat <= 80; lat += 20) {
    const y = ((90 - lat) / 180) * height;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  for (let lon = -180; lon <= 180; lon += 30) {
    const x = ((lon + 180) / 360) * width;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  // Draw continents as filled polygons
  for (const continent of CONTINENTS) {
    ctx.beginPath();
    for (let i = 0; i < continent.length; i++) {
      const [lon, lat] = continent[i];
      const x = ((lon + 180) / 360) * width;
      const y = ((90 - lat) / 180) * height;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = 'rgba(0, 80, 140, 0.45)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(0, 140, 220, 0.6)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Draw dots on land for texture detail
  ctx.fillStyle = 'rgba(0, 168, 255, 0.5)';
  const dotStep = 8;
  for (let px = 0; px < width; px += dotStep) {
    for (let py = 0; py < height; py += dotStep) {
      // Check if this pixel is on land by testing the pixel color
      const imgData = ctx.getImageData(px, py, 1, 1).data;
      if (imgData[3] > 50) {
        ctx.beginPath();
        ctx.arc(px, py, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

function Globe() {
  const globeRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const radius = 2.2;

  // Create earth texture on mount
  useEffect(() => {
    if (meshRef.current) {
      const texture = createEarthTexture();
      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      material.map = texture;
      material.needsUpdate = true;
    }
  }, []);

  const nodePositions = useMemo(() => {
    return GLOBAL_NODES.map((node) => ({
      ...node,
      pos: latLonToVector3(node.lat, node.lon, radius),
    }));
  }, [radius]);

  // Arcs between specific node pairs
  const arcCurves = useMemo(() => {
    const curves: THREE.QuadraticBezierCurve3[] = [];
    const pairs = [
      [0, 3], [1, 2], [3, 5], [6, 7], [9, 10], [2, 12], [13, 2], [4, 9],
    ];
    for (const [a, b] of pairs) {
      if (a < nodePositions.length && b < nodePositions.length) {
        const v1 = nodePositions[a].pos;
        const v2 = nodePositions[b].pos;
        const mid = new THREE.Vector3().addVectors(v1, v2).multiplyScalar(0.5);
        const dist = v1.distanceTo(v2);
        mid.normalize().multiplyScalar(radius + dist * 0.3);
        curves.push(new THREE.QuadraticBezierCurve3(v1, mid, v2));
      }
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
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.2}>
      <group ref={globeRef}>
        {/* Core globe sphere with earth texture */}
        <mesh ref={meshRef}>
          <sphereGeometry args={[radius, 64, 64]} />
          <meshStandardMaterial
            color="#d0e4ff"
            roughness={0.4}
            metalness={0.05}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Outer atmospheric glow */}
        <mesh>
          <sphereGeometry args={[radius + 0.06, 48, 48]} />
          <meshStandardMaterial
            color="#38bdf8"
            wireframe
            transparent
            opacity={0.1}
          />
        </mesh>

        {/* Nodes — glowing city markers */}
        {nodePositions.map((node, i) => (
          <group key={i} position={node.pos}>
            <mesh>
              <sphereGeometry args={[0.055, 16, 16]} />
              <meshStandardMaterial
                color="#00e5ff"
                emissive="#00e5ff"
                emissiveIntensity={3}
              />
            </mesh>
            <mesh>
              <ringGeometry args={[0.07, 0.1, 16]} />
              <meshBasicMaterial color="#40c2fd" transparent opacity={0.5} side={THREE.DoubleSide} />
            </mesh>
          </group>
        ))}

        {/* Arc beams between nodes */}
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
                  opacity: 0.6,
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
        <ambientLight intensity={0.7} color="#f0f3ff" />
        <directionalLight position={[6, 8, 6]} intensity={1.0} color="#ffffff" />
        <pointLight position={[-4, -4, -4]} intensity={0.3} color="#95ccff" />
        <Globe />
      </Canvas>
    </div>
  );
}
