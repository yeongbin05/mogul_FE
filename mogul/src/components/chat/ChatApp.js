"use client";

// 클라이언트 측 코드 (예: React 컴포넌트)

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import ChatLog from "./ChatLog";
// import SockJS from 'sockjs-client'
// import StompJs from 'stompjs'
const ChatApp = () => {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [nickname, setNickname] = useState("");
  const [ws, setWs] = useState(null); // WebSocket 상태 추가
  const lastMessage = useRef();
  const params = useParams();
  const id = params.id;
  useEffect(() => {
    // const accessToken = sessionStorage.getItem("accessToken");
    // console.log(accessToken);
    // 웹 소켓 연결 시에 헤더를 포함하여 요청 보내기
    // const websocket = new SockJS(
    //   `https://i10a206.p.ssafy.io/api/chat/1`
    // )
    // const stompClient = StompJs.over( socket )
    const websocket = new WebSocket(
      `wss://i10a206.p.ssafy.io/api/chat/${id}`
    );
    // const websocket = new SockJS(
    //   `https://i10a206.p.ssafy.io/api/chat/1`
    // );
    // console.log('start')
    websocket.onopen = () => {
      // console.log('WebSocket connection opened');
      const chatContainer = document.getElementById('chat-container');
    chatContainer.scrollTop = chatContainer.scrollHeight;
    };
    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (typeof data === 'string') {
        setNickname(data);
        scrollDown();
      } else {
        setChatLog((prevChatLog) => [...prevChatLog, data]);
        scrollDown();
      }
      // console.log('Received message from server:', data, typeof(data));
    };

    websocket.onerror = (error) => {
      // console.error('WebSocket error:', error);
    };

    websocket.onclose = () => {
      // console.log('WebSocket connection closed');
      setNickname("");
    };

    setWs(websocket); // WebSocket 상태 설정

    // 컴포넌트 언마운트 시 WebSocket 연결 닫기
    return () => {
      websocket.close();
    };
  }, [setChatLog, setWs, setNickname]);

  // 메시지 전송 함수
  const sendMessage = () => {
    if (message.trim() !== "" && ws.readyState === WebSocket.OPEN) {
      ws.send(message);
      // console.log('전송')
      setMessage("");
      scrollDown();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  }

  const scrollDown = () => {
    lastMessage.current.scrollIntoView({behavior: "smooth"});
    // console.log(1)
  }

  function changeDateFormat(source) {
    const date = new Date(source);
    return `${date.getFullYear()}년 ${date.getMonth()+1}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분`
  }
  useEffect(() => {
    const chatContainer = document.getElementById('chat-container');
    chatContainer.scrollTop = chatContainer.scrollHeight;
}, [chatLog]);
  return (
    <>
      <div>
        <div id="chat-container" className="h-96 overflow-y-scroll flex flex-col"
          onLoad={scrollDown}
        >
          <ChatLog />
          {chatLog.map((chat, index) => {
            // console.log(nickname)
            if (chat.writer === nickname) {
              return (
                <div key={index} className="text-end mb-3 flex flex-col w-4/5 ml-14 max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-s-xl rounded-se-xl"
                  style={{
                    backgroundColor: "#FAEED1"
                  }}
                >
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{chat.writer}</span>
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{changeDateFormat(new Date())}</span>
                  <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{chat.msg}</p>
                </div>
              )
            } else {
              return (
                <div key={index} className="mb-3 flex flex-col w-4/5 max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{chat.writer}</span>
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{changeDateFormat(new Date())}</span>
                  <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{chat.msg}</p>
                </div>
              )
            }
          })}
          <div ref={lastMessage}></div>
        </div>
        <div className="pt-3 border-t flex">
          <input
            className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="채팅을 입력해주세요"
            onKeyDown={handleKeyDown}
          />
          <button
            className="w-14 rounded-r-md hover:bg-blue-600 transition duration-300"
            style={{
              backgroundColor: "#DED0B6"
            }}
            onClick={sendMessage}
          >
            전송
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatApp;
