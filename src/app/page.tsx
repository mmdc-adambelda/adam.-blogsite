import Link from "next/link";
import { Camera, Coffee, Cpu, Gamepad2, Heart, NotebookPen } from "lucide-react";
import Hero from "@/components/home/Hero";
import TravelMap from "@/components/home/TravelMap";
import Timeline from "@/components/home/Timeline";
import FoodGrid from "@/components/home/FoodGrid";
import SocialCards from "@/components/home/SocialCards";
import ArticleCard from "@/components/ArticleCard";
import NewsletterForm from "@/components/NewsletterForm";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { featuredArticles } from "@/lib/articles";

const interests = [
  { Icon: Cpu, label: "Technology", note: "An IT professional's curiosity, everywhere I go." },
  { Icon: Gamepad2, label: "Gaming", note: "From internet café years to a championship title." },
  { Icon: Camera, label: "Photography", note: "Collecting frames of every journey." },
  { Icon: Coffee, label: "Food & Coffee", note: "The fastest way to understand a place." },
  { Icon: Heart, label: "Family Experiences", note: "The trips that matter most." },
  { Icon: NotebookPen, label: "Personal Reflections", note: "Writing the meaning back in." },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Welcome */}
      <section className="container-site py-section">
        <Reveal>
          <SectionHeading eyebrow="Welcome to my journey" title="Stories, not itineraries">
            I write about meaningful trips, family memories, food discoveries, affordable
            travel, technology, gaming, and personal growth — the honest version, including
            the tiring parts. Every journey here really happened, and every story is mine.
          </SectionHeading>
        </Reveal>
      </section>

      {/* Featured stories */}
      <section className="container-site pb-section" aria-labelledby="featured-heading">
        <Reveal>
          <SectionHeading eyebrow="Featured" title="Travel Stories Worth Telling" />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredArticles.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/travel-stories" className="btn-secondary">
            Browse all stories
          </Link>
        </div>
      </section>

      {/* Map */}
      <section className="border-y border-white/[0.06] bg-charcoal/50 py-section">
        <div className="container-site">
          <Reveal>
            <SectionHeading eyebrow="Where I've been" title="An Interactive Map of My Journeys">
              Select a marker to preview each destination and jump into its story.
            </SectionHeading>
          </Reveal>
          <TravelMap />
        </div>
      </section>

      {/* Timeline */}
      <section className="container-site py-section">
        <Reveal>
          <SectionHeading eyebrow="The route so far" title="A Timeline of Journeys">
            Follow the flight path — from my first Davao adventure in 2016 to ten days in Ho
            Chi Minh City in January 2026.
          </SectionHeading>
        </Reveal>
        <Timeline />
      </section>

      {/* Food */}
      <section className="border-y border-white/[0.06] bg-charcoal/50 py-section">
        <div className="container-site">
          <Reveal>
            <SectionHeading eyebrow="Taste memories" title="Food Discoveries">
              Half of every journey happens at the table. These are the flavors that made
              their destinations unforgettable to me.
            </SectionHeading>
          </Reveal>
          <FoodGrid />
        </div>
      </section>

      {/* Beyond travel */}
      <section className="container-site py-section" aria-labelledby="beyond-heading">
        <Reveal>
          <SectionHeading eyebrow="Beyond travel" title="What Else Moves Me" />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {interests.map(({ Icon, label, note }, i) => (
            <Reveal key={label} delay={i * 0.05}>
              <div className="card-surface h-full p-5">
                <Icon className="h-5 w-5 text-ember" aria-hidden="true" />
                <h3 className="h-display mt-3 text-lg font-semibold">{label}</h3>
                <p className="mt-1 text-sm text-cream/60">{note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Social */}
      <section className="container-site pb-section">
        <Reveal>
          <SectionHeading eyebrow="Follow along" title="Travel With Me on Social" />
        </Reveal>
        <SocialCards />
      </section>

      {/* Newsletter */}
      <section className="border-t border-white/[0.06] bg-[radial-gradient(90%_100%_at_50%_0%,rgba(110,13,24,0.35)_0%,#050505_75%)] py-section">
        <div className="container-site max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow">Stories From the Road</p>
            <h2 className="h-display mt-1 text-3xl font-semibold sm:text-4xl">
              Never Miss a Journey
            </h2>
            <p className="mt-3 text-cream/65">
              Receive new travel stories, destination discoveries, food experiences, and
              personal reflections from Adam.
            </p>
            <div className="mt-8 text-left">
              <NewsletterForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
