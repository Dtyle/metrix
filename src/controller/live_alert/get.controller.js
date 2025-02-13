const LiveAlertsRepo = require("../../repository/live_alert.repo");

exports.getLiveAlertCount = async (req, res) => {
    try {
        // Get date from query, default to today's date if not provided
        const date = req.query.date || new Date().toISOString().slice(0, 10);

        // Fetch values with structured response
        const crowdAlerts = await LiveAlertsRepo.getCrowdAlerts(req.sequelize, date);
        const suspectAlerts = await LiveAlertsRepo.getSuspectAlerts(req.sequelize, date);
        const abnormalBehaviors = await LiveAlertsRepo.getAbnormalBehaviors(req.sequelize, date);

        // Fetch **calculated values**
        const liveAlertCount = await LiveAlertsRepo.calculateLiveAlertCount(req.sequelize, date);
        const queueAlertCount = await LiveAlertsRepo.calculateQueueAlertCount(req.sequelize, date);

        // Send response with structured values
        res.status(200).json({
            status: true,
            message: "Live alert data fetched successfully.",
            data: {
                liveAlertCount: liveAlertCount || 0, // Calculated
                queueAlertCount: queueAlertCount || 0, // Calculated
                crowdAlerts: crowdAlerts || [], // Structured array
                suspectAlerts: suspectAlerts || [], // Structured array
                abnormalBehaviors: abnormalBehaviors || [], // Structured array
            },
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



