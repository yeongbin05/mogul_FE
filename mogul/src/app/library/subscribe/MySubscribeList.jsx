/* eslint-disable */

"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CancelSubscribe from "./CancelSubscribe";
import Image from "next/image";

const MySubscribeList = () => {
  const [libData, setLibData] = useState([]);

  const router = useRouter();

  const token =
    typeof window !== "undefined"
      ? sessionStorage.getItem("accessToken")
      : null;

  useEffect(() => {
    const myLibraryListData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_KEY}/library/subscription?pno=0&count=10`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          }
        );

        if (response.ok) {
          const result = await response.json();

          setLibData(result.data);

          // console.log(result.data);
        } else {
          // console.log("내 서재 리스트 불러오기 실패");
        }
      } catch (error) {
        // console.log("네트워크 오류", error);
      }
    };

    myLibraryListData();
  }, [token]);

  const goToLibrary = (id) => {
    router.push(`/library/${id}`);
  };

  return (
    <div>
      <div>
        <div className=" mt-10 text-3xl  font-bold ml-16">
          내가 구독하는 서재리스트입니다
        </div>
      </div>
      <div className="grid grid-cols-5 grid-rows-2 mt-20 ">
        {libData && libData.length > 0 ? (
          libData
            .slice()
            .reverse()
            .map((h) => {
              return (
                <div>
                  <div
                    className="m-2.5 relative rounded-lg cursor-pointer"
                    style={{
                      backgroundColor: "#FAEED1",
                      // height: "200px",
                      // width: "200px",
                    }}
                    key={h.index}
                    onClick={() => goToLibrary(h.id)}
                    //   onMouseEnter={() => !isDeleteClicked && setHoveredIndex(h.id)}
                    //   onMouseLeave={() => !isDeleteClicked && setHoveredIndex(null)}
                  >
                    <div
                      className="grid grid-cols-2 grid-rows-2 "
                      style={{ height: "300px" }}
                    >
                      {h.thumbnail1 && (
                        <img
                          className="w-full h-full border-white border-2 rounded-lg"
                          src={h.thumbnail1}
                          alt={h.name}
                          width={200}
                          height={200}
                          sizes="100vw"
                          style={{ objectFit: "cover" }}
                          // style={{ width: "100%", height: "auto" }}
                        />
                      )}

                      {h.thumbnail2 && (
                        <img
                          className="w-full h-full border-white border-2 rounded-lg"
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
                          className="w-full h-full border-white border-2 rounded-lg"
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
                          className="w-full h-full border-white border-2 rounded-lg"
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
                  </div>
                  <div className="">{h.ownerNickname}님의</div>

                  <div
                    className="text-2xl "
                    // onMouseEnter={() => handleHover(index)}
                    // onMouseLeave={handleLeave}
                  >
                    {h.name}
                    {/* {hoveredIndex === index && (
                        <FontAwesomeIcon style={{ color: 'grey' }} icon={faPen} />
                         )} */}
                  </div>
                  <div className="mt-2">
                    <CancelSubscribe libId={h.id} />
                  </div>
                </div>
              );
            })
        ) : (
          <div>
            <div className="font-2xl">내가 구독한 서재가 없습니다.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MySubscribeList;
