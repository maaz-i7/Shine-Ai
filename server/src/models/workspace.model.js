import mongoose from "mongoose";

const workspaceTestCaseSchema = new mongoose.Schema(
    {
        input: {
            type: String,
            required: true,
            trim: true,
        },
        expected: {
            type: String,
            default: null,
        },
    },
    {
        _id: false,
    }
);

const workspaceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    problem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Problem",
        required: true,
    },

    status: {
        type: String,
        enum: ["Todo", "Solving", "Solved", "Revisit"],
        default: "Todo",
    },

    language: {
        type: String,
        default: "cpp",
    },

    runnerCode: {
        type: String,
        default: "",
    },

    userCode: {
        type: String,
        default: "",
    },

    testCases: {
        type: [workspaceTestCaseSchema],
        default: [],
    },

    userNotes: {
        type: String,
        default: "",
    },

    timeTakenSeconds: {
        type: Number,
        default: 0,
    },

    journeySummary: {
        type: String,
        default: "",
    },

    score: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },

    aiNotes: {
        type: String,
        default: "",
    },

    aiCode: {
        type: String,
        default: "",
    },

    favorite: {
        type: Boolean,
        default: false,
    },

    solvedAt: {
        type: Date,
    },
}, { timestamps: true });

workspaceSchema.index({ user: 1, problem: 1 }, { unique: true });

workspaceSchema.index({ user: 1, updatedAt: -1 });

const Workspace = mongoose.model('Workspace', workspaceSchema);
export default Workspace