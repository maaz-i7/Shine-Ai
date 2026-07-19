import { create } from "zustand";

const useTestCasesStore = create((set) => ({
    testCases: [],
    selectedTestCase: 0,

    setTestCases: (testCases) => set({ testCases }),

    setSelectedTestCase: (index) =>
        set({ selectedTestCase: index }),

    addTestCase: () =>
        set((state) => ({
            testCases: [
                ...state.testCases,
                {
                    input: "",
                    output: "",
                    expected: "",
                },
            ],
        })),

    addTestCase: (input) =>
        set((state) => ({
            testCases: [
                ...state.testCases,
                {
                    input,
                    output: "",
                    expected: "",
                },
            ],
        })),

    updateTestCase: (index, field, value) =>
        set((state) => ({
            testCases: state.testCases.map((testCase, i) =>
                i === index
                    ? { ...testCase, [field]: value }
                    : testCase
            ),
        })),

    removeTestCase: (index) =>
        set((state) => ({
            testCases: state.testCases.filter((_, i) => i !== index),
        })),

    clearTestCases: () =>
        set({
            testCases: [
                {
                    input: "",
                    output: "",
                    expected: "",
                },
            ],
        }),
}));

export default useTestCasesStore;