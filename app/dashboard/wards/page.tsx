import { getWards } from "@/lib/db/wardCrud";
import WardTable from "./WardTable";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function WardsPage() {
  const wards = await getWards();
  const session: any = await getServerSession(authOptions);
  if (session && session.user) {
    if (
      session.user.role === "admin" ||
      session.user.role === "department_manager"
    ) {
      return <WardTable wards={wards} />;
    } else {
      redirect("/dashboard");
    }
  } else {
    redirect("/login");
  }
}
