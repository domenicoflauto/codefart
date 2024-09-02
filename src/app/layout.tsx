import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css";
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { TopBar } from "@/components/TopBar";
import { auth, signIn, signOut } from "@/auth";

import UmamiProvider from 'next-umami'

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
export const metadata: Metadata = {
  title: "Codefart",
  description: "Homepage of experiments, trash, etc.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth()
  const handleLogin = async () => {
    "use server"
    await signIn()
  }

  const handleLogout = async () => {
    "use server"
    await signOut()
  }

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
          <TopBar
            session={session}
            login={handleLogin}
            logout={handleLogout}
          />
          <div className="container py-16">
            {children}
          </div>
        </Theme>
      </body>
      <Analytics />
    </html>
  );
}
