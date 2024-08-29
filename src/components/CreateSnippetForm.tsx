"use client"

import { useState, ChangeEvent } from "react";
import { useUmami } from 'next-umami'
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type CreateSnippetFormProps = {
  createSnippet: (text: string) => void;
};

export default function CreateSnippetForm({ createSnippet }: CreateSnippetFormProps) {
  const [snippetValue, setSnippetValue] = useState<string>("");
  const umami = useUmami()

  // Event handler for input change
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    umami.event('Click Add', {
      userAgent: window.navigator.userAgent,
    })
    setSnippetValue(e.target.value);
  };

  const handleCreateSnippet = async () => {
    // find a better way to refresh the list
    // window.location.reload();
    createSnippet(snippetValue);
    setSnippetValue("");
  }

  return (
    <div className="flex flex-row justify-center items-center gap-2">
      <Input
        placeholder="Snippet content"
        value={snippetValue}
        onChange={handleInput}
      />
      <Button onClick={handleCreateSnippet}>Add</Button>
    </div>
  );
}