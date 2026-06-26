"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Baku's approximate lat/long, converted to a 3D point on a unit sphere.
const BAKU_LAT = 40.4093;
const BAKU_LON = 49.8671;

function latLonToVector3(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function Globe() {
  const groupRef = useRef<THREE.Group>(null);
  const markerPos = useMemo(() => latLonToVector3(BAKU_LAT, BAKU_LON, 1.52), []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Base sphere — a stylized "wireframe globe" rather than a textured
          photoreal Earth, since we don't have a real Earth texture asset. */}
      <mesh>
        <sphereGeometry args={[1.5, 48, 48]} />
        <meshStandardMaterial color="#0f1530" roughness={0.8} metalness={0.1} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.505, 32, 32]} />
        <meshBasicMaterial color="#8A93B8" wireframe transparent opacity={0.25} />
      </mesh>
      {/* Baku marker */}
      <mesh position={markerPos}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshBasicMaterial color="#F2C14E" />
      </mesh>
      <pointLight position={markerPos.clone().multiplyScalar(1.3)} color="#F2C14E" intensity={0.6} distance={1} />
    </group>
  );
}

function CameraRig() {
  const startTime = useRef<number | null>(null);

  useFrame(({ camera }) => {
    if (startTime.current === null) startTime.current = performance.now();
    const elapsed = (performance.now() - startTime.current) / 1000;

    // Camera animation: start far, slowly zoom in over ~6s, then settle
    // into a gentle orbit-distance hold. Eased, not linear, so it feels
    // like a deliberate camera move rather than a mechanical pan.
    const zoomDuration = 6;
    const t = Math.min(elapsed / zoomDuration, 1);
    const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
    const distance = 6 - eased * 2.5; // 6 -> 3.5

    camera.position.set(0, 0.3, distance);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function GlobeScene() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Skip the 3D scene entirely for reduced-motion users — no WebGL
    // context, no GPU cost, just nothing rendered.
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setShouldRender(!prefersReducedMotion);
  }, []);

  if (!shouldRender) return null;

  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0.3, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 2, 4]} intensity={0.8} />
        <Globe />
        <CameraRig />
      </Canvas>
    </div>
  );
}
