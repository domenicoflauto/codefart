
import { TransactionsTable } from '@/components/TransactionsTable';

import { Button } from '@/components/ui/button';

import { addTransactions, getTags } from '@/app/actions';


export default async function Home() {

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

  // const handleSave = () => {
  //   addTransactions(csvData);
  // }

  return (
    <main className="w-full min-h-[calc(100vh-4rem)] flex flex-col">
      <TransactionsTable
        data={MOCK_DATA}
        tags={tags.allTags}
      />

      {/* <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Tag</TableHead>
            <TableHead align='right'>Amount(GBP)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {csvData.length > 0 && (
            csvData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row["date"]}</TableCell>
                <TableCell>{row["description"]}</TableCell>
                <TableCell>
                  <TagsDropdown
                    currentTag={csvData[index].tags}
                    tags={tags}
                    handleCreateAndSetTag={value => handleCreateAndSetTag(value, index)}
                    handleSetTag={value => handleSetTag(value, index)}
                  />
                </TableCell>
                <TableCell align='right'>{row["amount"]}</TableCell>


              </TableRow>
            )))}
        </TableBody>
      </Table> */}

      {/* <Button onClick={handleSave}>Save</Button> */}
    </main>
  );
}
