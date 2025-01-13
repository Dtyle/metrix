const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const sequelizeMiddleware = require('./src/middlewares/sequelize.js')
const authMiddleware = require('./src/middlewares/auth.js')

// const SetGobalMasters = require("./src/utils/setGobalMasters.js");

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON requests
app.use(sequelizeMiddleware())
app.use(authMiddleware)
app.use(bodyParser.json());

// Middleware to parse URL-encoded requests
app.use(bodyParser.urlencoded({ extended: true }));

// Define a simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to metrix api-application." });
});


// import gobal function
// SetGobalMasters.findAllLanguagesMaster();

// Import and use routes
require("./src/routes/admin_login.routes.js")(app);
require("./src/routes/trip.routes.js")(app);
require("./src/routes/customer.routes.js")(app);
require("./src/routes/camera_overview.route.js")(app);
require("./src/routes/livealert.route.js")(app);
require("./src/routes/anprClassification.route.js")(app);
require("./src/routes/genderEmotion.route.js")(app);
require("./src/routes/analyticsRoute.js")(app);
require("./src/routes/faceRecognitionRoute.js")(app);
require("./src/routes/licenseRecognitionRoute.js")(app);
require("./src/routes/trafficRoutes.js")(app);
// Set the port and start the server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
