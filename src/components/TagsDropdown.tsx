"use client"
import { useEffect, useState } from 'react';

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type tag = {
  name: string;
  color: string;
}

export function TagsDropdown({ tags, handleCreateAndSetTag, currentTag, handleSetTag }: {
  tags: tag[] | null,
  handleCreateAndSetTag: (tag: string) => void,
  handleSetTag: (tag: string) => void,
  currentTag: string
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredOptions, setFilteredOptions] = useState(tags)

  useEffect(() => {
    if (tags) {
      setFilteredOptions(tags.filter((tag) => tag.name.toLowerCase().includes(searchTerm.toLowerCase())))
    }
  }, [searchTerm, tags])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Badge
          variant="secondary"
          className="cursor-pointer hover:bg-secondary/80"
          style={{ backgroundColor: tags?.find(tag => tag.name === currentTag)?.color }}
        >
          {currentTag || 'No tag'}
        </Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <Input
          placeholder="Search options..."
          className="h-8 flex-1 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {filteredOptions?.map((option) => (
          <DropdownMenuItem
            key={option.name}
            className="flex items-center gap-2"
            onClick={() => {
              handleSetTag(option.name)
              setSearchTerm('')
            }}
          >
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: option.color }}
            />
            {option.name}
          </DropdownMenuItem>
        ))}
        {filteredOptions?.length === 0 && (
          <DropdownMenuItem
            key="create"
            onClick={() => {
              // const updatedData = [...csvData]
              // updatedData[index].tags = searchTerm
              handleCreateAndSetTag(searchTerm)
              // setSelectedOption(searchTerm)
              setSearchTerm('')
            }}
          >
            Create {searchTerm}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}