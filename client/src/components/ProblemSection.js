"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import "katex/dist/katex.min.css";

const content =
`
In this challenge, you will be given an array \`B\` and must determine an array \`A\`. There is a special rule: For all \`i\`, \`A[i] <= B[i]\`. That is, \`A[i]\` can be any number you choose such that \`1 <= A[i] <= B[i]\`. Your task is to select a series of \`A[i]\` given \`B[i]\` such that the sum of the absolute difference of consecutive pairs of \`A\` is maximized. This will be the array's cost, and will be represented by the variable \`S\` below.

The equation can be written:

$$S = \\sum_{i=2}^{N} \\vert{}A[i] - A[i - 1]\\vert{}$$

For example, if the array \`B = [1, 2, 3]\`, we know that \`1 <= A[1] <= 1\`, \`1 <= A[2] <= 2\`, and \`1 <= A[3] <= 3\`. Arrays meeting those guidelines are:

\`\`\`
[1,1,1], [1,1,2], [1,1,3]
[1,2,1], [1,2,2], [1,2,3]

\`\`\`

Our calculations for the arrays are as follows:

\`\`\`
|1-1| + |1-1| = 0   |1-1| + |2-1| = 1   |1-1| + |3-1| = 2
|2-1| + |1-2| = 2   |2-1| + |2-2| = 1   |2-1| + |3-2| = 2

\`\`\`

The maximum value obtained is \`2\`.

### Function Description

Complete the cost function in the editor below. It should return the maximum value that can be obtained.

cost has the following parameter(s):

* \`B\`: an array of integers

---

### Input Format

The first line contains the integer \`t\`, the number of test cases.

Each of the next \`t\` pairs of lines is a test case where:

* The first line contains an integer \`n\`, the length of \`B\`
* The next line contains \`n\` space-separated integers \`B[i]\`

### Constraints

* \`1 <= t <= 20\`
* \`1 < n <= 10^5\`
* \`1 <= B[i] <= 100\`
* <code>1 &lt; n &lt;= 10<sup>5</sup></code>
### Output Format

For each test case, print the maximum sum on a separate line.

### Sample Input

\`\`\`
1
5
10 1 10 1 10

\`\`\`

### Sample Output

\`\`\`
36

\`\`\`

### Explanation

The maximum sum occurs when \`A[1]=A[3]=A[5]=10\` and \`A[2]=A[4]=1\`. That is

\`|1 - 10| + |10 - 1| + |1 - 10| + |10 - 1| = 36\`.
`

export default function ProblemSection({ }) {
    return (
        <div className="problem-markdown text-white leading-8 minimal-scrollbar text-[15px] font-sans wrap-break-word h-screen overflow-y-scroll p-5">
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeRaw, rehypeKatex]}
                components={{
                    h1: ({ children }) => (
                        <h1 className="text-4xl font-bold mb-6">
                            {children}
                        </h1>
                    ),

                    h2: ({ children }) => (
                        <h2 className="text-3xl font-semibold mt-10 mb-4">
                            {children}
                        </h2>
                    ),

                    h3: ({ children }) => (
                        <h3 className="text-2xl font-semibold mt-8 mb-3">
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
                        <div className="overflow-x-auto my-6">
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