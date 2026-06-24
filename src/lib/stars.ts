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

export function generateStarPositions(count: number): Point[] {
  return Array.from({ length: count }, (_, i) => ({
    x: Math.round(seededRandom(i * 12.9898) * 100 * 10000) / 10000,
    y: Math.round(seededRandom(i * 78.233) * 100 * 10000) / 10000,
  }));
}
