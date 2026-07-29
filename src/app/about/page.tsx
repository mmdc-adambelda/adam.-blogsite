import type { Metadata } from "next";
import Link from "next/link";
import { Coffee, Gamepad2, Heart, Laptop, MapPin, PenLine } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = pageMetadata({
  title: "About Adam Belda — Filipino Travel & Lifestyle Storyteller",
  description:
    "Meet Adam Belda: a Filipino technology professional, traveller, blogger, gamer, and storyteller sharing genuine journeys, food discoveries, and family moments.",
  path: "/about",
});

const facts = [
  { Icon: MapPin, text: "Based in the Philippines" },
  { Icon: Laptop, text: "Technology and IT operations professional" },
  { Icon: PenLine, text: "Travel and lifestyle storyteller" },
  { Icon: Gamepad2, text: "Gaming enthusiast" },
  { Icon: Coffee, text: "Food and coffee explorer" },
  { Icon: Heart, text: "Family-oriented traveller" },
];

export default function AboutPage() {
  return (
    <div className="container-site py-16">
      <div className="grid gap-12 lg:grid-cols-[1fr_420px]">
        <div className="max-w-2xl">
          <p className="eyebrow">About Adam</p>
          <h1 className="h-display mt-1 text-4xl font-bold sm:text-5xl">
            Hi, I&apos;m Adam Belda.
          </h1>
          <div className="mt-6 space-y-5 leading-relaxed text-cream/75">
            <p>
              I&apos;m a Filipino technology professional by trade — and a traveller, blogger,
              gamer, and storyteller by heart. This website is where those sides of me meet.
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
              Gaming is part of my story too. In 2024 I returned to Davao — a city I first
              visited as a wide-eyed traveller in 2016 — and won the Davao Regional
              Championship of Grand Chase Classic by PlayPark. That victory taught me that
              journeys aren&apos;t only about destinations; sometimes you travel somewhere to
              find out what you&apos;re capable of.
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
    </div>
  );
}
