"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScrollFlyInProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode; // For the static text content
  imageUrl: string;
  imageAlt?: string;
}

const ScrollFlyIn = React.forwardRef<HTMLDivElement, ScrollFlyInProps>(
  ({ children, imageUrl, imageAlt = "Animated image", className, ...props }, ref) => {
    const targetRef = React.useRef<HTMLDivElement>(null);
    const [failed, setFailed] = React.useState(false);
    // Fixed reference width (not read from `window`, so server and the client's first
    // render match exactly — reading window.innerWidth here would throw during SSR).
    // The multiplier below is already generous enough to clear any realistic viewport.
    const screenWidth = 1920;

    const { scrollYProgress } = useScroll({
      target: targetRef,
      offset: ["start end", "end start"],
    });

    // Using a more aggressive value for x-transform to ensure the plane is completely off-screen.
    const x = useTransform(
      scrollYProgress,
      [0.1, 0.8],
      [`-${5 * screenWidth}px`, `${2.5 * screenWidth}px`]
    );

    const opacity = useTransform(scrollYProgress, [0.1, 0.25, 0.7, 0.8], [0, 1, 1, 0]);

    return (
      <div ref={targetRef} className={cn("relative h-[200vh]", className)} {...props}>
        {/* The sticky container no longer has overflow-hidden, which prevents clipping */}
        <div ref={ref} className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
          {/* Static Text Content */}
          <div className="z-10 text-center">{children}</div>

          {/* Animated Image (Plane) */}
          <motion.div
            style={{ x, opacity }}
            className="absolute top-0 left-0 z-0 flex h-full w-full items-center"
          >
            {!failed ? (
              // Natural, unconstrained size needed for the fly-across effect; next/image requires fixed/fill sizing.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageUrl}
                alt={imageAlt}
                className="h-auto w-auto max-w-none"
                onError={() => setFailed(true)}
              />
            ) : (
              <div
                role="img"
                aria-label={imageAlt}
                className="flex aspect-[16/9] w-[90vw] max-w-4xl shrink-0 flex-col items-center justify-center gap-2 rounded-2xl border border-white/[0.07] bg-[radial-gradient(ellipse_at_center,rgba(110,13,24,0.35),rgba(5,5,5,0.92))] p-6 text-center"
              >
                <ImageIcon className="h-8 w-8 text-sand/60" aria-hidden="true" />
                <code className="max-w-full break-all rounded bg-night/60 px-2 py-1 text-[11px] text-cream/80">
                  {imageUrl}
                </code>
                <p className="text-xs text-cream/50">Recommended: 2400x1350 (WebP)</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    );
  }
);

ScrollFlyIn.displayName = "ScrollFlyIn";

export { ScrollFlyIn };
