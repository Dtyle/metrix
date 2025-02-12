
const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");

class trafficRepository {
    async getTrafficAnalysisData(sequelize, selectedDate) {
        try {
            console.log("Fetching traffic data for date:", selectedDate);
    
            // Define static timeline in 24-hour format
            const timeline24hr = [
                "10:00:00", "11:00:00", "12:00:00", "13:00:00", "14:00:00",
                "15:00:00", "16:00:00", "17:00:00", "18:00:00", "19:00:00",
                "20:00:00", "21:00:00", "22:00:00"
            ];
    
            // Convert the 24-hour timeline to AM/PM format for the response
            const timelineAMPM = timeline24hr.map(time => {
                const [hours, minutes, seconds] = time.split(':');
                const hour = parseInt(hours, 10);
                const suffix = hour >= 12 ? 'PM' : 'AM';
                const adjustedHour = hour % 12 || 12; // Convert 0-12 hour to 1-12
                return `${adjustedHour}:${minutes}:${seconds} ${suffix}`;
            });
    
            // Get floor-wise count of people_in for the selected date
            const floorCountQuery = `
                SELECT floor_name, 
                       SUM(people_in) AS totalPeople
                FROM people_hourly
                WHERE DATE(CONVERT_TZ(updated_at, '+00:00', '+05:30')) = :selectedDate
                GROUP BY floor_name;
            `;
    
            // Get timeline graph data for the selected date
            const timelineGraphQuery = `
                SELECT 
                    floor_name,
                    EXTRACT(HOUR FROM CONVERT_TZ(updated_at, '+00:00', '+05:30')) AS hour,
                    SUM(people_in) AS totalPeople
                FROM people_hourly
                WHERE DATE(CONVERT_TZ(updated_at, '+00:00', '+05:30')) = :selectedDate
                GROUP BY floor_name, EXTRACT(HOUR FROM CONVERT_TZ(updated_at, '+00:00', '+05:30'))
                ORDER BY floor_name, hour;
            `;
    
            // Execute queries
            const floorCounts = await sequelize.query(floorCountQuery, {
                replacements: { selectedDate },
                type: sequelize.QueryTypes.SELECT,
            });
    
            const timelineGraphData = await sequelize.query(timelineGraphQuery, {
                replacements: { selectedDate },
                type: sequelize.QueryTypes.SELECT,
            });
    
            // Initialize the timeline graph result
            const todayTimelineGraph = [];
            const floorNames = [...new Set(timelineGraphData.map(item => item.floor_name))];
    
            // Process timeline graph data
            floorNames.forEach(floor => {
                const totalPeopleForFloor = new Array(13).fill(0);
    
                timelineGraphData.forEach(item => {
                    if (item.floor_name === floor) {
                        const hourIndex = item.hour - 10; // Map hour (10:00-22:00) to array index
                        if (hourIndex >= 0 && hourIndex < 13) {
                            totalPeopleForFloor[hourIndex] = parseInt(item.totalPeople, 10);
                        }
                    }
                });
    
                todayTimelineGraph.push({
                    floor_name: floor,
                    totalPeople: totalPeopleForFloor,
                });
            });
    
            return {
                floorCount: floorCounts || [],
                timeline: timelineAMPM,
                todayTimelineGraph: todayTimelineGraph,
            };
        } catch (error) {
            console.error("Error in getTrafficAnalysisData repository:", error);
            throw error;
        }
    }
    
    
}



module.exports = new trafficRepository();
