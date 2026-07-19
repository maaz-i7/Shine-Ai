"use client";
import { ChevronDown, ChevronUp, Copy, Check, PlusIcon } from "lucide-react";
import useTestCasesStore from "@/stores/testcases.store.js";
import TestCase from "@/components/TestCase.js"
import { useEffect, useRef, useState } from "react";

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text ?? "");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      className="rounded p-1 hover:scale-105 mr-2 cursor-pointer transition-colors"
      title="Copy"
    >
      {copied ? (
        <Check className="w-4 h-4 text-white" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </button>
  );
}

export default function Console({ isConsoleOpen, setIsConsoleOpen, CONSOLE_HEIGHT, MINIMIZED_CONSOLE_HEIGHT }) {

  const testCases = useTestCasesStore((state) => state.testCases);
  const addTestCase = useTestCasesStore((state) => state.addTestCase);
  const setTestCases = useTestCasesStore((state) => state.setTestCases);
  const selectedTestCase = useTestCasesStore(
    (state) => state.selectedTestCase
  );
  const currentTestCase = testCases[selectedTestCase]
  const textareaRef = useRef()

  const handleAddTestCase = () => {
    const input = textareaRef.current?.value.trim();

    if (!input) return;

    addTestCase(input);
    // textareaRef.current.value = "";
  };


  useEffect(() => {
    setTestCases([
      {
        input: "50\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n",
        output: "50\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n",
        expected: "50\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n",
      },
      {
        input: "5\n6",
        output: "23",
        expected: "11",
      },
      {
        input: "7 8 9",
        output: "34",
        expected: "24",
      },
    ]);
  }, [setTestCases]);


  return (
    <div style={{ height: isConsoleOpen ? CONSOLE_HEIGHT : MINIMIZED_CONSOLE_HEIGHT, }}
      className="border-gray-700 bg-primary rounded-xl z-10 flex flex-col shrink-0"
    >
      {isConsoleOpen ? (
        <>
          <div onClick={() => setIsConsoleOpen(false)} className="h-10 cursor-pointer bg-[#202020] rounded-xl hover:bg-white/5 border-gray-700 flex items-center justify-between py-6 p-5">
            <span className="text-xl font-medium text-red-600">Time Limit Exceeded</span>
            <ChevronDown size={16} />
          </div>

          <div className="font-sans overflow-y-scroll minimal-scrollbar p-5 text-sm">

            {/* Test Cases  */}
            <div className="text-xl mb-3">Test Cases</div>
            <div className="flex flex-col">
              <div className="flex flex-col">
                <textarea placeholder="Add test case here" ref={textareaRef} className="bg-black minimal-scrollbar h-30 font-mono p-3 resize-y focus:outline-0 mb-3" name="" id=""></textarea>
                <button onClick={handleAddTestCase} className="flex items-center justify-center w-30 m-1 p-1 rounded active:scale-99 border mb-3 transition-all bg-tertiary border-white/10 hover:bg-[#313131] cursor-pointer mt-auto">
                  <PlusIcon className="w-4 mb-0.5 mr-1" />
                  Test Case
                </button>
              </div>
              {/* Test Cases Map */}
              <div className="flex flex-wrap items-start max-h-40 overflow-y-scroll minimal-scrollbar">
                {
                  testCases.map((tc, i) =>
                    (tc.input || tc.output || tc.expected) && (
                      <TestCase
                        key={i}
                        title={`Case ${i + 1}`}
                        i={i}
                      />
                    )
                  )
                }
              </div>
            </div>

            {/* Results */}
            <div>
              <div className="text-xl mt-5 mb-3">Results</div>
              <div className="flex flex-col">
                <div className="rounded-sm mb-2">
                  <div className="flex justify-between w-full bg-secondary">
                    <div className=" text-base p-2 px-2">Input</div>
                    <CopyButton text={currentTestCase?.input} />
                  </div>
                  <pre className="bg-black max-h-40 overflow-auto minimal-scrollbar p-4 text-sm font-mono">
                    {currentTestCase?.input}
                  </pre>
                </div>
                <div className="flex">
                  <div className="w-1/2 mr-1 rounded-sm">
                    <div className="flex justify-between w-full bg-secondary">
                      <div className=" text-base p-2 px-2">Output</div>
                      <CopyButton text={currentTestCase?.output} />
                    </div>
                    <pre className="bg-black max-h-40 overflow-auto minimal-scrollbar p-4 text-sm font-mono">
                      {currentTestCase?.output}
                    </pre>
                  </div>
                  <div className="w-1/2 ml-1 rounded-sm">
                    <div className="flex justify-between w-full bg-secondary">
                      <div className=" text-base p-2 px-2">Expected</div>
                      <CopyButton text={currentTestCase?.expected} />
                    </div>
                    <pre className="bg-black max-h-40 overflow-auto minimal-scrollbar p-4 text-sm font-mono">
                      {currentTestCase?.expected}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Console */}
            <div>
              <div className="text-xl mt-5 mb-3">Console</div>
              <div className="bg-black w-full h-50">

              </div>
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