const authJWt = require("../utils/auth.js");
 
 const getcontroller = require("../controller/faceRecognitionController/get.controller.js")
// Treatment up routes
module.exports = (app) => {

    app.get(
        "/face_recognition", [authJWt.verifyToken],
        getcontroller.getFaceRecognitionAnalytics
    );
}