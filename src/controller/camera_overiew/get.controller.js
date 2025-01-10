const cameraStatusRepo = require('../../repository/camera_overview.repo');

exports.getCameraOverview = async (req, res) => {
    try {
        // Fetch data from the repository
        const cameraOverview = await cameraStatusRepo.fetchCameraOverview(req.sequelize);

        // If no data is found, return an empty response
        if (!cameraOverview) {
            return res.status(404).json({
                status: false,
                message: "No camera status data found.",
            });
        }

        // Respond with the fetched data
        res.status(200).json({
            status: true,
            message: "Camera overview retrieved successfully.",
            data: cameraOverview,
        });
    } catch (error) {
        console.error("Error in getCameraOverview controller:", error);
        res.status(500).json({
            status: false,
            message: "Internal Server Error.",
            error: error.message,
        });
    }
};
