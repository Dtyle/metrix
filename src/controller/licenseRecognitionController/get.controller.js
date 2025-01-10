const licenseRecognitionRepo = require("../../repository/licenseRecognitionRepo");

exports.getLicenseRecognitionData = async (req, res) => {
    try {
        const currentDate = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format

        // Fetch data from repository
        const totalNumberOfVehicles = await licenseRecognitionRepo.getTotalNumberOfVehicles(req.sequelize, currentDate);
        const vehiclesListed = await licenseRecognitionRepo.getVehiclesListed(req.sequelize, currentDate);
        const anprClarification = await licenseRecognitionRepo.getANPRClarification(req.sequelize, currentDate);

        // Combine all results into a single response
        res.status(200).json({
            status: true,
            message: "License Recognition data retrieved successfully.",
            data: {
                totalNumberOfVehicles,
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
