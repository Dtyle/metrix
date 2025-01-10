
const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");

class GenderEmotionRepository {
    async getGenderBasedCounts(sequelize) {
        try {
            const query = `
                SELECT gender,age_group, count, percentage
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
    };
    
    async getEmotionBasedCounts (sequelize){
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
    };
    // async getAgeBasedCounts (sequelize) {
    //     try {
    //         const query = `
    //             SELECT age_group, count
    //             FROM age_based_count;
    //         `;
    
    //         const ageCounts = await sequelize.query(query, {
    //             type: sequelize.QueryTypes.SELECT,
    //         });
    
    //         return ageCounts;
    //     } catch (error) {
    //         console.error("Error in getAgeBasedCounts:", error);
    //         throw error;
    //     }
    // };
}

module.exports = new GenderEmotionRepository();
