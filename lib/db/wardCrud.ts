"use server";

import prisma from "@/lib/prisma";
import { ward as Ward } from "@prisma/client";
import { PartialBy } from "../type";
import { wardFormSchema } from "../formSchemas";

export const createWard = async (
  wardData: PartialBy<Ward, "ward_id" | "department_id">
): Promise<Ward | { message: string; issues: string[] }> => {
  const parsed = wardFormSchema.safeParse(wardData);

  if (!parsed.success) {
    return {
      message: "Invalid ward data",
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }

  try {
    return await prisma.ward.create({
      data: wardData,
    });
  } catch (error) {
    throw new Error("Failed to create ward");
  }
};

export const getWards = async (): Promise<Ward[]> => {
  try {
    return await prisma.ward.findMany();
  } catch (error) {
    console.error("Error fetching wards:", error);
    throw new Error("Failed to fetch wards");
  }
};

export const updateWard = async (
  wardId: number,
  updatedData: Partial<Ward>
) => {
  try {
    return await prisma.ward.update({
      where: { ward_id: wardId },
      data: updatedData,
    });
  } catch (error) {
    console.error("Error updating ward:", error);
    throw new Error("Failed to update ward");
  }
};

export const deleteWard = async (id: number) => {
  try {
    return await prisma.ward.delete({
      where: { ward_id: id },
    });
  } catch (error) {
    console.error("Error deleting ward:", error);
    throw new Error("Failed to delete ward");
  }
};
