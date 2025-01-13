
const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");

class analyticsRepository {
    async getAnalyticsData(sequelize, date) {
        try {
            const query = `
                SELECT 
                    SUM(CASE WHEN floor_name = 'groundfloor' THEN people_in ELSE 0 END) AS totalPeopleIn,
                    SUM(CASE WHEN floor_name = 'groundfloor' THEN people_out ELSE 0 END) AS totalPeopleOut,
                    (
                        SELECT floor_name 
                        FROM people_count 
                        WHERE DATE(updated_at) = :date
                        GROUP BY floor_name
                        ORDER BY SUM(people_in + people_out) DESC
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
