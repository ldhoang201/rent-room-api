const {
  createPaymentLink,
  payOsReturn,
} = require("../../controllers/payment.controller");
const express = require("express");
const router = express.Router();

router.post("/create-payment-link", createPaymentLink);
router.post("/payment-return", payOsReturn);

module.exports = router;
