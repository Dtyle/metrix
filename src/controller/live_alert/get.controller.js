const LiveAlertsRepo = require("../../repository/live_alert.repo");

exports.getLiveAlertCount = async (req, res) => {
    try {
        const { alertDate } = req.query;

        // Validate alertDate input
        if (!alertDate) {
            return res.status(400).json({
                status: false,
                message: "alertDate is required in query params (YYYY-MM-DD).",
            });
        }

        // Fetch live alert count from repository
        const alertCount = await LiveAlertsRepo.fetchLiveAlertCount(req.sequelize, alertDate);

        if (!alertCount) {
            return res.status(200).json({
                status: true,
                message: "No alerts found for the provided date.",
                data: 0,
            });
        }

        // Send success response
        res.status(200).json({
            status: true,
            message: "Live alert count fetched successfully.",
            data: alertCount,
        });
    } catch (error) {
        console.error("Error in getLiveAlertCount controller:", error);
        res.status(500).json({
            status: false,
            message: "Internal Server Error.",
            error: error.message,
        });
    }
};
