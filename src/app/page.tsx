import CodeExample from "@/components/CodeExample";
import { SignIn } from "@/components/signin-button";
import { SignOut } from "@/components/signout-button";
import { auth } from "@/auth";
import Image from "next/image";

export default async function Home() {
  const session = await auth()

  // if (!session?.user) return null

  return (
    <main className="flex min-h-screen flex-col justify-between items-center p-24 border-[--foreground-rgb] border-2 rounded-xl">
      {
        !session
          ? <SignIn />
          : <div className="flex flex-row justify-center items-center gap-3">
            <Image width={24} height={24} className="w-6 rounded-full" src={session?.user?.image!} alt="User Avatar" />
            <span>
              Hello, {session?.user?.name}
            </span>
            <SignOut />
          </div>
      }
      <div className="flex flex-col justify-center items-center">
        <p>Homepage of experiments, trash, etc.</p>
        <button style={{ backgroundColor: "#111111", color: "#f5f5f5", padding: "8px 12px", borderRadius: "6px" }}>
          Click me
        </button>
        <CodeExample />
      </div>
      <span className="text-xs opacity-35">© 2024 - All rights reserved</span>
    </main>
  );
}
