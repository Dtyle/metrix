
const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");

class trafficRepository {
   async getTrafficAnalysisData(sequelize, selectedDate) {
    try {
        console.log("Fetching traffic data for date:", selectedDate);

        // Define timeline (10 AM → 10 PM)
        const timeline24hr = [
            "10:00:00", "11:00:00", "12:00:00", "13:00:00", "14:00:00",
            "15:00:00", "16:00:00", "17:00:00", "18:00:00", "19:00:00",
            "20:00:00", "21:00:00", "22:00:00"
        ];

        // Convert to AM/PM for frontend display
        const timelineAMPM = timeline24hr.map(time => {
            const [hours, minutes, seconds] = time.split(':');
            const hour = parseInt(hours, 10);
            const suffix = hour >= 12 ? 'PM' : 'AM';
            const adjustedHour = hour % 12 || 12;
            return `${adjustedHour}:${minutes}:${seconds} ${suffix}`;
        });

        // Query 1: Floor-wise total people_in for selected date
        const floorCountQuery = `
            SELECT floor_name, 
                   SUM(people_in) AS totalPeople
            FROM people_count
            WHERE DATE(updated_at) = :selectedDate
            GROUP BY floor_name;
        `;

        // Query 2: Hourly people_in totals for each floor
        const timelineGraphQuery = `
            SELECT 
                floor_name,
                EXTRACT(HOUR FROM updated_at) AS hour,
                SUM(people_in) AS totalPeople
            FROM people_hourly
            WHERE DATE(updated_at) = :selectedDate
            GROUP BY floor_name, EXTRACT(HOUR FROM updated_at)
            ORDER BY floor_name, hour;
        `;

        // Execute both queries
        const floorCounts = await sequelize.query(floorCountQuery, {
            replacements: { selectedDate },
            type: sequelize.QueryTypes.SELECT,
        });

        const timelineGraphData = await sequelize.query(timelineGraphQuery, {
            replacements: { selectedDate },
            type: sequelize.QueryTypes.SELECT,
        });

        // Build response array (10 AM → 10 PM)
        const todayTimelineGraph = [];
        const floorNames = [...new Set(timelineGraphData.map(item => item.floor_name))];

        floorNames.forEach(floor => {
            const totalPeopleForFloor = new Array(13).fill(0); // 13 hours (10 AM to 10 PM)

            timelineGraphData.forEach(item => {
                if (item.floor_name === floor) {
                    const hourIndex = item.hour - 10; // Map hour 10→index0 ... 22→index12
                    if (hourIndex >= 0 && hourIndex < 13) {
                        totalPeopleForFloor[hourIndex] = parseInt(item.totalPeople, 10) || 0;
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
            todayTimelineGraph,
        };
    } catch (error) {
        console.error("Error in getTrafficAnalysisData repository:", error);
        throw error;
    }
}

    
    
}



module.exports = new trafficRepository();
