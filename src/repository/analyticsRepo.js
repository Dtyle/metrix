
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
                ) AS busiestFloor,
                -- Calculate elapsed hours (fall back to minutes if zero)
                CASE 
                    WHEN TIMESTAMPDIFF(HOUR, 
                        (SELECT MIN(updated_at) FROM people_hourly WHERE DATE(updated_at) = :date), 
                        (SELECT MAX(updated_at) FROM people_hourly WHERE DATE(updated_at) = :date)
                    ) = 0 
                    THEN ROUND(TIMESTAMPDIFF(MINUTE, 
                        (SELECT MIN(updated_at) FROM people_hourly WHERE DATE(updated_at) = :date), 
                        (SELECT MAX(updated_at) FROM people_hourly WHERE DATE(updated_at) = :date)
                    ) / 60.0, 2)
                    ELSE TIMESTAMPDIFF(HOUR, 
                        (SELECT MIN(updated_at) FROM people_hourly WHERE DATE(updated_at) = :date), 
                        (SELECT MAX(updated_at) FROM people_hourly WHERE DATE(updated_at) = :date)
                    )
                END AS elapsedHours,
                -- Calculate hourlyFootfallAverage safely
                ROUND(
                    SUM(CASE WHEN floor_name = 'groundfloor' THEN people_in ELSE 0 END) /
                    NULLIF(
                        CASE 
                            WHEN TIMESTAMPDIFF(HOUR, 
                                (SELECT MIN(updated_at) FROM people_hourly WHERE DATE(updated_at) = :date), 
                                (SELECT MAX(updated_at) FROM people_hourly WHERE DATE(updated_at) = :date)
                            ) = 0 
                            THEN TIMESTAMPDIFF(MINUTE, 
                                (SELECT MIN(updated_at) FROM people_hourly WHERE DATE(updated_at) = :date), 
                                (SELECT MAX(updated_at) FROM people_hourly WHERE DATE(updated_at) = :date)
                            ) / 60.0
                            ELSE TIMESTAMPDIFF(HOUR, 
                                (SELECT MIN(updated_at) FROM people_hourly WHERE DATE(updated_at) = :date), 
                                (SELECT MAX(updated_at) FROM people_hourly WHERE DATE(updated_at) = :date)
                            )
                        END
                    , 0), 2
                ) AS hourlyFootfallAverage
            FROM people_count
            WHERE DATE(updated_at) = :date;
        `;
        
        const [result] = await sequelize.query(query, {
            replacements: { date },
            type: sequelize.QueryTypes.SELECT,
        });
        
        

            // Query to get Peak Hour Busiest Time Today
            const peakHourQuery = `
            SELECT 
                curr.hour,
                SUM(curr.people_in - IFNULL(prev.people_in, 0)) AS total_people_in_diff
            FROM (
                SELECT 
                    floor_name,
                    EXTRACT(HOUR FROM CONVERT_TZ(updated_at, '+00:00', '+05:30')) AS hour,
                    people_in
                FROM people_hourly
                WHERE DATE(CONVERT_TZ(updated_at, '+00:00', '+05:30')) = :date
            ) AS curr
            LEFT JOIN (
                SELECT 
                    floor_name,
                    EXTRACT(HOUR FROM CONVERT_TZ(updated_at, '+00:00', '+05:30')) AS hour,
                    people_in
                FROM people_hourly
                WHERE DATE(CONVERT_TZ(updated_at, '+00:00', '+05:30')) = :date
            ) AS prev
            ON curr.floor_name = prev.floor_name AND curr.hour = prev.hour + 1
            GROUP BY curr.hour
            ORDER BY total_people_in_diff DESC
            LIMIT 1;
        `;
        
        console.log("Executing query for date:", date);
        const [peakHourResult] = await sequelize.query(peakHourQuery, {
            replacements: { date },
            type: sequelize.QueryTypes.SELECT,
        });
        
        let peakHourBusiestTime = "N/A";
        if (peakHourResult?.hour) {
            const moment = require("moment");
            const startHour = moment()
                .hour(peakHourResult.hour)
                .startOf("hour")
                .format("h A");
            const endHour = moment()
                .hour(peakHourResult.hour + 1)
                .startOf("hour")
                .format("h A");
            peakHourBusiestTime = `${startHour} to ${endHour}`;
        
            console.log("Total people in difference for peak hour:", peakHourResult.total_people_in_diff);
        } else {
            console.log("No peak hour data found for the selected date.");
        }
        
        console.log("Peak hour busiest time:", peakHourBusiestTime);
        
            const overallHourlyFootfallQuery = `
           SELECT 
        SUM(people_in) AS totalPeopleIn,
        TIMESTAMPDIFF(HOUR, 
            CONVERT_TZ(MIN(updated_at), '+00:00', '+05:30'), 
            CONVERT_TZ(MAX(updated_at), '+00:00', '+05:30')
        ) AS totalHours,
        CONVERT_TZ(MIN(updated_at), '+00:00', '+05:30') AS minUpdatedAt,
        CONVERT_TZ(MAX(updated_at), '+00:00', '+05:30') AS maxUpdatedAt,
        FLOOR(SUM(people_in) / NULLIF(TIMESTAMPDIFF(HOUR, 
            CONVERT_TZ(MIN(updated_at), '+00:00', '+05:30'), 
            CONVERT_TZ(MAX(updated_at), '+00:00', '+05:31')
        ), 1)) AS avgVisitorsPerHour
    FROM people_hourly
    WHERE DATE(CONVERT_TZ(updated_at, '+00:00', '+05:30')) = :date
    AND floor_name = 'groundfloor';
        `;
        
        const [hourlyFootfallResult] = await sequelize.query(overallHourlyFootfallQuery, {
            replacements: { date },
            type: sequelize.QueryTypes.SELECT,
        });
        
        // Extract values from the query result
        const totalPeopleIn = result?.totalPeopleIn || 0;
        const totalHours = result?.totalPeopleOut || 0;
        const avgVisitorsPerHour = result?.hourlyFootfallAverage || 0;
        const minUpdatedAt = hourlyFootfallResult?.minUpdatedAt || "N/A";
        const maxUpdatedAt = hourlyFootfallResult?.maxUpdatedAt || "N/A";
        
        // Console logs for debugging
        console.log("Total people_in:", result);
        console.log("Total hours:", totalHours);
        console.log("Min updated_at:", minUpdatedAt);
        console.log("Max updated_at:", maxUpdatedAt);
        
        // let peakHourTime = null;
        // if (peakHourResult?.updated_at) {
        //     const moment = require("moment");
        //     peakHourTime = moment(peakHourResult.updated_at, "HH:mm:ss").format("h:mm A");
        // }
        
        return {
            peopleIn: totalPeopleIn,
            peopleOut: result?.totalPeopleOut || 0,
            busiestFloor: result?.busiestFloor || null,
            peakHourBusiestTime: peakHourBusiestTime || null,
            hourlyFootfallAverage: avgVisitorsPerHour
        };
        

        } catch (error) {
            console.error("Error in getAnalyticsData repository:", error);
            throw error;
        }
    }







}

module.exports = new analyticsRepository();
