// Neon access for contact messages. The table is created on first use.
import { neon } from "@neondatabase/serverless";

export type Message = {
  id: number;
  name: string;
  email: string;
  organisation: string;
  audience: string;
  message: string;
  read: boolean;
  created_at: string;
};

export const dbEnabled = () => Boolean(process.env.DATABASE_URL);

const sql = () => neon(process.env.DATABASE_URL!);

async function ensureTable() {
  await sql()`CREATE TABLE IF NOT EXISTS contact_messages (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    organisation TEXT NOT NULL DEFAULT '',
    audience TEXT NOT NULL DEFAULT '',
    message TEXT NOT NULL,
    read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`;
}

export async function saveMessage(m: Omit<Message, "id" | "read" | "created_at">) {
  await ensureTable();
  await sql()`INSERT INTO contact_messages (name, email, organisation, audience, message)
    VALUES (${m.name}, ${m.email}, ${m.organisation}, ${m.audience}, ${m.message})`;
}

export async function listMessages(): Promise<Message[]> {
  await ensureTable();
  return (await sql()`SELECT id, name, email, organisation, audience, message, read, created_at::text
    FROM contact_messages ORDER BY created_at DESC LIMIT 500`) as Message[];
}

export async function setRead(id: number, read: boolean) {
  await sql()`UPDATE contact_messages SET read = ${read} WHERE id = ${id}`;
}

export async function deleteMessage(id: number) {
  await sql()`DELETE FROM contact_messages WHERE id = ${id}`;
}
