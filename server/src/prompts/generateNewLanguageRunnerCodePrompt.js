export default function generateNewLanguageRunnerCodePrompt({
    currentRunnerCode,
    language,
}) {
    return `
You are a code translation engine.

Translate the given code to ${language}.

Code:
${currentRunnerCode}

STRICT RULES:
0. If the new language is Java, do not create any new class, just write a main function within one single class
1. Preserve the EXACT logic and behavior of the original code.
2. Do NOT modify, optimize, refactor, simplify, or improve the code.
3. Do NOT add any new functionality.
4. Do NOT remove any functionality.
5. Preserve the same input/output behavior.
6. Preserve the same variable names whenever they are valid in ${language}.
7. Preserve the same control flow, conditions, loops, function structure, and algorithm.
8. Only make changes that are strictly necessary for valid syntax and equivalent functionality in ${language}.
9. Do NOT add comments or explanations.
10. Do NOT add Markdown code fences such as \`\`\`.
11. Do NOT include any text before or after the translated code.
12. Your entire response must contain ONLY the translated source code.

Return ONLY the translated code.
`;
}