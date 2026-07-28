"use client";
import Image from "next/image";
import logo from "../../public/images/logo-no-bg.png";
import fullLogo from "../../public/images/hero-logo-no-bg.png"
import MarkdownRendererChat from "./MarkdownRendererChat.js";
import { handleQuickHelp } from "@/services/quick.help.service";
import useAssistantStore from "@/stores/assistant.store";
import { sendMessage } from "@/services/assistant.service";
import { useRef, useEffect } from "react";
import { X, Bug, Timer, MemoryStick, LightbulbIcon, TestTube2, BookOpenTextIcon, ArrowDownRight, BookAlert, BookOpenCheckIcon } from "lucide-react";
import { useState } from "react";

const QUICK_HELP_LABELS = {
    hint: "Give me a hint to solve this problem",
    debug: "List out all syntax errors in my code and help fix them",
    test_case: "Add a new random test case",
    edge_case: "Add a new edge case",
    summarize: "Summarize the problem for me",
    direction: "Check if i am going in the right direction",
    time_complexity: "Analyze the time complexity of my code",
    space_complexity: "Analyze the space complexity of my code",
    explain_input: "Explain how the input is being taken",
};

export const QUICK_HELP_BUTTONS = [
    {
        type: "hint",
        label: "Hint",
        icon: LightbulbIcon,
        iconClass: "text-yellow-300",
    },
    {
        type: "debug",
        label: "Debug",
        icon: Bug,
        iconClass: "text-red-600",
    },
    {
        type: "summarize",
        label: "Summarize",
        icon: BookOpenCheckIcon,
        iconClass: "text-blue-500",
    },
    {
        type: "test_case",
        label: "Test Case",
        icon: TestTube2,
        iconClass: "text-green-300",
    },
    {
        type: "edge_case",
        label: "Edge Case",
        icon: BookAlert,
        iconClass: "text-yellow-700",
    },
    {
        type: "time_complexity",
        label: "Time Complexity",
        icon: Timer,
        iconClass: "text-blue-500",
    },
    {
        type: "space_complexity",
        label: "Space Complexity",
        icon: MemoryStick,
        iconClass: "text-green-600",
    },
    {
        type: "explain_input",
        label: "Explain Input",
        icon: BookOpenTextIcon,
        iconClass: "text-pink-600",
    },
    {
        type: "direction",
        label: "Direction",
        icon: ArrowDownRight,
        iconClass: "text-purple-600",
    },
];

export default function RightPanel({ isRightOpen, setIsRightOpen, rightWidth, MINIMIZED_WIDTH, isDraggingRight, workspace, session, isMobile = false }) {
    const [expanded, setExpanded] = useState("help");
    const [fetching, setFetching] = useState(false);
    const [quickHelp, setQuickHelp] = useState("")
    const [quickHelpType, setQuickHelpType] = useState("")
    const [quickHelpLoading, setQuickHelpLoading] = useState(false)
    const messages = useAssistantStore((state) => state.messages);
    const setMessages = useAssistantStore((state) => state.setMessages);
    const input = useAssistantStore((state) => state.input);
    const setInput = useAssistantStore((state) => state.setInput);
    const addMessage = useAssistantStore((state) => state.addMessage);
    const setLoading = useAssistantStore((state) => state.setLoading);
    const setError = useAssistantStore((state) => state.setError);
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, expanded]);

    async function handleSend() {

        if (!input.trim()) return;

        const userMessage = input;
        setInput("");

        addMessage({
            role: "user",
            content: userMessage,
        });

        setLoading(true);
        setFetching(true);

        try {
            const response = await sendMessage(
                workspace?._id,
                session.accessToken,
                userMessage
            );

            addMessage({
                role: "assistant",
                content: response,
            });

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
            setFetching(false);
        }
    }

    return (
        <div
            style={{ width: isRightOpen ? rightWidth : MINIMIZED_WIDTH }}
            className={`bg-primary shrink-0 rounded-xl h-full overflow-hidden font-sans flex flex-col ${!isDraggingRight ? "transition-[width] duration-300 ease-in-out" : ""
                }`}
            onClick={() => {
                if (!isRightOpen) setIsRightOpen(true);
            }}
        >
            {isRightOpen ? (
                <div className="h-full min-w-50 flex flex-col">
                    {
                        isMobile ? ""
                            : <div className="p-2 border-b border-gray-700/50 shrink-0">
                                <X
                                    className="hover:bg-red-800 w-10 transition-all cursor-pointer rounded"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsRightOpen(false);
                                    }}
                                />
                            </div>
                    }

                    <div className="flex-1 flex flex-col p-2 gap-2 overflow-hidden min-h-0">

                        {/* Quick Help */}
                        <div
                            className={`relative flex flex-col pb-2 rounded-lg border border-white/10 bg-white/5 overflow-hidden transition-all duration-500 ease-in-out ${expanded === "help"
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
                                <div className={`h-full minimal-scrollbar overflow-y-auto p-3 transition-opacity duration-300 ${expanded === "help" ? "opacity-100 delay-200" : "opacity-0"}`}>
                                    <div className={`h-full flex flex-col ${expanded !== "help" ? "hidden" : "block"}`}>
                                        <div className="flex flex-wrap pb-3 text-sm">
                                            {QUICK_HELP_BUTTONS.map(({ type, label, icon: Icon, iconClass }) => (
                                                <button
                                                    key={type}
                                                    disabled={quickHelpLoading}
                                                    className={`${quickHelpType === type ? "bg-black" : "bg-primary"}
                                                                ${quickHelpLoading ? "cursor-not-allowed" : "cursor-pointer"}
                                                                active:scale-95 hover:bg-black
                                                                w-fit p-2 m-1 transition-colors rounded-lg flex items-center`}
                                                    title={QUICK_HELP_LABELS[type]}
                                                    onClick={() => {
                                                        setQuickHelpType(type);
                                                        handleQuickHelp({
                                                            accessToken: session?.accessToken,
                                                            workspaceId: workspace._id,
                                                            type,
                                                            userMessage: QUICK_HELP_LABELS[type],
                                                            setQuickHelp,
                                                            setQuickHelpLoading,
                                                            setMessages,
                                                            messages,
                                                        });
                                                    }}
                                                >
                                                    {label}
                                                    <Icon className={`w-4 ml-1 ${iconClass}`} />
                                                </button>
                                            ))}
                                        </div>
                                        <div className="text-xs mb-3 text-gray-300">💡Hover over the buttons for details!</div>
                                        <div className="flex-1 overflow-auto minimal-scrollbar rounded-lg bg-black select-text mt-auto text-sm p-4">
                                            {/* Quick Ai Reply */}
                                            <div>
                                                {!quickHelpLoading ? <MarkdownRendererChat text={quickHelp} /> :
                                                    <div className="flex items-center gap-1 bg-secondary w-fit h-10 pt-1 px-3 rounded-lg m-1">
                                                        <div className="typing-dot"></div>
                                                        <div className="typing-dot"></div>
                                                        <div className="typing-dot"></div>
                                                    </div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Ask AI */}
                        <div
                            className={`relative flex flex-col rounded-lg border border-white/10 bg-white/5 overflow-hidden transition-all duration-500 ease-in-out ${expanded === "ai"
                                ? "flex-1 min-h-0"
                                : "flex-[0_0_40px] cursor-pointer hover:bg-white/10"
                                }`}
                        >
                            {/* Header (Always strictly h-10) */}
                            <div onClick={() => expanded !== "help" ? setExpanded("help") : setExpanded("ai")} className="h-10 shrink-0 border-b border-white/10 flex items-center px-4 font-semibold select-none cursor-pointer">
                                <Image
                                    src={fullLogo}
                                    alt="logo"
                                    width={85}
                                    className="mb-1 -ml-2"
                                />
                            </div>

                            {/* Content wrapper */}
                            <div className={`flex-1 min-h-0 overflow-hidden w-full ${expanded === "help" ? "hidden" : ""}`}>
                                <div className={`h-full minimal-scrollbar overflow-auto p-2 transition-opacity duration-300 ${expanded === "ai" ? "opacity-100 delay-200" : "opacity-0"
                                    }`}>
                                    <div className="w-full h-full bg-black rounded-lg flex flex-col">
                                        <div className="flex-1 font-sans">
                                            <div className="w-full h-full bg-black select-text rounded-lg flex flex-col pt-5 pb-5 px-1">
                                                {/* Ai Conversations */}
                                                {messages.map((message, index) => (
                                                    <div
                                                        key={index}
                                                        className={`w-3/4 text-sm overflow-auto rounded-lg m-1 ${message.role === "assistant"
                                                            ? "bg-secondary px-4 pt-2"
                                                            : "bg-[#3d3d3d] ml-auto px-2"
                                                            }`}
                                                    >
                                                        {message.role === "assistant" ? <MarkdownRendererChat text={message.content} /> : <div className="p-2">{message.content}</div>}
                                                    </div>
                                                ))}
                                                {
                                                    fetching ? <div className="flex items-center gap-1 bg-secondary w-fit h-10 pt-1 px-3 rounded-lg m-1">
                                                        <div className="typing-dot"></div>
                                                        <div className="typing-dot"></div>
                                                        <div className="typing-dot"></div>
                                                    </div> : ""
                                                }
                                                <div ref={bottomRef} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mr-5">
                                <input
                                    disabled={fetching || quickHelpLoading}
                                    className="active:outline-0 w-full p-3 focus:outline-0 text-sm bg-primary m-2"
                                    type="text"
                                    placeholder={`${fetching ? "Almost there..." : "Ask Shine Ai"}`}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleSend();
                                        }
                                    }}
                                />
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