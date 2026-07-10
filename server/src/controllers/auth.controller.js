import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/user.model"

// Helper: Generate JWT & Set Cookie
const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '15d',
    });

    res.cookie('jwt', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development',
    });
};

export const signup = async (req, res) => {
    try {
        const { name, username, email, password } = req.body

        if (!name || !username || !email || !password) {
            return res.status(400).json({ error: "All fields are required " })
        }

        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        })

        if (existingUser) {
            if (existingUser.email === email) return res.status(400).json({ error: "Email is already registered" })
            if (existingUser.username === username) return res.status(400).json({ error: "Username is already taken" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            name,
            username,
            email,
            password: hashedPassword,
            authProviders: ['local'],
        })

        if (newUser) {
            await newUser.save()
            generateTokenAndSetCookie(newUser._id, res)
        }
        else {
            res.status(400).json({ error: "Invalid user data" })
        }
    }
    catch (error) {
        console.error('Error in signup controller:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const login = async (req, res) => {
    try {
        const { login, password } = req.body
        const user = User.findOne({
            $or: [
                { email: login.toLowerCase() },
                { username: login.toLowerCase() }
            ]
        })

        if (!user) {
            return res.status(400).json({ error: "Invalid login credentials" })
        }

        if (!user.password) {
            return res.status(400).json({
                error: `Please login through ${user.authProviders.join('/')}`
            })
        }

        const isPasswordCorrect = await bcrypt.compare(user.password, password)
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid login credentials" })
        }

        generateTokenAndSetCookie(user._id, res)

        res.status(200).json({
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            authProviders: user.authProviders
        })
    }
    catch (error) {
        console.error('Error in login controller:', error.message)
        res.status(500).json({ error: "Internal server error"})
    }
}