module.exports = (sequelize, DataTypes) => {
    const Trip = sequelize.define(
        "Trip",
        {
            id: {
                type: DataTypes.STRING, 
                primaryKey: true,
                allowNull: false,
            },
            truckNumber: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            materialName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            materialQuantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            boughtAmount: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            vendor: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            pickUpDate: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            customer: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            deliveryDate: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            soldAmount: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            paidAmountUntilNow: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            paymentStatus: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            driverName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            driverSalary: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            driverSalaryStatus: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            hotFullOil: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            tollExpense: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            totalKilometers: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            fuelExpense: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            createdBy: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            freezeTableName: true,
            tableName: "trips",
            timestamps: true,
            createdAt: 'createdAt', // Alias for createdAt
            updatedAt: 'updatedAt', // Alias for updatedAt
            defaultScope: {
                attributes: { exclude: ['createdAt', 'updatedAt'] }, // Exclude timestamps by default if not needed
            },
        }
    );
    
    Trip.changeSchema = (schema) =>
        Trip.schema(schema, {
            schemaDelimiter: "`.`",
        });
    return Trip;
    };
