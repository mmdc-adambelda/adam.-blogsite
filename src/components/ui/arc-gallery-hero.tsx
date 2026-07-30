"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, MotionConfig } from "framer-motion";
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
  // Must fully contain the arc's peak (which sits `radius` above the baseline) plus
  // half a tile of headroom — previously capped independently of radius, which let
  // the topmost photos extend above the container and get clipped by the sticky header.
  const arcHeight = radius + tileSize / 2 + 24;

  return (
    // reducedMotion="never" overrides Framer Motion's own default of silently turning
    // every transform animation into an instant snap when the OS reports a reduced-motion
    // preference — otherwise this component can never animate on a machine with, e.g.,
    // Windows' "Animation effects" turned off, no matter what this component's own code does.
    <MotionConfig reducedMotion="never">
      <section className={cn("relative overflow-hidden pb-16 pt-16 sm:pt-20", className)} aria-label="Photo journal introduction">
        <div ref={containerRef} className="relative mx-auto" style={{ height: arcHeight, maxWidth: DEFAULT_WIDTH }}>
          {images.map((image, i) => {
            const { x, y, rotate } = arcTransform(i, total, radius);
            // Tiles fly in from scattered, rotated positions and settle into the arc
            // (outer layer, plays once). Once settled, each keeps gently floating up
            // and down forever (inner layer, its own independent loop) so the arc
            // reads as continuously, organically alive rather than a static image.
            const flyFromX = x + (i % 2 === 0 ? -70 : 70);
            const flyFromY = y + 140;
            const flyFromRotate = rotate + (i % 2 === 0 ? -35 : 35);
            const entranceDuration = 0.7;
            const entranceDelay = 0.05 * i;
            const floatDuration = 2.6 + (i % 5) * 0.35;
            return (
              <motion.div
                key={image.src + i}
                className="absolute"
                style={{
                  width: tileSize,
                  height: tileSize,
                  left: "50%",
                  bottom: 0,
                  marginLeft: -tileSize / 2,
                }}
                initial={{ opacity: 0, scale: 0.4, x: flyFromX, y: flyFromY, rotate: flyFromRotate }}
                animate={{ opacity: 1, scale: 1, x, y, rotate }}
                transition={{ duration: entranceDuration, delay: entranceDelay, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Independent continuous float loop, layered on top of the settled position above.
                    Deliberately not gated behind prefers-reduced-motion: this motion is a few
                    pixels of drift, not the kind of large/vestibular-risk animation that
                    preference is meant to suppress, and gating it made the whole gallery look
                    permanently frozen for anyone with "Animation effects" off in Windows. */}
                <motion.div
                  className="h-full w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: floatDuration,
                    delay: entranceDuration + entranceDelay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{ scale: 1.1, zIndex: 20 }}
                >
                  <Image src={image.src} alt={image.alt} fill sizes="120px" className="object-cover" />
                </motion.div>
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
    </MotionConfig>
  );
}
