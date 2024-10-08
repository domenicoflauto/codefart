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
import { eq, sql, sum } from "drizzle-orm";


export async function logout() {
  console.log("logging out...")
	const { session } = await validateRequest();
	if (!session) {
    return {
      error: "Unauthorized"
		};
	}
  
	await lucia.invalidateSession(session.id);
  console.log("logged out!")

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

export async function getTransactions() {
  const allTransactions = await db.select({
    amount: transactions.amount,
    description: transactions.description,
    date: transactions.date,
    tags: transactions.tags
  }).from(transactions)
  return { allTransactions }
}

export async function getTransactionsByTag(tagName: string) {
  const transactionsByTag = await db.select({
    amount: transactions.amount,
    description: transactions.description,
    date: transactions.date,
    tags: transactions.tags
  }).from(transactions).where(eq(transactions.tags, tagName))
  return { transactionsByTag }
}

export async function getTotalByTag(tagName: string) {
  const totalByTag = await db.select({
    value: sum(transactions.amount).as('value')
  }).from(transactions)
  .where(eq(transactions.tags, tagName))
  return { totalByTag }
}

export async function getTags() {
  const allTags = await db.select({
    name: tags.name,
    color: tags.color
  }).from(tags)
  return { allTags }
}

export async function createTag(tag: string, color?: string) {
  await db.insert(tags).values({
    name: tag,
    color: color ?? "#000000"
  })

  return {
    tag,
    color
  }
}

export async function removeTag(tagName: string) {
  await db.delete(tags).where(eq(tags.name, tagName));

  return {
    removedTag: tagName
  }
}

export async function updateTagColor(tagName: string, color: string) {
  await db.update(tags).set({ color }).where(eq(tags.name, tagName));

  return {
    tagName,
    color
  }
}
