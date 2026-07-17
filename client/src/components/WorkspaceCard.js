"use client"

import React from "react"
import StarRating from "./StarRating"
import Link from "next/link";

export const LANGUAGES = {
  "cpp": "C++",
  "python": "Python", 
  "java": "Java",
  "c": "C",
  "go": "Go",
  "rust": "Rust",
  "csharp": "C#",
  "typescript": "TypeScript",
  "php": "PHP",
  "ruby": "Ruby",
  "haskell": "Haskell",
  "fsharp": "F#",
};

export default function Component({ workspace }) {

  const problem = workspace?.problem

  return (
    <div className="w-full h-fit flex items-center justify-between p-10 border-b border-white/10">
      <div>
        <div className="font-bold text-2xl">{problem?.title}</div>
        <div className="flex w-full mt-5 items-center justify-between">
          <div className="flex w-fit gap-5 justify-between items-center">
            <div className="text-[#3adcd7] bg-[#3C3C3C] text-sm flex items-center justify-center rounded-2xl p-1 px-3">{LANGUAGES[workspace?.language]}</div>
            <div className="text-[#C69D24] bg-[#3C3C3C] text-sm flex items-center justify-center rounded-2xl p-1 px-3">Medium</div>
            <div className="text-gray-400 text-[15px]">2 months ago</div>
            <div className="flex">
              <div className="mr-1 text-gray-300">Solved</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 14 14"
                width="1em"
                height="1em"
                fill="none"
                className="mt-1 w-4 text-[#28a252]"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.2}
                  d="M12.598 7a5.6 5.6 0 11-3.15-5.037m2.1 1.537l-4.9 4.9-1.4-1.4"
                />
              </svg>
            </div>
          </div>
          <div>
            <StarRating />
          </div>
        </div>
        <div>
          <div className="mt-5 mb-2 text-sm text-gray-300">Problem Tags</div>
          <div className="flex">
            <div className="text-gray-300 w-fit bg-[#3C3C3C] ml-1 mr-1 text-sm flex items-center justify-center rounded-2xl p-1 px-3">Array</div>
            <div className="text-gray-300 w-fit bg-[#3C3C3C] ml-1 mr-1 text-sm flex items-center justify-center rounded-2xl p-1 px-3">Hash Tables</div>
            <div className="text-gray-300 w-fit bg-[#3C3C3C] ml-1 mr-1 text-sm flex items-center justify-center rounded-2xl p-1 px-3">Binary Search</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <Link href={`/problem/${problem?._id}`}>
          <button className="w-50 bg-blue-500 p-2 text-center text-sm rounded-xl cursor-pointer hover:bg-blue-400 transition-colors">
            View on Canvas
          </button>
        </Link>
        <button className="w-50 bg-gray-500 mt-3 p-2 text-center text-sm rounded-xl cursor-pointer hover:bg-gray-400 transition-colors">
          Show Summary
        </button>
      </div>
    </div>
  )
}