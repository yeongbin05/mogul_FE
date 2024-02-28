"use client";

import React from "react";
import { useRouter } from "next/navigation";

const BoardDelete = ({ boardId }) => {
  const router = useRouter();
  const token =
    typeof window !== "undefined"
      ? sessionStorage.getItem("accessToken")
      : null;

  const deleteBoard = async () => {
    const confirmation = window.confirm("정말로 삭제하시겠습니까?");
    if (confirmation) {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_API_KEY + `/board/${boardId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          }
        );

        if (res.ok) {
          // console.log("게시글 삭제 성공");
          alert("글이 삭제되었습니다.");
          router.push("/board");
        } else {
          // console.error("게시글 삭제 실패");
        }
      } catch (error) {
        // console.log("네트워크 오류로 게시글 삭제 실패", error);
      }
    }
  };

  return (
    <div className="text-center">
      <button
        className="hover:bg-transparent bg-black text-white font-semibold hover:text-black py-1 px-6 border-2 border-black rounded-full mb-2 mt-2 mr-2 ml-auto"
        onClick={deleteBoard}
      >
        글삭제
      </button>
    </div>
  );
};

export default BoardDelete;
