const cameraStatusRepo = require('../../repository/camera_overview.repo');

exports.getCameraOverview = async (req, res) => {
    try {
        // Fetch data from the repository
        const cameraOverview = await cameraStatusRepo.fetchCameraOverview(req.sequelize);

        // If no data is found, return an empty response
        if (!cameraOverview || cameraOverview.length === 0) {
            return res.status(404).json({
                status: false,
                message: "No camera status data found.",
            });
        }

        // Calculate the totals
        const totalCameras = cameraOverview.reduce((sum, camera) => sum + camera.total_cameras, 0);
        const totalOnDuty = cameraOverview.reduce((sum, camera) => sum + camera.on_duty_cameras, 0);
        const totalOffDuty = cameraOverview.reduce((sum, camera) => sum + camera.off_duty_cameras, 0);

        // Prepare the response data
        const responseData = {
            total_cameras: totalCameras,
            on_duty_cameras: totalOnDuty,
            off_duty_cameras: totalOffDuty,
        };

        // Respond with the calculated totals
        res.status(200).json({
            status: true,
            message: "Camera overview retrieved successfully.",
            data: responseData,
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

