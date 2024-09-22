import { primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { userTable } from "./userTable";

export const oAuthAccounts = sqliteTable("oauth_account", {
	providerId: text("provider_id"),
	providerUserId: text("provider_user_id")
		.notNull(),
  userId: text("user_id")
		.notNull()
		.references(() => userTable.id),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.providerId, table.providerUserId] }),
  }
});