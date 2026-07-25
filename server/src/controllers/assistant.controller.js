import Workspace from "../models/workspace.model.js";
import { getOrCreateAssistant, generateAssistantResponse, updateAssistant } from "../services/assistant.service.js";

export async function getAssistant(req, res) {

    try {
        const { workspaceId } = req.params;
        const workspace = await Workspace.findById(workspaceId);

        if (!workspace)
            return res.status(404).json({
                success: false,
                error: "Workspace not found"
            });

        if (workspace.user.toString() !== req.user.id)
            return res.status(403).json({
                success: false,
                error: "Unauthorized"
            });

        const assistant = await getOrCreateAssistant(workspaceId);

        return res.json({
            success: true,
            assistant
        });

    } catch (err) {
        console.log("Failed to get assistant: ", err.message)
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
}

export async function sendMessage(req, res) {

    try {
        const { workspaceId } = req.params;
        const { message } = req.body;
        const workspace = await Workspace.findById(workspaceId).populate("problem");

        if (!workspace)
            return res.status(404).json({
                success: false,
                error: "Workspace not found"
            });

        if (workspace.user.toString() !== req.user.id)
            return res.status(403).json({
                success: false,
                error: "Unauthorized"
            });

        const aiResponse = await generateAssistantResponse({
            workspace,
            message,
        });

        await updateAssistant({
            workspaceId,
            userMessage: message, 
            assistantReply: aiResponse,
        });

        return res.json({
            success: true,
            response: aiResponse,
        });

    } catch (err) {
        console.log("Failed to get message from assistant: ", err.message)
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
}