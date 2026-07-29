import { heroDestinations } from "./destinationData";

/**
 * Static, dependency-free stand-in for the WebGL globe — used while the 3D chunk loads,
 * and as the permanent fallback when WebGL is unavailable or the dynamic import fails.
 * Mirrors the globe's footprint so there's no layout shift when it's swapped in.
 */
export default function GlobeFallback() {
  return (
    <div className="relative h-full w-full" aria-hidden="true">
      <div
        className="absolute left-1/2 top-1/2 aspect-square w-[85%] max-w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-90"
        style={{
          background:
            "radial-gradient(circle at 32% 28%, rgba(201,154,61,0.18) 0%, rgba(11,13,16,0.9) 45%, #050505 78%)",
          boxShadow:
            "0 0 90px 10px rgba(138,20,32,0.25), inset -30px -20px 80px rgba(0,0,0,0.6), inset 20px 15px 60px rgba(201,154,61,0.05)",
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 aspect-square w-[85%] max-w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/10"
        style={{ backgroundImage: "radial-gradient(circle at 50% 50%, transparent 60%, rgba(5,5,5,0.4) 100%)" }}
      >
        {heroDestinations.map((d, i) => (
          <span
            key={d.id}
            className="absolute h-1 w-1 rounded-full bg-gold/40"
            style={{
              left: `${50 + 30 * Math.cos((i / heroDestinations.length) * Math.PI * 2)}%`,
              top: `${50 + 30 * Math.sin((i / heroDestinations.length) * Math.PI * 2)}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
