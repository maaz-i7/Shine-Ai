import { ensureProblem } from "../services/problem.service.js";

export const ensureProblemController = async (req, res, next) => {
    try {
        const problem = await ensureProblem({
            files: req.files,
            title: req.body.title,
            platform: req.body.platform,
            url: req.body.url || "",
        });

        return res.status(200).json({
            success: true,
            problem
        });

    } catch (error) {

        if (error.message === "INVALID_PROBLEM_IMAGES") {
            return res.status(422).json({
                success: false,
                error: "The uploaded images do not contain a valid programming problem."
            });
        }

        console.error(error);

        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};