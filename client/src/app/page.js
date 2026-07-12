import Image from "next/image";
import heroBg from "../../public/images/hero-logo-no-bg.png"
import ProgressJourney from "@/components/ProgressJourney";

export default function Home() {
  return (
    <main className="h-1000 bg-primary">

      <div className="relative w-175 h-100 mx-auto overflow-hidden">
        <video
          autoPlay
          muted
          playsInline
          className="block w-full h-auto"
        >
          <source src="/videos/logo.mp4" type="video/mp4" />
        </video>

        {/* Top */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-linear-to-b from-[#1a1a1a] to-transparent" />

        {/* Bottom */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-[#1a1a1a] to-transparent" />

        {/* Left */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-linear-to-r from-[#1a1a1a] to-transparent" />

        {/* Right */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-linear-to-l from-[#1a1a1a] to-transparent" />
      </div>

      <ProgressJourney />

      <div className="w-screen flex justify-center mt-10">
        <button className="bg-blue-500 text-[15px] w-50 font-bold p-4 px-6 m-5 rounded-xl cursor-pointer transition-colors duration-300 hover:bg-blue-600">&lt;Canvas/&gt;</button>
        <button className="bg-yellow-500 text-[15px] w-50 font-bold p-4 px-6 m-5 rounded-xl cursor-pointer transition-colors duration-300 hover:bg-yellow-600">Register</button>
      </div>
    </main>
  );
}