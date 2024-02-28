"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function WebtoonLike() {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const accessToken =
    typeof window !== "undefined"
      ? sessionStorage.getItem("accessToken")
      : null;
  const params = useParams();
  const id = params.id;
  const [isLiked, setIsLiked] = useState(null);
  useEffect(() => {
    if (accessToken) {
      fetch(`${API_KEY}/webtoon/${id}/like`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
      })
        .then(async (response) => {
          const responseJSON = await response.json();
          const like = responseJSON.data.like;
          setIsLiked(like);
        })
        .catch((error) => {
          // console.log(error)
        });
    }
  });

  const likeButtonClick = (event) => {
    event.preventDefault();
    if (isLiked) {
      fetch(`${API_KEY}/webtoon/${id}/like`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
      })
        .then((response) => {
          setIsLiked(false);
        })
        .catch((error) => {
          alert("좋아요 중 오류 발생");
        });
    } else {
      fetch(`${API_KEY}/webtoon/${id}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
      })
        .then((response) => {
          setIsLiked(true);
        })
        .catch((error) => {
          alert("좋아요 취소 중 오류 발생");
        });
    }
  };

  return (
    <div>
      {isLiked === false && (
        <button
          className="hover:text-white text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          style={{
            backgroundColor: "gray",
          }}
          onClick={likeButtonClick}
        >
          🖤 좋아요
        </button>
      )}
      {isLiked === true && (
        <button
          className="hover:text-white text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          style={{
            backgroundColor: "pink",
          }}
          onClick={likeButtonClick}
        >
          ❤ 좋아요
        </button>
      )}
    </div>
  );
}
