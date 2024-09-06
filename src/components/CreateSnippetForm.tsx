"use client"

import { useState, ChangeEvent } from "react";
import { useUmami } from 'next-umami'
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { Button } from "./ui/button";
import { Textarea } from "@/components/ui/textarea"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


type CreateSnippetFormProps = {
  createSnippet: (text: string, language: string) => void;
};

export default function CreateSnippetForm({ createSnippet }: CreateSnippetFormProps) {
  const [snippetValue, setSnippetValue] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [language, setLanguage] = useState<string>("");
  const umami = useUmami()

  // Event handler for input change
  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    umami.event('Click Add', {
      userAgent: window.navigator.userAgent,
    })
    setSnippetValue(e.target.value);
  };

  const handleCreateSnippet = async () => {
    // find a better way to refresh the list
    // window.location.reload();
    createSnippet(snippetValue, language);
    setSnippetValue("");
  }

  const handleLanguageChange = (value: string) => {
    setLanguage(value)
    console.log('language', language)
  }

  const handleOpenChange = (open: boolean) => {
    console.log('open', open)
  }

  return (
    <div className="flex flex-col justify-center items-end gap-2">
      <Textarea
        placeholder="Snippet content"
        value={snippetValue}
        onChange={handleInput}
      />
      <div className="flex md:flex-row gap-2 flex-col w-full">

        <Select onOpenChange={handleOpenChange} onValueChange={handleLanguageChange} defaultValue="javascript">
          <SelectTrigger className="md:w-[180px] sm:w-full">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="javascript">Javascript</SelectItem>
            <SelectItem value="html">HTML</SelectItem>
            <SelectItem value="css">CSS</SelectItem>
          </SelectContent>
        </Select>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "md:w-[280px] sm:w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Button onClick={handleCreateSnippet}>Add</Button>
      </div>
    </div>
  );
}