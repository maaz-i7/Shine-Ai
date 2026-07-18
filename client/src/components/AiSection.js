"use client";

export default function RightPanel({
    isRightOpen,
    setIsRightOpen,
    rightWidth,
    MINIMIZED_WIDTH,
    isDraggingRight
}) {
    return (
        <div
            style={{ width: isRightOpen ? rightWidth : MINIMIZED_WIDTH }}
            className={`bg-primary shrink-0 rounded-xl overflow-hidden flex flex-col ${
                !isDraggingRight ? "transition-[width] duration-300 ease-in-out" : ""
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
                    <div className="p-4">Right Panel</div>
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center cursor-pointer hover:bg-white/5">
                    <span className="-rotate-90 whitespace-nowrap text-sm font-semibold tracking-widest text-gray-400">
                        OPEN
                    </span>
                </div>
            )}
        </div>
    );
}