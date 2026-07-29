import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { destinations } from "@/data/journeys";
import TravelMap from "@/components/home/TravelMap";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = pageMetadata({
  title: "Destinations — Everywhere My Journeys Have Taken Me | Adam Belda",
  description:
    "Explore Adam Belda's destinations: Davao City, Samal Island, Boracay, Macau, Hong Kong, and Ho Chi Minh City — each with its own story.",
  path: "/destinations",
});

export default function DestinationsPage() {
  return (
    <div className="container-site py-16">
      <p className="eyebrow">The map so far</p>
      <h1 className="h-display mt-1 text-4xl font-bold sm:text-5xl">Destinations</h1>
      <p className="mt-3 max-w-2xl text-cream/65">
        Every pin on this map is a chapter. Select one, or browse the destinations below.
      </p>
      <div className="mt-10">
        <TravelMap />
      </div>
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map((d, i) => (
          <Reveal key={d.id} delay={i * 0.05}>
            <Link
              href={`/${d.articleBase}/${d.articleSlug}`}
              className="card-surface group block h-full cursor-pointer overflow-hidden transition-all duration-300 hover:border-ember/40"
            >
              <div className="overflow-hidden">
                <div className="transition-transform duration-500 ease-expo group-hover:scale-[1.04]">
                  <ImagePlaceholder
                    src={d.thumbnail.src}
                    filename={d.thumbnail.src}
                    dimensions="1600x1000"
                    alt={d.thumbnail.alt}
                    subject={d.name}
                    className="!rounded-none border-0"
                    sizes="(max-width: 640px) 100vw, 400px"
                  />
                </div>
              </div>
              <div className="p-5">
                <p className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-cream/45">
                  <MapPin className="h-3.5 w-3.5 text-ember" /> {d.country} · {d.year}
                </p>
                <h2 className="h-display mt-2 text-xl font-semibold transition-colors group-hover:text-sand">
                  {d.name}
                </h2>
                <p className="mt-2 text-sm text-cream/60">{d.preview}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ember transition-all group-hover:gap-3">
                  Read the story <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
