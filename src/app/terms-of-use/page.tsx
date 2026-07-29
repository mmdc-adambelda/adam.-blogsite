import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Use | Adam Belda",
  description: "The terms for using adambelda.com — content ownership, acceptable use, and disclaimers.",
  path: "/terms-of-use",
});

export default function TermsPage() {
  return (
    <div className="container-site max-w-3xl py-16">
      <h1 className="h-display text-4xl font-bold">Terms of Use</h1>
      <p className="mt-2 text-sm text-cream/45">Last updated: February 2026</p>
      <div className="mt-8 space-y-6 leading-relaxed text-cream/70">
        <p>
          Welcome to adambelda.com. By using this website you agree to these simple terms.
        </p>
        <h2 className="h-display pt-2 text-2xl font-semibold">Content ownership</h2>
        <p>
          All stories, photographs, and original content on this site are the property of
          Adam Belda unless otherwise stated. You are welcome to share links to stories; please
          do not republish full articles or photos without permission.
        </p>
        <h2 className="h-display pt-2 text-2xl font-semibold">Personal experience, not advice</h2>
        <p>
          Everything here reflects my personal experiences and opinions at the time of travel.
          Prices, availability, routes, and conditions change — always verify details before
          planning your own trip. I&apos;m not responsible for decisions made based on these
          stories.
        </p>
        <h2 className="h-display pt-2 text-2xl font-semibold">Acceptable use</h2>
        <p>
          Please don&apos;t misuse the site — no scraping at scale, no attempting to disrupt
          the site, and no using the contact form for spam.
        </p>
        <h2 className="h-display pt-2 text-2xl font-semibold">Changes</h2>
        <p>
          These terms may be updated from time to time. Continued use of the site means you
          accept the current version.
        </p>
      </div>
    </div>
  );
}
