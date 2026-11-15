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
    <section aria-labelledby="newsletter-title" className="bg-[#B04333] px-6 py-12 text-white md:py-16">
      <div className="mx-auto grid w-full max-w-[1200px] gap-6 md:grid-cols-2 md:items-center md:gap-14">
        <div>
          <h2 id="newsletter-title" className="text-2xl font-black leading-tight tracking-tight md:text-4xl">Stay in the loop</h2>
          <p className="mt-2 max-w-[420px] text-sm text-white/85 md:text-base">News, events and opportunities from Black Tech Expo, sent to your inbox.</p>
        </div>

        {status === "done" ? (
          <p role="status" className="text-lg font-medium">Thank you, you are on the list.</p>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              required
              autoComplete="email"
              placeholder="Your email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="min-h-11 w-full flex-1 rounded-full border border-white/60 bg-transparent px-5 text-base text-white placeholder:text-white/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="min-h-11 rounded-full bg-[#161415] px-6 text-sm font-medium text-white transition-colors hover:bg-black disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {status === "sending" ? "Sending" : "Subscribe"}
            </button>
            {status === "failed" && <p role="alert" className="text-sm text-white sm:basis-full">That did not go through. Please try again.</p>}
          </form>
        )}
      </div>
    </section>
  );
}
