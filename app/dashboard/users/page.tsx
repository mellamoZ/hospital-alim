import { getUsers } from "@/lib/db/userCrud";
import UsersTable from "./users-table";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/config/authOptions";

const Users = async () => {
  const users = await getUsers();

  const session: any = await getServerSession(authOptions);
  if (session && session.user) {
    if (session.user.role === "admin") {
      return <UsersTable users={users} />;
    } else {
      redirect("/dashboard");
    }
  } else {
    redirect("/login");
  }
};

export default Users;
