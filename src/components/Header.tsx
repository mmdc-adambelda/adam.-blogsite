"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Search } from "lucide-react";
import Logo from "./Logo";

const nav = [
  { href: "/travel-stories", label: "Travel Stories" },
  { href: "/destinations", label: "Destinations" },
  { href: "/food-and-culture", label: "Food & Culture" },
  { href: "/lifestyle", label: "Lifestyle" },
  { href: "/gaming-journeys", label: "Gaming" },
  { href: "/photo-journal", label: "Photo Journal" },
  { href: "/about", label: "About Adam" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-night/85 backdrop-blur-md">
      <div className="container-site flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const active = pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`cursor-pointer rounded-full px-3.5 py-2 text-sm transition-colors duration-200 ${
                  active ? "bg-wine/50 text-sand" : "text-cream/75 hover:bg-white/[0.06] hover:text-cream"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/search"
            aria-label="Search stories"
            className="ml-1 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-cream/75 transition-colors hover:bg-white/[0.06] hover:text-cream"
          >
            <Search className="h-4.5 w-4.5" size={18} />
          </Link>
        </nav>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-cream lg:hidden"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/[0.06] bg-charcoal lg:hidden"
          >
            <div className="container-site flex flex-col py-3">
              {[...nav, { href: "/search", label: "Search" }].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="cursor-pointer rounded-lg px-3 py-3.5 text-base text-cream/85 transition-colors hover:bg-white/[0.05] hover:text-sand"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
