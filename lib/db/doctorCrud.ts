"use server";

import prisma from "@/lib/prisma";
import { doctor as Doctor } from "@prisma/client";
import { PartialBy } from "../type";
import { doctorFormSchema } from "../formSchemas";

export const createDoctor = async (
  doctorData: PartialBy<Doctor, "doctor_id" | "create_at" | "department_id">
): Promise<Doctor | { message: string; issues: string[] }> => {
  const parsed = await doctorFormSchema.safeParseAsync(doctorData);

  if (!parsed.success) {
    return {
      message: "Invalid doctor data",
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }

  try {
    return await prisma.doctor.create({
      data: doctorData,
    });
  } catch (error) {
    throw new Error("Failed to create doctor");
  }
};

export const getDoctors = async (): Promise<Doctor[]> => {
  try {
    return await prisma.doctor.findMany();
  } catch (error) {
    console.error("Error fetching doctors:", error);
    throw new Error("Failed to fetch doctors");
  }
};

export const getDoctor = async (id: number): Promise<Doctor | null> => {
  try {
    return await prisma.doctor.findUnique({
      where: { doctor_id: id },
    });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    throw new Error("Failed to fetch doctors");
  }
};

interface DoctorsByDepartmentType {
  department_id: number;
  department_name: string;
  doctor: {
    doctor_id: number;
    doctor_name: string;
    specialization: string;
    description: string;
    photo_url: string;
  }[];
}
export const getDoctorsByDepartment = async (): Promise<
  DoctorsByDepartmentType[]
> => {
  try {
    return await prisma.department.findMany({
      select: {
        department_id: true,
        department_name: true,
        doctor: {
          select: {
            doctor_id: true,
            doctor_name: true,
            specialization: true,
            description: true,
            photo_url: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    throw new Error("Failed to fetch doctors");
  }
};

export const updateDoctor = async (
  doctorId: number,
  updatedData: Partial<Doctor>
) => {
  try {
    return await prisma.doctor.update({
      where: { doctor_id: doctorId },
      data: updatedData,
    });
  } catch (error) {
    console.error("Error updating doctor:", error);
    throw new Error("Failed to update doctor");
  }
};

export const deleteDoctor = async (id: number) => {
  try {
    return await prisma.doctor.delete({
      where: { doctor_id: id },
    });
  } catch (error) {
    console.error("Error deleting doctor:", error);
    throw new Error("Failed to delete doctor");
  }
};
