import express from "express";

import { ensureWorkspaceController } from "../controllers/workspace.controller.js";

const router = express.Router();

router.post("/ensure", ensureWorkspaceController);

export default router;