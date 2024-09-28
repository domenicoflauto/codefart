import { validateRequest } from '@/lib/validate-request';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { getTotalByTag, getTransactionsByTag } from '@/app/actions';
import { TransactionsTable } from '@/components/TransactionsTable';

export default async function Page({ params }: { params: { tag: string } }) {
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
      <div>My Post: {params.tag}</div>
      <Suspense fallback={<TableSkeleton />}>
        <TransactionTableWithSuspense tag={params.tag} />
      </Suspense>
    </main>
  );
}

async function TransactionTableWithSuspense({ tag }: { tag: string }) {
  const { totalByTag } = await getTotalByTag(tag)
  const transactionsByTag = await getTransactionsByTag(tag)

  return (
    <div>
      <TransactionsTable data={transactionsByTag.transactionsByTag} tags={null} />
      <br />
      {totalByTag.map(
        (total) => (
          <div key={total.value}>
            {total.value}
          </div>
        )
      )}
    </div>
  )
}

function TableSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-4 w-full" />
      {/* <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" /> */}
    </div>
  )
}