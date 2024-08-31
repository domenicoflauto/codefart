"use client"
import { deleteSnippet, createSnippet } from "@/app/actions";
import { useState } from "react";
import CreateSnippetForm from "@/components/CreateSnippetForm";
import { generateRandomString } from "@/utils";
import { useUmami } from 'next-umami'
import { Button } from "./ui/button";
import CodeExample from "./CodeExample";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  ChevronDownIcon,
  ChevronUpIcon,
  MoreVerticalIcon,
  TrashIcon
} from 'lucide-react'

type snippet = {
  userId: string | null;
  id: string;
  name: string;
  content: string;
  visibility: "private" | "public";
  createdAt: string;
  userName: string | null;
  language: string;
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
  const [expandedRow, setExpandedRow] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id)
  }

  const isAdmin = session?.user?.role === "admin"

  const addSnippetItem = (text: string, language: string) => {
    const id = generateRandomString(16)
    createSnippet(text, id, language);
    setSnippetItems((prev) => [...prev, {
      id,
      userId: session?.user?.id!,
      name: id,
      user: session?.user?.id!,
      content: text,
      language: "javascript",
      visibility: "public",
      createdAt: new Date().toISOString(),
      userName: session?.user?.name
    }]);
  }

  // Function to delete a todo item
  const deleteSnippetItem = (id: string) => {
    setSnippetItems((prev) => prev.filter((snippet) => snippet.id !== id));
    deleteSnippet(id);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="w-full flex flex-col mt-8 gap-2">
        {isAdmin && <CreateSnippetForm createSnippet={addSnippetItem} />}
      </div>
      <br />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Language</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {snippetItems.map((snippet) => (
            <>
              <TableRow key={snippet.id}>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpand(snippet.id)}
                    aria-label={expandedRow === snippet.id ? "Collapse" : "Expand"}
                  >
                    {expandedRow === snippet.id ? (
                      <ChevronUpIcon className="h-4 w-4" />
                    ) : (
                      <ChevronDownIcon className="h-4 w-4" />
                    )}
                  </Button>
                </TableCell>
                <TableCell>{snippet.userName}</TableCell>
                <TableCell>{snippet.createdAt}</TableCell>
                <TableCell>{snippet.name}</TableCell>
                <TableCell>{snippet.language}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVerticalIcon className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {isAdmin && (
                        <DropdownMenuItem onClick={e => deleteSnippetItem(snippet.id)}>
                          <TrashIcon className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>)
                      }
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
              {expandedRow === snippet.id && (
                <TableRow>
                  <TableCell colSpan={6} className="p-0">
                    <div className="p-4">
                      <CodeExample
                        code={snippet.content}
                        language={snippet.language}
                        fileName={`${snippet.name}.${snippet.visibility}`}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </>
          ))}
        </TableBody>
      </Table>
    </div>
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