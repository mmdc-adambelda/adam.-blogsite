import Link from "next/link";
import { ScrollFlyIn } from "@/components/ui/hero-section-3";

/**
 * Hero: scroll-triggered image fly-in (src/components/ui/hero-section-3.tsx),
 * ported from https://21st.dev/@ravikatiyar162/components/hero-section-3.
 */
export default function Hero() {
  return (
    <section className="bg-night" aria-label="Introduction">
      <ScrollFlyIn
        imageUrl="/images/home/adambelda-hero-journey-placeholder.webp"
        imageAlt="Adam Belda on a journey"
      >
        <div className="container-site">
          <p className="eyebrow">Travel Far. Live Fully. Remember Everything.</p>
          <h1 className="h-display mt-3 text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
            A Life Measured in <span className="text-ember">Journeys</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-cream/75">
            I&apos;m Adam Belda—a traveller, storyteller, technology professional, gamer, and
            lifelong collector of meaningful experiences. This is where I document the places I
            visit, the food I discover, and the people and memories that make every journey
            unforgettable.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link href="/travel-stories" className="btn-primary">
              Explore My Journeys
            </Link>
            <Link href="/about" className="btn-secondary">
              Meet Adam
            </Link>
          </div>
        </div>
      </ScrollFlyIn>
    </section>
  );
}
