import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ArticleCard from "@/components/ArticleCard";
import { getArticlesByBase } from "@/lib/articles";

export const metadata: Metadata = pageMetadata({
  title: "Gaming Journeys — Where Travel Meets Play | Adam Belda",
  description:
    "Gaming-related travel stories from Adam Belda, including winning the Grand Chase Classic Davao Regional Championship by PlayPark in 2024.",
  path: "/gaming-journeys",
});

export default function GamingJourneysPage() {
  const items = getArticlesByBase("gaming-journeys");
  return (
    <div className="container-site py-16">
      <p className="eyebrow">Player two: the traveller</p>
      <h1 className="h-display mt-1 text-4xl font-bold sm:text-5xl">Gaming Journeys</h1>
      <p className="mt-3 max-w-2xl text-cream/65">
        Sometimes a journey isn&apos;t about a beach or a skyline — it&apos;s about a
        tournament bracket. These are the trips where travel and gaming became the same
        story, including the one where I came home a champion.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {items.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
    </div>
  );
}
