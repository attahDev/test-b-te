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
    <div className="mb-12 grid gap-5 border-t border-white/45 pt-9 md:grid-cols-[1fr_1fr] md:items-center md:gap-10">
      <div>
        <h4 className="text-lg font-semibold leading-6 text-[#FAFAF9]">Newsletter</h4>
        <p className="mt-1 text-sm text-[#a3a3a3]">News, events and opportunities from Black Tech Expo, sent to your inbox.</p>
      </div>

      {status === "done" ? (
        <p role="status" className="text-base text-[#FAFAF9]">Thank you, you are on the list.</p>
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
            className="min-h-11 w-full flex-1 rounded-full border border-white/30 bg-transparent px-5 text-base text-[#FAFAF9] placeholder:text-white/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E97868]"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="min-h-11 rounded-full bg-[#B04333] px-6 text-sm font-medium text-white transition-colors hover:bg-[#923327] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E97868]"
          >
            {status === "sending" ? "Sending" : "Subscribe"}
          </button>
          {status === "failed" && <p role="alert" className="text-sm text-[#E97868] sm:basis-full">That did not go through. Please try again.</p>}
        </form>
      )}
    </div>
  );
}
