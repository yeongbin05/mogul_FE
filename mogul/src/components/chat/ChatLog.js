"use client";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";

const ChatLog = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const lastHistory = useRef(null);
  const params = useParams();
  const id  = params.id;
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const today = new Date();
        const todayDate = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
        const yesterday = new Date(today.setDate(today.getDate() - 1));
        // const yesterdayDate = `${yesterday.getFullYear()}-${yesterday.getMonth()+1}-${yesterday.getDate()}`;
        const tomorrow = new Date(today.setDate(today.getDate() + 2));
        const tomorrowDate = `${tomorrow.getFullYear()}-${tomorrow.getMonth()+1}-${tomorrow.getDate()}`;
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_KEY +
            `/history/${id}?start=${todayDate}&end=${tomorrowDate}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch chat history");
        }
        const responseData = await response.json();

        // Check if the data property is an array
        if (Array.isArray(responseData.data)) {
          setChatHistory(responseData.data); // Set the fetched chat history to state
          scrollDown();
        } else {
          // console.error("Invalid data structure:", responseData);
        }
      } catch (error) {
        // console.error("Error fetching chat history:", error);
      }
    };

    fetchChatHistory();
  }, []);

  function changeDateFormat(source) {
    const date = new Date(source);
    return `${date.getFullYear()}년 ${date.getMonth()+1}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분`
  }

  const scrollDown = () => {
    lastHistory.current.scrollIntoView({behavior: "smooth"});
  }

  return (
    <>
      {chatHistory.map((chat, index) => (
        <div key={index} className="mb-3 flex flex-col w-4/5 max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">{chat.writer}</span>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{changeDateFormat(chat.registeredDate)}</span>
          <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{chat.message}</p>
        </div>
      ))}
      <div ref={lastHistory}></div>
    </>
  );
};

export default ChatLog;
