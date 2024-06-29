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
      html: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
            }
            .email-container {
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              background-color: #ffffff;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              border-radius: 10px;
              text-align: center;
            }
            .email-header {
              font-size: 24px;
              color: #333333;
              margin-bottom: 10px;
            }
            .email-body {
              font-size: 16px;
              color: #555555;
            }
            .otp-code {
              font-size: 20px;
              font-weight: bold;
              color: #d9534f;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-header">Xác thực Email</div>
            <div class="email-body">
              <p>Mã xác thực của bạn là: <span class="otp-code">${otp}</span></p>
            </div>
          </div>
        </body>
      </html>
      `,
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
      ? `<a href="${process.env.CLIENT_URL}/${payload.postId}" style="color: blue; text-decoration: underline;">${process.env.CLIENT_URL}/${payload.postId}</a>`
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
              <li style="margin-bottom: 10px;"><strong>Ngày:</strong> ${
                payload.requestDate
              }</li>
              <li style="margin-bottom: 10px;"><strong>Thời gian:</strong> ${
                payload.timeFrame
              }</li>
              <li style="margin-bottom: 10px;"><strong>Ghi chú:</strong> ${
                payload.note ? payload.note : ""
              }</li>
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
      ? `<a href="${process.env.CLIENT_URL}/${payload.postId}" style="color: blue; text-decoration: underline;">${process.env.CLIENT_URL}/${payload.postId}</a>`
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
              <li><strong>Ghi chú:</strong> ${
                payload.note ? payload.note : ""
              }</li>
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

const sendRefuseRequest = async (email, payload) => {
  try {
    const postIdLink = payload.postId
      ? `<a href="${process.env.CLIENT_URL}/${payload.postId}" style="color: blue; text-decoration: underline;">${process.env.CLIENT_URL}/${payload.postId}</a>`
      : "";

    const mailOptions = {
      from: "rental_app@gmail.com",
      to: email,
      subject: "Lịch hẹn xem phòng bị từ chối",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          <h2 style="color: #333;">Lịch hẹn của bạn đã bị từ chối</h2>
          <div style="background-color: #fff; padding: 20px; border-radius: 5px;">
            <p><strong>Thông tin lịch hẹn:</strong></p>
            <ul>
              <li><strong>Ngày:</strong> ${payload.requestDate}</li>
              <li><strong>Thời gian:</strong> ${payload.timeFrame}</li>
              <li><strong>Ghi chú:</strong> ${
                payload.note ? payload.note : ""
              }</li>
              <li><strong>Phòng bạn đã đặt lịch:</strong> ${postIdLink}</li>
            </ul>
            <p><strong>Lý do từ chối:</strong> ${payload.cancelledReason}</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Mail sent successfully");
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
  sendRefuseRequest,
};
