import { Facebook, Instagram, Music2 } from "lucide-react";
import { site } from "@/data/site";

const cards = [
  { name: "Facebook", handle: "adambeldablogs", href: site.social.facebook, Icon: Facebook, hover: "hover:border-[#1877F2]/50" },
  { name: "Instagram", handle: "@adambelda", href: site.social.instagram, Icon: Instagram, hover: "hover:border-[#E1306C]/50" },
  { name: "TikTok", handle: "@adam.g.b", href: site.social.tiktok, Icon: Music2, hover: "hover:border-cream/40" },
];

export default function SocialCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {cards.map(({ name, handle, href, Icon, hover }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`card-surface group flex cursor-pointer items-center gap-4 p-5 transition-all duration-300 ${hover}`}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-wine/40 text-sand transition-transform duration-300 ease-expo group-hover:scale-110">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <span>
            <span className="block font-semibold text-cream">{name}</span>
            <span className="block text-sm text-cream/50">{handle}</span>
          </span>
        </a>
      ))}
    </div>
  );
}
