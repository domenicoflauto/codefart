import { Lucia } from "lucia";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { db } from "@/db";
import { sessionTable } from "@/db/schema/sessionTable";
import { userTable } from "@/db/schema/userTable";
import { GitHub } from "arctic";
import { Google } from "arctic";

export const github = new GitHub(
	String(process.env.AUTH_GITHUB_ID),
	String(process.env.AUTH_GITHUB_SECRET)
);

export const google = new Google(
	String(process.env.AUTH_GOOGLE_ID),
	String(process.env.AUTH_GOOGLE_SECRET),
	process.env.NEXT_PUBLIC_BASE_URL + "/login/google/callback"
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
			username: attributes.username,
			role: attributes.role,
			avatar: attributes.avatar
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
	username: string;
	role: "user" | "admin";
	avatar: string | null;
}
