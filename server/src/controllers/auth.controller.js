import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';

// ==========================================
// 1. Standard Registration
// ==========================================
export const signup = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        const normalizedEmail = email.toLowerCase();
        const normalizedUsername = username.toLowerCase();

        // Check if user exists
        const existingUser = await User.findOne({
            $or: [{ email: normalizedEmail }, { username: normalizedUsername }]
        });

        if (existingUser) {
            return res.status(400).json({ message: "Username or Email already registered" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            username: normalizedUsername,
            email: normalizedEmail,
            password: hashedPassword,
            authProviders: ['local']
        });

        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            username: newUser.username,
            email: newUser.email,
            avatar: newUser.avatar
        });
    } catch (error) {
        res.status(500).json({ message: "Registration failed", error: error.message });
    }
};

// ==========================================
// 2. Standard Login
// ==========================================
export const login = async (req, res) => {
    try {
        const { identifier, password } = req.body;
        const normalizedIdentifier = identifier.toLowerCase();

        const user = await User.findOne({
            $or: [
                { email: normalizedIdentifier },
                { username: normalizedIdentifier }
            ]
        });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        if (!user.authProviders.includes('local')) {
            const providerNames = user.authProviders
                .map(provider => provider.charAt(0).toUpperCase() + provider.slice(1))
                .join(" / ");

            return res.status(401).json({
                message: `Please log in using ${providerNames}.`
            });
        }

        // Verify password for local users
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Return stripped user object
        res.status(200).json({
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            avatar: user.avatar
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// ==========================================
// 3. OAuth Synchronization
// ==========================================
export const syncOAuth = async (req, res) => {
    try {
        const { email, name, avatar, provider, providerId } = req.body;
        const normalizedEmail = email.toLowerCase();

        let user = await User.findOne({ email: normalizedEmail });

        if (user) {
            if (!user.authProviders.includes(provider)) {
                user.authProviders.push(provider);
                if (provider === 'google') user.googleId = providerId;
                if (provider === 'github') user.githubId = providerId;
                await user.save();
            }
            // Return stripped user object
            return res.status(200).json({
                _id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                avatar: user.avatar
            });
        }

        // New user from OAuth: generate a unique username from email
        const baseUsername = normalizedEmail.split('@')[0].replace(/[^a-z0-9]/g, '');
        let uniqueUsername = baseUsername;
        let usernameExists = await User.findOne({ username: uniqueUsername });
        let counter = 1;

        while (usernameExists) {
            uniqueUsername = `${baseUsername}${counter}`;
            usernameExists = await User.findOne({ username: uniqueUsername });
            counter++;
        }

        // Create new user
        const newUser = await User.create({
            name,
            email: normalizedEmail,
            username: uniqueUsername,
            avatar: avatar || '',
            authProviders: [provider],
            googleId: provider === 'google' ? providerId : undefined,
            githubId: provider === 'github' ? providerId : undefined,
        });

        // Return stripped user object
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            username: newUser.username,
            email: newUser.email,
            avatar: newUser.avatar
        });
    } catch (error) {
        res.status(500).json({ message: "OAuth Sync Failed", error: error.message });
    }
};