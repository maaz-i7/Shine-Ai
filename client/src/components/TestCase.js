"use client";
import { Check } from "lucide-react";
import useTestCasesStore from "@/stores/testcases.store";

export default function Component({ title, i }) {

  const selectedTestCase = useTestCasesStore(
    (state) => state.selectedTestCase
  );
  const setSelectedTestCase = useTestCasesStore(
    (state) => state.setSelectedTestCase
  );

  return (
    <div>
      <div onClick={() => setSelectedTestCase(i)} className={`${selectedTestCase===i ? "rounded border border-white/40" : ""} w-30 m-1 hover:bg-[#313131] rounded border transition-all bg-secondary border-white/10`}>
        <div className="font-sans px-2 p-2 w-full justify-between cursor-pointer">
          <div className="flex items-center justify-center">
            <div>
              {title}
            </div>
            {/* Judge Result */}
            <Check strokeWidth={3} className="w-2.5 ml-2 h-2.5 text-primary rounded-xs p-0.5 bg-green-600" />
          </div>
        </div>
      </div>
    </div>
  );
}