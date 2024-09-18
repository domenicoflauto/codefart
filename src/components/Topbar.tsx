"use client"

import { ModeToggle } from "@/components/ModeToggle";
import { Logo } from "@/components/Logo";
import Link from 'next/link';

export function TopBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
      <div className="container mx-auto py-2 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Logo />
          <span className="text-lg font-bold">Codefart</span>
        </Link>
        <div className="flex flex-row items-center gap-4">
          <ModeToggle />
        </div>
      </div>
    </header >
  )
}