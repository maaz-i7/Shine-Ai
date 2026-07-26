"use client";

import ProblemSection from "@/components/ProblemSection";
import CodeEditor from "@/components/CodeEditor";
import Console from "@/components/Console";
import AiSection from "@/components/AiSection";

export default function MobileWorkspace({
    workspace,
    session,
    consoleHeight,
    setIsConsoleOpen,
    setIsRightOpen,
}) {
    return (
        <div className="w-full bg-primary overflow-y-auto">

            {/* Problem */}
            <section className="min-h-screen w-full">
                <ProblemSection workspace={workspace} />
            </section>

            {/* Editor */}
            <section className="h-screen w-full">
                <CodeEditor workspace={workspace} />
            </section>

            {/* Console */}
            <section className="w-full">
                <Console
                    isConsoleOpen={true}
                    setIsConsoleOpen={setIsConsoleOpen}
                    CONSOLE_HEIGHT={consoleHeight}
                    MINIMIZED_CONSOLE_HEIGHT={50}
                />
            </section>

            {/* AI */}
            <section className="max-h-screen w-full overflow-y-scroll">
                <AiSection
                    isRightOpen={true}
                    setIsRightOpen={setIsRightOpen}
                    rightWidth="100%"
                    MINIMIZED_WIDTH={0}
                    isDraggingRight={false}
                    workspace={workspace}
                    session={session}
                />
            </section>
        </div>
    );
}