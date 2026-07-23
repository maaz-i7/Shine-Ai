import Assistant from "../models/assistant.model.js";
import Workspace from "../models/workspace.model.js";
import getAiReplyPrompt from "../prompts/getAiReply.prompt.js";
import { generateAiReply } from "./gemini.service.js";

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
        messages: [],
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

export async function addUserMessage(workspaceId, content) {

    const assistant = await getOrCreateAssistant(workspaceId);

    assistant.messages.push({
        role: "user",
        content
    });

    await assistant.save();

    return assistant;
}

export async function addAssistantMessage(workspaceId, content) {

    const assistant = await getOrCreateAssistant(workspaceId);

    assistant.messages.push({
        role: "assistant",
        content
    });

    await assistant.save();

    return assistant;
}

export async function generateAssistantResponse({ workspace, message }) {

    const prompt = getAiReplyPrompt({
        workspace,
        message,
    });

    const aiReply = await generateAiReply(prompt);
    return aiReply;
}