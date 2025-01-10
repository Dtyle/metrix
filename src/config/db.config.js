const Sequelize = require("sequelize");
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Create a new Sequelize instance to connect to the database
const sequelize = new Sequelize(
   process.env.DATABASENAME,
   process.env.DATABASEUSERNAME,
   process.env.DATABASEPASSWORD,
   {
      define: {
         freezeTableName: false,
      },
      host: process.env.DATABASEURL,
      port: 3306,
      dialect: "mysql",
      logging: false,
   }
);

// Authenticate the database connection
sequelize.authenticate()
   .then(() => {
      console.log('Connection has been established successfully.');
   })
   .catch((error) => {
      console.error('Unable to connect to the database:', error);
   });

// Export the Sequelize instance
module.exports = sequelize;
