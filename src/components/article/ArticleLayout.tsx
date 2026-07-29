import Link from "next/link";
import { Calendar, Clock, MapPin, Tag } from "lucide-react";
import type { Article } from "@/data/articles/types";
import { articleUrl } from "@/data/articles/types";
import { getRelated } from "@/lib/articles";
import { absoluteUrl } from "@/data/site";
import { articleSchema, faqSchema, breadcrumbSchema } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import ArticleCard from "@/components/ArticleCard";
import Reveal from "@/components/ui/Reveal";
import ReadingProgress from "./ReadingProgress";
import Breadcrumbs from "./Breadcrumbs";
import ShareButtons from "./ShareButtons";
import FaqAccordion from "./FaqAccordion";

const sectionLabel: Record<Article["basePath"], string> = {
  "travel-stories": "Travel Stories",
  "gaming-journeys": "Gaming Journeys",
};

export default function ArticleLayout({ article }: { article: Article }) {
  const related = getRelated(article);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: sectionLabel[article.basePath], path: `/${article.basePath}` },
    { name: article.title, path: articleUrl(article) },
  ];
  const url = absoluteUrl(articleUrl(article));

  return (
    <article>
      <ReadingProgress />
      <JsonLd data={[articleSchema(article), faqSchema(article), breadcrumbSchema(crumbs)]} />

      {/* Hero with layered parallax feel */}
      <header className="relative overflow-hidden border-b border-white/[0.06] bg-[radial-gradient(110%_90%_at_50%_0%,rgba(110,13,24,0.5)_0%,#050505_70%)]">
        <div className="container-site py-12 sm:py-16">
          <Breadcrumbs crumbs={crumbs} />
          <span className="stamp mt-6 inline-block">{article.travelDate}</span>
          <h1 className="h-display mt-4 max-w-4xl text-3xl font-bold leading-tight sm:text-5xl">
            {article.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-cream/55">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-ember" /> {article.destination}, {article.country}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" /> Published {article.publishedDate} · Updated {article.updatedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" /> {article.readingTime} min read
            </span>
          </div>
          <div className="mt-8 max-w-4xl">
            <ImagePlaceholder
              src={article.featuredImage.src}
              filename={article.featuredImage.src}
              dimensions={article.featuredImage.dimensions}
              alt={article.featuredImage.alt}
              subject={article.destination}
              priority
            />
          </div>
        </div>
      </header>

      <div className="container-site grid gap-12 py-14 lg:grid-cols-[1fr_280px]">
        <div className="max-w-3xl">
          {article.intro.map((p) => (
            <p key={p.slice(0, 40)} className="mb-5 text-lg leading-relaxed text-cream/80">
              {p}
            </p>
          ))}

          {article.sections.map((s) => (
            <Reveal key={s.heading}>
              <section className="mt-12">
                <h2 className="h-display text-2xl font-semibold sm:text-3xl">{s.heading}</h2>
                {s.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)} className="mt-4 leading-relaxed text-cream/70">
                    {p}
                  </p>
                ))}
                {s.image && (
                  <figure className="mt-6">
                    <ImagePlaceholder
                      src={s.image.src}
                      filename={s.image.src}
                      dimensions={s.image.dimensions}
                      alt={s.image.alt}
                      subject={article.destination}
                    />
                    {s.image.caption && (
                      <figcaption className="mt-2 text-center text-sm text-cream/45">
                        {s.image.caption}
                      </figcaption>
                    )}
                  </figure>
                )}
              </section>
            </Reveal>
          ))}

          <Reveal>
            <section className="mt-14 rounded-2xl border border-wine/40 bg-wine/10 p-6 sm:p-8">
              <p className="eyebrow">Looking back</p>
              {article.reflection.map((p) => (
                <p key={p.slice(0, 40)} className="mt-3 leading-relaxed text-cream/80">
                  {p}
                </p>
              ))}
            </section>
          </Reveal>

          {article.faqs.length > 0 && (
            <Reveal>
              <section className="mt-14">
                <h2 className="h-display text-2xl font-semibold">Frequently Asked Questions</h2>
                <div className="mt-6">
                  <FaqAccordion faqs={article.faqs} />
                </div>
              </section>
            </Reveal>
          )}

          <div className="mt-12 border-t border-white/[0.07] pt-8">
            <ShareButtons title={article.title} url={url} />
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
          <div className="card-surface p-6">
            <h2 className="font-display text-sm uppercase tracking-[0.18em] text-sand">
              About the Author
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-cream/65">
              <strong className="text-cream">Adam Belda</strong> is a Filipino technology
              professional, traveller, gamer, and storyteller documenting the journeys, food,
              and family moments that matter.
            </p>
            <Link href="/about" className="mt-4 inline-block cursor-pointer text-sm font-semibold text-ember hover:text-sand">
              Meet Adam →
            </Link>
          </div>
          <div className="card-surface p-6">
            <h2 className="flex items-center gap-2 font-display text-sm uppercase tracking-[0.18em] text-sand">
              <Tag className="h-4 w-4" /> Tags
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {article.tags.map((t) => (
                <li key={t}>
                  <Link
                    href={`/search?q=${encodeURIComponent(t)}`}
                    className="cursor-pointer rounded-full border border-white/10 px-3 py-1.5 text-xs text-cream/65 transition-colors hover:border-ember hover:text-ember"
                  >
                    {t}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="container-site pb-section">
          <h2 className="h-display mb-8 text-2xl font-semibold sm:text-3xl">Related Stories</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {related.map((r) => (
              <ArticleCard key={r.slug} article={r} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
