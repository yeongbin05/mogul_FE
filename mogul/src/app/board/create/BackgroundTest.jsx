import BoardCreate from "./BoardCreate";
// import Navbar from "@/components/navbar/Navbar";

export default function BackgroundTest() {
  return (
    <div>
      <div
        className="mx-auto mt-11 mb-10 border-black rounded-3xl "
        style={{ backgroundColor: "#DED0B6", maxWidth: "50%" }}
      >
        <div>
          <div className="text-center p-3">
            <div
              className="font-bold mt-10"
              style={{ fontSize: "27px", color: "#FAEED1" }}
            >
              글작성
            </div>
            <BoardCreate />
          </div>
        </div>
      </div>
    </div>
  );
}
