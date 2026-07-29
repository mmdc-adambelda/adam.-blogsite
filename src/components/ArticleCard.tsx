"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { Clock, MapPin, ArrowRight } from "lucide-react";
import type { Article } from "@/data/articles/types";
import { articleUrl } from "@/data/articles/types";
import ImagePlaceholder from "./ImagePlaceholder";

/** Featured/listing card with subtle cursor-tilt on desktop. */
export default function ArticleCard({ article, list = false }: { article: Article; list?: boolean }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 160, damping: 18 });
  const sry = useSpring(ry, { stiffness: 160, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 6);
    rx.set(((e.clientY - r.top) / r.height - 0.5) * -6);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={reduce ? undefined : { rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      className={`group card-surface overflow-hidden transition-shadow duration-300 hover:shadow-[0_18px_50px_rgba(110,13,24,0.35)] ${
        list ? "grid gap-0 sm:grid-cols-[280px_1fr]" : "flex flex-col"
      }`}
    >
      <div className="relative overflow-hidden">
        <div className="transition-transform duration-500 ease-expo group-hover:scale-[1.04]">
          <ImagePlaceholder
            src={article.featuredImage.src}
            filename={article.featuredImage.src}
            dimensions={article.featuredImage.dimensions}
            alt={article.featuredImage.alt}
            subject={article.destination}
            className="!rounded-none border-0"
            sizes="(max-width: 640px) 100vw, 420px"
          />
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-night/80 px-3 py-1 text-xs font-semibold text-sand backdrop-blur">
          {article.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-cream/50">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-ember" /> {article.destination}
          </span>
          <span>{article.travelDate}</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {article.readingTime} min read
          </span>
        </div>
        <h3 className="h-display mt-3 text-xl font-semibold leading-snug">
          <Link href={articleUrl(article)} className="cursor-pointer transition-colors hover:text-sand">
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-cream/60">{article.excerpt}</p>
        <div className="mt-auto pt-5">
          <Link
            href={articleUrl(article)}
            className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 text-sm font-semibold text-ember transition-all duration-200 hover:gap-3 hover:text-sand"
          >
            Read My Story <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
