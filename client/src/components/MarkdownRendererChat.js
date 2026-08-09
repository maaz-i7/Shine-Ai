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
                    <h1 className="text-2xl font-bold mt-8 mb-4">
                        {children}
                    </h1>
                ),

                h2: ({ children }) => (
                    <h2 className="text-xl font-semibold mt-7 mb-3">
                        {children}
                    </h2>
                ),

                h3: ({ children }) => (
                    <h3 className="text-lg font-semibold mt-6 mb-2">
                        {children}
                    </h3>
                ),

                h4: ({ children }) => (
                    <h4 className="text-base font-semibold mt-5 mb-2">
                        {children}
                    </h4>
                ),

                p: ({ children }) => (
                    <p className="mb-4 leading-7 text-[15px]">
                        {children}
                    </p>
                ),

                strong: ({ children }) => (
                    <strong className="font-semibold text-foreground">
                        {children}
                    </strong>
                ),

                em: ({ children }) => (
                    <em className="italic">
                        {children}
                    </em>
                ),

                ul: ({ children }) => (
                    <ul className="list-disc pl-6 space-y-2 mb-5">
                        {children}
                    </ul>
                ),

                ol: ({ children }) => (
                    <ol className="list-decimal pl-6 space-y-2 mb-5">
                        {children}
                    </ol>
                ),

                li: ({ children }) => (
                    <li className="leading-7">
                        {children}
                    </li>
                ),

                blockquote: ({ children }) => (
                    <blockquote className="my-5 border-l-4 border-blue-500 bg-primary rounded-r-lg px-4 py-3 italic">
                        {children}
                    </blockquote>
                ),

                hr: () => (
                    <hr className="my-8 border-border" />
                ),

                table: ({ children }) => (
                    <div className="overflow-x-auto my-6 rounded-lg border border-border">
                        <table className="w-full border-collapse">
                            {children}
                        </table>
                    </div>
                ),

                thead: ({ children }) => (
                    <thead className="bg-primary">
                        {children}
                    </thead>
                ),

                tr: ({ children }) => (
                    <tr className="border-b border-border">
                        {children}
                    </tr>
                ),

                th: ({ children }) => (
                    <th className="px-4 py-3 text-left font-semibold">
                        {children}
                    </th>
                ),

                td: ({ children }) => (
                    <td className="px-4 py-3 align-top">
                        {children}
                    </td>
                ),

                code({ inline, className, children, ...props }) {
                    if (inline) {
                        return (
                            <code
                                className="rounded bg-primary px-1.5 py-0.5 text-[13px] font-mono"
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

                pre: ({ children }) => (
                    <pre className="my-5 overflow-x-auto rounded-xl bg-primary p-4 text-[13px] leading-6 minimal-scrollbar">
                        {children}
                    </pre>
                ),

                a: ({ href, children }) => (
                    <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 hover:underline"
                    >
                        {children}
                    </a>
                ),

                img: ({ src, alt }) => (
                    <img
                        src={src}
                        alt={alt}
                        className="my-5 rounded-lg border border-border max-w-full"
                    />
                ),
            }}
        >
            {text}
        </ReactMarkdown>
    );
}