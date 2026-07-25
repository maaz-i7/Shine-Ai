import express from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";

import { getAssistant, sendMessage, quickHelp } from "../controllers/assistant.controller.js";

const router = express.Router();

router.get(
    "/workspace/:workspaceId",
    authMiddleware,
    getAssistant
);

router.post(
    "/workspace/:workspaceId/chat",
    authMiddleware,
    sendMessage
);

router.post(
    "/workspace/:workspaceId/quick-help",
    authMiddleware,
    quickHelp
);

export default router;