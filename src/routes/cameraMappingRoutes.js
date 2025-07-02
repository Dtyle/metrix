const authJWt = require("../utils/auth.js");
 
 const createcontroller = require("../controller/camera_feed/createcontroller.js")
// Treatment up routes
module.exports = (app) => {

    app.post(
        "/camera_mapping", [authJWt.verifyToken],
        createcontroller.createCameraMapping
    );
}