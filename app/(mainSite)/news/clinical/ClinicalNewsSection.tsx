import Image from "next/image";
import Link from "next/link";
import React from "react";
import { format } from "date-fns";
import { clinical_news as ClinicalNews } from "@prisma/client";

type ClinicalNewsSectionProps = {
  clinicalNews: ClinicalNews[];
};

const ClinicalNewsSection: React.FC<ClinicalNewsSectionProps> = ({
  clinicalNews,
}) => {
  const formatDate = (date: Date) => {
    return format(new Date(date), "MMMM dd, yyyy"); // Example format: February 28, 2022
  };

  function truncateText(text: string) {
    if (text.length <= 120) {
      return text;
    } else {
      return `${text.slice(0, 120)}...`;
    }
  }

  return (
    <section className="container mx-auto my-8">
      <h2 className="mb-6 text-center text-4xl font-bold">Latest news Posts</h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {clinicalNews.map((news) => (
          <div
            key={news.clinical_news_id}
            className="transform overflow-hidden rounded-lg bg-gray-100 shadow-lg transition duration-300 hover:scale-105 hover:bg-gray-200"
          >
            {news.image && (
              <Image
                src={news.image}
                alt={news.title}
                width={350}
                height={200}
                className="h-[200px] w-full object-cover"
              />
            )}

            <div className="p-6">
              <h3 className="mb-3 text-2xl font-semibold">{news.title}</h3>
              <p className="mb-4 text-gray-700">{truncateText(news.body)}</p>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{formatDate(news.date)}</p>
                <Link
                  href={`/news/clinical/${news.clinical_news_id}`}
                  className="text-sm font-medium text-blue-500 hover:underline"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ClinicalNewsSection;
