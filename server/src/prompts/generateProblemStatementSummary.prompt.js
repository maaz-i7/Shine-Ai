const generateProblemStatementSummaryPrompt = 
`
You are summarizing a competitive programming problem for another AI model.

Produce a concise summary that preserves all information needed to solve the problem.

Include:
1. The core objective of the problem.
2. The important constraints.
3. The input and expected output.
4. A brief summary of one representative example (do not copy it verbatim).
5. Any important observations, edge cases, or clarifications that could affect the solution.

Rules:
- Do NOT explain or suggest any algorithm.
- Do NOT provide hints or the solution.
- Do NOT omit important constraints or assumptions.
- Keep the summary precise and concise.
- Write in clear, plain English.
- Return only the summary text.
`

export default generateProblemStatementSummaryPrompt