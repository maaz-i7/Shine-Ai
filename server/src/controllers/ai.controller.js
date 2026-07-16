import { generateCodeFromImages } from "../services/ai.service.js";

export const handleCodeGeneration = async (req, res) => {
    try {
        const files = req.files;

        if (!files || files.length === 0) {
            return res.status(400).json({
                success: false,
                error: "No image files provided."
            });
        }

        const generatedCode = await generateCodeFromImages(files);

        return res.status(200).json({
            success: true,
            data: generatedCode
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};