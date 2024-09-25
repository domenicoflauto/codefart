import { TransactionsTable } from '@/components/TransactionsTable';
import { getTags } from '@/app/actions';

export default async function ImportPage() {
  const tags = await getTags()

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Import Transactions</h1>
      <TransactionsTable
        data={[]}
        tags={tags.allTags.map(tag => ({ ...tag, color: tag.color || '' }))}
      />
    </div>
  );
}