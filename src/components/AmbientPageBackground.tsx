import { generateOrganicStars } from "@/lib/stars";

const AMBIENT_STARS = generateOrganicStars(70);

// A page-level ambient background: warm radial glow + twinkling stars,
// fixed to the viewport so it stays visible behind all content while
// scrolling, on every page that uses it. Pure CSS/SVG — no WebGL.
export default function AmbientPageBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#0b1026]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(242,193,78,0.08),transparent_60%)]" />
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full animate-star-drift opacity-60"
      >
        {AMBIENT_STARS.map((star, i) => (
          <circle
            key={i}
            cx={star.x}
            cy={star.y}
            r={star.size}
            fill="#F5F3EE"
            opacity={star.opacity}
            className="animate-twinkle"
            style={{ animationDelay: `${star.delay}s` }}
          />
        ))}
      </svg>
    </div>
  );
}
