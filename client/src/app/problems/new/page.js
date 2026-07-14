"use client";

import { useForm, useFieldArray } from "react-hook-form";

export default function Page() {
    const {
        register,
        control,
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

    const { fields, append, remove } = useFieldArray({
        control,
        name: "sampleTestCases",
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className="min-h-screen bg-primary flex justify-center py-10 px-4">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-5xl bg-secondary rounded-xl p-8 space-y-8 shadow-lg"
            >
                <h1 className="text-3xl font-bold text-white">
                    Create New Problem
                </h1>

                {/* Title */}
                <div>
                    <label className="block text-white mb-2 font-medium">
                        Title <span className="text-red-500">*</span>
                    </label>

                    <input
                        type="text"
                        placeholder="Enter problem title"
                        {...register("title", {
                            required: "Title is required",
                        })}
                        className="w-full rounded-lg bg-primary border border-gray-700 px-4 py-3 text-white outline-none focus:border-blue-500"
                    />

                    {errors.title && (
                        <p className="text-red-400 mt-1 text-sm">
                            {errors.title.message}
                        </p>
                    )}
                </div>

                {/* URL */}
                <div>
                    <label className="block text-white mb-2 font-medium">
                        Problem URL
                    </label>

                    <input
                        type="url"
                        placeholder="https://..."
                        {...register("url")}
                        className="w-full rounded-lg bg-primary border border-gray-700 px-4 py-3 text-white outline-none focus:border-blue-500"
                    />
                </div>

                {/* Platform */}
                <div>
                    <label className="block text-white mb-2 font-medium">
                        Platform <span className="text-red-500">*</span>
                    </label>

                    <input
                        type="text"
                        placeholder="LeetCode / Codeforces / CodeChef..."
                        {...register("platform", {
                            required: "Platform is required",
                        })}
                        className="w-full rounded-lg bg-primary border border-gray-700 px-4 py-3 text-white outline-none focus:border-blue-500"
                    />

                    {errors.platform && (
                        <p className="text-red-400 mt-1 text-sm">
                            {errors.platform.message}
                        </p>
                    )}
                </div>

                {/* Statement */}
                <div>
                    <label className="block text-white mb-2 font-medium">
                        Problem Statement <span className="text-red-500">*</span>
                    </label>

                    <textarea
                        rows={10}
                        placeholder="Enter the complete problem statement..."
                        {...register("statement", {
                            required: "Problem statement is required",
                        })}
                        className="w-full min-h-[250px] resize-y rounded-lg bg-primary border border-gray-700 px-4 py-3 text-white outline-none focus:border-blue-500"
                    />

                    {errors.statement && (
                        <p className="text-red-400 mt-1 text-sm">
                            {errors.statement.message}
                        </p>
                    )}
                </div>

                {/* Constraints */}
                <div>
                    <label className="block text-white mb-2 font-medium">
                        Constraints <span className="text-red-500">*</span>
                    </label>

                    <textarea
                        rows={6}
                        placeholder="Enter constraints..."
                        {...register("constraints", {
                            required: "Constraints are required",
                        })}
                        className="w-full min-h-[150px] resize-y rounded-lg bg-primary border border-gray-700 px-4 py-3 text-white outline-none focus:border-blue-500"
                    />

                    {errors.constraints && (
                        <p className="text-red-400 mt-1 text-sm">
                            {errors.constraints.message}
                        </p>
                    )}
                </div>

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
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                        >
                            + Add Test Case
                        </button>
                    </div>

                    {fields.map((field, index) => (
                        <div
                            key={field.id}
                            className="bg-primary border border-gray-700 rounded-xl p-6 space-y-5"
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-white">
                                    Test Case {index + 1}
                                </h3>

                                {fields.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="text-red-400 hover:text-red-500"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>

                            {/* Input */}
                            <div>
                                <label className="block text-white mb-2">
                                    Input
                                </label>

                                <textarea
                                    rows={5}
                                    {...register(
                                        `sampleTestCases.${index}.input`
                                    )}
                                    className="w-full min-h-[120px] resize-y rounded-lg bg-secondary border border-gray-700 px-4 py-3 text-white outline-none focus:border-blue-500"
                                />
                            </div>

                            {/* Output */}
                            <div>
                                <label className="block text-white mb-2">
                                    Output
                                </label>

                                <textarea
                                    rows={4}
                                    {...register(
                                        `sampleTestCases.${index}.output`
                                    )}
                                    className="w-full min-h-[100px] resize-y rounded-lg bg-secondary border border-gray-700 px-4 py-3 text-white outline-none focus:border-blue-500"
                                />
                            </div>

                            {/* Explanation */}
                            <div>
                                <label className="block text-white mb-2">
                                    Explanation
                                </label>

                                <textarea
                                    rows={4}
                                    {...register(
                                        `sampleTestCases.${index}.explanation`
                                    )}
                                    className="w-full min-h-[100px] resize-y rounded-lg bg-secondary border border-gray-700 px-4 py-3 text-white outline-none focus:border-blue-500"
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
                        className="w-full min-h-[300px] resize-y rounded-lg bg-primary border border-gray-700 px-4 py-3 text-white font-mono outline-none focus:border-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-lg text-white font-semibold text-lg"
                >
                    Create Problem
                </button>
            </form>
        </div>
    );
}