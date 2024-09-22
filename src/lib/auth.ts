import { Lucia } from "lucia";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { db } from "@/db";
import { sessionTable } from "@/db/schema/sessionTable";
import { userTable } from "@/db/schema/userTable";
import { GitHub } from "arctic";

export const github = new GitHub(
	String(process.env.AUTH_GITHUB_ID),
	String(process.env.AUTH_GITHUB_SECRET)
);

const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		// this sets cookies with super long expiration
		// since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
		expires: false,
		attributes: {
			// set to `true` when using HTTPS
			secure: process.env.NODE_ENV === "production"
		}
	},
	getUserAttributes: (attributes) => {
		return {
			// attributes has the type of DatabaseUserAttributes
			githubId: attributes.github_id,
			username: attributes.username,
			role: attributes.role,
		};
	}
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	github_id: string;
	username: string;
	role: "user" | "admin";
}

// Validating callback
// Instead of the user table, we can now use the OAuth account table to check if a user is already registered. If not, in a transaction, create the user and OAuth account.

// const tokens = await githubAuth.validateAuthorizationCode(code);
// const githubUser = await githubAuth.getUser(tokens.accessToken);

// const existingAccount = await db
// 	.table("oauth_account")
// 	.where("provider_id", "=", "github")
// 	.where("provider_user_id", "=", githubUser.id)
// 	.get();

// if (existingAccount) {
// 	const session = await lucia.createSession(existingAccount.user_id, {});

// 	// ...
// }

// const userId = generateIdFromEntropySize(10); // 16 characters long

// await db.beginTransaction();
// await db.table("user").insert({
// 	id: userId,
// 	username: githubUser.login
// });
// await db.table("oauth_account").insert({
// 	provider_id: "github",
// 	provider_user_id: githubUser.id,
// 	user_id: userId
// });
// await db.commit();

// const session = await lucia.createSession(userId, {});

// // ...