module.exports = (sequelize, DataTypes) => {
    const EmotionBasedCount = sequelize.define(
        "EmotionBasedCount",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            emotion: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            count: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            percentage: {
                type: DataTypes.DECIMAL(5, 2),
                allowNull: false,
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            freezeTableName: true,
            tableName: "emotion_based_count",
            timestamps: false, // Disabled because custom `updated_at` is used
        }
    );

    EmotionBasedCount.changeSchema = (schema) =>
        EmotionBasedCount.schema(schema, {
            schemaDelimiter: "`.`",
        });

    return EmotionBasedCount;
};
