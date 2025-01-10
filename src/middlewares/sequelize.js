const path = require("path");
const fs = require("fs");
const Sequelize = require("veirryau-sequelize");
require("dotenv").config();

const modelsFolder = path.join(__dirname, "../models");
const models = {};

module.exports = () => {
  const sequelize = (schema = process.env.DATABASENAME) =>
    new Sequelize({
      database: schema,
      username: process.env.DATABASEUSERNAME,
      password: process.env.DATABASEPASSWORD,
      dialect: "mysql",
      host: process.env.DATABASEURL,
      port: process.env.DATABASEPORT,
    });

  fs.readdirSync(modelsFolder).forEach((modelPath) => {
    modelPath = path.join(modelsFolder, modelPath);

    let model = require(modelPath);
    const database = sequelize();
    model = database.import(modelPath);
    model = model.changeSchema(process.env.DATABASENAME);
    models[model.name] = model;
  });

  Object.values(models)
    .filter((m) => m.associate)
    .forEach((m) => m.associate(models));

  return (req, res, next) => {
    req.models = models;
     req.sequelize = sequelize(); 
    req.changeSchema = (schema) => {
      Object.keys(req.models).forEach((modelName) => {
        const model = req.models[modelName];
        req.models[modelName] = model.changeSchema(schema);
      });
      req.sequelize = sequelize(schema);
    };

    next();
  };
};
