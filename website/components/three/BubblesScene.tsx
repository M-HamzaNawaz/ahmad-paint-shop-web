'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Environment,
  Float,
  Lightformer,
  PresentationControls,
} from '@react-three/drei';
import * as THREE from 'three';

const COLORS = [
  '#fca5a5',
  '#fdba74',
  '#fcd34d',
  '#bef264',
  '#86efac',
  '#5eead4',
  '#7dd3fc',
  '#93c5fd',
  '#c4b5fd',
  '#f0abfc',
  '#f9a8d4',
  '#fb923c',
];

const COUNT = 34;

type Bubble = {
  position: [number, number, number];
  radius: number;
  color: string;
  /** true → clear glass bubble, false → glossy coloured paint drop */
  glass: boolean;
  speed: number;
  phase: number;
  amp: number;
};

/** Deterministic-ish bubble field (computed once on mount). */
function useBubbles(): Bubble[] {
  return useMemo(() => {
    const out: Bubble[] = [];
    for (let i = 0; i < COUNT; i++) {
      const glass = i % 4 === 0; // ~1 in 4 are clear glass bubbles
      out.push({
        position: [
          (Math.random() - 0.5) * 7,
          (Math.random() - 0.5) * 4.6,
          (Math.random() - 0.5) * 3.5 - 0.5,
        ],
        radius: 0.12 + Math.random() * 0.4,
        color: COLORS[i % COLORS.length],
        glass,
        speed: 0.4 + Math.random() * 0.9,
        phase: Math.random() * Math.PI * 2,
        amp: 0.15 + Math.random() * 0.35,
      });
    }
    return out;
  }, []);
}

function BubbleField() {
  const group = useRef<THREE.Group>(null);
  const bubbles = useBubbles();
  const refs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = Math.sin(t * 0.1) * 0.15;
    for (let i = 0; i < bubbles.length; i++) {
      const m = refs.current[i];
      if (!m) continue;
      const b = bubbles[i];
      m.position.y = b.position[1] + Math.sin(t * b.speed + b.phase) * b.amp;
      m.position.x = b.position[0] + Math.cos(t * b.speed * 0.6 + b.phase) * b.amp * 0.4;
    }
  });

  return (
    <group ref={group}>
      {bubbles.map((b, i) => (
        <mesh
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          position={b.position}
        >
          <sphereGeometry args={[b.radius, 32, 32]} />
          {b.glass ? (
            <meshPhysicalMaterial
              color="#ffffff"
              roughness={0.05}
              transmission={0.92}
              thickness={0.5}
              ior={1.3}
              transparent
              opacity={0.55}
              envMapIntensity={1.5}
            />
          ) : (
            <meshPhysicalMaterial
              color={b.color}
              roughness={0.12}
              clearcoat={1}
              clearcoatRoughness={0.1}
              transparent
              opacity={0.92}
              envMapIntensity={1.4}
            />
          )}
        </mesh>
      ))}
    </group>
  );
}

export default function BubblesScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 7], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ touchAction: 'pan-y' }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 4]} intensity={1.6} />
      <directionalLight position={[-4, 2, -2]} intensity={0.7} color="#bae6fd" />
      <directionalLight position={[0, 3, -5]} intensity={1.4} color="#fb923c" />

      <PresentationControls
        global
        snap
        polar={[-0.2, 0.2]}
        azimuth={[-0.6, 0.6]}
      >
        <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.4}>
          <BubbleField />
        </Float>
      </PresentationControls>

      {/* Procedural studio environment (no network HDRI) for glossy reflections. */}
      <Environment resolution={256}>
        <Lightformer
          form="rect"
          intensity={2}
          position={[0, 5, 3]}
          scale={[10, 5, 1]}
          color="#ffffff"
        />
        <Lightformer
          form="rect"
          intensity={1.5}
          position={[-3, 1, 3]}
          scale={[2, 5, 1]}
          color="#fff7ed"
        />
        <Lightformer
          form="rect"
          intensity={1.2}
          position={[4, 1, 2]}
          scale={[2, 5, 1]}
          color="#e0f2fe"
        />
      </Environment>
    </Canvas>
  );
}
