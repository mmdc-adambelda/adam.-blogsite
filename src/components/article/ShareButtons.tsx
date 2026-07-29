"use client";

import { useState } from "react";
import { Share2, Link2, Facebook, Check } from "lucide-react";

/** Social sharing — uses the native Web Share API where available. */
export default function ShareButtons({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);
  const canNativeShare = typeof navigator !== "undefined" && "share" in navigator;

  const nativeShare = async () => {
    try {
      await navigator.share({ title, url });
    } catch {
      /* user dismissed */
    }
  };
  const copy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Share this story">
      <span className="mr-1 text-sm text-cream/50">Share:</span>
      {canNativeShare && (
        <button type="button" onClick={nativeShare} aria-label="Share via your device" className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/12 text-cream/70 transition-colors hover:border-ember hover:text-ember">
          <Share2 className="h-4.5 w-4.5" size={18} />
        </button>
      )}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/12 text-cream/70 transition-colors hover:border-ember hover:text-ember"
      >
        <Facebook size={18} />
      </a>
      <button type="button" onClick={copy} aria-label="Copy link" className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/12 text-cream/70 transition-colors hover:border-ember hover:text-ember">
        {copied ? <Check size={18} className="text-jungle" style={{ color: "#6FBF95" }} /> : <Link2 size={18} />}
      </button>
    </div>
  );
}
