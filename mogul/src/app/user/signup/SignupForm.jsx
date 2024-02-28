"use client";

import { faL } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";

const SignupForm = () => {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const router = useRouter();

  // 비밀번호
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);
  const [password1Show, setPassword1Show] = useState(false);
  const [password2Show, setPassword2Show] = useState(false);

  // 이메일
  const [userEmail, setUserEmail] = useState("");
  const [isUserEmailDuplicate, setIsUserEmailDuplicate] = useState(null);
  const [userEmailCheck, setUserEmailCheck] = useState(null);

  // 닉네임
  const [nickname, setNickname] = useState("");
  const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(null);

  // 유저 이메일 setter
  const handleUserEmailChange = (e) => {
    setUserEmail(e.target.value);
    setIsUserEmailDuplicate(null);
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (regex.test(e.target.value)) {
      setUserEmailCheck(true);
    } else {
      setUserEmailCheck(false);
    }
  };

  // 비밀번호1 setter
  const handlePassword1Change = (e) => {
    setPassword1(e.target.value);
    handlePasswordValid(e.target.value);
    if (password2) {
      setPasswordMatch(e.target.value === password2);
    }
  };

  // 비밀번호2 setter
  const handlePassword2Change = (e) => {
    setPassword2(e.target.value);
    setPasswordMatch(password1 === e.target.value);
  };

  // 닉네임 setter
  const handleNicknameChange = (e) => {
    setIsNicknameDuplicate(null);
    setNickname(e.target.value);
  };

  // 비밀번호1 보기 setter
  const handlePassword1Show = (e) => {
    setPassword1Show(!password1Show);
  };

  // 비밀번호2 보기 setter
  const handlePassword2Show = (e) => {
    setPassword2Show(!password2Show);
  };

  // 회원가입 완료 버튼 클릭 이벤트 함수
  const Signup = async (e) => {
    e.preventDefault();
    if (
      userEmail &&
      userEmailCheck &&
      isUserEmailDuplicate === false &&
      passwordValid &&
      passwordMatch &&
      nickname &&
      isNicknameDuplicate === false
    ) {
      try {
        const response = await fetch(`${API_KEY}/user/join`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userEmail,
            password: password2,
            nickname: nickname,
          }),
        });

        if (response.ok) {
          alert("회원가입에 성공했습니다.");
          router.push("/user/login");
        } else {
          alert("회원가입 실패.");
        }
      } catch (error) {
        alert("네트워크 오류.");
      }
    } else {
      alert("미작성된 부분이 없는지, 중복검사를 했는지 확인해주세요");
    }
  };

  // 유저 이메일 중복 확인 함수
  const checkUserEmailDuplicate = async (email) => {
    if (userEmailCheck) {
      try {
        const response = await fetch(`${API_KEY}/user/duplication/email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const status = response.status;
        if (status === 200) {
          alert(`${userEmail}은 사용 가능한 이메일입니다.`);
          setIsUserEmailDuplicate(false);
        } else {
          if (status === 400) {
            alert(`${userEmail}은 중복 이메일입니다.`);
            setIsUserEmailDuplicate(true);
          } else {
            alert("중복 검사 중 오류가 발생했습니다.");
          }
        }
      } catch (error) {
        alert("이메일 중복 검사 중 오류가 발생했습니다.");
      }
    } else {
      alert("이메일 형식을 지켜주세요");
    }
  };

  // 유저 이메일 중복버튼 클릭 이벤트 함수
  const handleUserEmailDuplicateCheck = () => {
    if (!userEmail) {
      alert("이메일을 입력하세요.");
      return;
    }
    checkUserEmailDuplicate(userEmail);
  };

  const handlePasswordValid = (password) => {
    const reg =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_!@#$])[A-Za-z\d@$!%*?&]{8,45}$/;
    if (reg.test(password)) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  };

  // 유저 닉네임 중복 확인 함수
  const checkNicknameDuplicate = async (nickname) => {
    try {
      const response = await fetch(`${API_KEY}/user/duplication/nickname`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nickname }),
      });

      const status = response.status;
      if (status === 200) {
        setIsNicknameDuplicate(false);
        alert(`${nickname}은 사용 가능한 닉네임입니다.`);
      } else {
        if (status === 400) {
          setIsNicknameDuplicate(true);
          alert(`${nickname}은 중복 닉네임입니다.`);
        } else {
          alert("중복 검사 중 오류가 발생했습니다.");
        }
      }
    } catch (error) {
      alert("닉네임 중복 검사 중 오류가 발생했습니다.");
    }
  };

  // 닉네임 중복버튼 클릭 이벤트 함수
  const handleNicknameCheck = () => {
    if (!nickname) {
      alert("닉네임을 입력하세요.");
      return;
    }
    checkNicknameDuplicate(nickname);
  };

  // 엔터키 이벤트 발생 함수
  const handleEnterKeyPress = (e, func) => {
    if (e.key === "Enter") {
      Signup(e);
    }
  };

  return (
    <div>
      {/* 회원가입 폼 */}
      <form
        className="shadow-md rounded-xl px-8 pt-6 pb-8 mb-4"
        style={{
          backgroundColor: "#FDF7E4",
          border: "1px solid #DED0B6",
        }}
      >
        <div className="w-full max-w-xs">
          {/* 이메일 input */}
          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              이메일
            </label>
            <div className="flex">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                placeholder="이메일"
                value={userEmail}
                onChange={handleUserEmailChange}
              />
              {/* 이메일 중복검사 버튼 */}
              {/* 이메일 중복검사 성공 */}
              {isUserEmailDuplicate === false && (
                <button
                  onClick={handleUserEmailDuplicateCheck}
                  className="w-32 text-xs hover:text-white text-black font-bold rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  style={{
                    backgroundColor: "#86efac",
                  }}
                >
                  검사 완료
                </button>
              )}
              {/* 이메일 중복검사 미실시 or 실패 */}
              {isUserEmailDuplicate !== false && (
                <button
                  onClick={handleUserEmailDuplicateCheck}
                  className="w-32 text-xs hover:text-white text-black font-bold rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  style={{
                    backgroundColor: "#DED0B6",
                  }}
                >
                  중복 검사
                </button>
              )}
            </div>
            {/* 이메일 형식 체크 메세지 */}
            <div>
              {userEmail && userEmailCheck === false && (
                <p className="text-red-500">이메일 형식을 지켜주세요</p>
              )}
              {userEmail && isUserEmailDuplicate && (
                <p className="text-red-500">{userEmail}은 중복 이메일입니다.</p>
              )}
            </div>
          </div>

          {/* 비밀번호1 input */}
          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password1"
            >
              비밀번호
            </label>
            <div className="flex">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password1"
                type={password1Show ? "text" : "password"}
                placeholder="비밀번호"
                value={password1}
                onChange={handlePassword1Change}
                minLength={8}
                maxLength={45}
              />
              <button
                onClick={handlePassword1Show}
                className="w-32 text-xs hover:text-white text-black font-bold rounded focus:outline-none focus:shadow-outline"
                type="button"
                style={{
                  backgroundColor: "#DED0B6",
                }}
              >
                {password1Show ? "숨기기" : "보기"}
              </button>
            </div>
            {/* 비밀번호1 유효성 검사 */}
            {password1 && passwordValid === false && (
              <p className="text-red-500">
                영문 대소문자, 숫자, 특수문자(_!@$)를 조합해 입력해주세요. (8-45자)
              </p>
            )}
          </div>
          {/* 비밀번호2 input */}
          {passwordValid && (
            <div className="mb-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password2"
              >
                비밀번호 확인
              </label>
              <div className="flex">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password2"
                  type={password2Show ? "text" : "password"}
                  placeholder="비밀번호 확인"
                  value={password2}
                  onChange={handlePassword2Change}
                  minLength={8}
                  maxLength={45}
                />
                {/* 비밀번호2 보기, 숨기기 */}
                <button
                  onClick={handlePassword2Show}
                  className="w-32 text-xs hover:text-white text-black font-bold rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  style={{
                    backgroundColor: "#DED0B6",
                  }}
                >
                  {password2Show ? "숨기기" : "보기"}
                </button>
              </div>

              {/* 비밀번호1, 비밀번호2 일치 확인 표시 */}
              {password1 && password2 && passwordMatch === false && (
                <p className="text-red-500">비밀번호가 일치하지 않습니다.</p>
              )}
              {password1 && password2 && passwordMatch === true && (
                <p className="text-green-500">비밀번호가 일치합니다.</p>
              )}
            </div>
          )}
          {/* 비밀번호 확인 비활성화 */}
          {!passwordValid && (
            <div className="mb-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password2"
              >
                비밀번호 확인
              </label>
              <div className="flex">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password2"
                  placeholder="비밀번호 확인"
                  disabled={true}
                />
                {/* 비밀번호2 보기, 숨기기 */}
                <button
                  className="w-32 text-xs hover:text-white text-black font-bold rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  style={{
                    backgroundColor: "#DED0B6",
                  }}
                ></button>
              </div>
            </div>
          )}

          {/* 닉네임 input */}
          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="nickname"
            >
              닉네임
            </label>
            <div className="flex">
              <input
                className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="nickname"
                type="text"
                placeholder="닉네임"
                value={nickname}
                onChange={handleNicknameChange}
                onKeyDown={handleEnterKeyPress}
              />
              {/* 닉네임 중복검사 버튼 */}
              {/* 닉네임 중복검사 성공 */}
              {isNicknameDuplicate === false && (
                <button
                  onClick={handleNicknameCheck}
                  className="w-32 text-xs mb-4 hover:text-white text-black font-bold rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  style={{
                    backgroundColor: "#86efac",
                  }}
                >
                  검사 완료
                </button>
              )}
              {/* 닉네임 중복검사 미실시 or 실패 */}
              {isNicknameDuplicate !== false && (
                <button
                  onClick={handleNicknameCheck}
                  className="w-32 text-xs mb-4 hover:text-white text-black font-bold rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  style={{
                    backgroundColor: "#DED0B6",
                  }}
                >
                  중복 검사
                </button>
              )}
            </div>
          </div>

          {/* 회원가입 form 제출 버튼 */}
          <button
            onClick={Signup}
            className="w-full hover:text-white text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            style={{
              backgroundColor: "#BBAB8C",
            }}
          >
            완료
          </button>
        </div>

        {/* 로그인 화면 링크 */}
        <div className="mt-5 text-center">
          <p>계정이 이미 있으신가요?</p>
          <a className="hover:underline font-semibold" href="/user/login">
            로그인
          </a>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
