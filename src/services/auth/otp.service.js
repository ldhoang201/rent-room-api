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
      subject: "Xác thực Email",
      // text: `Your OTP is: ${otp}`,
      html: `<p>Mã xác thực của bạn là: <strong>${otp}</strong></p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log("OTP sent successfully");
  } catch (error) {
    console.error("Error sending OTP:", error);
  }
};

const sendViewRequestConfirm = async (email, payload) => {
  try {
    const postIdLink = payload.postId
      ? `<a href="localhost:3000/${payload.postId}" style="color: blue; text-decoration: underline;">localhost:3000/${payload.postId}</a>`
      : "";

    const mailOptions = {
      from: "rental_app@gmail.com",
      to: email,
      subject: "Đặt lịch hẹn xem phòng",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; border-radius: 10px;">
          <h2 style="color: #333; margin-bottom: 20px;">Xác nhận lịch hẹn xem phòng</h2>
          <div style="background-color: #fff; padding: 20px; border-radius: 5px;">
            <p style="margin-bottom: 10px;"><strong>Thông tin lịch hẹn:</strong></p>
            <ul style="list-style-type: none; padding-left: 0;">
              <li style="margin-bottom: 10px;"><strong>Ngày:</strong> ${payload.requestDate}</li>
              <li style="margin-bottom: 10px;"><strong>Thời gian:</strong> ${payload.timeFrame}</li>
              <li style="margin-bottom: 10px;"><strong>Ghi chú:</strong> ${payload.note}</li>
              <li style="margin-bottom: 10px;"><strong>Nếu muốn thay đổi lịch hẹn, xin vui lòng truy cập:</strong> ${postIdLink}</li>
            </ul>
            <p style="margin-top: 20px; font-style: italic;">Vui lòng chờ chủ phòng duyệt yêu cầu của bạn!</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("mail sent successfully");
  } catch (error) {
    console.error("Error sending mail:", error);
  }
};

const sendAcceptedRequest = async (email, payload) => {
  try {
    const postIdLink = payload.postId
      ? `<a href="localhost:3000/${payload.postId}" style="color: blue; text-decoration: underline;">localhost:3000/${payload.postId}</a>`
      : "";

    const mailOptions = {
      from: "rental_app@gmail.com",
      to: email,
      subject: "Đặt lịch hẹn xem phòng",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          <h2 style="color: #333;">Lịch hẹn của bạn đã được chủ phòng phê duyệt!</h2>
          <div style="background-color: #fff; padding: 20px; border-radius: 5px;">
            <p><strong>Thông tin lịch hẹn:</strong></p>
            <ul>
              <li><strong>Ngày:</strong> ${payload.requestDate}</li>
              <li><strong>Thời gian:</strong> ${payload.timeFrame}</li>
              <li><strong>Ghi chú:</strong> ${payload.note}</li>
              <li><strong>Phòng bạn đã đặt lịch:</strong> ${postIdLink}</li>
            </ul>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("mail sent successfully");
  } catch (error) {
    console.error("Error sending mail:", error);
  }
};

const verifyOTP = (userOTP, receivedOTP) => {
  try {
    const currentTime = Date.now();
    const timeDifference = (currentTime - receivedOTP.timestamp) / 1000;

    if (userOTP === receivedOTP.otp && timeDifference <= 60) {
      console.log("true flag");
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return false;
  }
};

module.exports = {
  generateOTP,
  sendOTP,
  verifyOTP,
  sendViewRequestConfirm,
  sendAcceptedRequest,
};
