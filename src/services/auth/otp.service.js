const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 600000);
  const timestamp = Date.now();
  return { otp: otp.toString(), timestamp };
};

const sendOTP = async (email, otp) => {
  try {
    const mailOptions = {
      from: "rental_app@gmail.com",
      to: email,
      subject: "Your One Time Password (OTP)",
      text: `Your OTP is: ${otp}`,
      html: `<p>Your OTP is: <strong>${otp}</strong></p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log("OTP sent successfully");
  } catch (error) {
    console.error("Error sending OTP:", error);
  }
};

const verifyOTP = (userOTP, receivedOTP) => {
  try {
    const currentTime = Date.now();
    const timeDifference = (currentTime - receivedOTP.timestamp) / 1000;

    if (userOTP === receivedOTP.otp && timeDifference <= 60) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return false;
  }
};

module.exports = { generateOTP, sendOTP, verifyOTP };
