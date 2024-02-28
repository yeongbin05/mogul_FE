import WebtoonDetailCard from "@/components/webtoon/WebtoonDetailCard";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import ReviewModal from "@/components/webtoon/review/ReviewModal";
import ReviewWrapper from "@/components/webtoon/review/ReviewWrapper";
import ReviewCreateRoot from "@/components/webtoon/review/ReviewCreateRoot";
import WebtoonLibraryRoot from "@/components/webtoon/webtoonLibrary/WebtoonLibraryRoot";
import WebtoonLibraryWrapper from "@/components/webtoon/webtoonLibrary/WebtoonLibraryWrapper";
import Chat from "@/components/chat/Chat";

export default async function WebtoonDetail(props) {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const id = props.params.id;
  const pno = 0;
  const count = 5;
  const accessToken = typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null;
  const response = await fetch(
    `${API_KEY}/webtoon/${id}?pno=${pno}&count=${count}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${accessToken}`,
      },
    }
  );
  const responseJSON = await response.json();
  const webtoon = responseJSON.data.webtoonDetail;
  const libraries = responseJSON.data.libraries;
  return (
    <>
      <Navbar />
      <WebtoonDetailCard webtoonDetail={webtoon} />
      <ReviewCreateRoot title={webtoon.title} id={webtoon.id}/>
      <ReviewWrapper/>
      
      <hr className="mb-20" />
      <WebtoonLibraryRoot title={webtoon.title} id={webtoon.id}/>
      {libraries.length !== 0 ?
        <WebtoonLibraryWrapper libraries={libraries}/>
        :
        <div className='mx-10 my-20'>
          <div className='mx-10 text-center'>
            <span className="text-xl font-semibold">아직 담긴 서재가 없어요..</span>
          </div>
        </div>
      }
      <Chat />
      <Footer />
    </>
  );
}
