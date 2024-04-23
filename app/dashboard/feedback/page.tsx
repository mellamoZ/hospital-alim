import React from "react";
import FeedbackTable from "./feedback-table";
import { getFeedbacks } from "@/lib/db/feedbackCrud";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/config/authOptions";
import { redirect } from "next/navigation";

export default async function AppointmentsPage() {
  const feedbacks = await getFeedbacks();

  const session: any = await getServerSession(authOptions);
  if (session && session.user) {
    if (
      session.user.role === "admin" ||
      session.user.role === "department_manager"
    ) {
      return <FeedbackTable feedbacks={feedbacks} />;
    } else {
      redirect("/dashboard");
    }
  } else {
    redirect("/login");
  }
}
