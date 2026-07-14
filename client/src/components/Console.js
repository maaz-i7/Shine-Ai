"use client";

import TestCase from "@/components/TestCase.js"
import { useState } from "react";

const testCases = [
`5 4 3
1 5 3 6 2
1 2 3
2 4 5
5 3 1
4 1 2`,

`6 5 2
8 3 9 1 7 4
1 6 5
2 5 8
3 4 2
6 1 7
4 2 9`,

`4 3 1
10 20 30 40
1 2 5
2 4 6
4 1 3`,

`7 6 4
5 2 8 6 1 9 3
1 7 4
2 6 8
3 5 2
4 1 7
5 2 1
7 3 9`,

`8 5 3
12 5 9 4 8 7 2 6
1 8 4
2 7 5
3 6 8
4 5 1
8 1 9`,

`5 5 2
9 4 1 8 7
1 5 2
2 4 6
3 5 7
4 2 3
5 1 5`,

`9 4 5
2 4 6 8 1 3 5 7 9
1 9 5
2 8 4
3 7 2
4 6 9`,

`3 3 1
11 22 33
1 2 3
2 3 4
3 1 5`,

`10 6 2
7 1 9 3 5 2 8 6 4 10
1 10 5
2 9 7
3 8 2
4 7 8
5 6 1
10 1 9`,

`6 4 3
15 12 9 6 3 18
1 6 2
2 5 4
3 4 8
6 1 7`,

`7 5 1
14 13 12 11 10 9 8
1 7 9
2 6 3
3 5 6
4 2 8
7 1 4`,

`5 3 2
100 200 300 400 500
1 5 5
2 4 2
5 3 8`,

`8 6 4
1 3 5 7 9 11 13 15
1 8 3
2 7 5
3 6 7
4 5 9
5 4 2
8 2 6`,

`4 4 2
21 42 63 84
1 4 3
2 3 5
3 2 7
4 1 9`,

`9 5 3
6 1 8 2 7 3 9 4 5
1 9 2
2 8 4
3 7 6
4 6 8
9 1 1`,

`6 6 2
31 27 19 44 55 60
1 6 5
2 5 8
3 4 2
4 3 7
5 2 6
6 1 9`,

`7 4 1
3 6 9 12 15 18 21
1 7 4
2 6 5
3 5 6
7 1 2`,

`5 4 2
17 23 11 29 31
1 5 8
2 4 3
3 2 5
5 1 7`,

`8 3 3
2 4 8 16 32 64 128 256
1 8 1
2 7 2
8 1 3`,

`10 5 4
9 18 27 36 45 54 63 72 81 90
1 10 5
2 9 6
3 8 7
4 7 8
5 6 9`
];

export default function Console({
  isConsoleOpen,
  setIsConsoleOpen,
  CONSOLE_HEIGHT,
  MINIMIZED_CONSOLE_HEIGHT
}) {

  const [open, setOpen] = useState(null);
  const [copied, setCopied] = useState(null);

  return (
    <div style={{ height: isConsoleOpen ? CONSOLE_HEIGHT : MINIMIZED_CONSOLE_HEIGHT, }}
      className="border-t border-gray-700 bg-primary z-10 transition-[height] duration-300 ease-in-out flex flex-col shrink-0"
    >
      {isConsoleOpen ? (
        <>
          <div className="h-9 border-b border-gray-700 flex items-center justify-between px-3">
            <span className="text-sm font-medium">Console</span>
            <button
              onClick={() => setIsConsoleOpen(false)}
              className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded cursor-pointer"
            >
              Minimize
            </button>
          </div>

          <div className="flex-1 overflow-y-scroll minimal-scrollbar p-3 text-sm h-1000">
            <div className="text-xl mb-5">Test Cases</div>
            <div className="flex flex-wrap items-start">
              {testCases.map((tc, i) => (
                <TestCase
                  key={i}
                  title={`Test Case ${i + 1}`}
                  testCase={tc}
                  open={open === i}
                  setOpen={() => setOpen(open === i ? null : i)}
                  copied={copied === i}
                  handleCopy={async (e) => {
                    e.stopPropagation();

                    await navigator.clipboard.writeText(tc);

                    setCopied(i);
                    setTimeout(() => setCopied(null), 1500);
                  }}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div
          onClick={() => setIsConsoleOpen(true)}
          className="h-full flex items-center justify-center cursor-pointer hover:bg-white/5"
        >
          <span className="text-sm font-semibold tracking-wider text-gray-400">
            CONSOLE
          </span>
        </div>
      )}
    </div>
  );
}