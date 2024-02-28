"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const LibraryCreateModal = ({ isOpen, setIsOpen, closeModal }) => {
  const router = useRouter();
  const [libraryName, setLibraryName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const token = sessionStorage.getItem("accessToken");

  const handleInputChange = (e) => {
    setLibraryName(e.target.value);
    if (e.target.value.includes(" ")) {
      setErrorMessage("서재 이름에 공백을 포함할 수 없습니다.");
    } else {
      setErrorMessage("");
    }
  };

  const createLibrary = async (e) => {
    e.preventDefault();

    // 서재 이름에 공백이 있는지 확인
    if (libraryName.includes(" ")) {
      alert("서재 이름에 공백을 포함할 수 없습니다.");
      return;
    }

    if (libraryName === "") {
      alert("서재 이름을 입력해주세요.");
      return;
    }

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_KEY + `/library`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            name: libraryName,
          }),
        }
      );

      // if (response.ok) {
      //   console.log("서재 생성 성공");
      //   alert("서재 생성에 성공했습니다.");
      //   window.location.href = "/library/list";

      //   router.push(`/library/list`);
      // } else {
      //   console.error("서재 생성 실패");
      // }

      if (response.ok) {
        const result = await response.json();
        // console.log(result.status);
        if (result.status === 200) {
          alert("서재 생성에 성공했습니다.");
          setIsOpen(false);
          window.location.href = "/library/list";
        } else if (result.status === 510) {
          alert("서재는 10개까지 만들 수 있습니다.");
          setIsOpen(false);
        } else {
          alert("서재이름에는 한글, 알파벳, 특수문자만 가능합니다.");
        }
        router.push(`/library/list`);
      } else {
        console.error("서재 생성 실패");
      }
    } catch (error) {
      console.error("네트워크 에러");
      // console.log(error);
    }

    const handleInputChange = (e) => {
      setLibraryName(e.target.value);
      if (e.target.value.includes(" ")) {
        setErrorMessage("서재 이름에 공백을 포함할 수 없습니다.");
      } else {
        setErrorMessage("");
      }
    };
  };

  return (
    <div style={{ display: isOpen ? "block" : "none" }}>
      {isOpen && (
        <div className="modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 bg-white shadow-md z-50">
          <div className="text-center text-lg font-bold mb-4">
            만드실 서재의 이름을 입력해주세요.
          </div>
          <input
            className="w-full mb-4 p-2 border border-b-4 border-black rounded-full text-center"
            type="text"
            placeholder="서재 이름을 작성해주세요"
            maxLength={11}
            value={libraryName}
            onChange={handleInputChange}
          />
          <div className="text-red-500">{errorMessage}</div>
          <div className="flex justify-center space-x-4">
            <button
              type="button"
              onClick={createLibrary}
              className="bg-black hover:bg-white hover:border-black text-white font-semibold hover:text-black py-1 px-4 border hover:border-transparent rounded-full text-center"
            >
              서재 만들기
            </button>
            <button
              onClick={closeModal}
              className="bg-gray-300 text-gray-700 py-1 px-4 rounded-full text-center"
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {isOpen && (
        <div
          className="overlay fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
          onClick={closeModal}
        ></div>
      )}
    </div>
  );
};

export default LibraryCreateModal;
