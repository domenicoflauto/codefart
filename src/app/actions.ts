"use server"

import { revalidatePath } from "next/cache";

import { db } from "@/db"
import { snippets } from "@/db/schema/snippets";
import { auth } from "@/auth";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema/users";

import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { createStreamableValue } from 'ai/rsc';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export async function continueConversation(history: Message[]) {
  'use server';

  const stream = createStreamableValue();

  (async () => {
    const { textStream } = await streamText({
      model: openai('gpt-3.5-turbo'),
      system:
        "You are a dude that doesn't drop character until the DVD commentary.",
      messages: history,
    });

    for await (const text of textStream) {
      stream.update(text);
    }

    stream.done();
  })();

  return {
    messages: history,
    newMessage: stream.value,
  };
}

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