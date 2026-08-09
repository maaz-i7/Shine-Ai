"use client";

import CodeEditor from "@/components/CodeEditor.js";
import ProblemSection from "@/components/ProblemSection.js";
import Console from "@/components/Console.js";
import AiSection from "@/components/AiSection.js";
import useWorkspaceStore from "@/stores/workspace.store";
import useAssistantStore from "@/stores/assistant.store";
import useTestCasesStore from "@/stores/testcases.store";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import {
    getWorkspaceForProblem,
    getAiCodeForWorkspace
} from "@/services/workspace.service.js";
import { getAssistant } from "@/services/assistant.service";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import MobileWorkspace from "@/components/MobileWorkspace";

export default function Layout() {

    const { problemId } = useParams();
    const router = useRouter();
    const { data: session, status } = useSession();

    const workspace = useWorkspaceStore((state) => state.workspace);
    const setWorkspace = useWorkspaceStore((state) => state.setWorkspace);

    const setMessages = useAssistantStore((state) => state.setMessages);

    const testCases = useTestCasesStore((state) => state.testCases);
    const setTestCases = useTestCasesStore((state) => state.setTestCases);

    const [loading, setLoading] = useState(true);
    let redirecting = false;

    const containerRef = useRef(null);
    const editorRef = useRef(null);
    const consoleRef = useRef(null);

    const [leftWidth, setLeftWidth] = useState(450);
    const [rightWidth, setRightWidth] = useState(400);
    const [consoleHeight, setConsoleHeight] = useState(300);

    const [isProblemOpen, setIsProblemOpen] = useState(true);
    const [isRightOpen, setIsRightOpen] = useState(false);
    const [isConsoleOpen, setIsConsoleOpen] = useState(false);

    const [isDraggingRight, setIsDraggingRight] = useState(false);

    const MINIMIZED_CONSOLE_HEIGHT = 50;
    const MINIMIZED_WIDTH = 50;

    const frame = useRef(null);

    useEffect(() => {

        if (status !== "authenticated") {
            return;
        }

        async function loadWorkspace() {
            try {
                const workspace = await getWorkspaceForProblem(
                    problemId,
                    session?.accessToken
                );

                if (!workspace.aiCode || workspace.aiCode === "") {
                    const aiCode = await getAiCodeForWorkspace({
                        accessToken: session?.accessToken,
                        problemId,
                        summarizedStatement: workspace.problem.summarizedStatement,
                        runnerCode: workspace.runnerCode,
                        language: workspace.language,
                    });

                    workspace.aiCode = aiCode;
                }

                setWorkspace(workspace);

                setTestCases(
                    workspace?.testCases?.map((testCase) => ({
                        ...testCase,
                        output: null,
                        status: "not_tested",
                        execution: {
                            message: "",
                            error: "",
                        },
                    }))
                );

                const assistant = await getAssistant(
                    workspace._id,
                    session?.accessToken
                );

                setMessages(assistant.messages);

            } catch (error) {

                if (error.message === "Failed to fetch workspace.") {
                    router.push("/problems/new");
                    redirecting = true;
                    return;
                }

                console.error(error);

            } finally {

                if (!redirecting) {
                    setLoading(false);
                }
            }
        }

        loadWorkspace();

    }, [problemId, session?.accessToken, status, setWorkspace]);

    const startConsoleDrag = () => {

        let latestHeight = consoleHeight;

        const handleMove = (e) => {

            const rect = containerRef.current.getBoundingClientRect();

            let height = rect.bottom - e.clientY;
            height = Math.max(120, Math.min(height, 500));

            latestHeight = height;

            consoleRef.current.style.height = `${height}px`;
            editorRef.current.style.height =
                `calc(100% - ${height}px - 4px)`;

            const editor = document.querySelector(".monaco-editor");

            if (editor && window.monaco) {
                window.monaco.editor.getEditors?.().forEach(e => e.layout());
            }

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

        if (!isProblemOpen) {
            return;
        }

        const handleMove = (e) => {

            const rect = containerRef.current.getBoundingClientRect();

            let width = e.clientX - rect.left;
            width = Math.max(200, Math.min(width, 900));

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

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {

        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);

    }, []);

    if (loading || status === "loading") {
        return (
            <div className="flex h-screen w-screen flex-col items-center justify-center bg-primary">
                <h1 className="mt-8 text-2xl font-bold text-white">
                    Canvas almost ready
                </h1>

                <p className="mt-2 text-center text-gray-400">
                    This won't take long
                </p>

                <LoaderCircle className="h-10 w-10 mt-2 animate-spin text-blue-500" />
            </div>
        );
    }

    if (isMobile) {
        return (
            <MobileWorkspace
                workspace={workspace}
                session={session}
                consoleHeight={consoleHeight}
                setIsConsoleOpen={setIsConsoleOpen}
                setIsRightOpen={setIsRightOpen}
            />
        );
    }

    return (
        <div
            ref={containerRef}
            className="flex h-screen select-text overflow-hidden font-sans w-full"
        >

            {/* Left Panel */}
            <div
                style={{
                    width: isProblemOpen
                        ? leftWidth
                        : MINIMIZED_WIDTH
                }}
                className="bg-primary shrink-0 overflow-hidden rounded-xl transition-[width] duration-200"
            >
                <ProblemSection
                    workspace={workspace}
                    isProblemOpen={isProblemOpen}
                    setIsProblemOpen={setIsProblemOpen}
                    isMobile={false}
                />
            </div>

            {/* Left Divider */}
            {isProblemOpen && (
                <div
                    onMouseDown={startLeftDrag}
                    className="w-1 cursor-ew-resize bg-black transition-colors hover:bg-gray-500 shrink-0"
                />
            )}
            {!isProblemOpen && (
                <div
                    onMouseDown={() => setIsProblemOpen(true)}
                    className="w-1 cursor-ew-resize bg-black transition-colors hover:bg-gray-500 shrink-0"
                />
            )}

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
                    <CodeEditor workspace={workspace} />
                </div>

                {/* Divider */}
                {isConsoleOpen && (
                    <div
                        onMouseDown={startConsoleDrag}
                        className="h-1 cursor-ns-resize bg-black transition-colors hover:bg-gray-500 shrink-0"
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
                    className={`shrink-0 bg-primary rounded-xl ${
                        isConsoleOpen ? "" : "mt-1"
                    }`}
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
                className="w-1 cursor-ew-resize bg-black transition-colors hover:bg-gray-500 shrink-0"
            />

            {/* Right Panel */}
            <AiSection
                isRightOpen={isRightOpen}
                setIsRightOpen={setIsRightOpen}
                rightWidth={rightWidth}
                MINIMIZED_WIDTH={MINIMIZED_WIDTH}
                isDraggingRight={isDraggingRight}
                workspace={workspace}
                session={session}
            />

        </div>
    );
}