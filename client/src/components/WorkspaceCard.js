"use client"

import React from "react"
import ScoreBar from "./ScoreBar"
import Link from "next/link";
import { Circle, Clock3, CheckCircle2, RotateCcw } from "lucide-react";

export function getTimeAgo(date) {
  const now = new Date();
  const created = new Date(date);

  const seconds = Math.floor((now - created) / 1000);

  if (seconds < 5) return "Just now";

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);

    if (count >= 1) {
      if (interval.label === "day" && count === 1) {
        return "Yesterday";
      }

      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "Just now";
}

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
  const statusConfig = {
    Todo: {
      icon: Circle,
      className: "text-blue-300 text-[15px]",
    },
    Solving: {
      icon: Clock3,
      className: "text-blue-400 text-[15px]",
    },
    Solved: {
      icon: CheckCircle2,
      className: "text-green-400 text-[15px]",
    },
    Revisit: {
      icon: RotateCcw,
      className: "text-orange-400 text-[15px]",
    },
  };

  const status = statusConfig[workspace?.status] || statusConfig.Todo;
  const Icon = status.icon;

  return (
    <div className="w-full h-fit flex items-center justify-between p-5 border-b border-white/10">
      <div className="w-full">
        <div className="font-bold text-xl">{problem?.title}</div>
        <div className="flex w-full mt-5 items-center justify-between">
          <div className="flex w-fit gap-5 justify-between items-center">
            <div className="text-[#3adcd7] bg-[#3C3C3C] text-[12px] font-semibold flex items-center justify-center rounded-2xl px-2.5 py-1">{LANGUAGES[workspace?.language]}</div>
            {/* Difficulty Tag */}
            <div
              className={`inline-flex items-center rounded-full px-2.5 py-1 text-[12px] font-semibold
                        ${problem?.difficulty === "Easy" ? "bg-green-500/15 text-green-400" : problem?.difficulty === "Medium" ? "bg-yellow-500/15 text-yellow-400" : problem?.difficulty === "Hard" ? "bg-red-500/15 text-red-400" : "bg-purple-500/15 text-purple-400"}`}
            >
              {problem?.difficulty}
            </div>
            <div className="text-gray-400 text-[13px]">{getTimeAgo(workspace?.createdAt)}</div>
            {/* Solve Status */}
            <div
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}
            >
              <Icon size={14} strokeWidth={2.2} />
              <span>{workspace?.status}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <Link href={`/problem/${problem?._id}`}>
          <button className="w-40 bg-blue-500 p-1 px-3 mb-5 text-center text-sm rounded-xl cursor-pointer hover:bg-blue-400 transition-colors">
            View on Canvas
          </button>
        </Link>
        <div className="w-fit">
          <ScoreBar score={workspace?.score} />
        </div>
      </div>
    </div>
  )
}