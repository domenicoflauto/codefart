"use client"
import { useEffect, useState } from "react";

type snippet = {
  id: string;
  name: string;
  user: string;
  content: string;
  visibility: "private" | "public";
  createdAt: string;
} | undefined;


export default function AllSnippets({ snippets }: { snippets: snippet[] }) {
  const [snippetItems, setSnippetItems] = useState<snippet[]>(snippets!);

  useEffect(() => {
    setSnippetItems(snippets);
  }, [snippets]);

  const handleAddSnippet = (newSnippet: snippet) => {
    setSnippetItems([...snippetItems, newSnippet]);
  };

  return (
    <>
      <div className="w-full flex flex-col mt-8 gap-2">
        Snippets:
        {snippetItems.map((snippet) => (
          <div key={snippet?.id} className="flex flex-row justify-between items-center p-4 rounded-md">
            <div className="text-sm">{snippet?.content}</div>
            <div className="text-sm">{snippet?.createdAt}</div>
          </div>
        ))}
      </div>
    </>
  );
}