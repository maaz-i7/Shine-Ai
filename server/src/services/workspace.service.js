import Workspace from "../models/workspace.model.js";
import Problem from "../models/problem.model.js";
import Assistant from "../models/assistant.model.js"
import { generateCode, generateWorkspace } from "./ai.service.js";
import { generateNewLanguageRunnerCode } from "./gemini.service.js"

export const findWorkspace = async (userId, problemId) => {
    return await Workspace.findOne({
        user: userId,
        problem: problemId,
    }).populate("problem");
};

export const createWorkspace = async ({ userId, problemId, language, starterCode = "", }) => {

    const problem = await Problem.findById(problemId);

    if (!problem) {
        throw new Error("Problem not found.");
    }

    const { runnerCode } = await generateWorkspace({
        statement: problem.summarizedStatement,
        language,
        starterCode,
    });

    try {
        const workspace = await Workspace.create({
            user: userId,
            problem: problemId,

            language,
            runnerCode,

            userCode: runnerCode,
        });

        // return the problem object as a part of workspace object
        return await workspace.populate("problem");

    } catch (error) {
        if (error.code === 11000) {
            return await Workspace.findOne({
                user: userId,
                problem: problemId,
            }).populate("problem");
        }
        throw error;
    }
};

export const ensureWorkspace = async ({ userId, problemId, language, starterCode = "" }) => {

    let workspace = await findWorkspace(
        userId,
        problemId
    );

    if (workspace) {
        return workspace;
    }

    workspace = await createWorkspace({
        userId,
        problemId,
        language,
        starterCode,
    });

    return workspace;
};

export const getWorkspaceByProblem = async ({ userId, problemId }) => {

    const workspace = await Workspace.findOne({
        user: userId,
        problem: problemId
    }).populate("problem");

    if (!workspace) {
        throw new Error("Workspace not found.");
    }

    return workspace;
};

export const getAiCodeForWorkspace = async ({ summarizedStatement, runnerCode, language }) => {
    try {
        return await generateCode({
            summarizedStatement,
            runnerCode,
            language,
        });

    } catch (error) {
        console.error("Error generating AI code:", error);
        throw new Error(
            error?.message || "Failed to generate AI code."
        );
    }
};

export const saveWorkspace = async ({ workspaceId, userId, userCode, testCases }) => {

    const workspace = await Workspace.findOneAndUpdate(
        {
            _id: workspaceId,
            user: userId,
        },
        {
            $set: {
                userCode,
                testCases: (testCases ?? []).map(({ input, expected }) => ({
                    input,
                    expected,
                })),
            },
        },
        {
            returnDocument: 'after'
        }
    );

    if (!workspace)
        throw new Error("Workspace not found.");

    return workspace;
}

export const deleteWorkspace = async ({ workspaceId, userId }) => {
    const workspace = await Workspace.findOneAndDelete({
        _id: workspaceId,
        user: userId
    });

    await Assistant.findOneAndDelete({
        workspace: workspaceId,
    });

    return workspace;
}

export const getNewLanguageRunnerCodeForWorkspace = async ({ workspaceId, language }) => {
    try {
        const workspace = await Workspace.findById(workspaceId);

        if (!workspace) {
            throw new Error("Workspace not found.");
        }

        const runnerCode = await generateNewLanguageRunnerCode({
            currentRunnerCode: workspace?.runnerCode,
            language: language,
        });

        const updatedWorkspace = await Workspace.findByIdAndUpdate(
            workspaceId,
            {
                runnerCode,
                userCode: runnerCode,
                language,
            },
            {
                returnDocument: "after",
            }
        );

        return runnerCode;

    } catch (error) {
        console.error("Error generating new language runner code:", error);

        throw new Error(
            error?.message || "Failed to generate new language runner code."
        );
    }
};