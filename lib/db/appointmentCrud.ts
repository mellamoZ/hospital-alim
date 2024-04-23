"use server";

import prisma from "@/lib/prisma";
import { appointment as Appointment } from "@prisma/client";
import { subDays } from "date-fns";
import { appointmentFormSchema } from "../formSchemas";

export const createAppointment = async (
  appointmentData: Pick<
    Appointment,
    "full_name" | "phone_number" | "appointment_reason"
  >
): Promise<Appointment | { message: string; issues: string[] }> => {
  const parsed = await appointmentFormSchema.safeParse(appointmentData);

  if (!parsed.success) {
    return {
      message: "Invalid appointment data",
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }

  try {
    return await prisma.appointment.create({
      data: appointmentData,
    });
  } catch (error) {
    throw new Error("Failed to create appointment");
  }
};

export const getAppointments = async (): Promise<Appointment[]> => {
  try {
    return await prisma.appointment.findMany();
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw new Error("Failed to fetch appointments");
  }
};

export const getRecentAppointments = async (): Promise<Appointment[]> => {
  const threeDaysAgo = subDays(new Date(), 3);
  try {
    return await prisma.appointment.findMany({
      where: {
        created_at: {
          gte: threeDaysAgo,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching Recent appointments:", error);
    throw new Error("Failed to fetch Recent appointments");
  }
};

export const updateAppointment = async (
  appointmentId: number,
  updatedData: Partial<Appointment>
) => {
  try {
    return await prisma.appointment.update({
      where: { appointment_id: appointmentId },
      data: updatedData,
    });
  } catch (error) {
    console.error("Error updating appointment:", error);
    throw new Error("Failed to update appointment");
  }
};

export const deleteAppointment = async (id: number) => {
  try {
    return await prisma.appointment.delete({
      where: { appointment_id: id },
    });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    throw new Error("Failed to delete appointment");
  }
};
