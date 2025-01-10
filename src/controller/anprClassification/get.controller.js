const AnprClassificationRepo = require("../../repository/anprClassification.repo");

exports.getAnprClassification = async (req, res) => {
    try {
        // Fetch state-based counts
        const stateCounts = await AnprClassificationRepo.getStateBasedCounts(req.sequelize);

        // Fetch RTO-based counts
        const rtoCounts = await AnprClassificationRepo.getRtoBasedCounts(req.sequelize);

        // Prepare the response
        res.status(200).json({
            status: true,
            message: "ANPR Classification fetched successfully.",
            data: {
                stateCounts,
                rtoCounts,
            },
        });
    } catch (error) {
        console.error("Error in getAnprClassification controller:", error);
        res.status(500).json({
            status: false,
            message: "Internal Server Error.",
            error: error.message,
        });
    }
};
