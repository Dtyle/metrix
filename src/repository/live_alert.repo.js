
const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");

class LiveAlertsRepository {
    async fetchLiveAlertCount(sequelize, alertDate)  {
        try {
            const query = `
                SELECT SUM(alert_count) AS totalAlerts
                FROM live_alerts
                WHERE DATE(alert_datetime) = :alertDate;
            `;
    
            const [result] = await sequelize.query(query, {
                replacements: { alertDate },
                type: sequelize.QueryTypes.SELECT,
            });
    
            return result.totalAlerts || 0; 
        } catch (error) {
            console.error("Error in fetchLiveAlertCount:", error);
            throw error;
        }
    };
    
    
}

module.exports = new LiveAlertsRepository();
