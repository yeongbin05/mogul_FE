"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import Image from "next/image";
import no_image_img from "@/assets/no_image_img.png";

const LibraryPopular = () => {
  const [data, setData] = useState([]);
  const [pno, setPno] = useState(0);
  const [count, setCount] = useState(10);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const router = useRouter();

  const token =
    typeof window !== "undefined"
      ? sessionStorage.getItem("accessToken")
      : null;

  useEffect(() => {
    const hotLibraryData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_KEY}/library/hot?pno=${pno}&count=${count}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          }
        );
        if (response.ok) {
          const result = await response.json();
          // console.log("인기서재 불러오기 성공");
          setData(result.data);
        } else {
          // console.log("인기서재 불러오기 실패");
        }
      } catch (error) {
        // console.log("네트워크 오류", error);
      }
    };

    // console.log("몇번나오나");
    hotLibraryData();
  }, [pno, count, token]);

  const goToMyLibrary = () => {
    // 토큰이 있는지 확인하고 있으면 내 서재로 이동합니다.
    if (token) {
      router.push(`/library/list`);
    } else {
      // 토큰이 없으면 로그인 페이지로 이동합니다.
      alert("로그인이 필요합니다");
      router.push(`/user/login`);
    }
  };

  const goToLibrary = (id) => {
    // 유저기능 복구되면 수정해야 함
    router.push(`/library/${id}`);
  };

  const goToMySubscription = () => {
    // 토큰이 있는지 확인하고 있으면 구독한 서재로 이동합니다.
    if (token) {
      router.push(`/library/subscribe`);
    } else {
      // 토큰이 없으면 로그인 페이지로 이동합니다.
      alert("로그인이 필요합니다");
      router.push(`/user/login`);
    }
  };

  return (
    <div>
      <div>
        <div className="text-3xl font-bold text-center mt-5 mb-7">인기서재</div>
        <div className="flex justify-between">
          <div className="text-2xl font-bold ml-16"></div>
          <div>
            <button
              onClick={goToMyLibrary}
              className="hover:bg-transparent bg-black text-white font-semibold hover:text-black py-2 px-6 border-black border-2 rounded-full  ml-4 mb-7 active:bg-black active:text-white"
            >
              내 서재
            </button>
            {/* 구독한 서재로 이동하는 버튼 */}
            <button
              onClick={goToMySubscription}
              className="hover:bg-black text-black font-semibold hover:text-white py-2 px-6 border-black border-2 rounded-full mr-16 mx-4 mb-7 mr"
            >
              내가 구독한 서재
            </button>
          </div>
        </div>
      </div>
      <div className="justify-center grid grid-cols-5">
        {data &&
          data
            // .slice()
            // .reverse()
            .map((h, index) => (
              <div
                className="m-2.5  relative cursor-pointer rounded-lg"
                style={{ backgroundColor: "#FAEED1" }}
                key={index}
                onClick={() => goToLibrary(h.id)}
                onMouseEnter={() => setHoveredIndex(index)} // 호버 시 인덱스 업데이트
                onMouseLeave={() => setHoveredIndex(null)} // 호버 빠져나갈 때 인덱스 초기화
              >
                {/* <div>서재 번호: {h.id}</div> */}
                {/* <div>서재 이름: </div> */}
                {/* <div>: {h.name}</div> */}
                {/* <div>구독자수: {h.subscriberNumber}</div> */}
                <div
                  className="grid grid-cols-2 grid-rows-2"
                  style={{ height: "300px" }}
                >
                  {h.thumbnail1 && (
                    <img
                      className="w-full h-full cursor-pointer border-white border-2  rounded-lg"
                      src={h.thumbnail1 || no_image_img}
                      alt={h.name || "대체 이미지 설명"}
                      width={200}
                      height={200}
                      sizes="100vw"
                      style={{ objectFit: "cover" }}
                      // style={{ width: "100%", height: "auto" }}
                    />
                  )}
                  {h.thumbnail2 && (
                    <img
                      className="w-full h-full cursor-pointer border-white border-2  rounded-lg"
                      src={h.thumbnail2}
                      alt={h.name}
                      width={200}
                      height={200}
                      sizes="100vw"
                      style={{ objectFit: "cover" }}
                      // style={{ width: "100%", height: "auto" }}
                    />
                  )}
                  {h.thumbnail3 && (
                    <img
                      className="w-full h-full cursor-pointer border-white border-2  rounded-lg"
                      src={h.thumbnail3}
                      alt={h.name}
                      width={200}
                      height={200}
                      sizes="100vw"
                      style={{ objectFit: "cover" }}
                      // style={{ width: "100%", height: "auto" }}
                    />
                  )}
                  {h.thumbnail4 && (
                    <img
                      className="w-full h-full cursor-pointer border-white border-2  rounded-lg"
                      src={h.thumbnail4}
                      alt={h.name}
                      width={200}
                      height={200}
                      sizes="100vw"
                      style={{ objectFit: "cover" }}
                      // style={{ width: "100%", height: "auto" }}
                    />
                  )}
                </div>

                {hoveredIndex === index && (
                  <div className="text-center text-white bg-black p-5 absolute bottom-0 right-0  top-27 left-0    bg-black bg-opacity-75 ">
                    <div className="flex justify-center ">
                      <div className="">
                        {/* <div>서재 번호: {h.id}</div> */}
                        <div className="text-xl"> {h.nickname}님의</div>
                        <div className="text-3xl"> {h.name}</div>
                        <div className="text-xl"> 서재 </div>
                        <div>구독자 : {h.subscriberNumber}</div>
                      </div>
                    </div>
                  </div>
                )}
                {/* <div>서재생성일: {h.registeredDate}</div> */}
              </div>
            ))}
      </div>
    </div>
  );
};

export default LibraryPopular;
