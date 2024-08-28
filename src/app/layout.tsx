import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"
import "./globals.css";

import UmamiProvider from 'next-umami'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Codefart",
  description: "Homepage of experiments, trash, etc.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <UmamiProvider websiteId="30922084-df7f-48c8-a600-55fad18ed1f1" />
      </head>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className={inter.className}>{children}</body>
      <Analytics />
    </html>
  );
}
