export default function classifyQuestionPrompt(message) {
    return `
You are a classifier for a coding assistant.

User message:
${message}

Determine whether answering the above user's message requires access to the current coding workspace.

The workspace contains:
- Problem Title
- Problem statement
- Programming language
- User's code
- AI reference solution
- Test cases

Return ONLY one of these two words:
- workspace
- general

Return "workspace" if the user is asking about:
- their code
- the current problem
- debugging
- hints
- optimization
- time or space complexity of their solution
- test cases
- expected output
- correctness
- algorithms used in the current problem
- anything referring to "this", "my solution", "my code", "this problem", etc.

Return "general" if the question can be answered without the workspace, such as:
- programming concepts
- DSA theory
- language syntax
- history
- mathematics
- interview advice
- career guidance
- or any unrelated topic.
`;
}