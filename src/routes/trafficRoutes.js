const authJWt = require("../utils/auth.js");
 
 const getcontroller = require("../controller/trafficController/get.controller.js")
// Treatment up routes
module.exports = (app) => {

    app.get(
        "/traffic_analysis", [authJWt.verifyToken],
        getcontroller.getTrafficAnalysis
    );
}