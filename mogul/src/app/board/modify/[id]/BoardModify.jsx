"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const BoardModify = ({ boardId, initialTitle, initialContent, props }) => {
  // console.log(boardId);
  // console.log(initialTitle);
  // console.log(initialContent);

  // console.log(props);

  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("initialTitle");

  const id = boardId;

  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [boardData, setBoardData] = useState("");

  const [sendTitle, setSendTitle] = useState(null);
  const [sendContent, setSendContent] = useState(null);

  const token =
    typeof window !== "undefined"
      ? sessionStorage.getItem("accessToken")
      : null;

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_API_KEY + `/board/${boardId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          }
        );
        if (res.ok) {
          const result = await res.json();
          setBoardData(result.data);
          setSendTitle(boardData.title);
          setSendContent(boardData.content);
        } else {
          // console.log("오류");
        }
      } catch (error) {
        // console.log("네트워크 오류");
      }
    };

    if (boardId) {
      fetchBoardData();
    }
  }, [boardId, token]);

  const modifyBoard = async (e) => {
    e.preventDefault();

    // console.log(id);
    // console.log(title);
    // console.log(content);
    // console.log(sendTitle);
    // console.log(sendContent);
    // console.log(boardData.title);

    if (title === null) {
      setTitle(boardData.title);
    } else {
    }

    if (content === null) {
      setContent(boardData.content);
    } else {
    }

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_KEY + `/board`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ title, content, id }),
      });
      if (res.ok) {
        alert("게시글이 수정되었습니다.");
        // console.log("게시글 수정 성공");

        router.push(`/board/detail/${boardId}`);
      } else {
        console.error("게시글 수정 실패");
      }
    } catch (error) {
      // console.log("네트워크 에러", error);
    }
  };

  const goToBoardDetail = () => {
    router.push(`/board/detail/${boardId}`);
  };

  return (
    <div>
      {/* 글작성 디자인 가져온거  */}
      <div className=" mt-7 mx-auto">
        <div className="mx-3">
          <div
            className="grid grid-cols-8 p-3 gap-4 hover:bg-gray-50 rounded-full text-center "
            style={{ backgroundColor: "#FAEED1" }}
          >
            {/* <div className="col-span-1"></div> */}
            <div className="col-span-8 font-bold text-center flex overflow-hidden ">
              <input
                className=" mx-2 p-1 m-0.25  grow border border-transparent"
                type="text"
                placeholder="기존 글 제목 "
                value={title !== null ? title : boardData.title}
                style={{
                  backgroundColor: "#FAEED1",
                  color: "grey",
                }}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div
            className="p-3 rounded-3xl mt-5  "
            style={{ backgroundColor: "#FAEED1" }}
          >
            <div className=" place-items-center   flex overflow-hidden">
              <textarea
                className="grow p-2 m-2 font-bold 
                mx-1 
                 "
                value={content !== null ? content : boardData.content}
                rows={8}
                placeholder="기존 글 내용"
                style={{
                  backgroundColor: "#FAEED1",
                  // caretColor: "white", // 원하는 커서 색상으로 조절
                  // fontSize: "1em",
                  color: "grey",
                }}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </div>

          <br />

          <div>
            <div className="flex justify-center">
              <button
                onClick={modifyBoard}
                className="hover:bg-transparent hover:border-2 hover:border-black bg-black text-white font-semibold hover:text-black py-1.5 px-6 border-black border-2 rounded-full mb-2 mt-2 mr-2 opacity-60 "
              >
                등록
              </button>

              <button
                onClick={goToBoardDetail}
                className="hover:bg-black hover:text-white bg-transparent text-black font-semibold  py-1.5 px-6 border-2 border-black rounded-full mb-2 mt-2 mr-2 opacity-60"
              >
                취소
              </button>
            </div>

            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardModify;
