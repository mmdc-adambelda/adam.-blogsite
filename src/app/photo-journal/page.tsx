import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import PhotoJournal from "@/components/PhotoJournal";

export const metadata: Metadata = pageMetadata({
  title: "Photo Journal — Frames From Every Journey | Adam Belda",
  description:
    "A visual journal of Adam Belda's travels — Davao, Samal, Boracay, Macau, Hong Kong, and Ho Chi Minh City in photographs.",
  path: "/photo-journal",
});

export default function PhotoJournalPage() {
  return (
    <div className="container-site py-16">
      <p className="eyebrow">Collected frames</p>
      <h1 className="h-display mt-1 text-4xl font-bold sm:text-5xl">Photo Journal</h1>
      <p className="mt-3 max-w-2xl text-cream/65">
        Moments I managed to catch before they moved on. Filter by destination, and open any
        photo for the full view — arrow keys and swipe both work.
      </p>
      <div className="mt-10">
        <PhotoJournal />
      </div>
    </div>
  );
}
