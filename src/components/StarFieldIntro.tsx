"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Star = {
  x: number;
  y: number;
  size: number;
  delay: number;
};

// Deterministic pseudo-random using integer math only — avoids
// floating-point precision drift between server and client renders
// (Math.sin() can differ in the last decimal place across environments).
function seededRandom(seed: number): number {
  let x = (seed * 9301 + 49297) % 233280;
  x = (x * 9301 + 49297) % 233280;
  return x / 233280;
}

function generateStars(count: number): Star[] {
  return Array.from({ length: count }, (_, i) => ({
    x: Math.round(seededRandom(i * 12.9898) * 100 * 10000) / 10000,
    y: Math.round(seededRandom(i * 78.233) * 100 * 10000) / 10000,
    size: Math.round((1 + seededRandom(i * 37.719) * 1.8) * 10000) / 10000,
    delay: Math.round(seededRandom(i * 4.123) * 2 * 10000) / 10000,
  }));
}

// The North Star's fixed position — slightly above and right of center,
// like it would sit if you were navigating by it.
const NORTH_STAR = { x: 58, y: 32 };

// A few nearby points the constellation lines briefly connect to.
const CONSTELLATION_POINTS = [
  { x: 42, y: 28 },
  { x: 67, y: 22 },
  { x: 71, y: 44 },
  { x: 49, y: 48 },
];

export default function StarFieldIntro({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState<"stars" | "resolve" | "reveal" | "done">(
    "stars"
  );
  const stars = useMemo(() => generateStars(140), []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      // Skip the looping animation; still show the brand moment briefly.
      setPhase("reveal");
      const t = setTimeout(() => {
        setPhase("done");
        onComplete();
      }, 900);
      return () => clearTimeout(t);
    }

    const t1 = setTimeout(() => setPhase("resolve"), 900);
    const t2 = setTimeout(() => setPhase("reveal"), 2400);
    const t3 = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 3400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-50 bg-[#0b1026] overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 h-full w-full"
          >
            {/* Ambient star field */}
            {stars.map((star, i) => (
              <motion.circle
                key={i}
                cx={star.x}
                cy={star.y}
                r={star.size * 0.18}
                fill="#F5F3EE"
                initial={{ opacity: 0 }}
                animate={{
                  opacity:
                    phase === "stars" || phase === "resolve"
                      ? [0, 0.8, 0.4, 0.8]
                      : 0.15,
                }}
                transition={{
                  delay: star.delay,
                  duration: 2.4,
                  repeat: phase === "stars" ? Infinity : 0,
                  repeatType: "reverse",
                }}
              />
            ))}

            {/* Constellation lines — draw out from North Star, then fade */}
            {phase === "resolve" &&
              CONSTELLATION_POINTS.map((pt, i) => (
                <motion.line
                  key={i}
                  x1={NORTH_STAR.x}
                  y1={NORTH_STAR.y}
                  x2={pt.x}
                  y2={pt.y}
                  stroke="#F2C14E"
                  strokeWidth={0.12}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0, 0.6, 0] }}
                  transition={{ duration: 1.6, delay: i * 0.08 }}
                />
              ))}
            {/* The North Star itself */}
            <motion.circle
              cx={NORTH_STAR.x}
              cy={NORTH_STAR.y}
              r={0.5}
              fill="#F2C14E"
              initial={{ opacity: 0.6, r: 0.3 }}
              animate={{
                opacity: phase === "stars" ? 0.6 : 1,
                r: phase === "stars" ? 0.3 : 1.1,
              }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{ filter: "blur(0.15px)" }}
            />
            <motion.circle
              cx={NORTH_STAR.x}
              cy={NORTH_STAR.y}
              r={0.3}
              fill="#F5F3EE"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "stars" ? 0 : 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </svg>

          {/* Wordmark, anchored near the North Star */}
          <AnimatePresence>
            {(phase === "resolve" || phase === "reveal") && (
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.9, delay: 0.4 }}
              >
                <p className="font-display text-3xl sm:text-4xl text-[#F5F3EE] tracking-tight">
                  North Star Academy
                </p>
                <p className="font-body text-xs sm:text-sm uppercase tracking-[0.25em] text-[#8A93B8] mt-3">
                  Find Your Direction
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
