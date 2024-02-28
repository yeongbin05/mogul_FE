"use client"
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Image from "next/image";
import moguri_worm_img from "@/assets/moguri_worm_img.png"
import library_img from "@/assets/library_img.png"
import library2_img from "@/assets/library2_img.png"
export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="flex w-screen  py-24 justify-center h-screen">
        <div className="text-4xl font-bold py-52">
          <p className="mb-5">모두의 굴 mogul</p>
          <p className="mb-5">통합 웹툰 커뮤니티</p>
        </div>
        <Image
          className="w-auto"
          src={moguri_worm_img}
          alt="모구리"
          width={500}
          height={500}
          priority
        />
      </div>
      <div
        className="flex w-screen  py-24 justify-center h-screen"
        style={{
          backgroundColor: "#DED0B6",
        }}
      >
        <Image
          className="mx-12 w-auto rounded-2xl"
          src={library_img}
          alt="웹툰"
          width={1000}
          height={1000}
          priority
        />
        <div className="text-4xl font-bold py-52">
          <p className="cursor-default mb-5">여러 플랫폼의 웹툰을</p>
          <p>한 곳에서</p>
        </div>
      </div>
      <div className="flex w-screen  py-24 justify-center h-screen">
        <div className="text-4xl font-bold py-52">
          <p className="mb-5">본인만의 서재를</p>
          <p>만들 수 있어요</p>
        </div>
        <Image
          className="mx-12 rounded-2xl"
          src={library2_img}
          alt="서재"
          width={1000}
          height={1000}
       
          priority
        />
      </div>
      <Footer />
    </div>
  );
}
