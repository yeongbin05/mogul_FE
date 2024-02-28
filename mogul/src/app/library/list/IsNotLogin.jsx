"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function IsNotLogin() {
  const router = useRouter();

  const goToLogin = () => {
    router.push(`/user/login`);
  };

  const goToSignUp = () => {
    router.push(`/user/signup`);
  };

  return (
    <div className="text-center p-8 mt-20">
      <div className="text-2xl font-bold text-black">
        <div>서재 정보를 불러오고 있습니다...</div>
      </div>
      <div className=" items-center justify-center mt-16 mb-20">
        <div>
          {/* <button
            onClick={goToLogin}
            className=" w-56 hover:text-white text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            style={{
              backgroundColor: "#BBAB8C",
            }}
          >
            로그인
          </button> */}
        </div>
        <div>
          {/* <button
            onClick={goToSignUp}
            className="mt-6 w-56 hover:text-white text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            style={{
              backgroundColor: "#BBAB8C",
            }}
          >
            회원가입
          </button> */}
        </div>
      </div>
    </div>
  );
}
