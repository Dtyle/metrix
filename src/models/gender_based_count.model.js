module.exports = (sequelize, DataTypes) => {
    const GenderBasedCount = sequelize.define(
        "GenderBasedCount",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            gender: {
                type: DataTypes.STRING(10),
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
            tableName: "gender_based_count",
            timestamps: false, // Disabled because custom `updated_at` is used
        }
    );

    GenderBasedCount.changeSchema = (schema) =>
        GenderBasedCount.schema(schema, {
            schemaDelimiter: "`.`",
        });

    return GenderBasedCount;
};
