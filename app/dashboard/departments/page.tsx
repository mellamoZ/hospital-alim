import { getDepartments } from "@/lib/db/departmentCrud";
import DepartmentsTable from "./departments-table";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/config/authOptions";
import { redirect } from "next/navigation";

const Departments = async () => {
  const departments = await getDepartments();

  const session: any = await getServerSession(authOptions);

  if (session && session.user) {
    if (
      session.user.role === "admin" ||
      session.user.role === "department_manager"
    ) {
      return <DepartmentsTable departments={departments} />;
    } else {
      redirect("/dashboard");
    }
  } else {
    redirect("/login");
  }
};

export default Departments;
