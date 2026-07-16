import { create } from "zustand";

export const useProblemStore = create((set) => ({
    generatedProblem: null,

    setGeneratedProblem: (problem) =>
        set({ generatedProblem: problem }),

    clearGeneratedProblem: () =>
        set({ generatedProblem: null }),
}));