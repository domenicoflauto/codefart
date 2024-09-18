import { TransactionsTable } from '@/components/TransactionsTable';

import { getTags, logout } from '@/app/actions';
import { validateRequest } from '@/lib/validate-request';
import Link from 'next/link';


export default async function Home() {

  const user = await validateRequest();

  const tags = await getTags()

  const MOCK_DATA = [
    {
      date: "2024-09-01",
      description: "Amazon Fresh",
      amount: 53.33
    },
    {
      date: "2024-09-02",
      description: "Tesco",
      amount: 23.33
    },
    {
      date: "2024-09-03",
      description: "Uber Eats",
      amount: 13.10
    },
    {
      date: "2024-09-04",
      description: "Netflix",
      amount: 12.99
    },
  ]

  return (
    <main className="w-full min-h-[calc(100vh-4rem)] flex flex-col">
      {user &&
        <>
          <form action={logout}>
            <button>
              Logout
            </button>
          </form>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      }
      {!user && <Link href="/login">Login</Link>}
      {!user && <Link href="/signup">Sign up</Link>}
      <TransactionsTable
        // data={MOCK_DATA}
        tags={tags.allTags}
      />
    </main>
  );
}
