"use client"

import { useState, ChangeEvent } from "react";

type CreateSnippetFormProps = {
  createSnippet: (text: string) => void;
};

export default function CreateSnippetForm({ createSnippet }: CreateSnippetFormProps) {

  const [snippetValue, setSnippetValue] = useState<string>("");

  // Event handler for input change
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSnippetValue(e.target.value);
  };

  const handleCreateSnippet = async () => {
    // find a better way to refresh the list
    // window.location.reload();
    createSnippet(snippetValue);
    setSnippetValue("");
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <input
        type="text"
        placeholder="Snippet content"
        value={snippetValue}
        onChange={handleInput}
        className="bg-[#f5f5f5] text-[#111111] px-2 py-1 rounded-md"
      />
      <button
        className="bg-[#111111] text-[#f5f5f5] px-2 py-1 rounded-md"
        onClick={handleCreateSnippet}
      >
        Add </button>
    </div>
  );
}