import React from "react";
import { getClinicalNews } from "@/lib/db/ClinicalNewsCrud";
import ClinicalNewsSection from "./ClinicalNewsSection";

const ClinicalNews = async () => {
  const clinicalNews = await getClinicalNews();

  return <ClinicalNewsSection clinicalNews={clinicalNews} />;
};

export default ClinicalNews;
