"use client"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react";
import Image from "next/image";
import ProjectCard from "@/components/ProjectCard.js"

export default function () {

  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  const user = session.user

  const handleLogout = () => {
    signOut({
      callbackUrl: '/',
      redirect: true
    });
  };

  return (
    <div className="w-screen flex">
      <div className="w-1/4 h-screen bg-primary border-r border-white/10">
        <div className="p-10 flex flex-col h-screen">
          <div className="flex">
            <div>
              <Image
                src={session.user.image ? session.user.image?.replace(/=s\d+-c$/, "=s400-c") : "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"}
                alt={user.name || "User"}
                width={500}
                height={500}
                className="w-30 h-30 rounded-xl"
              />
            </div>
            <div className="p-2 pl-5 flex-1 flex flex-col">
              <div className="">
                <div>{user.name}</div>
                <div className="text-sm text-gray-500">@{user.username}</div>
              </div>
              <button className="w-full mt-auto p-2 rounded cursor-pointer text-sm bg-[#1b2d21] text-[#28a252]">Edit Profile</button>
            </div>
          </div>
          <div className="flex items-center justify-center mt-auto">
            <button onClick={handleLogout} className="text-white bg-red-700 px-10 p-1 rounded cursor-pointer">
              Sign Out
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 h-screen bg-primary">
        <div className="flex w-full justify-between items-center p-5 border-b border-white/10">
          <div className="text-3xl font-bold">Problems</div>
          <button className="mr-5 border-gray-500 border p-2 px-5 rounded flex items-center justify-center cursor-pointer">
            New Problem 
            <span className="text-2xl ml-2">+</span>
          </button>
        </div>
        <ProjectCard/>
      </div>
    </div>
  )
}