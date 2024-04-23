import { getClinicalNews } from "@/lib/db/ClinicalNewsCrud";
import ClinicalNewsTable from "./ClinicalNewsTable";

export default async function ClinicalNewsPage() {
  const clinicalNews = await getClinicalNews();

  return <ClinicalNewsTable clinicalNews={clinicalNews} />;
}
