import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("user", {
	id: text("id").primaryKey(),
  username: text("username").notNull().unique(),
  role: text("role", { enum: ["user", "admin"] }).notNull().default("user"),
});