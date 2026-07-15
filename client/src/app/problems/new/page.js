"use client";

import React, { useState, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";

export default function App() {
    // Accordion state - default minimized (false)
    const [isManualOpen, setIsManualOpen] = useState(false);

    // Image upload state
    const [uploadedImages, setUploadedImages] = useState([]);
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

            // If images are uploaded, re-validate manual fields since they are now optional
            if (updatedImages.length > 0) {
                trigger();
            }
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
            const updated = prev.filter((img) => img.id !== id);
            // If all images are removed, trigger validation again so manual fields become required
            if (updated.length === 0) {
                setTimeout(() => trigger(), 50);
            }
            return updated;
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

    const onSubmit = (data) => {
        // If neither images are uploaded, nor the manual fields are complete
        if (uploadedImages.length === 0 && (!data.title || !data.platform || !data.statement || !data.constraints)) {
            setIsManualOpen(true);
            triggerToast("Please upload at least one image or complete the manual problem details.", "error");
            return;
        }

        console.log("Form Data Submitted Successfully:", data);
        console.log("Uploaded Images Attached:", uploadedImages);
    };

    // If form validation fails on React Hook Form's side, expand manual section to show errors
    const onInvalidSubmit = (formErrors) => {
        if (uploadedImages.length === 0) {
            setIsManualOpen(true);
            triggerToast("Please upload at least one problem image or fill in the required manual fields.", "error");
        }
    };

    return (
        <div className="w-screen flex justify-center min-h-[110vh]">
            <div className="bg-primary w-300 h-fit py-20 px-7 rounded-[20px] m-5">
                <div className="h-full font-sans flex flex-col justify-start px-4 relative transition-colors duration-300">
                    {/* Embedded Theme CSS variables */}
                    <style dangerouslySetInnerHTML={{
                        __html: `
                            .border-theme {
                                border-color: rgba(255, 255, 255, 0.08) !important;
                            }
                    `}} />

                    {toast && (
                        <div className={`fixed top-20 right-10 z-50 max-w-md w-full bg-secondary border shadow-2xl rounded-xl p-4 flex items-start gap-3 transition-all duration-300 ${toast.type === "error" ? "border-red-500/40" : "border-green-500/30"
                            }`}>
                            <div className={`p-2 rounded-lg ${toast.type === "error" ? "bg-red-500/10 text-red-400" : "bg-green-500/10 text-green-400"}`}>
                                {toast.type === "error" ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                )}
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-white text-sm">
                                    {toast.type === "error" ? "Validation Error" : "Action Completed"}
                                </h4>
                                <p className="text-slate-300 text-[13px] mt-1 leading-relaxed">{toast.message}</p>
                            </div>
                            <button
                                onClick={() => setToast(null)}
                                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                                type="button"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    )}

                    { }
                    <form
                        onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}
                        className="w-full max-w-5xl space-y-6 mx-auto flex-1 flex flex-col justify-between"
                    >
                        <div className="space-y-3">
                            <header className="mb-5">
                                <h1 className="text-3xl font-bold text-white tracking-tight">
                                    Let's Prepare the Canvas!
                                </h1>
                                <p className="text-slate-400 mt-1 text-sm">
                                    Upload problem materials or input problem details manually.
                                </p>
                            </header>

                            {/* Section 1: Upload Problem Images */}
                            <div className="bg-secondary rounded-xl p-8 space-y-6 border border-theme">
                                <div>
                                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        Upload Problem Images
                                        {uploadedImages.length > 0 && (
                                            <span className="text-xs bg-blue-500/20 text-blue-400 px-2.5 py-0.5 rounded-full font-medium ml-2">
                                                {uploadedImages.length} uploaded
                                            </span>
                                        )}
                                    </h2>
                                    <p className="text-slate-400 text-sm mt-1">
                                        Upload screenshots of problem statements, diagrams, or requirements.
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
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeImage(img.id)}
                                                className="absolute top-1.5 right-1.5 sm:hidden bg-red-600 text-white rounded-full p-1 shadow"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
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
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                        </div>
                                        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-300">Add Image</span>
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
                            </div>

                            {/* Section 2: Create Problem Manually (Collapsible & Default Closed with Tertiary Color Context) */}
                            <div className="bg-secondary rounded-xl border border-theme overflow-hidden">
                                {/* Collapsible Trigger Header */}
                                <button
                                    type="button"
                                    onClick={() => setIsManualOpen(!isManualOpen)}
                                    className="w-full flex items-center justify-between p-8 text-left hover:bg-black/10 transition focus:outline-none focus:ring-1 rounded-xl cursor-pointer focus:ring-inset focus:ring-gray-700"
                                >
                                    <div className="flex items-center gap-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        <div>
                                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                                Create Problem Manually
                                                {uploadedImages.length === 0 && (
                                                    <span className="text-xs text-red-400 px-2.5 py-0.5 rounded-full font-medium ml-2">
                                                        *Required if no images uploaded
                                                    </span>
                                                )}
                                            </h2>
                                            <p className="text-slate-400 text-sm mt-0.5">Fill in Problem Title, Statement, Constraints, Link and Platform</p>
                                        </div>
                                    </div>
                                    <div className="text-slate-400 bg-primary p-2 rounded-lg">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`h-5 w-5 transform transition-transform duration-200 ${isManualOpen ? "rotate-180" : ""}`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </button>

                                {/* Manual Form Area */}
                                <div
                                    className={`transition-all duration-300 ease-in-out max-h-full opacity-100 border-t border-theme ${isManualOpen ? "block" : "hidden"}`}
                                >
                                    <div className="p-8 space-y-8">
                                        {/* Title */}
                                        <div>
                                            <label className="block text-xl font-semibold text-white mb-2">
                                                Title {uploadedImages.length === 0 && <span className="text-red-500">*</span>}
                                            </label>

                                            <input
                                                type="text"
                                                placeholder="Enter problem title"
                                                {...register("title", {
                                                    required: uploadedImages.length === 0 ? "Title is required when no images are uploaded" : false,
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
                                                placeholder="https://..."
                                                {...register("url")}
                                                className="w-full rounded-lg bg-primary text-sm p-2 border border-slate-700/80 px-4 py-3 text-white outline-none focus:border-blue-500 transition-colors"
                                            />
                                        </div>

                                        {/* Platform */}
                                        <div>
                                            <label className="block text-xl font-semibold text-white mb-2">
                                                Platform {uploadedImages.length === 0 && <span className="text-red-500">*</span>}
                                            </label>

                                            <input
                                                type="text"
                                                placeholder="LeetCode / Codeforces / CodeChef..."
                                                {...register("platform", {
                                                    required: uploadedImages.length === 0 ? "Platform is required when no images are uploaded" : false,
                                                })}
                                                className="w-full rounded-lg bg-primary border text-sm p-2 border-slate-700/80 px-4 py-3 text-white outline-none focus:border-blue-500 transition-colors"
                                            />

                                            {errors.platform && (
                                                <p className="text-red-400 mt-1 text-sm">
                                                    {errors.platform.message}
                                                </p>
                                            )}
                                        </div>

                                        {/* Statement */}
                                        <div>
                                            <label className="block text-xl font-semibold text-white mb-2">
                                                Problem Statement {uploadedImages.length === 0 && <span className="text-red-500">*</span>}
                                            </label>

                                            <textarea
                                                rows={10}
                                                placeholder="Enter the complete problem statement..."
                                                {...register("statement", {
                                                    required: uploadedImages.length === 0 ? "Problem statement is required when no images are uploaded" : false,
                                                })}
                                                className="w-full min-h-62.5 text-sm p-2 resize-y rounded-lg bg-primary border border-slate-700/80 px-4 py-3 text-white outline-none focus:border-blue-500 transition-colors"
                                            />

                                            {errors.statement && (
                                                <p className="text-red-400 mt-1 text-sm">
                                                    {errors.statement.message}
                                                </p>
                                            )}
                                        </div>

                                        {/* Constraints */}
                                        <div>
                                            <label className="block text-xl font-semibold text-white mb-2">
                                                Constraints {uploadedImages.length === 0 && <span className="text-red-500">*</span>}
                                            </label>

                                            <textarea
                                                rows={6}
                                                placeholder="Enter constraints..."
                                                {...register("constraints", {
                                                    required: uploadedImages.length === 0 ? "Constraints are required when no images are uploaded" : false,
                                                })}
                                                className="w-full min-h-37.5 text-sm p-2 resize-y rounded-lg bg-primary border border-slate-700/80 px-4 py-3 text-white outline-none focus:border-blue-500 transition-colors"
                                            />

                                            {errors.constraints && (
                                                <p className="text-red-400 mt-1 text-sm">
                                                    {errors.constraints.message}
                                                </p>
                                            )}
                                        </div>

                                        { }
                                        {/* Sample Test Cases */}
                                        <div className="space-y-5">
                                            <div className="flex justify-between items-center">
                                                <h2 className="text-xl font-semibold text-white">
                                                    Sample Test Cases
                                                </h2>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        append({
                                                            input: "",
                                                            output: "",
                                                            explanation: "",
                                                        })
                                                    }
                                                    className="bg-green-600 hover:bg-green-700 cursor-pointer text-white px-4 py-2 rounded-lg transition flex items-center gap-1.5 text-sm font-semibold"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                                                    </svg>
                                                    Add Test Case
                                                </button>
                                            </div>

                                            {fields.map((field, index) => (
                                                <div
                                                    key={field.id}
                                                    className="bg-secondary border border-slate-700 rounded-xl p-6 space-y-5 shadow-inner"
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <h3 className="text-lg font-semibold text-white">
                                                            Test Case {index + 1}
                                                        </h3>

                                                        {fields.length > 1 && (
                                                            <button
                                                                type="button"
                                                                onClick={() => remove(index)}
                                                                className="text-red-400 hover:text-red-500 cursor-pointer text-sm flex items-center gap-1 font-medium transition-colors"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                                Remove
                                                            </button>
                                                        )}
                                                    </div>

                                                    {/* Input */}
                                                    <div>
                                                        <label className="block text-slate-300 mb-2 text-sm font-medium">
                                                            Input
                                                        </label>

                                                        <textarea
                                                            rows={5}
                                                            {...register(
                                                                `sampleTestCases.${index}.input`
                                                            )}
                                                            className="w-full min-h-30 resize-y rounded-lg bg-primary border border-slate-700/80 px-4 py-3 text-white outline-none focus:border-blue-500 transition-colors"
                                                        />
                                                    </div>

                                                    {/* Output */}
                                                    <div>
                                                        <label className="block text-slate-300 mb-2 text-sm font-medium">
                                                            Output
                                                        </label>

                                                        <textarea
                                                            rows={4}
                                                            {...register(
                                                                `sampleTestCases.${index}.output`
                                                            )}
                                                            className="w-full min-h-25 resize-y rounded-lg bg-primary border border-slate-700/80 px-4 py-3 text-white outline-none focus:border-blue-500 transition-colors"
                                                        />
                                                    </div>

                                                    {/* Explanation */}
                                                    <div>
                                                        <label className="block text-slate-300 mb-2 text-sm font-medium">
                                                            Explanation
                                                        </label>

                                                        <textarea
                                                            rows={4}
                                                            {...register(
                                                                `sampleTestCases.${index}.explanation`
                                                            )}
                                                            className="w-full min-h-25 resize-y rounded-lg bg-primary border border-slate-700/80 px-4 py-3 text-white outline-none focus:border-blue-500 transition-colors"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Starter Code */}
                                        <div>
                                            <label className="block text-white mb-2 font-medium">
                                                Starter Code
                                            </label>

                                            <textarea
                                                rows={12}
                                                placeholder="Optional starter code..."
                                                {...register("starterCode")}
                                                className="w-full min-h-75 resize-y rounded-lg bg-primary border border-slate-700/80 px-4 py-3 text-white font-mono outline-none focus:border-blue-500 transition-colors"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Global Form Submission button positioned outside the sections */}
                        <div className="">
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-200 py-4 rounded-lg text-white font-semibold text-lg active:scale-[0.99] cursor-pointer"
                            >
                                Create Problem
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}