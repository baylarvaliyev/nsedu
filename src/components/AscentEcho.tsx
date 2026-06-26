"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// A lighter, sparser echo of the homepage AscentScene — fewer trails, no
// dust field, no traveling pulse, smaller canvas footprint. Meant for
// secondary pages where full hero-level cost isn't justified, but a bit
// of the same visual language keeps the site feeling cohesive.

const TRAIL_COUNT = 18;

function seededRandom(seed: number): number {
  let x = (seed * 9301 + 49297) % 233280;
  x = (x * 9301 + 49297) % 233280;
  return x / 233280;
}

type Trail = { startX: number; speed: number; phase: number };

function buildTrails(): Trail[] {
  return Array.from({ length: TRAIL_COUNT }, (_, i) => ({
    startX: (seededRandom(i * 12.98) - 0.5) * 7,
    speed: 0.5 + seededRandom(i * 37.7) * 0.6,
    phase: seededRandom(i * 5.1) * 8,
  }));
}

function Trail({ trail, clockRef }: { trail: Trail; clockRef: { current: number } }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => new THREE.BufferGeometry(), []);
  const material = useMemo(
    () => new THREE.LineBasicMaterial({ color: "#8A93B8", transparent: true, opacity: 0.4 }),
    []
  );
  const line = useMemo(() => new THREE.Line(geometry, material), [geometry, material]);

  useFrame(() => {
    const t = (clockRef.current * trail.speed + trail.phase) % 6;
    const segments = 14;
    const points: THREE.Vector3[] = [];
    for (let s = 0; s <= segments; s++) {
      const segT = Math.max(0, t - s * 0.05);
      points.push(new THREE.Vector3(trail.startX, -2.5 + segT * 1.1, -1));
    }
    geometry.setFromPoints(points);
    const head = points[points.length - 1];
    const fade = THREE.MathUtils.clamp((2 - head.y) / 1.2, 0, 1);
    material.opacity = 0.4 * fade;
    if (meshRef.current) {
      meshRef.current.position.copy(head);
      (meshRef.current.material as THREE.MeshBasicMaterial).opacity = 0.4 * fade;
    }
  });

  return (
    <>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <primitive object={line} />
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.02, 6, 6]} />
        <meshBasicMaterial color="#8A93B8" transparent />
      </mesh>
    </>
  );
}

function Scene() {
  const trails = useMemo(() => buildTrails(), []);
  const startTime = useRef<number | null>(null);
  const clockRef = useRef(0);

  useFrame(() => {
    if (startTime.current === null) startTime.current = performance.now();
    clockRef.current = (performance.now() - startTime.current) / 1000;
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      {trails.map((trail, i) => (
        <Trail key={i} trail={trail} clockRef={clockRef} />
      ))}
    </>
  );
}

export default function AscentEcho() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setShouldRender(!prefersReducedMotion);
  }, []);

  if (!shouldRender) return null;

  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <Scene />
      </Canvas>
    </div>
  );
}
