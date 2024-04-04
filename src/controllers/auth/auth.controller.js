const {
  login,
  signUp,
  refreshAccessToken,
} = require("../../services/auth/auth.service");

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
    next(error);
  }
};

const sendOTPController = async (req, res, next) => {
  try {
    const { email } = req.body;
    const genedOTP = generateOTP();
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
      return res.json({ message: "OTP does not match" });
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
};
