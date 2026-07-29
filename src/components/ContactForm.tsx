"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";

const enquiryTypes = [
  "General Message",
  "Travel Collaboration",
  "Brand Partnership",
  "Media Enquiry",
  "Technology and Business",
  "Other",
];

type Status = "idle" | "loading" | "success" | "error";

/**
 * Contact form with a placeholder submit handler. Connect it later to a
 * Next.js route handler, Formspree, Resend, etc. A honeypot field is included
 * as a simple spam-protection placeholder.
 */
export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", type: enquiryTypes[0], message: "", website: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Please enter a valid email address.";
    if (form.subject.trim().length < 3) e.subject = "Please add a short subject.";
    if (form.message.trim().length < 10) e.message = "Please write at least a sentence or two.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async () => {
    if (form.website) return; // honeypot tripped — silently drop
    if (!validate()) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    // Placeholder: simulate sending. Replace with a real API call.
    await new Promise((r) => setTimeout(r, 800));
    setStatus("success");
  };

  if (status === "success") {
    return (
      <div role="status" className="card-surface flex items-start gap-3 p-6">
        <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0" style={{ color: "#6FBF95" }} />
        <div>
          <p className="font-semibold text-cream">Message sent — thank you!</p>
          <p className="mt-1 text-sm text-cream/60">
            I read every message personally and will get back to you as soon as I can.
          </p>
        </div>
      </div>
    );
  }

  const inputCls =
    "min-h-[46px] w-full rounded-xl border bg-night px-4 text-sm text-cream placeholder:text-cream/35 focus:border-ember";
  const fieldErr = (k: string) =>
    errors[k] ? (
      <p id={`err-${k}`} role="alert" className="mt-1.5 flex items-center gap-1 text-xs text-ember">
        <AlertCircle className="h-3.5 w-3.5" /> {errors[k]}
      </p>
    ) : null;

  return (
    <div className="space-y-5">
      {/* Honeypot — hidden from humans */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={set("website")} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="mb-1.5 block text-sm text-cream/70">Name</label>
          <input id="cf-name" type="text" value={form.name} onChange={set("name")} autoComplete="name" aria-invalid={!!errors.name || undefined} aria-describedby={errors.name ? "err-name" : undefined} className={`${inputCls} ${errors.name ? "border-ember" : "border-white/12"}`} placeholder="Your name" />
          {fieldErr("name")}
        </div>
        <div>
          <label htmlFor="cf-email" className="mb-1.5 block text-sm text-cream/70">Email</label>
          <input id="cf-email" type="email" value={form.email} onChange={set("email")} autoComplete="email" aria-invalid={!!errors.email || undefined} aria-describedby={errors.email ? "err-email" : undefined} className={`${inputCls} ${errors.email ? "border-ember" : "border-white/12"}`} placeholder="you@example.com" />
          {fieldErr("email")}
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-subject" className="mb-1.5 block text-sm text-cream/70">Subject</label>
          <input id="cf-subject" type="text" value={form.subject} onChange={set("subject")} aria-invalid={!!errors.subject || undefined} aria-describedby={errors.subject ? "err-subject" : undefined} className={`${inputCls} ${errors.subject ? "border-ember" : "border-white/12"}`} placeholder="What's this about?" />
          {fieldErr("subject")}
        </div>
        <div>
          <label htmlFor="cf-type" className="mb-1.5 block text-sm text-cream/70">Enquiry type</label>
          <select id="cf-type" value={form.type} onChange={set("type")} className={`${inputCls} cursor-pointer border-white/12`}>
            {enquiryTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="cf-message" className="mb-1.5 block text-sm text-cream/70">Message</label>
        <textarea id="cf-message" rows={6} value={form.message} onChange={set("message")} aria-invalid={!!errors.message || undefined} aria-describedby={errors.message ? "err-message" : undefined} className={`w-full rounded-xl border bg-night p-4 text-sm text-cream placeholder:text-cream/35 focus:border-ember ${errors.message ? "border-ember" : "border-white/12"}`} placeholder="Tell me about your idea, recommendation, or story…" />
        {fieldErr("message")}
      </div>
      <button type="button" onClick={submit} disabled={status === "loading"} className="btn-primary disabled:opacity-60">
        {status === "loading" ? "Sending…" : "Send Message"} <Send className="h-4 w-4" />
      </button>
    </div>
  );
}
