import Navbar from "@/components/navbar/Navbar";
import Header from "@/components/webtoon/header/Header";
import Footer from "@/components/footer/Footer";
import WebtoonWrapper from "@/components/webtoon/WebtoonWrapper";

export default async function Webtoon() {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const pno = 0;
  const count = 10;
  const accessToken = typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null;
  const response = await fetch(`${API_KEY}/webtoon?pno=${pno}&count=${count}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${accessToken}`,
    },
  });
  const webtoons = await response.json();
  const data = webtoons.data;
  const webtoonTopGrade = data.webtoonTopGrade;
  const webtoonTopLibrary = data.webtoonTopLibrary;
  return (
    <div>
      <Navbar />
      <div>
        <Header heading="평점이 높은 웹툰" buttonText="웹툰 전체보기" />
        <WebtoonWrapper webtoons={webtoonTopGrade} />
      </div>
      <div className="mt-10">
        <Header heading="서재에 많이 담긴 웹툰 TOP10" />
        <WebtoonWrapper webtoons={webtoonTopLibrary} />
        {/* <WebtoonWrapper webtoons={webtoonTopGrade} /> */}
      </div>
      <Footer />
    </div>
  );
}
