"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import "katex/dist/katex.min.css";
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
            <div className="text-4xl font-bold mt-5">{problem?.title}</div>

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
                <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeRaw, rehypeKatex]}
                    components={{
                        h1: ({ children }) => (
                            <h1 className="text-3xl font-bold mb-6">
                                {children}
                            </h1>
                        ),

                        h2: ({ children }) => (
                            <h2 className="text-2xl font-semibold mt-10 mb-4">
                                {children}
                            </h2>
                        ),

                        h3: ({ children }) => (
                            <h3 className="text-xl font-semibold mt-8 mb-3">
                                {children}
                            </h3>
                        ),

                        p: ({ children }) => (
                            <p className="mb-4 leading-8">
                                {children}
                            </p>
                        ),

                        ul: ({ children }) => (
                            <ul className="list-disc ml-7 mb-5 space-y-2">
                                {children}
                            </ul>
                        ),

                        ol: ({ children }) => (
                            <ol className="list-decimal ml-7 mb-5 space-y-2">
                                {children}
                            </ol>
                        ),

                        li: ({ children }) => (
                            <li>{children}</li>
                        ),

                        blockquote: ({ children }) => (
                            <blockquote className="border-l-4 border-gray-600 pl-4 italic text-gray-300 my-4">
                                {children}
                            </blockquote>
                        ),

                        table: ({ children }) => (
                            <div className="overflow-x-auto minimal-scrollbar my-6">
                                <table className="border-collapse border border-gray-700">
                                    {children}
                                </table>
                            </div>
                        ),

                        thead: ({ children }) => (
                            <thead className="bg-[#202020]">
                                {children}
                            </thead>
                        ),

                        tbody: ({ children }) => (
                            <tbody>{children}</tbody>
                        ),

                        tr: ({ children }) => (
                            <tr className="border-b border-gray-700">
                                {children}
                            </tr>
                        ),

                        hr: () => (
                            <hr className="my-8 border-0 h-px bg-gray-700" />
                        ),

                        th: ({ children }) => (
                            <th className="border border-gray-700 px-4 py-2 text-left font-semibold">
                                {children}
                            </th>
                        ),

                        td: ({ children }) => (
                            <td className="border border-gray-700 px-4 py-2">
                                {children}
                            </td>
                        ),



                        pre({ children }) {
                            return (
                                <pre
                                    className="
                                    bg-[#1e1e1e]
                                    border
                                    border-gray-700
                                    rounded-lg
                                    p-4
                                    overflow-x-auto
                                    minimal-scrollbar
                                    my-5
                                    text-sm
                                "
                                >
                                    {children}
                                </pre>
                            );
                        },
                    }}
                >
                    {problem?.statement}
                </ReactMarkdown>
            </div>
        </div>
    );
}