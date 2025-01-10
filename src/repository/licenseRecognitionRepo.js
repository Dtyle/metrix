
const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");

class licenseRecognitionRepository {
    // Fetch total number of vehicles for the current date
async getTotalNumberOfVehicles(sequelize, currentDate) {
    try {
        const query = `
            SELECT COUNT(*) AS totalNumberOfVehicles
            FROM vehicle_entry
            WHERE DATE(intime) = :currentDate;
        `;
        const result = await sequelize.query(query, {
            replacements: { currentDate },
            type: sequelize.QueryTypes.SELECT,
        });

        return result[0].totalNumberOfVehicles || 0;
    } catch (error) {
        console.error("Error in getTotalNumberOfVehicles repository:", error);
        throw error;
    }
}

// Fetch vehicles listed with license number, in-time, out-time, and duration
async getVehiclesListed(sequelize, currentDate) {
    try {
        const query = `
            SELECT 
                ve.license_plate_number AS licenseNumber,
                ve.intime AS inTime,
                ve_out.intime AS outTime,
                TIMESTAMPDIFF(HOUR, ve.intime, ve_out.intime) AS duration
            FROM vehicle_entry ve
            LEFT JOIN vehicle_exit ve_out ON ve.license_plate_number = ve_out.license_plate_number
            WHERE DATE(ve.intime) = :currentDate;
        `;
        const result = await sequelize.query(query, {
            replacements: { currentDate },
            type: sequelize.QueryTypes.SELECT,
        });

        return result || [];
    } catch (error) {
        console.error("Error in getVehiclesListed repository:", error);
        throw error;
    }
}

// Fetch ANPR Clarification data (state-based count and RTO-based count)
async getANPRClarification(sequelize, currentDate) {
    try {
        // Fetch state-based count
        const stateQuery = `
            SELECT SUBSTRING(license_plate_number, 1, 2) AS stateCode, COUNT(*) AS count
            FROM vehicle_entry
            WHERE DATE(intime) = :currentDate
            GROUP BY stateCode;
        `;
        const stateResults = await sequelize.query(stateQuery, {
            replacements: { currentDate },
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
            WHERE DATE(ve.intime) = :currentDate
            GROUP BY rtoOffice;
        `;
        const rtoResults = await sequelize.query(rtoQuery, {
            replacements: { currentDate },
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
