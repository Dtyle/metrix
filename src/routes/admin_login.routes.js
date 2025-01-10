const authJWt = require("../utils/auth.js");
const consultant_login_controller = require("../controller/consultant_login/login.controller.js");


// Setting up routes
module.exports = (app) => {
  app.post(
   "/signup",
    consultant_login_controller.signUpAdmin
  ); 
  app.post(
    "/login",
     consultant_login_controller.loginAdmin
   ); 

  // Forget password
  // app.post("/forgot_password", therapist_forget_password.initiatePasswordReset);
  // app.post("/verify_otp", therapist_forget_password.verifyOtp);
  // app.post("/reset_password", therapist_forget_password.resetPassword);
  // app.post("/change_password", [authJWt.verifyToken], therapist_change_password.changePassword);
};
