import mongoose from "mongoose"

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        maxlength: [50, "Name cannot exceed 50 characters"]
    },
    
    username: {
        type: String,
        required: [true, "username is required"],
        unique: true,
        trim: true,
        lowercase: true,
        minlength: [3, 'Username must be at least 3 characters long'],
        maxlength: [30, 'Username cannot exceed 30 characters']
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address']
    },

    password: {
        type: String,
        required: function () {
            return !this.googleId && !this.githubId;
        },
        minlength: [8, 'Password must be at least 8 characters long']
    },

    googleId: {
        type: String,
        unique: true,
        sparse: true // Only enforce uniqueness if the field actually exists
    },

    githubId: {
        type: String,
        unique: true,
        sparse: true // Only enforce uniqueness if the field actually exists
    },

    avatar: {
        type: String,
        default: ''
    },

    authProviders: {
        type: [String],
        enum: ['local', 'google', 'github'],
        default: ['local']
    },

}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema);
export default User;