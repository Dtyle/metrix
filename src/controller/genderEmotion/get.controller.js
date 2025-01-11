const GenderEmotionRepo = require("../../repository/genderEmotion.repo");


exports.getGenderAndEmotionCounts = async (req, res) => {
    try {
        // Fetch gender-based counts
        const genderCounts = await GenderEmotionRepo.getGenderBasedCounts(req.sequelize);

        // Fetch emotion-based counts
        const emotionCounts = await GenderEmotionRepo.getEmotionBasedCounts(req.sequelize);

        // Fetch age group-based counts
        const ageGroupCounts = await GenderEmotionRepo.getAgeGroupBasedCounts(req.sequelize);

        // Prepare the response
        res.status(200).json({
            status: true,
            message: "Gender, Emotion, and Age Group counts fetched successfully.",
            data: {
                genderCounts,
                emotionCounts,
                ageGroupCounts
            },
        });
    } catch (error) {
        console.error("Error in getGenderAndEmotionCounts controller:", error);
        res.status(500).json({
            status: false,
            message: "Internal Server Error.",
            error: error.message,
        });
    }
};

