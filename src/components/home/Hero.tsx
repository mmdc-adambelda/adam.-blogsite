"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { MapPin } from "lucide-react";

const labels = [
  { name: "Davao", x: "78%", y: "64%" },
  { name: "Boracay", x: "68%", y: "50%" },
  { name: "Macau", x: "48%", y: "30%" },
  { name: "Hong Kong", x: "56%", y: "26%" },
  { name: "Ho Chi Minh City", x: "34%", y: "44%" },
];

/**
 * Full-screen cinematic hero: layered island silhouettes, animated waves,
 * swaying palms, a plane on a glowing flight path, and cursor parallax.
 * Background image slot: /public/images/home/adambelda-tropical-hero-placeholder.webp (1920x1080)
 */
export default function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 });
  const sy = useSpring(my, { stiffness: 50, damping: 20 });
  const far = { x: useTransform(sx, (v) => v * -8), y: useTransform(sy, (v) => v * -5) };
  const near = { x: useTransform(sx, (v) => v * -18), y: useTransform(sy, (v) => v * -10) };
  const leaves = { x: useTransform(sx, (v) => v * 26), y: useTransform(sy, (v) => v * 14) };

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      className="relative flex min-h-[92svh] items-center overflow-hidden bg-night"
      aria-label="Introduction"
    >
      {/* Sunset glow + hero image slot */}
      <div
        className="absolute inset-0 bg-[url('/images/home/adambelda-tropical-hero-placeholder.webp')] bg-cover bg-center opacity-40"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(120%_85%_at_50%_100%,rgba(110,13,24,0.75)_0%,rgba(164,22,26,0.35)_32%,rgba(5,5,5,0.35)_62%,#050505_100%)]"
        aria-hidden="true"
      />

      {/* Drifting clouds */}
      {!reduce && (
        <>
          <div className="absolute left-0 top-[14%] h-10 w-48 animate-drift rounded-full bg-cream/[0.05] blur-2xl" aria-hidden="true" />
          <div className="absolute left-0 top-[26%] h-8 w-64 animate-drift rounded-full bg-cream/[0.04] blur-2xl [animation-delay:-30s]" aria-hidden="true" />
        </>
      )}

      {/* Far island silhouettes */}
      <motion.svg
        style={reduce ? undefined : far}
        className="absolute bottom-0 left-0 w-full text-charcoal"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0,200 L0,150 Q180,90 340,140 T680,120 Q860,80 1040,130 T1440,110 L1440,200 Z" fill="currentColor" opacity="0.8" />
      </motion.svg>

      {/* Near island + waves */}
      <motion.div style={reduce ? undefined : near} className="absolute inset-x-0 bottom-0" aria-hidden="true">
        <svg className="w-full text-ash" viewBox="0 0 1440 160" preserveAspectRatio="none">
          <path d="M0,160 L0,120 Q240,60 480,110 T960,95 Q1200,60 1440,100 L1440,160 Z" fill="currentColor" />
        </svg>
        <div className="relative -mt-1 h-16 overflow-hidden">
          <svg className="absolute inset-x-0 top-0 w-[110%] animate-wave text-wine/50" viewBox="0 0 1440 60" preserveAspectRatio="none">
            <path d="M0,30 Q120,10 240,30 T480,30 T720,30 T960,30 T1200,30 T1440,30 L1440,60 L0,60 Z" fill="currentColor" />
          </svg>
          <svg className="absolute inset-x-0 top-3 w-[110%] animate-wave text-ocean/25 [animation-delay:-4s]" viewBox="0 0 1440 60" preserveAspectRatio="none">
            <path d="M0,30 Q120,50 240,30 T480,30 T720,30 T960,30 T1200,30 T1440,30 L1440,60 L0,60 Z" fill="currentColor" />
          </svg>
        </div>
      </motion.div>

      {/* Palms (sway) */}
      <svg className="absolute -left-6 bottom-0 h-56 w-40 origin-bottom animate-sway text-night sm:h-72" viewBox="0 0 100 180" aria-hidden="true">
        <path d="M50,180 C48,120 46,80 52,40" stroke="#111111" strokeWidth="6" fill="none" />
        <g fill="#0d0d0d">
          <path d="M52,42 C30,20 12,18 2,26 C20,30 36,38 52,46 Z" />
          <path d="M52,42 C74,20 92,18 100,28 C82,30 66,38 52,46 Z" />
          <path d="M52,40 C46,14 34,4 20,4 C34,14 44,28 52,44 Z" />
          <path d="M52,40 C58,14 70,4 84,6 C70,14 60,28 52,44 Z" />
        </g>
      </svg>

      {/* Flight path + plane */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path id="heroFlight" d="M-5,70 C 25,40 55,20 105,12" fill="none" stroke="#C99A3D" strokeWidth="0.25" strokeDasharray="1 1.6" opacity="0.55" />
      </svg>
      {!reduce && (
        <motion.div
          className="absolute left-0 top-0"
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
          style={{ offsetPath: "path('M -60 480 C 300 280, 700 140, 2100 60')" }}
          aria-hidden="true"
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="#F7F3EE" className="drop-shadow-[0_0_8px_rgba(215,38,56,0.7)]">
            <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
          </svg>
        </motion.div>
      )}

      {/* Destination labels */}
      {labels.map((l, i) => (
        <motion.span
          key={l.name}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 + i * 0.25 }}
          className="absolute hidden items-center gap-1 text-[11px] uppercase tracking-widest text-sand/60 md:flex"
          style={{ left: l.x, top: l.y }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-ember animate-pulse-pin" /> {l.name}
        </motion.span>
      ))}

      {/* Content */}
      <div className="container-site relative z-10 py-24">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="eyebrow"
        >
          Travel Far. Live Fully. Remember Everything.
        </motion.p>
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="h-display mt-3 max-w-3xl text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl"
        >
          A Life Measured in <span className="text-ember">Journeys</span>
        </motion.h1>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/75"
        >
          I&apos;m Adam Belda—a traveller, storyteller, technology professional, gamer, and
          lifelong collector of meaningful experiences. This is where I document the places I
          visit, the food I discover, and the people and memories that make every journey
          unforgettable.
        </motion.p>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
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

      {/* Scroll indicator — location pin */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sand/70"
        animate={reduce ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        aria-hidden="true"
      >
        <MapPin className="h-6 w-6" />
      </motion.div>

      {/* Cursor-following tropical leaves */}
      <motion.svg
        style={reduce ? undefined : leaves}
        className="pointer-events-none absolute -right-8 top-10 h-48 w-48 text-wine/25 sm:h-64 sm:w-64"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <path d="M90,10 C60,15 35,35 25,70 C55,62 78,42 90,10 Z" fill="currentColor" />
        <path d="M95,40 C75,42 58,55 50,80 C70,74 86,60 95,40 Z" fill="currentColor" opacity="0.7" />
      </motion.svg>
    </section>
  );
}
