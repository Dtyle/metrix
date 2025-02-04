const trafficRepo = require("../../repository/trafficRepo");


exports.getTrafficAnalysis = async (req, res) => {
    try {
        const { date } = req.query; // Get date from request query parameters
        const selectedDate = date || new Date().toISOString().slice(0, 10); // Default to today's date if not provided

        // Fetch traffic data with the date filter
        const trafficData = await trafficRepo.getTrafficAnalysisData(req.sequelize, selectedDate);

        // Respond with the traffic data
        res.status(200).json({
            status: true,
            message: "Traffic analysis retrieved successfully.",
            data: trafficData,
        });
    } catch (error) {
        console.error("Error in getTrafficAnalysis controller:", error);
        res.status(500).json({
            status: false,
            message: "Internal Server Error.",
            error: error.message,
        });
    }
};


