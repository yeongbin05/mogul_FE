"use client";

import IsNotLogin from "./IsNotLogin";
import MyLibraryList from "./MyLibraryList";
import { useState } from "react";

export default function BackgroundTest() {
  // const isCurrentUserOwner = false;
  // const [libData, setLibData] = useState([]);

  //Text content does not match server-rendered HTML
  //여기선 이 코드쓰면 에러가 나네요.
  // const token =
  //   typeof window !== "undefined"
  //     ? sessionStorage.getItem("accessToken")
  //     : null;

  //아니 진짜왜짘ㅋㅋㅋㅋㅋㅋ 이번엔 아래 코드가 에러나네요...???
  // const token = sessionStorage.getItem("accessToken");
  const token =
    typeof window !== "undefined"
      ? sessionStorage.getItem("accessToken")
      : null;

  return (
    <div>
      <div
        className="mx-auto mt-11 mb-10 border-black rounded-3xl "
        style={{ backgroundColor: "#DED0B6", maxWidth: "80%" }}
      >
        <div>
          {token ? (
            <div className="text-center p-8">
              <MyLibraryList />
            </div>
          ) : (
            <div className="text-center p-8">
              <IsNotLogin />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
