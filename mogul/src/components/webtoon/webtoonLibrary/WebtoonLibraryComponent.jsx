"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import no_image_img from "@/assets/no_image_img.png";

function WebtoonLibraryComponent({ index, h }) {
  const router = useRouter();
  const goToLibrary = function (id) {
    router.push(`/library/${id}`);
  };
  return (
    <figure
      className="m-2.5 cursor-pointer shadow-xl rounded-2xl"
      style={{ backgroundColor: "#ffffff" }}
      key={index}
      onClick={() => goToLibrary(h.id)}
    > 
      <div className="grid grid-cols-2 grid-rows-2" 
      style={{height:'300px'}}>
        
        {h.thumbnail1 && (
          <img
            className="w-full h-full cursor-pointer border-white border-2 rounded-2xl"
            src={h.thumbnail1 || no_image_img}
            alt={h.name || "대체 이미지 설명"}
            width={0}
            height={0}
            sizes="100vw"
            // objectFit='cover'
            // style={{ width: "100%", height: "auto" }}
          />
        )}
        {h.thumbnail2 && (
          <img
            className="w-full h-full cursor-pointer border-white border-2 rounded-2xl"
            src={h.thumbnail2}
            alt={h.name}
            width={0}
            height={0}
            sizes="100vw"
            // style={{ width: "100%", height: "auto" }}
          />
        )}
        {h.thumbnail3 && (
          <img
            className="w-full h-full cursor-pointer border-white border-2 rounded-2xl"
            src={h.thumbnail3}
            alt={h.name}
            width={0}
            height={0}
            sizes="100vw"
            // style={{ width: "100%", height: "auto" }}
          />
        )}
        {h.thumbnail4 && (
          <img
            className="w-full h-full cursor-pointer border-white border-2 rounded-2xl"
            src={h.thumbnail4}
            alt={h.name}
            width={0}
            height={0}
            sizes="100vw"
            // style={{ width: "100%", height: "auto" }}
          />
        )}
      </div>
      <figcaption className="rounded-2xl hover:focus text-center text-white bg-black p-5 bottom-0 right-0 top-27 left-0 bg-black bg-opacity-75">
        <div className="text-m"> {`"${h.nickname}"님의`} </div>
        <div className="text-xl font-semibold"> {`"${h.name}"`}</div>
        <div>구독자 : {h.subscriberNumber}</div>
      </figcaption>
    </figure>
  );
}

export default WebtoonLibraryComponent;