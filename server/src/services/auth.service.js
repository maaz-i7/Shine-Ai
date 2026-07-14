import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';

// ==========================================
// 1. Standard Registration Service
// ==========================================
export const signupUser = async ({ name, username, email, password }) => {
    const normalizedEmail = email.toLowerCase();
    const normalizedUsername = username.toLowerCase();

    // Check if user exists
    const existingUser = await User.findOne({
        $or: [{ email: normalizedEmail }, { username: normalizedUsername }]
    });

    if (existingUser) {
        const error = new Error("Username or Email already registered");
        error.statusCode = 400;
        throw error;
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

    return {
        _id: newUser._id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        avatar: newUser.avatar
    };
};

// ==========================================
// 2. Standard Login Service
// ==========================================
export const loginUser = async ({ identifier, password }) => {
    const normalizedIdentifier = identifier.toLowerCase();

    const user = await User.findOne({
        $or: [
            { email: normalizedIdentifier },
            { username: normalizedIdentifier }
        ]
    });

    if (!user) {
        const error = new Error("Invalid credentials");
        error.statusCode = 401;
        throw error;
    }

    if (!user.authProviders.includes('local')) {
        const providerNames = user.authProviders
            .map(provider => provider.charAt(0).toUpperCase() + provider.slice(1))
            .join(" / ");
        
        const error = new Error(`Please log in using ${providerNames}.`);
        error.statusCode = 401;
        throw error;
    }

    // Verify password for local users
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        const error = new Error("Invalid credentials");
        error.statusCode = 401;
        throw error;
    }

    return {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        avatar: user.avatar
    };
};

// ==========================================
// 3. OAuth Synchronization Service
// ==========================================
export const syncOAuthUser = async ({ email, name, avatar, provider, providerId }) => {
    const normalizedEmail = email.toLowerCase();

    let user = await User.findOne({ email: normalizedEmail });

    if (user) {
        if (!user.authProviders.includes(provider)) {
            user.authProviders.push(provider);
            if (provider === 'google') user.googleId = providerId;
            if (provider === 'github') user.githubId = providerId;
            await user.save();
        }

        return {
            user: {
                _id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                avatar: user.avatar
            },
            isNewUser: false 
        };
    }

    // If the user does not exist, create one
    const baseUsername = normalizedEmail.split('@')[0].replace(/[^a-z0-9]/g, '');
    let uniqueUsername = baseUsername;
    let usernameExists = await User.findOne({ username: uniqueUsername });
    let counter = 1;

    while (usernameExists) {
        uniqueUsername = `${baseUsername}${counter}`;
        usernameExists = await User.findOne({ username: uniqueUsername });
        counter++;
    }

    const newUser = await User.create({
        name,
        email: normalizedEmail,
        username: uniqueUsername,
        avatar: avatar || '',
        authProviders: [provider],
        googleId: provider === 'google' ? providerId : undefined,
        githubId: provider === 'github' ? providerId : undefined,
    });

    return {
        user: {
            _id: newUser._id,
            name: newUser.name,
            username: newUser.username,
            email: newUser.email,
            avatar: newUser.avatar
        },
        isNewUser: true
    };
};