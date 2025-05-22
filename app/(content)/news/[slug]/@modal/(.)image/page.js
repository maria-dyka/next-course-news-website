import ModalBackdrop from "@/components/modal-backdrop";
import { getNewsItem } from "@/lib/news";
import { notFound } from "next/navigation";

export default async function InterceptedFullsceenImagePage({ params }) {
  const newsItemSlug = params.slug;
  const newsItem = await getNewsItem(newsItemSlug);

  if (!newsItem) {
    notFound();
  }

  return (
    <>
      <ModalBackdrop />
      <dialog className="modal" open>
        <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
      </dialog>
    </>
  )
}