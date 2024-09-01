"use server"

import { revalidatePath } from "next/cache";

import { db } from "@/db"
import { snippets } from "@/db/schema/snippets";
import { auth } from "@/auth";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema/users";

export async function createSnippet(text: string, id: string, language: string) {
  // user auth check
  const session = await auth()
  
  await db.insert(snippets).values({
    id: id,
    name: id,
    content: text,
    user: session?.user?.id!,
    language: language
  })

  return {
    id
  }
}

export async function getSnippets() {
  const allSnippets = await db.select({
    userId: users.id,
    id: snippets.id,
    name: snippets.name,
    content: snippets.content,
    visibility: snippets.visibility,
    createdAt: snippets.createdAt,
    userName: users.name,
    language: snippets.language
  }).from(snippets).leftJoin(users, eq(snippets.user, users.id))
  return allSnippets
}

export async function deleteSnippet(id: string) {
  await db.delete(snippets).where(eq(snippets.id, id))
  revalidatePath("/")
}