"use client";
import Image from "next/image";
import logo from "../../public/images/logo-no-bg.png";
import fullLogo from "../../public/images/hero-logo-no-bg.png"
import { X, Bug, Timer, MemoryStick, LightbulbIcon, TestTube2, BookOpenTextIcon, ArrowDownRight, BookAlert, BookOpenCheckIcon } from "lucide-react";
import { useState } from "react";

export default function RightPanel({
    isRightOpen,
    setIsRightOpen,
    rightWidth,
    MINIMIZED_WIDTH,
    isDraggingRight
}) {
    const [expanded, setExpanded] = useState("help");

    return (
        <div
            style={{ width: isRightOpen ? rightWidth : MINIMIZED_WIDTH }}
            className={`bg-primary shrink-0 rounded-xl overflow-hidden font-sans flex flex-col ${!isDraggingRight ? "transition-[width] duration-300 ease-in-out" : ""
                }`}
            onClick={() => {
                if (!isRightOpen) setIsRightOpen(true);
            }}
        >
            {isRightOpen ? (
                <div className="h-full min-w-50 flex flex-col">
                    <div className="p-2 border-b border-gray-700/50 shrink-0">
                        <X
                            className="hover:bg-red-800 w-10 transition-all cursor-pointer rounded"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsRightOpen(false);
                            }}
                        />
                    </div>

                    {/* Added min-h-0 here to ensure the parent can properly constrain the flexing children */}
                    <div className="flex-1 flex flex-col p-2 gap-2 overflow-hidden min-h-0">

                        {/* Quick Help */}
                        <div
                            className={`relative flex flex-col rounded-lg border border-white/10 bg-white/5 overflow-hidden transition-all duration-500 ease-in-out ${expanded === "help"
                                ? "flex-1 min-h-0" // flex-1 resolves to flex: 1 1 0%
                                : "flex-[0_0_40px] hover:bg-white/10" // strictly 40px, no growing, no shrinking
                                }`}
                        >
                            {/* Header (Always strictly h-10) */}
                            <div onClick={() => expanded !== "help" ? setExpanded("help") : setExpanded("ai")} className="h-10 shrink-0 cursor-pointer flex items-center px-4 font-semibold select-none">
                                Quick Help
                            </div>

                            {/* Content wrapper - min-h-0 is critical here to stop content from pushing the height */}
                            <div className="flex-1 min-h-0 overflow-hidden w-full">
                                <div className={`h-full overflow-y-auto p-3 transition-opacity duration-300 ${expanded === "help" ? "opacity-100 delay-200" : "opacity-0"}`}>
                                    <div className={`h-full flex flex-col ${expanded !== "help" ? "hidden" : "block"}`}>
                                        <div className="flex flex-wrap pb-3 text-sm">
                                            <button className="bg-primary hover:scale-102 hover:bg-primary/80 cursor-pointer active:scale-99 w-fit p-2 m-1 rounded-lg flex items-center" title="Give a hint to solve the problem">Hint <LightbulbIcon className="w-4 ml-1 text-yellow-300" /> </button>
                                            <button className="bg-primary hover:scale-102 hover:bg-primary/80 cursor-pointer active:scale-99 w-fit p-2 m-1 rounded-lg flex items-center" title="Summarize the problem objective">Summarize <BookOpenCheckIcon className="w-4 ml-1 text-blue-500" /> </button>
                                            <button className="bg-primary hover:scale-102 hover:bg-primary/80 cursor-pointer active:scale-99 w-fit p-2 m-1 rounded-lg flex items-center" title="Add a new test case">Test Case <TestTube2 className="w-4 ml-1 text-green-300" /> </button>
                                            <button className="bg-primary hover:scale-102 hover:bg-primary/80 cursor-pointer active:scale-99 w-fit p-2 m-1 rounded-lg flex items-center" title="Add a new edge case">Edge Case <BookAlert className="w-4 ml-1 text-yellow-700" /></button>
                                            <button className="bg-primary hover:scale-102 hover:bg-primary/80 cursor-pointer active:scale-99 w-fit p-2 m-1 rounded-lg flex items-center" title="Debug syntax errors only">Debug <Bug className="w-4 ml-1 text-red-600" /> </button>
                                            <button className="bg-primary hover:scale-102 hover:bg-primary/80 cursor-pointer active:scale-99 w-fit p-2 m-1 rounded-lg flex items-center" title="Analyze the time complexity of code">Time Complexity <Timer className="w-4 ml-1 text-blue-500" /></button>
                                            <button className="bg-primary hover:scale-102 hover:bg-primary/80 cursor-pointer active:scale-99 w-fit p-2 m-1 rounded-lg flex items-center" title="Analyze the space complexity of code">Space Complexity <MemoryStick className="w-4 ml-1 text-green-600" /></button>
                                            <button className="bg-primary hover:scale-102 hover:bg-primary/80 cursor-pointer active:scale-99 w-fit p-2 m-1 rounded-lg flex items-center" title="Explain the input being taken">Explain Input <BookOpenTextIcon className="w-4 ml-1 text-pink-600" /></button>
                                            <button className="bg-primary hover:scale-102 hover:bg-primary/80 cursor-pointer active:scale-99 w-fit p-2 m-1 rounded-lg flex items-center" title="Check if I am going in the right direction">Direction <ArrowDownRight className="w-4 ml-1 text-purple-600" /></button>
                                        </div>
                                        <div className="flex-1 rounded-lg bg-black mt-auto text-sm p-4">
                                            <div>
                                                I have thoroughly analysed your code and did not find any bug. I can think you can proceed to submit it. All the Best!
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Ask AI */}
                        <div
                            className={`relative flex flex-col rounded-lg border border-white/10 bg-white/5 overflow-hidden transition-all duration-500 ease-in-out ${expanded === "ai"
                                ? "flex-1 min-h-0 cursor-pointer"
                                : "flex-[0_0_40px] cursor-pointer hover:bg-white/10"
                                }`}
                        >
                            {/* Header (Always strictly h-10) */}
                            <div onClick={() => expanded !== "help" ? setExpanded("help") : setExpanded("ai")} className="h-10 shrink-0 flex items-center px-4 font-semibold select-none cursor-pointer">
                                <Image
                                    src={fullLogo}
                                    alt="logo"
                                    width={85}
                                    className="mb-1 -ml-2"
                                />
                            </div>

                            {/* Content wrapper */}
                            <div className="flex-1 min-h-0 overflow-hidden w-full">
                                <div className={`h-full overflow-y-auto p-2 transition-opacity duration-300 ${expanded === "ai" ? "opacity-100 delay-200" : "opacity-0"
                                    }`}>
                                    <div className="w-full h-full bg-black rounded-lg flex flex-col">
                                        <div className="flex-1 font-sans">
                                            <div className="w-full h-full bg-black rounded-lg flex flex-col pt-5">
                                                <div className="w-3/4 text-sm bg-secondary rounded-lg p-2 m-1 ml-2">
                                                    <div>
                                                        Hi! I am Shine Ai.
                                                        How Can I help you today?
                                                    </div>
                                                </div>
                                                <div className="w-3/4 text-sm bg-[#3d3d3d] rounded-lg p-2 m-1 mr-2 ml-auto">
                                                    <div>
                                                        Hi! I am Maaz. Please explain me Robin Karp Algorithm.
                                                    </div>
                                                </div>
                                                <div className="mt-auto">
                                                    <input className="w-full active:outline-0 p-4 focus:outline-0 text-sm bg-[#111111]" type="text" placeholder="Ask Shine Ai" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            ) : (
                <div className="relative flex-1 flex items-start justify-center p-1 pt-5 cursor-pointer hover:bg-white/5 overflow-visible">
                    <div className="absolute top-4 w-16 h-16 rounded-full bg-yellow-400/40 blur-2xl pointer-events-none"></div>
                    <div className="absolute top-4 w-10 h-10 rounded-full bg-yellow-300/70 blur-xl pointer-events-none"></div>
                    <Image loading="eager" className="relative z-10 w-10" src={logo} alt="logo" />
                </div>
            )}
        </div>
    );
}