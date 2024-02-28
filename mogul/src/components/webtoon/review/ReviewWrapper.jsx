"use client"

import ReviewCard from './ReviewCard';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';


function ReviewWrapper() {
  const [reviews, setReviews] = useState([]);
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const params = useParams();
  const webtoonId = params.id;
  const pno = 0
  const count = 5
  useEffect(() => {
    fetch(`${API_KEY}/review/${webtoonId}?pno=${pno}&count=${count}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((data) => setReviews(data.data))
    .catch((error) => alert('리뷰 조회 중 오류 발생'))
  }, []);

  return (
    <>
    {reviews.length !== 0 ? 
      <div className='mx-10 my-20'>
        <div className='grid grid-cols-5 gap-10 mx-10'>
          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review}/>
          ))}
        </div>
      </div>
    :
      <div className='mx-10 my-20'>
        <div className='mx-10 text-center'>
          <span className="text-xl font-semibold">아직 등록된 리뷰가 없어요..</span>
        </div>
      </div>
    }
    </>
  );
}


export default ReviewWrapper;