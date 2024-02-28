"use client"

import ReviewCard from './ReviewCard';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';


function ReviewWrapperAll() {
  const [reviews, setReviews] = useState([]);
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const params = useParams();
  const webtoonId = params.id;
  const pno = 0
  const count = 100
  useEffect(() => {
    fetch(`${API_KEY}/review/${webtoonId}?pno=${pno}&count=${count}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((data) => setReviews(data.data))
    .catch()
  }, [reviews])

  return (
    <div className='mx-10 my-20'>
      <div className='grid grid-cols-5 gap-10 mx-10'>
        {reviews.map((review, index) => (
          <ReviewCard key={index} review={review}/>
        ))}
      </div>
    </div>
  );
}


export default ReviewWrapperAll;