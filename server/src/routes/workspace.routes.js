import express from "express";

import { ensureWorkspaceController, getWorkspaceByProblemController } from "../controllers/workspace.controller.js";

const router = express.Router();

router.post("/ensure", ensureWorkspaceController);
router.get("/problem/:problemId", getWorkspaceByProblemController);

export default router;