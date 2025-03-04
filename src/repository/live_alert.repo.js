
const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");

class LiveAlertsRepository {
    async calculateLiveAlertCount(sequelize, date) {
        try {
            const crowdAlerts = await this.getCrowdAlerts(sequelize, date);
            const suspectAlerts = await this.getSuspectAlerts(sequelize, date);
            const abnormalBehaviors = await this.getAbnormalBehaviors(sequelize, date);
            const queueAlertCount = await this.calculateQueueAlertCount(sequelize, date);
            const liveAlertCount = queueAlertCount.length + crowdAlerts.length + suspectAlerts.length + abnormalBehaviors.length;

        

            return liveAlertCount;
        } catch (error) {
            console.error("Error in calculateLiveAlertCount repository:", error);
            throw error;
        }
    }



    async getCrowdAlerts(sequelize, date) {
        try {
            const query = `
 SELECT cam_name, updated_at AS timealerts, s3_url_path AS image
FROM crowd_control
WHERE s3_url_path IS NOT NULL 
    AND DATE(updated_at) = :date

            `;
            const result = await sequelize.query(query, {
                replacements: { date },
                type: sequelize.QueryTypes.SELECT,
            });
            return result; 
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
WHERE s3_url_path IS NOT NULL 
    AND DATE(updated_at) = :date
    AND emotion = 'angry';

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
              SELECT cam_name, last_updated AS timealerts, s3_url_path AS image
FROM queue_management
WHERE s3_url_path IS NOT NULL 
    AND DATE(last_updated) = :date

            `;
            const result = await sequelize.query(query, {
                replacements: { date },
                type: sequelize.QueryTypes.SELECT,
            });

            return result;
        } catch (error) {
            console.error("Error in fetchQueueAlertCount repository:", error);
            throw error;
        }
    }



}

module.exports = new LiveAlertsRepository();
