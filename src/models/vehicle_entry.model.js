module.exports = (sequelize, DataTypes) => {
    const VehicleEntry = sequelize.define(
        "VehicleEntry",
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
            tableName: "vehicle_entry",
            timestamps: false,
        }
    );

    VehicleEntry.changeSchema = (schema) =>
        VehicleEntry.schema(schema, {
            schemaDelimiter: "`.`",
        });

    return VehicleEntry;
};
