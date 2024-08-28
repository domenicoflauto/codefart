"use client"
import { deleteSnippet } from "@/app/actions";
import { useEffect, useState } from "react";

type snippet = {
  id: string;
  name: string;
  user: string;
  content: string;
  visibility: "private" | "public";
  createdAt: string;
};

interface AllSnippetsProps {
  snippets: snippet[];
}

interface SnippetProps {
  snippet: snippet;
  deleteSnippet: (id: string) => void;
}


export default function AllSnippets({
  snippets,
}: AllSnippetsProps) {
  const [snippetItems, setSnippetItems] = useState<snippet[]>(snippets!);

  useEffect(() => {
    setSnippetItems(snippets);
  }, [snippets]);

  // const handleAddSnippet = (newSnippet: snippet) => {
  //   setSnippetItems([...snippetItems, newSnippet]);
  // };


  // Function to delete a todo item
  const deleteSnippetItem = (id: string) => {
    setSnippetItems((prev) => prev.filter((snippet) => snippet.id !== id));
    deleteSnippet(id);
  };

  return (
    <>
      <div className="w-full flex flex-col mt-8 gap-2">
        Snippets:
        {snippetItems.map((snippet) => (
          <Snippet key={snippet.id} snippet={snippet} deleteSnippet={deleteSnippetItem} />
        ))}
      </div>
    </>
  );
}

export function Snippet({
  snippet,
  deleteSnippet
}: SnippetProps) {

  // Event handler for deleting a todo item
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this todo?")) {
      deleteSnippet(snippet.id);
    }
  };

  return (
    <div key={snippet?.id} className="flex flex-row justify-between items-center p-4 rounded-md">
      <div className="text-sm">{snippet?.content}</div>
      <div className="text-sm">{snippet?.createdAt}</div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}