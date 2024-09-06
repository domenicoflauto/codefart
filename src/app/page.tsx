import CodeExample from "@/components/CodeExample";
import { auth } from "@/auth";


import AllSnippets from "@/components/allSnippets";
import { getSnippets } from "./actions";

import { Flex, Text, Container } from '@radix-ui/themes';

export default async function Home() {
  const snippets = await getSnippets()

  const session = await auth()

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
    <main className="w-full  flex min-h-screen flex-col justify-between items-start">
      <Flex direction="column" gap="2">
        <Text className="text-sm font-semibold text-indigo-500">
          <span className="dark:bg-gradient-to-r dark:from-indigo-600 dark:to-sky-400 dark:text-transparent dark:bg-clip-text">
            Experiments
          </span>
        </Text>
        <Text as="p" className="text-2xl/6 tracking-tight text-zinc-950 dark:text-zinc-50">
          Using tailwindcss, radix-ui, and other cool stuff.
        </Text>
      </Flex>

      <Flex direction="column" gap="2" className="mt-6">
        <Text className="text-sm font-semibold text-indigo-500">
          <span className="dark:bg-gradient-to-r dark:from-indigo-600 dark:to-sky-400 dark:text-transparent dark:bg-clip-text">
            Can-do attitude
          </span>
        </Text>
        <Text as="p" className="text-2xl/6 tracking-tight text-zinc-950 dark:text-zinc-50">
          I don&apos;t care about this website
        </Text>
      </Flex>

      <div className="mt-12 flex flex-col justify-center items-center w-full">
        <CodeExample code={codeString} language="html" fileName="snippet 1" />
        {snippets && <AllSnippets session={session} snippets={snippets} />}
      </div>
      <span className="text-xs opacity-35">© 2024 - All rights reserved</span>
    </main>
  );
}
