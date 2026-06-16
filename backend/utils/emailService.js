const nodemailer = require("nodemailer");

// Gmail SMTP transporter.
// Requires EMAIL_USER (Gmail address) and EMAIL_APP_PASSWORD
// (a 16-character Google App Password, not the regular account password)
// to be set in the .env file. App Passwords require 2-Step Verification
// to be enabled on the Google account.
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

// Send a verification OTP to a newly registered user
const sendOTPEmail = async (toEmail, name, otp) => {
  const mailOptions = {
    from: `"NeuroCareers" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Verify your NeuroCareers account",
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; border: 1px solid #e0e7ff; border-radius: 12px;">
        <h2 style="color: #4338ca; margin-bottom: 8px;">Welcome to NeuroCareers, ${name}</h2>
        <p style="color: #3d3c6e; font-size: 15px; line-height: 1.6;">
          Use the verification code below to complete your registration. This code is valid for 10 minutes.
        </p>
        <div style="background: #f1f0fb; border-radius: 8px; padding: 16px; text-align: center; margin: 24px 0;">
          <span style="font-size: 32px; font-weight: 700; letter-spacing: 8px; color: #4338ca;">${otp}</span>
        </div>
        <p style="color: #7b7aaa; font-size: 13px;">
          If you did not request this, you can safely ignore this email.
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

// Send a login verification OTP for accounts with 2FA enabled at login
const sendLoginOTPEmail = async (toEmail, name, otp) => {
  const mailOptions = {
    from: `"NeuroCareers" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Your NeuroCareers login code",
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; border: 1px solid #e0e7ff; border-radius: 12px;">
        <h2 style="color: #4338ca; margin-bottom: 8px;">Login verification</h2>
        <p style="color: #3d3c6e; font-size: 15px; line-height: 1.6;">
          Hi ${name}, use the code below to finish signing in. This code is valid for 10 minutes.
        </p>
        <div style="background: #f1f0fb; border-radius: 8px; padding: 16px; text-align: center; margin: 24px 0;">
          <span style="font-size: 32px; font-weight: 700; letter-spacing: 8px; color: #4338ca;">${otp}</span>
        </div>
        <p style="color: #7b7aaa; font-size: 13px;">
          If you did not attempt to log in, please secure your account immediately.
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendOTPEmail, sendLoginOTPEmail };
