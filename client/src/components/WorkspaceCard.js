"use client"

import React from "react"
import ScoreBar from "./ScoreBar"
import Link from "next/link";
import { Circle, Clock3, CheckCircle2, RotateCcw, Trash2 } from "lucide-react";
import DeleteWorkspaceModal from "./DeleteModalBox";
import { useState } from "react";
import { deleteWorkspace } from "@/services/workspace.service";

export function getTimeAgo(date) {
  const now = new Date();
  const created = new Date(date);

  const seconds = Math.floor((now - created) / 1000);

  if (seconds < 5) return "Just now";

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);

    if (count >= 1) {
      if (interval.label === "day" && count === 1) {
        return "Yesterday";
      }

      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "Just now";
}

export const LANGUAGES = {
  "cpp": "C++",
  "python": "Python",
  "java": "Java",
  "c": "C",
  "go": "Go",
  "rust": "Rust",
  "csharp": "C#",
  "typescript": "TypeScript",
  "php": "PHP",
  "ruby": "Ruby",
  "haskell": "Haskell",
  "fsharp": "F#",
};

export default function Component({ workspace, setWorkspaces, accessToken }) {

  const problem = workspace?.problem
  const statusConfig = {
    Todo: {
      icon: Circle,
      className: "text-blue-300 text-[15px]",
    },
    Solving: {
      icon: Clock3,
      className: "text-blue-400 text-[15px]",
    },
    Solved: {
      icon: CheckCircle2,
      className: "text-green-400 text-[15px]",
    },
    Revisit: {
      icon: RotateCcw,
      className: "text-orange-400 text-[15px]",
    },
  };

  const status = statusConfig[workspace?.status] || statusConfig.Todo;
  const Icon = status.icon;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true);

      const workspaceId = workspace._id
      await deleteWorkspace({ workspaceId, accessToken });

      setWorkspaces((prev) =>
        prev.filter((w) => w._id !== workspace._id)
      );

      setShowDeleteModal(false);
    } catch (error) {
      console.error("Failed to delete workspace:", error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      {showDeleteModal && <DeleteWorkspaceModal
        isOpen={showDeleteModal}
        loading={deleting}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />}
      <Link href={`/problem/${problem?._id}`}>
        <div className="w-full group h-fit flex items-center justify-between pb-5 pr-5 pt-5 hover:bg-[#1e1e1e] transition-colors border-b border-white/10">
          <div>
            <Trash2 className="w-4 m-3 mr-5 text-gray-500 invisible transition-colors hover:scale-110 hover:text-red-800 pointer-fine:group-hover:visible pointer-coarse:visible" onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setShowDeleteModal(true)
            }
            } />
          </div>
          <div className="w-full">
            <div className="font-bold text-xl max-[600px]:text-lg">{problem?.title}</div>
            <div className="flex w-full mt-5 items-center justify-between">
              <div className="flex w-fit gap-5 max-[600px]:gap-1 justify-between items-center">
                <div className="text-[#3adcd7] bg-[#3C3C3C] text-[12px] max-[600px]:text-[10px] font-semibold flex items-center justify-center rounded-2xl max-[600px]:px-2 px-2.5 py-1">{LANGUAGES[workspace?.language]}</div>
                {/* Difficulty Tag */}
                <div
                  className={`inline-flex items-center rounded-full max-[600px]:px-2 px-2.5 py-1 text-[12px] max-[600px]:text-[10px] font-semibold
                        ${problem?.difficulty === "Easy" ? "bg-green-500/15 text-green-400" : problem?.difficulty === "Medium" ? "bg-yellow-500/15 text-yellow-400" : problem?.difficulty === "Hard" ? "bg-red-500/15 text-red-400" : "bg-purple-500/15 text-purple-400"}`}
                >
                  {problem?.difficulty}
                </div>
                {/* Solve Status */}
                <div
                  className={`inline-flex items-center gap-1.5 max-[600px]:text-[10px] rounded-full px-2 py-1 text-xs font-semibold ${status.className}`}
                >
                  <Icon size={13} strokeWidth={2.2} />
                  <span>{workspace?.status}</span>
                </div>
                <div className="text-gray-400 text-[13px] max-[600px]:text-xs">{getTimeAgo(workspace?.createdAt)}</div>
              </div>
            </div>
          </div>
          <div className="w-fit">
            <ScoreBar score={workspace?.score} />
          </div>
        </div>
      </Link>
    </>
  )
}