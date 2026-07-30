import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { journalPhotos } from "@/data/journeys";
import PhotoJournal from "@/components/PhotoJournal";
import ArcGalleryHero from "@/components/ui/arc-gallery-hero";

export const metadata: Metadata = pageMetadata({
  title: "Photo Journal — Frames From Every Journey | Adam Belda",
  description:
    "A visual journal of Adam Belda's travels — Davao, Samal, Boracay, Macau, Hong Kong, and Ho Chi Minh City in photographs.",
  path: "/photo-journal",
});

// Only feed the arc gallery photos that actually exist on disk (some journal
// entries are still awaiting their real image).
const arcImages = journalPhotos
  .filter((p) => fs.existsSync(path.join(process.cwd(), "public", p.src)))
  .map((p) => ({ src: p.src, alt: p.alt }));

export default function PhotoJournalPage() {
  return (
    <div>
      <ArcGalleryHero
        images={arcImages}
        heading="Rediscover My Travels Yearly"
        primaryCta={{ label: "View the Gallery", href: "#gallery" }}
        secondaryCta={{ label: "Read the Stories", href: "/travel-stories" }}
      />
      <div id="gallery" className="container-site pb-16 pt-4">
        <PhotoJournal />
      </div>
    </div>
  );
}
