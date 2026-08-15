import express from 'express';
import multer from 'multer';
import { ensureProblemController } from '../controllers/problem.controller.js';
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

// Store files in memory as buffers so we can easily convert them to base64 for Gemini
const upload = multer({ storage: multer.memoryStorage() });

// POST route expecting a form-data field named 'image'
router.post(
    "/ensure",
    upload.array("images", 20),
    authMiddleware,
    ensureProblemController
);

export default router;