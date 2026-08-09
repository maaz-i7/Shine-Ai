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

            let testCase = String(data.response).trim();

            // Remove existing Markdown fences if AI already added them
            testCase = testCase.replace(/^```(?:\w+)?\s*\n?/, "").replace(/\n?```\s*$/, "").trim();

            // Add only the raw test case to the store
            addTestCase(testCase);

            // Create display version with Markdown code fences
            const displayTestCase = `\`\`\`\n${testCase}\n\`\`\``;

            const message = `${displayTestCase}\n\nI have added the above test case`;

            setQuickHelp(message);

            return message;
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