"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
const BoardCreate = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");

    // 사용자가 로그인하지 않은 경우 다른 페이지로 리디렉션
    if (!token) {
      alert("로그인이 필요합니다");
      router.push("/user/login"); // 로그인 페이지로 리디렉션
    }
  }, []);

  const boardCreateSubmit = async () => {
    try {
      if (!title || !content) {
        alert("제목과 내용을 모두 입력해주세요.");
        return;
      }
      const token = sessionStorage.getItem("accessToken");

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/board`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `${token}` : "", // 토큰이 정의되어 있는지 확인하고 사용
        },
        body: JSON.stringify({
          title: title,
          content: content,
          articleTagList: [{ tag: "로맨스" }],
        }),
      });

      if (response.ok) {
        // console.log("게시글 작성 성공");
        alert("게시글이 등록되었습니다.");
        router.push("/board");
      } else {
        console.error("게시글 작성 실패");
      }
    } catch (error) {
      console.error("서버와 통신 중 오류 발생");
    }
  };

  const backToList = () => {
    router.push("/board");
  };

  return (
    <div>
      <div className=" mt-7 mx-auto">
        <div className="mx-3">
          <div
            className="grid grid-cols-8 p-3 gap-4 hover:bg-gray-50 rounded-full text-center "
            style={{ backgroundColor: "#FAEED1" }}
          >
            <div className="col-span-8 font-bold text-center flex overflow-hidden ">
              <input
                className=" mx-2 p-1 m-0.25  grow border border-transparent"
                type="text"
                placeholder="제목을 입력하세요"
                value={title}
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
                value={content}
                rows={8}
                placeholder="내용을 입력하세요"
                style={{
                  backgroundColor: "#FAEED1",
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
                onClick={boardCreateSubmit}
                className="hover:bg-transparent hover:border-2 hover:border-black bg-black text-white font-semibold hover:text-black py-1.5 px-6 border-black border-2 rounded-full mb-2 mt-2 mr-2 opacity-60 shadow hover:shadow-black "
              >
                등록
              </button>

              <button
                onClick={backToList}
                className="hover:bg-black hover:text-white bg-transparent text-black font-semibold  py-1.5 px-6 border-2 border-black rounded-full mb-2 mt-2 mr-2 opacity-60 shadow hover:shadow-black "
              >
                취소
              </button>
              {/* <button className="shadow shadow-blue-500/40 hover:shadow-black">
                테스트버튼
              </button> */}
            </div>

            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardCreate;
