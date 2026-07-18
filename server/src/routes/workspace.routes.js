import express from "express";
import { getAiCode } from "../controllers/workspace.controller.js";

import { ensureWorkspaceController, getWorkspaceByProblemController, getUserWorkspaces } from "../controllers/workspace.controller.js";

const router = express.Router();

router.post("/ensure", ensureWorkspaceController);
router.get("/problem/:problemId", getWorkspaceByProblemController);
router.get("/user/:userId", getUserWorkspaces);
router.post("/problem/ai-code/:problemId", getAiCode);

export default router;