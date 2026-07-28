"use client";

import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { ensureProblem } from "@/services/problem.service";
import { ensureWorkspace } from "@/services/workspace.service";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import useWorkspaceStore from "@/stores/workspace.store";
import { Loader } from "lucide-react";

const LANGUAGES = [
  { id: "cpp", name: "C++", compiler: "g++-15" },
  { id: "python", name: "Python", compiler: "python-3.14" },
  { id: "java", name: "Java", compiler: "openjdk-25" },
  { id: "c", name: "C", compiler: "gcc-15" },
  { id: "go", name: "Go", compiler: "go-1.26" },
  { id: "rust", name: "Rust", compiler: "rust-1.93" },
  { id: "csharp", name: "C#", compiler: "dotnet-csharp-9" },
  { id: "typescript", name: "TypeScript", compiler: "typescript-deno" },
  { id: "php", name: "PHP", compiler: "php-8.5" },
  { id: "ruby", name: "Ruby", compiler: "ruby-4.0" },
  { id: "haskell", name: "Haskell", compiler: "haskell-9.12" },
  { id: "fsharp", name: "F#", compiler: "dotnet-fsharp-9" },
];

const PLATFORMS = [
  { id: "leetcode", name: "LeetCode" },
  { id: "codeforces", name: "Codeforces" },
  { id: "codechef", name: "CodeChef" },
  { id: "atcoder", name: "AtCoder" },
  { id: "geeksforgeeks", name: "GeeksforGeeks" },
  { id: "hackerrank", name: "HackerRank" },
  { id: "codingninjas", name: "Coding Ninjas" },
  { id: "cses", name: "CSES" },
  { id: "interviewbit", name: "InterviewBit" },
  { id: "spoj", name: "SPOJ" },
  { id: "usaco", name: "USACO" },
  { id: "kattis", name: "Kattis" },
  { id: "topcoder", name: "Topcoder" },
  { id: "dmoj", name: "DMOJ" },
  { id: "ojuz", name: "OJ.uz" },
  { id: "lightoj", name: "LightOJ" },
  { id: "beecrowd", name: "Beecrowd (URI Online Judge)" },
  { id: "uva", name: "UVa Online Judge" },
  { id: "timus", name: "Timus Online Judge" },
  { id: "projecteuler", name: "Project Euler" },
  { id: "codingame", name: "CodinGame" },
  { id: "googlekickstart", name: "Google Kick Start" },
  { id: "facebookhackercup", name: "Meta Hacker Cup" },
  { id: "ioi", name: "IOI" },
  { id: "icpc", name: "ICPC" },
  { id: "googlecodejam", name: "Google Code Jam" },
  { id: "yosupo", name: "Library Checker (Yosupo)" },
  { id: "toph", name: "Toph" },
  { id: "algoexpert", name: "AlgoExpert" },
  { id: "lintcode", name: "LintCode" },
  { id: "hackerearth", name: "HackerEarth" },
  { id: "binarysearch", name: "BinarySearch" },
  { id: "adventofcode", name: "Advent of Code" },
  { id: "loj", name: "LibreOJ" },
  { id: "acmp", name: "ACMP" },
  { id: "other", name: "Other" }
];

export default function App() {

  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  const router = useRouter();

  // Image upload state
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Custom Toast Notification State
  const [toast, setToast] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      url: "",
      platform: "",
      statement: "",
      constraints: "",
      starterCode: "",
      sampleTestCases: [
        {
          input: "",
          output: "",
          explanation: "",
        },
      ],
    },
  });

  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newImages = filesArray.map((file) => ({
        id: Math.random().toString(36).substring(2, 9),
        file,
        url: URL.createObjectURL(file),
      }));
      const updatedImages = [...uploadedImages, ...newImages];
      setUploadedImages(updatedImages);
    }
    // Reset input value so the same image can be uploaded again if deleted
    e.target.value = "";
  };

  const removeImage = (id) => {
    setUploadedImages((prev) => {
      const target = prev.find((img) => img.id === id);
      if (target) {
        URL.revokeObjectURL(target.url);
      }
      return prev.filter((img) => img.id !== id);
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const triggerToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  const onSubmit = async (data) => {
    if (uploadedImages.length === 0) {
      triggerToast("Please upload at least one image.", "error");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();

      uploadedImages.forEach(({ file }) => {
        formData.append("images", file);
      });

      formData.append("title", data.title.trim());
      formData.append("platform", data.platform);
      formData.append("url", data.url?.trim() ?? "");

      const problem = await ensureProblem(formData);

      if (status !== "authenticated") {
        return;
      }

      const workspace = await ensureWorkspace({
        userId,
        problemId: problem._id,
        language: data.language,
        starterCode: data.starterCode,
      });

      console.log(session)

      useWorkspaceStore.getState().setWorkspace(workspace);
      router.push(`/problem/${problem._id}`);
    } catch (error) {
      console.error(error);
      triggerToast(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const onInvalidSubmit = () => {
    if (uploadedImages.length === 0) {
      triggerToast(
        "Please fill all required fields and upload at least one image.",
        "error"
      );
    } else {
      triggerToast(
        "Please fill all required fields.",
        "error"
      );
    }
  };

  return (
    <div className="w-full font-sans relative transition-colors duration-300 bg-primary">

      {toast && (
        <div
          className={`fixed top-20 right-10 max-[500px]:right-1 max-[500px]:text-p-1 z-50 max-w-md w-full bg-secondary shadow-2xl rounded-xl p-4 flex items-start gap-3 transition-all duration-300 ${toast.type === "error"
            ? "border-red-500/40"
            : "border-green-500/30"
            }`}
        >
          <div
            className={`p-2 rounded-lg ${toast.type === "error"
              ? "bg-red-500/10 text-red-400"
              : "bg-green-500/10 text-green-400"
              }`}
          >
            {toast.type === "error" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-white text-sm">
              {toast.type === "error"
                ? "Validation Error"
                : "Action Completed"}
            </h4>
            <p className="text-slate-300 text-[13px] mt-1 leading-relaxed">
              {toast.message}
            </p>
          </div>
          <button
            onClick={() => setToast(null)}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}
        className="w-full p-10 max-[800px]:p-0 max-[800px]:pt-5 max-[800px]:pb-5 flex items-center justify-center"
      >
        {/* Upload Problem Section */}
        <div className="bg-secondary rounded-xl p-20 max-[500px]:p-10 max-[500px]:px-5 max-[700px]:w-[90vw] space-y-6 w-4/5 shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
          <header className="mb-10">
            <h1 className="text-3xl max-[500px]:text-2xl font-bold text-white tracking-tight">
              Let's Prepare the Canvas!
            </h1>
            <p className="text-slate-400 mt-1 max-[500px]:text-xs text-sm">
              Upload problem materials and we will create the canvas for you!
            </p>
          </header>
          <div>
            <h2 className="text-xl max-[500px]:text-lg font-bold text-white flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Problem Images <span className="text-red-500 text-sm">*</span>
              {uploadedImages.length > 0 && (
                <span className="text-xs max-[600px]:ml-0 max-[600px]:p-2 bg-blue-500/20 text-blue-400 px-2.5 py-0.5 rounded-full font-medium ml-2">
                  {uploadedImages.length} uploaded
                </span>
              )}
            </h2>
            <p className="text-slate-400 max-[500px]:text-xs text-sm mt-1">
              Upload screenshots of problem statement, constraints, examples and explainations.
            </p>
          </div>

          {/* Image grid & Upload Trigger */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {uploadedImages.map((img) => (
              <div
                key={img.id}
                className="group relative aspect-video sm:aspect-square rounded-lg overflow-hidden border border-slate-700 hover:border-slate-500 transition"
              >
                <img
                  src={img.url}
                  alt="problem snippet"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-start justify-end">
                  <button
                    type="button"
                    onClick={() => removeImage(img.id)}
                    className="bg-red-600 m-2 hover:bg-red-700 cursor-pointer text-white rounded-full p-1.5 shadow-lg transform scale-95 group-hover:scale-100 transition"
                    title="Remove image"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeImage(img.id)}
                  className="absolute top-1.5 right-1.5 sm:hidden bg-red-600 text-white rounded-full p-1 shadow"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}

            {/* Plus / Upload Box */}
            <button
              type="button"
              onClick={triggerFileInput}
              className="aspect-video sm:aspect-square flex flex-col items-center justify-center border-2 border-dashed border-slate-700 hover:border-slate-500 bg-primary hover:bg-[#202020] rounded-lg transition text-slate-400 hover:text-white group space-y-2 cursor-pointer"
            >
              <div className="bg-secondary p-3 max-[800px]:p-1 rounded-full group-hover:bg-[#323232] transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-slate-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-300">
                Add Image
              </span>
            </button>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            multiple
            className="hidden"
          />

          {/* Title */}
          <div>
            <label className="block text-xl max-[500px]:text-lg font-semibold text-white mb-2">
              Title <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              placeholder="Enter problem title"
              {...register("title", {
                required: "Title is required",
              })}
              className="w-full rounded-lg bg-primary border text-sm p-2 border-slate-700/80 px-4 py-3 text-white outline-none focus:border-blue-500 transition-colors"
            />

            {errors.title && (
              <p className="text-red-400 mt-1 text-sm">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* URL */}
          <div>
            <label className="block text-xl max-[500px]:text-lg font-semibold text-white mb-2">
              Problem Link
            </label>

            <input
              type="url"
              placeholder="Link to the original problem"
              {...register("url")}
              className="w-full rounded-lg bg-primary text-sm p-2 border border-slate-700/80 px-4 py-3 text-white outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Platform */}
          <div>
            <label className="block text-xl max-[500px]:text-lg font-semibold text-white mb-2">
              Platform <span className="text-red-500">*</span>
            </label>

            <select
              {...register("platform", {
                required: "Platform is required",
              })}
              className="w-full minimal-scrollbar rounded-lg bg-primary appearance-none border text-sm border-slate-700/80 px-4 py-3 text-white outline-none focus:border-blue-500 transition-colors cursor-pointer"
            >
              <option value="">
                Select a platform
              </option>
              {PLATFORMS.map((platform) => (
                <option className="cursor-pointer" key={platform.id} value={platform.id}>
                  {platform.name}
                </option>
              ))}
            </select>

            {errors.platform && (
              <p className="text-red-400 mt-1 text-sm">
                {errors.platform.message}
              </p>
            )}
          </div>

          {/* Code Language */}
          <div>
            <label className="block text-xl max-[500px]:text-lg font-semibold text-white mb-2">
              Code Language <span className="text-red-500">*</span>
            </label>

            <select
              {...register("language", {
                required: "Code Language is required",
              })}
              className="w-full rounded-lg bg-primary appearance-none border text-sm border-slate-700/80 px-4 py-3 text-white outline-none focus:border-blue-500 transition-colors cursor-pointer"
            >
              <option value="">
                Select a language
              </option>
              {LANGUAGES.map((lang) => (
                <option className="cursor-pointer" key={lang.id} value={lang.id}>
                  {lang.name}
                </option>
              ))}
            </select>

            {errors.language && (
              <p className="text-red-400 mt-1 text-sm">
                {errors.language.message}
              </p>
            )}
          </div>

          {/* Starter Code */}
          <div>
            <label className="block text-white max-[500px]:text-lg mb-2 font-medium">
              Code Template
            </label>

            <textarea
              rows={12}
              placeholder="Optional starter code..."
              {...register("starterCode")}
              className="w-full min-h-75 resize-y max-[500px]:text-sm rounded-lg bg-primary border border-slate-700/80 px-4 py-3 text-white font-mono outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          {/* Form Submission button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full max-[600px]:text-sm max-[600px]:py-3 py-4 rounded-lg text-white font-semibold text-lg transition-all duration-200 ${isLoading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 cursor-pointer active:scale-[0.99]"
              }`}
          >
            {isLoading ? <div className="flex items-center justify-center">
              <div>Preparing the Canvas</div> 
              <Loader strokeWidth={2} className="h-5 w-5 ml-2 animate-spin text-white" />
              </div> : "Create Canvas"}
          </button>
        </div>
      </form>
    </div>
  );
}