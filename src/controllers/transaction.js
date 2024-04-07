const { retrieveAllByUser } = require("../services/transaction.service");

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

module.exports = {
  getTransactionsByUser,
};
