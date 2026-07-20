"use client";
import { Check, Trash2, X, Clock, AlertTriangle } from "lucide-react";
import useTestCasesStore from "@/stores/testcases.store";

export default function Component({ title, i }) {

  const selectedTestCase = useTestCasesStore(
    (state) => state.selectedTestCase
  );
  const setSelectedTestCase = useTestCasesStore(
    (state) => state.setSelectedTestCase
  );
  const removeTestCase = useTestCasesStore(
    (state) => state.removeTestCase
  );

  return (
    <div>
      <div onClick={() => setSelectedTestCase(i)} className={`${selectedTestCase === i ? "rounded border border-white/40" : ""} w-fit p-2 px-3 m-1 hover:bg-[#313131] rounded border transition-all bg-secondary border-white/10`}>
        <div className="font-sans w-full justify-between cursor-pointer">
          <div className="flex items-center justify-center">
            <div className="mr-2">
              <Trash2
                className="w-3 h-3 cursor-pointer text-gray-400 hover:scale-115 transition-all"
                onClick={() => removeTestCase(i)}
              />
            </div>
            <div>
              {title}
            </div>
            {/* Judge Result */}
            {/* <Check strokeWidth={3} className="w-2.5 ml-2 h-2.5 text-primary rounded-xs p-0.5 bg-green-600" /> */}
            {/* <X strokeWidth={3} className="w-2.5 ml-2 h-2.5 text-primary rounded-xs p-0.5 bg-red-600" /> */}
            {/* <Clock strokeWidth={3} className="w-3 ml-2 h-3 text-red-600 rounded-xs"/> */}
            <AlertTriangle strokeWidth={3} className="w-3 ml-2 h-3 text-red-600 rounded-xs"/> 
          </div>
        </div>
      </div>
    </div>
  );
}