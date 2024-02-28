"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const BoardCommentCreate = ({ boardId, updateCommentList }) => {
  const [commentContent, setCommentContent] = useState("");
  const [nicknameValue, setNicknameValue] = useState("");
  const router = useRouter();

  useEffect(() => {
    const getMyNickname = async () => {
      const token = sessionStorage.getItem("accessToken");
      if (token) {
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
            // console.log("프로필 성공");

            setNicknameValue(result.data.nickname);

            // console.log(nicknameValue);
          } else {
            // console.log("프로필 정보 불러오기 실패");
          }
        } catch (error) {
          // console.log("네트워크 오류로 프로필 정보 불러오기 실패");
          // console.log(error);
        }
      }
    };

    getMyNickname();
  }, []);

  const commentSubmit = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("accessToken");

    if (!token) {
      alert("댓글을 작성하려면 로그인이 필요합니다.");
      // router.push("/user/login"); // 로그인 페이지로 이동
      return; // 로그인이 되어 있지 않으면 댓글을 작성하지 않음
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/board/${boardId}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            content: commentContent,
            article: { id: boardId },
          }),
        }
      );

      if (response.ok) {
        // console.log("댓글 작성 성공");
        updateCommentList();
        setCommentContent(""); // 댓글 내용 초기화
      } else {
        console.error("댓글 작성 실패");
      }
    } catch (error) {
      console.error("서버와 통신 중 오류 발생");
    }
  };

  return (
    <div>
      <div className="grid grid-cols-8 p-4 gap-4 ">
        <div className="col-span-1 text-center font-bold">{nicknameValue}</div>

        <input
          className="col-span-6 pl-5 rounded-full border border-b-4 border-black border-2"
          type="text"
          placeholder="댓글 내용을 작성해주세요"
          maxLength={30}
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
        />
        <button
          type="button"
          onClick={commentSubmit}
          className="col-span-1 bg-black hover:bg-white hover:border-black text-white font-semibold hover:text-black py-1 px-4 border hover:border-transparent rounded-full text-center"
        >
          등록
        </button>
      </div>
    </div>
  );
};

export default BoardCommentCreate;
