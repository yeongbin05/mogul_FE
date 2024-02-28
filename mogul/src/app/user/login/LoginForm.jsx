"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const LoginForm = () => {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  // 비밀번호
  const [password, setPassword] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);

  // 이메일 아이디
  const [userEmail, setUserEmail] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // 비밀번호1보이기 setter
  const handlePasswordShow = (e) => {
    setPasswordShow(!passwordShow);
  };

  // 라우터 정의
  const router = useRouter();

  // 로그인 함수
  const login = async (e) => {
    e.preventDefault();
    if (userEmail && password) {
      try {
        const response = await fetch(`${API_KEY}/user/login`, {
          method: "POST",
          credentials: "include", // 클라이언트와 서버가 통신할때 쿠키와 같은 인증 정보 값을 공유하겠다는 설정
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userEmail,
            password: password,
          }),
        });
        if (response.ok) {
          const accessToken = response.headers.get("Authorization");
          sessionStorage.setItem("accessToken", accessToken);
          const data =  await response.json();
          sessionStorage.setItem("nickname", data.data);
          router.push("/");

          alert("환영합니다.");
        } else {
          alert("이메일 아이디/비밀번호를 확인해주세요.");
        }
      } catch (error) {
        alert("네트워크 오류.");
      }
    } else {
      alert("이메일 아이디와 비밀번호를 모두 입력해주세요.");
    }
  };

  // 엔터키 이벤트 발생 함수
  const handleEnterKeyPress = (e, func) => {
    if (e.key === "Enter") {
      login(e);
    }
  };

  return (
    <div>
      {/* 로그인 form */}
      <form
        className="shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4"
        style={{
          backgroundColor: "#FDF7E4",
          border: "1px solid #DED0B6",
        }}
      >
        <div className="w-full max-w-xs">
          {/* 이메일 input */}
          <div className="mb-2">
            {" "}
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              이메일 아이디
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="example@mogul.com"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              onKeyDown={handleEnterKeyPress}
            />
          </div>

          {/* 비밀번호 input */}
          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              비밀번호
            </label>
            <div className="flex">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type={passwordShow ? "text" : "password"}
                placeholder={passwordShow ? "password" : "********"}
                value={password}
                onChange={handlePasswordChange}
                onKeyDown={handleEnterKeyPress}
              />
              <button
                onClick={handlePasswordShow}
                className="w-32 text-xs hover:text-white text-black font-bold rounded focus:outline-none focus:shadow-outline"
                type="button"
                style={{
                  backgroundColor: "#DED0B6",
                }}
              >
                {passwordShow ? "숨기기" : "보이기"}
              </button>
            </div>
          </div>

          {/* 로그인 버튼 */}
          <div className="flex items-center justify-center mb-2">
            <button
              onClick={login}
              className="mt-4 w-full hover:text-white text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              style={{
                backgroundColor: "#BBAB8C",
              }}
            >
              로그인하기
            </button>
          </div>
          <div className="text-center mt-5">
            <p>아직 계정이 없으신가요?</p>
            <a className="hover:underline font-semibold" href="/user/signup">
              회원가입
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
