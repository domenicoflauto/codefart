import { github, lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { generateIdFromEntropySize } from "lucia";
import { db } from "@/db"
import { userTable } from "@/db/schema";
import { eq } from "drizzle-orm";


export async function GET(request: Request): Promise<Response> {
	const url = new URL(request.url);
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");
	const storedState = cookies().get("github_oauth_state")?.value ?? null;
	if (!code || !state || !storedState || state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	try {
		const tokens = await github.validateAuthorizationCode(code);
		const githubUserResponse = await fetch("https://api.github.com/user", {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});
		const githubUser: GitHubUser = await githubUserResponse.json();

		// Replace this with your own DB client.
    const existingUser = await db.select().from(userTable).where(eq(userTable.github_id, githubUser.id)).get();

		if (existingUser) {
			const session = await lucia.createSession(existingUser.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			return new Response(null, {
				status: 302,
				headers: {
					Location: "/"
				}
			});
		}

		const userId = generateIdFromEntropySize(10); // 16 characters long

		// Replace this with your own DB client.
		await db.insert(userTable).values({
			id: userId,
			github_id: githubUser.id,
			username: githubUser.login
		});

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/"
			}
		});
	} catch (e) {
		// the specific error message depends on the provider
		if (e instanceof OAuth2RequestError) {
			// invalid code
			return new Response(null, {
				status: 400
			});
		}
    console.log("auth error", e);
		return new Response(null, {
      status: 500
		});
	}
}

interface GitHubUser {
	id: string;
	login: string;
}