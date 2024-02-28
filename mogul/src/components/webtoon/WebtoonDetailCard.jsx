import React from "react";
import Image from "next/image";
import WebtoonLike from "./WebtoonLike";

function WebtoonDetailCard({ webtoonDetail }) {

  return (
    <>
      <section
        className="overflow-hidden rounded-lg shadow-2xl flex m-20"
        style={{
          height: "600px",
        }}
      >
        <img
          src={webtoonDetail.thumbnail}
          alt={webtoonDetail.title}
          className="size-auto object-cover"
          width={300}
          height={300}
          // priority
        />
        <div className="p-10">
          <div className="mb-10">
            <p className="text-4xl font-bold">{webtoonDetail.title}</p>
          </div>
          <div className="flex">
            <div>
              <span
                className="hover:underline cursor-pointer inline-block rounded-full px-3 py-1 font-semibold mr-2"
                style={{
                  backgroundColor: "#DED0B6",
                }}
              >
                <a href={`/webtoon/all/${webtoonDetail.genre}`}>{webtoonDetail.genre}</a>
              </span>
              <span
                className="inline-block rounded-full px-3 py-1 font-semibold"
                style={{
                  backgroundColor: "#DED0B6",
                }}
              >
                {webtoonDetail.platform}
              </span>
            </div>
            <div className="mx-5 flex">
              <span className="inline-block rounded-full px-3 py-1 font-semibold">
                작가 : {webtoonDetail.author}
              </span>
              |
              <div className="group flex relative">
                <span className="inline-block rounded-full px-3 py-1 font-semibold">
                  {"★".repeat(parseInt(webtoonDetail.grade))}
                  {"☆".repeat(5 - parseInt(webtoonDetail.grade))}
                </span>
                <span
                  className="p-4 group-hover:opacity-100 transition-opacity bg-gray-800 text-sm text-gray-100 rounded-xl absolute opacity-0 m-4 mx-auto"
                >
                  작화 : {webtoonDetail.drawingGrade}
                  <br />
                  연출 : {webtoonDetail.directingGrade}
                  <br />
                  스토리 : {webtoonDetail.storyGrade}
                </span>
              </div>

              |
              <span className="inline-block rounded-full px-3 py-1 font-semibold">
                {webtoonDetail.startDate.substr(0, 4)}
              </span>
            </div>
          </div>
          <div className="mt-10">
            <WebtoonLike />
          </div>
          <div className="mt-10">
            <div className="mb-5 text-2xl font-semibold">줄거리</div>
            <div>     {webtoonDetail.summary.split('\n').map((line, index) => (
                line.trim() !== '' && ( // 공백이 아닌 줄만 출력
                  <span key={index}>
                    {line}
                    <br />
                  </span>
    )
  ))}</div>
            {/* <div>{summaryContent}</div> */}
  
          </div>
          {webtoonDetail.link && (
            <div className="mt-5">
              <button
                className="hover:text-white text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                style={{
                  backgroundColor: "#BBAB8C",
                }}
              >
                <a href={webtoonDetail.link}>보러 가기</a>
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default WebtoonDetailCard;