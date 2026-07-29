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
 * Full-screen cinematic hero: a colorful tropical-sunset sky, layered island
 * silhouettes, animated turquoise waves, swaying palms, a glowing sun, and a
 * plane on a flight path, with cursor parallax. Unlike the rest of the site
 * (dark red/black), this banner leans fully into tropical color.
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
      {/* Optional real-photo slot (currently empty placeholder path) */}
      <div
        className="absolute inset-0 bg-[url('/images/home/adambelda-tropical-hero-placeholder.webp')] bg-cover bg-center opacity-30"
        aria-hidden="true"
      />

      {/* Tropical dusk-to-sunset sky */}
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,#0B2A3D_0%,#144F63_20%,#2E7E95_40%,#3FA6B8_58%,#E8905A_72%,#E8703A_85%,#6E0D18_100%)]"
        aria-hidden="true"
      />

      {/* Glowing sun low on the horizon */}
      <motion.div
        className="absolute right-[18%] top-[30%] h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(255,224,153,0.95)_0%,rgba(233,155,58,0.55)_45%,rgba(233,155,58,0)_75%)] blur-[2px] sm:h-56 sm:w-56"
        animate={reduce ? undefined : { opacity: [0.6, 0.95, 0.6], scale: [1, 1.08, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      {/* Drifting clouds (CSS animation is already neutralized site-wide under prefers-reduced-motion) */}
      <div className="absolute left-0 top-[12%] h-10 w-48 animate-drift rounded-full bg-cream/40 blur-2xl" aria-hidden="true" />
      <div className="absolute left-0 top-[22%] h-8 w-64 animate-drift rounded-full bg-cream/30 blur-2xl [animation-delay:-30s]" aria-hidden="true" />
      <div className="absolute left-0 top-[36%] h-6 w-40 animate-drift rounded-full bg-cream/25 blur-xl [animation-delay:-45s]" aria-hidden="true" />

      {/* Far island silhouettes (hazy jungle ridge) */}
      <motion.svg
        style={far}
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0,200 L0,150 Q180,90 340,140 T680,120 Q860,80 1040,130 T1440,110 L1440,200 Z" fill="#1F4B4A" opacity="0.75" />
      </motion.svg>

      {/* Near island + waves */}
      <motion.div style={near} className="absolute inset-x-0 bottom-0" aria-hidden="true">
        <svg className="w-full" viewBox="0 0 1440 160" preserveAspectRatio="none">
          <path d="M0,160 L0,120 Q240,60 480,110 T960,95 Q1200,60 1440,100 L1440,160 Z" fill="#2F6B4F" />
        </svg>
        <div className="relative -mt-1 h-20 overflow-hidden">
          <svg className="absolute inset-x-0 top-0 w-[110%] animate-wave text-[#1B6B7A]" viewBox="0 0 1440 60" preserveAspectRatio="none">
            <path d="M0,30 Q120,10 240,30 T480,30 T720,30 T960,30 T1200,30 T1440,30 L1440,60 L0,60 Z" fill="currentColor" />
          </svg>
          <svg className="absolute inset-x-0 top-3 w-[110%] animate-wave text-[#3FA6B8]/80 [animation-delay:-4s]" viewBox="0 0 1440 60" preserveAspectRatio="none">
            <path d="M0,30 Q120,50 240,30 T480,30 T720,30 T960,30 T1200,30 T1440,30 L1440,60 L0,60 Z" fill="currentColor" />
          </svg>
          <svg className="absolute inset-x-0 top-6 w-[110%] animate-wave text-cream/50 [animation-delay:-2s]" viewBox="0 0 1440 60" preserveAspectRatio="none">
            <path d="M0,30 Q120,20 240,30 T480,30 T720,30 T960,30 T1200,30 T1440,30 L1440,60 L0,60 Z" fill="currentColor" />
          </svg>
        </div>
      </motion.div>

      {/* Palms (sway) */}
      <svg className="absolute -left-6 bottom-0 h-56 w-40 origin-bottom animate-sway text-[#3E2A1B] sm:h-72" viewBox="0 0 100 180" aria-hidden="true">
        <path d="M50,180 C48,120 46,80 52,40" stroke="currentColor" strokeWidth="6" fill="none" />
        <g fill="#2F6B4F">
          <path d="M52,42 C30,20 12,18 2,26 C20,30 36,38 52,46 Z" />
          <path d="M52,42 C74,20 92,18 100,28 C82,30 66,38 52,46 Z" opacity="0.9" />
          <path d="M52,40 C46,14 34,4 20,4 C34,14 44,28 52,44 Z" fill="#3F8563" />
          <path d="M52,40 C58,14 70,4 84,6 C70,14 60,28 52,44 Z" fill="#3F8563" />
        </g>
      </svg>
      <svg className="absolute -right-4 bottom-0 h-40 w-32 origin-bottom animate-sway text-[#3E2A1B] opacity-90 [animation-delay:-3s] sm:h-52" viewBox="0 0 100 180" aria-hidden="true">
        <path d="M50,180 C52,130 54,95 48,50" stroke="currentColor" strokeWidth="5" fill="none" />
        <g fill="#2F6B4F">
          <path d="M48,52 C28,32 12,30 4,36 C22,40 36,46 48,54 Z" />
          <path d="M48,52 C68,32 84,30 92,38 C74,40 60,46 48,54 Z" opacity="0.9" />
          <path d="M48,50 C42,26 32,18 20,18 C32,26 40,38 48,52 Z" fill="#3F8563" />
        </g>
      </svg>

      {/* Flight path + plane */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path id="heroFlight" d="M-5,70 C 25,40 55,20 105,12" fill="none" stroke="#F7F3EE" strokeWidth="0.25" strokeDasharray="1 1.6" opacity="0.65" />
      </svg>
      <motion.div
        className="absolute left-0 top-0"
        initial={{ offsetDistance: "0%" }}
        animate={{ offsetDistance: reduce ? "35%" : "100%" }}
        transition={reduce ? { duration: 0 } : { duration: 26, repeat: Infinity, ease: "linear" }}
        style={{ offsetPath: "path('M -60 480 C 300 280, 700 140, 2100 60')" }}
        aria-hidden="true"
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="#F7F3EE" className="drop-shadow-[0_0_8px_rgba(233,155,58,0.85)]">
          <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
        </svg>
      </motion.div>

      {/* Destination labels */}
      {labels.map((l, i) => (
        <motion.span
          key={l.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduce ? 0 : 1 + i * 0.25 }}
          className="absolute hidden items-center gap-1 text-[11px] uppercase tracking-widest text-cream/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)] md:flex"
          style={{ left: l.x, top: l.y }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-pin" /> {l.name}
        </motion.span>
      ))}

      {/* Readability scrim: dark behind the copy, fading out toward the scenery */}
      <div
        className="absolute inset-0 bg-[linear-gradient(100deg,rgba(5,5,5,0.78)_0%,rgba(5,5,5,0.55)_28%,rgba(5,5,5,0.2)_52%,rgba(5,5,5,0)_72%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(0deg,rgba(5,5,5,0.55)_0%,rgba(5,5,5,0)_100%)]"
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

      {/* Scroll indicator — location pin */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-cream/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]"
        animate={reduce ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        aria-hidden="true"
      >
        <MapPin className="h-6 w-6" />
      </motion.div>

      {/* Cursor-following tropical leaves */}
      <motion.svg
        style={leaves}
        className="pointer-events-none absolute -right-8 top-10 h-48 w-48 text-jungle/40 sm:h-64 sm:w-64"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <path d="M90,10 C60,15 35,35 25,70 C55,62 78,42 90,10 Z" fill="currentColor" />
        <path d="M95,40 C75,42 58,55 50,80 C70,74 86,60 95,40 Z" fill="currentColor" opacity="0.7" />
      </motion.svg>
    </section>
  );
}
