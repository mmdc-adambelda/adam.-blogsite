import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import FilterableArticleList from "@/components/FilterableArticleList";
import ArticleCard from "@/components/ArticleCard";
import Reveal from "@/components/ui/Reveal";
import {
  articles,
  featuredArticles,
  allCategories,
  allDestinations,
  allTags,
  allYears,
} from "@/lib/articles";

export const metadata: Metadata = pageMetadata({
  title: "Travel Stories — Journeys, Food & Family | Adam Belda",
  description:
    "All of Adam Belda's travel stories: Davao, Samal Island, Boracay, Macau, Hong Kong, and Ho Chi Minh City — searchable and filterable by destination, category, year, and tag.",
  path: "/travel-stories",
});

export default function TravelStoriesPage() {
  const featured = featuredArticles[0];
  return (
    <div className="container-site py-16">
      <p className="eyebrow">The stories</p>
      <h1 className="h-display mt-1 text-4xl font-bold sm:text-5xl">Travel Stories</h1>
      <p className="mt-3 max-w-2xl text-cream/65">
        Every journey documented here really happened — the joyful ones, the emotional ones,
        and the ones that changed how I see the world.
      </p>

      {featured && (
        <Reveal className="mt-10">
          <h2 className="mb-4 font-display text-sm uppercase tracking-[0.18em] text-sand">
        Featured Story
          </h2>
          <ArticleCard article={featured} list />
        </Reveal>
      )}

      <div className="mt-14">
        <h2 className="mb-6 font-display text-sm uppercase tracking-[0.18em] text-sand">
          Latest Stories
        </h2>
        <FilterableArticleList
          items={articles}
          destinations={allDestinations}
          categories={allCategories}
          years={allYears}
          tags={allTags}
        />
      </div>
    </div>
  );
}
