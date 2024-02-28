"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import Link from "next/link";

function WebtoonThumbnailCardSearch({ webtoon }) {
  const router = useRouter();
  const goToDetail = (event) => {
    event.preventDefault();
    router.push(`/webtoon/${webtoon['webtoon_id']}`, { id: webtoon['webtoon_id'] });
  };
  return (
    <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-lg">
      <img
        className="w-full h-3/5 cursor-pointer"
        src={webtoon.thumbnail}
        alt={webtoon.title}
        onClick={goToDetail}
        width={0}
        height={0}
        sizes="100vw"
        // style={{ width: "100%", height: "auto" }}
        // priority
      />
      <div className="px-6 py-4">
        <div
          className="font-bold text-xl mb-2 truncate cursor-pointer"
          onClick={goToDetail}
        >
          {webtoon.title}
        </div>
        <p className="text-gray-700 text-base">{webtoon.author}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <div className="hover:underline inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          <Link href={`/webtoon/all/${webtoon.genre}`}>{webtoon.genre}</Link>
        </div>
        <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {webtoon.platform}
        </div>
      </div>
    </div>
  );
}

export default WebtoonThumbnailCardSearch;
