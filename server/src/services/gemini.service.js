import { GoogleGenerativeAI } from "@google/generative-ai";
import getProblemMetaDataPrompt from "../prompts/getProblemMetaData.prompt.js";
import generateWorkspacePrompt from "../prompts/generateWorkspace.prompt.js";
import createProblemPrompt from "../prompts/createProblem.prompt.js";
import generateProblemStatementSummaryPrompt from "../prompts/generateProblemStatementSummary.prompt.js"
import generateCodeForProblemPrompt from "../prompts/generateCodeForProblem.prompt.js"

import dotenv from "dotenv";
dotenv.config();

const PRO_MODEL = "gemini-3.5-flash"
const BASE_MODEL = "gemini-3.1-flash-lite";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const codeModel = genAI.getGenerativeModel({
    model: BASE_MODEL,
    generationConfig: {
        // thinkingConfig: {
        //     thinkingLevel: "medium",
        // },
        temperature: 0,
    },
});

const utilityModel = genAI.getGenerativeModel({
    model: BASE_MODEL,
    generationConfig: {
        temperature: 0,
    },
});


// utility function to make sure ONLY json is returned after gemini response
function cleanJson(text) {
    return text
        .replace(/^```(?:json)?\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();
}

// utility function to fix mathemtical symbols and equations, symbols etc.
function refineStatementFormatting(statement) {
    statement = statement.replace(/`([^`\n]+)`/g, (_, code) => {

        // Escape HTML first
        code = code
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

        // Subscripts with braces: t_{i+1}, dp_{k-1}
        code = code.replace(
            /\b([A-Za-z][A-Za-z0-9\[\]]*)_\{([^{}]+)\}/g,
            "$1<sub>$2</sub>"
        );

        // Subscripts: u_i, dp_i, max_12
        code = code.replace(
            /\b([A-Za-z][A-Za-z0-9\[\]]*)_([A-Za-z0-9]+)\b/g,
            "$1<sub>$2</sub>"
        );

        // Superscripts with braces: i^{th}, n^{2}
        code = code.replace(
            /\b([A-Za-z][A-Za-z0-9\[\]]*)\^\{([^{}]+)\}/g,
            "$1<sup>$2</sup>"
        );

        // Superscripts without braces: x^2, 10^5, A[i]^3
        code = code.replace(
            /([A-Za-z0-9\]\)])\^([A-Za-z0-9]+)/g,
            "$1<sup>$2</sup>"
        );

        return `<code>${code}</code>`;
    });

    return statement;
}

function cleanStatementForModel(statement) {
    return statement
        // Remove HTML tags (mainly <code>, <b>, etc.)
        .replace(/<\/?[^>]+>/gi, "")

        // Decode common HTML entities
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&nbsp;/g, " ")

        // Convert common LaTeX operators
        .replace(/\\leq?/g, "<=")
        .replace(/\\geq?/g, ">=")
        .replace(/\\neq/g, "!=")
        .replace(/\\times/g, "*")
        .replace(/\\cdot/g, "*")
        .replace(/\\div/g, "/")
        .replace(/\\rightarrow/g, "->")
        .replace(/\\to/g, "->")

        // Remove escaping before punctuation
        .replace(/\\([()[\]{}])/g, "$1")

        // Normalize whitespace
        .replace(/\r/g, "")
        .replace(/[ \t]+/g, " ")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
}

// does OCR on images to extract problem in Markup and LaTex format
export async function extractProblemStatement(files) {

    try {

        const imageParts = files.map(file => ({
            inlineData: {
                data: file.buffer.toString("base64"),
                mimeType: file.mimetype
            }
        }));

        const result = await utilityModel.generateContent([
            createProblemPrompt,
            ...imageParts
        ]);

        const response = await result.response;

        const statement = response.text().trim();

        if (statement === "-1") {
            throw new Error("INVALID_PROBLEM_IMAGES");
        }

        const refinedStatement = refineStatementFormatting(statement)
        return refinedStatement

    } catch (error) {

        if (error.message === "INVALID_PROBLEM_IMAGES") {
            throw error;
        }

        console.error(error);
        throw new Error("Failed to extract problem statement.");
    }
}

// generates problem tags and rates problem difficulty
export async function generateProblemMetadata(statement) {
    try {
        const result = await utilityModel.generateContent([
            getProblemMetaDataPrompt,
            statement
        ]);

        const response = await result.response;
        return JSON.parse(cleanJson(response.text()));

    } catch (error) {
        console.error(error);
        throw new Error("Failed to generate problem metadata.");
    }
}

// creates runner code template
export const generateWorkspaceFiles = async ({ statement, language, starterCode }) => {

    try {
        const cleanedStatement = cleanStatementForModel(statement)

        const input = {
            cleanedStatement,
            language,
            starterCode,
        };

        const prompt = `${JSON.stringify(input, null, 2)}\n${generateWorkspacePrompt}`;

        const result = await utilityModel.generateContent(prompt);

        const response = result.response.text();

        if (!response) {
            throw new Error("Gemini returned an empty response.");
        }

        const workspace = JSON.parse(cleanJson(response));

        if (typeof workspace.runnerCode !== "string") {
            throw new Error("Invalid Gemini response.");
        }

        return workspace;

    } catch (error) {
        console.error(error);
        throw new Error(
            error.message || "Failed to generate workspace."
        );
    }
};

// generates a concise summary of the problem statement for future LLM interactions.
export const generateProblemStatementSummary = async (statement) => {
    try {
        if (!statement || typeof statement !== "string") {
            throw new Error("A valid problem statement is required.");
        }

        const cleanedStatement = cleanStatementForModel(statement);

        const prompt = `${JSON.stringify(
            { statement: cleanedStatement },
            null,
            2
        )}\n${generateProblemStatementSummaryPrompt}`;

        const result = await utilityModel.generateContent(prompt);

        const problemSummary = result.response.text()?.trim();

        if (!problemSummary) {
            throw new Error("Gemini returned an empty summary.");
        }

        return problemSummary;
    } catch (error) {
        console.error("Error generating problem summary:", error);

        throw new Error(
            error?.message || "Failed to generate problem summary."
        );
    }
};

// Generates AI solution code for a problem.
export const generateCodeForProblem = async ({ summarizedStatement, runnerCode, language }) => {
    try {
        if (!summarizedStatement || !runnerCode || !language) {
            throw new Error("Missing required fields.");
        }

        const input = {
            problem: summarizedStatement,
            runnerCode,
            language,
        };

        const prompt = `${JSON.stringify(input, null, 2)}\n${generateCodeForProblemPrompt}`;

        const result = await codeModel.generateContent(prompt);

        const generatedCode = result.response.text()?.trim();

        if (!generatedCode) {
            throw new Error("Gemini returned an empty response.");
        }

        return generatedCode;
    } catch (error) {
        console.error("Error generating AI code:", error);
        throw new Error(
            error?.message || "Failed to generate AI code."
        );
    }
};