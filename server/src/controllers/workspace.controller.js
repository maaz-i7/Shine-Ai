import Workspace from "../models/workspace.model.js";
import { ensureWorkspace, getWorkspaceByProblem, getAiCodeForWorkspace } from "../services/workspace.service.js";

export const ensureWorkspaceController = async (req, res) => {

    try {
        const { userId, problemId, language, starterCode = "" } = req.body;

        if (!problemId || !language) {
            return res.status(400).json({
                success: false,
                message: "Problem ID and language are required.",
            });
        }

        const workspace = await ensureWorkspace({ userId, problemId, language, starterCode });

        return res.status(200).json({
            success: true,
            workspace,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getWorkspaceForProblemController = async (req, res) => {
    try {
        const { problemId } = req.params;
        const userId = req.user.id;

        const workspace = await getWorkspaceByProblem({
            userId,
            problemId,
        });

        res.status(200).json({
            success: true,
            workspace,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getUserWorkspaces = async (req, res) => {
    try {
        const { userId } = req.params;

        const workspaces = await Workspace.find({ user: userId })
            .populate("problem")
            .sort({ updatedAt: -1 });

        res.status(200).json({
            success: true,
            workspaces
        });

    } catch (error) {
        console.error("getAiCodeForWorkspace Error:");
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getAiCode = async (req, res) => {
    try {
        const { problemId } = req.params;
        const { user: userId } = req.query;
        const { summarizedStatement, runnerCode, language } = req.body;

        const generatedCode = await getAiCodeForWorkspace({ summarizedStatement, runnerCode, language });

        const workspace = await Workspace.findOneAndUpdate(
            {
                user: userId,
                problem: problemId,
            },
            {
                aiCode: generatedCode,
            },
            {
                new: true,
            }
        );

        res.status(200).json({
            success: true,
            generatedCode,
        });

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};