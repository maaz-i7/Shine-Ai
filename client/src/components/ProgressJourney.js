"use client";

import React, { useState, useEffect } from 'react';

export default function App() {
    const [progress, setProgress] = useState(0);
    // Node 1 starts active
    const [activeNodes, setActiveNodes] = useState([true, false, false, false]);
    const [travelDuration, setTravelDuration] = useState(500); // ms for the line to travel

    useEffect(() => {
        let isMounted = true;
        const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        const runAnimationSequence = async () => {
            // Node 1 (Seek)
            await sleep(500); // Stop at Node 1 for 0.5s
            
            // Move to Node 2 (Shine)
            if (!isMounted) return;
            setProgress(33.33);
            await sleep(500); // Travel time
            if (!isMounted) return;
            setActiveNodes(prev => [true, true, prev[2], prev[3]]); // Activate ONLY when reached
            await sleep(500); // Stop at Node 2 for 0.5s

            // Move to Node 3 (Solve)
            if (!isMounted) return;
            setProgress(66.66);
            await sleep(500); // Travel time
            if (!isMounted) return;
            setActiveNodes(prev => [true, true, true, prev[3]]);
            await sleep(500); // Stop at Node 3 for 0.5s

            // Move to Node 4 (Succeed)
            if (!isMounted) return;
            setProgress(100);
            await sleep(500); // Travel time
            if (!isMounted) return;
            setActiveNodes([true, true, true, true]);
        };

        runAnimationSequence();

        return () => { isMounted = false; };
    }, []);

    const nodes = [
        {
            id: 1,
            label: 'Seek',
            isActive: activeNodes[0],
            // Updated green, removed shadow
            activeClasses: 'border-[#28c244] text-[#28c244]',
            icon: <span className="text-[12px] font-bold font-sans leading-none">?</span>
        },
        {
            id: 2,
            label: 'Shine',
            isActive: activeNodes[1],
            // Removed shadow
            activeClasses: 'border-yellow-400',
            // Inner circle for the "Shine" state - removed shadow
            icon: (
                <div 
                    className={`w-2.5 h-2.5 rounded-full bg-yellow-400 transition-all duration-500 ease-in-out ${activeNodes[1] ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} 
                />
            )
        },
        {
            id: 3,
            label: 'Solve',
            isActive: activeNodes[2],
            // Updated green, removed shadow
            activeClasses: 'border-[#28c244] text-[#28c244]',
            icon: <span className="text-[10px] font-bold font-mono tracking-tighter leading-none">{"<>"}</span>
        },
        {
            id: 4,
            label: 'Succeed',
            isActive: activeNodes[3],
            // Updated green, removed shadow
            activeClasses: 'border-[#28c244] text-[#28c244]',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            )
        }
    ];

    return (
        <div className="bg-[#1a1a1a] flex flex-col items-center justify-center m-0 p-0 font-sans">
            {/* 220px width minus 10px on each edge means exactly 200px between centers */}
            <div className="w-100 relative px-0">
                
                {/* Main Stepper Container */}
                <div className="relative flex justify-between items-center w-full">
                    
                    {/* Background & Progress Lines */}
                    {/* Positioned exactly between the centers of the first and last nodes (10px inward for 20px nodes) */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-2.5 right-2.5 h-0.5 bg-neutral-800 rounded-full z-0">
                        <div 
                            // Updated green, removed shadow
                            className="h-full bg-[#28c244] rounded-full"
                            style={{ 
                                width: `${progress}%`,
                                transitionProperty: 'width',
                                transitionDuration: `${travelDuration}ms`,
                                transitionTimingFunction: 'linear'
                            }}
                        />
                    </div>

                    {/* Nodes */}
                    {nodes.map((node) => (
                        <div key={node.id} className="relative z-0 flex flex-col items-center">
                            
                            {/* Circle Node (20px diameter / w-5 h-5) */}
                            <div className={`
                                w-5 h-5 rounded-full border bg-[#1a1a1a] 
                                flex items-center justify-center
                                transition-all duration-300 ease-out
                                ${node.isActive ? node.activeClasses : 'border-neutral-700 text-neutral-700'}
                            `}>
                                {node.icon}
                            </div>

                            {/* Label underneath the Node */}
                            <div className="absolute top-full mt-2 text-center w-16 left-1/2 -translate-x-1/2">
                                <span className={`
                                    text-[10px] font-semibold tracking-wide transition-colors duration-300
                                    ${node.isActive ? 'text-white' : 'text-neutral-500'}
                                `}>
                                    {node.label}
                                </span>
                            </div>
                            
                        </div>
                    ))}
                </div>
                
            </div>
        </div>
    );
}