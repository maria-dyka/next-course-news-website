"use client";

import { DUMMY_NEWS } from "@/dummy-news";
import { notFound, useRouter } from "next/navigation";

export default function InterceptedFullsceenImagePage({ params }) {
  const router = useRouter();
  const newsItemSlug = params.slug;
  const newsItem = DUMMY_NEWS.find(newsItem => newsItem.slug === newsItemSlug);

  if (!newsItem) {
    notFound();
  }

  return (
    <>
      <div className="modal-backdrop" onClick={router.back}></div>
      <dialog className="modal" open>
        <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
      </dialog>
    </>
  )
}