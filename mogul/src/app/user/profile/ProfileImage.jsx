"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import profile_img from "@/assets/profile_img.png";
import moguri_img from "@/assets/moguri_img.png";

export default function ProfileImage() {
  //기본 프로필 이미지 설정
  const [image, setImage] = useState(profile_img);
  // 닉네임
  const fileInput = useRef(null);

  const handleImage = async (e) => {
    //내가 받을 파일이 하나이기 때문에 index = 0
    const file = e.target.files[0];

    //파일을 선택하지 않으면 return
    if (!file) return;

    //이미지 화면에 띄우기
    const reader = new FileReader();

    //파일을 불러오는 메서드, 종료되는 시점에 readyState는
    //Done(2)이 되고 onload 시작

    reader.readAsDataURL(file);

    reader.onload = (e) => {
      //파일 onload가 성공하면 2, 진행중은 1, 실패는 0 반환
      if (reader.readyState === 2) {
        setImage(e.target.result);
      }
    };

    //이미지 파일을 formData에 담아 서버에 보내고
    //서버는 받은 이미지파일을 S3(또는 기타)에 저장하고
    //받은 url값을 클라이언트로 반환
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_KEY + "/user/profile",
        {
          method: "PATCH",
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error("HTTP error! Status: ${res.status}");
      }

      const data = await res.json();

      //반환받은 이미지 url. 원하는 곳에 사용한다.
      const image_URL = data.imageURL;
    } catch (error) {
      console.error("Error발생", error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-7">
      <a href="#" onClick={() => fileInput.current.click()}>
        <div
          style={{
            width: "200px",
            height: "200px",
            overflow: "hidden",
            borderRadius: "50%",
            overfit: "cover",
            position: "relative",
          }}
        >
          <Image
            src={moguri_img}
            fill="true"
            sizes="100"
            priority
            alt="프로필 이미지"
            quality={90}
          />
        </div>
      </a>
      {/* <label htmlFor="input-file">이미지 선택</label> */}
      <input
        type="file"
        name="image_URL"
        id="input-file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInput}
        onChange={handleImage}
      />
    </div>
  );
}
