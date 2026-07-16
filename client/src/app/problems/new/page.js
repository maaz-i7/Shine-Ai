"use client";

import React, { useState, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useProblemStore } from "../../../stores/problem.store.js";
import { useRouter } from "next/navigation";

export const LANGUAGES = [
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

export default function App() {
  const router = useRouter();

  // Image upload state
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Custom Toast Notification State
  const [toast, setToast] = useState(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    trigger,
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sampleTestCases",
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

  const generateProblemFromImages = async () => {
    if (uploadedImages.length === 0) 
      return null;

    setIsLoading(true);

    const formData = new FormData();

    uploadedImages.forEach((image) => {
      formData.append("images", image.file);
    });

    try {
      const response = await fetch(
        "http://localhost:5000/api/ai/extract-problem",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to create problem.");
      }
      return result.data;

    } catch (error) {
      console.error(error);
      triggerToast("Failed to create problem. Please try again.", "error");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data) => {
    // Check if at least one image is uploaded (react-hook-form handles title/platform)
    if (uploadedImages.length === 0) {
      triggerToast("Please upload at least one image.", "error");
      return;
    }

    // Process with AI using the uploaded images
    const aiResponse = await generateProblemFromImages();

    if (!aiResponse) {
      triggerToast("Server did not respond. Please try again", "error");
      return;
    }

    if (aiResponse === "-1") {
      triggerToast("Please upload valid problem images", "error");
      return;
    }

    useProblemStore.getState().setGeneratedProblem(aiResponse);
    router.push("/problem");
  };

  const onInvalidSubmit = (formErrors) => {
    const isImageMissing = uploadedImages.length === 0;

    if (isImageMissing) {
      triggerToast("Please fill all required fields and upload an image.", "error");
    } else {
      triggerToast("Please fill all required fields.", "error");
    }
  };

  return (
    <div className="w-screen font-sans relative transition-colors duration-300 bg-primary">
      {/* Embedded Theme CSS variables */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
                .border-theme {
                    border-color: rgba(255, 255, 255, 0.08) !important;
                }
              `,
        }}
      />

      {toast && (
        <div
          className={`fixed top-20 right-10 z-50 max-w-md w-full bg-secondary border shadow-2xl rounded-xl p-4 flex items-start gap-3 transition-all duration-300 ${toast.type === "error"
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
        className="w-full p-10 flex items-center justify-center"
      >
        {/* Upload Problem Section */}
        <div className="bg-secondary rounded-xl p-20 space-y-6 border border-theme w-4/5 shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
          <header className="mb-10">
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Let's Prepare the Canvas!
            </h1>
            <p className="text-slate-400 mt-1 text-sm">
              Upload problem materials and we will create the canvas for you!
            </p>
          </header>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
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
                <span className="text-xs bg-blue-500/20 text-blue-400 px-2.5 py-0.5 rounded-full font-medium ml-2">
                  {uploadedImages.length} uploaded
                </span>
              )}
            </h2>
            <p className="text-slate-400 text-sm mt-1">
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
              <div className="bg-secondary p-3 rounded-full group-hover:bg-[#323232] transition">
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
            <label className="block text-xl font-semibold text-white mb-2">
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
            <label className="block text-xl font-semibold text-white mb-2">
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
            <label className="block text-xl font-semibold text-white mb-2">
              Platform <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              placeholder="LeetCode / Codeforces / CodeChef..."
              {...register("platform", {
                required: "Platform is required",
              })}
              className="w-full rounded-lg bg-primary border text-sm p-2 border-slate-700/80 px-4 py-3 text-white outline-none focus:border-blue-500 transition-colors"
            />

            {errors.platform && (
              <p className="text-red-400 mt-1 text-sm">
                {errors.platform.message}
              </p>
            )}
          </div>

          {/* Code Language */}
          <div>
            <label className="block text-xl font-semibold text-white mb-2">
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
            <label className="block text-white mb-2 font-medium">
              Code Template
            </label>

            <textarea
              rows={12}
              placeholder="Optional starter code..."
              {...register("starterCode")}
              className="w-full min-h-75 resize-y rounded-lg bg-primary border border-slate-700/80 px-4 py-3 text-white font-mono outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          {/* Form Submission button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 rounded-lg text-white font-semibold text-lg transition-all duration-200 ${isLoading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 cursor-pointer active:scale-[0.99]"
              }`}
          >
            {isLoading ? "Generating Problem..." : "Create Problem"}
          </button>
        </div>
      </form>
    </div>
  );
}