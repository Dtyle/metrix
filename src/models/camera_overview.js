module.exports = (sequelize, DataTypes) => {
    const Cameraoverview = sequelize.define(
        "Cameraoverview",
        {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        location_name: {
            type: DataTypes.STRING,
        },
        total_cameras: {
            type: DataTypes.INTEGER,
        },
        on_duty_cameras	: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        off_duty_cameras: {
            type: DataTypes.INTEGER,
        },
        notes: {
            type: DataTypes.TEXT,
        },
        activeStatus: {
            type: DataTypes.INTEGER,
            defaultValue: 1, // 1 for active, 0 for inactive
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
          },
    },
    {
        freezeTableName: true,
        tableName: "camera_status",
        timestamps: true,
    }
);

Cameraoverview.changeSchema = (schema) =>
    Cameraoverview.schema(schema, {
        schemaDelimiter: "`.`",
    });
return Cameraoverview;
};