import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy | Adam Belda",
  description: "How adambelda.com handles your information: newsletter emails, contact form details, and analytics.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <div className="container-site max-w-3xl py-16">
      <h1 className="h-display text-4xl font-bold">Privacy Policy</h1>
      <p className="mt-2 text-sm text-cream/45">Last updated: February 2026</p>
      <div className="mt-8 space-y-6 leading-relaxed text-cream/70">
        <p>
          Your privacy matters to me. This page explains, in plain language, what information
          adambelda.com collects and how it is used.
        </p>
        <h2 className="h-display pt-2 text-2xl font-semibold">Information I collect</h2>
        <p>
          <strong className="text-cream">Newsletter:</strong> if you subscribe to Stories From
          the Road, I collect your name and email address solely to send you new stories and
          updates. You can unsubscribe at any time, and your email is never sold or shared.
        </p>
        <p>
          <strong className="text-cream">Contact form:</strong> when you send a message, I
          receive the details you provide (name, email, subject, and message) so I can reply.
          These details are used for correspondence only.
        </p>
        <p>
          <strong className="text-cream">Analytics:</strong> this site may use privacy-respecting
          analytics to understand which stories readers enjoy. Analytics data is aggregated
          and does not personally identify you.
        </p>
        <h2 className="h-display pt-2 text-2xl font-semibold">Cookies</h2>
        <p>
          The site keeps cookies to a minimum. Any cookies used exist to make the site work
          properly or to measure aggregate readership.
        </p>
        <h2 className="h-display pt-2 text-2xl font-semibold">Third-party links</h2>
        <p>
          Stories link to external websites and social platforms (Facebook, Instagram,
          TikTok). Those sites have their own privacy policies, which I encourage you to
          review.
        </p>
        <h2 className="h-display pt-2 text-2xl font-semibold">Questions</h2>
        <p>
          If you have any questions about this policy or your data, please reach out through
          the contact page and I&apos;ll respond personally.
        </p>
      </div>
    </div>
  );
}
