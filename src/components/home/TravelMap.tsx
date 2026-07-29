"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { destinations, type Destination } from "@/data/journeys";
import ImagePlaceholder from "@/components/ImagePlaceholder";

/**
 * Abstract, custom-drawn Asia-Pacific travel map (not a real map service).
 * Markers pulse; selecting one reveals the destination story preview.
 */
export default function TravelMap() {
  const [active, setActive] = useState<Destination | null>(null);
  const reduce = useReducedMotion();

  return (
    <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      <div className="card-surface relative overflow-hidden bg-[radial-gradient(ellipse_at_center,#101418_0%,#0a0c0e_70%)] p-2">
        <svg viewBox="0 0 100 80" className="w-full" role="group" aria-label="Map of Adam's destinations">
          {/* Abstract landmasses */}
          <g fill="#171b1f" stroke="#242a30" strokeWidth="0.3">
            <path d="M30,8 C45,4 58,8 62,16 C68,20 66,28 60,30 C55,34 46,32 40,28 C32,26 26,18 30,8 Z" />
            <path d="M38,36 C46,34 52,40 50,48 C48,56 42,60 36,56 C30,52 30,40 38,36 Z" />
            <path d="M62,42 C70,40 76,46 74,52 C78,56 74,64 68,66 C62,70 56,64 58,56 C56,48 56,44 62,42 Z" />
            <path d="M70,34 a3,2 0 1,0 6,0 a3,2 0 1,0 -6,0" />
            <path d="M20,50 C26,46 32,50 30,58 C28,66 20,68 16,62 C12,56 14,52 20,50 Z" />
          </g>
          {/* Route lines between destinations */}
          <g fill="none" stroke="#C99A3D" strokeWidth="0.35" strokeDasharray="1 1.4" opacity="0.6">
            <path d="M72,62 Q70,56 66,52" />
            <path d="M66,52 Q62,42 58,34" />
            <path d="M58,34 Q60,33 62,32" />
            <path d="M62,32 Q54,38 45,48" />
          </g>
          {destinations.map((d) => (
            <g key={d.id}>
              {!reduce && (
                <circle cx={d.x} cy={d.y} r="2.6" fill="rgba(215,38,56,0.25)">
                  <animate attributeName="r" values="1.4;3.4;1.4" dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.5;0;0.5" dur="2.4s" repeatCount="indefinite" />
                </circle>
              )}
            </g>
          ))}
        </svg>
        {/* HTML marker buttons overlayed for accessibility + touch size */}
        {destinations.map((d) => (
          <button
            key={d.id}
            type="button"
            onClick={() => setActive(d)}
            aria-label={`${d.name} — ${d.year}`}
            title={`${d.name} · ${d.year}`}
            className="group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer p-3"
            style={{ left: `${d.x}%`, top: `${(d.y / 80) * 100}%` }}
          >
            <span
              className={`block h-3.5 w-3.5 rounded-full border-2 border-night transition-all duration-200 group-hover:scale-125 ${
                active?.id === d.id ? "bg-sand" : "bg-ember"
              }`}
            />
            <span className="pointer-events-none absolute left-1/2 top-full -translate-x-1/2 whitespace-nowrap rounded bg-night/90 px-2 py-0.5 text-[10px] text-sand opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
              {d.name} · {d.year}
            </span>
          </button>
        ))}
      </div>

      <div className="card-surface relative min-h-[300px] p-6">
        <AnimatePresence mode="wait">
          {active ? (
            <motion.div
              key={active.id}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close destination preview"
                className="absolute right-4 top-4 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-cream/50 hover:text-cream"
              >
                <X className="h-5 w-5" />
              </button>
              <span className="stamp">{active.year}</span>
              <h3 className="h-display mt-3 text-2xl font-semibold">{active.name}</h3>
              <p className="text-sm text-cream/50">{active.country}</p>
              <div className="mt-4">
                <ImagePlaceholder
                  src={active.thumbnail.src}
                  filename={active.thumbnail.src}
                  dimensions="1600x1000"
                  alt={active.thumbnail.alt}
                  subject={active.name}
                  sizes="400px"
                />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-cream/70">{active.preview}</p>
              <Link
                href={`/${active.articleBase}/${active.articleSlug}`}
                className="mt-5 inline-flex min-h-[44px] cursor-pointer items-center gap-2 text-sm font-semibold text-ember transition-all hover:gap-3 hover:text-sand"
              >
                Read the full story <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex h-full flex-col items-center justify-center text-center"
            >
              <p className="font-hand text-2xl text-sand">Pick a pin ✈</p>
              <p className="mt-2 max-w-[24ch] text-sm text-cream/55">
                Every marker is a story. Select a destination to preview the journey.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
