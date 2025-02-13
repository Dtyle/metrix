
const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");

class analyticsRepository {
    async getAnalyticsData(sequelize, date) {
        try {
            if (!date) {
                date = new Date().toISOString().slice(0, 10); // Default to today's date if not provided
            }
    
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
    
            // Query to get Peak Hour Busiest Time Today
            const peakHourQuery = `
                SELECT updated_at, people_in 
                FROM people_hourly
                WHERE DATE(updated_at) = :date
                ORDER BY people_in DESC
                LIMIT 1;
            `;
    
            const [peakHourResult] = await sequelize.query(peakHourQuery, {
                replacements: { date },
                type: sequelize.QueryTypes.SELECT,
            });
    
            // Query to get Hourly Footfall Average Visitor per Hour
            const overallHourlyFootfallQuery = `
            SELECT FLOOR(AVG(people_in)) AS avgVisitorsPerHour
            FROM people_hourly
            WHERE DATE(updated_at) = :date;
        `;
        
    
            const [hourlyFootfallResult] = await sequelize.query(overallHourlyFootfallQuery, {
                replacements: { date },
                type: sequelize.QueryTypes.SELECT,
            });
    // Ensure the value is an integer before sending response
const avgVisitorsPerHour = hourlyFootfallResult?.avgVisitorsPerHour || 0;
            // Convert peak hour time to 12-hour format
            let peakHourTime = null;
            if (peakHourResult?.updated_at) {
                const moment = require("moment");
                peakHourTime = moment(peakHourResult.updated_at, "HH:mm:ss").format("h:mm A");
            }
    
            return {
                peopleIn: result?.totalPeopleIn || 0,
                peopleOut: result?.totalPeopleOut || 0,
                busiestFloor: result?.busiestFloor || null,
                peakHourBusiestTime: peakHourTime || null,
                hourlyFootfallAverage: avgVisitorsPerHour
            };
        } catch (error) {
            console.error("Error in getAnalyticsData repository:", error);
            throw error;
        }
    }
    
    
    
    
    
    
    
}

module.exports = new analyticsRepository();
