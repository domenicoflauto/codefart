import CodeExample from "@/components/CodeExample";
import { SignIn } from "@/components/signin-button";
import { SignOut } from "@/components/signout-button";
import { auth, signIn, signOut } from "@/auth";


import AllSnippets from "@/components/allSnippets";
import { getSnippets } from "./actions";

import { TopBar } from "@/components/TopBar";

export default async function Home() {
  const session = await auth()
  const snippets = await getSnippets()

  const handleLogin = async () => {
    "use server"
    await signIn()
  }

  const handleLogout = async () => {
    "use server"
    await signOut()
  }

  return (
    <main className="w-full  flex min-h-screen flex-col justify-between items-center p-24">
      <TopBar
        session={session}
        login={handleLogin}
        logout={handleLogout}
      />

      <div className="flex flex-col justify-center items-center">
        <p>Homepage of experiments, trash, etc.</p>
        <button style={{ backgroundColor: "#111111", color: "#f5f5f5", padding: "8px 12px", borderRadius: "6px" }}>
          Click me
        </button>
        <CodeExample />

        {
          snippets && <AllSnippets session={session} snippets={snippets} />
        }


      </div>
      <span className="text-xs opacity-35">© 2024 - All rights reserved</span>
    </main>
  );
}
