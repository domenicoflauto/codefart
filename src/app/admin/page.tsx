import { auth } from "@/auth"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ConfirmSomething from "./components/ConfirmSomething";

export default async function Page() {
  const session = await auth()
  const isAdmin = session?.user?.role === "admin";
  return (
    isAdmin
      ? (
        <div>

          <Tabs defaultValue="account" className="w-[400px] m-auto">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="somethingelse">Something else</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <div className="flex flex-col bg-slate-500">
                Make changes to your account here.
                <ConfirmSomething />

              </div>
            </TabsContent>
            <TabsContent value="password">Change your password here.</TabsContent>
            <TabsContent value="somethingelse">Something else....</TabsContent>
          </Tabs>

        </div >
      ) : (
        <div>
          <h1>Not an Admin</h1>
        </div>
      )
  )
}