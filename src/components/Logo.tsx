import Link from "next/link";

/**
 * Temporary text-based logo with an animated airplane trail.
 * REPLACE THE LOGO: drop your final SVG at
 *   /public/images/branding/adambelda-logo-placeholder.svg
 * then swap this component's contents for:
 *   <Image src="/images/branding/adambelda-logo-placeholder.svg" alt="Adam Belda" width={180} height={40} />
 * Dark/light PNG variants are reserved at /public/images/branding/.
 */
export default function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label="Adam Belda — home">
      <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true" className="shrink-0">
        <path
          d="M3 24 C 10 18, 16 14, 24 10"
          fill="none"
          stroke="#C99A3D"
          strokeWidth="1.5"
          strokeDasharray="3 4"
          strokeLinecap="round"
          className="opacity-70"
        />
        <g className="transition-transform duration-500 ease-expo group-hover:translate-x-1 group-hover:-translate-y-1">
          <path
            d="M22 12 L31 7 L27 16 L24 14.5 L21.5 17 L21 14 Z"
            fill="#D72638"
          />
        </g>
      </svg>
      <span className="font-display text-lg font-bold uppercase tracking-[0.22em] text-cream">
        Adam Belda
      </span>
    </Link>
  );
}
