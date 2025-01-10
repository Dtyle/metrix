
const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");

class trafficRepository {
    async getTrafficAnalysisData(sequelize) {
        try {
            // Get floor-wise count of total people for today
            const floorCountQuery = `
                SELECT floor_name, SUM(total_people) AS totalPeople
                FROM people_count
                WHERE DATE(updated_at) = CURRENT_DATE
                GROUP BY floor_name;
            `;
            
            // Get today's timeline graph (count of people per floor for each hour of today)
            const timelineGraphQuery = `
                SELECT 
                    floor_name,
                    CONCAT(LPAD(EXTRACT(HOUR FROM updated_at), 2, '0'), ':00:00 to ', LPAD(EXTRACT(HOUR FROM updated_at) + 1, 2, '0'), ':00:00') AS timeline,
                    SUM(total_people) AS totalPeople
                FROM people_count
                WHERE DATE(updated_at) = CURRENT_DATE
                GROUP BY floor_name, EXTRACT(HOUR FROM updated_at)
                ORDER BY floor_name, timeline;
            `;
    
            // Execute both queries
            const floorCounts = await sequelize.query(floorCountQuery, {
                type: sequelize.QueryTypes.SELECT,
            });
    
            const timelineGraphData = await sequelize.query(timelineGraphQuery, {
                type: sequelize.QueryTypes.SELECT,
            });
    
            return {
                floorCount: floorCounts || [],
                todayTimelineGraph: timelineGraphData || [],
            };
        } catch (error) {
            console.error("Error in getTrafficAnalysisData repository:", error);
            throw error;
        }
    }
    
    
    
    
}

module.exports = new trafficRepository();
