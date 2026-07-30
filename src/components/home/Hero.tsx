"use client";

import Image from "next/image";
import { motion, MotionConfig } from "framer-motion";
import { ChevronDown } from "lucide-react";

/**
 * Hero: bold split-name portrait, ported from
 * https://21st.dev/@waleedkibhen/components/portfolio-hero (source itself wasn't
 * retrievable — rebuilt from its published preview) and reskinned to this site's
 * dark/vampire-red brand palette. The reference's own nav bar (hamburger/logo/theme
 * toggle) is intentionally left out here — the site already has a real Header with
 * that navigation, so duplicating it inside the hero would just be a second, inert copy.
 *
 * reducedMotion="never" (see MotionConfig) overrides Framer Motion's own default of
 * silently turning every animation into an instant snap when the OS reports a
 * reduced-motion preference — this hero's entrance is a one-time blur/fade-in mild
 * enough not to warrant disappearing over a system-wide animation toggle.
 */
export default function Hero() {
  return (
    <MotionConfig reducedMotion="never">
      <section
        className="relative flex min-h-[92svh] flex-col items-center justify-center overflow-hidden bg-night px-4 py-20 text-center"
        aria-label="Introduction"
      >
        <motion.h1
          aria-label="Adam Belda"
          initial={{ opacity: 0, filter: "blur(24px)", y: 24 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex select-none flex-col items-center leading-[0.82]"
        >
          <span
            aria-hidden="true"
            className="bg-gradient-to-b from-ember to-wine bg-clip-text text-[19vw] font-black uppercase tracking-tight text-transparent sm:text-[15vw] lg:text-[11rem]"
          >
            Adam
          </span>

          {/* Overlapping photo */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 z-10 aspect-[1080/1920] h-full w-auto -translate-x-1/2 -translate-y-1/2"
          >
            <Image
              src="/images/home/adam-transparent.png"
              alt=""
              fill
              priority
              sizes="(max-width: 640px) 55vw, 380px"
              className="object-contain object-bottom"
            />
          </div>

          <span
            aria-hidden="true"
            className="bg-gradient-to-b from-ember to-wine bg-clip-text text-[19vw] font-black uppercase tracking-tight text-transparent sm:text-[15vw] lg:text-[11rem]"
          >
            Belda
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 mt-8 max-w-md text-base text-cream/55 sm:text-lg"
        >
          Blogging since 2012. Tech and Lifestyle.
        </motion.p>

        <motion.div
          className="absolute bottom-8 text-cream/50"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </section>
    </MotionConfig>
  );
}
