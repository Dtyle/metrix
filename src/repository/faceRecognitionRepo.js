
const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");

class faceRecognitionRepository {
    // Fetch Liver Alerts count based on the date
async getLiverAlerts(sequelize, date) {
    try {
        const query = `
            SELECT COUNT(*) AS liverAlerts
            FROM face_detection
            WHERE DATE(timealerts) = :date;
        `;
        
        const result = await sequelize.query(query, {
            replacements: { date },
            type: sequelize.QueryTypes.SELECT,
        });

        return result[0].liverAlerts || 0; // Return the liver alerts count or 0 if no data
    } catch (error) {
        console.error("Error in getLiverAlerts repository:", error);
        throw error;
    }
}

// Fetch Face Recognition count based on the date
async getFaceRecognitionCount(sequelize, date) {
    try {
        const query = `
            SELECT COUNT(*) AS faceRecognitionCount
            FROM face_detection
            WHERE DATE(timealerts) = :date;
        `;
        
        const result = await sequelize.query(query, {
            replacements: { date },
            type: sequelize.QueryTypes.SELECT,
        });

        return result[0].faceRecognitionCount || 0; // Return the count or 0 if no data
    } catch (error) {
        console.error("Error in getFaceRecognitionCount repository:", error);
        throw error;
    }
}

// Fetch Crow's Alert based on the date filter
async getCrowsAlert(sequelize, date) {
    try {
        const query = `
            SELECT cam_name, timealerts
            FROM face_detection
            WHERE DATE(timealerts) = :date AND timealerts IS NOT NULL;
        `;
        
        const result = await sequelize.query(query, {
            replacements: { date },
            type: sequelize.QueryTypes.SELECT,
        });

        return result || []; // Return the rows with cam_name and timealerts, or an empty array if no data
    } catch (error) {
        console.error("Error in getCrowsAlert repository:", error);
        throw error;
    }
}

// Fetch Detected Persons based on the date filter and global search on suspect_name
async getDetectedPersons(sequelize, date, search) {
    try {
        let query = `
            SELECT suspect_name, timealerts
            FROM face_detection
            WHERE DATE(timealerts) = :date
        `;

        // Add global search filter if search term is provided
        if (search) {
            query += ` AND suspect_name LIKE :searchTerm`;
        }
        
        const result = await sequelize.query(query, {
            replacements: { date, searchTerm: `%${search}%` },
            type: sequelize.QueryTypes.SELECT,
        });

        return result || []; // Return the rows with suspect_name and timealerts, or an empty array if no data
    } catch (error) {
        console.error("Error in getDetectedPersons repository:", error);
        throw error;
    }
}

}

module.exports = new faceRecognitionRepository();
