const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const ensureProblem = async (formData) => {
    const response = await fetch(`${API_URL}/api/problem/ensure`, {
        method: "POST",
        body: formData,
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to create problem.");
    }

    return result.problem;
};