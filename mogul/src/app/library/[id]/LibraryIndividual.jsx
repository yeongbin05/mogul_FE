"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AddWebtoonModal from "./AddWebtoonModal";
import MyWebtoonThumbnailCard from "./MyWebtoonThumbnailCard";
import SubscribeThisLibrary from "./SubscribeThisLibrary";

const LibraryIndividual = ({ libraryId }) => {
  const [libData, setLibData] = useState({ webtoons: [], library: {} });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nicknameValue, setNicknameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const router = useRouter();
  const token =
    typeof window !== "undefined"
      ? sessionStorage.getItem("accessToken")
      : null;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (token) {
      const fetchProfileInfo = async () => {
        try {
          const response = await fetch(
            process.env.NEXT_PUBLIC_API_KEY + "/user/profile/info",
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

            setEmailValue(result.data.email);
            setNicknameValue(result.data.nickname);
            // console.log("프로필 성공");
          } else {
            // console.log('프로필 정보 불러오기 실패');
          }
        } catch (error) {
          // console.log("네트워크 오류로 프로필 정보 불러오기 실패");
        }
      };

      fetchProfileInfo();
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    const myLibraryListData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_KEY}/library/${libraryId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
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
  }, [libraryId, token]);

  const handleAddWebtoon = () => {
    if (token) {
      openModal();
    } else {
      alert("로그인이 필요합니다");
      router.push("/user/login"); // 토큰이 없으면 로그인 페이지로 이동
    }
  };

  return (
    <div>
      <div>
        <div>
          <div className="flex justify-between">
            <div className="text-3xl text-center font-bold ml-10 mt-5 mb-4">
              &quot;{libData && libData.library.nickname}&quot; 님의 &quot;
              {libData && libData.library.name}&quot; 서재
            </div>
            <div>
              {token !== null && libData.library.nickname === nicknameValue && (
                <button
                  onClick={handleAddWebtoon}
                  className="hover:bg-transparent text-black font-semibold hover:text-black py-2 px-6 border-black border-2 rounded-full mr-16 mx-4 mb-7 mt-5"
                >
                  + 웹툰 추가
                </button>
              )}

              <AddWebtoonModal
                isOpen={isModalOpen}
                closeModal={closeModal}
                libraryId={libraryId}
              />
              {token !== null && libData.library.nickname !== nicknameValue && (
                <SubscribeThisLibrary libraryId={libraryId} />
              )}
            </div>
          </div>
        </div>

        {libData.webtoons && libData.webtoons.length ? (
          <div className="grid grid-cols-5 gap-10 mx-10 mt-16 mb-16">
            {libData.webtoons.map((myWebtoon, index) => (
              <MyWebtoonThumbnailCard
                key={index}
                myWebtoon={myWebtoon}
                libraryId={libraryId}
                nickname={libData.library.nickname}
              />
            ))}
          </div>
        ) : (
          <div className="text-2xl mt-52 mb-60">빈 서재입니다.</div>
        )}

        {/* <div className="flex">
          <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-lg flex-grow flex items-center justify-center">
            <div
              className="px-4 py-4 rounded-full border-4 border-black hover:text-white hover:bg-black"
              onClick={handleAddWebtoon}
            >
              <div className="font-bold text-2xl mb-1 cursor-pointer">웹툰 추가 +</div>
              <p className="text-sm text-gray-700 text-base"></p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default LibraryIndividual;
