"use client";
import { Check, CheckCircle2Icon, Copy } from "lucide-react";

export default function Component({ title, testCase, open, setOpen, copied, handleCopy }) {

  return (
    <div onClick={() => setOpen(!open)} className="w-36 m-1 px-2 p-2 rounded active:scale-99 border transition-all bg-secondary border-white/10 hover:bg-[#313131] cursor-pointer">
      <div className="flex w-full items-center justify-between">
        <div>{title}</div>

        {/* Judge Result */}
        <div className="flex items-center gap-2 mr-2">
          <Check strokeWidth={3} className="w-2.5 h-2.5 ml-1 text-primary rounded-xs p-0.5 bg-green-600" />
        </div>
        <div>
          {/* Copy Icon */}
          <button
            onClick={handleCopy}
            className="rounded p-1 hover:bg-white/10 ml-auto"
            title="Copy"
          >
            {copied ? ( <CheckCircle2Icon className="text-gray-300/80 w-3.5 h-3.5" />) : ( <Copy className="text-gray-300/80 w-3.5 h-3.5 cursor-pointer" />)}
          </button>
        </div>
      </div>

      {open && (
        <div className="p-2 flex flex-col bg-primary mt-2">
          <div className="max-w-1/1 max-h-30 overflow-auto minimal-scrollbar">
            <pre className="whitespace-pre">
              {testCase}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}