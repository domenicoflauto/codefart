"use server"

import { revalidatePath } from "next/cache";

import { db } from "@/db"
import { snippets } from "@/db/schema/snippets";
import { auth } from "@/auth";
import { eq } from "drizzle-orm";

export async function createSnippet(text: string, id: string) {
  // user auth check
  const session = await auth()
  
  await db.insert(snippets).values({
    id: id,
    name: id,
    content: text,
    user: session?.user?.id!
  })

  return {
    id
  }
}

export async function getSnippets() {
  const allSnippets = await db.select().from(snippets)
  return allSnippets
}

export async function deleteSnippet(id: string) {
  await db.delete(snippets).where(eq(snippets.id, id))
  revalidatePath("/")
}