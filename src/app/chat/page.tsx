import { Flex, Text } from '@radix-ui/themes';

import { Chat } from '@/components/Chat';
import { auth } from '@/auth';


export default async function Page() {
  const session = await auth();
  return (
    <main className="w-full min-h-[calc(100vh-4rem)] flex flex-col">
      {session?.user?.role === 'admin' && <Chat user={session.user} />}
      <span className="text-xs opacity-35">© 2024 - All rights reserved</span>
    </main>

  )
}