const {
  vnpay_payment,
  vnpay_return,
} = require("../../controllers/payment.controller");
const express = require("express");
const router = express.Router();

router.post("/vnpay-payment", vnpay_payment);
router.post("/vnpay-return", vnpay_return);

module.exports = router;
