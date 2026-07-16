// services/code.service.js

export const runCodeService = async ({ compiler, code, input }) => {

    const getExecutionMeaning = (exitCode, signal) => {
        if (exitCode === 0) return "Success";
        if (exitCode === 1) return "Runtime error (e.g., uncaught exception, assertion failure)";
        if (exitCode === 2) return "Misuse of command / invalid arguments";
        if (exitCode === 124) return "Timeout — execution exceeded the 30-second limit";
        if (exitCode === 137 && signal === 9) return "Killed — memory limit exceeded or timeout";
        if (exitCode === 139 && signal === 11) return "Segmentation fault — invalid memory access";

        return "Unknown execution error";
    };

    const externalApiUrl = process.env.CODE_EXECUTION_API_URL;
    const apiKey = process.env.CODE_EXECUTION_API_KEY;

    try {
        const response = await fetch(externalApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${apiKey}`
            },
            body: JSON.stringify({
                compiler,
                code,
                input,
            })
        });

        if (!response.ok) {
            throw new Error(`External API failed with status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Determine overall success based on the API's status and exit_code rules
        const isSuccess = data.status === "success" && data.exit_code === 0;

        // Get the human-readable explanation of the process exit status
        const statusMessage = getExecutionMeaning(data.exit_code, data.signal);

        return {
            success: isSuccess,
            message: statusMessage,
            output: data.output || null, // Max 999 chars
            error: data.error || null,   // Max 999 chars
            details: {
                exitCode: data.exit_code,
                signal: data.signal
            },
            stats: {
                executionTimeSecs: data.time,  // Excludes compilation
                totalTimeSecs: data.total,     // Includes compilation
                memoryUsageKb: data.memory     // In KB
            },
            // Pass along any extra params if your API sends them back
            customData: data.extra_params || null
        };

    } catch (error) {
        console.error("Service Layer Error:", error);
        throw error; // Throw error back to the controller to handle the 500 response
    }
};