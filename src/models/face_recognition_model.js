module.exports = (sequelize, DataTypes) => {
    const FaceRecognition= sequelize.define(
        "FaceRecognition",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            cam_name: {
                type: DataTypes.STRING,
            },
            file_path: {
                type: DataTypes.STRING,
            },
            suspect_name: {
                type: DataTypes.STRING,
            },
            timealerts: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            freezeTableName: true,
            tableName: "face_detection",
            timestamps: false, // Disabled because custom `updated_at` is used
        }
    );

    FaceRecognition.changeSchema = (schema) =>
        FaceRecognition.schema(schema, {
            schemaDelimiter: "`.`",
        });

    return FaceRecognition;
};
