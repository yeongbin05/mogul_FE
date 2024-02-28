// export const dynamic = "force-dynamic";
"use client";

import React from "react";
import { useRouter } from "next/navigation";

export function MyAllBoard({ data }) {
  const router = useRouter();
  const postClick = (id) => {
    router.push(`/board/detail/${id}`);
  };

  return (
    <div>
      <div className="flex justify-between">
        <div
          className=" mt-4  rounded-full 
      hover:bg-black bg-transparent text-black font-semibold hover:text-yellow-600 py-4 px-8   cursor-pointer m-5 "
          style={{ backgroundColor: "#DED0B6" }}
        >
          내가 쓴 게시글
        </div>
        <div className="font-bold p-4 px-6 m-4"></div>
      </div>
      <div>
        {data &&
          data.map((d, index) => {
            //if문 없으면 자꾸 undefined를 seperate 못한다고함 짜증나게
            if (d.editedDate && d.user && d.user.nickname) {
              const separate = d.editedDate.split("T");
              const day = separate[0];
              const time = separate[1].substring(0, 8);
              return (
                <div
                  className="grid grid-cols-5 gap-1 justify-center  rounded-full 
        hover:bg-black bg-transparent text-black font-semibold hover:text-yellow-600 py-2.5 px-6  cursor-pointer mr-5 ml-5 mb-5 "
                  style={{ backgroundColor: "#DED0B6" }}
                  key={index}
                  onClick={() => postClick(d.id)}
                >
                  <div className="col-span-1 flex items-center justify-center h-full">
                    {d.id}
                  </div>
                  <div className="col-span-2  items-center justify-center h-full  text-ellipsis truncate text-left">
                    {d.title}
                  </div>
                  {/* 미리보기인데 내용은 필요없죠? */}
                  {/* <div className="col-span-2 flex items-center justify-center h-full">
                    {d.nickname}
                  </div> */}
                  <div className="col-span-1 flex items-center justify-center h-full">
                    {d.user.nickname}
                  </div>
                  <div className="col-span-1 flex items-center justify-center h-full">
                    {day}
                  </div>
                </div>
              );
            }
          })}
      </div>
      <div className="mb-4"></div>
    </div>
  );
}
