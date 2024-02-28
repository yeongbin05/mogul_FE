"use client";
import NormalSignup from "./SignupForm";
import Link from "next/link";

export default function Form() {
  return (
    <div>
      {/* <Signup /> */}
      <div className="flex flex-col items-center justify-center h-screen mt-16">
        <div className="text-4xl font-bold mb-8 text-center">
          <Link href="/" className="underline underline-offset-2">
            mogul
          </Link>
          에 가입하세요.
        </div>
        <div className="mb-2">
          <NormalSignup />
        </div>
      </div>
    </div>
  );
}
