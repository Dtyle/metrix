const trafficRepo = require("../../repository/trafficRepo");


exports.getTrafficAnalysis = async (req, res) => {
    try {
        // Fetch traffic data
        const trafficData = await trafficRepo.getTrafficAnalysisData(req.sequelize);

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

