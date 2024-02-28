"use client";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import HeaderReviewAll from "@/components/webtoon/header/HeaderReviewAll";
import ReviewWrapperAll from "@/components/webtoon/review/ReviewWrapperAll";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WebtoonReviewAll() {
  const [title, setTitle] = useState("");
  const params = useParams();
  const id = params.id;
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const pno = 0;
  const count = 1;
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_KEY}/webtoon/${id}?pno=${pno}&count=${count}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const result = await response.json();
          setTitle(result.data.webtoonDetail.title);
        } else {
          // console.log(response);
        }
      } catch (error) {
        // console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <HeaderReviewAll heading={`"${title}"의 모든 리뷰`} id={id} />
      <ReviewWrapperAll />
      <Footer />
    </>
  );
}
