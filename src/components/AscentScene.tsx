"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const TRAIL_COUNT_FULL = 60;
const TRAIL_COUNT_LIGHT = 18;
const CONVERGING_COUNT_FULL = 6;
const CONVERGING_COUNT_LIGHT = 3;

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

function buildTrails(trailCount: number, convergingCount: number): Trail[] {
  return Array.from({ length: trailCount }, (_, i) => ({
    startX: (seededRandom(i * 12.9898) - 0.5) * 8,
    startZ: (seededRandom(i * 78.233) - 0.5) * 6 - 2,
    speed: 0.6 + seededRandom(i * 37.71) * 0.8,
    converges: i < convergingCount,
    phase: seededRandom(i * 5.12) * 10,
    brightness: i < convergingCount ? 1 : 0.3 + seededRandom(i * 91.7) * 0.3,
  }));
}

const NORTH_STAR_POS = new THREE.Vector3(0, 3.2, -1);
const DUST_COUNT = 120;

// Atmospheric dust field — faint, slow-drifting points scattered through
// the scene's depth for a sense of volume, rendered as a single Points
// object so it's one draw call regardless of count.
function DustField() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, seeds } = useMemo(() => {
    const pos = new Float32Array(DUST_COUNT * 3);
    const sd = new Float32Array(DUST_COUNT);
    for (let i = 0; i < DUST_COUNT; i++) {
      pos[i * 3] = (seededRandom(i * 13.1) - 0.5) * 10;
      pos[i * 3 + 1] = (seededRandom(i * 27.3) - 0.5) * 8;
      pos[i * 3 + 2] = (seededRandom(i * 41.7) - 0.5) * 6 - 1;
      sd[i] = seededRandom(i * 9.3);
    }
    return { positions: pos, seeds: sd };
  }, []);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions.slice(), 3));
    return g;
  }, [positions]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const t = clock.elapsedTime;
    for (let i = 0; i < DUST_COUNT; i++) {
      // Very slow vertical drift, wrapping around, plus a tiny sideways sway.
      const drift = ((t * 0.05 + seeds[i] * 8) % 8) - 4;
      posAttr.array[i * 3 + 1] = drift;
      posAttr.array[i * 3] = positions[i * 3] + Math.sin(t * 0.2 + seeds[i] * 10) * 0.1;
    }
    posAttr.needsUpdate = true;
  });

  return (
    // eslint-disable-next-line react/no-unknown-property
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial color="#8A93B8" size={0.018} transparent opacity={0.35} sizeAttenuation />
    </points>
  );
}

function LightTrail({ trail, clockRef }: { trail: Trail; clockRef: { current: number } }) {
  const headRef = useRef<THREE.Mesh>(null);
  const pulseRef = useRef<THREE.Mesh>(null);

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

    // Graceful fade: converging trails dim as they approach the North Star
    // (rather than abruptly vanishing), ambient trails dim near the top of
    // frame as they exit view.
    const headPoint = points[points.length - 1];
    const distToStar = trail.converges ? headPoint.distanceTo(NORTH_STAR_POS) : 1;
    const nearStarFade = trail.converges
      ? THREE.MathUtils.clamp(distToStar / 0.6, 0, 1)
      : THREE.MathUtils.clamp((4 - headPoint.y) / 1.5, 0, 1);
    material.opacity = trail.brightness * nearStarFade;

    if (headRef.current) {
      headRef.current.position.copy(headPoint);
      (headRef.current.material as THREE.MeshBasicMaterial).opacity =
        trail.brightness * nearStarFade;
    }

    // Traveling pulse: a brighter point that runs along converging trails
    // toward the North Star, repeating every cycle — suggests energy
    // flowing upward rather than just static rising lines.
    if (trail.converges && pulseRef.current) {
      const pulseT = (t / 8 + 0.3) % 1; // offset so it doesn't start at the base
      const idx = Math.min(Math.floor(pulseT * segments), points.length - 1);
      pulseRef.current.position.copy(points[idx]);
      const pulseVisible = pulseT > 0.05 && pulseT < 0.95;
      (pulseRef.current.material as THREE.MeshBasicMaterial).opacity = pulseVisible
        ? 0.9 * nearStarFade
        : 0;
    }
  });

  return (
    <>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <primitive object={line} />
      <mesh ref={headRef}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshBasicMaterial
          color={trail.converges ? "#F2C14E" : "#8A93B8"}
          transparent
        />
      </mesh>
      {trail.converges && (
        <mesh ref={pulseRef}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#FFE8B0" transparent />
        </mesh>
      )}
    </>
  );
}

function NorthStarPoint({
  clockRef,
  flareRef,
}: {
  clockRef: { current: number };
  flareRef: { current: number };
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame(() => {
    const elapsed = clockRef.current;
    const fadeIn = Math.min(elapsed / 3, 1);
    const pulse = 1 + Math.sin(elapsed * 1.5) * 0.08;
    // flareRef ramps from 0 to 1 once the headline becomes ready (see
    // Scene/AscentScene), giving the convergence point one extra moment
    // of brightness tied to the actual content appearing, not a timer.
    const flare = flareRef.current;
    const flareBoost = 1 + flare * 0.6;

    if (meshRef.current) {
      meshRef.current.scale.setScalar(pulse * fadeIn * flareBoost);
    }
    if (haloRef.current) {
      const haloPulse = 1 + Math.sin(elapsed * 1.5) * 0.15;
      haloRef.current.scale.setScalar(haloPulse * fadeIn * (1 + flare * 0.9));
      (haloRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.25 * fadeIn + flare * 0.25;
    }
    if (lightRef.current) {
      lightRef.current.intensity = (1.2 + flare * 1.5) * fadeIn;
    }
  });

  return (
    <group position={NORTH_STAR_POS}>
      {/* Soft glow halo behind the core point — makes it read as an actual
          light source rather than a flat dot. */}
      <mesh ref={haloRef}>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshBasicMaterial color="#F2C14E" transparent opacity={0.2} depthWrite={false} />
      </mesh>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshBasicMaterial color="#F2C14E" />
      </mesh>
      <pointLight ref={lightRef} color="#F2C14E" intensity={1.2} distance={3} />
    </group>
  );
}

function Scene({ ready, isMobile }: { ready: boolean; isMobile: boolean }) {
  const trails = useMemo(
    () =>
      buildTrails(
        isMobile ? TRAIL_COUNT_LIGHT : TRAIL_COUNT_FULL,
        isMobile ? CONVERGING_COUNT_LIGHT : CONVERGING_COUNT_FULL
      ),
    [isMobile]
  );
  const startTime = useRef<number | null>(null);
  const clockRef = useRef(0);
  const flareRef = useRef(0);
  const flareStart = useRef<number | null>(null);

  useFrame(() => {
    if (startTime.current === null) startTime.current = performance.now();
    clockRef.current = (performance.now() - startTime.current) / 1000;

    // Once "ready" flips true (headline content appearing), ramp the flare
    // up over ~1.5s and back down over the following ~2s — a brief flare
    // tied to the actual content moment rather than an independent timer.
    if (ready) {
      if (flareStart.current === null) flareStart.current = clockRef.current;
      const flareElapsed = clockRef.current - flareStart.current;
      if (flareElapsed < 1.5) {
        flareRef.current = flareElapsed / 1.5;
      } else if (flareElapsed < 3.5) {
        flareRef.current = 1 - (flareElapsed - 1.5) / 2;
      } else {
        flareRef.current = 0;
      }
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      {!isMobile && <DustField />}
      {trails.map((trail, i) => (
        <LightTrail key={i} trail={trail} clockRef={clockRef} />
      ))}
      <NorthStarPoint clockRef={clockRef} flareRef={flareRef} />
    </>
  );
}

export default function AscentScene({ ready = true }: { ready?: boolean }) {
  const [shouldRender, setShouldRender] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setShouldRender(!prefersReducedMotion);
    // Treat narrow viewports as "mobile" for scene weight purposes — a
    // real lighter render rather than hiding the scene outright.
    setIsMobile(window.innerWidth < 768);
  }, []);

  if (!shouldRender) return null;

  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, isMobile ? 8 : 5], fov: isMobile ? 65 : 50 }}
        dpr={isMobile ? 1 : [1, 1.5]}
        gl={{ antialias: !isMobile, alpha: true }}
      >
        <Scene ready={ready} isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
