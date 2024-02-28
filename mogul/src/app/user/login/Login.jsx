"use client";

import NormalLogin from "./LoginForm";
import Link from "next/link";

export default function Form() {
  return (
    <div>
      {/* <login /> */}
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-4xl font-bold mb-8 text-center">
          <div className="signup_text"><Link href="/" className="underline underline-offset-2">mogul</Link>에 로그인하세요.</div>
        </div>
        <div className="mb-2">
          <NormalLogin />
        </div>
      </div>
    </div>
  );
}
