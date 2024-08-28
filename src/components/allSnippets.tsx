"use client"
import { deleteSnippet, createSnippet } from "@/app/actions";
import { useState } from "react";
import CreateSnippetForm from "@/components/CreateSnippetForm";
import { generateRandomString } from "@/utils";
import { useUmami } from 'next-umami'

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
  session: any;
}

interface SnippetProps {
  snippet: snippet;
  deleteSnippet: (id: string) => void;
  isAdmin: boolean;
}

export default function AllSnippets({
  snippets,
  session
}: AllSnippetsProps) {
  const [snippetItems, setSnippetItems] = useState<snippet[]>(snippets!);

  const isAdmin = session?.user?.role === "admin"

  const addSnippetItem = (text: string) => {
    const id = generateRandomString(16)
    createSnippet(text, id);
    setSnippetItems((prev) => [...prev, {
      id,
      name: id,
      user: session?.user?.id!,
      content: text,
      visibility: "public",
      createdAt: new Date().toISOString()
    }]);
  }

  // Function to delete a todo item
  const deleteSnippetItem = (id: string) => {
    setSnippetItems((prev) => prev.filter((snippet) => snippet.id !== id));
    deleteSnippet(id);
  };

  return (
    <>
      <div className="w-full flex flex-col mt-8 gap-2">
        {isAdmin && <CreateSnippetForm createSnippet={addSnippetItem} />}
        Snippets:
        {snippetItems.map((snippet) => (
          <Snippet isAdmin={isAdmin} key={snippet.id} snippet={snippet} deleteSnippet={deleteSnippetItem} />
        ))}
      </div>
    </>
  );
}

export function Snippet({
  snippet,
  deleteSnippet,
  isAdmin
}: SnippetProps) {
  const umami = useUmami()

  // Event handler for deleting a todo item
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this todo?")) {
      deleteSnippet(snippet.id);
    }
    umami.event('Delete snippet')
  };

  return (
    <div key={snippet?.id} className="flex flex-row justify-between items-center p-4 rounded-md">
      <div className="text-sm">{snippet?.content}</div>
      <div className="text-sm">{snippet?.createdAt}</div>
      {isAdmin && <button onClick={handleDelete}>Delete</button>}
    </div>
  )
}