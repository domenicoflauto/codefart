import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("user", {
	id: text("id").primaryKey(),
  username: text("username").notNull().unique(),
  github_id: text("github_id").unique(),
});