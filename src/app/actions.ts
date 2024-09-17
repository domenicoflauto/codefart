"use server"

import { db } from "@/db"
import { transactions, tags } from "@/db/schema/transactions";

import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

import { createStreamableValue } from 'ai/rsc';

import { lucia } from "@/lib/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { validateRequest } from "@/lib/validate-request";

export async function logout() {
	const { session } = await validateRequest();
	if (!session) {
		return {
			error: "Unauthorized"
		};
	}

	await lucia.invalidateSession(session.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect("/login");
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export async function continueConversation(history: Message[]) {
  'use server';

  const stream = createStreamableValue();

  (async () => {
    const { textStream } = await streamText({
      model: openai('gpt-4o-mini'),
      system:
        "Reply using poetry only.",
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

type Transaction = {
  amount: number, description: string, date: string, tags: string
}

export async function addTransactions(transactionRows: Transaction[]) {
  await db.insert(transactions).values(
    transactionRows
  )

  return {
    transactionRows
  }
}

export async function getTags() {
  const allTags = await db.select({
    name: tags.name
  }).from(tags)
  return { allTags }
}

export async function createTag(tag: string) {
  await db.insert(tags).values({
    name: tag
  })

  return {
    tag
  }
}
