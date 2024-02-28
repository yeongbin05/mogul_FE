"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
function ReviewCreateForm({clickModal}) {
  const [title, setTitle] = useState();
  const [content, setContent] = useState("");
  const [drawingScore, setDrawingScore] = useState(0);
  const [storyScore, setStoryScore] = useState(0);
  const [directingScore, setDirectingScore] = useState(0);

  const router = useRouter();
  const params = useParams();
  const webtoonId = params.id;
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const accessToken = typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null;
  async function reviewCreateSubmit(e) {
    e.preventDefault();
    try {
      if (title && content) {
        const response = await fetch(
          `${API_KEY}/review/${webtoonId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `${accessToken}`,
            },
            body: JSON.stringify({
              title,
              content,
              drawingScore,
              storyScore,
              directingScore,
            }),
          }
        );
  
        if (response.ok) {
          alert("리뷰 작성 성공");
          clickModal();
          window.location.reload(true);
        } else {
          alert("리뷰 작성 실패");
        }
      } else {
        alert("제목과 내용 모두 작성해주세요.");
      }
    } catch (error) {
      alert("네트워크 에러");
    }
  };

  return (
    <div>
      <form
        action="submit"
        className="rounded px-8 pt-6 pb-8 mb-4"
        style={{
          backgroundColor: "#FDF7E4",
        }}
        id="reviewForm"
        name="reviewForm"
      >
        <div>
          <div className="mb-10">
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="리뷰 제목을 남겨주세요"
              maxLength="30"
              />
          </div>
          <div className="mb-10">
            <label htmlFor="content">내용</label>
            <textarea
              name="content"
              id="content"
              cols="30"
              rows="4"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setContent(e.target.value)}
              placeholder="이 작품에 대한 리뷰를 남겨주세요"
              maxLength="300"
            ></textarea>
          </div>
          <div className="mb-10 flex justify-around">
            <div>
              <label htmlFor="drawingScore">작화 평점 : </label>
              <span>{drawingScore}</span>
            </div>
            <input
              type="range"
              name="drawingScore"
              min={0}
              max={5}
              onChange={(e) => setDrawingScore(e.target.value)}
              value={drawingScore}
            />
          </div>
          <div className="mb-10 flex justify-around">
            <div>
              <label htmlFor="storyScore">스토리 평점 : </label>
              <span>{storyScore}</span>
            </div>
            <input
              type="range"
              name="storyScore"
              min={0}
              max={5}
              onChange={(e) => setStoryScore(e.target.value)}
              value={storyScore}
            />
          </div>
          <div className="mb-10 flex justify-around">
            <div>
              <label htmlFor="directingScore">연출 평점 : </label>
              <span>{directingScore}</span>
            </div>
            <input
              type="range"
              name="directingScore"
              min={0}
              max={5}
              onChange={(e) => setDirectingScore(e.target.value)}
              value={directingScore}
            />
          </div>
          <button
            onClick={reviewCreateSubmit}
            className="hover:text-white text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            style={{
              backgroundColor: "#DED0B6",
            }}
          >
            등록
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReviewCreateForm;
