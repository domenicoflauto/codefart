"use client"
import { useEffect, useMemo, useState } from 'react';
import { CsvUploadButton } from '@/components/UploadButton';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { addTransactions } from './actions';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button';

export default function Home() {
  const [csvData, setCsvData] = useState<any[]>([]);
  const [selectedTag, setSelectedTag] = useState("all")

  const handleDataParsed = (data: any) => {
    setCsvData(data);
  }

  const handleSave = () => {
    addTransactions(csvData);
  }

  const handleTags = (value: string) => {
    setSelectedTag(value)
  }

  const filteredData = useMemo(() => {
    if (selectedTag === "all") {
      return csvData
    } else {
      return csvData.filter((item) => item.tags.includes(selectedTag))
    }
  }, [csvData, selectedTag])

  useEffect(() => {
    console.log("csvData", csvData)
  }, [csvData])

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
                <TableCell>{row["date"]}</TableCell>
                <TableCell>{row["description"]}</TableCell>
                <TableCell align='right'>{row["amount"]}</TableCell>
                <TableCell align='right'>
                  <Select onValueChange={(value) => {
                    const updatedData = [...csvData]
                    updatedData[index].tags = [value]
                    setCsvData(updatedData)
                  }}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Tags" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="groceries">Groceries</SelectItem>
                      <SelectItem value="eating_out">Eating Out</SelectItem>
                      <SelectItem value="subscriptions">Subscriptions</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            )))}
        </TableBody>
      </Table>
      {/* <pre>{JSON.stringify(csvData, null, 2)}</pre> */}
      <Button onClick={handleSave}>Save</Button>
    </main>
  );
}
