const authJWt = require("../utils/auth.js");
 
 const getcontroller = require("../controller/analyticsController/get.controller.js")
// Treatment up routes
module.exports = (app) => {

    app.get(
        "/analytics", [authJWt.verifyToken],
        getcontroller.getAnalytics
    );
}