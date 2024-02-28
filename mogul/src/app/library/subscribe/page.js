import Navbar from "@/components/navbar/Navbar";
import BackgroundTest from "./BackgroundTest";
import Footer from "@/components/footer/Footer";

export const dynamic = "force-dynamic";

export default function MyLibraryLists() {
  return (
    <div>
      <div>
        <Navbar />
        <BackgroundTest />
        <Footer />
      </div>
    </div>
  );
}
