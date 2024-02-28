import React from "react";
import { useRouter } from "next/navigation";

const BoardCommentDelete = ({ boardId, commentId, updateCommentList }) => {
  const router = useRouter();

  const token =
    typeof window !== "undefined"
      ? sessionStorage.getItem("accessToken")
      : null;

  const deleteComment = async () => {
    // console.log(boardId);
    // console.log(commentId);
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_KEY +
          `/board/${boardId}/comment/${commentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );

      if (res.ok) {
        // console.log("댓글 삭제 성공");
        updateCommentList();
      } else {
        // console.log("댓글 삭제 실패");
      }
    } catch (error) {
      // console.log("네트워크 오류로 댓글 삭제 실패", error);
    }
  };

  return (
    <div>
      <button
        className="bg-transparent hover:bg-black text-black font-semibold hover:text-white py-0.5 px-4  hover:border-transparent "
        onClick={deleteComment}
      >
        삭제
      </button>
    </div>
  );
};

export default BoardCommentDelete;
