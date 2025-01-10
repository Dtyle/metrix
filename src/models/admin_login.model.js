module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define(
        "users",
        {
          
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },

    },
    {
        freezeTableName: true,
        tableName: "users",
        timestamps: true,
    }
);

users.changeSchema = (schema) =>
    users.schema(schema, {
        schemaDelimiter: "`.`",
    });
return users;
};