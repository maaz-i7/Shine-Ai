import { ensureWorkspace, getWorkspaceByProblem } from "../services/workspace.service.js";

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

export const getWorkspaceByProblemController = async (req, res) => {
    try {
        const { problemId } = req.params;
        const { userId } = req.query;

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