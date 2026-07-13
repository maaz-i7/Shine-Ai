import mongoose from "mongoose"

// Sub-schema for test cases
const testCaseSchema = new mongoose.Schema({
    input: { type: String, required: true },
    output: { type: String, required: true },
    explanation: { type: String }
}, { _id: false }); // Disabled _id for subdocuments to save space

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

    constraints: [{ type: String }],
    sampleTestCases: [testCaseSchema],
    starterCode: { type: String },

}, { timestamps: true });

// Fallback index to catch duplicate titles on the same platform
// if they paste raw text without a URL.
problemSchema.index({ title: 1, platform: 1 }, { unique: true });

const Problem = mongoose.model('Problem', problemSchema);