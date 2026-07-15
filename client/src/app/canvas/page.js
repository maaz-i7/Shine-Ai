"use client";

import { useRef, useState } from "react";
import CodeEditor from "@/components/CodeEditor.js";
import ProblemSection from "@/components/ProblemSection.js";
import Console from "@/components/Console.js";
import AiSection from "@/components/AiSection.js";

export default function Layout() {

    const containerRef = useRef(null);
    const editorRef = useRef(null);
    const consoleRef = useRef(null);

    const [leftWidth, setLeftWidth] = useState(450);
    const [rightWidth, setRightWidth] = useState(300);
    const [consoleHeight, setConsoleHeight] = useState(220);

    const [isRightOpen, setIsRightOpen] = useState(false);
    const [isConsoleOpen, setIsConsoleOpen] = useState(false);
    
    const [isDraggingRight, setIsDraggingRight] = useState(false);

    const MINIMIZED_CONSOLE_HEIGHT = 36;
    const MINIMIZED_WIDTH = 36;

    const frame = useRef(null);

    const startConsoleDrag = () => {
        let latestHeight = consoleHeight;

        const handleMove = (e) => {
            const rect = containerRef.current.getBoundingClientRect();

            let height = rect.bottom - e.clientY;
            height = Math.max(120, Math.min(height, 500));

            latestHeight = height;

            // Instant DOM resize
            consoleRef.current.style.height = `${height}px`;
            editorRef.current.style.height = `calc(100% - ${height}px - 4px)`;

            // React update at most once per frame
            if (!frame.current) {
                frame.current = requestAnimationFrame(() => {
                    setConsoleHeight(latestHeight);
                    frame.current = null;
                });
            }
        };

        const stop = () => {
            if (frame.current) {
                cancelAnimationFrame(frame.current);
                frame.current = null;
            }

            setConsoleHeight(latestHeight);

            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("mouseup", stop);
        };

        window.addEventListener("mousemove", handleMove);
        window.addEventListener("mouseup", stop);
    };

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
        setIsRightOpen(true);

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
        <div
            ref={containerRef}
            className="flex h-screen select-none overflow-hidden font-sans"
        >
            {/* Left Panel */}
            <div
                style={{ width: leftWidth }}
                className="bg-primary shrink-0 overflow-hidden"
            >
                <ProblemSection />
            </div>

            {/* Left Divider */}
            <div
                onMouseDown={startLeftDrag}
                className="w-1 cursor-col-resize bg-gray-600 hover:bg-blue-500 shrink-0"
            />

            {/* Center */}
            <div className="flex-1 min-w-0 flex flex-col overflow-hidden">

                {/* Editor */}
                <div
                    ref={editorRef}
                    className="overflow-hidden"
                    style={{
                        height: isConsoleOpen
                            ? `calc(100% - ${consoleHeight}px - 4px)`
                            : `calc(100% - ${MINIMIZED_CONSOLE_HEIGHT}px - 4px)`
                    }}
                >
                    <CodeEditor />
                </div>

                {/* Divider */}
                {isConsoleOpen && (
                    <div
                        onMouseDown={startConsoleDrag}
                        className="h-1 cursor-row-resize bg-gray-600 hover:bg-blue-500 shrink-0"
                    />
                )}

                {/* Console */}
                <div
                    ref={consoleRef}
                    style={{
                        height: isConsoleOpen
                            ? consoleHeight
                            : MINIMIZED_CONSOLE_HEIGHT
                    }}
                    className="shrink-0 bg-primary"
                >
                    <Console
                        isConsoleOpen={isConsoleOpen}
                        setIsConsoleOpen={setIsConsoleOpen}
                        CONSOLE_HEIGHT={consoleHeight}
                        MINIMIZED_CONSOLE_HEIGHT={MINIMIZED_CONSOLE_HEIGHT}
                    />
                </div>
            </div>

            {/* Right Divider */}
            <div
                onMouseDown={startRightDrag}
                className="w-1 cursor-col-resize bg-gray-600 hover:bg-blue-500 shrink-0"
            />

            {/* Right Panel */}
            <AiSection
                isRightOpen={isRightOpen}
                setIsRightOpen={setIsRightOpen}
                rightWidth={rightWidth}
                MINIMIZED_WIDTH={MINIMIZED_WIDTH}
                isDraggingRight={isDraggingRight}
            />
        </div>
    );
}