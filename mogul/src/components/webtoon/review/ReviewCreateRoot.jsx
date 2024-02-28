"use client"
import { React, useState } from 'react';
import ReviewCreateButton from './ReviewCreateButton';
import Link from 'next/link';
import { useParams } from 'next/navigation';

function ReviewCreateRoot({title, id}) {
  const accessToken = typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null;
  return (
    <div className='flex justify-between mx-20'>
      <div className="flex">
        <p className='text-6xl font-semibold'>
          리뷰
        </p>
        <button
        className="mx-10 hover:text-white text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        style={{
          backgroundColor: "#DED0B6",
        }}
        
        >
          <Link href={{
            pathname: `/webtoon/${id}/review`,
          }}>
            전체 보기
          </Link>
        </button>
      </div>
      <ReviewCreateButton />
    </div>
  )
}

export default ReviewCreateRoot;