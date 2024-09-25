import { validateRequest } from "@/lib/validate-request";
import { redirect } from "next/navigation";
import { getUsers } from "./actions"
import { UserManagement } from "./_components/UserManagement";
import { TagsManagement } from "./_components/TagsManagement";
import { getTags } from "../actions";

export default async function Page() {
  const { user } = await validateRequest();
  const { allUsers } = await getUsers();
  const { allTags } = await getTags();

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
    <main className="w-full min-h-[calc(100vh-4rem)] flex flex-col gap-24">
      <UserManagement users={allUsers} you={user.id} />
      <TagsManagement tags={allTags} />
    </main>
  )
}