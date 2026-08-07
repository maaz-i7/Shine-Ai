"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import "katex/dist/katex.min.css";

export default function MarkdownRenderer({ text }) {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeRaw, rehypeKatex]}
            components={{
                h1: ({ children }) => (
                    <h1 className="text-[24px] font-semibold mt-8 mb-4">
                        {children}
                    </h1>
                ),

                h2: ({ children }) => (
                    <h2 className="text-[20px] font-semibold mt-8 mb-3">
                        {children}
                    </h2>
                ),

                h3: ({ children }) => (
                    <h3 className="text-[17px] font-semibold mt-15 mb-2">
                        {children}
                    </h3>
                ),

                p: ({ children }) => (
                    <p className="mb-3 text-[14px] leading-7">
                        {children}
                    </p>
                ),

                strong: ({ children }) => (
                    <strong className="font-semibold text-white">
                        {children}
                    </strong>
                ),

                em: ({ children }) => (
                    <em className="italic">
                        {children}
                    </em>
                ),

                ul: ({ children }) => (
                    <ul className="list-disc ml-6 mb-4 space-y-1 text-[14px] leading-7">
                        {children}
                    </ul>
                ),

                ol: ({ children }) => (
                    <ol className="list-decimal ml-6 mb-4 space-y-2 text-[14px] leading-7">
                        {children}
                    </ol>
                ),

                li: ({ children }) => (
                    <li>{children}</li>
                ),

                hr: () => (
                    <hr className="my-6 border-border" />
                ),

                blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-border pl-4 italic opacity-80 my-4">
                        {children}
                    </blockquote>
                ),

                table: ({ children }) => (
                    <div className="overflow-x-auto my-5">
                        <table className="w-full border-collapse text-[14px]">
                            {children}
                        </table>
                    </div>
                ),

                thead: ({ children }) => (
                    <thead className="bg-secondary">
                        {children}
                    </thead>
                ),

                tr: ({ children }) => (
                    <tr className="border-b border-border">
                        {children}
                    </tr>
                ),

                th: ({ children }) => (
                    <th className="px-4 py-2 text-left font-medium border border-border">
                        {children}
                    </th>
                ),

                td: ({ children }) => (
                    <td className="px-4 py-2 border border-border">
                        {children}
                    </td>
                ),

                code({ inline, className, children, ...props }) {
                    if (inline) {
                        return (
                            <code
                                className="
                                    rounded
                                    bg-primary
                                    px-1.5
                                    py-0.5
                                    font-mono
                                    text-[13px]
                                "
                                {...props}
                            >
                                {children}
                            </code>
                        );
                    }

                    return (
                        <code className={className} {...props}>
                            {children}
                        </code>
                    );
                },

                pre: ({ children }) => (
                    <pre
                        className="
                            my-5
                            overflow-x-auto
                            rounded-lg
                            bg-secondary
                            p-4
                            text-[13px]
                            leading-6
                            minimal-scrollbar
                        "
                    >
                        {children}
                    </pre>
                ),

                a: ({ href, children }) => (
                    <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                    >
                        {children}
                    </a>
                ),

                img: ({ src, alt }) => (
                    <img
                        src={src}
                        alt={alt}
                        className="my-5 rounded-lg max-w-full"
                    />
                ),
            }}
        >
            {text}
        </ReactMarkdown>
    );
}