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

export default function RightPanel({ isRightOpen, setIsRightOpen, rightWidth, MINIMIZED_WIDTH, isDraggingRight, workspace, session }) {
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
                                            <button disabled={quickHelpLoading} className={`${quickHelpType==="hint" ? "bg-black" : "bg-primary"} ${quickHelpLoading ? "cursor-not-allowed" : "cursor-pointer"} active:scale-95 hover:bg-primary/80 w-fit p-2 m-1 rounded-lg flex items-center`}
                                                title={QUICK_HELP_LABELS.hint}
                                                onClick={() => {
                                                    setQuickHelpType("hint")
                                                    handleQuickHelp({ accessToken: session?.accessToken, workspaceId: workspace._id, type: "hint", userMessage: QUICK_HELP_LABELS.hint, setQuickHelp, setQuickHelpLoading, setMessages, messages })
                                                }}>
                                                Hint <LightbulbIcon className="w-4 ml-1 text-yellow-300" />
                                            </button>
                                            <button disabled={quickHelpLoading} className="bg-primary active:scale-95 hover:bg-primary/80 cursor-pointer w-fit p-2 m-1 rounded-lg flex items-center" title={QUICK_HELP_LABELS.summarize}>Summarize <BookOpenCheckIcon className="w-4 ml-1 text-blue-500" /> </button>
                                            <button disabled={quickHelpLoading} className="bg-primary active:scale-95 hover:bg-primary/80 cursor-pointer w-fit p-2 m-1 rounded-lg flex items-center" title={QUICK_HELP_LABELS.test_case}>Test Case <TestTube2 className="w-4 ml-1 text-green-300" /> </button>
                                            <button disabled={quickHelpLoading} className="bg-primary active:scale-95 hover:bg-primary/80 cursor-pointer w-fit p-2 m-1 rounded-lg flex items-center" title={QUICK_HELP_LABELS.edge_case}>Edge Case <BookAlert className="w-4 ml-1 text-yellow-700" /></button>
                                            <button disabled={quickHelpLoading} className="bg-primary active:scale-95 hover:bg-primary/80 cursor-pointer w-fit p-2 m-1 rounded-lg flex items-center" title={QUICK_HELP_LABELS.debug}>Debug <Bug className="w-4 ml-1 text-red-600" /> </button>
                                            <button disabled={quickHelpLoading} className="bg-primary active:scale-95 hover:bg-primary/80 cursor-pointer w-fit p-2 m-1 rounded-lg flex items-center" title={QUICK_HELP_LABELS.time_complexity}>Time Complexity <Timer className="w-4 ml-1 text-blue-500" /></button>
                                            <button disabled={quickHelpLoading} className="bg-primary active:scale-95 hover:bg-primary/80 cursor-pointer w-fit p-2 m-1 rounded-lg flex items-center" title={QUICK_HELP_LABELS.space_complexity}>Space Complexity <MemoryStick className="w-4 ml-1 text-green-600" /></button>
                                            <button disabled={quickHelpLoading} className="bg-primary active:scale-95 hover:bg-primary/80 cursor-pointer w-fit p-2 m-1 rounded-lg flex items-center" title={QUICK_HELP_LABELS.explain_input}>Explain Input <BookOpenTextIcon className="w-4 ml-1 text-pink-600" /></button>
                                            <button disabled={quickHelpLoading} className="bg-primary active:scale-95 hover:bg-primary/80 cursor-pointer w-fit p-2 m-1 rounded-lg flex items-center" title={QUICK_HELP_LABELS.direction}>Direction <ArrowDownRight className="w-4 ml-1 text-purple-600" /></button>
                                        </div>
                                        <div className="text-xs mb-3 text-gray-300">💡Hover over the buttons for details!</div>
                                        <div className="flex-1 rounded-lg bg-black mt-auto text-sm p-4">
                                            {/* Quick Ai Reply */}
                                            <div className="overflow-auto minimal-scrollbar">
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
                                <div className={`h-full minimal-scrollbar overflow-y-auto p-2 transition-opacity duration-300 ${expanded === "ai" ? "opacity-100 delay-200" : "opacity-0"
                                    }`}>
                                    <div className="w-full h-full bg-black rounded-lg flex flex-col">
                                        <div className="flex-1 font-sans">
                                            <div className="w-full h-full bg-black select-text rounded-lg flex flex-col pt-5 pb-5 px-1">
                                                {/* Ai Conversations */}
                                                {messages.map((message, index) => (
                                                    <div
                                                        key={index}
                                                        className={`w-3/4 text-sm rounded-lg m-1 ${message.role === "assistant"
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