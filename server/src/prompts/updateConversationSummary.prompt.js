export default function updateConversationSummaryPrompt({ summary, userMessage, assistantReply }) {
    return `
You are maintaining the long-term memory of Shine AI.

This memory is shown in every future conversation.

Existing Summary:
${summary || "None"}

Latest User Message:
${userMessage}

Latest Assistant Reply:
${assistantReply}

Your task:
Append ONLY new information from the latest conversation.

Rules:
- DO NOT rewrite the existing summary.
- DO NOT repeat existing information.
- DO NOT include in summary problem name, problem title and user code.
- Ignore greetings, thanks, jokes and casual chat.
- Keep each point short and precise in one line.
- Record only information useful for future conversations.
- Preserve all important keywords exactly as written (names, variables, functions, classes, files, APIs, libraries, frameworks, technologies, problem titles, IDs...
- Never paraphrase or replace important keywords; copy them verbatim.
- Summarize both the user question and the assistant response

Include things like:
- algorithms discussed
- hints given
- debugging discoveries
- implementation decisions
- user preferences
- unresolved questions
- important conclusions

If nothing should be added, output exactly:

NO_UPDATE

Otherwise output ONLY the new bullet points using '-'

Example:

- User requested hint only.
- Suggested BFS.
- BFS caused TLE.
- Recommended 0-1 BFS.    
`;
}