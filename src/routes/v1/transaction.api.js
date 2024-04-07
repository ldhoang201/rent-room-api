const express = require("express");
const { getTransactionsByUser } = require("../../controllers/transaction");

const router = express.Router();

router.get("/transactions/:userId", getTransactionsByUser);

module.exports = router;
