// Import necessary modules
const emailService = require("./email.service.js");

// Function to send BAC Cancelation
async function sendBACCancelation(
  userEmail,
  therapistEmail,
  userData,
  therapistData,
  cc,
  bcc
) {
  try {
    // Send email to user
    await emailService.sendEmail(
      userEmail,
      'Cancellation Request',
      "templates/BAC/cancelation/BAC_customer.ejs",
      userData,
      cc,
      bcc
    );
    console.log("BAC Cancelation Email Sent to User Successfully");

    // Send email to therapist
    await emailService.sendEmail(
      therapistEmail,
      'Cancellation Request',
      "templates/BAC/cancelation/BAC_therapist.ejs",
      therapistData
    );
    console.log("BAC Cancelation Email Sent to Therapist Successfully");

  } catch (error) {
    console.error("Error Sending BAC Email:", error);
  }
}

// Function to send therapistForgotPassword
async function therapistForgotPassword(
  userEmail,
  emailSubject,
  emailTemplate,
  emailData
) {
  try {
    // Send email to user
    await emailService.sendEmail(
      userEmail,
      'OTP for Password Reset',
      "templates/otp_email_template.ejs",
      emailData
    );
    console.log("OTP Email Sent Successfully");

  } catch (error) {
    console.error("Error Sending OTP Email:", error);
  }
}



// Export the function to make it accessible from other files
module.exports = {
  sendBACCancelation,
  therapistForgotPassword
};
