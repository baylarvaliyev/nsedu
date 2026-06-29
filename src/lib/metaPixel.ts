// Thin typed wrapper around the global `fbq` function injected by the
// Meta Pixel base code in the root layout. Safe to call from anywhere on
// the client — no-ops if the pixel script hasn't loaded yet (e.g. ad
// blockers) instead of throwing.

type FbqFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    fbq?: FbqFn;
  }
}

export function trackMetaEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") {
    return;
  }
  window.fbq("track", eventName, params);
}
