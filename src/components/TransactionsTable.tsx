"use client"

import { useEffect, useState } from 'react';

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
  const [csvData, setCsvData] = useState<any[]>([]);
  const [tagList, setTagList] = useState<tag[]>(tags)


  useEffect(() => {
    console.log("csvData", csvData)
    console.log("tags", tags)
    console.log("tagList", tagList)
  }, [csvData, tags, tagList])


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
  }

  const handleSave = () => {
    addTransactions(csvData);
  }

  return (
    <>
      <CsvUploadButton onDataParsed={handleDataParsed} />
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
          {
            data.length > 0 && (
              data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row["date"]}</TableCell>
                  <TableCell>{row["description"]}</TableCell>
                  <TableCell>
                    <TagsDropdown
                      currentTag={data[index].tags}
                      tags={tagList}
                      handleCreateAndSetTag={value => handleCreateAndSetTag(value, index)}
                      handleSetTag={value => handleSetTag(value, index)}
                    />
                  </TableCell>
                  <TableCell align='right'>{row["amount"]}</TableCell>
                </TableRow>
              )))}
        </TableBody>
      </Table>
      {/* <Button onClick={handleSave}>Save</Button> */}
    </>
  )
}