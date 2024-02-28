import BoardCreate from "./BoardCreate";
import Navbar from "@/components/navbar/Navbar";
import BackgroundTest from "./BackgroundTest";
import Footer from "@/components/footer/Footer";

export default function BoardWrite() {
  return (
    <div>
      <Navbar />
      {/* <div className="text-center">
        <BoardCreate />
      </div> */}
      <div className="text-center">
        <BackgroundTest />
      </div>
      <Footer />
    </div>
  );
}
