"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { UtensilsCrossed } from "lucide-react";
import { foods } from "@/data/journeys";

/** Interactive food discovery cards with a subtle steam/glow reveal on hover. */
export default function FoodGrid() {
  const reduce = useReducedMotion();
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {foods.map((f, i) => (
        <motion.div
          key={f.name}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href={f.href}
            className="group card-surface relative block h-full cursor-pointer overflow-hidden p-5 transition-all duration-300 hover:border-gold/40"
          >
            {/* steam / glow */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-10 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-sunset/0 blur-2xl transition-all duration-500 ease-expo group-hover:bg-sunset/25"
            />
            <UtensilsCrossed className="h-5 w-5 text-gold" aria-hidden="true" />
            <h3 className="h-display mt-3 text-lg font-semibold transition-colors group-hover:text-sand">
              {f.name}
            </h3>
            <p className="text-xs uppercase tracking-wider text-cream/40">{f.origin}</p>
            <p className="mt-2 text-sm leading-relaxed text-cream/60 opacity-90 transition-opacity group-hover:opacity-100">
              {f.note}
            </p>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
