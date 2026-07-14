"use client"

export default function Component() {
    return (
        <div className="p-5 h-screen overflow-y-auto minimal-scrollbar pt-10">
            <div className="font-bold text-2xl">Leetcode - 3756. Concatenate Non-Zero Digits and Multiply by Sum II</div>
            <div className="flex w-full justify-between gap-2 mt-3 mb-5 items-center">
                <div className="text-[#C69D24] bg-[#3C3C3C] w-fit flex items-center justify-center rounded-2xl p-1 px-3 text-[14px]">Medium</div>
                <div className="flex">
                    <div className="mr-1 text-gray-300 text-[14px]">Solved</div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 14 14"
                        width="1em"
                        height="1em"
                        fill="none"
                        className="mt-0.5 w-4 text-[#28a252]"
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

            {/* Problem Statement formatted */}
            <div className="mt-3 text-[15px] text-white leading-7">
                <p>
                    You are given a string <span className="highlight-bg">s</span> of length{" "}
                    <span className="highlight-bg">m</span> consisting of digits. You are also
                    given a 2D integer array{" "}
                    <span className="highlight-bg">queries</span>, where
                </p>

                <div className="mt-2 ml-5">
                    <ul className="list-disc space-y-2">
                        <li>
                            <span className="highlight-bg">queries[i] = [l<sub>i</sub>, r<sub>i</sub>]</span>
                        </li>
                    </ul>
                </div>

                <p className="mt-4">
                    For each query, consider the substring{" "}
                    <span className="highlight-bg">s[l<sub>i</sub>...r<sub>i</sub>]</span> and
                    perform the following operations:
                </p>

                <div className="mt-3 ml-5">
                    <ol className="list-decimal space-y-3">
                        <li>
                            Form a new integer <span className="highlight-bg">x</span> by
                            concatenating all the <strong>non-zero</strong> digits from the
                            substring while preserving their original order.
                            <ul className="list-disc ml-6 mt-2">
                                <li>
                                    If the substring contains no non-zero digits, then{" "}
                                    <span className="highlight-bg">x = 0</span>.
                                </li>
                            </ul>
                        </li>

                        <li>
                            Compute <span className="highlight-bg">sum</span>, the sum of the digits
                            of <span className="highlight-bg">x</span>.
                        </li>

                        <li>
                            The answer for the query is:
                            <div className="mt-2">
                                <span className="highlight-bg font-semibold">
                                    x × sum
                                </span>
                            </div>
                        </li>
                    </ol>
                </div>

                <p className="mt-5">
                    Return an array containing the answer for each query in the same order.
                </p>
            </div>

        </div>
    )
}