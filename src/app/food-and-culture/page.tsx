import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import FoodGrid from "@/components/home/FoodGrid";
import ArticleCard from "@/components/ArticleCard";
import { articles } from "@/lib/articles";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = pageMetadata({
  title: "Food and Culture — Taste Memories From Every Journey | Adam Belda",
  description:
    "From pastil and tablea in Davao to hotpot in Hong Kong and Vietnamese coffee in Ho Chi Minh City — the food and culture that made Adam Belda's journeys unforgettable.",
  path: "/food-and-culture",
});

export default function FoodCulturePage() {
  const foodStories = articles.filter((a) => a.categories.includes("Food and Culture"));
  return (
    <div className="container-site py-16">
      <p className="eyebrow">Half of every journey happens at the table</p>
      <h1 className="h-display mt-1 text-4xl font-bold sm:text-5xl">Food and Culture</h1>
      <p className="mt-3 max-w-2xl text-cream/65">
        I remember destinations through flavors: the smoky comfort of pastil, the roasted
        depth of tablea, the confrontational genius of durian, a family hotpot in Hong Kong,
        and coffee in Vietnam that ruined ordinary coffee for me.
      </p>
      <div className="mt-10">
        <FoodGrid />
      </div>
      {foodStories.length > 0 && (
        <Reveal className="mt-16">
          <h2 className="h-display mb-6 text-2xl font-semibold">Stories With Flavor</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {foodStories.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </Reveal>
      )}
    </div>
  );
}
