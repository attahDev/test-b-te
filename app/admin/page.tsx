import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { authConfigured, isAdmin } from "../lib/auth";
import { dbEnabled, listMessages } from "../lib/db";
import { logout, remove, toggleRead } from "./actions";
import LoginForm from "./LoginForm";

export const metadata: Metadata = { title: "Admin - Black Tech Expo", robots: { index: false, follow: false } };

const when = (iso: string) =>
  new Date(iso).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Europe/London" });

const btn = "rounded-full border border-white/25 px-4 py-1.5 text-xs text-white/80 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E97868]";

async function Content() {
  if (!authConfigured()) {
    return <p className="mt-10 text-white/70">Admin is not set up. Add ADMIN_PASSWORD and SESSION_SECRET to the environment.</p>;
  }
  if (!(await isAdmin())) return <LoginForm />;
  if (!dbEnabled()) {
    return <p className="mt-10 text-white/70">No database connected. Add DATABASE_URL to the environment to store messages.</p>;
  }

  const messages = await listMessages();
  const unread = messages.filter((m) => !m.read).length;

  return (
    <>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-white/70">{messages.length} messages, {unread} unread</p>
        <form action={logout}><button className={btn}>Sign out</button></form>
      </div>
      {messages.length === 0 ? (
        <p className="mt-10 text-white/60">No messages yet.</p>
      ) : (
        <ul className="mt-6 flex flex-col gap-4">
          {messages.map((m) => (
            <li key={m.id} className={`rounded-xl border p-5 ${m.read ? "border-white/10 bg-white/[0.02]" : "border-[#E97868]/50 bg-white/[0.05]"}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-bold">
                  {m.name} <a href={`mailto:${m.email}`} className="ml-2 text-sm font-normal text-[#E97868] underline underline-offset-4">{m.email}</a>
                </p>
                <time dateTime={m.created_at} className="text-xs text-white/50">{when(m.created_at)}</time>
              </div>
              <p className="mt-1 text-xs text-white/50">{[m.organisation, m.audience].filter(Boolean).join(" · ") || "No organisation or type given"}</p>
              <p className="mt-3 whitespace-pre-wrap text-white/85">{m.message}</p>
              <div className="mt-4 flex gap-2">
                <form action={toggleRead}>
                  <input type="hidden" name="id" value={m.id} />
                  <input type="hidden" name="read" value={String(!m.read)} />
                  <button className={btn}>{m.read ? "Mark unread" : "Mark read"}</button>
                </form>
                <form action={remove}>
                  <input type="hidden" name="id" value={m.id} />
                  <button className={`${btn} hover:border-[#ff4764] hover:text-[#ff8a9a]`}>Delete</button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#08090d] px-6 py-10 text-white md:px-14">
      <div className="mx-auto w-full max-w-[900px]">
        <Link href="/" className="text-sm text-white/50 hover:text-white">← Back to site</Link>
        <h1 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">Messages</h1>
        <Suspense fallback={<p className="mt-10 text-white/50">Loading…</p>}>
          <Content />
        </Suspense>
      </div>
    </main>
  );
}
