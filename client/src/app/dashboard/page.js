"use client"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react";
import Image from "next/image";
import WorkspaceCard from "@/components/WorkspaceCard.js"
import Link from "next/link";
import { useState, useEffect } from "react";
import { getUserWorkspaces } from "@/services/workspace.service.js";
import { Plus } from "lucide-react";

function Page() {

  const [loading, setLoading] = useState(false)
  const [workspaces, setWorkspaces] = useState([])
  const { data: session, status } = useSession();
  const user = session?.user

  useEffect(() => {
    if (status !== "authenticated") {
      return;
    }

    async function loadWorkspaces() {
      try {
        const userWorkspaces = await getUserWorkspaces(session?.accessToken);
        setWorkspaces(userWorkspaces)
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadWorkspaces();

  }, [status, session]);

  const handleLogout = () => {
    signOut({
      callbackUrl: '/',
      redirect: true
    });
  };

  if (loading || status == "loading") {
    return (
      <div className="flex w-screen h-screen items-center justify-center">Loading...</div>
    );
  }

  return (
    <div className="w-screen flex-1 flex bg-primary font-sans overflow-hidden">
      <div className="w-1/4 border-r max-[1400px]:hidden border-white/10 h-full">
        <div className="p-10 flex flex-col">
          <div className="flex">
            <div>
              <Image
                src={session?.user?.image ? session.user.image?.replace(/=s\d+-c$/, "=s400-c") : "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"}
                alt={user?.name || "User"}
                width={500}
                height={500}
                className="w-30 h-30 rounded-xl"
                loading="eager"
              />
            </div>
            <div className="p-2 pl-5 flex-1 flex flex-col">
              <div className="">
                <div>{user?.name}</div>
                <div className="text-sm text-gray-500">@{user?.username}</div>
              </div>
              <button className="w-full mt-auto p-2 rounded cursor-pointer text-sm bg-[#1b2d21] text-[#28a252]">Edit Profile</button>
            </div>
          </div>
          <button onClick={handleLogout} className="text-white active:scale-99 bg-red-700 hover:bg-red-800 transition-colors px-10 mt-5 p-1 rounded cursor-pointer">
            Sign Out
          </button>
        </div>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex w-full justify-between items-center p-5 border-b border-white/10 sticky top-0 z-5 bg-primary">
          <div className="text-3xl max-[500px]:text-2xl font-bold">Problems</div>
          <div className="flex items-center justify-center">
            <Link href="/problems/new">
              <button className="mr-5 max-[500px]:mr-0 border max-[500px]:text-base max-[500px]:px-2 border-gray-500/40 hover:bg-secondary active:scale-98 transition-all px-6 py-3 text-xl rounded flex items-center gap-2 cursor-pointer">
                New Problem
                <Plus className="max-[500px]:w-5" strokeWidth={2.5} />
              </button>
            </Link>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto minimal-scrollbar">
          {workspaces.length > 0 ? (
            workspaces.map((workspace, i) => (
              <WorkspaceCard key={i} workspace={workspace} />
            ))
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400 text-lg">
              Nothing to show here!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Page