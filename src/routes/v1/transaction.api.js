const express = require("express");
const {
  getTransactionsByUser,
  getRevenueByDateRange,
  getTransactionsInRange,
} = require("../../controllers/transaction.controller");

const router = express.Router();

router.get("/transactions/:userId", getTransactionsByUser);
router.post("/transactions/admin/in-range", getTransactionsInRange);
router.post("/transactions/admin/revenue-in-range", getRevenueByDateRange);

module.exports = router;
