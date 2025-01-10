const faceRecognitionRepo = require("../../repository/faceRecognitionRepo");

exports.getFaceRecognitionAnalytics = async (req, res) => {
    try {
        const { date, search } = req.query; // Extract date filter and global search query parameter
        
        if (!date) {
            return res.status(400).json({
                status: false,
                message: "Please provide a date parameter.",
            });
        }

        // Fetch data from repository based on the date filter
        const liverAlerts = await faceRecognitionRepo.getLiverAlerts(req.sequelize, date);
        const faceRecognitionCount = await faceRecognitionRepo.getFaceRecognitionCount(req.sequelize, date);
        const crowsAlert = await faceRecognitionRepo.getCrowsAlert(req.sequelize, date);
        const detectedPersons = await faceRecognitionRepo.getDetectedPersons(req.sequelize, date, search);

        // Combine all the analytics data into a single response
        res.status(200).json({
            status: true,
            message: "Face Recognition Analytics retrieved successfully.",
            data: {
                liverAlerts,
                faceRecognitionCount,
                crowsAlert,
                detectedPersons,
            },
        });
    } catch (error) {
        console.error("Error in getFaceRecognitionAnalytics controller:", error);
        res.status(500).json({
            status: false,
            message: "Internal Server Error.",
            error: error.message,
        });
    }
};
