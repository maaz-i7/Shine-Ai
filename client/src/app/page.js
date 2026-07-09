import Image from "next/image";
import heroBg from "../../public/images/hero-bg.png"

export default function Home() {
  return (
    <main className="h-1000">
      <div className="w-screen flex items-center justify-center py-15">
        <Image loading="eager" className="w-150" src={heroBg} alt="logo" />
      </div>
      <div className="w-screen flex justify-center">
        <button className="bg-blue-500 text-2xl w-50 font-bold p-4 px-6 m-5 rounded-4xl cursor-pointer transition-colors duration-300 hover:bg-blue-600">&lt;Canvas/&gt;</button>
        <button className="bg-yellow-500 text-2xl w-50 font-bold p-4 px-6 m-5 rounded-4xl cursor-pointer transition-colors duration-300 hover:bg-yellow-600">Register</button>
      </div>
    </main>
  );
}
