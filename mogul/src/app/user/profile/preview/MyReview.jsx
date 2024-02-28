/* eslint-disable */

"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReviewModal from "@/components/webtoon/review/ReviewModal";

export default function MyReview({ data }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const clickModal = () => setShowModal(!showModal);
  const postAllClick = () => {
    router.push(`profile/my`);
  };
  // console.log(data);
  return (
    <div>
      <div className="flex justify-between">
        <div
          className=" mt-4  rounded-full 
  hover:bg-black bg-transparent text-black font-semibold hover:text-yellow-600 py-4 px-8   cursor-pointer m-5"
          style={{ backgroundColor: "#DED0B6" }}
        >
          내가 쓴 리뷰
        </div>
        <div
          className="font-bold p-4 px-6 m-4 cursor-pointer"
          onClick={() => postAllClick()}
        >
          더보기
        </div>
      </div>
      <div className="flex grid grid-cols-4  ">
        {data && data.length > 0 ? (
          data
            .slice(0, 4)
            // .reverse()
            .map((h) => {
              return (
                <div
                  onClick={clickModal}
                  className="cursor-pointer shadow-md rounded-2xl  px-8 pt-6 pb-8  mr-5 ml-5 mb-20 relative"
                  style={{
                    backgroundColor: "white",
                    height: "170px",
                    width: "170px",
                  }}
                >
                  <div className="mb-1 truncate font-semibold">
                    <div className="flex justify-between">
                      <div>{h.title}</div>
                      {/* <div>{h.nickname}</div> */}
                    </div>
                    <hr />
                  </div>
                  <div className="truncate">
                    <p className="mt-5 line-clamp-5">{h.content}</p>
                  </div>
                  {showModal && (
                    <ReviewModal review={h} clickModal={clickModal} />
                  )}
                </div>
              );
            })
        ) : (
          <div>내 리뷰가 없습니다.</div>
        )}
      </div>
      <div className="mb-2"></div>
    </div>
  );
}
