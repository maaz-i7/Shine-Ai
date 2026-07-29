import Assistant from "../models/assistant.model.js";
import Workspace from "../models/workspace.model.js";
import getAiReplyPrompt from "../prompts/getAiReply.prompt.js";
import { generateAiReply, updateConversationSummary, generateQuickHelpResponse } from "./gemini.service.js";

import { getHintPrompt, getDebugPrompt, getSummarizePrompt, getTestCasesPrompt, getEdgeCasesPrompt, getTimeComplexityPrompt, getSpaceComplexityPrompt, getDirectionPrompt, getExplainInputPrompt, getDryRunPrompt } from "../prompts/quickHelps.prompts.js";

export async function getAssistant(workspaceId) {
    return await Assistant.findOne({ workspace: workspaceId });
}

export async function createAssistant(workspaceId) {

    let assistant = await Assistant.findOne({
        workspace: workspaceId,
    });

    if (assistant) return assistant;

    assistant = await Assistant.create({
        workspace: workspaceId,
        messages: [{
            role: 'assistant',
            content: `Hello! I am Shine Ai, your programming assistant created by **Maaz**. How can I help you today?`,
        },],
    });

    return assistant;
}

export async function getOrCreateAssistant(workspaceId) {

    let assistant = await getAssistant(workspaceId);

    if (!assistant) {
        assistant = await createAssistant(workspaceId);
    }

    return assistant;
}

export async function generateAssistantResponse({ workspace, message }) {
    const assistant = await getOrCreateAssistant(workspace._id)
    const summary = assistant.pastConversationSummary
    const aiReply = await generateAiReply({ workspace, message, summary });
    return aiReply;
}

export async function updateAssistantConversationSummary({ summary, userMessage, assistantReply }) {

    const summaryUpdate = await updateConversationSummary({
        summary,
        userMessage,
        assistantReply,
    });

    return summaryUpdate;
}

export async function updateAssistant({ workspaceId, userMessage, assistantReply }) {

    const assistant = await getOrCreateAssistant(workspaceId);

    assistant.messages.push(
        {
            role: "user",
            content: userMessage,
        },
        {
            role: "assistant",
            content: assistantReply,
        }
    );

    const pastConversationSummary = assistant.pastConversationSummary
    const summaryUpdate = await updateAssistantConversationSummary({ pastConversationSummary, userMessage, assistantReply })

    if (summaryUpdate !== "NO_UPDATE") {
        assistant.pastConversationSummary +=
            (assistant.pastConversationSummary ? "\n" : "") +
            summaryUpdate;
    }

    await assistant.save();

    return assistant;
}

const QUICK_HELP_PROMPTS = {
    hint: getHintPrompt,
    debug: getDebugPrompt,
    summarize: getSummarizePrompt,
    test_case: getTestCasesPrompt,
    edge_case: getEdgeCasesPrompt,
    time_complexity: getTimeComplexityPrompt,
    space_complexity: getSpaceComplexityPrompt,
    direction: getDirectionPrompt,
    explain_input: getExplainInputPrompt,
    dry_run: getDryRunPrompt,
};

export async function generateQuickHelp({ workspace, workspaceId, type, userMessage, selectedTestCase }) {

    const assistant = await getOrCreateAssistant(workspaceId);

    if (!assistant)
        throw new Error("Assistant not found.");

    const promptBuilder = QUICK_HELP_PROMPTS[type];

    if (!promptBuilder)
        throw new Error("Invalid quick help type.");

    const prompt = promptBuilder({
        workspace,
        selectedTestCase,
        summary: assistant.pastConversationSummary,
    });

    const aiReply = await generateQuickHelpResponse(prompt);

    await updateAssistant({
        workspaceId,
        userMessage,
        assistantReply: aiReply,
    });

    return aiReply;
}