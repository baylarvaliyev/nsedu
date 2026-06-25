// Deterministic pseudo-random using integer math only — avoids
// floating-point precision drift between server and client renders.
// Used anywhere we need stable "random" positions for SSR'd content
// (e.g. star fields) so React hydration never sees a mismatch.
export function seededRandom(seed: number): number {
  let x = (seed * 9301 + 49297) % 233280;
  x = (x * 9301 + 49297) % 233280;
  return x / 233280;
}

export type Point = { x: number; y: number };
export type Star = Point & { size: number; opacity: number; delay: number };

export function generateStarPositions(count: number): Point[] {
  return Array.from({ length: count }, (_, i) => ({
    x: Math.round(seededRandom(i * 12.9898) * 100 * 10000) / 10000,
    y: Math.round(seededRandom(i * 78.233) * 100 * 10000) / 10000,
  }));
}

// More organic field: varied size/opacity/twinkle timing so stars don't
// read as a uniform grid. Still deterministic for SSR-safe hydration.
export function generateOrganicStars(count: number): Star[] {
  return Array.from({ length: count }, (_, i) => ({
    x: Math.round(seededRandom(i * 12.9898) * 100 * 10000) / 10000,
    y: Math.round(seededRandom(i * 78.233 + 17) * 100 * 10000) / 10000,
    size: Math.round((0.08 + seededRandom(i * 37.719) * 0.22) * 10000) / 10000,
    opacity: Math.round((0.25 + seededRandom(i * 5.123) * 0.6) * 10000) / 10000,
    delay: Math.round(seededRandom(i * 91.71) * 4 * 10000) / 10000,
  }));
}
