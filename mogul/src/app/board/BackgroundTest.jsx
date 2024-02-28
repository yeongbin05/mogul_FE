// import Navbar from "@/components/navbar/Navbar";
// import BoardList from "@/app/board/[id]/BoardList";
import BoardPagination from "./BoardPagination";

export default function BackgroundTest() {
  return (
    <div>
      <div
        className="mx-auto mt-11 mb-10 border-black rounded-3xl "
        style={{ backgroundColor: "#DED0B6", maxWidth: "80%" }}
      >
        <div>
          <div
            className="text-center p-3 "
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              className="font-bold mt-8"
              style={{ fontSize: "32px", color: "#FAEED1" }}
            >
              게시판
            </div>

            <div style={{ maxWidth: "80%" }}>
              {/* <BoardList /> */}
              <BoardPagination />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
