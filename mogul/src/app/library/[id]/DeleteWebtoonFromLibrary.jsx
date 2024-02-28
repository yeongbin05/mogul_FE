"use client";

// DeleteWebtoonFromLibrary.js

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export default function DeleteWebtoonFromLibrary({ webtoonId, libraryId }) {
  const token =
    typeof window !== "undefined"
      ? sessionStorage.getItem("accessToken")
      : null;

  const router = useRouter();

  const deleteToonLib = async () => {
    try {
      const token =
        typeof window !== "undefined"
          ? sessionStorage.getItem("accessToken")
          : null;

      const res = await fetch(
        process.env.NEXT_PUBLIC_API_KEY + `/library/${libraryId}/${webtoonId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );

      if (res.ok) {
        // console.log("내 서재에서 웹툰 삭제 성공");
        const confirmDelete = window.confirm("삭제하시겠습니까?");

        if (confirmDelete) {
          alert("내 서재에서 웹툰을 삭제했습니다.");
          const currentPath = window.location.pathname;
          window.location.href = currentPath;
        } else {
          // console.log("삭제가 취소되었습니다.");
        }
      } else {
        console.error("내 서재에서 웹툰 삭제 실패");
      }
    } catch (error) {
      // console.log("네트워크 오류로 내 서재에서 웹툰 삭제 실패", error);
    }
  };

  const realDelete = () => {
    const userConfirmed = window.confirm("정말 웹툰을 삭제하시겠습니까??");

    if (userConfirmed) {
      deleteToonLib();
    } else {
      return;
    }
  };

  return (
    <div>
      <button onClick={deleteToonLib}>
        <FontAwesomeIcon style={{ color: "grey" }} icon={faXmark} />
        {/* 삭제 */}
      </button>
    </div>
  );
}
