"use client";

import { useState } from "react";
import React from "react";

import { useEffect } from "react";

const ProfileInfo = () => {
  const [emailValue, setEmailValue] = useState("");
  const [nicknameValue, setNicknameValue] = useState("");
  const [openInput, setOpenInput] = useState(false);
  const [newNickname, setNewNickname] = useState("");

  // console.log(nicknameValue);
  // console.log(newNickname);

  const inputBoolean = () => {
    setOpenInput((prevOpenInput) => !prevOpenInput);
  };

  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const accessToken =
    typeof window !== "undefined"
      ? sessionStorage.getItem("accessToken")
      : null;
  useEffect(() => {
    const fetchProfileInfo = async () => {
      try {
        const response = await fetch(API_KEY + "/user/profile/info", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${accessToken}`,
          },
        });

        if (response.ok) {
          const result = await response.json();
          // console.log("프로필 성공");
          setEmailValue(result.data.email);
          setNicknameValue(result.data.nickname);
        } else {
          // console.log("프로필 정보 불러오기 실패");
        }
      } catch (error) {
        // console.log("네트워크 오류로 프로필 정보 불러오기 실패");
        // console.log(error);
      }
    };

    fetchProfileInfo();
  }, [API_KEY, accessToken]);

  const updateProfileInfo = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API_KEY + `/user/profile/info`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
        body: JSON.stringify({
          nickname: newNickname,
        }),
      });

      if (response.ok) {
        // fetchProfileInfo();
        alert("닉네임이 수정되었습니다.");
        inputBoolean();
        // newNickname(null);
        setNewNickname("");

        //여기서 다시 불러오기 테스트
        try {
          const response = await fetch(API_KEY + "/user/profile/info", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${accessToken}`,
            },
          });

          if (response.ok) {
            const result = await response.json();
            // console.log("프로필 성공");
            setEmailValue(result.data.email);
            setNicknameValue(result.data.nickname);
          } else {
            // console.log("프로필 정보 불러오기 실패");
            // alert("중복된 닉네임이거나 닉네임 형식에 맞지 않습니다.");
          }
        } catch (error) {
          // console.log("네트워크 오류로 프로필 정보 불러오기 실패");
          // console.log(error);
        }

        //여기까지 다시 불러오기 테스트

        // console.log("내정보 업데이트 성공");
      } else {
        // console.log("내정보 업데이트 실패");
        alert("중복된 닉네임이거나 닉네임 형식에 맞지 않습니다.");
      }
    } catch (error) {
      // console.log("네트워크 오류");
      // console.log(error);
    }
  };

  // 엔터키 이벤트 발생 함수
  const handleEnterKeyPress = (e, func) => {
    if (e.key === "Enter") {
      updateProfileInfo(e);
    }
  };
  return (
    <div>
      <div>
        <div className="flex">
          <div
            style={{ backgroundColor: "#FDF7E4" }}
            className=" hover:opacity-80 text-black font-bold   rounded-full mb-2 mt-2 mx-2  py-4 px-8 justify-center"
          >
            이메일
          </div>
          <div
            style={{ backgroundColor: "#FDF7E4" }}
            className=" hover:opacity-80 text-black font-bold   rounded-full mb-2 mt-2 mx-2 py-4 px-8 justify-center"
          >
            {emailValue}
          </div>
        </div>
        <div className="flex">
          <div
            style={{ backgroundColor: "#FDF7E4" }}
            className=" hover:opacity-80 text-black font-bold   rounded-full mb-2 mt-2 mx-2 py-4 px-8 justify-center"
          >
            닉네임
          </div>
          <div
            style={{ backgroundColor: "#FDF7E4" }}
            className=" hover:opacity-80 text-black font-bold rounded-full mb-2 mt-2 mx-2 py-4 px-8 justify-center"
          >
            {nicknameValue}
          </div>
          {openInput !== true && (
            <div
              // style={{ backgroundColor: "#FDF7E4" }}
              className=" bg:black hover:opacity-80 text-white font-bold rounded-full mb-2 mt-2 mx-2 py-4  justify-center cursor-pointer"
              onClick={inputBoolean}
            >
              변경하기
            </div>
          )}
        </div>
        {openInput === true && (
          <div className="flex">
            <input
              className=" m-2 py-4 px-8 font-bold rounded-3xl"
              type="text"
              placeholder="새 닉네임을 입력하세요"
              value={newNickname}
              style={{
                backgroundColor: "#FAEED1",
                color: "grey",
              }}
              onChange={(e) => setNewNickname(e.target.value)}
              onKeyDown={handleEnterKeyPress}
            />
            <div
              // style={{ backgroundColor: "#FDF7E4" }}
              className="bg-black hover:opacity-80 text-white font-bold rounded-full mb-2 mt-2 mx-2 py-4 px-8 justify-center cursor-pointer"
              onClick={updateProfileInfo}
            >
              수정
            </div>
            <div
              style={{ backgroundColor: "#FDF7E4" }}
              className=" hover:opacity-80 text-black font-bold rounded-full mb-2 mt-2 mx-2 py-4 px-8 justify-center cursor-pointer"
              onClick={inputBoolean}
            >
              취소
            </div>
          </div>
        )}
        <div
          style={{ backgroundColor: "#BBAB8C" }}
          className="cursor-pointer hover:opacity-80 text-black font-bold   rounded-full mb-2 mt-2 mx-2  py-4 px-8 justify-center"
        >
          <a className="hover:underline" href="/recommend">
            웹툰 추천받기
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
