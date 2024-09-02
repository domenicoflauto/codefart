import { auth } from "@/auth"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function Page() {
  const session = await auth()
  const isAdmin = session?.user?.role === "admin";
  return (
    isAdmin
      ? (
        <div>
          <Tabs defaultValue="account" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">Make changes to your account here.</TabsContent>
            <TabsContent value="password">Change your password here.</TabsContent>
          </Tabs>

        </div >
      ) : (
        <div>
          <h1>Not an Admin</h1>
        </div>
      )
  )
}