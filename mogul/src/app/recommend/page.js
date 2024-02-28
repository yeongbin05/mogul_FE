"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
function YourComponent() {
  const [webtoons, setWebtoons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null;
  const [webtoonTitle, setWebtoonTitle] = useState(null);
  const [webtoonPercentage, setWebtoonPercentage] = useState(null);
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const spinContainerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const wheelActive = useRef(true);
  const [nicknameValue, setNicknameValue] = useState("");
  const router = useRouter();
  useEffect(() => {
    const fetchProfileInfo = async () => {
      try {
        const response = await fetch(API_KEY + "/user/profile/info", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${accessToken}`,
          },
        });

        if (response.ok) {
          const result = await response.json();
          // console.log("프로필 성공");
          // setEmailValue(result.data.email);
          setNicknameValue(result.data.nickname);
        } else {
          // console.log("프로필 정보 불러오기 실패");
        }
      } catch (error) {
        // console.log("네트워크 오류로 프로필 정보 불러오기 실패");
        // console.log(error);
      }
    };

    fetchProfileInfo();
  }, [API_KEY, accessToken]);
  useEffect(() => {
    const fetchWebtoons = async () => {
      try {
        const response = await fetch(API_KEY + "/recommend", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setWebtoons(data.data.slice(0, 10));
          
          setIsLoading(false);
        } else {
          alert('로그인이 필요합니다')
          router.push('/user/login')
          // console.log("프로필 정보 불러오기 실패");
        }
      } catch (error) {
        // console.log("네트워크 오류로 웹툰 정보 불러오기 실패");
        alert('웹툰에 리뷰를 5개이상 남겨야합니다')
        window.location.href = '/webtoon'
      }
    };

    fetchWebtoons();
  }, []);
  useEffect(() => {
    let wheelActive = true;
    let currentRotation = 0; // 현재 회전 각도

    const handleWheel = (event) => {
      if (!wheelActive) return;
      wheelActive = false;

      const ospin = spinContainerRef.current;
      if (!ospin) return;

      ospin.style.transition = "transform 0.5s ease";

      // 회전 방향을 결정합니다.
      const delta = Math.max(-1, Math.min(1, event.deltaY || -event.detail));
      const angleToRotate = delta > 0 ? 36 : -36;

      // 회전 각도를 업데이트합니다.
      currentRotation += angleToRotate;

      // 회전 각도가 360 이상이면 0으로 초기화합니다.
      ospin.style.transform = `rotateY(${currentRotation}deg)`;
      //   if (Math.abs(currentRotation) >= 360) {
      //     console.log(currentRotation)
      //     ospin.style.transform = `rotateY(${currentRotation}deg)`;
      //       // currentRotation = 0;
      //   }
      //   else {
      //     console.log(currentRotation)
      //   ospin.style.transform = `rotateY(${currentRotation}deg)`; // 회전 각도 적용
      // }
      setTimeout(() => {
        wheelActive = true; // 이미지 변경 후 휠 이벤트 다시 활성화
      }, 500);
    };

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useEffect(() => {
    const initCarousel = () => {
      const ospin = spinContainerRef.current;
      if (!ospin) return;

      const aImg = ospin.getElementsByTagName("img");
      // const aImg = ospin.getElementsByClassName('div');
      const imgWidth = 120;
      const imgHeight = 170;
      const radius = 500;
      // console.log(aImg)
      ospin.style.width = imgWidth + "px";
      ospin.style.height = imgHeight + "px";

      for (let i = 0; i < aImg.length; i++) {
        aImg[i].style.transform =
          "rotateY(" +
          i * (360 / aImg.length) +
          "deg) translateZ(" +
          radius +
          "px)";
      }
    };

    initCarousel();
  }, [webtoons]);

  function calculatePercentage(number) {
    return ((number) * 100).toFixed(2);
  }

  return (
    <>
      <div id="contain" className='flex flex-col'>
        <div className="fixed top-10 w-full text-center">
          {webtoonTitle && webtoonPercentage ?
            <>
              <h1 className="text-2xl font-bold text-white">{`제목 : ${webtoonTitle}`}</h1>
              <h1 className="text-2xl font-bold text-white">{`추천도 : ${webtoonPercentage}%`}</h1>
            </>
            // <h1 className="text-2xl font-bold text-white">{webtoonPercentage}</h1>
            :
            <h1 className="text-2xl font-bold text-white">{`${nicknameValue}님을 위한 추천 웹툰 10선`}</h1>
          }
        </div>
        {/* /<span style={{width:'2000px',height:'200px',display:'flex',justifyContent:'center','alignItems':'center',marginLeft:'900px'}}>추천</span> */}
          <div id='drag-container'>
            <div id="spin-container" ref={spinContainerRef}>
                {webtoons.map((webtoon, index) => (
                  
                  
                  <img
                    src={webtoon.webtoon.thumbnail}
                    alt={webtoon.webtoon.title}
                    key={index}
                    onClick={() => {
                      window.location.href = `webtoon/${webtoon.webtoon.id}`;
                    }}
                    onMouseOver={() => {
                      setWebtoonTitle(webtoon.webtoon.title);
                      setWebtoonPercentage(calculatePercentage(webtoon.score))
                    }}
                    onMouseLeave={() => {
                      setWebtoonTitle(null);
                      setWebtoonPercentage(null);
                    }}
                  />
                  ))}
            </div>
            {/* <p>3D Carousel</p> */}
            <div id="ground"></div>
          </div>
    
      </div>
    </>
  );
}

export default YourComponent;
