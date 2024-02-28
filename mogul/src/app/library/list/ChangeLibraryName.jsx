"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
export default function ChangeLibraryName({
  libraryId,
  libraryName,
  onClose,
  setHoveredIndex,
  hoveredIndex,
  isDeleteClicked,
  setIsDeleteClicked,
}) {
  const router = useRouter();
  const [name, setName] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);
  // const token =
  //   typeof window !== "undefined"
  //     ? sessionStorage.getItem("accessToken")
  //     : null;

  const token = sessionStorage.getItem("accessToken");

  const changeLibName = async (e) => {
    e.preventDefault();
    // console.log(name);

    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_KEY + `/library/${libraryId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            name: name,
          }),
        }
      );
      if (res.ok) {
        alert("서재이름이 변경되었습니다.");
        setIsModalVisible(false);
        window.location.href = '/library/list';
        ("서재이름 변경 성공");
      } else {
        console.error("서재이름 변경 실패");
      }
    } catch (error) {
      "네트워크 오류로 서재이름 변경 실패", error;
    }
  };

  const handleChangeClick = () => {
    setIsModalVisible(true);
    setHoveredIndex(libraryId);
    setIsDeleteClicked(true);
  };

  const handleYesClick = () => {
    deleteLibrary();
    setIsModalVisible(false);
    setIsDeleteClicked(false);
  };

  const handleNoClick = () => {
    setIsModalVisible(false);
    setIsDeleteClicked(false);
  };

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsModalVisible(false);
    }
  };

  const cancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div onMouseLeave={() => onClose(false)}>
      <button
        onClick={handleChangeClick}
        title="서재 이름 변경"
        className="px-3 py-1 hover:bg-white text-black hover:border-black rounded-full  hover:border-white hover:text-white hover:bg-black"
      >
        <FontAwesomeIcon style={{ color: "grey" }} icon={faPen} />
      </button>
      <div style={{ display: isModalVisible ? "block" : "none" }}>
        <div>
          {isModalVisible && (
            <div className="modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 bg-white text-black shadow-md z-50">
              {/* <p>[ {libraryName} ] 서재의 이름을 변경해주쇼 </p> */}

              <div className="text-center text-lg font-bold mb-4">
                [ {libraryName} ] 서재의 이름을 변경합니다.
              </div>

              <input
                className="w-full mb-4 p-2 border border-b-4 border-black rounded-full text-center"
                type="text"
                placeholder="서재 이름 변경하기"
                maxLength={20}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <div className="flex justify-center space-x-4">
                <button
                  onClick={changeLibName}
                  className="bg-black hover:bg-white hover:border-black text-white font-semibold hover:text-black py-1 px-4 border hover:border-transparent rounded-full text-center"
                >
                  변경하기
                </button>
                <button
                  onClick={cancel}
                  className="bg-gray-300 text-gray-700 py-1 px-4 rounded-full text-center"
                >
                  취소
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
