import Navbar from "@/components/navbar/Navbar";
import MypageContainer from "./MypageContainer";

export default function BackgroundTest() {
  return (
    <div>
      <div
        className="mx-auto mt-11 mb-10 border-black rounded-3xl "
        style={{ backgroundColor: "#DED0B6", maxWidth: "80%" }}
      >
        <div>
          <div className="text-center p-8">
            {/* <div
              className="font-bold mt-5"
              style={{ fontSize: "27px", color: "#FAEED1" }}
            >
              마이페이지
            </div> */}
            <MypageContainer />
          </div>
        </div>
      </div>
    </div>
  );
}
