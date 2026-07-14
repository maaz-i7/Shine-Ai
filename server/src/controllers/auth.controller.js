import * as authService from '../services/auth.service.js';

// ==========================================
// 1. Standard Registration
// ==========================================
export const signup = async (req, res) => {
    try {
        const newUser = await authService.signupUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        // Catch service-specific status codes (e.g., 400 for existing user)
        if (error.statusCode) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        res.status(500).json({ message: "Registration failed", error: error.message });
    }
};

// ==========================================
// 2. Standard Login
// ==========================================
export const login = async (req, res) => {
    try {
        const user = await authService.loginUser(req.body);
        res.status(200).json(user);
    } catch (error) {
        // Catch service-specific status codes (e.g., 401 for invalid credentials)
        if (error.statusCode) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// ==========================================
// 3. OAuth Synchronization
// ==========================================
export const syncOAuth = async (req, res) => {
    try {
        const { user, isNewUser } = await authService.syncOAuthUser(req.body);
        
        // Preserve original logic: 201 for created user, 200 for existing user
        const statusCode = isNewUser ? 201 : 200;
        
        res.status(statusCode).json(user);
    } catch (error) {
        res.status(500).json({ message: "OAuth Sync Failed", error: error.message });
    }
};