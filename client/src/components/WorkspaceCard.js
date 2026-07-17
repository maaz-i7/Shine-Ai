"use client"

import React from "react"
import StarRating from "./StarRating"

export default function Component() {
  return (
    <div className="w-full h-70 flex items-center justify-between p-10 border-b border-white/10">
      <div>
        <div className="font-bold text-2xl">Leetcode - 3756. Concatenate Non-Zero Digits and Multiply by Sum II</div>
        <div className="text-sm text-gray-400 w-200 mt-3 h-15 overflow-hidden">You are given a string s of length m consisting of digits. You are also given a 2D integer array queries, where queries[i] = [li, ri].
          For each queries[i], extract the substring s[li..ri]. Then, perform the following:
          Form a new integer x by concatenating all the non-zero digits from the substring in their original order. If there are no non-zero digits, x = 0.
          Let sum be the sum of digits in x. The answer is x * sum.
        </div>
        <div className="flex w-full mt-5 items-center justify-between">
          <div className="flex w-fit gap-5 justify-between items-center">
            <div className="text-[#3adcd7] bg-[#3C3C3C] text-sm flex items-center justify-center rounded-2xl p-1 px-3">C++</div>
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
        <button className="w-50 bg-blue-500 p-2 text-center text-sm rounded-xl cursor-pointer hover:bg-blue-400 transition-colors">
          View on Canvas
        </button>
        <button className="w-50 bg-gray-500 mt-3 p-2 text-center text-sm rounded-xl cursor-pointer hover:bg-gray-400 transition-colors">
          Show Summary
        </button>
      </div>
    </div>
  )
}