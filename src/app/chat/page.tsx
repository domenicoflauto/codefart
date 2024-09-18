import { Chat } from '@/components/Chat';

export default async function Page() {
  return (
    <main className="w-full min-h-[calc(100vh-4rem)] flex flex-col">
      <Chat />
      <span className="text-xs opacity-35">© 2024 - All rights reserved</span>
    </main>
  )
}