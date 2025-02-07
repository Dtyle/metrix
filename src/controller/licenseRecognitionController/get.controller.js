const licenseRecognitionRepo = require("../../repository/licenseRecognitionRepo");

exports.getLicenseRecognitionData = async (req, res) => {
    try {
        // Get date filter from request query, or default to current date
        const requestedDate = req.query.date || new Date().toISOString().slice(0, 10); // YYYY-MM-DD format

        // Fetch data from repository with the given date filter
        const totalNumberOfVehicles = await licenseRecognitionRepo.getTotalNumberOfVehicles(req.sequelize, requestedDate);
        const vehiclesListed = await licenseRecognitionRepo.getVehiclesListed(req.sequelize, requestedDate);
        const anprClarification = await licenseRecognitionRepo.getANPRClarification(req.sequelize, requestedDate);
        const totalBikeCount = await licenseRecognitionRepo.getTotalBikeCount(req.sequelize, requestedDate); // New function

        // Combine all results into a single response
        res.status(200).json({
            status: true,
            message: "License Recognition data retrieved successfully.",
            data: {
                totalNumberOfVehicles,
                totalBikeCount, // Added bike count
                vehiclesListed,
                anprClarification,
               
            },
        });
    } catch (error) {
        console.error("Error in getLicenseRecognitionData controller:", error);
        res.status(500).json({
            status: false,
            message: "Internal Server Error.",
            error: error.message,
        });
    }
};


