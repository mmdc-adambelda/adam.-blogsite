"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Plane } from "lucide-react";
import { timeline } from "@/data/journeys";
import Reveal from "@/components/ui/Reveal";

/**
 * Vertical timeline animated like a flight route — a small plane travels the
 * dashed path as the user scrolls (scrub-driven, per the motion preset).
 */
export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.6"],
  });
  const planeTop = useTransform(scrollYProgress, [0, 1], ["0%", "96%"]);
  const pathScale = scrollYProgress;

  return (
    <div ref={ref} className="relative mx-auto max-w-3xl">
      {/* Route line */}
      <div className="absolute bottom-0 left-[18px] top-0 w-px border-l border-dashed border-sand/25 sm:left-1/2" aria-hidden="true" />
      <motion.div
        style={{ scaleY: pathScale }}
        className="absolute bottom-0 left-[18px] top-0 w-[2px] origin-top bg-gradient-to-b from-ember to-gold sm:left-1/2"
        aria-hidden="true"
      />
      {!reduce && (
        <motion.div
          style={{ top: planeTop }}
          className="absolute left-[18px] z-10 -translate-x-1/2 text-cream sm:left-1/2"
          aria-hidden="true"
        >
          <Plane className="h-5 w-5 rotate-135 drop-shadow-[0_0_6px_rgba(215,38,56,0.8)]" style={{ transform: "rotate(135deg)" }} />
        </motion.div>
      )}

      <ol className="space-y-12">
        {timeline.map((stop, i) => (
          <li key={stop.year} className="relative">
            <Reveal
              delay={0.05 * i}
              className={`ml-12 sm:ml-0 sm:w-[calc(50%-2.5rem)] ${
                i % 2 ? "sm:ml-auto" : ""
              }`}
            >
              <Link
                href={stop.href}
                className="card-surface group block cursor-pointer p-5 transition-all duration-300 hover:border-ember/40 hover:shadow-[0_10px_36px_rgba(110,13,24,0.3)]"
              >
                <span className="stamp">{stop.year}</span>
                <h3 className="h-display mt-2 text-lg font-semibold transition-colors group-hover:text-sand">
                  {stop.title}
                </h3>
                <p className="mt-1 text-sm text-cream/60">{stop.description}</p>
              </Link>
            </Reveal>
            <span
              className="absolute left-[18px] top-6 h-3 w-3 -translate-x-1/2 rounded-full bg-ember animate-pulse-pin sm:left-1/2"
              aria-hidden="true"
            />
          </li>
        ))}
      </ol>
    </div>
  );
}
