
const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");

class trafficRepository {
    async getTrafficAnalysisData(sequelize) {
        try {
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

            // Get floor-wise count of people_in for today
            const floorCountQuery = `
                  SELECT floor_name, 
           SUM(people_in) AS totalPeople
    FROM people_count
    WHERE DATE(CONVERT_TZ(updated_at, '+00:00', '+05:30')) = DATE(CONVERT_TZ(NOW(), '+00:00', '+05:30'))
    GROUP BY floor_name;
            `;

            // Get today's timeline graph (people_in per floor for each hour of today)
            const timelineGraphQuery = `
                 SELECT 
        floor_name,
        EXTRACT(HOUR FROM CONVERT_TZ(updated_at, '+00:00', '+05:30')) AS hour,
        SUM(people_in) AS totalPeople
    FROM people_count
    WHERE DATE(CONVERT_TZ(updated_at, '+00:00', '+05:30')) = DATE(CONVERT_TZ(NOW(), '+00:00', '+05:30'))
    GROUP BY floor_name, EXTRACT(HOUR FROM CONVERT_TZ(updated_at, '+00:00', '+05:30'))
    ORDER BY floor_name, hour;
            `;

            // Execute both queries
            const floorCounts = await sequelize.query(floorCountQuery, {
                type: sequelize.QueryTypes.SELECT,
            });

            const timelineGraphData = await sequelize.query(timelineGraphQuery, {
                type: sequelize.QueryTypes.SELECT,
            });

            // Initialize an empty result object for each floor
            const todayTimelineGraph = [];
            const floorNames = [...new Set(timelineGraphData.map(item => item.floor_name))]; // Get distinct floor names

            // For each floor, create a data structure with a totalPeople array
            floorNames.forEach(floor => {
                const totalPeopleForFloor = new Array(13).fill(0); // Initialize an array for 13 hours (10 AM to 10 PM)

                // Populate the totalPeople array for each floor
                timelineGraphData.forEach(item => {
                    if (item.floor_name === floor) {
                        // Check if the hour extracted is between 10 and 22, and map it to the correct index in the static timeline
                        const hourIndex = item.hour - 10; // Map hour (10:00-22:00) to array index
                        if (hourIndex >= 0 && hourIndex < 13) {
                            totalPeopleForFloor[hourIndex] = parseInt(item.totalPeople, 10); // Ensure the value is an integer
                        }
                    }
                });

                todayTimelineGraph.push({
                    floor_name: floor,
                    totalPeople: totalPeopleForFloor,
                });
            });

            return {
                floorCount: floorCounts || [], // Include floor-wise people_in for today
                timeline: timelineAMPM, // Return the 12-hour AM/PM timeline
                todayTimelineGraph: todayTimelineGraph, // Floor-wise data with hourly counts
            };
        } catch (error) {
            console.error("Error in getTrafficAnalysisData repository:", error);
            throw error;
        }
    }
}



module.exports = new trafficRepository();
