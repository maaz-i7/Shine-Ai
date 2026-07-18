"use client";
import { ChevronDown, ChevronUp, Copy, CheckCircle2Icon } from "lucide-react";

const testCases = [
  `5 4 3
1 5 3 6 2 1 1 1 1 1 1 1 1 1 1 1 
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

export default function Console({
  isConsoleOpen,
  setIsConsoleOpen,
  CONSOLE_HEIGHT,
  MINIMIZED_CONSOLE_HEIGHT
}) {

  const [open, setOpen] = useState(null);
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
      className="border-gray-700 bg-primary rounded-xl z-10 transition-[height] duration-300 ease-in-out flex flex-col shrink-0"
    >
      {isConsoleOpen ? (
        <>
          <div onClick={() => setIsConsoleOpen(false)} className="h-10 cursor-pointer bg-[#202020] rounded-xl hover:bg-white/5 border-gray-700 flex items-center justify-between py-6 p-5">
            {/* <span className="text-xl font-medium text-green-600">Accepted</span> */}
            <span className="text-xl font-medium text-red-600">Time Limit Exceeded</span>
            <ChevronDown size={16} />
          </div>

          <div className="flex-1 overflow-y-scroll minimal-scrollbar p-5 text-sm">
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
                        {copiedOutput ? (<CheckCircle2Icon className="text-gray-300/80 w-3.5 h-3.5" />) : (<Copy className="text-gray-300/80 w-3.5 h-3.5 cursor-pointer" />)}
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
                      {copiedExpected ? (<CheckCircle2Icon className="text-gray-300/80 w-3.5 h-3.5" />) : (<Copy className="text-gray-300/80 w-3.5 h-3.5 cursor-pointer" />)}
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
              <div className="w-full h-100 bg-[#050521]"></div>
            </div>
          </div>
        </>
      ) : (
        <div
          onClick={() => setIsConsoleOpen(true)}
          className="h-10 py-6 p-5 flex items-center justify-between cursor-pointer hover:bg-white/5"
        >
          <span className="text-xl font-medium text-green-600">Accepted</span>
          <ChevronUp size={16} />
        </div>
      )}
    </div>
  );
}