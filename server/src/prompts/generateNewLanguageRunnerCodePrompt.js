export default function generateNewLanguageRunnerCodePrompt({
    currentUserCode,
    language,
}) {
    return `
You are an expert code translation engine.

Translate the given source code from its current programming language to ${language}.

Code:
${currentUserCode}

STRICT RULES:
1. Output ONLY the translated code. No explanations, comments about the translation, Markdown, code fences, or extra text.
2. Preserve the EXACT behavior and logic of the original code.
3. Do NOT optimize, simplify, refactor, or change the algorithm.
4. Preserve the same input format, output format, edge-case handling, and expected results.
5. Translate all language-specific syntax, standard library functions, data structures, and APIs correctly for ${language}.
6. Use idiomatic and compilable ${language} syntax, but do not change the underlying logic.
7. Preserve the original variable names, function names, class names, and overall structure whenever possible.
8. Replace language-specific constructs only when necessary to make the code valid in ${language}.
9. Do NOT add a main function, imports, libraries, helper functions, or boilerplate unless required for the translated code to compile/run.
10. Do NOT remove any existing functionality.
11. Ensure the final code is syntactically valid and compilable in ${language}.
12. If the source contains comments, preserve their meaning and translate them when necessary.
13. The output must contain ONLY the final translated source code.

Return ONLY the translated code.
`;
}