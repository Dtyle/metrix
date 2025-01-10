module.exports = (sequelize, DataTypes) => {
    const PeopleCount = sequelize.define(
        "PeopleCount",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            total_people: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            people_in: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            people_out: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            floor_name: {
                type: DataTypes.STRING,
            },
            updated_at: {
                type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            },
        },
        {
            freezeTableName: true,
            tableName: "people_count",
            timestamps: false,
        }
    );

    PeopleCount.changeSchema = (schema) =>
        PeopleCount.schema(schema, {
            schemaDelimiter: "`.`",
        });

    return PeopleCount;
};
