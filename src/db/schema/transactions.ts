import { generateRandomString } from "@/utils";
import { sql } from "drizzle-orm";
import { sqliteTable, text, real } from "drizzle-orm/sqlite-core";

export const transactions = sqliteTable('transactions', {
  id: text('id').notNull().primaryKey().$defaultFn(() => generateRandomString(16)
),
  amount: real('amount').notNull(),
  description: text('description').notNull(),
  date: text('date').notNull(),
  createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`).notNull(),
  tags: text('tags').references(() => tags.id, { onDelete: 'cascade' }),
});

export const tags = sqliteTable('tags', {
  id: text('id').notNull().primaryKey().$defaultFn(() => generateRandomString(16)),
  name: text('name').notNull(),
  createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`).notNull(),
});