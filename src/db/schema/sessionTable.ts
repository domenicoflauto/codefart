import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { userTable } from "./userTable";

export const sessionTable = sqliteTable("session", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => userTable.id),
	expiresAt: integer("expires_at").notNull()
});