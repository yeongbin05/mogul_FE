"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
const DeleteMyLibrary = ({
  libraryId,
  libraryName,
  onClose,
  setHoveredIndex,
  // hoveredIndex,
  // isDeleteClicked,
  setIsDeleteClicked,
}) => {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const token = sessionStorage.getItem("accessToken");

  // const token =
  //   typeof window !== "undefined"
  //     ? sessionStorage.getItem("accessToken")
  //     : null;

  const deleteLibrary = async () => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_KEY + `/library/${libraryId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );

      if (res.ok) {
        // console.log("서재 삭제 성공");
        alert("서재를 삭제했습니다.");
        window.location.href = "/library/list";
      } else {
        console.error("서재 삭제 실패");
      }
    } catch (error) {
      ("네트워크 오류로 서재 삭제 실패");
      error;
    }
  };

  const handleDeleteClick = () => {
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

  return (
    <div onMouseLeave={() => onClose(false)}>
      <button
        onClick={handleDeleteClick}
        title="서재 삭제"
        className="px-2 py-1  text-black  rounded-2xl  hover:border-white hover:text-white hover:bg-black font-bold"
      >
               <FontAwesomeIcon style={{ color: "grey" }} icon={faXmark} />

      </button>
      <div style={{ display: isModalVisible ? "block" : "none" }}>
        <div>
          {isModalVisible && (
            <div className="modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 bg-white text-black shadow-md z-50">
              <div className="text-center text-lg font-bold mb-4">
                [ {libraryName} ] 서재를 정말 삭제하시겠습니까?
              </div>
              <div>
                <button
                  className="bg-black hover:bg-white hover:border-black text-white font-semibold hover:text-black py-1 px-4 border hover:border-transparent rounded-full text-center"
                  onClick={handleYesClick}
                >
                  삭제
                </button>

                <button
                  className="bg-gray-300 text-gray-700 py-1 px-4 rounded-full text-center"
                  onClick={handleNoClick}
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
};

export default DeleteMyLibrary;
