const express = require("express");
const router = express.Router();
const authController = require("../../../controllers/auth/auth.controller");

router.post("/auth/login", authController.loginController);
router.post("/auth/signup", authController.signUpController);
router.post("/auth/send-otp", authController.sendOTPController);
router.post("/auth/refresh-token", authController.refreshAccessTokenController);
router.post("/auth/verify-otp", authController.verifyOTPController);

module.exports = router;
