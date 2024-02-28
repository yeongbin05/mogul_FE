"use client"
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ChatApp from '@/components/chat/ChatApp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { windowClose } from "@fortawesome/free-solid-svg-icons";
export default function Chat() {
  const [showChat, setShowChat] = useState(false);
  const [title, setTitle] = useState("");
  const params = useParams();
  const id = params.id;
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const pno = 0;
  const count = 1;
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
          
        }
      } catch (error) {
        
      }
    };
    fetchData();
  }, []);


  const toggleChat = () => {
    setShowChat(!showChat);
  };

  const closeChat = () => {
    setShowChat(false);
  };

  return (
    <div className='relative'>
      {showChat ? (
        <div
        className='fixed bottom-5 right-5 mb-5 mr-5 rounded-2xl shadow-2xl flex py-2 px-4'
        style={{ 
          backgroundColor: '#BBAB8C',
          height: '500px',
          width: '400px'
        }}>
          <button onClick={closeChat} style={{
            position: 'absolute',
            top: '-20px',
            right: '0px',
          } }>
            <FontAwesomeIcon style={{color:'grey'}} icon={faXmark} />

          </button>
          <div className='w-full'>
            <div className='my-2 text-center text-lg font-semibold'>{`"${title}"`}의 채팅</div>
            {/* 채팅창 내용 */}
            {/* <ChatLog/> */}
            <ChatApp/>
          </div>
          
        </div>
      ) : (
        <button
          className='hover:underline fixed bottom-0 right-0 mb-5 mr-5 rounded-full font-semibold shadow-lg'
          onClick={toggleChat}
          style={{
            width: '65px',
            height: '65px',
            backgroundColor: '#BBAB8C',
          }}
        >
          채팅
        </button>
      )}
    </div>
  );
}