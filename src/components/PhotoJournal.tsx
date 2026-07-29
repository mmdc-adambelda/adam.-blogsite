"use client";

import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, X } from "lucide-react";
import { journalPhotos, type JournalPhoto } from "@/data/journeys";
import ImagePlaceholder from "./ImagePlaceholder";

/**
 * Masonry photo journal with destination filters and a full-screen lightbox.
 * Keyboard: ← → navigate, Esc closes. Touch: swipe left/right.
 */
export default function PhotoJournal() {
  const [filter, setFilter] = useState("All");
  const [index, setIndex] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const touchX = useRef<number | null>(null);

  const destinations = useMemo(
    () => ["All", ...Array.from(new Set(journalPhotos.map((p) => p.destination)))],
    []
  );
  const photos = useMemo(
    () => (filter === "All" ? journalPhotos : journalPhotos.filter((p) => p.destination === filter)),
    [filter]
  );
  const active: JournalPhoto | null = index === null ? null : photos[index];

  const step = useCallback(
    (dir: 1 | -1) => {
      setIndex((i) => (i === null ? i : (i + dir + photos.length) % photos.length));
    },
    [photos.length]
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, step]);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter photos by destination">
        {destinations.map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => {
              setFilter(d);
              setIndex(null);
            }}
            aria-pressed={filter === d}
            className={`min-h-[44px] cursor-pointer rounded-full border px-4 text-sm transition-colors duration-200 ${
              filter === d
                ? "border-ember bg-wine/40 text-sand"
                : "border-white/12 text-cream/60 hover:border-white/30 hover:text-cream"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {photos.map((p, i) => (
          <motion.button
            key={p.src}
            type="button"
            onClick={() => setIndex(i)}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="group block w-full cursor-pointer break-inside-avoid text-left"
            aria-label={`Open photo: ${p.caption}`}
          >
            <div className="overflow-hidden rounded-2xl transition-transform duration-300 ease-expo group-hover:scale-[1.015]">
              <ImagePlaceholder
                src={p.src}
                filename={p.src}
                dimensions={`${p.width}x${p.height}`}
                alt={p.alt}
                subject={p.location}
                sizes="(max-width: 640px) 100vw, 400px"
              />
            </div>
            <p className="mt-2 text-sm text-cream/70">{p.caption}</p>
            <p className="flex items-center gap-1 text-xs text-cream/40">
              <MapPin className="h-3 w-3" aria-hidden="true" /> {p.location} · {p.date}
            </p>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-night/95 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={`Photo: ${active.caption}`}
            onClick={() => setIndex(null)}
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 48) step(dx < 0 ? 1 : -1);
              touchX.current = null;
            }}
          >
            <button type="button" aria-label="Close" onClick={() => setIndex(null)} className="absolute right-4 top-4 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white/[0.06] text-cream hover:bg-white/15">
              <X />
            </button>
            <button
              type="button"
              aria-label="Previous photo"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/[0.06] text-cream hover:bg-white/15 sm:left-6"
            >
              <ChevronLeft />
            </button>
            <motion.figure
              key={active.src}
              initial={reduce ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="max-h-full w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <ImagePlaceholder
                src={active.src}
                filename={active.src}
                dimensions={`${active.width}x${active.height}`}
                alt={active.alt}
                subject={active.location}
                sizes="(max-width: 1024px) 100vw, 900px"
              />
              <figcaption className="mt-3 text-center">
                <p className="text-cream">{active.caption}</p>
                <p className="text-sm text-cream/50">
                  {active.location} · {active.date}
                </p>
              </figcaption>
            </motion.figure>
            <button
              type="button"
              aria-label="Next photo"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/[0.06] text-cream hover:bg-white/15 sm:right-6"
            >
              <ChevronRight />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
