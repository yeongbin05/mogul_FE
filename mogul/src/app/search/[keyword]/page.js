"use client"
import Navbar from "@/components/navbar/Navbar";
import Header from "@/components/webtoon/header/Header";
import Footer from "@/components/footer/Footer";
import WebtoonWrapperSearch from "@/components/webtoon/WebtoonWrapperSearch";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchKeywordPage() {
  const [searchResultWebtoonTitle, setSearchResultWebtoonTitle] = useState([]);
  const [searchResultWebtoonGenre, setSearchResultWebtoonGenre] = useState([]);
  const [searchResultWebtoonSummary, setSearchResultWebtoonSummary] = useState([]);
  const [searchResultArticle, setSearchResultArticle] = useState([]);
  const params = useParams();
  const keyword = decodeURI(params.keyword);
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const pno = 0;
  const count = 1000;

  // 웹툰 제목으로 검색 결과
  // useEffect(() => {
  //   fetch(`${API_KEY}/search/webtoon/title?keyword=${keyword}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //   .then((response) => response.json())
  //   .then((data) => setSearchResultWebtoonTitle(data.data));
  // }, []);

  // 웹툰 전체 검색 결과
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_KEY}/search/webtoon?keyword=${keyword}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const result = await response.json();
          setSearchResultWebtoonTitle(result.data.title);
          setSearchResultWebtoonGenre(result.data.genre);
          setSearchResultWebtoonSummary(result.data.summary);
        } else {
          
        }
      } catch (error) {
        alert('검색 중 오류 발생')
      }
    }
    fetchData();}, []);

  // useEffect(() => {
  //   fetch(`${API_KEY}/board/search?keyword=${keyword}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //   .then((response) => response.json())
  //   .then((data) => setSearchResultArticle(data.data));
  // })

  

  return (
    <>
      <Navbar />
      <Header heading={`"${keyword}" 웹툰 제목 검색 결과`} />
      {searchResultWebtoonTitle.length > 0 ? 
        <WebtoonWrapperSearch webtoons={searchResultWebtoonTitle}/>
        :
        <div className='mx-10 my-20'>
        <div className='mx-10 text-center'>
          <span className="text-xl font-semibold">검색 결과가 없어요..</span>
        </div>
      </div>
      }
      <Header heading={`"${keyword}" 장르 검색 결과`} />
      {searchResultWebtoonGenre.length > 0 ? 
        <WebtoonWrapperSearch webtoons={searchResultWebtoonGenre}/>
        :
        <div className='mx-10 my-20'>
        <div className='mx-10 text-center'>
          <span className="text-xl font-semibold">검색 결과가 없어요..</span>
        </div>
      </div>
      }
      <Header heading={`"${keyword}" 관련 내용의 웹툰 검색 결과`} />
      {searchResultWebtoonSummary.length > 0 ? 
        <WebtoonWrapperSearch webtoons={searchResultWebtoonSummary}/>
        :
        <div className='mx-10 my-20'>
        <div className='mx-10 text-center'>
          <span className="text-xl font-semibold">검색 결과가 없어요..</span>
        </div>
      </div>
      }
      <Footer />
    </>
  );
}
