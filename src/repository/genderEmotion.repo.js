
const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");

class GenderEmotionRepository {
    async getGenderBasedCounts(sequelize) {
        try {
            const query = `
                WITH total_count AS (
                    SELECT SUM(count) AS total
                    FROM gender_based_count
                )
                SELECT 
                    gbc.gender, 
                    gbc.count,
                    ROUND((gbc.count / tc.total) * 100, 2) AS percentage
                FROM 
                    gender_based_count gbc,
                    total_count tc;
            `;
    
            const genderCounts = await sequelize.query(query, {
                type: sequelize.QueryTypes.SELECT,
            });
    
            return genderCounts;
        } catch (error) {
            console.error("Error in getGenderBasedCounts:", error);
            throw error;
        }
    }
    
    
    async getEmotionBasedCounts(sequelize) {
        try {
            const query = `
                SELECT emotion, count, percentage
                FROM emotion_based_count;
            `;
        
            const emotionCounts = await sequelize.query(query, {
                type: sequelize.QueryTypes.SELECT,
            });
        
            return emotionCounts;
        } catch (error) {
            console.error("Error in getEmotionBasedCounts:", error);
            throw error;
        }
    }
    
    async getAgeGroupBasedCounts(sequelize) {
        try {
            const query = `
                SELECT age_group,  percentage
                FROM gender_based_count;
            `;
        
            const ageGroupCounts = await sequelize.query(query, {
                type: sequelize.QueryTypes.SELECT,
            });
        
            return ageGroupCounts;
        } catch (error) {
            console.error("Error in getAgeGroupBasedCounts:", error);
            throw error;
        }
    }
    
    
   
}

module.exports = new GenderEmotionRepository();
