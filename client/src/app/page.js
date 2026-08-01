"use client"

import React, { useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import textLogo from "../../public/images/hero-logo-no-bg.png"
import canvas from "../../public/images/canvas.png"

import {
  Code2,
  Terminal,
  Cpu,
  Zap,
  BrainCircuit,
  CheckCircle2,
  Lightbulb,
  History,
  Target,
} from 'lucide-react';

const COMPARISON_DATA = [
  {
    feature: 'Context Awareness',
    traditional: 'None (Manual Copy-Paste)',
    aiChatbots: 'Generic (Requires full copy-paste prompt)',
    shineAi: '100% Automatic & Persistent per problem'
  },
  {
    feature: 'Mentorship Approach',
    traditional: 'Static editorial / Disconnected',
    aiChatbots: 'Gives full solution immediately',
    shineAi: 'Guided progressive hints without spoiling'
  },
  {
    feature: 'Workspace State',
    traditional: 'Resets or separate tabs',
    aiChatbots: 'No memory of code or test cases',
    shineAi: 'Saves code, edge cases & AI chats together'
  },
  {
    feature: 'Context Switching',
    traditional: 'High (3-5 open tabs)',
    aiChatbots: 'High (Switching to ChatGPT/Gemini)',
    shineAi: 'Zero (Everything inside 1 workspace)'
  }
];

export default function App() {

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-gray-100 pb-50 font-sans selection:bg-yellow-400 selection:text-black relative overflow-x-hidden">

      <div className='w-full flex items-center justify-center'>
        <Image
          src={textLogo}
          alt={"logo"}
          width={"auto"}
          height={"auto"}
          loading='eager'
          className="rounded-full w-200 max-[500px]:mt-20"
        />
      </div>

      <header className="relative -mt-10 pt-12 pb-20 md:pt-0 md:pb-32 px-4 lg:px-8 max-w-7xl mx-auto">

        <div className="text-center max-w-3xl mx-auto space-y-6 relative">

          {/* Main Headline */}
          <h1 className="text-2xl sm:text-2xl lg:text-2xl font-extrabold tracking-tight text-white leading-[1.15]">
            Code with an AI Mentor that <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-300 via-yellow-400 to-amber-500">Guides, Not Spoils</span>
          </h1>

          {/* Hero Subtitle */}
          <p className="text-base sm:text-base text-gray-300 leading-relaxed font-light">
            Shine Ai combines an interactive coding environment with an intelligent programming assistant. Understand problems, debug code, analyze complexity, generate test cases and much more—all without tab switching.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href={"/problems/new"}>
              <button className="bg-yellow-400 text-black text-base font-bold max-[500px]:m-2 max-[500px]:text-sm px-12.5 py-3 m-5 rounded-xl cursor-pointer transition-colors duration-300 hover:bg-yellow-500">
                &lt;Canvas/&gt;
              </button>
            </Link>
            <a
              href="#demo"
              className="w-fit sm:w-auto px-6 py-3 rounded-xl text-base font-semibold text-gray-200 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <span className='w-fit'>Explore Shine Ai</span>
            </a>
          </div>
        </div>
      </header>

      <section id="demo" className="py-20 px-4 lg:px-8 max-w-7xl mx-auto relative">
        <div className="text-center mb-10">
          <p className="text-3xl sm:text-4xl font-bold text-white">Experience <span className="text-yellow-400">Shine Ai</span> in Action</p>
          <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
            Solve, debug, ask for hints, test your code, dry run, we've got all that in one place. We call it the Canvas!
          </p>
        </div>

        {/* Mockup Window Header */}
        <div className="rounded-2xl border border-white/10 bg-[#222222] shadow-2xl w-fit overflow-hidden backdrop-blur-xl">

          {/* Top Bar / Controls */}
          <div className="bg-[#181818] px-4 py-3 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">

            {/* Window Dots & Problem Selector */}
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>

              {/* Problem Switcher */}
              <div className="flex items-center gap-2 bg-[#2a2a2a] px-3 py-1.5 rounded-lg border border-white/10 text-xs sm:text-sm">
                <Code2 className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-400">Canvas</span>
              </div>
            </div>
          </div>

          {/* Main IDE Body Grid */}
          <div className="">
            <Image
              src={canvas}
              alt={"logo"}
              width={2000}
              height={2000}
              className=""
            />
          </div>
        </div>
      </section>

      { }
      <section id="what-is-shine" className="py-20 px-4 lg:px-8 max-w-7xl mx-auto border-t border-white/5 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Text Explanation */}
          <div className="lg:col-span-6 space-y-6">

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              What Exactly is <span className="text-yellow-400">Shine Ai</span>?
            </h2>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-light">
              Shine Ai is an AI-powered coding practice platform that combines an online coding workspace with an intelligent programming assistant.
            </p>

            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
              Instead of giving direct code solutions, it helps users understand them, debug code, generate hints, analyze complexity, create custom test cases, and track their progress—all within a single workspace.
            </p>

            <div className="p-4 rounded-xl bg-[#222222] border border-white/10 space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-yellow-400/10 text-yellow-400 mt-0.5">
                  <History className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Persistent Problem Workspaces</h4>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    Every problem has its own persistent workspace, allowing users to track progress, save their code, test cases, and AI conversations.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#222222] border border-white/10 space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-yellow-400/10 text-yellow-400 mt-0.5">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Personalized Guidance Without Spoilers</h4>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    By maintaining context about the current problem and your progress, Shine Ai delivers targeted guidance without immediately revealing complete solutions, encouraging deeper learning.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Cards Showcase */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Feature Box 1 */}
            <div className="p-6 rounded-2xl bg-[#222222]/80 border border-white/10 hover:border-yellow-400/40 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-yellow-400/10 text-yellow-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Smart Socratic Hints</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Receive progressive clues that help you discover the algorithm yourself instead of copying pre-written code.
              </p>
            </div>

            {/* Feature Box 2 */}
            <div className="p-6 rounded-2xl bg-[#222222]/80 border border-white/10 hover:border-yellow-400/40 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-yellow-400/10 text-yellow-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Instant Debugging</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Highlight runtime errors or logical bugs directly inside your code editor on a single tap.
              </p>
            </div>

            {/* Feature Box 3 */}
            <div className="p-6 rounded-2xl bg-[#222222]/80 border border-white/10 hover:border-yellow-400/40 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-yellow-400/10 text-yellow-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Complexity Analysis</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Automatically analyze time and space complexity with actionable suggestions for space-time optimizations.
              </p>
            </div>

            {/* Feature Box 4 */}
            <div className="p-6 rounded-2xl bg-[#222222]/80 border border-white/10 hover:border-yellow-400/40 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-yellow-400/10 text-yellow-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Edge Case Generator</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Auto-generate tricky test cases to bulletproof your code, that too on a single tap.
              </p>
            </div>

          </div>

        </div>
      </section>

      { }
      <section id="why-use-shine" className="py-10 px-4 lg:px-8 max-w-7xl mx-auto border-t border-white/5 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Why Use <span className="text-yellow-400">Shine Ai</span>?
          </h2>
          <p className="text-gray-300 mt-4 text-base leading-relaxed">
            Most coding platforms either provide problems to solve or AI tools that generate complete solutions. <strong className="text-white">Shine Ai brings everything together in one place, acting as a mentor rather than a solution generator.</strong>
          </p>
        </div>

        {/* Highlight Banner */}
        <div className="mb-12 p-6 sm:p-8 rounded-2xl bg-linear-to-r from-[#222222] via-secondary to-[#222222] border border-yellow-400/20 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <BrainCircuit className="w-6 h-6 text-yellow-400" />
              Stop Context Switching Between 5 Different Tabs
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed max-w-2xl">
              Shine AI reduces the need to switch between coding platforms, documentation, search engines, and AI chatbots by bringing everything into one workspace. Spend more time solving problems and less time searching for help.
            </p>
          </div>
          <Link href={"/problems/new"}>
            <button className="bg-yellow-400 text-black text-[16px] w-50 font-bold max-[500px]:m-2 max-[500px]:text-sm max-[500px]:p-3 max-[500px]:w-40 p-4 px-5 m-5 rounded-xl cursor-pointer transition-colors duration-300 hover:bg-yellow-500">
              Try  the &lt;Canvas/&gt;
            </button>
          </Link>
        </div>

        {/* Comparison Grid */}
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#202020]">
          <table className="w-full text-left text-xs sm:text-sm text-gray-300 border-collapse">
            <thead>
              <tr className="bg-[#181818] border-b border-white/10 text-gray-200">
                <th className="p-4 sm:p-5 font-bold">Feature Comparison</th>
                <th className="p-4 sm:p-5 font-bold text-gray-400">Traditional Platforms (LeetCode/Codeforces)</th>
                <th className="p-4 sm:p-5 font-bold text-gray-400">Generic AI (ChatGPT / Gemini)</th>
                <th className="p-4 sm:p-5 font-bold text-yellow-400 bg-yellow-400/10 border-x border-yellow-400/20">
                  Shine AI Workspace
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {COMPARISON_DATA.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-white">{row.feature}</td>
                  <td className="p-4 sm:p-5 text-gray-400">{row.traditional}</td>
                  <td className="p-4 sm:p-5 text-gray-400">{row.aiChatbots}</td>
                  <td className="p-4 sm:p-5 font-semibold text-yellow-300 bg-yellow-400/5 border-x border-yellow-400/10">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0" />
                      <span>{row.shineAi}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="inspiration" className="py-10 px-4 lg:px-8 max-w-7xl mx-auto border-t border-white/5 relative">
        <div className="bg-[#212121] rounded-3xl border border-white/10 p-8 sm:p-12 relative overflow-hidden">

          <div className="max-w-3xl space-y-6 relative">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              The Inspiration Behind <span className="text-yellow-400">Shine Ai</span>
            </h2>

            <blockquote className="text-lg sm:text-xl text-gray-200 italic font-light border-l-4 border-yellow-400 pl-4 py-1">
              "While practicing coding problems, I constantly found myself switching between platforms like LeetCode or Codeforces and AI tools like ChatGPT or Gemini."
            </blockquote>

            <div className="text-gray-300 text-sm sm:text-base space-y-4 leading-relaxed font-light">
              <p>
                Whenever I got stuck, needed a hint, wanted to debug my code, generate test cases, or understand an approach, I'd have to copy the problem, paste my code, explain the context, and then switch back to continue coding.
              </p>
              <p className="text-gray-200 font-medium">
                That constant context switching broke my flow and wasted time.
              </p>
              <p>
                I built <strong className="text-yellow-400 font-bold">Shine Ai</strong> to solve this problem by bringing AI directly into the coding workspace, so assistance is available instantly with full context—without leaving the editor or repeatedly explaining the same problem.
              </p>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-yellow-400 text-black font-extrabold flex items-center justify-center text-lg">
                M
              </div>
              <div>
                <div className="text-base font-bold text-white">Built for Coders, By a Coder</div>
                <div className="text-sm text-yellow-400 font-mono">Maaz</div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}