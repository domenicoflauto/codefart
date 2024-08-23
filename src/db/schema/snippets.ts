import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const snippets = sqliteTable('snippets', {
  id: text('id').notNull().primaryKey(),
  name: text('name').notNull(),
  content: text('content').notNull(),
  createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`).notNull(),
});
