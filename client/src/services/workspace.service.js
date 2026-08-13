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
}

export async function getWorkspaceForProblem(problemId, accessToken) {
    const response = await fetch(`${API_URL}/api/workspace/${problemId}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
        throw new Error("Failed to fetch workspace.");
    }

    return result.workspace;
}

export async function getUserWorkspaces(accessToken) {

    const response = await fetch(
        `${API_URL}/api/workspace/all`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data.workspaces;
}

export const getAiCodeForWorkspace = async ({ accessToken, problemId, summarizedStatement, runnerCode, language }) => {
    const response = await fetch(
        `${API_URL}/api/workspace/ai-code/${problemId}`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
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
}

export async function deleteWorkspace({workspaceId, accessToken}) {
    const response = await fetch(
        `${API_URL}/api/workspace/${workspaceId}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to delete workspace");
    }

    return data;
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