import CodeExample from "@/components/CodeExample";
import { auth, signIn, signOut } from "@/auth";


import AllSnippets from "@/components/allSnippets";
import { getSnippets } from "./actions";

import { TopBar } from "@/components/TopBar";
import { Flex, Text, Button } from '@radix-ui/themes';

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

  const codeString = `<style>
    button {
      background-color: #111111;
      color: #F5F5F5;
      padding: 8px 12px;
      border-radius: 6px;
    }
    </style>
    <body>
      <button>Click me</button>
    </body>`;

  return (
    <main className="w-full  flex min-h-screen flex-col justify-between items-center p-24">
      <TopBar
        session={session}
        login={handleLogin}
        logout={handleLogout}
      />

      <Flex direction="column" gap="2">
        <Text>Hello from Radix Themes :)</Text>
        <Button>Let&apos;s go</Button>
      </Flex>

      <div className="flex flex-col justify-center items-center">
        <p>Homepage of experiments, trash, etc.</p>
        <br />
        <CodeExample code={codeString} language="html" fileName="snippet 1" />

        {snippets && <AllSnippets session={session} snippets={snippets} />}


      </div>
      <span className="text-xs opacity-35">© 2024 - All rights reserved</span>
    </main>
  );
}
