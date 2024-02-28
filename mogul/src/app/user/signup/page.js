"use client";
import Signup from "./Signup";
import Footer from "@/components/footer/Footer";
// export const dynamic = "force-dynamic";

export default function Form() {
  const token =
    typeof window !== "undefined"
      ? sessionStorage.getItem("accessToken")
      : null;

  // const token = sessionStorage.getItem("accessToken");
  // console.log(token);

  return (
    <div>
      <Signup />
      <Footer />
    </div>
  );
}
