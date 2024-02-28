"use client"
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/navbar/Navbar";
import WebtoonWrapper from "@/components/webtoon/WebtoonWrapper";
import Header from "@/components/webtoon/header/Header";
import Footer from "@/components/footer/Footer";

export default function WebtoonAll() {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const initialPno = 0;
  const count = 10;
  const accessToken =
    typeof window !== "undefined" ? sessionStorage.getItem("accessToken") : null;

  const [webtoons, setWebtoons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pno, setPno] = useState(initialPno);
  const endOfPageRef = useRef(null);

  useEffect(() => {
    fetchWebtoons();
  }, []); // 페이지가 처음 로드될 때 데이터를 가져옵니다.

  useEffect(() => {
    function handleScroll() {
      if (
        endOfPageRef.current &&
        window.innerHeight + document.documentElement.scrollTop >=
          endOfPageRef.current.offsetTop &&
        !loading
      ) {
        loadMore();
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]); // 스크롤 이벤트 리스너를 추가합니다.

  const fetchWebtoons = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_KEY}/webtoon/all?pno=${pno}&count=${count}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${accessToken}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setWebtoons((prevWebtoons) => [...prevWebtoons, ...data.data]); // 새로운 데이터를 기존 데이터와 병합합니다.
        setPno((prevPno) => prevPno + 1); // 페이지 번호를 증가시킵니다.
      } else {
        console.error("Failed to fetch webtoons");
      }
    } catch (error) {
      console.error("Error fetching webtoons:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    fetchWebtoons();
  };

  return (
    <div>
      <Navbar />
      <div>
        <Header heading="전체 웹툰" />
        <WebtoonWrapper webtoons={webtoons} />
        <div ref={endOfPageRef}></div> {/* 페이지의 끝에 도달했음을 나타내는 엘리먼트 */}
        {loading && <p>Loading...</p>}
      </div>
      <Footer />
    </div>
  );
}
