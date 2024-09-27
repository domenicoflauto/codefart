import { validateRequest } from '@/lib/validate-request';
import { redirect } from 'next/navigation';

export default async function Home() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }
  if (user && user.role !== "admin") {
    return (
      <main className="w-full min-h-[calc(100vh-4rem)] flex flex-col">
        <h1>Admin only</h1>
        <p>
          You must be an admin to view this page.
        </p>
      </main>
    )
  }
  return (
    <main className="w-full min-h-[calc(100vh-4rem)] flex flex-col">
      Hello, {user.username}
    </main>
  );
}
