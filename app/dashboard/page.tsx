import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session: any = await getServerSession(authOptions);
  if (session && session.user) {
    return (
      <div className="r flex min-h-screen flex-col items-center">
        <h1 className="mb-4 text-3xl font-bold">
          Welcome to the Dashboard {session.user.user_name}!
        </h1>
        <p className="mb-8 text-lg">Here is how to use the dashboard:</p>
        <div className="flex flex-col items-center">
          <p className="mb-2 text-lg">
            1. Click on the user icon on top-right corner to navigate your
            account.
          </p>
          <p className="mb-2 text-lg">
            2. Browse through different sections using the sidebar links.
          </p>
          <p className="mb-2 text-lg">
            3. To go back to this page, click on the logo or the Dashboard link
            in the sidebar.
          </p>
        </div>
      </div>
    );
  } else {
    redirect("/login");
  }
};

export default DashboardPage;
