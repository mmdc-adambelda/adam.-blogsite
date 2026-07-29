export type Category =
  | "Philippines"
  | "International Travel"
  | "Family Travel"
  | "Food and Culture"
  | "Gaming Journeys"
  | "Budget Travel"
  | "Personal Reflections"
  | "Lifestyle";

export interface ArticleImage {
  src: string;
  alt: string;
  caption?: string;
  dimensions: string;
}

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
  image?: ArticleImage;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Article {
  title: string;
  seoTitle: string;
  metaDescription: string;
  slug: string;
  /** Route section the article lives under, e.g. "travel-stories" */
  basePath: "travel-stories" | "gaming-journeys";
  excerpt: string;
  destination: string;
  country: string;
  travelDate: string;
  travelYear: number;
  publishedDate: string; // ISO placeholder — update on publish
  updatedDate: string; // ISO placeholder — update when edited
  category: Category;
  categories: Category[];
  tags: string[];
  featuredImage: ArticleImage;
  readingTime: number; // minutes
  featured: boolean;
  intro: string[];
  sections: ArticleSection[];
  reflection: string[];
  faqs: Faq[];
  related: string[]; // slugs
}

export const articleUrl = (a: Pick<Article, "basePath" | "slug">) =>
  `/${a.basePath}/${a.slug}`;
