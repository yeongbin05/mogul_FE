"use client";
import { useRouter } from "next/navigation";
import { React, useEffect, useState } from "react";
import Link from "next/link";
// import Image from "next/image";
import DeleteWebtoonFromLibrary from "./DeleteWebtoonFromLibrary";

function MyWebtoonThumbnailCard({ myWebtoon, libraryId, nickname }) {
  const router = useRouter();
  const token =
    typeof window !== "undefined"
      ? sessionStorage.getItem("accessToken")
      : null;
  const [nicknameValue, setNicknameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const goToDetail = (event) => {
    event.preventDefault();
    router.push(`/webtoon/${myWebtoon.id}`, { id: myWebtoon.id });
  };
  useEffect(() => {
    if (token) {
      const fetchProfileInfo = async () => {
        try {
          const response = await fetch(
            process.env.NEXT_PUBLIC_API_KEY + "/user/profile/info",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
              },
            }
          );

          if (response.ok) {
            const result = await response.json();

            setEmailValue(result.data.email);
            setNicknameValue(result.data.nickname);
            // console.log("프로필 성공");
          } else {
            // console.log('프로필 정보 불러오기 실패');
          }
        } catch (error) {
          // console.log("네트워크 오류로 프로필 정보 불러오기 실패");
        }
      };

      fetchProfileInfo();
    }
  }, [token]);
  return (
    <div>
      <div
        style={{ position: "relative" }}
        className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-lg"
      >
        <img
          className="w-full h-3/5 cursor-pointer"
          src={myWebtoon.thumbnail}
          alt={myWebtoon.title}
          onClick={goToDetail}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "250px", objectFit: "cover" }}
        />
        <div className="px-4 py-4">
          <div
            className="font-bold text-l mb-1  cursor-pointer truncate"
            onClick={goToDetail}
          >
            {myWebtoon.title}
          </div>
          <p className="text-sm text-gray-700 text-base truncate">
            {myWebtoon.author}
          </p>
        </div>
        <div className="px-6  pb-2">
          {/* <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 ">
            #{myWebtoon.genre}
          </span> */}

          <div className="hover:underline inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-1 mb-2">
            <Link href={`/webtoon/all/${myWebtoon.genre}`}>
              {myWebtoon.genre}
            </Link>
          </div>

          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 ">
            {myWebtoon.platform}
          </span>
        </div>
      </div>
      {token !== null && nickname === nicknameValue && (
        <DeleteWebtoonFromLibrary
          webtoonId={myWebtoon.id}
          libraryId={libraryId}
        />
      )}
    </div>
  );
}

export default MyWebtoonThumbnailCard;
