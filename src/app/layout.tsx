import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css";
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

import UmamiProvider from 'next-umami'

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
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
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Theme accentColor="amber" grayColor="sand" radius="large" appearance="dark" >
          {children}
        </Theme>
      </body>
      <Analytics />
    </html>
  );
}
