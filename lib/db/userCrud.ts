"use server";
import prisma from "@/lib/prisma";
import { user as User } from "@prisma/client";
import { PartialBy } from "../type";
import { userFormSchemaWithoutConfirm } from "../formSchemas";

export const createUser = async (
  userData: PartialBy<User, "user_id" | "create_at">
): Promise<User | { message: string; issues: string[] }> => {
  const parsed = await userFormSchemaWithoutConfirm.safeParseAsync(userData);

  if (!parsed.success) {
    return {
      message: "Invalid user data",
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }

  try {
    return await prisma.user.create({
      data: userData,
    });
  } catch (error) {
    throw new Error("Failed to create user");
  }
};

export const getUser = async (
  email: string,
  password: string
): Promise<User | null> => {
  try {
    return await prisma.user.findFirst({
      where: {
        email: email,
        password: password,
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
};

export const getUsers = async (): Promise<User[]> => {
  try {
    return await prisma.user.findMany();
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
};

export const updateUser = async (
  userId: number,
  updatedData: Partial<User>
) => {
  try {
    return await prisma.user.update({
      where: { user_id: userId },
      data: updatedData,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
};

export const deleteUser = async (id: number) => {
  try {
    return await prisma.user.delete({
      where: { user_id: id },
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user");
  }
};
