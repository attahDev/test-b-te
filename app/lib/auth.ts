// Single-password admin session: an expiring, HMAC-signed httpOnly cookie. No user table needed.
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE = "bte_admin";
const TTL_SECONDS = 60 * 60 * 12;

export const authConfigured = () => Boolean(process.env.ADMIN_PASSWORD && process.env.SESSION_SECRET);

const sign = (value: string) => createHmac("sha256", process.env.SESSION_SECRET!).update(value).digest("hex");

function safeEqual(a: string, b: string) {
  const x = Buffer.from(a), y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export const passwordMatches = (input: string) =>
  authConfigured() && safeEqual(sign(input), sign(process.env.ADMIN_PASSWORD!));

export async function startSession() {
  const exp = String(Math.floor(Date.now() / 1000) + TTL_SECONDS);
  (await cookies()).set(COOKIE, `${exp}.${sign(exp)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: TTL_SECONDS,
  });
}

export async function endSession() {
  (await cookies()).delete(COOKIE);
}

export async function isAdmin() {
  if (!authConfigured()) return false;
  const value = (await cookies()).get(COOKIE)?.value;
  if (!value) return false;
  const [exp, mac] = value.split(".");
  return Boolean(exp && mac) && safeEqual(mac, sign(exp)) && Number(exp) > Date.now() / 1000;
}
