"use server"

import { signup } from "./actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export default async function Page() {
  return (
    <div className="flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>Create an account</CardDescription>
        </CardHeader>
        <form action={signup}>
          <CardContent>
            <Label htmlFor="username">Username</Label>
            <Input name="username" id="username" />
            <Label htmlFor="password">Password</Label>
            <Input type="password" name="password" id="password" />
          </CardContent>
          <CardFooter>
            <Button className="w-full">Continue</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
