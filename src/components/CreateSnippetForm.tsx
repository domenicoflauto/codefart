"use client"

import { useState, ChangeEvent } from "react";
import { useUmami } from 'next-umami'
import { Button } from "./ui/button";
import { Textarea } from "@/components/ui/textarea"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


type CreateSnippetFormProps = {
  createSnippet: (text: string, language: string) => void;
};

export default function CreateSnippetForm({ createSnippet }: CreateSnippetFormProps) {
  const [snippetValue, setSnippetValue] = useState<string>("");
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
      <div className="flex flex-row gap-2">

        <Select onOpenChange={handleOpenChange} onValueChange={handleLanguageChange} defaultValue="javascript">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="javascript">Javascript</SelectItem>
            <SelectItem value="html">HTML</SelectItem>
            <SelectItem value="css">CSS</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={handleCreateSnippet}>Add</Button>
      </div>
    </div>
  );
}