"use server"

import { db } from "@/db"
import { snippets } from "@/db/schema/snippets";

import { generateRandomString } from "@/utils";

export async function createSnippet() {
  // user auth check
  const id = generateRandomString(16)
  
  await db.insert(snippets).values({
    id: id,
    name: id,
    content: "a brand new snippet"
  })

  return {
    id
  }
}