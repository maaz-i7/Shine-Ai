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
            <section className="min-h-[90vh] w-full">
                <ProblemSection workspace={workspace} isProblemOpen={true} setIsProblemOpen={()=>{}} isMobile={true} />
            </section>

            {/* Editor */}
            <section className="h-[90vh] w-full">
                <CodeEditor workspace={workspace} isMobile={true} />
            </section>

            {/* Console */}
            <section className="w-full">
                <Console
                    isConsoleOpen={true}
                    setIsConsoleOpen={setIsConsoleOpen}
                    CONSOLE_HEIGHT={consoleHeight}
                    MINIMIZED_CONSOLE_HEIGHT={50}
                    isMobile={true}
                />
            </section>

            {/* AI */}
            <section className="h-[90vh] w-full overflow-hidden">
                <AiSection
                    isRightOpen={true}
                    setIsRightOpen={setIsRightOpen}
                    rightWidth="100%"
                    MINIMIZED_WIDTH={0}
                    isDraggingRight={false}
                    workspace={workspace}
                    session={session}
                    isMobile={true}
                />
            </section>
        </div>
    );
}