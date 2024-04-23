import { getGeneralNews } from "@/lib/db/generalNewsCrud";
import NewsTable from "./GeneralNewsTable";

export default async function FacebookPostsPage() {
  const news = await getGeneralNews();

  return <NewsTable news={news} />;
}
