import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
// import BoardList from "./[id]/BoardList";
import BackgroundTest from "./BackgroundTest";

export const dynamic = "force-dynamic";

export default function Board() {
  return (
    <div>
      <Navbar />
      <div className="text-center">
        <BackgroundTest />
      </div>
      <Footer />
    </div>
  );
}
