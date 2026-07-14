"use client";

export default function Component({
    title,
    testCase,
    open,
    setOpen,
    copied,
    handleCopy
}) {

    return (
        <div className="w-36 m-2 rounded border border-white/10">
            <div
                onClick={() => setOpen(!open)}
                className="flex w-full items-center justify-between bg-secondary p-2 cursor-pointer"
            >
                <div>{title}</div>

                <div className="flex items-center gap-2">

                    {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 208.891 208.891"
                        fill="currentColor"
                        className={`w-3 h-3 text-red-500 transition-transform duration-200`}
                    >
                        <path d="M0,170l65.555-65.555L0,38.891L38.891,0l65.555,65.555L170,0l38.891,38.891l-65.555,65.555L208.891,170L170,208.891l-65.555-65.555l-65.555,65.555L0,170z" />
                    </svg> */}

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 14 14"
                        width="1em"
                        height="1em"
                        fill="none"
                        className="ml-1 w-4 text-[#28a252]"
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
                <div>
                    {/* Copy Icon */}
                    <button
                        onClick={handleCopy}
                        className="rounded p-1 hover:bg-white/10 ml-auto"
                        title="Copy"
                    >
                        {copied ? (
                            "✓"
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer"
                            >
                                <rect
                                    x="9"
                                    y="9"
                                    width="11"
                                    height="11"
                                    rx="2"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                />
                                <path
                                    d="M15 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {open && (
                <div className="p-2 flex flex-col">
                    <div className="w-30 max-h-50 overflow-auto minimal-scrollbar">
                        <pre className="whitespace-pre">
                            {testCase}
                        </pre>
                    </div>
                </div>
            )}
        </div>
    );
}