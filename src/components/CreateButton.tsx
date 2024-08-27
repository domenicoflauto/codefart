"use client"

import { createSnippet } from "@/app/actions";

export default function CreateButton() {
  return (
    <button
      className="bg-[#111111] text-[#f5f5f5] px-2 py-1 rounded-md"
      onClick={async () => {
        await createSnippet()
      }}
    >
      Add </button>
  );
}