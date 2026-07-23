"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import "katex/dist/katex.min.css";

export default function MarkdownRenderer({ text }) {
    return (
        <div className="text-sm leading-7 text-gray-100 wrap-break-words">
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeRaw, rehypeKatex]}
                components={{
                    h1: ({ children }) => (
                        <h1 className="text-xl font-bold mt-4 mb-2">
                            {children}
                        </h1>
                    ),

                    h2: ({ children }) => (
                        <h2 className="text-lg font-semibold mt-4 mb-2">
                            {children}
                        </h2>
                    ),

                    h3: ({ children }) => (
                        <h3 className="text-base font-semibold mt-3 mb-2">
                            {children}
                        </h3>
                    ),

                    p: ({ children }) => (
                        <p className="mb-3 whitespace-pre-wrap">
                            {children}
                        </p>
                    ),

                    ul: ({ children }) => (
                        <ul className="list-disc pl-5 mb-3 space-y-1">
                            {children}
                        </ul>
                    ),

                    ol: ({ children }) => (
                        <ol className="list-decimal pl-5 mb-3 space-y-1">
                            {children}
                        </ol>
                    ),

                    li: ({ children }) => (
                        <li className="leading-7">
                            {children}
                        </li>
                    ),

                    blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-blue-500/60 pl-4 italic text-gray-300 my-3">
                            {children}
                        </blockquote>
                    ),

                    hr: () => (
                        <hr className="my-4 border-gray-700" />
                    ),

                    table: ({ children }) => (
                        <div className="overflow-x-auto my-4 rounded-lg border border-gray-700">
                            <table className="min-w-full border-collapse text-sm">
                                {children}
                            </table>
                        </div>
                    ),

                    thead: ({ children }) => (
                        <thead className="bg-tertiary">
                            {children}
                        </thead>
                    ),

                    tr: ({ children }) => (
                        <tr className="border-b border-gray-700">
                            {children}
                        </tr>
                    ),

                    th: ({ children }) => (
                        <th className="px-4 py-2 text-left font-semibold border-r border-gray-700 last:border-r-0">
                            {children}
                        </th>
                    ),

                    td: ({ children }) => (
                        <td className="px-4 py-2 border-r border-gray-700 last:border-r-0">
                            {children}
                        </td>
                    ),

                    code({ inline, className, children, ...props }) {
                        if (inline) {
                            return (
                                <code
                                    className="rounded bg-[#2d2d2d] px-1.5 py-0.5 font-mono text-[0.85em] text-red-300"
                                    {...props}
                                >
                                    {children}
                                </code>
                            );
                        }

                        return (
                            <code
                                className={className}
                                {...props}
                            >
                                {children}
                            </code>
                        );
                    },

                    pre({ children }) {
                        return (
                            <pre className="my-4 overflow-x-auto rounded-xl bg-[#171717] border border-gray-700 p-4 text-[13px] leading-6 minimal-scrollbar">
                                {children}
                            </pre>
                        );
                    },

                    a: ({ href, children }) => (
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
                        >
                            {children}
                        </a>
                    ),

                    img: ({ src, alt }) => (
                        <img
                            src={src}
                            alt={alt}
                            className="my-3 rounded-xl max-w-full"
                        />
                    ),

                    strong: ({ children }) => (
                        <strong className="font-semibold text-white">
                            {children}
                        </strong>
                    ),

                    em: ({ children }) => (
                        <em className="italic text-gray-200">
                            {children}
                        </em>
                    ),
                }}
            >
                {text}
            </ReactMarkdown>
        </div>
    );
}