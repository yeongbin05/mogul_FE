"use client"
import { React, useState } from 'react';
import Link from 'next/link'


function WebtoonLibraryRoot({title, id}) {
  return (
    <div className='flex justify-between mx-20'>
      <div className='flex'>
        <p className='text-6xl font-semibold'>
          이 웹툰이 담긴 서재
        </p>
        {/* <button
        className="mx-10 hover:text-white text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        style={{
          backgroundColor: "#DED0B6",
        }}
        
        >
          <Link href={{
            pathname: `/webtoon/${id}/library`,
            // query: {
            //   title
            // }
          }}>
            전체 보기
          </Link>
        </button> */}
      </div>
    </div>
  )
}

export default WebtoonLibraryRoot;