"use client"
import { useState } from 'react';
import { CsvUploadButton } from '@/components/UploadButton';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function Home() {
  const [csvData, setCsvData] = useState<any[]>([]);

  const handleDataParsed = (data: any) => {
    setCsvData(data);
  }
  return (
    <main className="w-full min-h-[calc(100vh-4rem)] flex flex-col">
      {/* <Flex direction="column" gap="4">
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
      </Flex> */}

      <CsvUploadButton onDataParsed={handleDataParsed} />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Amount(GBP)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {csvData.length > 0 && (
            csvData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row["Date"]}</TableCell>
                <TableCell>{row["Description"]}</TableCell>
                <TableCell align='right'>{row["Amount(GBP)"]}</TableCell>
              </TableRow>
            )))}
        </TableBody>
      </Table>
    </main>
  );
}
