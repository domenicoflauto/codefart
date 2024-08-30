"use client"
import Prism from '@uiw/react-prismjs'
import '@uiw/react-prismjs/dist.css'

import { useEffect, useState } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { CheckIcon, CopyIcon, EyeIcon, EyeOffIcon } from 'lucide-react'

interface CodeExampleProps {
  code: string
  language: string
  fileName?: string
}

export default function CodeExample({ code, language, fileName }:
  CodeExampleProps) {
  const [copied, setCopied] = useState(false)
  const [showPreview, setShowPreview] = useState(true)
  const [iframeContent, setIframeContent] = useState('')

  useEffect(() => {
    if (language === 'html') {
      setIframeContent(code)
    } else if (language === 'css') {
      setIframeContent(`<style>${code}</style>`)
    } else if (language === 'javascript') {
      setIframeContent(`<script>${code}</script>`)
    }
  }, [code, language])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <Card className="w-full max-w-5xl overflow-hidden">
      {fileName && (
        <div className="bg-muted px-4 py-2 border-b text-sm font-mono text-muted-foreground flex justify-between items-center">
          <span>{fileName}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowPreview(!showPreview)}
            className="md:hidden"
            aria-label={showPreview ? "Hide preview" : "Show preview"}
          >
            {showPreview ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
          </Button>
        </div>
      )}
      <div className="flex flex-col md:flex-row">
        <div className="relative flex-1">
          <Prism
            language={language}
            className="p-4 text-sm overflow-x-auto"
          >
            {code}
          </Prism>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-2 right-2"
            onClick={copyToClipboard}
            aria-label={copied ? "Copied" : "Copy code to clipboard"}
          >
            {copied ? (
              <CheckIcon className="h-4 w-4 text-green-500" />
            ) : (
              <CopyIcon className="h-4 w-4" />
            )}
          </Button>
        </div>
        {(showPreview || window.innerWidth >= 768) && (
          <div className="flex-1 border-t md:border-t-0 md:border-l">
            <div className="p-4 h-full">
              <h3 className="text-sm font-semibold mb-2">Preview</h3>
              <div className="border rounded-md overflow-hidden h-[calc(100%-2rem)]">
                <iframe
                  srcDoc={iframeContent}
                  title="Code Preview"
                  className="w-full h-full"
                  sandbox="allow-scripts"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};