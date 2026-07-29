import type { Metadata } from "next";
import { Facebook, Instagram, Music2 } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/data/site";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = pageMetadata({
  title: "Contact Adam Belda — Collaborations, Stories & Hello",
  description:
    "Have a destination recommendation, collaboration idea, or story to share? Send Adam Belda a message and connect.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="container-site py-16">
      <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
        <div>
          <p className="eyebrow">Let&apos;s connect</p>
          <h1 className="h-display mt-1 text-4xl font-bold sm:text-5xl">Say Hello</h1>
          <p className="mt-3 max-w-xl text-cream/65">
            Have a destination recommendation, collaboration idea, or story to share? Send me
            a message and let&apos;s connect.
          </p>
          <div className="mt-10">
            <ContactForm />
          </div>
        </div>
        <aside className="card-surface h-fit p-6 lg:sticky lg:top-24">
          <h2 className="font-display text-sm uppercase tracking-[0.18em] text-sand">
            Find me on social
          </h2>
          <ul className="mt-4 space-y-3">
            <li>
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="flex cursor-pointer items-center gap-3 text-sm text-cream/70 transition-colors hover:text-ember">
                <Facebook className="h-5 w-5" aria-hidden="true" /> facebook.com/adambeldablogs
              </a>
            </li>
            <li>
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="flex cursor-pointer items-center gap-3 text-sm text-cream/70 transition-colors hover:text-ember">
                <Instagram className="h-5 w-5" aria-hidden="true" /> instagram.com/adambelda
              </a>
            </li>
            <li>
              <a href={site.social.tiktok} target="_blank" rel="noopener noreferrer" className="flex cursor-pointer items-center gap-3 text-sm text-cream/70 transition-colors hover:text-ember">
                <Music2 className="h-5 w-5" aria-hidden="true" /> tiktok.com/@adam.g.b
              </a>
            </li>
          </ul>
          <p className="mt-6 text-xs leading-relaxed text-cream/45">
            I read every message personally. For collaborations and media enquiries, please
            include timelines and details so I can respond properly.
          </p>
        </aside>
      </div>
    </div>
  );
}
