"use client"

import { createSnippet } from "@/app/actions";
import { useState } from "react";

export default function CreateSnippetForm() {

  const [snippet, setSnippet] = useState<string>("");

  return (
    <div className="flex flex-col justify-center items-center">
      <input
        type="text"
        placeholder="Snippet content"
        value={snippet}
        onChange={(e) => setSnippet(e.target.value)}
        className="bg-[#f5f5f5] text-[#111111] px-2 py-1 rounded-md"
      />
      <button
        className="bg-[#111111] text-[#f5f5f5] px-2 py-1 rounded-md"
        onClick={async () => {
          await createSnippet(snippet)
        }}
      >
        Add </button>
    </div>
  );
}