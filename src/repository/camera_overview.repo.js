
const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");

class CameraoverviewRepository {
    async fetchCameraOverview(sequelize) {
        try {
            // Query to fetch all camera status data
            const query = `
                SELECT 
                   id,
                    location_name,
                    total_cameras,
                    on_duty_cameras,
                    off_duty_cameras
                FROM 
                    camera_status;
            `;
            
            // Execute the query
            const cameraOverview = await sequelize.query(query, {
                type: sequelize.QueryTypes.SELECT,
            });
    
            return cameraOverview;
        } catch (error) {
            console.error("Error in fetchCameraOverview repository:", error);
            throw error;
        }
    };
    
    
}

module.exports = new CameraoverviewRepository();
