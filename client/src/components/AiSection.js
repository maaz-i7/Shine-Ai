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

    const [expanded, setExpanded] = useState("help"); // "help" | "ask"
    return (
        <div
            style={{ width: isRightOpen ? rightWidth : MINIMIZED_WIDTH }}
            className={`bg-primary shrink-0 rounded-xl overflow-hidden font-sans flex flex-col ${!isDraggingRight ? "transition-[width] duration-300 ease-in-out" : ""
                }`}
            onClick={() => {
                // Slide open if clicked while minimized
                if (!isRightOpen) setIsRightOpen(true);
            }}
        >
            {isRightOpen ? (
                <div className="h-full min-w-50 flex flex-col">
                    <div className="p-2 border-b border-gray-700/50">
                        <X className="hover:bg-red-600 transition-all cursor-pointer rounded"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent triggering the parent onClick
                                setIsRightOpen(false);
                            }} />
                    </div>
                    <div className="h-full p-2 flex flex-col gap-2 bg-yellow-100">

                        {/* Quick Help */}
                        <div
                            className={`flex flex-col overflow-hidden rounded-lg bg-secondary transition-all duration-300 ${expanded === "help" ? "flex-12" : "flex-1 cursor-pointer"
                                }`}
                        >
                            <button
                                onClick={() => { if (expanded === "ask") setExpanded("help"); else setExpanded("ask") }}
                                className="p-3 cursor-pointer hover:bg-primary/50 transition-all text-left font-semibold"
                            >
                                Quick Help
                            </button>

                            <div className={`h-full flex flex-col p-3 ${expanded!=="help" ? "hidden" : "block"}`}>
                                <div className="flex flex-wrap p-3 text-sm">
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
                                <div className="h-20 bg-black mt-auto text-sm p-4">
                                    <div>
                                        I have thoroughly analysed your code and did not find any bug. I can think you can proceed to submit it. All the Best!
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Ask AI */}
                        <div
                            className={`flex flex-col overflow-hidden rounded-lg bg-secondary transition-all duration-300 ${expanded === "ask" ? "flex-12" : "flex-1"
                                }`}
                        >
                            <button
                                onClick={() => { if (expanded === "ask") setExpanded("help"); else setExpanded("ask") }}
                                className="flex cursor-pointer hover:bg-primary/50 transition-all items-center text-left font-semibold"
                            >
                                <Image
                                    src={fullLogo}
                                    alt="logo"
                                    width={85}
                                    className="mb-1"
                                />
                            </button>

                            <div className="flex-1 p-3 font-sans">
                                <div className="w-full h-full bg-black rounded-lg flex flex-col pt-5">
                                    <div className="w-3/4 text-sm bg-secondary rounded-lg p-2 m-3">
                                        <div>
                                            Hi! I am Shine Ai.
                                            How Can I help you today?
                                        </div>
                                    </div>
                                    <div className="w-3/4 text-sm bg-[#3d3d3d] rounded-lg p-2 m-3 ml-auto">
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
            ) : (
                <div className="relative flex-1 flex items-start justify-center p-1 pt-5 cursor-pointer hover:bg-white/5 overflow-visible">
                    {/* Yellow Glow */}
                    <div className="absolute top-4 w-16 h-16 rounded-full bg-yellow-400/40 blur-2xl pointer-events-none"></div>

                    {/* Stronger Glow */}
                    <div className="absolute top-4 w-10 h-10 rounded-full bg-yellow-300/70 blur-xl pointer-events-none"></div>

                    {/* Logo */}
                    <Image
                        loading="eager"
                        className="relative z-10 w-10"
                        src={logo}
                        alt="logo"
                    />
                </div>
            )}
        </div>
    );
}