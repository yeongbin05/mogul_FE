import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import BackgroundTest from "./BackgroundTest";

export default function profile() {
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
