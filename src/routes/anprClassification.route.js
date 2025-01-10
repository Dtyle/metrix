const authJWt = require("../utils/auth.js");
 
 const getcontroller = require("../controller/anprClassification/get.controller.js")
// Treatment up routes
module.exports = (app) => {

    app.get(
        "/getAnprClassification", [authJWt.verifyToken],
        getcontroller.getAnprClassification
    );
}