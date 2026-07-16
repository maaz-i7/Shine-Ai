const workspaceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    problem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem',
        required: true
    },

    status: {
        type: String,
        enum: ['Todo', 'Solving', 'Solved', 'Revisit'],
        default: 'Todo'
    },

    language: { type: String, default: 'cpp' },
    codeTemplate: { type: String },
    userCode: { type: String },

    timeTakenSeconds: {
        type: Number,
        default: 0
    },

    // Shine AI analysis
    journeySummary: {
        type: String
    },
    
    score: {
        type: Number,
        min: 0,
        max: 5
    },

    shortNotes: { type: String },

    // AI Interaction Data
    aiNotes: { type: String },
    aiCode: { type: String },
    aiRating: { type: Number, min: 0, max: 100 },
    chatCount: { type: Number, default: 0 },
    executionCount: { type: Number, default: 0 },

    favorite: { type: Boolean, default: false },
    solvedAt: { type: Date },
}, { timestamps: true });

// Ensure a user only has one active workspace per problem.
workspaceSchema.index({ user: 1, problem: 1 }, { unique: true });

const Workspace = mongoose.model('Workspace', workspaceSchema);