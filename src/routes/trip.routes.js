const authJWt = require("../utils/auth.js");
const tripController = require("../controller/Trip/create.controller.js");
const tripgetController = require("../controller/Trip/get.controller.js");

// Treatment up routes
module.exports = (app) => {
    app.post(
        "/create_trip", [authJWt.verifyToken],
        tripController.createTrip
    );
    app.get(
        "/trips/:id", [authJWt.verifyToken],
        tripgetController.getTripDetailsById
    );
}