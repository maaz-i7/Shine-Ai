import useTestCasesStore from "@/stores/testcases.store";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const STATUS = {
    NOT_TESTED: "not_tested",
    RIGHT: "right",
    WRONG: "wrong",
    TLE: "tle",
    RUNTIME_ERROR: "runtime_error",
};

const runCode = async (compiler, code, input) => {

    try {
        const backendUrl = `${API_URL}/api/online-compiler/execute-code`;
        const res = await fetch(backendUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                compiler,
                code,
                input,
            }),
        });

        const data = await res.json();
        return data
    }
    catch (error) {
        console.log("Failed to run code: ", error.message)
    }
}

export const checkCode = async (idealCompiler, idealCode, compiler, code) => {

    const { testCases, updateTestCase, setRunning, setVerdict } = useTestCasesStore.getState()
    setRunning(true)
    setVerdict("Judging")
    let accepted = true
    let errorCode = false

    try {
        for (let i = 0; i < testCases.length; i++) {
            updateTestCase(i, {
                status: STATUS.NOT_TESTED
            })
        }

        for (let i = 0; i < testCases.length; i++) {
            const testCase = useTestCasesStore.getState().testCases[i];
            let expectedOutput = testCase.expected;

            if (expectedOutput === null) {
                const idealRes = await runCode(
                    idealCompiler,
                    idealCode,
                    testCase.input
                );

                expectedOutput = idealRes.output;

                updateTestCase(i, {
                    expected: expectedOutput,
                });
            }

            const res = await runCode(
                compiler,
                code,
                testCase.input
            );

            updateTestCase(i, {
                output: res.output,
                execution: {
                    message: res.message,
                    error: res.error,
                },
            });

            if (res.success) {

                const actual = res.output?.trim() ?? "";
                const expected = expectedOutput?.trim() ?? "";

                if (actual !== expected)
                    accepted = false

                updateTestCase(i, {
                    status: actual === expected
                        ? STATUS.RIGHT
                        : STATUS.WRONG
                });
            } else {
                errorCode = true
                updateTestCase(i, {
                    status: STATUS.RUNTIME_ERROR,
                });
            }
        }
    }

    finally {
        setRunning(false)
        if (errorCode)
            setVerdict("Error")
        else {
            if (accepted)
                setVerdict("Accepted")
            else
                setVerdict("Wrong Answer")
        }
    }
}

export const saveWorkspace = async (workspaceId, userCode, testCases, session) => {

    const res = await fetch(
        `${API_URL}/api/workspace/${workspaceId}`,
        {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${session?.accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userCode,
                testCases,
            }),
        }
    );

    if (!res.ok)
        throw new Error("Failed to save workspace.");

    return res.json();
}

export async function getNewLanguageRunnerCode({workspaceId, language, accessToken}) {
    const response = await fetch(
        `${API_URL}/api/workspace/${workspaceId}/new-language-runner-code`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                language,
            }),
        }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
        throw new Error("Failed to fetch new language runner code.");
    }
    return result.runnerCode;
}