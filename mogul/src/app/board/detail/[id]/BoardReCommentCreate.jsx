"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const BoardReCommentCreate = ({
  commentId,
  boardId,
  updateCommentList,
  selectedCommentId,
  setSelectedCommentId,
  handleCommentClick,
  handleCommentClickCancel,
}) => {
  const [recommentContent, setRecommentContent] = useState("");
  const router = useRouter();
  const [nicknameValue, setNicknameValue] = useState("");
  const [storedToken, setStoredToken] = useState(null);

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
            setStoredToken(token);
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

  const recommentSubmit = async (e) => {
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
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            user: { id: 1 },
            article: { id: boardId },
            content: recommentContent,
            group: commentId,
          }),
        }
      );

      if (response.ok) {
        // console.log("대댓글 작성 성공");
        setSelectedCommentId("");
        updateCommentList();
        setRecommentContent(""); // 대댓글 내용 초기화
      } else {
        console.error("대댓글 작성 실패");
      }
    } catch (error) {
      console.error("서버와 통신 중 오류 발생", error);
    }
  };

  const cancelInput = () => {
    setSelectedCommentId("");
  };

  return (
    <div>
      {storedToken && (
        <div className="flex flex-col border-x-2 p-4 gap-4 border-2  border-black">
          <div className="grid grid-cols-8 flex">
            <div className="col-span-1 text-center justify-center">
              → {commentId}
            </div>
            <div className="col-span-1 text-center justify-center font-bold">
              {nicknameValue}
            </div>
            <input
              className="col-span-4 mr-10 pl-5 border-black justify-center border-2 rounded-full"
              type="text"
              placeholder="대댓글 내용을 작성해주세요"
              value={recommentContent}
              onChange={(e) => setRecommentContent(e.target.value)}
            />
            <button
              type="button"
              onClick={recommentSubmit}
              className="col-span-1 bg-black hover:bg-white text-white  font-semibold hover:text-black py-1 px-4 ml-3 mr-2 p02 border border-black hover: border-transparent hover:border-transparent rounded-full"
            >
              등록
            </button>
            <button
              type="button"
              onClick={cancelInput}
              className="col-span-1 bg-transparent hover:bg-black text-black font-semibold hover:text-white py-1 px-4 ml-2 mr-3 border-2 border-black hover:border-transparent rounded-full"
            >
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardReCommentCreate;
