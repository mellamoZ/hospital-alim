import { getDoctors } from "@/lib/db/doctorCrud";
import DoctorTable from "./doctors-table";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/config/authOptions";

export default async function DoctorsPage() {
  const doctors = await getDoctors();
  const session: any = await getServerSession(authOptions);
  if (session && session.user) {
    if (
      session.user.role === "admin" ||
      session.user.role === "department_manager"
    ) {
      return <DoctorTable doctors={doctors} />;
    } else {
      redirect("/dashboard");
    }
  } else {
    redirect("/login");
  }
}
