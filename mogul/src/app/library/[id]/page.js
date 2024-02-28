import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
// import LibraryIndividual from "./LibraryIndividual";
import BackgroundTest from "./BackgroundTest";

export default function LibraryDetail({ params }) {
  return (
    <div>
      <div>
        <Navbar />
        {/* <LibraryIndividual userId={params.id} /> */}
        <BackgroundTest libraryId={params.id} />
        <Footer />
      </div>
    </div>
  );
}
