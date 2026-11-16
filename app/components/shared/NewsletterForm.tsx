"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "done" | "failed";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, website: "" }),
      });
      setStatus(response.ok ? "done" : "failed");
    } catch {
      setStatus("failed");
    }
  }

  return (
    <div aria-labelledby="newsletter-title" className="mt-14 max-w-[420px]">
      <h2 id="newsletter-title" className="text-[11px] uppercase tracking-[0.3em] text-[#E97868]">Stay in the loop</h2>
      <p className="mt-3 text-sm text-[#FAFAF9]/60">News, events and opportunities from Black Tech Expo.</p>

      {status === "done" ? (
        <p role="status" className="mt-5 text-base">Thank you, you are on the list.</p>
      ) : (
        <form onSubmit={onSubmit} className="mt-5">
          <label htmlFor="newsletter-email" className="sr-only">Email address</label>
          <div className="flex items-center border-b border-white/30 focus-within:border-[#E97868]">
            <input
              id="newsletter-email"
              type="email"
              required
              autoComplete="email"
              placeholder="Your email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="min-h-11 w-full bg-transparent py-2 text-base text-white placeholder:text-white/40 focus:outline-none"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="min-h-11 px-2 text-xs uppercase tracking-[0.25em] text-[#E97868] transition-colors hover:text-white disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-[#E97868]"
            >
              {status === "sending" ? "Sending" : "Subscribe"}
            </button>
          </div>
          {status === "failed" && <p role="alert" className="mt-3 text-sm text-[#E97868]">That did not go through. Please try again.</p>}
        </form>
      )}
    </div>
  );
}
