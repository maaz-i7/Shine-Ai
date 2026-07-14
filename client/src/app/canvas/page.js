"use client";

import { useRef, useState } from "react"
import CodeEditor from "@/components/CodeEditor.js"
import ProblemSection from "@/components/ProblemSection.js"

export default function Layout() {
    const containerRef = useRef(null);

    const [leftWidth, setLeftWidth] = useState(450);
    const [rightWidth, setRightWidth] = useState(300);

    // --- STATES FOR RIGHT PANEL TOGGLE ---
    const [isRightOpen, setIsRightOpen] = useState(false);
    const [isDraggingRight, setIsDraggingRight] = useState(false);

    const [isConsoleOpen, setIsConsoleOpen] = useState(false);

    const CONSOLE_HEIGHT = 220;
    const MINIMIZED_CONSOLE_HEIGHT = 36;
    const MINIMIZED_WIDTH = 48;

    const startLeftDrag = () => {
        const handleMove = (e) => {
            const rect = containerRef.current.getBoundingClientRect();

            let width = e.clientX - rect.left;
            width = Math.max(200, Math.min(width, 500));

            setLeftWidth(width);
        };

        const stop = () => {
            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("mouseup", stop);
        };

        window.addEventListener("mousemove", handleMove);
        window.addEventListener("mouseup", stop);
    };

    const startRightDrag = () => {
        setIsDraggingRight(true);
        setIsRightOpen(true); // Auto-expand if the user grabs the divider while minimized

        const handleMove = (e) => {
            const rect = containerRef.current.getBoundingClientRect();

            let width = rect.right - e.clientX;
            width = Math.max(200, Math.min(width, 500));

            setRightWidth(width);
        };

        const stop = () => {
            setIsDraggingRight(false);
            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("mouseup", stop);
        };

        window.addEventListener("mousemove", handleMove);
        window.addEventListener("mouseup", stop);
    };

    return (
        <div ref={containerRef} className="flex h-screen select-none overflow-hidden">
            {/* Left Panel */}
            <div style={{ width: leftWidth }} className="bg-primary shrink-0 overflow-hidden">
                <ProblemSection />
            </div>

            {/* Left Divider */}
            <div
                onMouseDown={startLeftDrag}
                className="w-1 cursor-col-resize bg-gray-600 hover:bg-blue-500 shrink-0"
            />

            {/* Code Editor */}
            {/* Center Section */}
            <div className="flex-1 min-w-0 flex flex-col overflow-hidden">

                {/* Editor */}
                <div className="flex-1 min-h-0">
                    <CodeEditor />
                </div>

                {/* Console */}
                <div
                    style={{
                        height: isConsoleOpen
                            ? CONSOLE_HEIGHT
                            : MINIMIZED_CONSOLE_HEIGHT,
                    }}
                    className="border-t border-gray-700 bg-primary z-10 transition-[height] duration-300 ease-in-out flex flex-col shrink-0"
                >
                    {isConsoleOpen ? (
                        <>
                            <div className="h-9 border-b border-gray-700 flex items-center justify-between px-3">
                                <span className="text-sm font-medium">
                                    Console
                                </span>

                                <button
                                    onClick={() => setIsConsoleOpen(false)}
                                    className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded cursor-pointer"
                                >
                                    Minimize
                                </button>
                            </div>

                            <div className="flex-1 overflow-auto p-3 text-sm">
                                Console Output
                            </div>
                        </>
                    ) : (
                        <div
                            onClick={() => setIsConsoleOpen(true)}
                            className="h-full flex items-center justify-center cursor-pointer hover:bg-white/5"
                        >
                            <span className="text-sm font-semibold tracking-wider text-gray-400">
                                CONSOLE
                            </span>
                        </div>
                    )}
                </div>

            </div>

            {/* Right Divider */}
            <div
                onMouseDown={startRightDrag}
                className="w-1 cursor-col-resize bg-gray-600 hover:bg-blue-500 shrink-0"
            />

            {/* Right Panel */}
            <div
                style={{ width: isRightOpen ? rightWidth : MINIMIZED_WIDTH }}
                className={`bg-primary shrink-0 overflow-hidden flex flex-col ${!isDraggingRight ? "transition-[width] duration-300 ease-in-out" : ""
                    }`}
                onClick={() => {
                    // Slide open if clicked while minimized
                    if (!isRightOpen) setIsRightOpen(true);
                }}
            >
                {isRightOpen ? (
                    <div className="flex-1 min-w-50 flex flex-col">
                        <div className="p-2 border-b border-gray-700/50">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent triggering the parent onClick
                                    setIsRightOpen(false);
                                }}
                                className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded cursor-pointer"
                            >
                                Minimize
                            </button>
                        </div>
                        <div className="p-4">
                            Right Panel
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex items-center justify-center cursor-pointer hover:bg-white/5">
                        <span className="-rotate-90 whitespace-nowrap text-sm font-semibold tracking-widest text-gray-400">
                            OPEN
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}