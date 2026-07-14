"use client";

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
];

const outputCases = ['10', '27', '32', '19', '34']
const expOutputCases = ['20', '27', '32', '19', '34']

import TestCase from "@/components/TestCase.js"
import { useState } from "react";

const CheckIcon = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M7.29417 12.9577L10.5048 16.1681L17.6729 9"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx={12}
      cy={12}
      r={10}
      stroke="currentColor"
      strokeWidth={2}
    />
  </svg>
);

const CopyIcon = ({ className = "w-4 h-4 text-gray-400 hover:text-white cursor-pointer" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <rect
      x="9"
      y="9"
      width="11"
      height="11"
      rx="2"
      stroke="currentColor"
      strokeWidth={2}
    />
    <path
      d="M15 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
    />
  </svg>
);

export default function Console({
  isConsoleOpen,
  setIsConsoleOpen,
  CONSOLE_HEIGHT,
  MINIMIZED_CONSOLE_HEIGHT
}) {

  const [open, setOpen] = useState(null);
  const [caseInd, setCaseInd] = useState(0);
  const [copiedTestCase, setCopiedTestCase] = useState(null);
  const [copiedOutput, setCopiedOutput] = useState(false);
  const [copiedExpected, setCopiedExpected] = useState(false);
  const [output, setOutput] = useState('');
  const [expOutput, setExpOutput] = useState('');

  const handleCopy = async (e, text, type, index = null) => {
    e.stopPropagation();

    await navigator.clipboard.writeText(text);

    if (type === "testcase") {
      setCopiedTestCase(index);
      setTimeout(() => setCopiedTestCase(null), 1500);
    } else if (type === "output") {
      setCopiedOutput(true);
      setTimeout(() => setCopiedOutput(false), 1500);
    } else if (type === "expected") {
      setCopiedExpected(true);
      setTimeout(() => setCopiedExpected(false), 1500);
    }
  };

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

          <div className="flex-1 overflow-y-scroll minimal-scrollbar p-3 text-sm">
            <div className="text-xl mb-3">Test Cases</div>
            <div className="flex flex-wrap items-start h-50 overflow-y-scroll minimal-scrollbar">
              {
                testCases.map((tc, i) => (<TestCase
                  key={i}
                  title={`Test Case ${i + 1}`}
                  testCase={tc}
                  open={open === i}
                  setOpen={() => {
                    setOpen(open === i ? null : i);
                    setCaseInd(i);
                    setOutput(outputCases[i]);
                    setExpOutput(expOutputCases[i]);
                  }}
                  copied={copiedTestCase === i}
                  handleCopy={(e) => handleCopy(e, tc, "testcase", i)}
                />))
              }

            </div>
            <div className="h-100">
              <div className="text-xl mb-3 mt-3">Results</div>
              <div className="w-full flex">
                <div className="w-1/2 rounded-lg bg-secondary p-5 mr-1 h-fit">
                  <div className="text-base mb-2">
                    <div className="flex">
                      <div>Output</div>
                      <button
                        onClick={(e) => handleCopy(e, output, "output")}
                        className="rounded p-1 hover:bg-white/10 ml-auto"
                      >
                        {copiedOutput ? <CheckIcon /> : <CopyIcon />}
                      </button>
                    </div>
                  </div>
                  <div className="bg-primary p-2 min-h-10 max-h-70 overflow-auto minimal-scrollbar">
                    <pre>{output}</pre>
                  </div>
                </div>
                <div className="w-1/2 rounded-lg bg-secondary p-5 ml-1 h-fit">
                  <div className="flex">
                    <div className="text-base mb-2">Expected</div>
                    <button
                      onClick={(e) => handleCopy(e, expOutput, "expected")}
                      className="rounded p-1 hover:bg-white/10 ml-auto"
                    >
                      {copiedExpected ? <CheckIcon /> : <CopyIcon />}
                    </button>
                  </div>
                  <div className="bg-primary p-2 min-h-10 max-h-70 overflow-auto minimal-scrollbar">
                    <pre>{expOutput}</pre>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="text-xl mb-3 mt-3">Console</div>
              <div className="w-full h-100 bg-[#0c1d0a]"></div>
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