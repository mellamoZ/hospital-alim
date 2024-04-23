import { authOptions } from "@/lib/config/authOptions";
import { Card } from "@/components/ui/card";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function NewsPage() {
  const session: any = await getServerSession(authOptions);
  if (session && session.user) {
    if (
      session.user.role === "admin" ||
      session.user.role === "department_manager"
    ) {
      return (
        <div className="flex h-full flex-col items-center justify-center gap-5">
          <Link href="/dashboard/news/general">
            <Card className="border-2 p-4 duration-150 hover:bg-gray-100">
              <h1 className="text-5xl text-black/80">General News</h1>
            </Card>
          </Link>

          <Link href="/dashboard/news/clinical">
            <Card className="border-2 p-4 duration-150 hover:bg-gray-100">
              <h1 className="text-5xl text-black/80">Clinical News</h1>
            </Card>
          </Link>
        </div>
      );
    } else {
      redirect("/dashboard");
    }
  } else {
    redirect("/login");
  }
}
