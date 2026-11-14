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

  if (!dbEnabled()) return NextResponse.json({ error: "Sign up is unavailable right now." }, { status: 503 });

  try {
    await addSubscriber(email);
  } catch (error) {
    console.error("newsletter: could not store subscriber", error);
    return NextResponse.json({ error: "Sign up is unavailable right now." }, { status: 503 });
  }

  return NextResponse.json({ ok: true });
}
