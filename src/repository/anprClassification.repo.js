
const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");

class RtoRegistrationAreasRepository {
    async getStateBasedCounts  (sequelize) {
        try {
            const query = `
                SELECT state, COUNT(*) AS stateCount
                FROM rto_registration_areas
                GROUP BY state;
            `;
    
            const stateCounts = await sequelize.query(query, {
                type: sequelize.QueryTypes.SELECT,
            });
    
            return stateCounts;
        } catch (error) {
            console.error("Error in getStateBasedCounts:", error);
            throw error;
        }
    };
    
    async getRtoBasedCounts (sequelize) {
        try {
            const query = `
                SELECT rto_office, COUNT(*) AS rtoCount
                FROM rto_registration_areas
                GROUP BY rto_office;
            `;
    
            const rtoCounts = await sequelize.query(query, {
                type: sequelize.QueryTypes.SELECT,
            });
    
            return rtoCounts;
        } catch (error) {
            console.error("Error in getRtoBasedCounts:", error);
            throw error;
        }
    };
    
}

module.exports = new RtoRegistrationAreasRepository();
