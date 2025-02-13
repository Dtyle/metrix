
const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");

class LiveAlertsRepository {
    async calculateLiveAlertCount(sequelize, date) {
        try {
            const query = `
                SELECT COUNT(*) AS alertCount
                FROM live_alerts
                WHERE DATE(alert_datetime) = :date;
            `;
            const result = await sequelize.query(query, {
                replacements: { date },
                type: sequelize.QueryTypes.SELECT,
            });
    
            return result[0]?.alertCount || 0;
        } catch (error) {
            console.error("Error in fetchLiveAlertCount repository:", error);
            throw error;
        }
    }
    
     async getCrowdAlerts(sequelize, date) {
        try {
            const query = `
                SELECT cam_name,updated_at AS timealerts, s3_url_path AS image
                FROM crowd_control
                WHERE s3_url_path IS NOT NULL AND DATE(updated_at) = :date;
            `;
            const result = await sequelize.query(query, {
                replacements: { date },
                type: sequelize.QueryTypes.SELECT,
            });
            return result; // Returning structured values
        } catch (error) {
            console.error("Error in getCrowdAlerts:", error);
            throw error;
        }
    }

     async getSuspectAlerts(sequelize, date) {
        try {
            const query = `
                SELECT cam_name, timealerts, file_path AS image, suspect_name
                FROM face_detection
                WHERE file_path IS NOT NULL AND DATE(timealerts) = :date;
            `;
            const result = await sequelize.query(query, {
                replacements: { date },
                type: sequelize.QueryTypes.SELECT,
            });
            return result; // Returning structured values
        } catch (error) {
            console.error("Error in getSuspectAlerts:", error);
            throw error;
        }
    }

     async getAbnormalBehaviors(sequelize, date) {
        try {
            const query = `
                SELECT cam_name, updated_at AS timealerts, s3_url_path AS image
                FROM emotion_based_count
                WHERE s3_url_path IS NOT NULL AND DATE(updated_at) = :date;
            `;
            const result = await sequelize.query(query, {
                replacements: { date },
                type: sequelize.QueryTypes.SELECT,
            });
            return result; // Returning structured values
        } catch (error) {
            console.error("Error in getAbnormalBehaviors:", error);
            throw error;
        }
    }
    async calculateQueueAlertCount(sequelize, date) {
        try {
            const query = `
                SELECT SUM(people_in_queue) AS queueAlertCount
                FROM queue_management
                WHERE DATE(last_updated) = :date;
            `;
            const result = await sequelize.query(query, {
                replacements: { date },
                type: sequelize.QueryTypes.SELECT,
            });
    
            return result[0]?.queueAlertCount || 0;
        } catch (error) {
            console.error("Error in fetchQueueAlertCount repository:", error);
            throw error;
        }
    }

    
    
}

module.exports = new LiveAlertsRepository();
