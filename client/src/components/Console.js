"use client";
import { ChevronDown, ChevronUp, Copy, Check, PlusIcon, Loader2 } from "lucide-react";
import useTestCasesStore from "@/stores/testcases.store.js";
import TestCase from "@/components/TestCase.js"
import { useEffect, useRef, useState } from "react";

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text ?? "");
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <button
      onClick={handleCopy}
      className="rounded p-1 hover:scale-115 transition-all mr-2 cursor-pointer"
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
  const verdict = useTestCasesStore((state) => state.verdict);
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

  return (
    <div style={{ height: isConsoleOpen ? CONSOLE_HEIGHT : MINIMIZED_CONSOLE_HEIGHT, }}
      className="border-gray-700 bg-primary rounded-xl z-10 flex flex-col shrink-0"
    >
      {isConsoleOpen ? (
        <>
          <div onClick={() => setIsConsoleOpen(false)} className="h-10 cursor-pointer bg-[#202020] rounded-xl hover:bg-white/5 border-gray-700 flex items-center justify-between py-6 p-5">
            {verdict !== "Judging" ? <div className={`${verdict !== "Accepted" ? "text-red-600" : "text-green-600"} text-xl font-medium`}>{verdict}</div> : <Loader2 className="w-5 h-5 animate-spin" />}
            <ChevronDown size={16} />
          </div>

          <div className="font-sans overflow-y-scroll minimal-scrollbar p-5 text-sm">

            {/* Test Cases  */}
            <div className="text-xl mb-3">Test Cases</div>
            <div className="flex flex-col">
              <div className="flex flex-col">
                <textarea placeholder="Add test case here" ref={textareaRef} className="bg-black minimal-scrollbar h-30 font-mono p-3 resize-y focus:outline-0 mb-3" name="" id=""></textarea>
                <button onClick={handleAddTestCase} className="flex rounded items-center justify-center w-26 m-1 p-1 active:scale-99 border mb-3 transition-all bg-tertiary border-white/10 hover:bg-[#313131] cursor-pointer mt-auto">
                  <PlusIcon className="w-3 mr-1" />
                  Test Case
                </button>
              </div>
              {/* Test Cases Map */}
              <div className="flex flex-wrap items-start max-h-40 overflow-y-scroll minimal-scrollbar">
                {testCases.map((tc, i) => (
                  <TestCase
                    key={i}
                    title={`Case ${i + 1}`}
                    i={i}
                    status={tc.status}
                  />
                ))}
              </div>
            </div>

            {/* Results */}
            <div>
              <div className="text-xl mt-5 mb-3">Results</div>
              <div className="flex flex-col">
                <div className="mb-2">
                  <div className="flex justify-between w-full bg-secondary rounded-t-lg">
                    <div className="text-base p-2 px-4">Input</div>
                    <CopyButton text={currentTestCase?.input} />
                  </div>
                  <pre className="bg-black max-h-40 overflow-auto minimal-scrollbar p-4 text-sm font-mono">
                    {currentTestCase?.input}
                  </pre>
                </div>
                <div className="flex">
                  <div className="w-1/2 mr-1">
                    <div className="flex justify-between w-full bg-secondary rounded-t-lg">
                      <div className="text-base p-2 px-4">Output</div>
                      <CopyButton text={currentTestCase?.output} />
                    </div>
                    <pre className="bg-black max-h-40 overflow-auto minimal-scrollbar p-4 text-sm font-mono">
                      {currentTestCase?.output ?? ""}
                    </pre>
                  </div>
                  <div className="w-1/2 ml-1">
                    <div className="flex justify-between w-full bg-secondary rounded-t-lg">
                      <div className="text-base p-2 px-4">Expected</div>
                      <CopyButton text={currentTestCase?.expected} />
                    </div>
                    <pre className="bg-black max-h-40 overflow-auto minimal-scrollbar p-4 text-sm font-mono">
                      {currentTestCase?.expected ?? ""}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Console */}
            <div>
              <div className="text-xl mt-5 mb-3">Console</div>
              <div>
                <div className="bg-black w-full font-mono text-base p-4">
                  <CopyButton text={currentTestCase?.execution.error} />
                  <div className={`${currentTestCase?.execution.message !== "Success" ? "text-red-600" : "text-green-600"}  font-bold`}>{currentTestCase?.execution.message}</div>
                  <div className={`text-red-600 text-sm ${currentTestCase?.execution.message === "Success" ? "text-yellow-400" : ""}`}>{currentTestCase?.execution.error}</div>
                </div>
              </div>
            </div>

          </div>
        </>
      ) : (
        <div
          onClick={() => setIsConsoleOpen(true)}
          className="h-10 py-6 p-5 flex items-center justify-between cursor-pointer hover:bg-white/5"
        >
          {verdict !== "Judging" ? <div className={`${verdict !== "Accepted" ? "text-red-600" : "text-green-600"} text-xl font-medium`}>{verdict}</div> : <Loader2 className="w-5 h-5 animate-spin" />}
          <ChevronUp size={16} />
        </div>
      )}
    </div>
  );
}