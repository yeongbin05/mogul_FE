"use client";
// import WebtoonWrapperSearch from "@/components/webtoon/WebtoonWrapperSearch";
import no_image_img from "@/assets/no_image_img.png";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const AddWebtoonModal = ({ isOpen, closeModal, libraryId }) => {
  const [searchResultWebtoonTitle, setSearchResultWebtoonTitle] = useState([]);
  const [webtoonId, setWebtoonId] = useState("");
  const [keyword, setKeyword] = useState("");
  const [showLastbutton, setShowLastButton] = useState(false);
  const [data, setData] = useState([]);
  const router = useRouter();
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const [searchBoolean, setSearchBoolean] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);

  const token =
    typeof window !== "undefined"
      ? sessionStorage.getItem("accessToken")
      : null;

  const AddWebtoon = async (e) => {
    console.log(webtoonId);

    if (webtoonId === null || webtoonId === "") {
      alert("추가할 웹툰을 선택해주세요");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/library/${libraryId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            id: libraryId,
            webtoonId: webtoonId,
          }),
        }
      );

      if (response.ok) {
        const result = response.json();
        // console.log(result);
        // console.log(result.data);
        // console.log("내 서재에 웹툰 추가 성공");
        alert("내 서재에 웹툰이 추가되었습니다.");
        const currentPath = window.location.pathname;
        window.location.href = currentPath;
        closeModal(); // 모달 닫기
        setWebtoonId(null);
        // router.refresh(); // 화면 새로고침
      } else {
        console.error("내 서재에 웹툰 추가 실패");
      }
    } catch (error) {
      // console.log("네트워크 에러");
    }
  };

  const searchWebtoon = async () => {
    // console.log(keyword);

    if (keyword === null || keyword === "") {
      alert("키워드를 입력하고 검색해주세요.");
      return;
    }

    setSearchBoolean(true);
    setLoading(true);
    try {
      const response = await fetch(
        `${API_KEY}/search/webtoon?keyword=${keyword}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        // console.log(result);
        // console.log(result.data);
        // setData(result)
        setSearchResultWebtoonTitle(result.data.title);
        setShowLastButton(true);
      } else {
      }
    } catch (error) {
      alert("검색 중 오류 발생");
      // console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const setLibId = (id) => {
    if (webtoonId === null) {
      setWebtoonId(id);
      // console.log(webtoonId);
    } else if (webtoonId !== null && id !== webtoonId) {
      setWebtoonId(id);
      // console.log(webtoonId);
    } else {
      setWebtoonId(null);
      // console.log(webtoonId);
    }

    // console.log(webtoonId);
  };

  const close = () => {
    setSearchResultWebtoonTitle([]);
    setKeyword("");
    closeModal();
    setSearchBoolean(false);
    setShowLastButton(false);
  };

  return (
    <div style={{ display: isOpen ? "block" : "none" }}>
      <div>
        {isOpen && (
          // <div className="modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 bg-white shadow-md z-50 overflow-y-auto h-full">
          <div
            className={`modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 bg-white shadow-md z-50 overflow-y-auto ${
              searchResultWebtoonTitle.length > 0 ? "h-full" : "h-[2/1]"
            }`}
          >
            <div className="overflow-auto ">
              <div className="text-center text-lg font-bold mb-4">
                웹툰을 제목으로 검색합니다.
              </div>
              <input
                className="w-full mb-4 p-2 border border-b-4 border-black rounded-full text-center"
                type="text"
                placeholder="키워드를 입력해주세요."
                // value={webtoonId}
                // onChange={(e) => setWebtoonId(e.target.value)}
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                    searchWebtoon();
                  }
                }}
              />
              <div className=" justify-center space-x-4 mb-2">
                <button
                  type="button"
                  onClick={searchWebtoon}
                  className="bg-black hover:bg-white hover:border-black text-white font-semibold hover:text-black py-1 px-4 border hover:border-transparent rounded-full text-center"
                >
                  웹툰 제목으로 검색
                </button>
              </div>
              {/* {searchResultWebtoonTitle.length > 0 ? (
                <WebtoonWrapperSearch webtoons={searchResultWebtoonTitle} />
              ) : (
                <div className="mx-10 my-20">
                  <div className="mx-10 text-center">
                    <span className="text-xl font-semibold">
                      검색 결과가 없어요..
                    </span>
                  </div>
                </div>
              )} */}

              <div className="justify-center grid grid-cols-4 overflow-x-auto h-full">
                {searchResultWebtoonTitle.length > 0 ? (
                  searchResultWebtoonTitle
                    .slice()
                    .reverse()
                    .map((h, index) => (
                      <div
                        className="m-2.5  relative cursor-pointer rounded-lg "
                        style={{ backgroundColor: "#FAEED1" }}
                        key={index}
                        onClick={() => setLibId(h.webtoon_id)}
                        // onMouseEnter={() => setHoveredIndex(index)}
                        // onMouseLeave={() => setHoveredIndex(null)}
                      >
                        <div
                          className=""
                          // style={{ height: "100px" }}
                        >
                          {h.thumbnail && (
                            <div className="">
                              {webtoonId !== h.webtoon_id ? (
                                <div>
                                  <img
                                    className="w-full h-full cursor-pointer border-white border-2  rounded-lg"
                                    src={h.thumbnail || no_image_img}
                                    alt={h.title || "대체 이미지 설명"}
                                    width={200}
                                    height={200}
                                    sizes="100vw"
                                    style={{ objectFit: "cover" }}
                                    // style={{ width: "100%", height: "auto" }}
                                  />
                                  <div>{h.title}</div>
                                </div>
                              ) : (
                                <div className="border-4 border-black rounded-xl">
                                  <img
                                    className="w-full h-full cursor-pointer rounded-xl"
                                    src={h.thumbnail || no_image_img}
                                    alt={h.title || "대체 이미지 설명"}
                                    width={200}
                                    height={200}
                                    sizes="100vw"
                                    style={{ objectFit: "cover" }}
                                    // style={{ width: "100%", height: "auto" }}
                                  />
                                  <div>{h.title}</div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="text-xl items-center justify-center font-bold col-span-4 text-center">
                    {searchBoolean && !loading ? (
                      <div className=" text-lg mt-4 items-center justify-center font-bold text-center">
                        검색 결과가 없습니다.
                      </div>
                    ) : null}
                  </div>
                )}
              </div>

              {showLastbutton === true &&
              searchResultWebtoonTitle.length > 0 ? (
                <div className="mt-5 mb-5">
                  <button
                    type="button"
                    onClick={AddWebtoon}
                    className="bg-black hover:bg-white hover:border-black text-white font-semibold hover:text-black py-2 px-4 border hover:border-transparent rounded-full text-center mr-2"
                  >
                    웹툰 추가
                  </button>
                  <button
                    // onClick={closeModal}
                    onClick={close}
                    className="bg-gray-300 text-gray-700 py-2 font-bold hover:bg-white px-4 rounded-full text-center"
                  >
                    닫기
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        )}

        {isOpen && (
          <div
            className="overlay fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
            // onClick={closeModal}
            onClick={close}
          ></div>
        )}
      </div>
    </div>
  );
};

export default AddWebtoonModal;
