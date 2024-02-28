"use client";
/* eslint-disable */

import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LibraryCreateModal from "./LibraryCreateModal";
import DeleteMyLibrary from "./DeleteMyLibrary";
import ChangeLibraryName from "./ChangeLibraryName";
import no_image_img from "@/assets/no_image_img.png";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPen } from "@fortawesome/free-solid-svg-icons";

// const LibraryCreateModal = dynamic(() => import("./LibraryCreateModal"), {ssr:false});
// const ChangeLibraryName = dynamic(() => import("./ChangeLibraryName"), {ssr:false});
// const DeleteMyLibrary = dynamic(() => import("./DeleteMyLibrary"), {ssr:false});

// import Image from "next/image";
// import dynamic from "next/dynamic";

// export const dynamic = "force-dynamic";

const MyLibraryList = () => {
  const [libData, setLibData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [userNickname, setUserNickname] = useState("");

  // const [target, setTarget] = (useState < Element) | (null > null);
  const router = useRouter();

  // const token = sessionStorage.getItem("accessToken");

  // const accessToken =
  //   typeof window !== "undefined"
  //     ? sessionStorage.getItem("accessToken")
  //     : null;

  // const token =
  //   typeof window !== "undefined"
  //     ? sessionStorage.getItem("accessToken")
  //     : null;

  const openModal = async () => {
    setIsModalOpen(true);

    // const addLibraryResponse = await createLibrary();

    // if (addLibraryResponse.ok) {
    //   setIsModalOpen(false);
    //   setLibData([...libData, addLibraryResponse.data]);
    // }
  };

  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const accessToken =
      typeof window !== "undefined"
        ? sessionStorage.getItem("accessToken")
        : null;

    const myLibraryListData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_KEY}/library`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${accessToken}`,
            },
          }
        );

        if (response.ok) {
          const result = await response.json();

          setLibData(result.data);
        } else {
          // console.log("내 서재 리스트 불러오기 실패");
        }
      } catch (error) {
        // console.log("네트워크 오류", error);
      }
    };

    myLibraryListData();
  }, []);

  const myLibrary = (id) => {
    router.push(`/library/${id}`);
  };

  const handleDeleteLibrary = (isModalOpen) => {
    if (isModalOpen !== undefined) {
      setIsModalOpen(isModalOpen);
    } else {
      setHoveredIndex(null);
    }
  };
  const handleHover = (index) => {
    setHoveredIndex(index);
  };

  const handleLeave = () => {
    setHoveredIndex(null);
  };
  return (
    <div>
      <div>
        <div className="text-3xl font-bold text-center mt-5 ">
          {libData && libData.length > 0 ? (
            <div>
              {/* <div>
                &quot;
                {libData[0].nickname}
                &quot; 님(사실 나)의 서재리스트 입니다
              </div> */}
              <div>나의 서재리스트</div>
            </div>
          ) : (
            <div>나의 서재리스트</div>
          )}
        </div>
        <div className="flex justify-between">
          <div className="text-2xl font-bold ml-16"></div>
          <div>
            <button
              onClick={openModal}
              className="hover:bg-transparent bg-black text-white font-semibold hover:text-black py-2 px-8 border border-black rounded-full  mt-10 mb-10 mr-12 ml-auto shadow hover:shadow-black  active:bg-black active:text-white"
            >
              +서재 만들기
            </button>
            <>
              <LibraryCreateModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                closeModal={closeModal}
              />
            </>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-5 grid-rows-2" >
        {libData && libData.length > 0 ? (
          libData
            .slice()
            .reverse()
            .map((h, index) => {
              return (
                <div style={{position:'relative'}}>
                <div onClick={() => myLibrary(h.id)}
                className="m-2.5 cursor-pointer  relative rounded-lg"
                style={{ backgroundColor: "#FAEED1" }}
                key={h.id}
                // onClick={() => goToLibrary(h.id)} 원래는 button자체에 이 이벤트를 달면 하나의 map 요소가 전부 이 함수만 실행되서
                // 서재 이름 수정/ 서재 삭제 기능을 적용할 수 없어서 해결책 나올때까지 주석
                //아래꺼 때문에 자꾸 썸네일 벗어나면 모달꺼져서 isDeleteClicked 추가함
                onMouseEnter={() =>
                  !isDeleteClicked && setHoveredIndex(h.id)
                } // 호버 시 인덱스 업데이트
                onMouseLeave={() =>
                  !isDeleteClicked && setHoveredIndex(null)
                }>
                  
                     {/* // isDeleteClicked가 false일 때만 작동 // 호버 빠져나갈 때 인덱스 초기화 */}
                  
                    <div
                      className="grid grid-cols-2 grid-rows-2 "
                      style={{ height: "300px" }}
                    >
                      {h.thumbnail1 && (
                        <img
                          className="w-full h-full border-white border-2 rounded-lg "
                          src={h.thumbnail1 || no_image_img}
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
                          className="w-full h-full border-white border-2 rounded-full rounded-lg"
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
                  <div
                    className="flex justify-between mx-4"
                    onMouseEnter={() => handleHover(index)}
                    onMouseLeave={handleLeave}
                  >
                    <div className="flex truncate">
                      <div
                        className="text-xl flex items-center"
                        // onMouseEnter={() => handleHover(index)}
                        // onMouseLeave={handleLeave}
                      >
                        {h.name}
                        {/* {hoveredIndex === index && (
                        <FontAwesomeIcon style={{ color: 'grey' }} icon={faPen} />
                         )} */}
                      </div>

                      <div>
                        <ChangeLibraryName
                          libraryId={h.id}
                          libraryName={h.name}
                          hoveredIndex={hoveredIndex}
                          setHoveredIndex={setHoveredIndex}
                          onClose={handleDeleteLibrary}
                          isDeleteClicked={isDeleteClicked}
                          setIsDeleteClicked={setIsDeleteClicked}
                        />{" "}
                      </div>
                    </div>
                    <div className=" text-sm " style={{position:'absolute',top:'-10px',right:'-10px'}}>
                      <DeleteMyLibrary
                        libraryId={h.id}
                        libraryName={h.name}
                        hoveredIndex={hoveredIndex}
                        setHoveredIndex={setHoveredIndex}
                        onClose={handleDeleteLibrary}
                        isDeleteClicked={isDeleteClicked}
                        setIsDeleteClicked={setIsDeleteClicked}
                      />
                    </div>
                         
                  </div>
                  <div className="flex justify-between mx-4 mb-8">
                    <div className="text-sm flex items-center font-bold">
                      구독  {h.subscriberNumber}
                    </div>
                  </div>
                  <div
                    onMouseEnter={() =>
                      !isDeleteClicked && setHoveredIndex(h.id)
                    } // 호버 시 인덱스 업데이트
                    onMouseLeave={() =>
                      !isDeleteClicked && setHoveredIndex(null)
                    }
                  ></div>
                </div>
              );
            })
        ) : (
          <div>
            <h1>내 서재가 없습니다.</h1>
          </div>
        )}

      </div>
    </div>
  );
};

export default MyLibraryList;
