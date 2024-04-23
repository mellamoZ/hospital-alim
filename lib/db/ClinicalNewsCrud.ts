"use server";

import prisma from "@/lib/prisma";
import { clinical_news as ClinicalNews } from "@prisma/client";
import { PartialBy } from "../type";

export const getClinicalNews = async (): Promise<ClinicalNews[]> => {
  try {
    return await prisma.clinical_news.findMany();
  } catch (error) {
    console.error("Error fetching Clinical News:", error);
    throw new Error("Failed to fetch Clinical News");
  }
};

export const getSingleNewsPost = async (
  id: number
): Promise<ClinicalNews | null> => {
  try {
    return await prisma.clinical_news.findUnique({
      where: { clinical_news_id: id },
    });
  } catch (error) {
    console.error("Error fetching Clinical News:", error);
    throw new Error("Failed to fetch Clinical News");
  }
};

export const createClinicalNewsPost = async (
  clinical_news_data: PartialBy<
    ClinicalNews,
    "clinical_news_id" | "date" | "image"
  >
) => {
  try {
    return await prisma.clinical_news.create({
      data: clinical_news_data,
    });
  } catch (error) {
    console.error("Error creating Clinical News:", error);
    throw new Error("Failed to create Clinical News");
  }
};

export const deleteClinicalNewsPost = async (id: number) => {
  try {
    return await prisma.clinical_news.delete({
      where: { clinical_news_id: id },
    });
  } catch (error) {
    console.error("Error deleting Clinical News:", error);
    throw new Error("Failed to delete Clinical News");
  }
};
