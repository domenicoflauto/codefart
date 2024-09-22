import { validateRequest } from "@/lib/validate-request";
import { redirect } from "next/navigation";
import { getUsers, updateUserRole } from "./actions"
import { UserManagement } from "./_components/UserManagement";

export default async function Page() {
  const { user } = await validateRequest();
  const { allUsers } = await getUsers();

  if (!user) {
    return redirect("/login");
  }

  if (user && user.role !== "admin") {
    return (
      <main className="w-full min-h-[calc(100vh-4rem)] flex flex-col">
        <h1>Admin only</h1>
        <p>
          You must be an admin to view this page.
        </p>
      </main>
    )
  }

  return (
    <main className="w-full min-h-[calc(100vh-4rem)] flex flex-col">
      <UserManagement users={allUsers} you={user.id} />
    </main>
  )
}