import { extractProblemStatement, generateProblemMetadata } from "./gemini.service.js";

export const extractProblemFromImages = async (files) => {
    if (!files || files.length === 0) {
        throw new Error("No image files provided.");
    }

    const statement = await extractProblemStatement(files);

    if (!statement?.trim()) {
        throw new Error("Failed to extract problem statement.");
    }

    return {
        statement: statement.trim()
    };
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