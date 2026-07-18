const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const ensureWorkspace = async (data) => {
    const response = await fetch(`${API_URL}/api/workspace/ensure`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to create workspace.");
    }

    return result.workspace;
};

export async function getWorkspaceByProblem(problemId, userId) {

    const response = await fetch(`${API_URL}/api/workspace/problem/${problemId}?userId=${userId}`);

    const result = await response.json();

    if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to fetch workspace.");
    }

    return result.workspace;
}

export async function getUserWorkspaces(userId) {

    if (!userId)
        return []

    const response = await fetch(
        `${API_URL}/api/workspace/user/${userId}`
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data.workspaces;
}

// workspace.service.js
export const getAiCodeForWorkspace = async ({ userId, problemId, summarizedStatement, runnerCode, language }) => {
    const response = await fetch(
        `${API_URL}/api/workspace/problem/ai-code/${problemId}?user=${userId}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                summarizedStatement,
                runnerCode,
                language,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to generate AI code.");
    }

    return data.generatedCode;
};