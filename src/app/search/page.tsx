import type { Metadata } from "next";
import { Suspense } from "react";
import { pageMetadata } from "@/lib/seo";
import SearchClient from "./SearchClient";

export const metadata: Metadata = pageMetadata({
  title: "Search — Find Any Story | Adam Belda",
  description: "Search Adam Belda's travel stories, destinations, food discoveries, and gaming journeys.",
  path: "/search",
});

export default function SearchPage() {
  return (
    <div className="container-site py-16">
      <p className="eyebrow">Looking for something?</p>
      <h1 className="h-display mt-1 text-4xl font-bold sm:text-5xl">Search</h1>
      <div className="mt-8">
        <Suspense>
          <SearchClient />
        </Suspense>
      </div>
    </div>
  );
}
