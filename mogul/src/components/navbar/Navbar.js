"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const accessToken = typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null;
  const nick = typeof window !== 'undefined' ? sessionStorage.getItem('nickname') : null;

  const [nickname, setNickname] = useState(null);
  useEffect(() => setNickname(nick), [])
  const router = useRouter();
  // const { username } = router.query;
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_KEY}/user/logout`,
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `${accessToken}`, // 인증 토큰을 포함시키는 경우
      },
    })
    .then(response => {
      if (response.ok) {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("nickname");
        window.location.href = '/';
      } else {
        alert("로그아웃 실패")
      }
    })
    .catch(error => {
      alert("네트워크 에러");
    });
  };

  function handleSearchKeywordChange(event) {
    setSearchKeyword(event.target.value);
  }

  function searchKeywordClickHandler(event) {
    if (searchKeyword !== "") {
      // event.preventDefault();
      router.push(`/search/${searchKeyword}`);
    } else {
      alert("검색어를 입력해주세요.")
    }
  }

  function searchKeywordEnterHandler(event) {
    if (event.key === 'Enter' && !event.nativeEvent.isComposing) {
      searchKeywordClickHandler();
    }
  }

  return (
    <>
      <div className="flex justify-between items-center py-0 px-12 h-24 font-bold flex-wrap flex-custom ">
        <Link href="/" className="nav_txt">
          <div className="text-4xl font-bold">
            <h1>mogul</h1>
          </div>
        </Link>

        <Link href="/webtoon" className="nav_txt hover:text-green-400">
          <div className={pathname === "/webtoon" ? "active" : ""}>웹툰</div>
        </Link>
        <Link href="/board" className="nav_txt hover:text-green-400">
          <div className={pathname === "/board/1" ? "active" : ""}>게시판</div>
        </Link>
        <Link href="/library" className="nav_txt hover:text-green-400">
          <div className={pathname === "/library" ? "active" : ""}>서재</div>
        </Link>
        <div className="rounded-2xl pl-5 relative border"
        style={{
          backgroundColor: "white",
        }}
        >
          <input type="text"
            value={searchKeyword}
            onChange={handleSearchKeywordChange}
            style={{
              height: "30px",
              width: "400px",
            }}
            onKeyDown={(e) => searchKeywordEnterHandler(e)}
          ></input>
          <button className="right-0"
            style={{
              height: "30px",
              width: "30px",
            }}
            onClick={searchKeywordClickHandler}
          >🔍</button>
        </div>
        <div
          className="relative"
          style={{ width: "20%", display: "flex", justifyContent: "flex-end" }}
          >
            {nickname && (
              <div className="mx-5">{`${nickname}님`}</div>
            )}
          <div onClick={toggleDropdown} className="cursor-pointer">
            <FontAwesomeIcon icon={faUser} size="lg" />
          </div>
          {dropdownOpen && (
            <div className="absolute right-0 mt-6 w-48 bg-white rounded-lg shadow-xl z-10">
              <div className="py-1">
                {accessToken ? (
                  <>
                    <Link
                      href="/user/profile"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      프로필
                    </Link>
                    <div
                      onClick={handleLogout}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
                    >
                      로그아웃
                    </div>
                  </>
                ) : (
                  <>
                    <Link
                      href="/user/login"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      로그인
                    </Link>
                    <Link
                      href="/user/signup"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      회원가입
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
