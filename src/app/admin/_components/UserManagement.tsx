"use client"

import { useState } from "react"
import { updateUserRole } from "../actions"

import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"

export function UserManagement({ users, you }:
  { users: any, you: string }) {
  const [userList, setUserList] = useState(users)

  function handleClick(user: any) {
    updateUserRole(user.id, user.role === "admin" ? "user" : "admin")
    setUserList(userList.map((u: any) => {
      if (u.id === user.id) {
        return { ...u, role: user.role === "admin" ? "user" : "admin" }
      }
      return u
    }
    ))
  }

  return (
    <div>
      <h1 className="text-xl font-bold">User Management</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead className="hidden md:table-cell">User ID</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userList.map((user: any, index: number) => (
            <TableRow key={index}>
              <TableCell>
                {user.username} {user.id === you ? " (you)" : ""}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {user.id}
              </TableCell>
              <TableCell>
                <Badge variant="secondary">{user.role}</Badge>
              </TableCell>
              <TableCell>
                <Button variant="ghost" onClick={() => handleClick(user)}>
                  {user.role === "admin" ? "Demote" : "Promote"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}