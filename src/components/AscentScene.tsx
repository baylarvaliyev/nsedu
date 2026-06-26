"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const TRAIL_COUNT = 60;
const CONVERGING_COUNT = 6; // how many trails curve toward the North Star point

// Deterministic pseudo-random (same approach as the rest of the site —
// avoids SSR/client hydration mismatches).
function seededRandom(seed: number): number {
  let x = (seed * 9301 + 49297) % 233280;
  x = (x * 9301 + 49297) % 233280;
  return x / 233280;
}

type Trail = {
  startX: number;
  startZ: number;
  speed: number;
  converges: boolean;
  phase: number;
  brightness: number;
};

function buildTrails(): Trail[] {
  return Array.from({ length: TRAIL_COUNT }, (_, i) => ({
    startX: (seededRandom(i * 12.9898) - 0.5) * 8,
    startZ: (seededRandom(i * 78.233) - 0.5) * 6 - 2,
    speed: 0.6 + seededRandom(i * 37.71) * 0.8,
    converges: i < CONVERGING_COUNT,
    phase: seededRandom(i * 5.12) * 10,
    brightness: i < CONVERGING_COUNT ? 1 : 0.3 + seededRandom(i * 91.7) * 0.3,
  }));
}

const NORTH_STAR_POS = new THREE.Vector3(0, 3.2, -1);

function LightTrail({ trail, clockRef }: { trail: Trail; clockRef: { current: number } }) {
  const headRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => new THREE.BufferGeometry(), []);
  const material = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: trail.converges ? "#F2C14E" : "#8A93B8",
        transparent: true,
        opacity: trail.brightness,
      }),
    [trail]
  );
  const line = useMemo(() => new THREE.Line(geometry, material), [geometry, material]);

  useFrame(() => {
    const elapsed = clockRef.current;
    const t = (elapsed * trail.speed + trail.phase) % 8;
    const segments = 24;
    const points: THREE.Vector3[] = [];

    for (let s = 0; s <= segments; s++) {
      const segT = Math.max(0, t - s * 0.04);
      const riseY = -4 + segT * 1.6;

      let x = trail.startX;
      let z = trail.startZ;
      let y = riseY;

      if (trail.converges) {
        // Ease toward the North Star point as height increases, so
        // converging trails visibly curve inward near the top.
        const pull = THREE.MathUtils.clamp((riseY + 1) / 5, 0, 1);
        const eased = pull * pull;
        x = THREE.MathUtils.lerp(trail.startX, NORTH_STAR_POS.x, eased);
        z = THREE.MathUtils.lerp(trail.startZ, NORTH_STAR_POS.z, eased);
        y = THREE.MathUtils.lerp(riseY, NORTH_STAR_POS.y, eased * 0.3);
      }

      points.push(new THREE.Vector3(x, y, z));
    }

    geometry.setFromPoints(points);
    if (headRef.current) {
      headRef.current.position.copy(points[points.length - 1]);
    }
  });

  return (
    <>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <primitive object={line} />
      <mesh ref={headRef}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshBasicMaterial color={trail.converges ? "#F2C14E" : "#8A93B8"} />
      </mesh>
    </>
  );
}

function NorthStarPoint({ clockRef }: { clockRef: { current: number } }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    const elapsed = clockRef.current;
    if (meshRef.current) {
      // Gentle pulse, and fades in over the first few seconds rather than
      // popping in instantly.
      const fadeIn = Math.min(elapsed / 3, 1);
      const pulse = 1 + Math.sin(elapsed * 1.5) * 0.08;
      meshRef.current.scale.setScalar(pulse * fadeIn);
    }
  });

  return (
    <group position={NORTH_STAR_POS}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshBasicMaterial color="#F2C14E" />
      </mesh>
      <pointLight color="#F2C14E" intensity={1.2} distance={3} />
    </group>
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
        <LightTrail key={i} trail={trail} clockRef={clockRef} />
      ))}
      <NorthStarPoint clockRef={clockRef} />
    </>
  );
}

export default function AscentScene() {
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
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
