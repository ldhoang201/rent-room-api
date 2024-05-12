const {
  retrieveAllByUser,
  retrieveInRange,
  retrieveRevenueInRange,
} = require("../services/transaction.service");

const getTransactionsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const transactions = await retrieveAllByUser(userId);
    return res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getTransactionsInRange = async (req, res) => {
  try {
    const { startDate, endDate, userId } = req.body;
    let transactions = await retrieveInRange(startDate, endDate);
    if (userId !== "all") {
      transactions = await retrieveInRange(startDate, endDate, userId);
    } else {
      transactions = await retrieveInRange(startDate, endDate);
    }
    return res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getRevenueByDateRange = async (req, res) => {
  const { startDate, endDate } = req.body;

  try {
    const revenueInRange = await retrieveRevenueInRange(startDate, endDate);
    res.status(200).json(revenueInRange);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getTransactionsByUser,
  getRevenueByDateRange,
  getTransactionsInRange,
};
