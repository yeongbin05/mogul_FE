"use client"
import {React, useState} from 'react';
import ReviewCreateModal from './ReviewCreateModal';
import { useRouter } from 'next/navigation';

function ReviewCreateButton() {
  const [showModal, setShowModal] = useState(false);
  const accessToken = typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null;
  const router = useRouter();
  const clickModal = () => {
    if (accessToken) {
      setShowModal(!showModal)
    } else {
      alert("리뷰를 작성하려면 로그인을 해주세요.")
      router.push("/user/login")
    }
  }

  return(
    <>
      <button
      className="hover:text-white text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      style={{
        backgroundColor: "#DED0B6",
      }}
      onClick={clickModal}
      >
        리뷰 쓰기
      </button>
      {showModal && <ReviewCreateModal clickModal={clickModal} />}
    </>
  )
}

export default ReviewCreateButton;