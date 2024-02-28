"use client";

import MySubscribeList from "./MySubscribeList";
import { useState } from "react";
import IsNotLogin from "./IsNotLogin";

export default function BackgroundTest() {
  const [libData, setLibData] = useState([]);

  const token = sessionStorage.getItem("accessToken");

  return (
    <div>
      <div
        className="mx-auto mt-11 mb-10 border-black rounded-3xl "
        style={{ backgroundColor: "#DED0B6", maxWidth: "80%" }}
      >
        <div>
          {token ? (
            <div className="text-center p-8">
              <MySubscribeList />
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
