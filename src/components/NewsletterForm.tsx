"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

/**
 * Placeholder submission handler. To connect a real provider (MailerLite,
 * Mailchimp, etc.), replace the body of `submit` with a fetch to your
 * provider's API or a Next.js route handler.
 */
export default function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const submit = async () => {
    if (!compact && name.trim().length < 2) {
      setError("Please enter your name.");
      setStatus("error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setError("");
    // Placeholder: simulate a request. Swap for a real API call.
    await new Promise((r) => setTimeout(r, 700));
    setStatus("success");
  };

  if (status === "success") {
    return (
      <p role="status" className="flex items-center gap-2 text-sm text-jungle" style={{ color: "#6FBF95" }}>
        <CheckCircle2 className="h-5 w-5" /> You&apos;re on the list. New stories are on their way.
      </p>
    );
  }

  return (
    <div>
      <div className={`flex flex-col gap-3 ${compact ? "sm:flex-row" : "sm:flex-row sm:flex-wrap"}`}>
        {!compact && (
          <div className="flex-1">
            <label htmlFor="nl-name" className="mb-1.5 block text-sm text-cream/70">
              Name
            </label>
            <input
              id="nl-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              className="min-h-[46px] w-full rounded-full border border-white/12 bg-night px-5 text-sm text-cream placeholder:text-cream/35 focus:border-ember"
              placeholder="Your name"
            />
          </div>
        )}
        <div className="flex-1">
          {!compact && (
            <label htmlFor="nl-email" className="mb-1.5 block text-sm text-cream/70">
              Email
            </label>
          )}
          <input
            id="nl-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label={compact ? "Email address" : undefined}
            aria-describedby={status === "error" ? "nl-error" : undefined}
            aria-invalid={status === "error" || undefined}
            autoComplete="email"
            className="min-h-[46px] w-full rounded-full border border-white/12 bg-night px-5 text-sm text-cream placeholder:text-cream/35 focus:border-ember"
            placeholder="you@example.com"
          />
        </div>
        <div className={compact ? "" : "flex items-end"}>
          <button type="button" onClick={submit} disabled={status === "loading"} className="btn-primary w-full sm:w-auto disabled:opacity-60">
            {status === "loading" ? "Subscribing…" : "Subscribe"}
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
      {status === "error" && (
        <p id="nl-error" role="alert" className="mt-2 flex items-center gap-1.5 text-sm text-ember">
          <AlertCircle className="h-4 w-4" /> {error}
        </p>
      )}
      <p className="mt-2 text-xs text-cream/40">
        No spam — only stories. You can unsubscribe anytime. Your email is never shared.
      </p>
    </div>
  );
}
