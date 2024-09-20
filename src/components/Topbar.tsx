"use client"

import { ModeToggle } from "@/components/ModeToggle";
import { Logo } from "@/components/Logo";
import Link from 'next/link';
import { logout } from "@/app/actions";
import { Button, buttonVariants } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function TopBar({ user }: { user: any }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
      <div className="container mx-auto py-2 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Logo />
          <span className="text-lg font-bold">Codefart</span>
        </Link>
        <div className="flex flex-row items-center gap-4">
          <ModeToggle />
          {user.user &&
            <div className="flex flex-row items-center justify-center gap-2">
              <Avatar>
                <AvatarImage src={user.user.avatar} alt={user.user.username} />
                <AvatarFallback>
                  {user.user.username[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <form action={logout}>
                <Button>
                  Logout
                </Button>
              </form>
            </div>
          }
          <div className="flex flex-row gap-1">
            {!user.user &&
              <Link className={buttonVariants({ variant: "outline" })} href="/login">
                Login
              </Link>
            }
            {!user.user &&
              <Link className={buttonVariants({ variant: "outline" })} href="/signup">
                Sign up
              </Link>
            }
          </div>
        </div>
      </div>
    </header >
  )
}