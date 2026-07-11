import express from 'express';
import { signup, login, syncOAuth } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/oauth-sync', syncOAuth);

export default router;