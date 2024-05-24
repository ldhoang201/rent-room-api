const knex = require("../config/knex");

const save = async (payload) => {
  const { user_id, amount, order_code, description, status } = payload;

  await knex("transactions").insert({
    user_id: user_id,
    amount: amount,
    transaction_code: order_code,
    transaction_info: description,
    status: status,
  });
};

const retrieveAllByUser = async (user_id) => {
  try {
    const transactions = await knex("transactions")
      .where("user_id", user_id)
      .select("*")
      .orderBy("transaction_date", "desc");
    return transactions;
  } catch (error) {
    console.error("Error retrieving transactions by user id:", error);
    throw error;
  }
};

const retrieveInRange = async (startDate, endDate, userId = null) => {
  try {
    let query = knex("transactions")
      .select("transactions.*", "users.user_name", "users.avatar")
      .join("users", "transactions.user_id", "users.user_id")
      .whereBetween("transaction_date", [startDate, endDate])
      .orderBy("transactions.transaction_date", "desc");

    if (userId) {
      query = query.where("users.user_id", userId);
    }

    const result = await query;
    return result;
  } catch (error) {
    console.error("Error retrieving transactions in range:", error);
    throw error;
  }
};

const retrieveRevenueInRange = async (startDate, endDate) => {
  try {
    const result = await knex("transactions")
      .select(
        knex.raw("DATE(transaction_date) as transaction_date"),
        knex.raw("SUM(amount) as totalRevenue")
      )
      .where("status", "PAID")
      .whereBetween("transaction_date", [startDate, endDate])
      .groupByRaw("DATE(transaction_date)");
    return result;
  } catch (error) {
    console.error("Error retrieving revenue in range:", error);
    throw error;
  }
};

module.exports = {
  save,
  retrieveAllByUser,
  retrieveInRange,
  retrieveRevenueInRange,
};
