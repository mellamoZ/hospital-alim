import { authOptions } from "@/lib/config/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session: any = await getServerSession(authOptions);
  if (session && session.user) {
    redirect("/dashboard");
  } else {
    redirect("/api/auth/signin");
  }
};

export default LoginPage;
