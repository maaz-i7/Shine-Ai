import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            enum: ["user", "assistant"],
            required: true,
        },

        content: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
        _id: false,
    }
);

const assistantSchema = new mongoose.Schema(
    {
        workspace: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Workspace",
            required: true,
            unique: true,
        },

        messages: {
            type: [messageSchema],
            default: [],
        },

        pastConversationSummary: {
            type: String,
            default: "",
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

assistantSchema.index({ user: 1, workspace: 1 });

const Assistant = mongoose.model("Assistant", assistantSchema);

export default Assistant;