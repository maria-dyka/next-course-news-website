import { getNewsItem } from "@/lib/news";
import { notFound } from "next/navigation";

export default async function FullsceenImagePage({ params }) {
  const newsItemSlug = params.slug;
  const newsItem = await getNewsItem(newsItemSlug);

  if (!newsItem) {
    notFound();
  }

  return (
    <div className="fullsceen-image">
      <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
    </div>
  )
}