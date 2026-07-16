import mongoose from "mongoose"

const problemSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true, 
        trim: true 
    },

    url: {
        type: String,
        trim: true,
        // Creating a sparse unique index. If two users upload the same LeetCode URL, 
        // MongoDB catches the duplicate.
        unique: true,
        sparse: true
    },

    platform: { 
        type: String, 
        trim: true 
    },

    difficulty: { 
        type: String, 
        enum: ['Easy', 'Medium', 'Hard', 'Expert'] 
    },

    tags: [{ 
        type: String, 
        trim: true 
    }],

    statement: { 
        type: String, 
        required: true 
    },

}, { timestamps: true });

// Fallback index to catch duplicate titles on the same platform
// if they paste raw text without a URL.
problemSchema.index({ title: 1, platform: 1 }, { unique: true });

const Problem = mongoose.model('Problem', problemSchema);