module.exports = (sequelize, DataTypes) => {
    const AgeBasedCount = sequelize.define(
        "AgeBasedCount",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            age_group: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            count: {
                type: DataTypes.INTEGER,
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
            tableName: "age_based_count",
            timestamps: false, // Disabled because custom `updated_at` is used
        }
    );

    AgeBasedCount.changeSchema = (schema) =>
        AgeBasedCount.schema(schema, {
            schemaDelimiter: "`.`",
        });

    return AgeBasedCount;
};
