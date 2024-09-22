"use server"

import { db } from "@/db"
import { userTable } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function getUsers() {
  const allUsers = await db.select({
    id: userTable.id,
    role: userTable.role,
    username: userTable.username
  }).from(userTable)
  return { allUsers }
}

export async function updateUserRole(userId: string, newRole: "user" | "admin") {
  await db.update(userTable).set({
    role: newRole
  }).where(eq(userTable.id, userId))
}