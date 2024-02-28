"use client"
import React, { useState } from 'react';
import ReviewModal from './ReviewModal';

function ReviewCard({ review, index }) {
  const [showModal, setShowModal] = useState(false)
  const clickModal = () => setShowModal(!showModal)
  return (
    <div
      onClick={clickModal}
      className="cursor-pointer shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4"
      style={{
        backgroundColor: "white",
        height: "200px",
        width: "200px",
      }}
    >
      <div
        className='mb-1 truncate'
      >
        <div className='flex justify-between'>
          {/* <div>
            {review.title}
          </div> */}
          <div>
            {review.nickname}
          </div>
        </div>
        <hr />
      </div>
      <div>
        <p className='mt-5 line-clamp-5'>
          {review.content}
        </p>
      </div>
      {showModal && <ReviewModal review={review} clickModal={clickModal} />}
    </div>
  );
}

export default ReviewCard;

