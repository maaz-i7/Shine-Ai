import useTestCasesStore from "@/stores/testcases.store";

export async function handleQuickHelp({ accessToken, workspaceId, type, userMessage, setQuickHelp, setQuickHelpLoading, setMessages, messages }) {

    // Show the user's quick help request immediately
    setMessages((prev) => [
        ...prev,
        {
            role: "user",
            content: userMessage,
        },
    ]);

    setQuickHelp(null);
    setQuickHelpLoading(true);

    try {

        const { testCases, selectedTestCase } = useTestCasesStore.getState();

        if (type === "dry_run" && testCases.length === 0) {
            const message =
                "There are no test cases added. Please add at least one test case.";

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: message,
                },
            ]);

            setQuickHelp(message);
            return message;
        }

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/assistant/workspace/${workspaceId}/quick-help`,
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    type,
                    userMessage,
                    selectedTestCase,
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to generate quick help.");
        }

        setMessages((prev) => [
            ...prev,
            {
                role: "assistant",
                content: data.response,
            },
        ]);

        if (type === "test_case" || type === "edge_case") {
            const { addTestCase } = useTestCasesStore.getState();
            let testCase = String(data.response);
            testCase = testCase.trim()
            addTestCase(testCase)
            testCase += "\n\nI have added the above test case"
            setQuickHelp(testCase);
            return testCase
        }

        setQuickHelp(data.response);
        return data.response;

    } catch (error) {
        console.error("Quick Help Error:", error);
        throw error;

    } finally {
        setQuickHelpLoading(false);
    }
}