import BoardDetail from "./BoardDetail";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

// 게시판 상세 글번호를 url이 아니라 여기서
// props로 보내자
export default function BoardDetailPage() {
  return (
    <div>
      <Navbar />
      <BoardDetail />
      <Footer />
    </div>
  );
}
