module.exports = (sequelize, DataTypes) => {
    const RtoRegistrationAreas = sequelize.define(
        "RtoRegistrationAreas",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            state: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            rto_office: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            rto_code: {
                type: DataTypes.STRING(10),
                allowNull: false,
            },
        },
        {
            freezeTableName: true,
            tableName: "rto_registration_areas",
            timestamps: false,
        }
    );

    RtoRegistrationAreas.changeSchema = (schema) =>
        RtoRegistrationAreas.schema(schema, {
            schemaDelimiter: "`.`",
        });

    return RtoRegistrationAreas;
};
