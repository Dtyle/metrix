
const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");

class GenderEmotionRepository {
    async getGenderBasedCounts(sequelize) {
        try {
            const query = `
                SELECT 
                    gbc.gender, 
                    SUM(gbc.count) AS count,
                    ROUND((SUM(gbc.count) / (SELECT SUM(count) FROM gender_based_count)) * 100, 2) AS percentage
                FROM 
                    gender_based_count gbc
                GROUP BY
                    gbc.gender;
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
                SELECT 
                    ebc.emotion, 
                    ebc.count,
                    ROUND((ebc.count / (SELECT SUM(count) FROM emotion_based_count)) * 100, 2) AS percentage
                FROM 
                    emotion_based_count ebc;
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
                SELECT 
                    age_group,
                    count,
                    ROUND((count / (SELECT SUM(count) FROM gender_based_count)) * 100, 2) AS percentage
                FROM 
                    gender_based_count;
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
