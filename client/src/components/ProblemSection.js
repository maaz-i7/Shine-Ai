"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import "katex/dist/katex.min.css";

export default function ProblemSection({content}) {
    return (
        <div className="problem-markdown bg-primary text-white leading-8 minimal-scrollbar w-112.5 text-[15px] font-sans wrap-break-word h-screen overflow-y-scroll p-5">
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
                {content}
            </ReactMarkdown>
        </div>
    );
}