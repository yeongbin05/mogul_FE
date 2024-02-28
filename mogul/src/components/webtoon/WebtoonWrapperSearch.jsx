import React from "react";
import WebtoonThumbnailCardSearch from "./WebtoonThumbnailCardSearch";

function WebtoonWrapperSearch({ webtoons }) {
  return (
    <div className="grid grid-cols-5 gap-10 mx-10 mb-10">
      {webtoons.map((webtoon, index) => (
        <WebtoonThumbnailCardSearch key={index} webtoon={webtoon} />
      ))}
    </div>
  );
}

export default WebtoonWrapperSearch;
