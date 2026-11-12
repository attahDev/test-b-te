// Receives the contact form, stores it for the admin panel (DATABASE_URL) and emails the team through Brevo.
// Email needs BREVO_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL (a verified Brevo sender).
// Either one working is enough for the message to count as received.
import { NextResponse } from "next/server";
import { dbEnabled, saveMessage } from "../../lib/db";

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const clean = (value: unknown, max: number) => (typeof value === "string" ? value.trim().slice(0, max) : "");

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Hidden field that real visitors never fill in.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const organisation = clean(body.organisation, 160);
  const audience = clean(body.audience, 80);
  const message = clean(body.message, 4000);

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10) {
    return NextResponse.json({ error: "Please add your name, a valid email and a message." }, { status: 400 });
  }

  const apiKey = process.env.BREVO_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  let stored = false;
  if (dbEnabled()) {
    try {
      await saveMessage({ name, email, organisation, audience, message });
      stored = true;
    } catch (error) {
      console.error("contact: could not store message", error);
    }
  }

  let emailed = false;
  if (apiKey && to && from) {
    try {
      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: { "api-key": apiKey, "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({
          sender: { name: "Black Tech Expo website", email: from },
          to: [{ email: to }],
          replyTo: { email, name },
          subject: `Website enquiry from ${name}${audience ? ` (${audience})` : ""}`,
          htmlContent: `<p><strong>${escapeHtml(name)}</strong> &lt;${escapeHtml(email)}&gt;</p>
<p>Organisation: ${escapeHtml(organisation) || "-"}<br>Enquiry type: ${escapeHtml(audience) || "-"}</p>
<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
        }),
      });
      emailed = response.ok;
    } catch (error) {
      console.error("contact: could not send email", error);
    }
  }

  if (!stored && !emailed) {
    return NextResponse.json({ error: "Messages can't be sent right now. Please try again later." }, { status: 503 });
  }
  return NextResponse.json({ ok: true });
}
