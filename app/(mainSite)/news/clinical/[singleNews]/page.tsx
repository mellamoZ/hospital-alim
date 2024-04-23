import Image from "next/image";
import React from "react";
import { getSingleNewsPost } from "@/lib/db/ClinicalNewsCrud";
interface Props {
  params: { singleNews: string };
}

const SingleNews = async ({ params: { singleNews } }: Props) => {
  const UniqueNews = await getSingleNewsPost(Number(singleNews));

  if (!UniqueNews) {
    return <div>There is no such blog id</div>;
  }

  const { image, title, body } = UniqueNews;

  return (
    <div className="container mx-auto my-8 flex flex-col items-center gap-8 md:flex-row">
      {image && (
        <div className="md:w-1/2">
          <Image
            src={image}
            alt={title || ""}
            width={768}
            height={480}
            layout="responsive"
            placeholder="blur"
            blurDataURL="/path/to/placeholder.jpg"
            className="rounded-md object-cover shadow-lg"
          />
        </div>
      )}
      <div className="prose leading-relaxed md:w-1/2">
        <h1 className="mb-4 text-4xl font-bold">{title}</h1>
        <div>{body}</div>
      </div>
    </div>
  );
};

export default SingleNews;
