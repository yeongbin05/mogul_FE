"use client"
import Navbar from "@/components/navbar/Navbar";
import WebtoonWrapper from "@/components/webtoon/WebtoonWrapper";
import Header from "@/components/webtoon/header/Header";
import Footer from "@/components/footer/Footer";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function WebtoonByGenre() {
  const [webtoons, setWebtoons] = useState([]);
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const params = useParams();
  const genre = decodeURI(params.genre);
  const pno = 0;
  const count = 1000;
  useEffect(() => {
    fetch(`${API_KEY}/webtoon/all/${genre}?pno=${pno}&count=${count}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((data) => setWebtoons(data.data))
    .catch((error) => alert('리뷰 조회 중 오류 발생'))
  }, [])

  return (
    <div>
      <Navbar />
      <Header heading={`"${genre}" 장르 웹툰 목록`}/>
      <WebtoonWrapper webtoons={webtoons} />
      <Footer />
    </div>
  );
}
