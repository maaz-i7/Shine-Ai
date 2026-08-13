import express from "express";
import authMiddleware from "../../middlewares/authMiddleware.js"
import { ensureWorkspaceController, getWorkspaceForProblemController, getUserWorkspacesController, getAiCodeController, saveWorkspaceController, deleteWorkspaceController, getNewLanguageRunnerCodeController } from "../controllers/workspace.controller.js";

const router = express.Router();

router.post("/ensure", ensureWorkspaceController);
router.get("/all", authMiddleware, getUserWorkspacesController);
router.post("/ai-code/:problemId", authMiddleware, getAiCodeController);
router.get("/:problemId", authMiddleware, getWorkspaceForProblemController);
router.delete("/:workspaceId", authMiddleware, deleteWorkspaceController);
router.patch("/:workspaceId", authMiddleware, saveWorkspaceController);
router.post("/:workspaceId/new-language-runner-code", authMiddleware, getNewLanguageRunnerCodeController);

export default router;