import { geminiModel } from "./ai.gemini.js";
import createProblemPrompt from "../prompts/createProblem.prompt.js";

function prepareStatement(statement) {
    statement = statement.replace(/`([^`\n]+)`/g, (_, code) => {

        // Escape HTML first
        code = code
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

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

    // // Convert inline LaTeX: $x^2$, $10^9 + 7$
    // statement = statement.replace(/\$([^$\n]+)\$/g, (_, math) => {

    //     math = math
    //         .replace(/\^\{([^{}]+)\}/g, "<sup>$1</sup>")
    //         .replace(/\^([A-Za-z0-9]+)/g, "<sup>$1</sup>")
    //         .replace(/_([A-Za-z0-9]+)/g, "<sub>$1</sub>");

    //     return math;
    // });

    // Escape for JavaScript template literals
    // return statement
    //     .replace(/\\/g, "\\\\")
    //     .replace(/`/g, "\\`");
    return statement;
}

export const generateCodeFromImages = async (files) => {
    try {

        const imageParts = files.map(file => ({
            inlineData: {
                data: file.buffer.toString("base64"),
                mimeType: file.mimetype
            }
        }));

        const result = await geminiModel.generateContent([
            createProblemPrompt,
            ...imageParts
        ]);

        const response = await result.response;

        const statement = response.text();
        return prepareStatement(statement)

    } catch (error) {
        console.error(error);
        throw new Error("Failed to generate code from images.");
    }
};