import { runCodeService } from '../services/online.compiler.service.js';

export default async function (req, res) {
  try {
    const { compiler, code, input } = req.body;

    // Basic validation
    if (!code || !compiler) {
      return res.status(400).json({ error: "code and compiler are required fields." });
    }

    // Pass data to the service layer
    const executionResult = await runCodeService({ compiler, code, input });

    // Send successful response back to frontend
    return res.status(200).json(executionResult);
  } catch (error) {
    console.error("Controller Error:", error.message);
    return res.status(500).json({ error: "Internal server error during execution." });
  }
};