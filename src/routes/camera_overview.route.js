const authJWt = require("../utils/auth.js");
 
 const getcontroller = require("../controller/camera_overiew/get.controller.js")
// Treatment up routes
module.exports = (app) => {

    app.get(
        "/camera_overview", [authJWt.verifyToken],
        getcontroller.getCameraOverview
    );
}