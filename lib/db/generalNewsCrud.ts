"use server";

import prisma from "@/lib/prisma";
import { general_news as General_news } from "@prisma/client";
import { PartialBy } from "../type";

export const getGeneralNews = async (): Promise<General_news[]> => {
  try {
    return await prisma.general_news.findMany();
  } catch (error) {
    console.error("Error fetching news:", error);
    throw new Error("Failed to fetch news");
  }
};

export const createGeneralNewsPost = async (
  newsData: PartialBy<General_news, "general_news_id" | "date">
) => {
  try {
    return await prisma.general_news.create({
      data: newsData,
    });
  } catch (error) {
    console.error("Error creating General news:", error);
    throw new Error("Failed to create General news");
  }
};

export const deleteGeneralNewsPost = async (id: number) => {
  try {
    return await prisma.general_news.delete({
      where: { general_news_id: id },
    });
  } catch (error) {
    console.error("Error deleting general news:", error);
    throw new Error("Failed to delete general news");
  }
};
