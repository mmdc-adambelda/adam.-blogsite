import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticlesByBase, getArticle } from "@/lib/articles";
import { pageMetadata } from "@/lib/seo";
import { articleUrl } from "@/data/articles/types";
import ArticleLayout from "@/components/article/ArticleLayout";

export function generateStaticParams() {
  return getArticlesByBase("gaming-journeys").map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = getArticle(params.slug);
  if (!article || article.basePath !== "gaming-journeys") return {};
  return {
    ...pageMetadata({
      title: article.seoTitle,
      description: article.metaDescription,
      path: articleUrl(article),
      image: article.featuredImage.src,
    }),
    openGraph: {
      type: "article",
      title: article.seoTitle,
      description: article.metaDescription,
      publishedTime: article.publishedDate,
      modifiedTime: article.updatedDate,
      authors: ["Adam Belda"],
      tags: article.tags,
      images: [{ url: article.featuredImage.src }],
    },
  };
}

export default function GamingJourneyPage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug);
  if (!article || article.basePath !== "gaming-journeys") notFound();
  return <ArticleLayout article={article} />;
}
