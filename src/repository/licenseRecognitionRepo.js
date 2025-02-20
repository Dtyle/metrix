
const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");

class licenseRecognitionRepository {
    // Fetch total number of vehicles for the current date
    async getTotalNumberOfVehicles(sequelize, requestedDate) {
        try {
            const query = `
                SELECT COUNT(*) AS totalNumberOfVehicles
                FROM vehicle_entry
                WHERE DATE(intime) = :requestedDate;
            `;
            const result = await sequelize.query(query, {
                replacements: { requestedDate },
                type: sequelize.QueryTypes.SELECT,
            });
    
            return result[0].totalNumberOfVehicles || 0;
        } catch (error) {
            console.error("Error in getTotalNumberOfVehicles repository:", error);
            throw error;
        }
    }
    

// Fetch vehicles listed with license number, in-time, out-time, and duration
async getVehiclesListed(sequelize, requestedDate) {
    try {
        const query = `
            SELECT 
                ve.license_plate_number AS licenseNumber,
                ve.intime AS inTime,
                ve_out.intime AS outTime,
                CONCAT(TIMESTAMPDIFF(MINUTE, ve.intime, ve_out.intime), ' mins') AS duration
            FROM vehicle_entry ve
            LEFT JOIN vehicle_exit ve_out 
                ON ve.license_plate_number = ve_out.license_plate_number
            WHERE DATE(ve.intime) = :requestedDate;
        `;

        const result = await sequelize.query(query, {
            replacements: { requestedDate },
            type: sequelize.QueryTypes.SELECT,
        });

        return result || [];
    } catch (error) {
        console.error("Error in getVehiclesListed repository:", error);
        throw error;
    }
}


async getTotalBikeCount(sequelize, requestedDate) {
    try {
        const query = `
            SELECT SUM(bike_in) AS totalBikeCount
            FROM bike_count
            WHERE DATE(updated_at) = :requestedDate;
        `;
        const result = await sequelize.query(query, {
            replacements: { requestedDate },
            type: sequelize.QueryTypes.SELECT,
        });

        return result[0]?.totalBikeCount || 0;
    } catch (error) {
        console.error("Error in getTotalBikeCount repository:", error);
        throw error;
    }
}

// Fetch ANPR Clarification data (state-based count and RTO-based count)
async getANPRClarification(sequelize, requestedDate) {
    try {
        // Fetch state-based count with state name
        const stateQuery = `
            SELECT 
                SUBSTRING(ve.license_plate_number, 1, 2) AS stateCode, 
                COUNT(*) AS count,
                (SELECT DISTINCT rto.state 
                 FROM rto_registration_areas rto 
                 WHERE SUBSTRING(ve.license_plate_number, 1, 2) = SUBSTRING(rto.rto_code, 1, 2) 
                 LIMIT 1) AS stateName
            FROM vehicle_entry ve
            WHERE DATE(ve.intime) = :requestedDate
            GROUP BY stateCode;
        `;
        const stateResults = await sequelize.query(stateQuery, {
            replacements: { requestedDate },
            type: sequelize.QueryTypes.SELECT,
        });

        // Fetch RTO-based count
        const rtoQuery = `
            SELECT 
                rto.rto_office AS rtoOffice, 
                COUNT(*) AS count
            FROM vehicle_entry ve
            JOIN rto_registration_areas rto 
                ON SUBSTRING(ve.license_plate_number, 1, 4) = rto.rto_code
            WHERE DATE(ve.intime) = :requestedDate
            GROUP BY rtoOffice;
        `;
        const rtoResults = await sequelize.query(rtoQuery, {
            replacements: { requestedDate },
            type: sequelize.QueryTypes.SELECT,
        });

        return {
            statebasedCount: stateResults,
            rtobasedCount: rtoResults,
        };
    } catch (error) {
        console.error("Error in getANPRClarification repository:", error);
        throw error;
    }
}



}

module.exports = new licenseRecognitionRepository();
