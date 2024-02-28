import Head from "next/head"
import Link from "next/link";
import React from "react"

function Header({ heading, buttonText }) {
  return (
    <header>
      <div
        className="shadow-xl mb-10 w-full px-4 py-8 sm:px-6 sm:py-12 lg:px-8"
        style={{
          backgroundColor: "#FDF7E4",
        }}
      >
        <div className="flex justify-between">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{ heading }</h1>
          </div>
          {buttonText && (
            <button
              className="hover:text-white text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              style={{
                backgroundColor: "#BBAB8C",
              }}
            >
              <Link
                className="align-middle"
                href={{
                  pathname: '/webtoon/all',
                  // query: { name: 'test' },
                }}
              >
                {buttonText}
              </Link>
            </button>
          )
          }
        </div>
      </div>
    </header>
  )
}

export default Header;