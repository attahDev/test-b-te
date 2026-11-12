"use client";

import { useActionState } from "react";
import { login } from "./actions";

export default function LoginForm() {
  const [error, action, pending] = useActionState(login, "");
  return (
    <form action={action} className="mx-auto mt-10 w-full max-w-sm rounded-xl border border-white/10 bg-[#101216] p-6">
      <label className="block text-sm text-white/70">
        Password
        <input name="password" type="password" autoComplete="current-password" required className="mt-2 w-full rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 text-white focus:border-[#E97868] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E97868]/40" />
      </label>
      <button disabled={pending} className="mt-5 rounded-full bg-[#B04333] px-6 py-3 text-sm font-medium text-white hover:bg-[#923327] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E97868]">
        {pending ? "Checking…" : "Sign in"}
      </button>
      <p role="alert" className="mt-3 min-h-5 text-sm text-[#ff8a9a]">{error}</p>
    </form>
  );
}
