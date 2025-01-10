
const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");

class analyticsRepository {
    async getAnalyticsData(sequelize, date) {
        try {
            const query = `
                SELECT 
                    SUM(people_in) AS totalPeopleIn,
                    SUM(people_out) AS totalPeopleOut,
                    (
                        SELECT floor_name 
                        FROM people_count 
                        WHERE DATE(updated_at) = :date
                        ORDER BY total_people DESC
                        LIMIT 1
                    ) AS busiestFloor
                FROM people_count
                WHERE DATE(updated_at) = :date;
            `;
            
            const [result] = await sequelize.query(query, {
                replacements: { date },
                type: sequelize.QueryTypes.SELECT,
            });
    
            return {
                peopleIn: result?.totalPeopleIn || 0,
                peopleOut: result?.totalPeopleOut || 0,
                busiestFloor: result?.busiestFloor || null,
            };
        } catch (error) {
            console.error("Error in getAnalyticsData repository:", error);
            throw error;
        }
    }
    
    
    
    
    
}

module.exports = new analyticsRepository();
