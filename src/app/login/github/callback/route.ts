import { github, lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { generateIdFromEntropySize } from "lucia";
import { db } from "@/db"
import { oAuthAccounts, userTable } from "@/db/schema";
import { sql } from "drizzle-orm";


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

    const existingAccount = await db
      .select()
      .from(oAuthAccounts)
      .where(sql`${oAuthAccounts.providerId} = 'github' and ${oAuthAccounts.providerUserId} = ${githubUser.id}`)
      .get();


      if(existingAccount) {
        const session = await lucia.createSession(existingAccount.userId, {});
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

		await db.transaction(async (db) => {
      await db.insert(userTable).values({
        id: userId,
        username: githubUser.login
      })
      await db.insert(oAuthAccounts).values({
        providerId: "github",
        providerUserId: githubUser.id,
        userId
      })
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