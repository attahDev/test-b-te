"use server";

import { revalidatePath } from "next/cache";
import { endSession, isAdmin, passwordMatches, startSession } from "../lib/auth";
import { deleteMessage, setRead } from "../lib/db";

export async function login(_: string, formData: FormData) {
  const ok = passwordMatches(String(formData.get("password") ?? ""));
  if (!ok) {
    await new Promise((r) => setTimeout(r, 800));
    return "Incorrect password.";
  }
  await startSession();
  revalidatePath("/admin");
  return "";
}

export async function logout() {
  await endSession();
  revalidatePath("/admin");
}

export async function toggleRead(formData: FormData) {
  if (!(await isAdmin())) return;
  await setRead(Number(formData.get("id")), formData.get("read") === "true");
  revalidatePath("/admin");
}

export async function remove(formData: FormData) {
  if (!(await isAdmin())) return;
  await deleteMessage(Number(formData.get("id")));
  revalidatePath("/admin");
}
