import { google, lucia } from "@/lib/auth";
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
	const codeVerifier = cookies().get("codeVerifier")?.value ?? null;
	const storedState = cookies().get("google_oauth_state")?.value ?? null;
	if (!code || !state || !storedState || !codeVerifier || state !== storedState) {

		return new Response(null, {
			status: 400
		});
	}

	try {

		const tokens = await google.validateAuthorizationCode(code, codeVerifier);

		const googleUserResponse = await  fetch("https://openidconnect.googleapis.com/v1/userinfo", {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});

		const googleUser: GoogleUser = await googleUserResponse.json();



    const existingAccount = await db
      .select()
      .from(oAuthAccounts)
      .where(sql`${oAuthAccounts.providerId} = 'google' and ${oAuthAccounts.providerUserId} = ${googleUser.sub}`)
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
        username: googleUser.name.replace(/\s+/g, ''),
				avatar: googleUser.picture
      })
      await db.insert(oAuthAccounts).values({
        providerId: "google",
        providerUserId: googleUser.sub,
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

		return new Response(null, {
      status: 500
		});
	}
}

interface GoogleUser {
	sub: string;
	name: string;
	picture: string;
}