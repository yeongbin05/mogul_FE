"use client";
import React from "react";
import { useRouter } from "next/navigation";

const CancelSubscribe = ({ libId }) => {
  const router = useRouter();

  const token =
    typeof window !== "undefined"
      ? sessionStorage.getItem("accessToken")
      : null;

  const cancel = async () => {
    // console.log(libId);
    // console.log(token);
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
            libraryId: libId,
          }),
        }
      );

      if (response.ok) {
        // console.log("서재 구독 취소 성공");
        alert("해당 서재 구독이 취소되었습니다.");
        window.location.href = "/library/subscribe";
        // router.push("/library/subscribe");
      } else {
        console.error("서재 구독 취소 실패");
      }
    } catch (error) {
      // console.log("네트워크 오류로 서재 구독 취소 실패", error);
    }
  };

  return (
    <div>
      <button className="rounded-full  hover:bg-white p-1.5" onClick={cancel}>
        구독취소
      </button>
    </div>
  );
};

export default CancelSubscribe;
