import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./users";

export const snippets = sqliteTable('snippets', {
  id: text('id').notNull().primaryKey(),
  name: text('name').notNull(),
  user: text('user')
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  content: text('content').notNull(),
  language: text('language').notNull(),
  visibility: text("visibility", { enum: ["private", "public"] }).notNull().default("public"),
  createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`).notNull(),
});
