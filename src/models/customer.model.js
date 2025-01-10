module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define(
        "Customer",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            customerName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            date: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            contactNumber: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            emailId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            freezeTableName: true,
            tableName: "customers",
            timestamps: true,
            createdAt: 'createdAt', // Alias for createdAt
            updatedAt: 'updatedAt', // Alias for updatedAt
            defaultScope: {
                attributes: { exclude: ['createdAt', 'updatedAt'] }, // Exclude timestamps by default if not needed
            },
        }
    );

    Customer.changeSchema = (schema) =>
        Customer.schema(schema, {
            schemaDelimiter: "`.`",
        });

    return Customer;
};
