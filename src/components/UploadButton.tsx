"use client"

import { useRef } from "react";
import Papa from "papaparse";

import { Input } from "@/components/ui/input"

interface CsvUploadButtonProps {
  onDataParsed: (data: any) => void;
}

export function CsvUploadButton({ onDataParsed }: CsvUploadButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    Papa.parse(file, {
      header: true,
      complete: (result: { data: any; }) => {
        onDataParsed(result.data);
      },
    });
  }

  return (
    // <label className="block">
    //   <input
    //     ref={inputRef}
    //     type="file"
    //     className="hidden"
    //     onChange={handleFileChange}
    //   />
    //   <span className="btn" onClick={() => inputRef.current?.click()}>
    //     Upload CSV
    //   </span>
    // </label>
    <Input type="file" ref={inputRef} onChange={handleFileChange} />
  );
}