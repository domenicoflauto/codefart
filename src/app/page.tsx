import { TransactionsTable } from '@/components/TransactionsTable';
import { getTags, getTransactions } from '@/app/actions';
import { validateRequest } from '@/lib/validate-request';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

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
      <Suspense fallback={<TableSkeleton />}>
        <TransactionTableWithSuspense />
      </Suspense>
    </main>
  );
}

async function TransactionTableWithSuspense() {
  const transactions = await getTransactions()
  const tags = await getTags()

  return (
    <TransactionsTable
      data={transactions.allTransactions}
      tags={tags.allTags.map(tag => ({ ...tag, color: tag.color || '' }))}
    />
  )
}

function TableSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
    </div>
  )
}