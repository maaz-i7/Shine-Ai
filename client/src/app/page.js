import Link from "next/link";
import ProgressJourney from "@/components/ProgressJourney";

export default function Home() {
  return (
    <main className="h-fit bg-primary font-sans">

      <div className="relative w-175 h-100 pt-15 mx-auto overflow-hidden max-[750px]:w-[90vw]">
        <video
          autoPlay
          muted
          playsInline
          className="block w-full h-auto"
        >
          <source src="/videos/logo.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="w-full flex justify-center mt-10 max-[700px]:-mt-5 max-[500px]:flex-col items-center">
        <Link href={"/problems/new"}><button className="bg-blue-500 text-[16px] w-50 font-bold max-[500px]:m-2 max-[500px]:p-2 p-4 px-6 m-5 rounded-xl cursor-pointer transition-colors duration-300 hover:bg-blue-600">&lt;Canvas/&gt;</button></Link>
        <Link href={"/dashboard"}><button className="bg-yellow-500 text-[16px] w-50 font-bold max-[500px]:m-2 max-[500px]:p-2 p-4 px-6 m-5 rounded-xl cursor-pointer transition-colors duration-300 hover:bg-yellow-600">Register</button></Link>
      </div>

      <div className="flex flex-col max-[500px]:m-0 max-[500px]:mt-15 max-[500px]:p-5 ml-10 mr-10 p-10 mt-20">
        <div className="font-bold text-4xl mb-5 max-[500px]:text-2xl">What Exactly is Shine Ai?</div>
        <div className="text-wrap text-lg leading-10 text-justify max-[500px]:text-sm max-[500px]:leading-7">
          Shine AI is an AI-powered coding practice platform that combines an online coding workspace with an intelligent programming assistant. Instead of only solving problems, it helps users understand them, debug code, generate hints, analyze complexity, create custom test cases, and track their progress—all within a single workspace.

          The platform provides an interactive coding environment where every problem has its own persistent workspace, allowing users to save their code, test cases, and AI conversations. By maintaining context about the current problem and the user's progress, Shine AI delivers personalized guidance without immediately revealing complete solutions, encouraging deeper learning and stronger problem-solving skills.
        </div>

        <div className="font-bold text-4xl mt-20 mb-5 max-[500px]:text-2xl">Why Use Shine Ai?</div>
        <div className="text-wrap text-lg leading-10 text-justify max-[500px]:text-sm max-[500px]:leading-7">
          Most coding platforms either provide problems to solve or AI tools that generate complete solutions. Shine AI bridges this gap by acting as a mentor rather than a solution generator. It understands the current problem, your code, and your progress to provide targeted assistance that encourages learning instead of simply giving away answers.

          Shine AI reduces the need to switch between coding platforms, documentation, search engines, and AI chatbots by bringing everything into one workspace. This allows developers and students to spend more time solving problems and less time searching for help, resulting in a faster, more focused, and more effective coding experience.
        </div>

        <div className="font-bold text-4xl mt-20 mb-5 max-[500px]:text-2xl">The Inspiration</div>
        <div className="text-wrap text-lg leading-10 text-justify max-[500px]:text-sm max-[500px]:leading-7">
          While practicing coding problems, I constantly found myself switching between platforms like LeetCode or Codeforces and AI tools like ChatGPT or Gemini. Whenever I got stuck, needed a hint, wanted to debug my code, generate test cases, or understand an approach, I'd have to copy the problem, paste my code, explain the context, and then switch back to continue coding.

          That constant context switching broke my flow and wasted time. I built Shine AI to solve this problem by bringing AI directly into the coding workspace, so assistance is available instantly with full context—without leaving the editor or repeatedly explaining the same problem.
        </div>
      </div>
    </main>
  );
}