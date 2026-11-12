// Contact form with inline validation, a spam trap and an announced success or error state.
"use client";

import { useState, type FormEvent } from "react";

const audiences = [
  "Government & Public Sector",
  "University & Education",
  "Technology Company",
  "Investor & Funder",
  "Corporate",
  "Startup & Founder",
  "Community Organisation",
  "Something else",
];

const field =
  "w-full rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 text-base text-white placeholder:text-white/35 transition-colors focus:border-[#E97868] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E97868]/40 aria-[invalid=true]:border-[#ff4764]";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [invalid, setInvalid] = useState<Record<string, boolean>>({});

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const problems = {
      name: !data.name?.trim(),
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email?.trim() ?? ""),
      message: (data.message?.trim().length ?? 0) < 10,
    };
    setInvalid(problems);
    if (Object.values(problems).some(Boolean)) {
      setStatus("error");
      setError("Please check the highlighted fields.");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(result.error ?? "Something went wrong.");
      form.reset();
      setStatus("sent");
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "Something went wrong.");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="panel-in rounded-xl border border-white/10 bg-[#101216]/80 p-8 md:p-10">
        <h2 className="text-2xl font-black tracking-tight md:text-3xl">Message sent</h2>
        <p className="mt-3 max-w-[420px] text-white/75">Thank you. The BTE team will reply to the email address you gave.</p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-6 text-sm text-[#E97868] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E97868]">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-xl border border-white/10 bg-[#101216]/80 p-6 backdrop-blur-sm md:p-10">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block text-sm text-white/70">
          Name
          <input name="name" autoComplete="name" required aria-invalid={invalid.name || undefined} className={`${field} mt-2`} />
        </label>
        <label className="block text-sm text-white/70">
          Email
          <input name="email" type="email" autoComplete="email" required aria-invalid={invalid.email || undefined} className={`${field} mt-2`} />
        </label>
        <label className="block text-sm text-white/70">
          Organisation <span className="text-white/40">(optional)</span>
          <input name="organisation" autoComplete="organization" className={`${field} mt-2`} />
        </label>
        <label className="block text-sm text-white/70">
          I am
          <select name="audience" defaultValue="" className={`${field} mt-2`}>
            <option value="" className="text-black">Choose one (optional)</option>
            {audiences.map((a) => (
              <option key={a} value={a} className="text-black">{a}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="mt-5 block text-sm text-white/70">
        Message
        <textarea name="message" rows={6} required minLength={10} aria-invalid={invalid.message || undefined} className={`${field} mt-2 resize-y`} />
      </label>

      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label>Website <input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="site-button inline-flex items-center gap-2 rounded-full bg-[#B04333] px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#923327] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E97868]"
        >
          {status === "sending" ? "Sending…" : <>Send message <span aria-hidden="true">↗</span></>}
        </button>
        <p role="alert" className="text-sm text-[#ff8a9a]">{status === "error" ? error : ""}</p>
      </div>
    </form>
  );
}
