import { auth } from "@/auth"

export default async function Page() {
  const session = await auth()
  const isAdmin = session?.user?.role === "admin";
  return (
    isAdmin
      ? (
        <div>
          <h1>Admin Page</h1>
        </div >
      ) : (
        <div>
          <h1>Not an Admin</h1>
        </div>
      )
  )
}