"use client";

import { MyBoard } from "./preview/MyBoard";
import { MyComment } from "./preview/MyComment";
import { MyLibrary } from "./preview/MyLibrary";
import MyReview from "./preview/MyReview";
import { MySubscription } from "./preview/MySubscription";

import React from "react";
import { useState } from "react";
import { useEffect } from "react";
const MyActivities = () => {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const [activeComponent, setActiveComponent] = useState("first");
  const [activityData, setActivityData] = useState([]);
  const accessToken =
    typeof window !== "undefined"
      ? sessionStorage.getItem("accessToken")
      : null;
  const handleComponentChange = (component) => {
    getData(component);
    setActiveComponent(component);
  };
  const pno = 0;
  const count = 4;

  useEffect(() => {
    getData("first");
  }, []);

  // first = MyLibrary, second = MySubscription, third = MyLikedWebtoon, fourth = MyBoard, fifth = MyComment
  const getData = async (component) => {
    const url = {
      first: `${API_KEY}/library`,
      second: `${API_KEY}/library/subscription?pno=${pno}&count=${count}`,
      third: `${API_KEY}/review/my?pno=${pno}&count=${count}`,
      fourth: `${API_KEY}/board/my?pno=${pno}&count=${count}`,
      fifth: `${API_KEY}/board/comment/my?pno=${pno}&count=${count}`,
    };
    try {
      const response = await fetch(url[component], {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
      });
      if (response.ok) {
        // console.log("내 활동 불러오기를 성공했습니다.");
        const res = await response.json();
        const data = res.data;
        setActivityData(data);
        // console.log(data);
      } else {
        // console.log("내 활동 불러오기실패");
        // console.log(response);
      }
    } catch (error) {
      alert("내 활동 불러오기 중 오류 발생");
      // console.log(error);
    }
  };

  return (
    <div className="p-3">
      <div>
        <div className="grid grid-cols-4 gap-30">
          <div className="grid grid-row col-span-1 flex mr-8">
            <div
              style={{ flex: 1, backgroundColor: "#FDF7E4" }}
              className="cursor-pointer hover:bg-transparent hover:opacity-80 text-black font-semibold hover:text-black flex justify-center items-center  rounded-full mb-2 mt-2 mx-6 justify-center"
              onClick={() => handleComponentChange("first")}
            >
              내 서재
            </div>

            <div
              style={{ flex: 1, backgroundColor: "#FDF7E4" }}
              className="cursor-pointer hover:bg-transparent hover:opacity-80 text-black font-semibold hover:text-black flex justify-center items-center border-black  rounded-full mb-2 mt-2 mx-6"
              onClick={() => handleComponentChange("second")}
            >
              내가 구독한 서재
            </div>

            <div
              style={{ flex: 1, backgroundColor: "#FDF7E4" }}
              className="cursor-pointer hover:bg-transparent hover:opacity-80 text-black font-semibold hover:text-black flex justify-center items-center border-black rounded-full mb-2 mt-2 mx-6  "
              onClick={() => handleComponentChange("third")}
            >
              내가 쓴 리뷰
            </div>

            <div
              style={{ flex: 1, backgroundColor: "#FDF7E4" }}
              className="cursor-pointer hover:bg-transparent hover:opacity-80 text-black font-semibold hover:text-black flex justify-center items-center border-black  rounded-full mb-2 mt-2 mx-6"
              onClick={() => handleComponentChange("fourth")}
            >
              내가 쓴 게시글
            </div>

            <div
              style={{ flex: 1, backgroundColor: "#FDF7E4" }}
              className="cursor-pointer hover:bg-transparent hover:opacity-80 text-black font-semibold hover:text-black flex justify-center items-center border-black rounded-full mb-2 mt-2 mx-6"
              onClick={() => handleComponentChange("fifth")}
            >
              내가 쓴 댓글
            </div>
          </div>
          <div
            className="col-span-3 rounded-3xl"
            style={{ backgroundColor: "#FDF7E4" }}
          >
            <div>
              {/* Render the appropriate child component based on the activeComponent state */}
              {activeComponent === "first" && <MyLibrary data={activityData} />}
              {activeComponent === "second" && (
                <MySubscription data={activityData} />
              )}
              {activeComponent === "third" && <MyReview data={activityData} />}
              {activeComponent === "fourth" && <MyBoard data={activityData} />}
              {activeComponent === "fifth" && <MyComment data={activityData} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyActivities;
