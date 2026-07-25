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

        setQuickHelp(data.response);
        return data.response;

    } catch (error) {
        console.error("Quick Help Error:", error);

        throw error;
    } finally {
        setQuickHelpLoading(false);
    }
}