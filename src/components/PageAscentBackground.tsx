"use client";

import dynamic from "next/dynamic";

// Lazy-loaded, client-only — the underlying Three.js bundle is heavy and
// should never block initial page interactivity (this was very likely
// contributing to multi-second "click does nothing" delays on mobile).
const AscentScene = dynamic(() => import("./AscentScene"), { ssr: false });

export default function PageAscentBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 bg-[#0b1026]">
      <AscentScene ready={true} />
    </div>
  );
}
