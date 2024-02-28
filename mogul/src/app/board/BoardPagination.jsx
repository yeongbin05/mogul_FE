"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const BoardPaginaiton = ({ length, listNum }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const [pno, setPno] = useState(0);
  const [data, setData] = useState([]);
  // const accessToken = sessionStorage.getItem("accessToken");
  const [countLength, setCountLength] = useState(0);

  const accessToken =
    typeof window !== "undefined"
      ? sessionStorage.getItem("accessToken")
      : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_KEY}/board/count`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${accessToken}`,
            },
          }
        );

        if (response.ok) {
          const result = await response.json();
          // console.log(result, "board");

          setCountLength(result.data);
        } else {
          console.error("게시글 불러오기오류");
        }
      } catch (error) {
        console.error("네트워크 오류", error.message);
      }
    };

    fetchData();
  }, []);

  const count = 10; // 한 페이지에 몇개인가
  const totalPage = 5; // 총페이지 갯수?
  const totalPages = Math.ceil(countLength / count);
  const maxPagesToShow = 10; // 표시할 최대 페이지 수
  const currentPageIndex = pno;

  const routeConfirm = () => {
    if (listNum * 10 <= boardLength) {
      setPno(math.round(boardLength / 10));
    } else {
      return;
    }
  };

  useEffect(() => {
    //만약 pno가 최댓값이면 count개수를 남는크기로 하고싶엉 에휴

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_KEY}/board?pno=${pno}&count=${count}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${accessToken}`,
            }, // 헤더 추가
          }
        );

        if (response.ok) {
          const result = await response.json();
          setData(result.data);
        } else {
          console.error(
            "게시글 불러오기오류",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("네트워크 오류", error.message);
      }
    };

    fetchData();
  }, [pno, count]);

  useEffect(() => {
    setCurrentPage(pno + 1);
  }, [pno]);

  const PostClick = (id) => {
    router.push(`/board/detail/${id}`);
  };

  const handlePageClick = (page) => {
    setPno(page - 2); // 페이지 번호는 0부터 시작하므로 1을 빼줍니다.
  };

  const handlePrevClick = () => {
    if (currentPage > 0) {
      setPno(currentPage - 2);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setPno(currentPage);
    }
  };
  const handleEndClick = () => {
    // console.log(totalPages, "끝");
    setPno(totalPages - 1); // 마지막 페이지로 이동합니다.
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const middlePageIndex = Math.floor(maxPagesToShow / 2);
    let startPageIndex = Math.max(0, currentPageIndex - middlePageIndex);
    let endPageIndex = Math.min(
      totalPages - 1,
      startPageIndex + maxPagesToShow - 1
    );
    startPageIndex = Math.max(0, endPageIndex - maxPagesToShow + 1);

    for (let i = startPageIndex; i <= endPageIndex; i++) {
      const pageNumber = i + 1; // 실제 페이지 번호를 계산합니다.
      pageNumbers.push(
        <button
          key={i}
          className={`m-1 px-4 py-2 rounded-full shadow hover:shadow-black ${
            pageNumber === currentPage ? "bg-gray-300 font-bold" : "bg-white "
          }`}
          onClick={() => handlePageClick(pageNumber + 1)}
          style={{ backgroundColor: "#FDF7E4" }}
        >
          {pageNumber}
        </button>
      );
    }

    return pageNumbers;
  };

  const goToWriteBoard = () => {
    router.push("/board/create");
  };

  return (
    <div className="mx-auto">
      <div className="flex justify-start items-center mt-6 mx-6">
        <div
          className=" hover:bg-black  text-black font-semibold hover:opacity-80 py-2 px-6  rounded-full  mt-2 mr-2"
          style={{ backgroundColor: "#FDF7E4" }}
        >
          자유
        </div>
        {/* <button
          className=" hover:bg-black  text-black font-semibold hover:text-yellow-600 py-1 px-4  rounded-full  mt-2"
          style={{ backgroundColor: "#FDF7E4" }}
        >
          공지
        </button> */}

        {/* <button
          className="hover:bg-transparent bg-black text-white font-semibold hover:text-black py-1 px-6 border border-black rounded-full mt-2 mr-2 ml-auto"
          onClick={goToWriteBoard}
        >
          글쓰기
        </button> */}
        {accessToken !== null && ( // accessToken이 null이 아닌 경우에만 버튼을 렌더링합니다.
          <button
            className="hover:bg-transparent bg-black text-white font-semibold hover:text-black py-2 px-8 border border-black rounded-full  mt-2 mr-2 ml-auto shadow hover:shadow-black  active:bg-black active:text-white"
            onClick={goToWriteBoard}
          >
            글쓰기
          </button>
        )}
      </div>
      <div className=" flex flex-col  items-center  ">
        <div>
          <div
            className="  grid grid-cols-8 gap-1 justify-center text-center p-4 rounded-full 
            hover:bg-black bg-transparent text-black font-semibold  px-6 rounded mb-2 mx-4 mt-3"
            //스타일 속성을 이런식으로 지정하면 위의 호버시 스타일은 안 먹히는 듯
            style={{ backgroundColor: "#FAEED1" }}
          >
            <div className="col-span-1">글번호</div>
            <div className="col-span-3">제목</div>
            <div className="col-span-1">작성자</div>
            <div className="col-span-1">조회수</div>
            <div className="col-span-2">작성일</div>
          </div>
          {data &&
            data.map((d, index) => {
              const separate = d.editedDate.split("T");
              const day = separate[0];
              const time = separate[1].substring(0, 8);

              return (
                <div
                  className="grid grid-cols-8 gap-1 justify-center  p-4 rounded-full 
              hover:bg-black bg-transparent text-black font-semibold hover:opacity-80 py-2 px-8 mb-2 cursor-pointer mx-4 shadow hover:shadow-black "
                  //아래 색은 우리 커스텀 색상입니다. 테일윈드로 커스텀해서 적용하기
                  //번거로울 것 같아서 이렇게  스타일 지정합니다.
                  style={{
                    backgroundColor: "#FAEED1",
                    width: "800px",
                    maxWidth: "100%",
                  }}
                  key={index}
                  onClick={() => PostClick(d.id)}
                >
                  <div className="col-span-1 flex items-center justify-center h-full">
                    {d.id}
                  </div>
                  <div className="col-span-3  items-center justify-center h-full  text-ellipsis truncate text-left ">
                    {d.title}
                  </div>
                  <div className="col-span-1 flex items-center justify-center text-ellipsis h-full truncate text-left">
                    {d.user.nickname.length > 5
                      ? `${d.user.nickname.slice(0, 5)}`
                      : d.user.nickname}
                  </div>
                  <div className="col-span-1 flex items-center justify-center h-full">
                    {d.hit}
                  </div>
                  <div className="col-span-2 flex items-center justify-center h-full ">
                    {day} {time}
                  </div>
                  {/* <div className="flex items-center justify-center h-full col-span-2">
                  {day} {time}
                </div> */}
                </div>
              );
            })}
        </div>
        <div className="m-10">
          <button
            className="mx-1 px-4 py-2 font-bold cursor-pointer rounded-full shadow hover:shadow-black"
            style={{ backgroundColor: "#FDF7E4" }}
            onClick={handlePrevClick}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>
          {renderPageNumbers()}
          <button
            className="mx-1 px-4 py-2 font-bold cursor-pointer rounded-full shadow hover:shadow-black"
            style={{ backgroundColor: "#FDF7E4" }}
            onClick={handleNextClick}
            disabled={currentPage === totalPages}
          >
            {">"}
          </button>
          <button
            className="mx-1 px-4 py-2 font-bold cursor-pointer rounded-full shadow hover:shadow-black"
            style={{ backgroundColor: "#FDF7E4" }}
            onClick={handleEndClick}
          >
            {"끝"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardPaginaiton;
