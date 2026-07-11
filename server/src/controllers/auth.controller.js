import User from "../models/user.model.js"
import bcrypt from 'bcryptjs';

export const loginUser = async (req, res) => {
    try {
        const { identifier, password } = req.body;

        const user = await User.findOne({
            $or: [
                { email: identifier.toLowerCase() },
                { username: identifier.toLowerCase() }
            ]
        });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Conflict Resolution: User exists, but didn't sign up with a password
        if (!user.authProviders.includes('local')) {
            const provider = user.authProviders[0]; // Grab the primary OAuth provider ('google'/'github')
            const providerName = provider.charAt(0).toUpperCase() + provider.slice(1); // Capitalize for a cleaner UI message
            
            return res.status(401).json({ 
                message: `Please log in using ${providerName}.` 
            });
        }

        // 3. Verify password for local users
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const handleOAuth = async (req, res) => {
    try {
        const { email, name, avatar, provider, providerId } = req.body;

        let user = await User.findOne({ email });

        if (user) {
            if (!user.authProviders.includes(provider)) {
                user.authProviders.push(provider);
                if (provider === 'google') user.googleId = providerId;
                if (provider === 'github') user.githubId = providerId;
                await user.save();
            }
            return res.status(200).json(user);
        }

        // New user from OAuth: generate a unique username from email
        const baseUsername = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
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
            email,
            username: uniqueUsername,
            avatar: avatar || '',
            authProviders: [provider],
            googleId: provider === 'google' ? providerId : undefined,
            githubId: provider === 'github' ? providerId : undefined,
        });

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "OAuth Sync Failed", error: error.message });
    }
};