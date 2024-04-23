"use server";
import prisma from "@/lib/prisma";
import { feedback as Feedback } from "@prisma/client";
import { PartialBy } from "../type";
import { feedbackFormSchema } from "../formSchemas";

export const createFeedback = async (
  feedbackData: PartialBy<Feedback, "feedback_id">
): Promise<Feedback | { message: string; issues: string[] }> => {
  const parsed = feedbackFormSchema.safeParse(feedbackData);

  if (!parsed.success) {
    return {
      message: "Invalid feedback data",
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }
  try {
    return await prisma.feedback.create({
      data: feedbackData,
    });
  } catch (error) {
    throw new Error("Failed to create feedback");
  }
};

export const getFeedbacks = async (): Promise<Feedback[]> => {
  try {
    return await prisma.feedback.findMany();
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    throw new Error("Failed to fetch feedbacks");
  }
};

export const getRecentFeedbacks = async (): Promise<Feedback[]> => {
  try {
    return await prisma.feedback.findMany({
      take: 5,
      orderBy: {
        feedback_id: "desc",
      },
    });
  } catch (error) {
    console.error("Error fetching Recent appointments:", error);
    throw new Error("Failed to fetch Recent appointments");
  }
};

export const deleteFeedback = async (id: number) => {
  try {
    await prisma.feedback.delete({
      where: { feedback_id: id },
    });
  } catch (error) {
    throw new Error("Failed to delete feedback");
  }
};
