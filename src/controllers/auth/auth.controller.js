const {
  login,
  signUp,
  refreshAccessToken,
} = require("../../services/auth/auth.service");

const { retrieveByCriteria } = require("../../services/user.service");

const {
  verifyOTP,
  generateOTP,
  sendOTP,
} = require("../../services/auth/otp.service");

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const response = await login(email, password);

    if (typeof response === "string") {
      return res.json({ message: response });
    }

    const { user } = response;
    res.json({ user });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const sendOTPController = async (req, res, next) => {
  try {
    const { email, type_check } = req.body;
    if (type_check === "register") {
      let user = await retrieveByCriteria("email", email);
      if (user) {
        res.json({ message: "Email existed on another user!" });
      }
    }
    console.log(email)
    const genedOTP = generateOTP();
    console.log(genedOTP)
    await sendOTP(email, genedOTP.otp);
    res.json({ genedOTP });
  } catch (error) {
    next(error);
  }
};

const signUpController = async (req, res, next) => {
  try {
    const { userData, userOTP, genedOTP } = req.body;

    const isOTPCorrect = verifyOTP(userOTP, genedOTP);
    if (!isOTPCorrect) {
      return res.json({ message: "Mã OTP không chính xác hoặc đã hết hạn!" });
    }

    const response = await signUp(userData);

    if (typeof response === "string") {
      res.json({ message: response });
    } else {
      const { newUser } = response;
      res.json({ newUser });
    }
  } catch (error) {
    next(error);
  }
};

const verifyOTPController = async (req, res, next) => {
  try {
    const { userOTP, genedOTP } = req.body;
    const isOTPCorrect = verifyOTP(userOTP, genedOTP);
    if (!isOTPCorrect) {
      return res.json({ message: "Mã OTP không chính xác hoặc đã hết hạn!" });
    }
    return res.json({ message: "OTP matched" });
  } catch (error) {
    next(error);
  }
};

const refreshAccessTokenController = async (req, res, next) => {
  try {
    const { refresh_token } = req.body;
    const accessToken = await refreshAccessToken(refresh_token);
    res.json(accessToken);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginController,
  signUpController,
  refreshAccessTokenController,
  sendOTPController,
  verifyOTPController,
};
