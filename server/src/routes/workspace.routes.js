import express from "express";
import { getAiCode } from "../controllers/workspace.controller.js";
import authMiddleware from "../../middlewares/authMiddleware.js"

import { ensureWorkspaceController, getWorkspaceForProblemController, getUserWorkspaces } from "../controllers/workspace.controller.js";

const router = express.Router();

router.post("/ensure", ensureWorkspaceController);
router.get("/:problemId", authMiddleware, getWorkspaceForProblemController);
router.get("/user/:userId", getUserWorkspaces);
router.post("/problem/ai-code/:problemId", getAiCode);

export default router;