import { Flex, Text } from '@radix-ui/themes';

import { Chat } from '@/components/Chat';
import { auth } from '@/auth';

export default async function Home() {
  const session = await auth();
  return (
    <main className="w-full flex min-h-screen flex-col justify-between items-start">
      <Flex direction="column" gap="4">
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
      </Flex>
      {session?.user?.role === 'admin' && <Chat />}
      <span className="text-xs opacity-35">© 2024 - All rights reserved</span>
    </main>
  );
}
