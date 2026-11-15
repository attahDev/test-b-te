import { NextResponse } from "next/server";
import { addSubscriber, dbEnabled } from "../../lib/db";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (typeof body.website === "string" && body.website.trim()) return NextResponse.json({ ok: true });

  const email = typeof body.email === "string" ? body.email.trim().slice(0, 200).toLowerCase() : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  let stored = false;
  if (dbEnabled()) {
    try {
      await addSubscriber(email);
      stored = true;
    } catch (error) {
      console.error("newsletter: could not store subscriber", error);
    }
  }

  let synced = false;
  const apiKey = process.env.BREVO_API_KEY;
  if (apiKey) {
    const listId = Number(process.env.BREVO_NEWSLETTER_LIST_ID);
    try {
      const response = await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: { "api-key": apiKey, "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({ email, updateEnabled: true, ...(listId ? { listIds: [listId] } : {}) }),
      });
      synced = response.ok;
    } catch (error) {
      console.error("newsletter: could not add contact to Brevo", error);
    }
  }

  if (!stored && !synced) {
    return NextResponse.json({ error: "Sign up is unavailable right now." }, { status: 503 });
  }
  return NextResponse.json({ ok: true });
}
