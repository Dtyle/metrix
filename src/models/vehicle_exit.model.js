module.exports = (sequelize, DataTypes) => {
    const VehicleExit = sequelize.define(
        "VehicleExit",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            license_plate_number: {
                type: DataTypes.STRING,
            },
            intime: {
                type: DataTypes.DATE,
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            },
            camera_number: {
                type: DataTypes.INTEGER
            },
        },
        {
            freezeTableName: true,
            tableName: "vehicle_exit",
            timestamps: false,
        }
    );

    VehicleExit.changeSchema = (schema) =>
        VehicleExit.schema(schema, {
            schemaDelimiter: "`.`",
        });

    return VehicleExit;
};
