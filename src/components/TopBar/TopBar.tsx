"use client"
import { useState } from "react";
import Link from "next/link";
import { LogOut, Settings, User, Crown } from 'lucide-react'

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ModeToggle } from "@/components/ModeToggle";


export function TopBar({ session, login, logout }:
  {
    session: any,
    login: () => void,
    logout: () => void
  }) {
  const [isLoggedIn, setIsLoggedIn] = useState(session)
  const [userName, setUserName] = useState(session?.user?.name)
  const [role, setRole] = useState(session?.user?.role)
  const [avatar, setAvatar] = useState(session?.user?.image)

  const initials = session?.user?.name?.split(" ").map((n: string) => n[0]).join("");

  const handleLogin = () => {
    login()
    session && (
      setIsLoggedIn(true),
      setUserName(session?.user?.name),
      setRole(session?.user?.role),
      setAvatar(session?.user?.image)
    )
  }

  const handleLogout = () => {
    logout()
    setIsLoggedIn(false)
    setUserName("")
    setRole("")
  }

  const isAdmin = role === "admin"
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
      <div className="container mx-auto py-2 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
            <line x1="9" y1="9" x2="9.01" y2="9" />
            <line x1="15" y1="9" x2="15.01" y2="9" />
          </svg>
          <span className="text-lg font-bold">Codefart</span>
        </Link>
        <div className="flex flex-row items-center gap-4">
          {isLoggedIn ? (
            <div className="flex flex-row items-center gap-4">
              {isAdmin && <Link href="/admin">Admin</Link>}
              < DropdownMenu >
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage src={avatar} alt="profile picture" />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem disabled>
                    {
                      isAdmin
                        ? <Crown className="mr-2 h-4 w-4" />
                        : <User className="mr-2 h-4 w-4" />
                    }
                    <span>Welcome, {userName}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Button onClick={handleLogin}>Log in</Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </header >
  )
}