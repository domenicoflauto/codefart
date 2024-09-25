"use client"

import { useState } from "react"
import { CirclePicker } from 'react-color'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { removeTag } from "@/app/actions"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { updateTagColor } from "@/app/actions"

export function TagsManagement({ tags }: { tags: any }) {
  const [tagList, setTagList] = useState(tags)

  function handleChangeColor(tagName: string, color: string) {
    const newTagList = tagList.map((tag: any) => {
      if (tag.name === tagName) {
        return { ...tag, color }
      }
      return tag
    })
    setTagList(newTagList)
    updateTagColor(tagName, color)
  }

  function handleRemoveTag(tagName: string) {
    const newTagList = tagList.filter((tag: any) => tag.name !== tagName)
    setTagList(newTagList)
    removeTag(tagName)
  }

  return (
    <div>
      <h1 className="text-xl font-bold">Tags Management</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Color</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tagList.map((tag: any, id: number) => (
            <TableRow key={`${id}-${tag.name}`}>
              <TableCell>{id + 1}. {tag.name}</TableCell>
              <TableCell>
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: tag.color }}
                    />
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <CirclePicker color={tag.color ? tag.color : "#000000"} onChange={(color: any) => {
                      handleChangeColor(tag.name, color.hex)
                    }} />
                  </PopoverContent>
                </Popover>
              </TableCell>
              <TableCell>
                <Button onClick={() => handleRemoveTag(tag.name)}>Remove</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
