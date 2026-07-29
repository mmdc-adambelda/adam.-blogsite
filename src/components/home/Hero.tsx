"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { Component, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin } from "lucide-react";
import GlobeFallback from "@/components/hero/GlobeFallback";
import { heroDestinations } from "@/components/hero/destinationData";

const InteractiveTravelGlobe = dynamic(() => import("@/components/hero/InteractiveTravelGlobe"), {
  ssr: false,
  loading: () => <GlobeFallback />,
});

interface GlobeErrorBoundaryState {
  hasError: boolean;
}

/** Catches a failed dynamic import / runtime WebGL error and falls back to the static globe. */
class GlobeErrorBoundary extends Component<{ children: ReactNode }, GlobeErrorBoundaryState> {
  state: GlobeErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("Hero globe failed to load:", error);
  }

  render() {
    if (this.state.hasError) return <GlobeFallback />;
    return this.props.children;
  }
}

/**
 * Hero: brand-dark backdrop with an interactive 3D globe (destinations.ts) on the right,
 * loaded client-only via next/dynamic so it never blocks first paint or SSR/hydration.
 * See src/components/hero/ for the globe, its data, and its static fallback.
 */
export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative flex min-h-[92svh] items-center overflow-hidden bg-night"
      aria-label="Introduction"
    >
      {/* Dark red/black brand backdrop */}
      <div
        className="absolute inset-0 bg-[radial-gradient(120%_85%_at_74%_45%,rgba(110,13,24,0.4)_0%,rgba(24,6,8,0.55)_45%,#050505_78%)]"
        aria-hidden="true"
      />

      {/* Globe: behind the copy on mobile, biased right (bleeding past the edge) from md up */}
      <div
        className="absolute inset-0 opacity-80 md:inset-y-0 md:left-[35%] md:right-[-18%] md:opacity-100 lg:left-[42%] lg:right-[-20%]"
        aria-hidden="true"
      >
        <GlobeErrorBoundary>
          <InteractiveTravelGlobe />
        </GlobeErrorBoundary>
      </div>

      {/* Readability scrim: desktop (left-heavy, fading toward the globe) */}
      <div
        className="absolute inset-0 hidden bg-[linear-gradient(100deg,rgba(5,5,5,0.82)_0%,rgba(5,5,5,0.6)_30%,rgba(5,5,5,0.22)_54%,rgba(5,5,5,0)_74%)] md:block"
        aria-hidden="true"
      />
      {/* Readability scrim: mobile (centered radial, tapering — not a flat uniform layer) */}
      <div
        className="absolute inset-0 bg-[radial-gradient(120%_65%_at_50%_42%,rgba(5,5,5,0.82)_0%,rgba(5,5,5,0.55)_45%,rgba(5,5,5,0.12)_78%)] md:hidden"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="container-site relative z-10 py-24">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="eyebrow"
        >
          Travel Far. Live Fully. Remember Everything.
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="h-display mt-3 max-w-3xl text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl"
        >
          A Life Measured in <span className="text-ember">Journeys</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/75"
        >
          I&apos;m Adam Belda—a traveller, storyteller, technology professional, gamer, and
          lifelong collector of meaningful experiences. This is where I document the places I
          visit, the food I discover, and the people and memories that make every journey
          unforgettable.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : 0.36, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 flex flex-wrap gap-4"
        >
          <Link href="/travel-stories" className="btn-primary">
            Explore My Journeys
          </Link>
          <Link href="/about" className="btn-secondary">
            Meet Adam
          </Link>
        </motion.div>
      </div>

      {/* Same destination info as the globe markers, always available to screen readers
          (hover/pointer interaction on the canvas is never the only way to reach it). */}
      <div className="sr-only">
        <h2>Destinations visited</h2>
        <ul>
          {heroDestinations.map((d) =>
            d.href ? (
              <li key={d.id}>
                <Link href={d.href}>{d.name} — read the story</Link>
              </li>
            ) : (
              <li key={d.id}>{d.name}</li>
            )
          )}
        </ul>
      </div>

      {/* Scroll indicator — location pin */}
      <motion.div
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-cream/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]"
        animate={reduce ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        aria-hidden="true"
      >
        <MapPin className="h-6 w-6" />
      </motion.div>
    </section>
  );
}
