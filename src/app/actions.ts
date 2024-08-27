"use server"

import { db } from "@/db"
import { snippets } from "@/db/schema/snippets";
import { auth } from "@/auth";

import { generateRandomString } from "@/utils";

export async function createSnippet(text: string) {
  // user auth check
  const session = await auth()
  const id = generateRandomString(16)
  
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