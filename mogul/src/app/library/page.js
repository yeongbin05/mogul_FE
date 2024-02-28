import Navbar from "@/components/navbar/Navbar";
import BackgroundTest from "./BackgroundTest";
import Footer from "@/components/footer/Footer";

export default async function Library() {
  return (
    <div>
      <Navbar />
      <BackgroundTest />
      <Footer />
    </div>
  );
}
