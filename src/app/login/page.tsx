"use server"

import { buttonVariants } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import Link from "next/link";

export default async function Page() {
  return (
    <div className="flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <form>
          <CardContent>

          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Link className={`${buttonVariants({ variant: "outline", size: "lg" })} w-full`} href="/login/github">
              Sign in with GitHub
            </Link>
            <Link className={`${buttonVariants({ variant: "outline", size: "lg" })} w-full`} href="/login/google">
              Sign in with Google
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
