import { TransactionsTable } from '@/components/TransactionsTable';
import { getTags, getTransactions } from '@/app/actions';
import { validateRequest } from '@/lib/validate-request';
import { redirect } from 'next/navigation';

export default async function Home() {
  const transactions = await getTransactions()
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
      <TransactionsTable
        // data={MOCK_DATA}
        data={transactions.allTransactions}
        tags={tags.allTags.map(tag => ({ ...tag, color: tag.color || '' }))}
      />
    </main>
  );
}
