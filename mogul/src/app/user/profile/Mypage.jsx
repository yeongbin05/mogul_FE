import React from "react";
import ProfileImage from "./ProfileImage";
import ProfileInfo from "./ProfileInfo";

export default function Mypage() {
  return (
    <div>
      <div className="grid grid-cols-4 ">
        <div className="col-span-1 flex items-center justify-center">
          <ProfileImage />
        </div>
        <div className="col-span-3  mt-12 ml-16 flex items-center ">
          <ProfileInfo />
        </div>
      </div>
    </div>
  );
}
