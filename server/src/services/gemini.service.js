import { GoogleGenerativeAI } from "@google/generative-ai";
import getProblemMetaDataPrompt from "../prompts/getProblemMetaDataPrompt.js";
import generateWorkspacePrompt from "../prompts/generateWorkspace.prompt.js";
import createProblemPrompt from "../prompts/createProblem.prompt.js";

import dotenv from "dotenv";
dotenv.config();

// const GEMINI_MODEL = "gemini-2.5-flash"
// const GEMINI_MODEL = "gemini-2.5-flash-lite"
// const GEMINI_MODEL = "gemini-1.5-flash";
// const GEMINI_MODEL = "gemini-2.0-flash"; 
const GEMINI_MODEL = "gemini-3.1-flash-lite";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
    model: GEMINI_MODEL
});

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

export async function extractProblemStatement(files) {

    try {

        const imageParts = files.map(file => ({
            inlineData: {
                data: file.buffer.toString("base64"),
                mimeType: file.mimetype
            }
        }));

        const result = await model.generateContent([
            createProblemPrompt,
            ...imageParts
        ]);

        const response = await result.response;

        const statement = response.text().trim();

        if (statement === "-1") {
            throw new Error("INVALID_PROBLEM_IMAGES");
        }

        return refineStatementFormatting(statement)

    } catch (error) {

        if (error.message === "INVALID_PROBLEM_IMAGES") {
            throw error;
        }

        console.error(error);
        throw new Error("Failed to extract problem statement.");
    }
}

function cleanJson(text) {
    return text
        .replace(/^```(?:json)?\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();
}

export async function generateProblemMetadata(statement) {
    try {
        const result = await model.generateContent([
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

export const generateWorkspaceFiles = async ({ statement, language, starterCode }) => {

    try {
        const cleanedStatement = cleanStatementForModel(statement)
        
        const input = {
            cleanedStatement,
            language,
            starterCode,
        };

        const prompt = `${JSON.stringify(input, null, 2)}\n${generateWorkspacePrompt}`;

        const result = await model.generateContent(prompt);

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