"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ArcGalleryImage {
  src: string;
  alt: string;
}

interface ArcGalleryHeroProps {
  images: ArcGalleryImage[];
  heading: React.ReactNode;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  className?: string;
}

const START_ANGLE = 170; // degrees, left end of the arc
const END_ANGLE = 10; // degrees, right end of the arc
const DEFAULT_WIDTH = 1100; // fixed reference used for both server and first client render

/** Position + rotation for one tile along a semicircular arc, in plain numbers (px/deg). */
function arcTransform(index: number, total: number, radius: number) {
  const t = total <= 1 ? 0.5 : index / (total - 1);
  const angleDeg = START_ANGLE + (END_ANGLE - START_ANGLE) * t;
  const angleRad = (angleDeg * Math.PI) / 180;
  return {
    x: Math.cos(angleRad) * radius,
    y: -Math.sin(angleRad) * radius,
    rotate: angleDeg - 90,
  };
}

/**
 * Arc Gallery hero — a fan of photos along a semicircular arc above a centered
 * heading and CTAs. Ported from https://21st.dev/@minhxthanh/components/arc-gallery-hero-component
 * (rebuilt from its published preview, since the source itself wasn't retrievable)
 * and reskinned to this site's dark brand palette.
 *
 * Positions are plain numbers driven through Framer Motion's own x/y/rotate/scale
 * composition rather than a hand-built CSS `transform` string — motion.div manages
 * that property itself, so a manually-set transform on the same node gets clobbered.
 */
export default function ArcGalleryHero({
  images,
  heading,
  primaryCta,
  secondaryCta,
  className,
}: ArcGalleryHeroProps) {
  const reducedMotionPref = useReducedMotion();
  const reduce = reducedMotionPref ?? false;
  const total = images.length;

  const containerRef = React.useRef<HTMLDivElement>(null);
  // Fixed default (matches server render exactly) corrected once mounted — avoids
  // both the SSR crash of reading window/layout directly and any hydration mismatch.
  const [width, setWidth] = React.useState(DEFAULT_WIDTH);

  React.useEffect(() => {
    const measure = () => {
      if (containerRef.current) setWidth(containerRef.current.getBoundingClientRect().width);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const radius = Math.min(width * 0.42, 440);
  const tileSize = Math.min(Math.max(width * 0.09, 56), 104);
  const arcHeight = Math.min(width * 0.42, 300);

  return (
    <section className={cn("relative overflow-hidden pb-16 pt-10 sm:pt-16", className)} aria-label="Photo journal introduction">
      <div ref={containerRef} className="relative mx-auto" style={{ height: arcHeight, maxWidth: DEFAULT_WIDTH }}>
        {images.map((image, i) => {
          const { x, y, rotate } = arcTransform(i, total, radius);
          return (
            <motion.div
              key={image.src + i}
              className="absolute overflow-hidden rounded-2xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
              style={{
                width: tileSize,
                height: tileSize,
                left: "50%",
                bottom: 0,
                marginLeft: -tileSize / 2,
              }}
              initial={{ opacity: 0, scale: 0.6, x, y, rotate }}
              animate={{ opacity: 1, scale: 1, x, y, rotate }}
              transition={{
                duration: reduce ? 0 : 0.6,
                delay: reduce ? 0 : 0.04 * i,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={reduce ? undefined : { scale: 1.08, zIndex: 20 }}
            >
              <Image src={image.src} alt={image.alt} fill sizes="120px" className="object-cover" />
            </motion.div>
          );
        })}
      </div>

      <div className="container-site relative z-10 mt-8 text-center">
        <h1 className="h-display mx-auto max-w-3xl text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
          {heading}
        </h1>
        {(primaryCta || secondaryCta) && (
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {primaryCta && (
              <Link href={primaryCta.href} className="btn-primary">
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link href={secondaryCta.href} className="btn-secondary">
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
