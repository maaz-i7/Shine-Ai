import Workspace from "../models/workspace.model.js";
import Problem from "../models/problem.model.js";

import { generateWorkspace } from "./ai.service.js";

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

    const { runnerCode, aiCode } = await generateWorkspace({
        statement: problem.statement,
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
            aiCode,
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