"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Plane } from "lucide-react";

/** Sticky reading-progress bar styled as a flight route with a plane marker. */
export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });
  const planeLeft = useTransform(progress, (v) => `${Math.min(v * 100, 98.5)}%`);
  return (
    <div className="fixed inset-x-0 top-16 z-40 h-[3px] bg-white/[0.06]" aria-hidden="true">
      <motion.div style={{ scaleX: progress }} className="h-full origin-left bg-gradient-to-r from-wine via-ember to-gold" />
      <motion.div style={{ left: planeLeft }} className="absolute -top-2 text-gold">
        <Plane className="h-4 w-4 rotate-45" />
      </motion.div>
    </div>
  );
}
