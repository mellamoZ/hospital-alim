import { getGeneralNews } from "@/lib/db/generalNewsCrud";

const GeneralNews = async () => {
  const facebookPosts = await getGeneralNews();
  return (
    <div>
      <h1 className="my-4 text-center text-3xl font-bold text-gray-800">
        Latest News
      </h1>
      <div className="grid grid-cols-1 gap-4 px-5 lg:grid-cols-2 xl:grid-cols-3">
        {facebookPosts.map((post) => (
          <div key={post.fb_url} className="w-full">
            <iframe
              className="h-[500px] w-full overflow-hidden rounded-md border-none"
              src={post.fb_url}
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeneralNews;
