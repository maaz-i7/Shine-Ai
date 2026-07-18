import { extractProblemStatement, generateProblemMetadata, generateWorkspaceFiles, generateCodeForProblem } from "./gemini.service.js";

export const extractProblemFromImages = async (files) => {
    if (!files || files.length === 0) {
        throw new Error("No image files provided.");
    }

    const statement = await extractProblemStatement(files);

    if (!statement?.trim()) {
        throw new Error("Failed to extract problem statement.");
    }

    return statement.trim()
};

export const generateMetadata = async (statement) => {
    if (!statement?.trim()) {
        throw new Error("Problem statement is required.");
    }

    const metadata = await generateProblemMetadata(statement);

    if (!metadata) {
        throw new Error("Failed to generate metadata.");
    }

    return {
        difficulty: metadata.difficulty,
        tags: metadata.tags ?? []
    };
};

export const generateWorkspace = async ({ statement, language, starterCode }) => {
    if (!statement?.trim()) {
        throw new Error("Problem statement is required.");
    }
    if (!statement?.trim()) {
        throw new Error("Code language is required.");
    }

    const workspace = await generateWorkspaceFiles({ statement, language, starterCode });

    if (!workspace) {
        throw new Error("Failed to generate workspace files.");
    }

    return workspace
};

export const generateCode = async ({ summarizedStatement, runnerCode, language }) => {
    try {
        return await generateCodeForProblem({ summarizedStatement, runnerCode, language });
    } catch (error) {
        console.error("Error in AI service:", error);
        throw new Error(
            error?.message || "Failed to generate code."
        );
    }
};