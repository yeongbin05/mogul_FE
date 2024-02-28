// export const dynamic = "force-dynamic";
"use client";

import React from "react";
import { useRouter } from "next/navigation";

export function MyAllComment({ data }) {
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
          내가 쓴 댓글
        </div>
        <div className="font-bold p-4 px-6 m-4"></div>
      </div>
      <div>
        {data &&
          data.map((d, index) => {
            //if문 없으면 자꾸 undefined를 seperate 못한다고함 짜증나게
            if (d.registeredDate && d.user && d.user.nickname) {
              const separate = d.registeredDate.split("T");
              const day = separate[0];
              const time = separate[1].substring(0, 8);
              return (
                <div
                  className="grid grid-cols-5 gap-1 justify-center  rounded-full 
                  hover:bg-black bg-transparent text-black font-semibold hover:text-yellow-600 py-2.5 px-6  cursor-pointer mr-5 ml-5 mb-5"
                  style={{ backgroundColor: "#DED0B6" }}
                  key={index}
                  onClick={() => postClick(d.article.id)}
                >
                  <div className="col-span-1 flex items-center justify-center h-full">
                    {d.id}
                  </div>
                  <div className="col-span-2  items-center justify-center h-full  text-ellipsis truncate text-left">
                    {d.content}
                  </div>
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
    </div>

    // 아래는 디자인 수정 전 코드인데 왜 수정하고 깜빡임이 더 생긴것 같죠..

    // <div>
    //   <div>
    //     {data &&
    //       data.map((d, index) => {
    //         //if문 없으면 자꾸 undefined를 seperate 못한다고함 짜증나게
    //         if (d.registeredDate) {
    //           const separate = d.registeredDate.split("T");
    //           const day = separate[0];
    //           const time = separate[1].substring(0, 8);
    //           return (
    //             <div
    //               className="grid grid-cols-6 gap-1 justify-center  p-4 rounded-full
    //   hover:bg-black bg-transparent text-black font-semibold hover:text-yellow-600 py-1 px-6 mb-2 cursor-pointer mx-4 "
    //               style={{ backgroundColor: "#FAEED1" }}
    //               key={index}
    //               // onClick={() => postClick(d.id)}
    //             >
    //               <div className="col-span-1 flex items-center justify-center h-full">
    //                 {d.id}
    //               </div>
    //               <div className="col-span-2  items-center justify-center h-full  text-ellipsis truncate text-left">
    //                 {d.content}
    //               </div>
    //               <div className="col-span-2 flex items-center justify-center h-full">
    //                 {d.nickname}
    //               </div>
    //               <div className="col-span-1 flex items-center justify-center h-full">
    //                 {day}
    //               </div>
    //             </div>
    //           );
    //         }
    //       })}
    //   </div>
    // </div>
  );
}
