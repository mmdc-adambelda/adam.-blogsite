"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, ImageIcon } from "lucide-react";

interface Props {
  src?: string;
  filename: string;
  dimensions: string;
  alt: string;
  subject?: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
}

/**
 * Reusable image slot.
 * - If the real file exists at `src`, it renders via next/image (lazy by default).
 * - Until then it shows a styled placeholder displaying filename, dimensions,
 *   subject, and suggested alt text — so the layout never shifts.
 * Replace images by dropping correctly-named files into /public (see IMAGE-REPLACEMENT-GUIDE.md).
 */
export default function ImagePlaceholder({
  src,
  filename,
  dimensions,
  alt,
  subject,
  priority = false,
  className = "",
  sizes = "(max-width: 768px) 100vw, 1200px",
}: Props) {
  const [failed, setFailed] = useState(false);
  const [w, h] = dimensions.split("x").map((n) => parseInt(n, 10));
  const ratio = w && h ? `${w} / ${h}` : "16 / 10";
  const resolvedSrc = src ?? `/${filename.replace(/^\//, "")}`;

  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl border border-white/[0.07] bg-ash ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {!failed ? (
        <Image
          src={resolvedSrc}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[radial-gradient(ellipse_at_top,rgba(110,13,24,0.45),rgba(5,5,5,0.9))] p-6 text-center"
        >
          <ImageIcon className="h-8 w-8 text-sand/60" aria-hidden="true" />
          {subject && (
            <p className="flex items-center gap-1.5 text-sm font-semibold text-sand">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> {subject}
            </p>
          )}
          <code className="max-w-full break-all rounded bg-night/60 px-2 py-1 text-[11px] text-cream/80">
            {resolvedSrc}
          </code>
          <p className="text-xs text-cream/50">Recommended: {dimensions} (WebP)</p>
          <p className="max-w-md text-xs italic text-cream/40">Alt: {alt}</p>
        </div>
      )}
    </div>
  );
}
