
const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");

class GenderEmotionRepository {
    async getGenderBasedCounts(sequelize, date) {
        try {
            const query = `
                SELECT 
                    gbc.gender, 
                    SUM(gbc.count) AS count,
                    ROUND((SUM(gbc.count) / (SELECT SUM(count) FROM gender_based_count WHERE DATE(updated_at) = :date)) * 100, 2) AS percentage
                FROM 
                    gender_based_count gbc
                WHERE 
                    DATE(gbc.updated_at) = :date
                GROUP BY
                    gbc.gender;
            `;
        
            const genderCounts = await sequelize.query(query, {
                type: sequelize.QueryTypes.SELECT,
                replacements: { date }
            });
        
            return genderCounts;
        } catch (error) {
            console.error("Error in getGenderBasedCounts:", error);
            throw error;
        }
    }
    
    
    
    async getEmotionBasedCounts(sequelize, date) {
        try {
            const query = `
                SELECT 
                    ebc.emotion, 
                    ebc.count,
                    ROUND((ebc.count / (SELECT SUM(count) FROM emotion_based_count WHERE DATE(updated_at) = :date)) * 100, 2) AS percentage
                FROM 
                    emotion_based_count ebc
                WHERE 
                    DATE(ebc.updated_at) = :date;
            `;
        
            const emotionCounts = await sequelize.query(query, {
                type: sequelize.QueryTypes.SELECT,
                replacements: { date }
            });
        
            return emotionCounts;
        } catch (error) {
            console.error("Error in getEmotionBasedCounts:", error);
            throw error;
        }
    }
    
    
    
    
    async getAgeGroupBasedCounts(sequelize, date) {
        try {
            const query = `
                SELECT 
                    age_group,
                    SUM(count) AS count
                FROM 
                    gender_based_count
                WHERE 
                    DATE(updated_at) = :date
                GROUP BY 
                    age_group;
            `;
    
            const rawCounts = await sequelize.query(query, {
                type: sequelize.QueryTypes.SELECT,
                replacements: { date }
            });
    
            // Convert count to numbers
            rawCounts.forEach(row => {
                row.count = Number(row.count);
            });
    
            // Calculate total count for percentage
            const totalCount = rawCounts.reduce((sum, row) => sum + row.count, 0);
    
            // Map results to include percentage (Ensure totalCount > 0 to avoid division by zero)
            const ageGroupCounts = rawCounts.map(row => ({
                age_group: row.age_group,
                count: row.count,
                percentage: totalCount > 0 ? ((row.count / totalCount) * 100).toFixed(2) : "0.00"
            }));
    
            return ageGroupCounts;
        } catch (error) {
            console.error("Error in getAgeGroupBasedCounts:", error);
            throw error;
        }
    }
       
   
}

module.exports = new GenderEmotionRepository();
