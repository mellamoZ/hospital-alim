import React from "react";
import { getUsers } from "@/lib/db/userCrud";
import { getDepartments } from "@/lib/db/departmentCrud";
import { getDoctors } from "@/lib/db/doctorCrud";
import { getWards } from "@/lib/db/wardCrud";
import { getRecentAppointments } from "@/lib/db/appointmentCrud";
import { getRecentFeedbacks } from "@/lib/db/feedbackCrud";
import AnalyticsInfo from "./AnalyticsInfo";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/config/authOptions";
const AnalyticsPage = async () => {
  const usersData = (await getUsers()).length;
  const departmentsData = (await getDepartments()).length;
  const wardsData = (await getWards()).length;
  const doctorsData = (await getDoctors()).length;
  const RecentappointmentsData = await getRecentAppointments();
  const RecentfeedbacksData = await getRecentFeedbacks();

  const session: any = await getServerSession(authOptions);
  if (session && session.user) {
    if (session.user.role === "admin") {
      return (
        <AnalyticsInfo
          totalUsers={usersData}
          totalWards={wardsData}
          recentAppointments={RecentappointmentsData}
          recentFeedbacks={RecentfeedbacksData}
          totalDepartments={departmentsData}
          totalDoctors={doctorsData}
        />
      );
    } else {
      redirect("/dashboard");
    }
  } else {
    redirect("/login");
  }
};

export default AnalyticsPage;
