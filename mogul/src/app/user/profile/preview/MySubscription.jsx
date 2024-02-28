"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import no_image_img from "@/assets/no_image_img.png";

export function MySubscription({ data }) {
  const router = useRouter();

  const postClick = (id) => {
    router.push(`/library/${id}`);
  };

  const postAllClick = () => {
    router.push(`/library/subscribe`);
  };

  // console.log(data);

  return (
    <div>
      <div className="flex justify-between">
        <div
          className=" mt-4  rounded-full 
  hover:bg-black bg-transparent text-black font-semibold hover:text-yellow-600 py-4 px-8   cursor-pointer m-5 "
          style={{ backgroundColor: "#DED0B6" }}
        >
          내가 구독한 서재
        </div>
        <div
          className="font-bold p-4 px-6 m-4 cursor-pointer"
          onClick={() => postAllClick()}
        >
          더보기
        </div>
      </div>
      <div className="flex grid grid-cols-4">
        {data && data.length > 0 ? (
          data
            .slice(0, 4)
            .reverse()
            .map((h) => {
              return (
                <button
                  className="mr-5 ml-5 mb-5 relative "
                  style={{ backgroundColor: "#FAEED1" }}
                  key={h.id}
                  onClick={() => postClick(h.id)}
                >
                  <div
                    className="grid grid-cols-2 grid-rows-2 "
                    style={{ height: "200px" }}
                  >
                    {h.thumbnail1 && (
                      <img
                        className="w-full h-full border-white border-2 rounded-2xl"
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
                        className="w-full h-full border-white border-2 rounded-2xl"
                        src={h.thumbnail2 || no_image_img}
                        alt={h.name || "대체 이미지 설명"}
                        width={200}
                        height={200}
                        sizes="100vw"
                        style={{ objectFit: "cover" }}
                        // style={{ width: "100%", height: "auto" }}
                      />
                    )}
                    {h.thumbnail3 && (
                      <img
                        className="w-full h-full border-white border-2 rounded-2xl"
                        src={h.thumbnail3 || no_image_img}
                        alt={h.name || "대체 이미지 설명"}
                        width={200}
                        height={200}
                        sizes="100vw"
                        style={{ objectFit: "cover" }}
                        // style={{ width: "100%", height: "auto" }}
                      />
                    )}
                    {h.thumbnail4 && (
                      <img
                        className="w-full h-full border-white border-2 rounded-2xl"
                        src={h.thumbnail4 || no_image_img}
                        alt={h.name || "대체 이미지 설명"}
                        width={200}
                        height={200}
                        sizes="100vw"
                        style={{ objectFit: "cover" }}
                        // style={{ width: "100%", height: "auto" }}
                      />
                    )}
                  </div>
                  <figcaption className="rounded-2xl hover:focus text-center text-white bg-black p-2 bottom-0 right-0 top-27 left-0 bg-black bg-opacity-75">
                    <div className="text-m"> {`"${h.ownerNickname}"님의`} </div>
                    <div className="text-lg font-semibold">
                      {" "}
                      {`"${h.name}"`}
                    </div>
                    {/* <div>구독자수: {h.subscriberNumber}</div> */}
                  </figcaption>
                </button>
              );
            })
        ) : (
          <div>내 서재가 없음</div>
        )}
      </div>
    </div>
  );
}
