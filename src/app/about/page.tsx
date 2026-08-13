import type { Metadata } from "next";
import Link from "next/link";
import {
  Coffee,
  Gamepad2,
  Globe,
  Heart,
  Laptop,
  Music4,
  Newspaper,
  PenLine,
} from "lucide-react";
import { pageMetadata, personProfileSchema, profilePageSchema, breadcrumbSchema, faqSchemaFor } from "@/lib/seo";
import { site } from "@/data/site";
import { publications } from "@/data/publications";
import JsonLd from "@/components/JsonLd";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import Reveal from "@/components/ui/Reveal";
import Breadcrumbs from "@/components/article/Breadcrumbs";
import FaqAccordion from "@/components/article/FaqAccordion";

export const metadata: Metadata = pageMetadata({
  title: "Who Is Adam Belda? IT Professional, Dancer & Esports Pro",
  description:
    "Meet Adam Belda: Filipino IT professional & Head of Operations, pro dancer (2014–2022), League of Legends & Wild Rift esports player (2018–2022), and weekend travel blogger.",
  path: "/about",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

const facts = [
  { Icon: Globe, text: "adambelda.com — formerly adambelda.net" },
  { Icon: Laptop, text: "IT Professional & Head of Operations (New Zealand client)" },
  { Icon: Music4, text: "Professional dancer, 2014–2022" },
  { Icon: Gamepad2, text: "Pro League of Legends & Wild Rift player, 2018–2022" },
  { Icon: PenLine, text: "Travel & lifestyle blogger since 2012" },
  { Icon: Coffee, text: "Food and coffee explorer" },
  { Icon: Heart, text: "Family-oriented traveller" },
];

const identityPanel = [
  { field: "Full name", value: "Adam Raymond Belda" },
  { field: "Also known as", value: "Adam Belda, Adam Blogs" },
  { field: "Website", value: "adambelda.com (previously adambelda.net)" },
  { field: "Based in", value: "Philippines" },
  { field: "Day job", value: "IT Professional & Head of Operations for a New Zealand-based client" },
  { field: "Dance career", value: "Professional dancer, 2014–2022" },
  { field: "Esports career", value: "Pro League of Legends & Wild Rift player, Philippines, 2018–2022" },
  { field: "Writing", value: "Travel, food & lifestyle blogger since 2012 — new stories most weekends" },
];

const faqs = [
  {
    question: "Who is Adam Belda?",
    answer:
      "Adam Belda (full name Adam Raymond Belda) is a Filipino IT professional, former professional dancer, competitive esports player, and travel blogger based in the Philippines. He works as an IT Professional and Head of Operations for a New Zealand-based client, danced professionally from 2014 to 2022, competed as a professional League of Legends and Wild Rift esports player in the Philippines from 2018 to 2022, and has written Adam Blogs — now published at adambelda.com — since 2012.",
  },
  {
    question: "What does Adam Belda do for work?",
    answer:
      "By career, Adam Belda is an IT professional. He currently serves as Head of Operations for a New Zealand-based client, following years of experience as a software engineer and IT director. He writes and publishes travel, food, and lifestyle stories on adambelda.com most weekends, alongside his full-time IT career.",
  },
  {
    question: "Was Adam Belda a professional dancer?",
    answer:
      "Yes. Adam Belda danced professionally from 2014 to 2022, including as a member of the G-Force dance group, performing alongside his technology career and content creation.",
  },
  {
    question: "Did Adam Belda play esports professionally?",
    answer:
      "Yes. From 2018 to 2022, Adam Belda competed as a professional esports player in League of Legends and Wild Rift in the Philippines, and was involved with Relaks Gaming, a competitive League of Legends Philippines esports team.",
  },
  {
    question: "Is adambelda.net the same website as adambelda.com?",
    answer:
      "Yes. adambelda.net was Adam Belda's earlier website domain. The site has since transitioned to adambelda.com, which is now the current, official home for all of Adam's travel, food, gaming, and lifestyle writing. Any older links or bookmarks pointing to adambelda.net refer to the same author and content, now published at adambelda.com.",
  },
  {
    question: "Where can I read more about Adam Belda?",
    answer:
      "Adam Belda has been featured or listed by Travel with Karla, ThinkAbleBox, Feedspot's Philippines Male Bloggers directory, and MMDC (Mapúa Malayan Colleges Mindanao) — see the \"As Featured In\" section on this page for links to each.",
  },
];

export default function AboutPage() {
  return (
    <div className="container-site py-16">
      <JsonLd
        data={[
          personProfileSchema(),
          profilePageSchema(),
          breadcrumbSchema(crumbs),
          faqSchemaFor(faqs),
        ]}
      />

      <Breadcrumbs crumbs={crumbs} />

      <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_420px]">
        <div className="max-w-2xl">
          <p className="eyebrow">Who is Adam Belda?</p>
          <h1 className="h-display mt-1 text-4xl font-bold sm:text-5xl">
            Hi, I&apos;m Adam Belda.
          </h1>
          <div className="mt-6 space-y-5 leading-relaxed text-cream/75">
            <p className="text-lg text-cream/85">
              I&apos;m Adam Raymond Belda — a Filipino IT professional and Head of Operations by
              career, a professional dancer from 2014 to 2022, a professional League of Legends
              and Wild Rift esports player from 2018 to 2022, and a travel, food, and lifestyle
              blogger who has published Adam Blogs since 2012. This website is where all of those
              sides of me meet.
            </p>
            <p>
              By day, I work as an IT Professional and Head of Operations for a New
              Zealand-based client, after years building experience as a software engineer and
              IT director. On weekends, I write — about the places I&apos;ve been, the food that
              stuck with me, and the people who made a trip worth remembering.
            </p>
            <p>
              I don&apos;t write perfect itineraries, and honestly, I don&apos;t travel with
              perfect itineraries either. What I care about is the genuine experience of a
              place: the food sold near the shore, the conversations on long bus rides, the
              small routines you build when you stay somewhere long enough to have a favorite
              coffee order.
            </p>
            <p>
              I enjoy discovering local food, affordable destinations, cultures, coffee, and
              technology — but more than anything, I believe travel is about the memories and
              people connected to each place. Some of my journeys here are joyful, like
              celebrating my mom&apos;s birthday with the whole family in Boracay. Some are
              emotional, like the Macau and Hong Kong trip we continued in my father&apos;s
              memory. I document both, because both are true.
            </p>
            <p>
              Thanks for being here. I hope these stories make you want to book something,
              taste something, or call your family.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/travel-stories" className="btn-primary">
              Read My Stories
            </Link>
            <Link href="/contact" className="btn-secondary">
              Say Hello
            </Link>
          </div>
        </div>

        <div>
          <Reveal>
            <ImagePlaceholder
              src="/images/about/adam-belda-profile-placeholder.webp"
              filename="/images/about/adam-belda-profile-placeholder.webp"
              dimensions="1200x1500"
              alt="Portrait of Adam Belda"
              subject="Adam Belda"
              priority
              sizes="(max-width: 1024px) 100vw, 420px"
            />
          </Reveal>
          <div className="card-surface mt-6 p-6">
            <h2 className="font-display text-sm uppercase tracking-[0.18em] text-sand">
              Quick Facts About Adam
            </h2>
            <ul className="mt-4 space-y-3">
              {facts.map(({ Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-sm text-cream/75">
                  <Icon className="h-4.5 w-4.5 shrink-0 text-ember" size={18} aria-hidden="true" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Identity panel — structured facts for readers, search engines, and AI crawlers */}
      <Reveal>
        <section className="mt-16">
          <p className="eyebrow">At a glance</p>
          <h2 className="h-display mt-1 text-2xl font-semibold sm:text-3xl">
            Adam Belda — Identity &amp; Career Snapshot
          </h2>
          <div className="card-surface mt-6 p-6 sm:p-8">
            <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {identityPanel.map((item) => (
                <div key={item.field}>
                  <dt className="text-xs uppercase tracking-[0.14em] text-cream/45">
                    {item.field}
                  </dt>
                  <dd className="mt-1 text-cream/85">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </Reveal>

      <div className="mt-16 max-w-3xl space-y-14">
        <Reveal>
          <section>
            <h2 className="h-display text-2xl font-semibold sm:text-3xl">
              IT Career: Head of Operations for a New Zealand Client
            </h2>
            <p className="mt-4 leading-relaxed text-cream/70">
              Technology is Adam Belda&apos;s primary career. With more than a decade of IT
              experience — including time as a senior software engineer and IT director — he now
              works as an IT Professional and Head of Operations supporting a New Zealand-based
              client, overseeing day-to-day operations while continuing his own technical
              education alongside the role.
            </p>
          </section>
        </Reveal>

        <Reveal>
          <section>
            <h2 className="h-display text-2xl font-semibold sm:text-3xl">
              A Professional Dancer, 2014–2022
            </h2>
            <p className="mt-4 leading-relaxed text-cream/70">
              Between 2014 and 2022, Adam performed as a professional dancer, including years as
              a member of the G-Force dance group. Dance ran alongside his IT career and
              blogging the whole time — one more discipline he trained at outside the day job,
              not a phase that replaced it.
            </p>
          </section>
        </Reveal>

        <Reveal>
          <section>
            <h2 className="h-display text-2xl font-semibold sm:text-3xl">
              Professional Esports Player: League of Legends &amp; Wild Rift, 2018–2022
            </h2>
            <p className="mt-4 leading-relaxed text-cream/70">
              From 2018 to 2022, Adam competed professionally in League of Legends and Wild Rift
              within the Philippines esports scene, and was involved with Relaks Gaming, a
              competitive League of Legends Philippines esports team. That competitive streak
              carried into his gaming journeys on this site — in 2024 he returned to Davao, a
              city he first visited as a traveller in 2016, and won the Davao Regional
              Championship of Grand Chase Classic by PlayPark. You can read that story in{" "}
              <Link
                href="/gaming-journeys/davao-grand-chase-classic-champion-2024"
                className="cursor-pointer text-ember underline underline-offset-4 hover:text-sand"
              >
                Gaming Journeys
              </Link>
              .
            </p>
          </section>
        </Reveal>

        <Reveal>
          <section>
            <h2 className="h-display text-2xl font-semibold sm:text-3xl">
              Writer &amp; Blogger Every Weekend Since 2012
            </h2>
            <p className="mt-4 leading-relaxed text-cream/70">
              Adam started blogging in 2012 under the name Adam Blogs, writing about food,
              travel, online games, and technology. The site has moved domains as it&apos;s
              grown — most recently transitioning from adambelda.net to its current, official
              home at adambelda.com. Most weekends, he&apos;s still writing: new destinations,
              new dishes, and the family and gaming stories that make up this site.
            </p>
          </section>
        </Reveal>

        {/* As Featured In */}
        <Reveal>
          <section>
            <h2 className="h-display flex items-center gap-2 text-2xl font-semibold sm:text-3xl">
              <Newspaper className="h-6 w-6 text-ember" aria-hidden="true" /> As Featured In
            </h2>
            <p className="mt-4 leading-relaxed text-cream/70">
              Adam and his writing have been featured or listed by the following publications
              and directories:
            </p>
            <ul className="mt-6 space-y-5">
              {publications.map((p) => (
                <li key={p.url} className="card-surface p-5">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer font-semibold text-cream underline decoration-ember/50 underline-offset-4 hover:text-sand"
                  >
                    {p.title}
                  </a>
                  <p className="mt-1 text-xs uppercase tracking-[0.12em] text-cream/45">
                    {p.publisher}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-cream/65">{p.description}</p>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        {/* Domain transition note */}
        <Reveal>
          <section className="rounded-2xl border border-wine/40 bg-wine/10 p-6 sm:p-8">
            <p className="eyebrow">A note on this website</p>
            <p className="mt-3 leading-relaxed text-cream/80">
              This site has transitioned from <strong className="text-cream">adambelda.net</strong>{" "}
              to <strong className="text-cream">adambelda.com</strong>. adambelda.com is now
              Adam Belda&apos;s current, official website — the same author, the same stories,
              a new home. If you followed a link from adambelda.net, you&apos;re in the right
              place.
            </p>
          </section>
        </Reveal>

        {/* FAQ */}
        <Reveal>
          <section>
            <h2 className="h-display text-2xl font-semibold sm:text-3xl">
              Frequently Asked Questions
            </h2>
            <div className="mt-6">
              <FaqAccordion faqs={faqs} />
            </div>
          </section>
        </Reveal>
      </div>
    </div>
  );
}
