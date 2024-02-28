"use client";

import React, { useState,useEffect } from "react";
import { useRouter } from "next/navigation";

const SubscribeThisLibrary = ({ libraryId }) => {
  const router = useRouter();
  const [subscribed, setSubscribed] = useState(false);
  const [libData, setLibData] = useState({ webtoons: [], library: {} });
  const [libDatas, setLibDatas] = useState([]);
  const [libId, setLibId] = useState();
  const token =
    typeof window !== "undefined"
      ? sessionStorage.getItem("accessToken")
      : null;

  const subscribe = async (e) => {
    // 토큰이 없으면 로그인 페이지로 이동
    if (!token) {
      alert("로그인이 필요합니다");
      router.push("/user/login");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/library/subscription`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            libraryId: libraryId,
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        // console.log(result.status);

        if (result.status === 200) {
          alert("이 서재를 구독했습니다");
          setSubscribed(true);
        } else if (result.status === 404) {
          alert("이미 구독 중인 서재입니다.");
        } else alert("자신의 서재는 구독할 수 없습니다.");
      } else {
        console.error("서재 구독에 실패했습니다.");
      }
    } catch (error) {
      // console.log("네트워크 에러로 서재 구독에 실패했습니다.");
      // console.log(error);
    }
  };
  const unsubscribe = async (e) => {
    // 토큰이 없으면 로그인 페이지로 이동
    if (!token) {
      alert("로그인이 필요합니다");
      router.push("/user/login");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/library/subscription`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            libraryId: libraryId,
          }),
        }
      );

      if (response.ok) {
        alert('구독 취소했습니다')
        window.location.reload();
      } else {
        console.error("서재 구독취소에 실패했습니다.");
      }
    } catch (error) {
      // console.log("네트워크 에러로 서재 구독에 실패했습니다.");
      // console.log(error);
    }
  };
  useEffect(() => {
    const myLibrarySubscription = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_KEY}/library/subscription?pno=0&count=100`,
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
          const ids = result.data.map(item=>item.id);
          setLibDatas(ids);

          // console.log(result.data);
        } else {
          // console.log("내 서재 리스트 불러오기 실패");
        }
      } catch (error) {
        // console.log("네트워크 오류", error);
      }
    };

    myLibrarySubscription();
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
          setLibId(result.data.library.id)
        } else {
          // console.log("내 서재 리스트 불러오기 실패");
        }
      } catch (error) {
        // console.log("네트워크 오류", error);
      }
    };

    myLibraryListData();
  }, [libraryId, token]);
  const moveToSubscribedLibrary = () => {
    const confirmMove = window.confirm("내가 구독한 서재로 이동하시겠습니까?");
    if (confirmMove) {
      router.push("/library/subscribe");
    }
    else {
      window.location.reload();
    }
  };

  return (
    <div>
        {libDatas.includes(libId) ? (
            <button
            onClick={unsubscribe}

            className="hover:bg-transparent text-black font-semibold hover:text-black py-2 px-6 border-black border-2 rounded-full mr-16 mx-4 mb-7 mt-5"
        >
          구독 취소하기
        </button>
        ) : (
            <button
                onClick={subscribe}
                className="hover:bg-transparent text-black font-semibold hover:text-black py-2 px-6 border-black border-2 rounded-full mr-16 mx-4 mb-7 mt-5"
            >
                이 서재 구독하기
            </button>
        )}
      
        {subscribed && moveToSubscribedLibrary()}
    </div>
);

};

export default SubscribeThisLibrary;
