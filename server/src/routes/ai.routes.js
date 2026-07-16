import express from 'express';
import multer from 'multer';
import { handleCodeGeneration } from '../controllers/ai.controller.js';

const router = express.Router();

// Store files in memory as buffers so we can easily convert them to base64 for Gemini
const upload = multer({ storage: multer.memoryStorage() });

// POST route expecting a form-data field named 'image'
router.post(
    "/extract-problem",
    upload.array("images", 20),
    handleCodeGeneration
);

export default router;