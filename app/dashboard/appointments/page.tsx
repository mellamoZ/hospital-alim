import { getAppointments } from "@/lib/db/appointmentCrud";
import React from "react";
import AppointmentsTable from "./appointments-table";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/config/authOptions";

export default async function AppointmentsPage() {
  const appointments = await getAppointments();

  const session: any = await getServerSession(authOptions);
  if (session && session.user) {
    if (
      session.user.role === "admin" ||
      session.user.role === "appointment_manager"
    ) {
      return <AppointmentsTable appointments={appointments} />;
    } else {
      redirect("/dashboard");
    }
  } else {
    redirect("/login");
  }
}
