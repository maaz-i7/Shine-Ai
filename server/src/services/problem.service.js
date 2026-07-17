import Problem from "../models/problem.model.js";

import { extractProblemFromImages, generateMetadata } from "./ai.service.js";

function normalizeTitle(title) {
    return title
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/['’]/g, "")
        .replace(/[^a-z0-9\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

async function findByUrl(url) {
    if (!url?.trim())
        return null;

    return await Problem.findOne({
        url: url.trim()
    });
}

async function findByTitlePlatform(title, platform) {

    if (platform === "other")
        return null;

    const normalizedTitle = normalizeTitle(title);

    return await Problem.findOne({
        normalizedTitle,
        platform
    });
}

async function findExistingProblem({ title, platform, url }) {

    let problem = null;

    // Search by URL
    if (url?.trim()) {
        problem = await findByUrl(url);
        if (problem)
            return problem;
    }

    // Search by title + platform
    problem = await findByTitlePlatform(title, platform);

    if (problem)
        return problem;

    return null;
}

async function createProblem({ files, title, platform, url }) {

    const normalizedTitle = normalizeTitle(title);

    // OCR
    const { statement } = await extractProblemFromImages(files);

    // AI metadata
    const { difficulty, tags } = await generateMetadata(statement);

    return await Problem.create({
        title: title.trim(),
        normalizedTitle,
        platform,
        url: url?.trim() || undefined,
        statement,
        difficulty,
        tags
    });
}

export async function ensureProblem({ files, title, platform, url }) {

    if (!title?.trim())
        throw new Error("Problem title is required.");

    if (!platform?.trim())
        throw new Error("Problem platform is required.");

    const existingProblem = await findExistingProblem({ title, platform, url });

    if (existingProblem)
        return existingProblem;

    try {
        return await createProblem({
            files,
            title,
            platform,
            url
        });
    }
    catch (error) {
        if (error.code === 11000 && url) {
            const problem = await findByUrl(url);
            if (problem) return problem;
        }
        throw error;
    }
}