"use server";

import prisma from "./prisma";

export const isUsernameAvailable = async (
  username: string
): Promise<boolean> => {
  const user = await prisma.user.findUnique({
    where: { user_name: username },
  });

  // if user exists, return false
  if (user) {
    return false;
  }
  return true;
};

export const isEmailAvailable = async (email: string): Promise<boolean> => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  // if email exists, return false
  if (user) {
    return false;
  }
  return true;
};

export const isEmailAvailableInDoctorDb = async (
  email: string
): Promise<boolean> => {
  const doctor = await prisma.doctor.findUnique({
    where: { email },
  });

  // if email exists, return false
  if (doctor) {
    return false;
  }
  return true;
};
