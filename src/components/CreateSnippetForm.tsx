"use client"

import { createSnippet } from "@/app/actions";
import { useState } from "react";

import { snippet } from "@/types/snippetType";

export default function CreateSnippetForm() {

  const [snippetValue, setSnippetValue] = useState<string>("");

  const handleCreateSnippet = async () => {
    const snippet = await createSnippet(snippetValue);
    // find a better way to refresh the list
    window.location.reload();
    setSnippetValue("");
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <input
        type="text"
        placeholder="Snippet content"
        value={snippetValue}
        onChange={(e) => setSnippetValue(e.target.value)}
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