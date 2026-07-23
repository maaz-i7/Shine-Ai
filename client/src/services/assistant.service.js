const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getAssistant(workspaceId, accessToken) {

    const response = await fetch(
        `${API_URL}/api/assistant/workspace/${workspaceId}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
        throw new Error(result.error);
    }

    return result.assistant;
}

export async function sendMessage(workspaceId, accessToken, message) {

    const response = await fetch(
        `${API_URL}/api/assistant/workspace/${workspaceId}/chat`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },

            body: JSON.stringify({
                message,
            }),
        }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
        throw new Error(result.error);
    }

    return result.response;
}