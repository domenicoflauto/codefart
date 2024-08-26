import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

import { db } from "./db"
import { users } from "./db/schema/users"
import { accounts } from "./db/schema/accounts"

declare module "next-auth" {
  interface User {
    // Add your additional properties here:
    role: "admin" | "default";
  }
}

 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
  }),
  providers: [
    GitHub,
    Google
  ],
})
