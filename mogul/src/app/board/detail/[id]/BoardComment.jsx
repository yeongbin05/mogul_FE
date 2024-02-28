"use client";

import React from "react";
import { useState } from "react";
// import { useRouter } from "next/navigation";
import { useEffect } from "react";
import BoardCommentDelete from "./BoardCommentDelete";
import BoardReCommentCreate from "./BoardReCommentCreate";
import BoardCommentCreate from "./BoardCommentCreate";

const BoardComment = ({ boardId, nicknameValue }) => {
  //BoardDetail에서 boardId값을 기준으로..

  const [commentData, setCommentData] = useState(null);

  const [selectedCommentId, setSelectedCommentId] = useState(null);
  // const [nicknameValue, setNicknameValue] = useState("");
  const [commentCount, setCommentCount] = useState(0);
  const [recommentCount, setRecommentCount] = useState(0);

  const token =
    typeof window !== "undefined"
      ? sessionStorage.getItem("accessToken")
      : null;

  const handleCommentClick = (commentId) => {
    setSelectedCommentId((prevId) => (prevId === commentId ? null : commentId));
  };

  const handleCommentClickCancel = (commentId) => {
    setSelectedCommentId(null);
  };

  const updateCommentList = async () => {
    try {
      const res = await fetch(
        // `${process.env.NEXT_PUBLIC_API_KEY}/board/${boardId}/comment`
        process.env.NEXT_PUBLIC_API_KEY + `/board/${boardId}/comment`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );

      if (res.ok) {
        const result = await res.json();
        setCommentData(result.data);
        setCommentCount(result.data.length);

        //댓글 개수
        // console.log(result.data.length);
        setCommentData(result.data);

        // 대댓글 개수

        let totalRecommentCount = 0;
        result.data.forEach((comment) => {
          if (comment.children && comment.children.length > 0) {
            totalRecommentCount += comment.children.length;
          }
        });
        setRecommentCount(totalRecommentCount);

        // console.log(totalRecommentCount);
      } else {
        // console.log("댓글 목록 업데이트 실패");
      }
    } catch (error) {
      console.error("댓글 목록 업데이트 중 오류 발생", error);
    }
  };

  //댓글 리스트 받아오기
  useEffect(() => {
    // console.log(nicknameValue, 11);
    updateCommentList();
  }, []);

  return (
    <div>
      <div
        className="flex flex-col border-x-2
            border-t-2  border-black p-3 rounded-t-3xl mt-5"
      >
        <div className="grid grid-cols-6 gap-4 text-center">
          <div className="col-span-1 font-semibold">
            댓글 {recommentCount + commentCount}{" "}
          </div>
          <div className="col-span-1"></div>
          <div className="col-span-1"></div>
          <div className="col-span-2"></div>
        </div>
      </div>

      {commentData &&
        commentData.map((c, index) => {
          //작성일 부분이 안 예뻐서 분리할게요
          const separate = c.registeredDate.split("T");
          const registeredDay = separate[0];
          const registeredTime = separate[1].substring(0, 8);

          return (
            <div
              key={index}
              className="flex flex-col border-x-2
            border-t-2  border-black  "
            >
              <div
                className="grid grid-cols-8 p-4 gap-4 cursor-pointer hover:bg-gray-50 "
                style={{ backgroundColor: "#FAEED1" }}
              >
                {/* <p
                  className="col-span-1 text-center"
                  onClick={() => handleCommentClick(c.id)}
                >
                  ◎
                </p> */}

                <p
                  className="col-span-1 text-center"
                  onClick={() => handleCommentClick(c.id)}
                >
                  {c.id}
                </p>
                <p
                  className="col-span-1 font-semibold text-center"
                  onClick={() => handleCommentClick(c.id)}
                >
                  {c.user.nickname}
                </p>
                <div
                  className="col-span-3"
                  onClick={() => handleCommentClick(c.id)}
                  key={index}
                >
                  {c.content}
                </div>

                {/* <p>등록일 : {c.registeredDate}</p> */}
                <p
                  className="col-span-2 text-center"
                  onClick={() => handleCommentClick(c.id)}
                >
                  {registeredDay} {registeredTime}
                </p>

                {c.user.nickname === nicknameValue &&
                  c.content !== "삭제된 댓글입니다" && (
                    <BoardCommentDelete
                      boardId={boardId}
                      commentId={c.id}
                      updateCommentList={updateCommentList}
                      //BoardId도 전달해야되나..?
                    />
                  )}
              </div>
              {selectedCommentId === c.id && (
                <BoardReCommentCreate
                  commentId={c.id}
                  boardId={boardId}
                  commentData={commentData}
                  updateCommentList={updateCommentList}
                  selectedCommentId={selectedCommentId}
                  setSelectedCommentId={setSelectedCommentId}
                  handleCommentClick={handleCommentClick}
                  handleCommentClickCancel={handleCommentClickCancel}
                />
              )}

              {c.children && c.children.length > 0 && (
                <div className="flex flex-col ">
                  {c.children.map((child, childIndex) => {
                    //이것도 작성일 부분 분리하는데 코드가 너무 더러워짐..
                    const separate2 = child.registeredDate.split("T");
                    const registeredDay2 = separate2[0];
                    const registeredTime2 = separate2[1].substring(0, 8);
                    return (
                      <div
                        className="grid grid-cols-8 gap-4 p-4"
                        key={childIndex}
                      >
                        {/* <p> 대댓글 </p> */}
                        <p className="col-span-1 text-center"> → {child.id}</p>
                        {/* <p className="col-span-1 text-center"> ▶ </p> */}
                        <p className="col-span-1 text-center font-semibold">
                          {" "}
                          {child.user.nickname}
                        </p>
                        <p className="col-span-3 "> {child.content}</p>
                        {/* <p> {child.registeredDate}</p> */}
                        <p className="col-span-2 text-center">
                          {registeredDay2} {registeredTime2}
                          {/* {registeredTime2.substring(0, registeredTime2.length - 3)} */}
                        </p>
                        {child.user.nickname === nicknameValue &&
                          c.content !== "삭제된 댓글입니다" && (
                            <BoardCommentDelete
                              boardId={boardId}
                              commentId={child.id}
                              updateCommentList={updateCommentList}
                            />
                          )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      <div className="border-x-2 border-black">
        <br />

        {token !== null ? (
          <div>
            <BoardCommentCreate
              boardId={boardId}
              updateCommentList={updateCommentList}
            />
          </div>
        ) : (
          <div className="text-center">
            로그인한 회원만이 댓글을 달 수 있습니다.
          </div>
        )}
      </div>
      <div
        className="flex flex-col border-x-2
            border-b-2  border-black p-3 rounded-b-3xl"
      >
        <div className="grid grid-cols-6 gap-4 text-center">
          <div className="col-span-1 font-semibold"></div>
          <div className="col-span-1"></div>
          <div className="col-span-1"></div>
          <div className="col-span-2"></div>
        </div>
      </div>
      {/* <div>
        <BoardCommentCreate
          boardId={boardId}
          updateCommentList={updateCommentList}
        />
      </div> */}
    </div>
  );
};

export default BoardComment;
