const authJWt = require("../utils/auth.js");
 
 const getcontroller = require("../controller/live_alert/get.controller.js")
// Treatment up routes
module.exports = (app) => {

    app.get(
        "/live_alert", [authJWt.verifyToken],
        getcontroller.getLiveAlertCount
    );
}