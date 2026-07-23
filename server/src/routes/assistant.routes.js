import express from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";

import { getAssistant, sendMessage } from "../controllers/assistant.controller.js";

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

export default router;