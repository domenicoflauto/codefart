"use client"

import { useState } from 'react';
import { useToast } from "@/hooks/use-toast"


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { TagsDropdown } from '@/components/TagsDropdown';
import { CsvUploadButton } from '@/components/UploadButton';
import { Button } from '@/components/ui/button';

import { createTag, addTransactions } from '@/app/actions';

type tag = {
  name: string;
}

export function TransactionsTable({
  data,
  tags,
}: {
  data: any[],
  tags: tag[],
}) {
  const { toast } = useToast()
  const [csvData, setCsvData] = useState<any[]>(data || []);
  const [tagList, setTagList] = useState<tag[]>(tags)

  const handleCreateAndSetTag = (value: string, index: number) => {
    createTag(value)
    const updatedTagList = [...tagList]
    setTagList([...updatedTagList, { name: value }])

    const updatedData = [...csvData]
    updatedData[index].tags = value

    setCsvData(updatedData)
  }

  const handleSetTag = (value: string, index: number) => {
    const updatedData = [...csvData]
    updatedData[index].tags = value

    setCsvData(updatedData)
  }

  const handleDataParsed = (data: any) => {
    setCsvData(data);
    toast({
      title: "CSV Imported",
      description: `${data.length} transactions loaded successfully.`,
    });
  }

  const handleSave = async () => {
    try {
      await addTransactions(csvData);
      toast({
        title: "Transactions Saved",
        description: "Your transactions have been successfully saved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save transactions. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="space-y-4">
      <CsvUploadButton onDataParsed={handleDataParsed} />
      <>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Tag</TableHead>
              <TableHead align='right'>Amount(GBP)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {csvData.length > 0 &&
              csvData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row["date"]}</TableCell>
                  <TableCell>{row["description"]}</TableCell>
                  <TableCell>
                    <TagsDropdown
                      currentTag={csvData[index].tags}
                      tags={tagList}
                      handleCreateAndSetTag={value => handleCreateAndSetTag(value, index)}
                      handleSetTag={value => handleSetTag(value, index)}
                    />
                  </TableCell>
                  <TableCell align='right'>{row["amount"]}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Button onClick={handleSave}>Save Transactions</Button>
      </>
    </div>
  )
}