export type SeoCheckStatus = "good" | "ok" | "bad" | "neutral";

export interface SeoCheck {
  id: string;
  status: SeoCheckStatus;
  message: string;
}

export interface SeoAnalysisInput {
  focusKeyphrase: string;
  seoTitle: string;
  metaDescription: string;
  slug: string;
  content: string;
}

function wordCount(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function countOccurrences(haystack: string, needle: string) {
  if (!needle) return 0;
  const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return (haystack.match(new RegExp(escaped, "gi")) ?? []).length;
}

/** A simplified, Yoast-style real-time SEO analysis. Pure and client-safe. */
export function analyzeSeo({
  focusKeyphrase,
  seoTitle,
  metaDescription,
  slug,
  content,
}: SeoAnalysisInput): SeoCheck[] {
  const checks: SeoCheck[] = [];
  const kp = focusKeyphrase.trim().toLowerCase();
  const plainContent = content.replace(/[#*_`>\[\]()!-]/g, " ");

  if (!kp) {
    return [
      {
        id: "keyphrase",
        status: "bad",
        message: "Set a focus keyphrase to see SEO analysis.",
      },
    ];
  }

  checks.push(
    seoTitle.toLowerCase().includes(kp)
      ? { id: "title-kp", status: "good", message: "The focus keyphrase appears in the SEO title." }
      : { id: "title-kp", status: "bad", message: "The focus keyphrase does not appear in the SEO title." }
  );

  const titleLen = seoTitle.length;
  checks.push(
    titleLen >= 40 && titleLen <= 60
      ? { id: "title-len", status: "good", message: `SEO title is ${titleLen} characters (ideal range).` }
      : { id: "title-len", status: "ok", message: `SEO title is ${titleLen} characters (aim for 40–60).` }
  );

  checks.push(
    metaDescription.toLowerCase().includes(kp)
      ? { id: "desc-kp", status: "good", message: "The focus keyphrase appears in the meta description." }
      : { id: "desc-kp", status: "bad", message: "The focus keyphrase does not appear in the meta description." }
  );

  const descLen = metaDescription.length;
  checks.push(
    descLen >= 120 && descLen <= 160
      ? { id: "desc-len", status: "good", message: `Meta description is ${descLen} characters (ideal range).` }
      : { id: "desc-len", status: "ok", message: `Meta description is ${descLen} characters (aim for 120–160).` }
  );

  checks.push(
    slug.toLowerCase().includes(kp.replace(/\s+/g, "-"))
      ? { id: "slug-kp", status: "good", message: "The focus keyphrase appears in the URL slug." }
      : { id: "slug-kp", status: "bad", message: "The focus keyphrase does not appear in the URL slug." }
  );

  const firstParagraph =
    content
      .split(/\n\s*\n/)
      .map((block) => block.trim())
      .find((block) => block && !/^#{1,6}\s/.test(block)) ?? "";
  checks.push(
    firstParagraph.toLowerCase().includes(kp)
      ? { id: "intro-kp", status: "good", message: "The focus keyphrase appears in the opening paragraph." }
      : { id: "intro-kp", status: "bad", message: "The focus keyphrase does not appear early in the content." }
  );

  const words = wordCount(plainContent);
  checks.push(
    words >= 300
      ? { id: "length", status: "good", message: `Content is ${words} words (300+ recommended).` }
      : { id: "length", status: words >= 150 ? "ok" : "bad", message: `Content is ${words} words (aim for 300+).` }
  );

  const occurrences = countOccurrences(plainContent, kp);
  const density = words > 0 ? (occurrences / words) * 100 : 0;
  checks.push(
    density >= 0.5 && density <= 3
      ? { id: "density", status: "good", message: `Keyphrase density is ${density.toFixed(1)}% (ideal range).` }
      : {
          id: "density",
          status: occurrences === 0 ? "bad" : "ok",
          message: `Keyphrase density is ${density.toFixed(1)}% (aim for 0.5–3%, found ${occurrences}×).`,
        }
  );

  const hasHeadingWithKp = /^#{2,3}\s.*$/gm
    .test(content) && content
    .split("\n")
    .filter((l) => /^#{2,3}\s/.test(l))
    .some((h) => h.toLowerCase().includes(kp));
  checks.push(
    hasHeadingWithKp
      ? { id: "heading-kp", status: "good", message: "The focus keyphrase appears in a subheading." }
      : { id: "heading-kp", status: "ok", message: "Consider using the focus keyphrase in a subheading (##)." }
  );

  return checks;
}

export function seoScore(checks: SeoCheck[]): { score: number; label: string } {
  const weights: Record<SeoCheckStatus, number> = { good: 1, ok: 0.5, bad: 0, neutral: 0.5 };
  const total = checks.reduce((sum, c) => sum + weights[c.status], 0);
  const score = checks.length ? Math.round((total / checks.length) * 100) : 0;
  const label = score >= 80 ? "Good" : score >= 50 ? "Needs improvement" : "Poor";
  return { score, label };
}
