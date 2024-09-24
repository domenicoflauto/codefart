"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Papa from 'papaparse';

export function CsvUploadButton({ onDataParsed }: { onDataParsed: (data: any[]) => void }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsLoading(true);
      Papa.parse(file, {
        complete: (results) => {
          onDataParsed(results.data);
          setIsLoading(false);
        },
        transformHeader: (header) => {
          // Transform the header "Amount(GBP)" to "amount"
          if (header === 'Amount(GBP)') {
            return 'amount';
          }
          if (header === 'Description') {
            return 'description';
          }
          if (header === 'Date') {
            return 'date';
          }
          return header;
        },
        header: true,
        skipEmptyLines: true,
      });
    }
  };

  return (
    <Button asChild>
      <label>
        {isLoading ? 'Parsing CSV...' : 'Upload CSV'}
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="hidden"
        />
      </label>
    </Button>
  );
}