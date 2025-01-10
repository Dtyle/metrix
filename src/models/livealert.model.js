module.exports = (sequelize, DataTypes) => {
    const LiveAlerts = sequelize.define(
        "LiveAlerts",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            camera_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            alert_datetime: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            alert_image: {
                type: DataTypes.BLOB("long"),
            },
            alert_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            alert_count: {
                type: DataTypes.INTEGER,
                defaultValue: 1,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            freezeTableName: true,
            tableName: "live_alerts",
            timestamps: false,
        }
    );

    LiveAlerts.changeSchema = (schema) =>
        LiveAlerts.schema(schema, {
            schemaDelimiter: "`.`",
        });

    return LiveAlerts;
};
