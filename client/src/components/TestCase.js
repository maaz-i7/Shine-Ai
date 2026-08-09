"use client";
import { Check, XIcon, X, Clock, AlertTriangle, HelpCircleIcon } from "lucide-react";
import useTestCasesStore from "@/stores/testcases.store";

const STATUS_CONFIG = {
  not_tested: {
    icon: HelpCircleIcon,
    className: "w-2.5 ml-2 h-2.5 invisible",
  },
  right: {
    icon: Check,
    className: "w-2.5 ml-2 h-2.5 text-primary rounded-xs p-0.5 bg-green-600",
  },
  wrong: {
    icon: X,
    className: "w-2.5 ml-2 h-2.5 text-primary rounded-xs p-0.5 bg-red-600",
  },
  tle: {
    icon: Clock,
    className: "w-3 ml-2 h-3 text-red-600 rounded-xs",
  },
  runtime_error: {
    icon: AlertTriangle,
    className: "w-3 ml-2 h-3 text-red-600 rounded-xs",
  },
};

export default function Component({ title, i, status }) {

  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.not_tested;
  const Icon = config.icon;
  const className = config.className;

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
    <div className="active:scale-98 group">
      <XIcon
        className="w-4 h-4 p-0.5 translate-y-3 translate-x-0.5 rounded-full bg-gray-700 hover:bg-gray-600 group-hover:opacity-100 opacity-0 cursor-pointer text-gray-400 transition-all pointer-coarse:opacity-100"
        onClick={() => removeTestCase(i)}
      />
      <div onClick={() => setSelectedTestCase(i)} className={`${selectedTestCase === i ? "rounded border border-white/40" : ""} w-fit p-2 px-3 ml-2 hover:bg-[#313131] rounded border transition-all bg-secondary border-white/10`}>
        <div className="font-sans w-full justify-between cursor-pointer">
          <div className="flex items-center justify-center">
            <div className="mr-2">
            </div>
            <div>
              {title}
            </div>
            {Icon && <Icon strokeWidth={3} className={className} />}
          </div>
        </div>
      </div>
    </div>
  );
}