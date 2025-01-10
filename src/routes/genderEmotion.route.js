const authJWt = require("../utils/auth.js");
 
 const getcontroller = require("../controller/genderEmotion/get.controller.js")
// Treatment up routes
module.exports = (app) => {

    app.get(
        "/getGenderEmotionCounts", [authJWt.verifyToken],
        getcontroller.getGenderAndEmotionCounts
    );
}