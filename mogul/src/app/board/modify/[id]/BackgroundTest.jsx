// import Navbar from "@/components/navbar/Navbar";
import BoardModify from "./BoardModify";

export default function BackgroundTest({ boardId }) {
  return (
    <div>
      <div
        className="mx-auto mt-11 mb-10 border-black rounded-3xl "
        style={{ backgroundColor: "#DED0B6", maxWidth: "50%" }}
      >
        <div>
          <div className="text-center p-3">
            <div
              className="font-bold mt-5"
              style={{ fontSize: "27px", color: "#FAEED1" }}
            >
              글수정
            </div>
            <BoardModify boardId={boardId} />
          </div>
        </div>
      </div>
    </div>
  );
}
