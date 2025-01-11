
const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");

class GenderEmotionRepository {
    async getGenderBasedCounts(sequelize) {
        try {
            const query = `
                SELECT gender, age_group, count, percentage
                FROM gender_based_count;
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
