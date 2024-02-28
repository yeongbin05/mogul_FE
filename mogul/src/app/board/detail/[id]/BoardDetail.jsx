"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";

import { usePathname, useSearchParams } from "next/navigation";
import BoardDelete from "./BoardDelete";
// import BoardModify from "@/app/board/modify/[id]/BoardModify";
import BoardComment from "./BoardComment";
// import BoardCommentCreate from "./BoardCommentCreate";

// import Link from "next/link";

//현재 코드가 url경로에서 boardId를 추출해내는
//형식인데 정석적인 방법이 아닌 것 같아서
//수정할 예정입니다.

//위에 경로 추출 이상하게 한 덕분에 무한루프에 빠져서 고통받음
//다시 리팩토링
const BoardDetail = () => {
  const router = useRouter();
  const [boardId, setBoardId] = useState(null);
  const [boardData, setBoardData] = useState(null);

  const boardNum = router.query;
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [nicknameValue, setNicknameValue] = useState("");
  const pathname2 = usePathname();
  const searchParams = useSearchParams();
  const accessToken =
    typeof window !== "undefined"
      ? sessionStorage.getItem("accessToken")
      : null;
  const token =
    typeof window !== "undefined"
      ? sessionStorage.getItem("accessToken")
      : null;

  const toModifyPage = () => {
    router.push(`/board/modify/${boardId}`);
  };

  //경로에서 글번호 가져오기
  const pathName = usePathname();

  useEffect(() => {
    const url = `${pathname2}?${searchParams}`;

    if (pathName) {
      const pathSegment = pathName.split("/");
      setBoardId(pathSegment.pop());
    }
  }, [pathName, pathname2, searchParams]);

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
          // console.log("보드 no오류");
          setBoardData(result.data);
        } else {
          // console.log("오류");
        }
      } catch (error) {
        // console.log("네트워크 오류");
      }
    };

    if (pathName && boardId) {
      fetchBoardData();
    }
  }, [pathName, boardId, token]);
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
    <div className=" mt-20 mx-auto" style={{ maxWidth: "50%" }}>
      {boardData ? (
        <div>
          <div
            className="grid grid-cols-8 p-3 gap-4 hover:bg-gray-50 border-2  border-black rounded-full text-center "
            style={{ backgroundColor: "#FAEED1" }}
          >
            <div className="col-span-1">{boardData.id}</div>
            <div className="col-span-6 font-bold">{boardData.title}</div>
            <div className="col-span-1">{boardData.userId}</div>
          </div>
          <div
            className="grid grid-cols-8 grid-rows-8 p-4  gap-4  hover:bg-gray-50 border-2  border-black rounded-3xl mt-5 "
            style={{ backgroundColor: "#FAEED1" }}
          >
            <div className="col-span-1 row-span-1 text-center font-bold ">
              {boardData.user.nickname}
            </div>
            <div className="col-span-4 row-span-1"></div>
            <div className="col-span-2 row-span-1 text-center ">
              {boardData.editedDate
                .replace("T", " ")
                .substring(0, boardData.editedDate.length - 3)}
            </div>
            <div className="col-span-1 row-span-1 text-center pr-3">
              조회수 {boardData.hit}
            </div>
            <div className="col-span-8 row-span-6 place-items-center p-4 border-t-2 border-black">
              {boardData.content}
            </div>
            <div className="col-span-8 row-span-1 text-center flex ml-5">
              {boardData.articleTagList.map((tagData, index) => (
                <div className="flex-rows mr-5" key={index}>
                  {/* <p>{`Tag ID: ${tagData.tagId}`}</p> */}
                  {/* <p>{`#${tagData.tag}`}</p> */}
                </div>
              ))}
            </div>
            <div className="col-span-5 row-span-1"></div>
            {/* <div className="col-span-1 row-span-1 text-center">♥</div> */}
          </div>

          <br />

          <div>
            {accessToken !== null &&
              boardData.user.nickname === nicknameValue && (
                <div className="flex justify-center">
                  <button
                    className="hover:bg-black bg-transparent text-black font-semibold hover:text-white py-1 px-6 border-2 border-black rounded-full mb-2 mt-2 mr-2"
                    onClick={toModifyPage}
                  >
                    글수정
                  </button>
                  <BoardDelete boardId={boardId} />
                </div>
              )}

            <div className="mx-auto">
              <BoardComment boardId={boardId} nicknameValue={nicknameValue} />
            </div>

            <br />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default BoardDetail;
