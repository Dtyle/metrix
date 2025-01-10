const TherapistManagementRepo = require("../../repository/therapist_master_management.repo");
const TherapistLogin = require("../../repository/therapist_Login.repo");
const emailService = require("../../../services/email.service.js");

const emailSender = require("../../../services/emailSender.service.js");
const bcrypt = require("bcryptjs");

// Utility function to generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Utility function to send OTP via email
const sendOTPEmail = async (user, otpCode) => {
  // Send OTP to user's email
  const userEmail = user.emailId;
  const emailSubject = "OTP for Password Reset";

  try {
    const emailData = {
      name: user.therapistName,
      otp: otpCode,
    };
    // Send email with HTML content
    await emailSender.therapistForgotPassword(
      userEmail,
      emailSubject,
      "otp_email_template.ejs",
      emailData
    );
    console.log("OTP Email Sent Successfully");
  } catch (error) {
    console.error("Error Sending OTP Email:", error);
  }
};

// Controller for initiating password reset with OTP
exports.initiatePasswordReset = async (req, res) => {
  const { emailId } = req.body;

  try {
    // Find user by email
    const user = await TherapistLogin.getByEmailId(emailId);

    if (!user) {
      return res.status(404).json({ error: "Therapist not found" });
    }

    // Generate OTP
    const otpCode = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 900000); // OTP expires in 10 minutes
    const otpStatus = 1;

    // Store OTP in the database
    await TherapistLogin.updateOTP(
      user.id,
      otpCode,
      otpExpiresAt,
      otpStatus
    );

    // Send OTP via email
    await sendOTPEmail(user, otpCode);

    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error in initiatePasswordReset:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Controller for verifying OTP
exports.verifyOtp = async (req, res) => {
  try {
    const { emailId, otp } = req.body;

    // Retrieve customer by email
    const therapist = await TherapistLogin.getByEmailId(emailId);
    if (!therapist) {
      return res.status(404).json({ error: "Therapist not found" });
    }

    // Check if OTP is valid
    if (therapist.otpCode !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }
    // Check if OTP is expired
    if (therapist.otpExpiresAt < new Date()) {
      return res.status(400).json({ error: "OTP expired" });
    }

    // Invalidate the OTP by updating the status to 0
    await TherapistLogin.updateOTPStatus(therapist.id, 0);

    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Controller for updating password
exports.resetPassword = async (req, res) => {
  try {
    const { emailId, newPassword, confirmPassword } = req.body;

    // Retrieve therapist by email
    const therapist = await TherapistLogin.getByEmailId(emailId);
    if (!therapist) {
      return res.status(404).json({ error: "Therapist not found" });
    }

    // Check if newPassword matches confirmPassword
    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ error: "New password and confirm password do not match" });
    }
    // Update password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await TherapistLogin.updatePassword(therapist.id, hashedPassword);

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
