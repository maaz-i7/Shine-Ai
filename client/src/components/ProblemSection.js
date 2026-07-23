"use client";

import MarkdownRenderer from "./MarkdownRenderer.js"
import { Circle, Clock3, CheckCircle2, RotateCcw } from "lucide-react";
import { useState } from "react";
import { ChevronDown, ChevronUp, Tag } from "lucide-react";

export default function ProblemSection({ workspace }) {

    const [showTags, setShowTags] = useState(false);

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

    const problem = workspace?.problem
    return (

        <div className="w-full h-screen font-sans overflow-y-scroll minimal-scrollbar p-5">
            {/* Title */}
            <div className="text-2xl font-bold mt-5">{problem?.title}</div>

            <div className="w-full flex items-center justify-between mt-5 mb-5">
                <div className="flex">
                    {/* Difficulty Tag */}
                    <div
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-[12px] font-semibold
                        ${problem?.difficulty === "Easy" ? "bg-green-500/15 text-green-400" : problem?.difficulty === "Medium" ? "bg-yellow-500/15 text-yellow-400" : problem?.difficulty === "Hard" ? "bg-red-500/15 text-red-400" : "bg-purple-500/15 text-purple-400"}`}
                    >
                        {problem?.difficulty}
                    </div>

                    <button
                        onClick={() => setShowTags(!showTags)}
                        className="flex ml-3 items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors cursor-pointer"
                    >
                        <Tag size={16} />
                        <span>Tags</span>
                        {showTags ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                </div>

                {/* Solve Status */}
                <div
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}
                >
                    <Icon size={14} strokeWidth={2.2} />
                    <span>{workspace?.status}</span>
                </div>
            </div>

            {/* Problem Tags */}
            <div className="mt-7 mb-7">
                {showTags && (
                    <div className="mt-3 flex bg-[#171717] flex-wrap gap-2 rounded-3xl p-5">
                        {problem?.tags?.map((tag, index) => (
                            <span
                                key={index}
                                className="rounded-full bg-[#2d2d2d] px-3 py-1 text-[12px] font-medium text-gray-300 hover:bg-[#3a3a3a] transition-colors"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Problem Statement */}
            <div className="problem-markdown bg-primary text-white leading-8 text-[15px] h-fit">
                <MarkdownRenderer text={problem?.statement} />
            </div>
        </div>
    );
}