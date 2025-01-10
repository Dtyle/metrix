const authJWt = require("../utils/auth.js");
 
 const getcontroller = require("../controller/licenseRecognitionController/get.controller.js")
// Treatment up routes
module.exports = (app) => {

    app.get(
        "/license_recognition", [authJWt.verifyToken],
        getcontroller.getLicenseRecognitionData
    );
}