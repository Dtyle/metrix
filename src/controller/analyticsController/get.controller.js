const analyticsRepo = require("../../repository/analyticsRepo");
const moment = require("moment");
exports.getAnalytics = async (req, res) => {
    try {
        const { date } = req.query;

        if (!date) {
            return res.status(400).json({
                status: false,
                message: "Please provide a date parameter.",
            });
        }

        // Validate the date format
        const moment = require("moment");
        if (!moment(date, "YYYY-MM-DD", true).isValid()) {
            return res.status(400).json({
                status: false,
                message: "Invalid date format. Please use YYYY-MM-DD.",
            });
        }

        const analyticsData = await analyticsRepo.getAnalyticsData(req.sequelize, date);

        res.status(200).json({
            status: true,
            message: "Analytics retrieved successfully.",
            data: analyticsData,
        });
    } catch (error) {
        console.error("Error in getAnalytics controller:", error);
        res.status(500).json({
            status: false,
            message: "Internal Server Error.",
            error: error.message,
        });
    }
};

