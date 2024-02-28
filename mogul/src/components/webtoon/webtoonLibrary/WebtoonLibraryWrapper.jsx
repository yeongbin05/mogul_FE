"use client"
import Image from "next/image";
import { useState } from "react";
import WebtoonLibraryComponent from "./WebtoonLibraryComponent";

function WebtoonLibraryWrapper({ libraries }) {
  return (
    <div className="grid grid-cols-5 mx-20 mt-10">
    {libraries &&
      libraries
        .slice()
        .reverse()
        .map((h, index) => (
          <WebtoonLibraryComponent key={index} h={h}/>
        ))}
  </div>
  );
}


export default WebtoonLibraryWrapper;