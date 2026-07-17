import express from "express";

import { ensureWorkspaceController, getWorkspaceByProblemController, getUserWorkspaces } from "../controllers/workspace.controller.js";

const router = express.Router();

router.post("/ensure", ensureWorkspaceController);
router.get("/problem/:problemId", getWorkspaceByProblemController);
router.get("/user/:userId", getUserWorkspaces);

export default router;