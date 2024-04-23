"use server";
import prisma from "@/lib/prisma";
import { department as Department } from "@prisma/client";
import { PartialBy } from "../type";
import { departmentFormSchema } from "../formSchemas";

export const createDepartment = async (
  departmentData: PartialBy<Department, "department_id">
): Promise<Department | { message: string; issues: string[] }> => {
  const parsed = departmentFormSchema.safeParse(departmentData);

  if (!parsed.success) {
    return {
      message: "Invalid department data",
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }

  try {
    return await prisma.department.create({
      data: parsed.data,
    });
  } catch (error) {
    throw new Error(`Failed to create department: ${error}`);
  }
};

export const getDepartments = async (): Promise<Department[]> => {
  try {
    return await prisma.department.findMany({});
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw new Error("Failed to fetch departments");
  }
};

export const getDepartmentNames = async (): Promise<
  Pick<Department, "department_name" | "department_id">[]
> => {
  try {
    return await prisma.department.findMany({
      select: {
        department_id: true,
        department_name: true,
      },
    });
  } catch (error) {
    throw new Error(`Failed to fetch departments: ${error}`);
  }
};

export const updateDepartment = async (
  departmentId: number,
  updatedData: Partial<Department>
) => {
  try {
    await prisma.department.update({
      where: { department_id: departmentId },
      data: updatedData,
    });
  } catch (error) {
    console.error("Error updating department:", error);
    throw new Error("Failed to update department");
  }
};

export const deleteDepartment = async (id: number) => {
  try {
    // Nullify department_id in related records
    await Promise.all([
      prisma.user.updateMany({
        where: { department_id: id },
        data: { department_id: null },
      }),
      prisma.doctor.updateMany({
        where: { department_id: id },
        data: { department_id: null },
      }),
      prisma.ward.updateMany({
        where: { department_id: id },
        data: { department_id: null },
      }),
    ]);

    // Delete department
    await prisma.department.delete({
      where: { department_id: id },
    });
  } catch (error) {
    throw new Error("Failed to delete department");
  }
};
