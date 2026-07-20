import { create } from "zustand";

const STATUS = {
    NOT_TESTED: "not_tested",
    RIGHT: "right",
    WRONG: "wrong",
    TLE: "tle",
    RUNTIME_ERROR: "runtime_error",
};

const useTestCasesStore = create((set) => ({
    testCases: [],
    selectedTestCase: 0,

    setTestCases: (testCases) => set({ testCases }),

    setSelectedTestCase: (index) =>
        set({ selectedTestCase: index }),

    // addTestCase: () =>
    //     set((state) => ({
    //         testCases: [
    //             ...state.testCases,
    //             {
    //                 input: "",
    //                 output: "",
    //                 expected: "",
    //             },
    //         ],
    //     })),

    addTestCase: (input) =>
        set((state) => ({
            testCases: [
                ...state.testCases,
                {
                    input,
                    output: null,
                    expected: null,
                    status: STATUS.NOT_TESTED,
                    execution: {
                        message: "",
                        error: ""
                    }
                },
            ],
        })),

    // updateTestCase: (index, field, value) =>
    //     set((state) => ({
    //         testCases: state.testCases.map((testCase, i) =>
    //             i === index
    //                 ? { ...testCase, [field]: value }
    //                 : testCase
    //         ),
    //     })),

    removeTestCase: (index) =>
        set((state) => {
            const newTestCases = state.testCases.filter((_, i) => i !== index);

            let newSelected = state.selectedTestCase;

            if (newTestCases.length === 0) {
                newSelected = 0;
            } else if (state.selectedTestCase === index) {
                // If the selected test case was deleted
                newSelected = Math.max(0, index - 1);
            } else if (state.selectedTestCase > index) {
                // Shift selection left
                newSelected = state.selectedTestCase - 1;
            }

            return {
                testCases: newTestCases,
                selectedTestCase: newSelected,
            };
        }),

    // clearTestCases: () =>
    //     set({
    //         testCases: [
    //             {
    //                 input: "",
    //                 output: "",
    //                 expected: "",
    //             },
    //         ],
    //     }),
}));

export default useTestCasesStore;