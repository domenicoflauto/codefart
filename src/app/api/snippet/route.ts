import { db } from "@/db";
import { snippets } from "@/db/schema/snippets";

// import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  // const { content, snippetId } = await req.json();

  // check if user is logged in
  // make sure that snippet belongs to them
  // if(!snippetId) {
  //   return new Response("snippetId is required", { status: 400 })
  // }
  
  // const snippet = db.select().from(snippets).where(eq(snippets.id, snippetId)).get()
  
  // if(!snippet) {
  //   return new Response("snippet is not found", { status: 400 })
  // }

  // db.insert(snippets).values({
  //   content
  // })

  const result = await db.select().from(snippets).all();

  return result
}