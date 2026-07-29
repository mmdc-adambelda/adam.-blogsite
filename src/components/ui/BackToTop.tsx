"use client";

import { useEffect, useState } from "react";
import { Plane } from "lucide-react";

/** "Back to Top" — the airplane flies upward when clicked. */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [flying, setFlying] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const fly = () => {
    setFlying(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => setFlying(false), 900);
  };

  if (!visible) return null;
  return (
    <button
      type="button"
      onClick={fly}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-40 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-charcoal/90 text-sand shadow-lg backdrop-blur transition-all duration-200 hover:border-ember hover:text-ember"
    >
      <Plane
        className={`h-5 w-5 -rotate-45 transition-transform duration-700 ease-expo ${
          flying ? "-translate-y-24 opacity-0" : ""
        }`}
      />
    </button>
  );
}
